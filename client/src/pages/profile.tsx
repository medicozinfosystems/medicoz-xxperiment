import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Heart, MessageSquare, LogOut, Settings, Edit2, Clock, Eye, Bell } from 'lucide-react';

interface User {
  _id: string;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  role: string;
  isVerified: boolean;
  notificationSettings?: {
    email: boolean;
  };
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  likes: number;
  commentCount: number;
  views: number;
  isAnonymous: boolean;
  createdAt: string;
  user?: {
    username: string;
    displayName?: string;
  };
}

interface Comment {
  _id: string;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
  post: {
    _id: string;
    title: string;
  } | null;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Edit profile form state
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);

  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
    fetchUserComments();
    fetchLikedPosts();
  }, []);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
      setEmailNotifications(user.notificationSettings?.email ?? true);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/auth/me');
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setLocation('/auth/signin');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load profile',
        variant: 'destructive',
      });
      setLocation('/auth/signin');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch('/api/auth/me/posts');
      if (response.ok) {
        const data = await response.json();
        console.log('[Profile] Fetched posts:', data.posts?.length || 0, data.posts);
        setPosts(data.posts || []);
      } else {
        console.error('[Profile] Failed to fetch posts:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchUserComments = async () => {
    try {
      const response = await fetch('/api/auth/me/comments');
      if (response.ok) {
        const data = await response.json();
        console.log('[Profile] Fetched comments:', data.comments?.length || 0, data.comments);
        setComments(data.comments || []);
      } else {
        console.error('[Profile] Failed to fetch comments:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const response = await fetch('/api/auth/me/liked-posts');
      if (response.ok) {
        const data = await response.json();
        setLikedPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Failed to fetch liked posts:', error);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName, bio }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditDialogOpen(false);
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully.',
        });
      } else {
        const data = await response.json();
        toast({
          title: 'Failed to update profile',
          description: data.error || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);

    try {
      const response = await fetch('/api/auth/me/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailNotifications,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        toast({
          title: 'Settings updated',
          description: 'Your notification preferences have been saved.',
        });
      } else {
        toast({
          title: 'Failed to update settings',
          description: 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      });

      if (response.ok) {
        toast({
          title: 'Signed out',
          description: 'You have been signed out successfully.',
        });
        window.location.href = '/xxperiment/index.html';
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return formatDate(date);
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f1e16] to-[#5a120e]">
      <header className="bg-[#0c0b0b]/80 backdrop-blur-md border-b border-[#e2d6c7]/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <Button 
            variant="ghost" 
            className="text-[#e2d6c7] hover:text-white -ml-2 text-sm sm:text-base"
            onClick={() => setLocation('/forum')}
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            Back to Forum
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Profile Header Card */}
        <Card className="bg-[#e2d6c7]/95 border-[#3d1d19]">
          <CardHeader className="pb-3 sm:pb-6">
            <div className="flex flex-col gap-4">
              {/* Avatar and Info Section */}
              <div className="flex items-start gap-3 sm:gap-4">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                  <AvatarFallback className="bg-[#7f1e16] text-[#e2d6c7] text-xl sm:text-2xl">
                    {getInitials(user.displayName || user.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#0c0b0b] truncate">
                    {user.displayName || user.username}
                  </h1>
                  <p className="text-sm sm:text-base text-[#6b5751] truncate">@{user.username}</p>
                  <p className="text-xs sm:text-sm text-[#6b5751]/80 truncate mt-1">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs bg-[#7f1e16] text-[#e2d6c7] px-2 py-1 rounded capitalize">
                      {user.role}
                    </span>
                    {user.isVerified && (
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons Section */}
              <div className="flex gap-2 w-full">
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none border-[#7f1e16] text-[#7f1e16] hover:bg-[#7f1e16] hover:text-[#e2d6c7] text-xs sm:text-sm"
                    >
                      <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden xs:inline">Edit Profile</span>
                      <span className="xs:hidden">Edit</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#e2d6c7] border-[#3d1d19] max-w-[95vw] sm:max-w-md mx-3">
                    <DialogHeader>
                      <DialogTitle className="text-[#0c0b0b]">Edit Profile</DialogTitle>
                      <DialogDescription className="text-[#6b5751]">
                        Update your profile information
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName" className="text-[#0c0b0b]">
                          Display Name
                        </Label>
                        <Input
                          id="displayName"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Your display name"
                          maxLength={50}
                          className="bg-white border-[#6b5751]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-[#0c0b0b]">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell us about yourself..."
                          maxLength={500}
                          rows={4}
                          className="bg-white border-[#6b5751] resize-none"
                        />
                        <p className="text-xs text-[#6b5751]">{bio.length}/500 characters</p>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditDialogOpen(false)}
                          className="border-[#6b5751] text-[#6b5751]"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={saving}
                          className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7]"
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#7f1e16] text-[#7f1e16] hover:bg-[#7f1e16] hover:text-[#e2d6c7] text-xs sm:text-sm px-2 sm:px-4"
                    >
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Settings</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#e2d6c7] border-[#3d1d19] max-w-[95vw] sm:max-w-md mx-3">
                    <DialogHeader>
                      <DialogTitle className="text-[#0c0b0b]">Notification Settings</DialogTitle>
                      <DialogDescription className="text-[#6b5751]">
                        Manage how you receive notifications
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[#0c0b0b]">Email Notifications</Label>
                          <p className="text-sm text-[#6b5751]">Receive updates via email</p>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSettingsDialogOpen(false)}
                          className="border-[#6b5751] text-[#6b5751]"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveSettings}
                          disabled={savingSettings}
                          className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7]"
                        >
                          {savingSettings ? 'Saving...' : 'Save Settings'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-[#7f1e16] text-[#7f1e16] hover:bg-[#7f1e16] hover:text-[#e2d6c7] text-xs sm:text-sm px-2 sm:px-4"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          {user.bio && (
            <CardContent>
              <p className="text-[#6b5751]">{user.bio}</p>
            </CardContent>
          )}
        </Card>

        {/* Activity Tabs */}
        <Card className="bg-[#e2d6c7]/95 border-[#3d1d19]">
          <Tabs defaultValue="posts" className="w-full">
            <CardHeader className="pb-3 sm:pb-6">
              <TabsList className="grid w-full grid-cols-3 bg-[#6b5751]/20 h-auto">
                <TabsTrigger 
                  value="posts" 
                  className="data-[state=active]:bg-[#7f1e16] data-[state=active]:text-[#e2d6c7] text-xs sm:text-sm py-2 px-1 sm:px-4"
                >
                  <span className="hidden sm:inline">My Posts ({posts.length})</span>
                  <span className="sm:hidden">Posts<br/>({posts.length})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="comments" 
                  className="data-[state=active]:bg-[#7f1e16] data-[state=active]:text-[#e2d6c7] text-xs sm:text-sm py-2 px-1 sm:px-4"
                >
                  <span className="hidden sm:inline">Comments ({comments.length})</span>
                  <span className="sm:hidden">Comments<br/>({comments.length})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="liked" 
                  className="data-[state=active]:bg-[#7f1e16] data-[state=active]:text-[#e2d6c7] text-xs sm:text-sm py-2 px-1 sm:px-4"
                >
                  <span className="hidden sm:inline">Liked ({likedPosts.length})</span>
                  <span className="sm:hidden">Liked<br/>({likedPosts.length})</span>
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="px-3 sm:px-6">
              {/* Posts Tab */}
              <TabsContent value="posts" className="space-y-3 sm:space-y-4 mt-0">
                {posts.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-[#6b5751]/50 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-[#6b5751] mb-3 sm:mb-4">You haven't created any posts yet</p>
                    <Button
                      size="sm"
                      className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7]"
                      onClick={() => setLocation('/forum/new')}
                    >
                      Create Your First Post
                    </Button>
                  </div>
                ) : (
                  posts.map((post) => (
                    <Link key={post._id} href={`/forum/post/${post._id}`}>
                      <Card className="bg-white/50 border-[#6b5751]/30 hover:bg-white/70 transition-colors cursor-pointer">
                        <CardHeader className="pb-2 sm:pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base sm:text-lg text-[#0c0b0b] mb-1 sm:mb-2 break-words">
                                {post.title}
                                {post.isAnonymous && (
                                  <span className="ml-2 text-xs bg-[#6b5751] text-[#e2d6c7] px-2 py-0.5 rounded whitespace-nowrap">
                                    Anonymous
                                  </span>
                                )}
                              </CardTitle>
                              <CardDescription className="text-xs sm:text-sm text-[#6b5751]">
                                {formatTimeAgo(post.createdAt)}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm sm:text-base text-[#6b5751] line-clamp-2 mb-3 sm:mb-4">{post.content}</p>
                          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#6b5751]">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3 sm:w-4 sm:h-4" /> {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" /> {post.commentCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> {post.views}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments" className="space-y-3 sm:space-y-4 mt-0">
                {comments.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-[#6b5751]/50 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-[#6b5751]">You haven't commented on any posts yet</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <Card key={comment._id} className="bg-white/50 border-[#6b5751]/30">
                      <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            {comment.post && (
                              <Link href={`/forum/post/${comment.post._id}`}>
                                <p className="text-xs sm:text-sm text-[#7f1e16] hover:underline font-semibold mb-1 break-words">
                                  On: {comment.post.title}
                                </p>
                              </Link>
                            )}
                            <p className="text-sm sm:text-base text-[#6b5751] break-words">{comment.content}</p>
                            {comment.isAnonymous && (
                              <span className="inline-block mt-2 text-xs bg-[#6b5751] text-[#e2d6c7] px-2 py-0.5 rounded">
                                Posted Anonymously
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-[#6b5751] mt-2 flex items-center">
                          <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                          {formatTimeAgo(comment.createdAt)}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Liked Posts Tab */}
              <TabsContent value="liked" className="space-y-3 sm:space-y-4 mt-0">
                {likedPosts.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#6b5751]/50 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-[#6b5751]">You haven't liked any posts yet</p>
                  </div>
                ) : (
                  likedPosts.map((post) => (
                    <Link key={post._id} href={`/forum/post/${post._id}`}>
                      <Card className="bg-white/50 border-[#6b5751]/30 hover:bg-white/70 transition-colors cursor-pointer">
                        <CardHeader className="pb-2 sm:pb-3">
                          <CardTitle className="text-base sm:text-lg text-[#0c0b0b] break-words">{post.title}</CardTitle>
                          <CardDescription className="text-xs sm:text-sm text-[#6b5751]">
                            by {post.isAnonymous ? 'Anonymous' : (post.user?.displayName || post.user?.username || 'Unknown')} • {formatTimeAgo(post.createdAt)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm sm:text-base text-[#6b5751] line-clamp-2 mb-3 sm:mb-4">{post.content}</p>
                          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#6b5751]">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-[#7f1e16] text-[#7f1e16]" /> {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" /> {post.commentCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> {post.views}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
