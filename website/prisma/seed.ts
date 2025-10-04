import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        category: 'Electronics',
        brand: 'TechSound',
        sku: 'TS-WH-001',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smart Fitness Tracker',
        description: 'Advanced fitness tracker with heart rate monitoring',
        imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=300&h=300&fit=crop',
        category: 'Electronics',
        brand: 'FitTech',
        sku: 'FT-ST-002',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Portable Phone Charger',
        description: 'High-capacity portable charger for smartphones',
        imageUrl: 'https://images.unsplash.com/photo-1609592807901-5f8a6a0a8f1a?w=300&h=300&fit=crop',
        category: 'Electronics',
        brand: 'PowerUp',
        sku: 'PU-PC-003',
      },
    }),
  ])

  // Create sample prices for each product
  for (const product of products) {
    // Amazon prices
    await prisma.price.createMany({
      data: [
        {
          productId: product.id,
          platform: 'amazon',
          price: product.name.includes('Headphones') ? 89.99 : 
                product.name.includes('Tracker') ? 129.99 : 29.99,
          currency: 'USD',
          url: 'https://amazon.com/product',
          inStock: true,
        },
      ],
    })

    // Temu prices
    await prisma.price.createMany({
      data: [
        {
          productId: product.id,
          platform: 'temu',
          price: product.name.includes('Headphones') ? 45.99 : 
                product.name.includes('Tracker') ? 67.99 : 18.99,
          currency: 'USD',
          url: 'https://temu.com/product',
          inStock: true,
        },
      ],
    })

    // Shein prices
    await prisma.price.createMany({
      data: [
        {
          productId: product.id,
          platform: 'shein',
          price: product.name.includes('Headphones') ? 52.99 : 
                product.name.includes('Tracker') ? 79.99 : 22.99,
          currency: 'USD',
          url: 'https://shein.com/product',
          inStock: true,
        },
      ],
    })
  }

  // Create sample coupons
  await prisma.coupon.createMany({
    data: [
      {
        productId: products[0].id,
        code: 'TEMU20',
        description: '20% off wireless headphones',
        discount: 20,
        discountType: 'percentage',
        platform: 'temu',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
      },
      {
        productId: products[1].id,
        code: 'SHEIN30',
        description: '30% off fitness trackers',
        discount: 30,
        discountType: 'percentage',
        platform: 'shein',
        validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        isActive: true,
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
