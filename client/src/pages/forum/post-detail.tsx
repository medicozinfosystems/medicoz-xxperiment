import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Heart, MessageSquare, Eye, Send } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  content: string;
  likes: number;
  likedBy: string[];
  commentCount: number;
  views: number;
  createdAt: string;
  isAnonymous: boolean;
  user: {
    _id: string;
    username: string;
    displayName?: string;
  };
  episode?: {
    title: string;
    episodeNumber: number;
  };
}

interface Comment {
  _id: string;
  content: string;
  likes: number;
  createdAt: string;
  isAnonymous: boolean;
  user: {
    username: string;
    displayName?: string;
  };
  replies?: Comment[];
}

export default function PostDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isAnonymousComment, setIsAnonymousComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    checkAuth();
    fetchPost();
    fetchComments();
  }, [id]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/status');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      if (data.user) {
        setCurrentUserId(data.user._id);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/forum/posts/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setPost(data.post);
      } else {
        toast({
          title: 'Error',
          description: 'Post not found',
          variant: 'destructive',
        });
        setLocation('/forum');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/forum/posts/${id}/comments`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      setLocation('/auth/signin');
      return;
    }

    try {
      const response = await fetch(`/api/forum/posts/${id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        fetchPost(); // Refresh to get updated likes
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to like post',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setLocation('/auth/signin');
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);

    try {
      const response = await fetch(`/api/forum/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          parentCommentId: replyingTo,
          isAnonymous: isAnonymousComment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Comment posted!',
          description: 'Your comment has been added.',
        });
        setNewComment('');
        setIsAnonymousComment(false);
        setReplyingTo(null);
        fetchComments();
        fetchPost(); // Update comment count
      } else {
        toast({
          title: 'Failed to post comment',
          description: data.error || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post comment',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
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

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7f1e16] to-[#5a120e] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e2d6c7] mx-auto"></div>
          <p className="text-[#e2d6c7]/80 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const isLiked = post.likedBy?.includes(currentUserId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f1e16] to-[#5a120e]">
      <header className="bg-[#0c0b0b]/80 backdrop-blur-md border-b border-[#e2d6c7]/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            className="text-[#e2d6c7] hover:text-white -ml-2"
            onClick={() => setLocation('/forum')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forum
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Post Card */}
        <Card className="bg-[#e2d6c7]/95 border-[#3d1d19]">
          <CardHeader>
            {post.episode && (
              <div className="text-[#7f1e16] font-semibold mb-2">
                Episode {post.episode.episodeNumber}: {post.episode.title}
              </div>
            )}
            <CardTitle className="text-2xl md:text-3xl text-[#0c0b0b] mb-4">
              {post.title}
            </CardTitle>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-[#7f1e16] text-[#e2d6c7]">
                  {post.isAnonymous ? 'A' : getInitials(post.user.displayName || post.user.username)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-[#0c0b0b]">
                  {post.isAnonymous ? 'Anonymous' : (post.user.displayName || post.user.username)}
                </p>
                <p className="text-sm text-[#6b5751]">
                  {formatTimeAgo(post.createdAt)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#6b5751] whitespace-pre-wrap leading-relaxed">
              {post.content}
            </p>
            
            <div className="flex items-center gap-6 pt-4 border-t border-[#6b5751]/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`gap-2 ${isLiked ? 'text-red-600' : 'text-[#6b5751]'} hover:text-red-600`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </Button>
              <div className="flex items-center gap-2 text-[#6b5751]">
                <MessageSquare className="w-5 h-5" />
                <span>{post.commentCount}</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b5751]">
                <Eye className="w-5 h-5" />
                <span>{post.views}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="bg-[#e2d6c7]/95 border-[#3d1d19]">
          <CardHeader>
            <CardTitle className="text-xl text-[#0c0b0b]">
              Comments ({comments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* New Comment Form */}
            {isAuthenticated ? (
              <form onSubmit={handleSubmitComment} className="space-y-3">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="bg-white border-[#6b5751] text-[#0c0b0b] resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="comment-anonymous"
                      checked={isAnonymousComment}
                      onCheckedChange={(checked) => setIsAnonymousComment(checked as boolean)}
                      className="border-[#6b5751]"
                    />
                    <Label
                      htmlFor="comment-anonymous"
                      className="text-sm text-[#6b5751] cursor-pointer"
                    >
                      Post anonymously
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    {replyingTo && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setReplyingTo(null)}
                        className="text-[#6b5751]"
                      >
                        Cancel Reply
                      </Button>
                    )}
                    <Button
                      type="submit"
                      disabled={submitting || !newComment.trim()}
                      className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7]"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {submitting ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-[#7f1e16]/10 border border-[#7f1e16]/30 rounded-lg p-4 text-center">
                <p className="text-[#6b5751] mb-3">Sign in to join the conversation</p>
                <Button 
                  className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7]"
                  onClick={() => setLocation('/auth/signin')}
                >
                  Sign In
                </Button>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id} className="bg-white/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-[#7f1e16] text-[#e2d6c7] text-xs">
                        {comment.isAnonymous ? 'A' : getInitials(comment.user.displayName || comment.user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-[#0c0b0b] text-sm">
                          {comment.isAnonymous ? 'Anonymous' : (comment.user.displayName || comment.user.username)}
                        </p>
                        <span className="text-xs text-[#6b5751]">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-[#6b5751] text-sm whitespace-pre-wrap">
                        {comment.content}
                      </p>
                      
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 space-y-3 pl-4 border-l-2 border-[#7f1e16]/30">
                          {comment.replies.map((reply) => (
                            <div key={reply._id} className="flex items-start gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-[#6b5751] text-[#e2d6c7] text-xs">
                                  {reply.isAnonymous ? 'A' : getInitials(reply.user.displayName || reply.user.username)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-[#0c0b0b] text-xs">
                                    {reply.isAnonymous ? 'Anonymous' : (reply.user.displayName || reply.user.username)}
                                  </p>
                                  <span className="text-xs text-[#6b5751]">
                                    {formatTimeAgo(reply.createdAt)}
                                  </span>
                                </div>
                                <p className="text-[#6b5751] text-sm">
                                  {reply.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


