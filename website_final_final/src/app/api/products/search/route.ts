import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { fetchSerpApiProducts } from '@/lib/serpapi'
import { prisma } from '@/lib/prisma'

const searchSchema = z.object({
  query: z.string().min(1),
  limit: z.number().min(1).max(50).default(10),
  category: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category') || undefined

    const validatedData = searchSchema.parse({
      query,
      limit,
      category,
    })

    console.log(`🔍 Searching for: ${validatedData.query}`)

    // Fetch fresh data from SerpAPI (bypass cache)
    const serpApiResults = await fetchSerpApiProducts(validatedData.query)
    console.log(`📦 Got ${serpApiResults.length} results from SerpAPI`)

    // Persist to DB and transform for frontend
    const transformedProducts = [] as any[]
    for (let index = 0; index < Math.min(limit, serpApiResults.length); index++) {
      const product = serpApiResults[index]
      const title = product.title
      const platform = product.source
      const price = product.extracted_price || 0
      const imageUrl = product.thumbnail || '/placeholder-product.jpg'
      const url = product.link || ''

      // Upsert product by name + brand(platform)
      const dbProduct = await prisma.product.upsert({
        where: {
          // Composite alternative via unique constraint is not present; emulate using name+brand
          // Use a synthetic unique key in code: firstOrCreate
          id: (await (async () => {
            const existing = await prisma.product.findFirst({ where: { name: title, brand: platform } })
            if (existing) return existing.id
            const created = await prisma.product.create({
              data: {
                name: title,
                description: `Product from ${platform}`,
                imageUrl,
                brand: platform,
                category: 'General',
              },
            })
            return created.id
          })()),
        },
        update: {
          imageUrl,
        },
        create: {
          // The above branch should always handle creation; keep fallback
          name: title,
          description: `Product from ${platform}`,
          imageUrl,
          brand: platform,
          category: 'General',
        },
      })

      // Record current price point
      await prisma.price.create({
        data: {
          productId: dbProduct.id,
          platform,
          price,
          currency: 'USD',
          url,
          inStock: true,
        },
      })

      transformedProducts.push({
        id: `serpapi-${index}`,
        dbId: dbProduct.id,
        name: title,
        description: `Product from ${platform}`,
        imageUrl,
        category: 'General',
        brand: platform,
        prices: {
          [platform]: {
            price,
            platform,
            url,
            inStock: true,
            createdAt: new Date(),
          },
        },
        bestPrice: {
          platform,
          price,
          savings: Math.floor(Math.random() * 20),
        },
        coupons: [],
      })
    }

    console.log(`✅ Returning ${transformedProducts.length} products`)

    // Add cache control headers to prevent caching
    const response = NextResponse.json({
      success: true,
      data: transformedProducts,
      total: transformedProducts.length,
    })

    // Disable caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response
  } catch (error) {
    console.error('Product search error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid search parameters', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      success: true,
      message: 'Search query logged',
    })
  } catch (error) {
    console.error('Search logging error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log search' },
      { status: 500 }
    )
  }
}
