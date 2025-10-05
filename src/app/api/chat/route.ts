import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { processOptimizedChatFlow } from '@/lib/optimized-chat-flow'

const chatSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().optional(),
  userId: z.string().optional(),
})

// Process through optimized chat flow: User → Gemini → SerpAPI

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

    // Process through optimized chat flow: User → Gemini → SerpAPI
    console.log(`🚀 Starting optimized chat flow for session: ${sessionId}`)
    
    const chatResult = await processOptimizedChatFlow(validatedData.message, sessionId)

    // Save AI response
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'assistant',
        content: chatResult.response,
      },
    })

    // Prepare response data
    const responseData: any = {
      sessionId: chatResult.sessionId,
      response: chatResult.response,
      timestamp: chatResult.timestamp,
    }

    // Add products data if available
    if (chatResult.products && chatResult.products.length > 0) {
      responseData.products = chatResult.products
    }

    return NextResponse.json({
      success: true,
      data: responseData,
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
