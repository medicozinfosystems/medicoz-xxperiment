/**
 * Script to seed sample episodes into the database
 * Run with: npx tsx server/utils/seed-episodes.ts
 */

import { connectToMongoDB, getEpisodesCollection } from '../db/mongodb';
import type { Episode } from '../db/schemas';

const sampleEpisodes: Omit<Episode, '_id'>[] = [
  {
    slug: 'understanding-pcos',
    title: 'Understanding PCOS: Breaking Down the Myths',
    description: 'A comprehensive discussion about Polycystic Ovary Syndrome, its symptoms, and management strategies.',
    episodeNumber: 1,
    releaseDate: new Date('2024-01-15'),
    coverImage: 'https://via.placeholder.com/400x400/7f1e16/e2d6c7?text=PCOS+Health',
    tags: ['PCOS', 'Hormones', 'Health'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'mental-health-matters',
    title: 'Mental Health Matters: Breaking the Stigma',
    description: 'An open conversation about mental health, anxiety, and self-care practices for women.',
    episodeNumber: 2,
    releaseDate: new Date('2024-01-22'),
    coverImage: 'https://via.placeholder.com/400x400/7f1e16/e2d6c7?text=Mental+Health',
    tags: ['Mental Health', 'Self-Care', 'Wellness'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'fertility-journey',
    title: 'The Fertility Journey: Stories and Science',
    description: 'Real stories and medical insights about fertility, conception, and reproductive health.',
    episodeNumber: 3,
    releaseDate: new Date('2024-01-29'),
    coverImage: 'https://via.placeholder.com/400x400/7f1e16/e2d6c7?text=Fertility+Journey',
    tags: ['Fertility', 'Pregnancy', 'Reproductive Health'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'menstrual-health',
    title: 'Menstrual Health: More Than Just a Period',
    description: 'Deep dive into menstrual health, cycle tracking, and understanding your body.',
    episodeNumber: 4,
    releaseDate: new Date('2024-02-05'),
    coverImage: 'https://via.placeholder.com/400x400/7f1e16/e2d6c7?text=Menstrual+Health',
    tags: ['Menstruation', 'Cycle', 'Health'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: 'nutrition-wellness',
    title: 'Nutrition and Wellness for Every Stage',
    description: 'Evidence-based nutrition advice tailored for different life stages and health goals.',
    episodeNumber: 5,
    releaseDate: new Date('2024-02-12'),
    coverImage: 'https://via.placeholder.com/400x400/7f1e16/e2d6c7?text=Nutrition+Wellness',
    tags: ['Nutrition', 'Wellness', 'Diet'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedEpisodes() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await connectToMongoDB();
    
    const episodesCollection = await getEpisodesCollection();
    
    // Check if episodes already exist
    const existingCount = await episodesCollection.countDocuments();
    
    if (existingCount > 0) {
      console.log(`ℹ️  Found ${existingCount} existing episodes. Skipping seed.`);
      console.log('💡 To reset, delete episodes manually and run this script again.');
      process.exit(0);
    }
    
    console.log('📝 Inserting sample episodes...');
    const result = await episodesCollection.insertMany(sampleEpisodes as any);
    
    console.log(`✅ Successfully inserted ${result.insertedCount} episodes!`);
    console.log('🎉 Sample episodes are now available in your forum.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding episodes:', error);
    process.exit(1);
  }
}

// Run the seeder
seedEpisodes();



