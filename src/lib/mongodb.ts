import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const options = {}

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

let client = new MongoClient(uri, options)
let clientPromise = client.connect()

export default clientPromise
