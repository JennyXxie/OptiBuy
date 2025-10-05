import { NextRequest, NextResponse } from 'next/server'
import { ProductService } from '@/lib/product-service'
import { generateGeminiResponse } from '@/lib/gemini'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || 'wireless headphones'
    const testType = searchParams.get('type') || 'all'

    const results: any = {
      query,
      testType,
      timestamp: new Date().toISOString(),
    }

    if (testType === 'products' || testType === 'all') {
      console.log(`Testing product search for: ${query}`)
      const products = await ProductService.searchProducts(query)
      results.products = {
        count: products.length,
        sample: products.slice(0, 3),
        platforms: [...new Set(products.map(p => p.platform))]
      }
    }

    if (testType === 'gemini' || testType === 'all') {
      console.log('Testing Gemini AI response')
      try {
        const aiResponse = await generateGeminiResponse(`Test message about ${query}`)
        results.gemini = {
          success: true,
          response: aiResponse.substring(0, 200) + '...'
        }
      } catch (error) {
        results.gemini = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: results
    })
  } catch (error) {
    console.error('Integration test error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, platforms } = body

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      )
    }

    console.log(`Testing product search for: ${query}`)
    const products = await ProductService.searchProducts(query)

    const results = {
      query,
      platforms: platforms || ['temu', 'ebay', 'walmart', 'amazon'],
      totalProducts: products.length,
      productsByPlatform: products.reduce((acc, product) => {
        acc[product.platform] = (acc[product.platform] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      sampleProducts: products.slice(0, 5),
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: results
    })
  } catch (error) {
    console.error('Integration test error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
