import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ProductService } from '@/lib/product-service'

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

    // Use ProductService to search across all platforms
    const products = await ProductService.searchProducts(validatedData.query)

    // Transform data for frontend
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: `Product from ${product.platform}`,
      imageUrl: product.image,
      category: 'General',
      brand: product.platform,
      prices: {
        [product.platform]: {
          price: product.price,
          platform: product.platform,
          url: product.url,
          inStock: product.inStock,
          createdAt: new Date()
        }
      },
      bestPrice: {
        platform: product.platform,
        price: product.price,
        savings: 0,
      },
      coupons: [],
    }))

    return NextResponse.json({
      success: true,
      data: transformedProducts,
      total: products.length,
    })
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
    
    // For now, return mock data for demonstration
    // In production, this would save search queries or track user behavior
    
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
