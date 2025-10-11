import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Heart, Eye, Clock, Plus, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Post {
  _id: string;
  title: string;
  content: string;
  type: 'general' | 'episode';
  likes: number;
  commentCount: number;
  views: number;
  createdAt: string;
  isAnonymous: boolean;
  user: {
    username: string;
    displayName?: string;
  };
  episode?: {
    title: string;
    episodeNumber: number;
  };
}

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'general' | 'episodes'>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, [activeTab]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/status');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') {
        params.set('type', activeTab === 'general' ? 'general' : 'episode');
      }
      
      const response = await fetch(`/api/forum/posts?${params}`);
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f1e16] to-[#5a120e]">
      {/* Header */}
      <header className="bg-[#0c0b0b]/80 backdrop-blur-md border-b border-[#e2d6c7]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#e2d6c7] hover:text-white hover:bg-[#e2d6c7]/10 -ml-2"
                onClick={() => window.location.href = '/xxperiment/index.html'}
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <a href="/xxperiment/index.html" className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e2d6c7] font-['Alfa_Slab_One'] hover:opacity-80 transition-opacity">
                The XXperiment
              </a>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-[#e2d6c7] hover:text-white"
                    onClick={() => window.location.href = '/profile'}
                  >
                    <span className="hidden sm:inline">Profile</span>
                    <span className="sm:hidden">👤</span>
                  </Button>
                  <Button 
                    className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7]"
                    onClick={() => window.location.href = '/forum/new'}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">New Post</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-[#e2d6c7] hover:text-white"
                    onClick={() => window.location.href = '/auth/signin'}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7]"
                    onClick={() => window.location.href = '/auth/signup'}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#e2d6c7] mb-4 font-['Alfa_Slab_One']">
            Community Forum
          </h1>
          <p className="text-[#e2d6c7]/80 text-lg">
            Join the conversation about women's health, wellness, and empowerment
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="mb-6">
          <TabsList className="bg-[#3d1d19] border-[#e2d6c7]/20 w-full sm:w-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#7f1e16] data-[state=active]:text-[#e2d6c7]">
              All Posts
            </TabsTrigger>
            <TabsTrigger value="general" className="data-[state=active]:bg-[#7f1e16] data-[state=active]:text-[#e2d6c7]">
              General
            </TabsTrigger>
            <TabsTrigger value="episodes" className="data-[state=active]:bg-[#7f1e16] data-[state=active]:text-[#e2d6c7]">
              Episodes
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Posts List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e2d6c7] mx-auto"></div>
              <p className="text-[#e2d6c7]/80 mt-4">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <Card className="bg-[#e2d6c7]/95 border-[#3d1d19]">
              <CardContent className="py-12 text-center">
                <p className="text-[#6b5751] text-lg mb-4">No posts yet. Be the first to start a conversation!</p>
                {isAuthenticated && (
                  <Button 
                    className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7]"
                    onClick={() => window.location.href = '/forum/new'}
                  >
                    Create First Post
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Link key={post._id} href={`/forum/post/${post._id}`}>
                <Card className="bg-[#e2d6c7]/95 border-[#3d1d19] hover:bg-[#e2d6c7] transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-[#0c0b0b] text-lg md:text-xl mb-2 line-clamp-2">
                          {post.title}
                        </CardTitle>
                        {post.episode && (
                          <CardDescription className="text-[#7f1e16] font-semibold mb-2">
                            Episode {post.episode.episodeNumber}: {post.episode.title}
                          </CardDescription>
                        )}
                        <CardDescription className="text-[#6b5751] text-sm">
                          by {post.isAnonymous ? 'Anonymous' : (post.user?.displayName || post.user?.username || 'Unknown')} • {formatTimeAgo(post.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#6b5751] line-clamp-2 mb-4">
                      {post.content}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b5751]">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.commentCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

