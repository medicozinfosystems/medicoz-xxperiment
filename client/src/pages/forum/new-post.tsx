import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

interface Episode {
  _id: string;
  title: string;
  episodeNumber: number;
}

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'general' | 'episode'>('general');
  const [episodeId, setEpisodeId] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchEpisodes();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/status');
      const data = await response.json();
      if (!data.authenticated) {
        setLocation('/auth/signin');
      }
    } catch (error) {
      setLocation('/auth/signin');
    }
  };

  const fetchEpisodes = async () => {
    try {
      const response = await fetch('/api/forum/episodes');
      const data = await response.json();
      setEpisodes(data.episodes || []);
    } catch (error) {
      console.error('Failed to fetch episodes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          type: category,
          episodeId: category === 'episode' ? episodeId : undefined,
          isAnonymous,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Post created!',
          description: 'Your post has been published.',
        });
        setLocation('/forum');
      } else {
        toast({
          title: 'Failed to create post',
          description: data.error || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f1e16] to-[#5a120e]">
      <header className="bg-[#0c0b0b]/80 backdrop-blur-md border-b border-[#e2d6c7]/20">
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-[#e2d6c7]/95 border-[#3d1d19]">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#0c0b0b] font-['Alfa_Slab_One']">
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-[#0c0b0b] font-semibold">
                  Category
                </Label>
                <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                  <SelectTrigger className="bg-white border-[#6b5751]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">
                      <div>
                        <div className="font-semibold">General Discussion</div>
                        <div className="text-sm text-gray-600">"Have you experimented yet?" share your xxperiment moment</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="episode">
                      <div>
                        <div className="font-semibold">Episode Discussion</div>
                        <div className="text-sm text-gray-600">Dive deeper and share your thoughts episode wise</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Episode Selection (if category is episode) */}
              {category === 'episode' && episodes.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="episode" className="text-[#0c0b0b] font-semibold">
                    Select Episode
                  </Label>
                  <Select value={episodeId} onValueChange={setEpisodeId} required>
                    <SelectTrigger className="bg-white border-[#6b5751]">
                      <SelectValue placeholder="Choose an episode" />
                    </SelectTrigger>
                    <SelectContent>
                      {episodes.map((episode) => (
                        <SelectItem key={episode._id} value={episode._id}>
                          Episode {episode.episodeNumber}: {episode.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#0c0b0b] font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter your post title (5-200 characters)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  minLength={5}
                  maxLength={200}
                  className="bg-white border-[#6b5751] text-[#0c0b0b] placeholder:text-[#6b5751]/50"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-[#0c0b0b] font-semibold">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Share your thoughts, questions, or experiences... (minimum 10 characters)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  minLength={10}
                  rows={8}
                  className="bg-white border-[#6b5751] text-[#0c0b0b] placeholder:text-[#6b5751]/50 resize-none"
                />
                <p className="text-sm text-[#6b5751]">
                  {content.length} characters
                </p>
              </div>

              {/* Anonymous Posting Option */}
              <div className="flex items-center space-x-3 bg-white/50 rounded-lg p-4 border border-[#6b5751]/30">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                  className="border-[#6b5751]"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="anonymous"
                    className="text-[#0c0b0b] font-semibold cursor-pointer"
                  >
                    Post anonymously
                  </Label>
                  <p className="text-sm text-[#6b5751] mt-1">
                    Your username will be hidden. Only you and moderators can see your identity.
                  </p>
                </div>
              </div>

              {/* Guidelines */}
              <div className="bg-[#7f1e16]/10 border border-[#7f1e16]/30 rounded-lg p-4">
                <h3 className="font-semibold text-[#0c0b0b] mb-2">Community Guidelines</h3>
                <ul className="text-sm text-[#6b5751] space-y-1 list-disc list-inside">
                  <li>Be respectful and supportive of all community members</li>
                  <li>Inappropriate language will be automatically filtered</li>
                  <li>Health discussions are welcome and encouraged</li>
                  <li>Stay on topic and provide constructive feedback</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7] font-bold py-6 text-lg"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish Post'}
              </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation('/forum')}
                  className="px-8 border-[#6b5751] text-[#6b5751] hover:bg-[#6b5751]/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


