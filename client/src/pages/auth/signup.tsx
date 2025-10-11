import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, displayName }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Account created!',
          description: 'Welcome to The XXperiment community.',
        });
        setLocation('/forum');
      } else {
        toast({
          title: 'Sign up failed',
          description: data.error || 'Failed to create account',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f1e16] via-[#6b1712] to-[#5a120e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#e2d6c7]/95 border-[#3d1d19]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-[#0c0b0b] font-['Alfa_Slab_One']">
            Join The XXperiment
          </CardTitle>
          <CardDescription className="text-[#6b5751] text-base">
            Create your account to start participating
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Google OAuth Button */}
          <div className="space-y-4 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#6b5751] text-[#0c0b0b] hover:bg-[#6b5751]/10 py-6 text-base font-semibold"
              onClick={() => window.location.href = '/api/auth/google'}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#6b5751]/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#e2d6c7] px-2 text-[#6b5751]">Or sign up with email</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#0c0b0b] font-semibold">
                Username *
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username (3-20 characters)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9_]+"
                className="bg-white border-[#6b5751] text-[#0c0b0b] placeholder:text-[#6b5751]/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-[#0c0b0b] font-semibold">
                Display Name (Optional)
              </Label>
              <Input
                id="displayName"
                type="text"
                placeholder="How should we call you?"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-white border-[#6b5751] text-[#0c0b0b] placeholder:text-[#6b5751]/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0c0b0b] font-semibold">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-[#6b5751] text-[#0c0b0b] placeholder:text-[#6b5751]/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0c0b0b] font-semibold">
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="bg-white border-[#6b5751] text-[#0c0b0b] placeholder:text-[#6b5751]/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#0c0b0b] font-semibold">
                Confirm Password *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white border-[#6b5751] text-[#0c0b0b] placeholder:text-[#6b5751]/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7] font-bold py-6 text-lg"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-[#6b5751]">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-[#7f1e16] hover:underline font-semibold">
              Sign in
            </Link>
          </div>
          <div className="text-sm text-center">
            <a href="/xxperiment/index.html" className="text-[#6b5751] hover:text-[#7f1e16]">
              ← Back to home
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}


