'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, signInAnonymouslyUser } from '@/lib/firebase';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Anonymous');
  const [topics, setTopics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          const userCredential = await signInAnonymouslyUser();
          setUser(userCredential);
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Auth initialization error:", error.message);
      }
    };
    initializeAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const uid = user ? user.uid : 'anonymous';
      const tags = topics.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      const docRef = await addDoc(collection(db, 'posts'), {
        title,
        content,
        author: uid === 'anonymous' ? 'Anonymous' : `User_${uid.substring(0, 8)}`,
        date: serverTimestamp(),
        likes: 0,
        tags,
        excerpt: content.substring(0, 100) // Auto-generate excerpt
      });
      console.log("Post created with ID:", docRef.id);
      setTitle('');
      setContent('');
      setAuthor('Anonymous');
      setTopics('');
      // Optionally redirect to the new post page: window.location.href = `/blog/${docRef.id}`;
    } catch (err) {
      console.error("Error creating post:", err.message || err);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="topics" className="block text-sm font-medium text-foreground">
            Topics (comma-separated, e.g., dark-forest, theory)
          </label>
          <input
            id="topics"
            type="text"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            className="w-full p-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., dark-forest, theory"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-foreground">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={6}
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-foreground">
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
}