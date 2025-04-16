import { connectToDatabase } from '../../lib/mongodb';

export async function handler(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('transactions');

  if (req.method === 'GET') {
    const transactions = await collection.find({}).toArray();
    return res.status(200).json(transactions);
  }

  if (req.method === 'POST') {
    const { amount, category, date, description } = req.body;
    const result = await collection.insertOne({
      amount,
      category,
      date,
      description,
    });
    return res.status(201).json(result);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
