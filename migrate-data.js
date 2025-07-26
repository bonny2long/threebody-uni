import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';

const blogPosts = JSON.parse(readFileSync('./blog-posts.json', 'utf8'));
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing. Check your .env file.');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateData() {
  try {
    for (const post of blogPosts) {
      if (!post.id || !post.title || !post.author || !post.date) {
        console.warn(`Skipping invalid post: ${JSON.stringify(post)}`);
        continue;
      }
      await addDoc(collection(db, 'posts'), {
        id: post.id,
        title: post.title,
        content: post.content || '',
        author: post.author,
        date: Timestamp.fromDate(new Date(post.date)),
        likes: post.likes || 0,
        comments: post.comments || 0,
        tags: post.tags || [],
        excerpt: post.excerpt || post.content.substring(0, 100) || ''
      });
      console.log(`Migrated post with ID: ${post.id}`);
    }
    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error.message || error);
  }
}

migrateData();