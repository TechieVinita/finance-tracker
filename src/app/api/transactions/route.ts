import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('finance')
    const transactions = await db.collection('transactions').find({}).toArray()

    return NextResponse.json(transactions)
  } catch (error) {
    console.error(error)
    return new NextResponse('Failed to fetch transactions', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db('finance')
    const result = await db.collection('transactions').insertOne(body)

    return NextResponse.json({ ...body, _id: result.insertedId })
  } catch (error) {
    console.error(error)
    return new NextResponse('Failed to save transaction', { status: 500 })
  }
}
