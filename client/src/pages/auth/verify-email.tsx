import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }
    
    fetch(`/api/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setStatus('error');
          setMessage(data.error);
        } else {
          setStatus('success');
          setMessage(data.message);
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Failed to verify email');
      });
  }, [token]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
              <p className="text-muted-foreground">Verifying your email...</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
              <p className="text-lg font-semibold text-green-700">{message}</p>
              <p className="text-sm text-muted-foreground">
                Your email has been successfully verified! You can now access all forum features.
              </p>
              <Button
                onClick={() => setLocation('/forum')}
                className="w-full"
              >
                Go to Forum
              </Button>
            </>
          )}
          
          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 mx-auto text-red-600" />
              <p className="text-lg font-semibold text-red-700">{message}</p>
              <p className="text-sm text-muted-foreground">
                The verification link may have expired or is invalid. Please try signing up again or contact support.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setLocation('/auth/signin')}
                  variant="outline"
                  className="flex-1"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setLocation('/auth/signup')}
                  className="flex-1"
                >
                  Sign Up
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


