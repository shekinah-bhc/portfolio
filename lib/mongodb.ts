import { MongoClient } from 'mongodb'
import dns from 'dns'

// Fix for Node.js 17+ and Windows DNS resolution issues with MongoDB Atlas SRV records
dns.setDefaultResultOrder('ipv4first')

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDB() {
  const client = await clientPromise
  return client.db("portfolio")
}
