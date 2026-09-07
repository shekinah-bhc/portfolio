import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getDB } from '@/lib/mongodb'



// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>()
const RATE_LIMIT_THRESHOLD = 3
const RATE_LIMIT_WINDOW = 3600000 // 1 hour in ms

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must not exceed 2000 characters"),
})

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous'
    const now = Date.now()
    
    // Rate limit check
    const rateLimit = rateLimitMap.get(ip)
    if (rateLimit) {
      if (now - rateLimit.lastRequest < RATE_LIMIT_WINDOW) {
        if (rateLimit.count >= RATE_LIMIT_THRESHOLD) {
          return NextResponse.json(
            { success: false, message: 'Too many requests. Please try again in an hour.' },
            { status: 429 }
          )
        }
        rateLimit.count += 1
      } else {
        rateLimit.count = 1
        rateLimit.lastRequest = now
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastRequest: now })
    }

    const body = await req.json()
    const validatedData = contactSchema.parse(body)

    const { name, email, message } = validatedData

   



    const db = await getDB()
    await db.collection('messages').insertOne({
      name,
      email,
     
      message,
      ip,
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Contact API Error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
