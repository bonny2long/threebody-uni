'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Calendar, ArrowLeft, Reply } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, addDoc, orderBy, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, signInAnonymouslyUser } from '@/lib/firebase';
import { User } from 'firebase/auth';

interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  replies: Comment[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  tags: string[];
  excerpt: string;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          const userCredential = await signInAnonymouslyUser();
          if (isMounted) setUser(userCredential);
        } else {
          if (isMounted) setUser(currentUser);
        }
      } catch (error) {
        console.error("Auth initialization error:", error instanceof Error ? error.message : String(error));
        if (isMounted) setIsOffline(true);
      }
    };

    const fetchPost = async () => {
      setLoading(true);
      try {
        console.log("Fetching post for slug:", resolvedParams.slug);
        const postDoc = await getDoc(doc(db, 'posts', resolvedParams.slug));
        if (postDoc.exists() && isMounted) {
          const data = postDoc.data();
          setPost({
            id: postDoc.id,
            title: data.title || 'Untitled',
            content: data.content || '',
            author: data.author || 'Anonymous',
            date: data.date?.toDate().toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
            likes: data.likes || 0,
            tags: data.tags || [],
            excerpt: data.excerpt || data.content.substring(0, 100) || ''
          });
        } else if (isMounted) {
          console.warn("Post not found in Firestore for slug:", resolvedParams.slug);
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error instanceof Error ? error.message : String(error));
        if (isMounted) setIsOffline(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();
    fetchPost();

    const q = query(collection(db, `posts/${resolvedParams.slug}/comments`), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Snapshot received, docs:", snapshot.docs.length);
      const commentsData = snapshot.docs.map(doc => {
        const data = doc.data();
        const date = data.date ? (data.date.toDate ? data.date.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0];
        return { id: doc.id, ...data, date, replies: [] } as Comment;
      });
      if (isMounted) setComments(commentsData);
    }, (error) => {
      console.error("Firestore listener error:", error.message);
      if (isMounted) setIsOffline(true);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [resolvedParams.slug]);

  if (!post && !loading) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const addComment = async () => {
    if (!newComment.trim() || isOffline) return;

    try {
      const uid = user ? user.uid : 'anonymous';
      const docRef = await addDoc(collection(db, `posts/${resolvedParams.slug}/comments`), {
        author: uid === 'anonymous' ? 'Anonymous' : `User_${uid.substring(0, 8)}`,
        content: newComment.trim(),
        likes: 0,
        date: serverTimestamp(),
        replies: []
      });
      console.log("Comment added with ID:", docRef.id);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error.message);
      setIsOffline(true);
    }
  };

  if (loading) {
    return <div className="container mx-auto max-w-4xl px-4 py-8">Loading...</div>;
  }

  if (isOffline) {
    return <div className="container mx-auto max-w-4xl px-4 py-8">Offline. Please check your internet connection and try again.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>
      <article className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => <Badge key={tag} variant="secondary">{tag.replace('-', ' ')}</Badge>)}
          </div>
          <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{getAuthorInitials(post.author)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
          </div>
        </div>
        <Separator />
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
          <div className="space-y-4 text-base leading-relaxed">
            <p>{post.content}</p>
            <p>In the vast cosmic arena described by Liu Cixin, every civilization faces the same fundamental dilemma: reveal yourself and risk annihilation, or remain hidden and survive in isolation. The Dark Forest theory suggests that the universe is filled with civilizations, but they all remain silent out of fear.</p>
            <p>What makes the Singer civilization so terrifying is not just their technological superiority, but their complete detachment from moral considerations. They operate like a cosmic immune system, automatically responding to any detected &quot;infection&quot; of intelligent life.</p>
            <p>The psychological implications are staggering. Imagine being part of a civilization that has survived by becoming hunters, knowing that your very existence depends on the systematic elimination of others who might threaten you. The hunters in this dark forest may suffer from an existential horror that their prey never experiences.</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant={liked ? "default" : "outline"} onClick={() => setLiked(prev => !prev)} className="flex items-center gap-2">
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              {post.likes + (liked ? 1 : 0)}
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              {comments.length} comments
            </div>
          </div>
        </div>
      </article>
      <Separator className="my-8" />
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Discussion</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Join the Discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this analysis..."
              className="w-full p-3 border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              disabled={isOffline}
            />
            <div className="flex justify-between">
              <p className="text-xs text-muted-foreground">Remember to follow Dark Forest Protocol guidelines</p>
              <Button onClick={addComment} disabled={!newComment.trim() || isOffline}>Post Comment</Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{getAuthorInitials(comment.author)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.content}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Heart className="h-3 w-3 mr-1" /> {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Reply className="h-3 w-3 mr-1" /> Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}