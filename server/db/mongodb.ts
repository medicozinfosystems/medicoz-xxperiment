import { MongoClient, Db, Collection } from 'mongodb';

// MongoDB connection URI - use environment variable for production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'xxperiment';
const ADMIN_DB_NAME = process.env.MONGODB_ADMIN_DB_NAME || 'xxperiment_admin';

let client: MongoClient | null = null;
let db: Db | null = null;
let adminDb: Db | null = null;

export async function connectToMongoDB(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    adminDb = client.db(ADMIN_DB_NAME);
    
    console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
    console.log(`✅ Connected to Admin MongoDB: ${ADMIN_DB_NAME}`);
    
    // Create indexes
    await createIndexes(db);
    await createAdminIndexes(adminDb);
    
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

async function createAdminIndexes(database: Db) {
  try {
    // Contacts collection indexes in admin database
    await database.collection('contacts').createIndex({ email: 1 });
    await database.collection('contacts').createIndex({ createdAt: -1 });
    await database.collection('contacts').createIndex({ isRead: 1 });
    await database.collection('contacts').createIndex({ intent: 1 });
    
    console.log('✅ Admin database indexes created');
  } catch (error) {
    console.error('⚠️  Error creating admin indexes:', error);
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

export async function getContactsCollection(): Promise<Collection> {
  const database = await getDatabase();
  return database.collection('contacts');
}

export async function getAdminDatabase(): Promise<Db> {
  if (!adminDb) {
    await connectToMongoDB();
  }
  return adminDb!;
}

export async function getAdminContactsCollection(): Promise<Collection> {
  const database = await getAdminDatabase();
  return database.collection('contacts');
}



