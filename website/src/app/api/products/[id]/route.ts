import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        prices: {
          orderBy: { createdAt: 'desc' },
        },
        coupons: {
          where: { isActive: true },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get price history for charts
    const priceHistory = await prisma.price.findMany({
      where: { productId },
      orderBy: { createdAt: 'asc' },
    })

    // Group prices by platform and date
    const pricesByPlatform = priceHistory.reduce((acc, price) => {
      if (!acc[price.platform]) {
        acc[price.platform] = []
      }
      acc[price.platform].push({
        date: price.createdAt.toISOString(),
        price: price.price,
        inStock: price.inStock,
      })
      return acc
    }, {} as Record<string, any[]>)

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        priceHistory: pricesByPlatform,
      },
    })
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
