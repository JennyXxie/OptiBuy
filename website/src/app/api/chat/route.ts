import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { generateGeminiResponse, generateProductAnalysis } from '@/lib/gemini'
import { ProductService } from '@/lib/product-service'

const chatSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().optional(),
  userId: z.string().optional(),
})

// Helper function to extract product query from user message
function extractProductQuery(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Remove common question words and search terms
  const cleanedMessage = lowerMessage
    .replace(/\b(find|search|look for|show me|recommend|best|cheap|deal|buy)\b/g, '')
    .replace(/\b(headphones|laptop|phone|smartphone|computer|tablet|watch|tv|monitor)\b/g, (match) => match)
    .trim()
  
  return cleanedMessage || message
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = chatSchema.parse(body)

    // Create or find chat session
    let sessionId = validatedData.sessionId
    if (!sessionId) {
      const newSession = await prisma.chatSession.create({
        data: {
          userId: validatedData.userId,
        },
      })
      sessionId = newSession.id
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'user',
        content: validatedData.message,
      },
    })

    // Generate AI response with Gemini
    let aiResponse: string
    
    // Check if the message contains product search keywords
    const searchKeywords = ['find', 'search', 'look for', 'show me', 'recommend', 'best', 'cheap', 'deal']
    const containsSearchKeywords = searchKeywords.some(keyword => 
      validatedData.message.toLowerCase().includes(keyword)
    )

    if (containsSearchKeywords) {
      // Extract product query from message
      const productQuery = extractProductQuery(validatedData.message)
      
      // Search for products
      const products = await ProductService.searchProducts(productQuery)
      
      if (products.length > 0) {
        // Generate AI analysis of products
        aiResponse = await generateProductAnalysis(products, validatedData.message)
      } else {
        // Fallback to general response
        aiResponse = await generateGeminiResponse(validatedData.message)
      }
    } else {
      // General conversation
      aiResponse = await generateGeminiResponse(validatedData.message)
    }

    // Save AI response
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'assistant',
        content: aiResponse,
      },
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        response: aiResponse,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.error('Chat history error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
