import { MongoClient, type Db } from "mongodb"

const MONGODB_URI =
  "mongodb+srv://tribhiyantrayam358:BGsYrc8hKOCdjQ7w@cluster0.eqxhmjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const MONGODB_DB = "affiliate_comparison"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(MONGODB_DB)

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
