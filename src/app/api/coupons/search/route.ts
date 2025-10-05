import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const couponSearchSchema = z.object({
  productId: z.string().optional(),
  platform: z.string().optional(),
  category: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId') || undefined
    const platform = searchParams.get('platform') || undefined
    const category = searchParams.get('category') || undefined
    const limit = parseInt(searchParams.get('limit') || '20')

    const validatedData = couponSearchSchema.parse({
      productId,
      platform,
      category,
      limit,
    })

    const coupons = await prisma.coupon.findMany({
      where: {
        isActive: true,
        ...(validatedData.productId && { productId: validatedData.productId }),
        ...(validatedData.platform && { platform: validatedData.platform }),
        ...(validatedData.category && {
          product: {
            category: validatedData.category,
          },
        }),
        validUntil: {
          gte: new Date(), // Only active coupons
        },
      },
      include: {
        product: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [
        { discountType: 'desc' }, // Percentage discounts first
        { discount: 'desc' }, // Higher discounts first
      ],
      take: validatedData.limit,
    })

    // Transform data for frontend
    const transformedCoupons = coupons.map(coupon => ({
      id: coupon.id,
      code: coupon.code,
      description: coupon.description,
      discount: coupon.discount,
      discountType: coupon.discountType,
      platform: coupon.platform,
      validUntil: coupon.validUntil,
      product: coupon.product,
      isActive: coupon.isActive,
    }))

    return NextResponse.json({
      success: true,
      data: transformedCoupons,
      total: coupons.length,
    })
  } catch (error) {
    console.error('Coupon search error:', error)
    
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
