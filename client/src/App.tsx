import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";
import VerifyEmail from "@/pages/auth/verify-email";
import Forum from "@/pages/forum/index";
import NewPost from "@/pages/forum/new-post";
import PostDetail from "@/pages/forum/post-detail";
import Profile from "@/pages/profile";
import Admin from "@/pages/admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/verify-email" component={VerifyEmail} />
      <Route path="/forum" component={Forum} />
      <Route path="/forum/new" component={NewPost} />
      <Route path="/forum/post/:id" component={PostDetail} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TranslationProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </TranslationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
