// src/app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET() {
  const db = client.db('finance');
  const collection = db.collection('transactions');
  const transactions = await collection.find({}).toArray();
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const data = await req.json();
  const db = client.db('finance');
  const collection = db.collection('transactions');
  const result = await collection.insertOne(data);
  return NextResponse.json(result, { status: 201 });
}
