import { MongoClient, Db, Collection } from 'mongodb';

// MongoDB connection URI - use environment variable for production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'xxperiment';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToMongoDB(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    
    console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
    
    // Create indexes
    await createIndexes(db);
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

async function createIndexes(database: Db) {
  try {
    // Users collection indexes
    await database.collection('users').createIndex({ email: 1 }, { unique: true });
    await database.collection('users').createIndex({ username: 1 }, { unique: true });
    
    // Posts collection indexes
    await database.collection('posts').createIndex({ createdAt: -1 });
    await database.collection('posts').createIndex({ episodeId: 1 });
    await database.collection('posts').createIndex({ userId: 1 });
    await database.collection('posts').createIndex({ isModerated: 1 });
    
    // Comments collection indexes
    await database.collection('comments').createIndex({ postId: 1 });
    await database.collection('comments').createIndex({ createdAt: -1 });
    await database.collection('comments').createIndex({ userId: 1 });
    
    console.log('✅ Database indexes created');
  } catch (error) {
    console.error('⚠️  Error creating indexes:', error);
  }
}

export async function getDatabase(): Promise<Db> {
  if (!db) {
    return await connectToMongoDB();
  }
  return db;
}

export async function closeMongoDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

// Export collection helpers
export async function getUsersCollection(): Promise<Collection> {
  const database = await getDatabase();
  return database.collection('users');
}

export async function getPostsCollection(): Promise<Collection> {
  const database = await getDatabase();
  return database.collection('posts');
}

export async function getCommentsCollection(): Promise<Collection> {
  const database = await getDatabase();
  return database.collection('comments');
}

export async function getEpisodesCollection(): Promise<Collection> {
  const database = await getDatabase();
  return database.collection('episodes');
}

export async function getModerationLogsCollection(): Promise<Collection> {
  const database = await getDatabase();
  return database.collection('moderation_logs');
}



