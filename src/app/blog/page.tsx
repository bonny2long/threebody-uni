'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Calendar, User, PenTool, Filter, Search } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes?: number;
  comments?: number;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          excerpt: data.excerpt || '',
          author: data.author || 'Anonymous',
          tags: data.tags || [],
          date: data.date?.toDate().toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          likes: data.likes || 0,
          content: data.content || ''
        };
      });
      setPosts(postsData);
    }, (error) => {
      console.error("Error fetching posts:", error.message || error);
    });

    return () => unsubscribe();
  }, []);

  // Filter posts based on selected tag and search query
  const filteredPosts = posts.filter(post => {
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTag && matchesSearch;
  });

  // Get all unique tags from fetched posts
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Dark Forest Chronicles
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A collaborative space for Three-Body Universe discussions, theories, and analysis. 
          Share your thoughts on cosmic civilizations, dark forest theory, and the implications of contact.
        </p>
      </div>
      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Tag Filters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by topic:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="text-xs"
            >
              All Topics
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className="text-xs"
              >
                {tag.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-primary">
              {filteredPosts.length}
            </CardTitle>
            <CardDescription>Discussion Posts</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-green-500">
              {filteredPosts.reduce((sum, post) => sum + (post.comments || 0), 0)}
            </CardTitle>
            <CardDescription>Total Comments</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-red-500">
              {filteredPosts.reduce((sum, post) => sum + (post.likes || 0), 0)}
            </CardTitle>
            <CardDescription>Community Likes</CardDescription>
          </CardHeader>
        </Card>
      </div>
      {/* Create Post Section */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-purple-600/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Share Your Analysis
          </CardTitle>
          <CardDescription>
            Have a theory about the Three-Body universe? Start a discussion!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/create-post">
              <PenTool className="h-4 w-4 mr-2" />
              Create New Post
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Note: Blog post creation functionality would be implemented with a full backend system
          </p>
        </CardContent>
      </Card>
      {/* Blog Posts */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Posts Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="space-y-2">
                  <Link href={`/blog/${post.id}`}>
                    <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </Link>
                  
                  {/* Author and Date */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag: string) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-primary/20"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base mb-4 leading-relaxed">
                  {post.excerpt}
                </CardDescription>

                <Separator className="my-4" />

                {/* Post Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {post.likes || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments || 0} comments
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-3 w-3 mr-1" />
                      Like
                    </Button>
                    <Button asChild size="sm">
                      <Link href={`/blog/${post.id}`}>
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Discuss
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {/* Community Guidelines */}
      <Card className="mt-12 bg-red-950/20 border-red-800">
        <CardHeader>
          <CardTitle className="text-red-200 flex items-center gap-2">
            ⚠️ Dark Forest Protocol Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="text-red-300 space-y-2">
          <p className="text-sm">
            • Keep discussions respectful and constructive
          </p>
          <p className="text-sm">
            • Cite sources when discussing scientific concepts
          </p>
          <p className="text-sm">
            • Use spoiler warnings for major plot revelations
          </p>
          <p className="text-sm">
            • Remember: &quot;The universe is a dark forest&quot; - approach with caution and wisdom
          </p>
        </CardContent>
      </Card>
    </div>
  );
}