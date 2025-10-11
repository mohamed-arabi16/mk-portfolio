import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassPanel } from "@/components/GlassPanel";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, LogIn } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/LanguageProvider";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100),
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      authSchema.parse({ email, password });

      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      toast({
        title: t('admin.signupSuccess'),
        description: "Welcome! Your portfolio is being set up.",
      });

      // Redirect to home after successful signup
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      authSchema.parse({ email, password });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: t('admin.loginSuccess'),
        description: "Welcome back!",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <GlassPanel className="w-full max-w-md p-8">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">{t('admin.login')}</TabsTrigger>
            <TabsTrigger value="signup">{t('admin.signup')}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <div className="flex items-center justify-center mb-6">
              <LogIn className="h-12 w-12 text-accent" />
            </div>
            
            <h1 className="text-3xl font-bold text-center mb-2">{t('admin.login')}</h1>
            <p className="text-muted-foreground text-center mb-8">
              Welcome back to your portfolio
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">{t('admin.email')}</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="login-password">{t('admin.password')}</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-background/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-liquid btn-accent"
                disabled={loading}
              >
                {loading ? "Logging in..." : t('admin.login')}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <div className="flex items-center justify-center mb-6">
              <UserPlus className="h-12 w-12 text-accent" />
            </div>
            
            <h1 className="text-3xl font-bold text-center mb-2">{t('admin.createAccount')}</h1>
            <p className="text-muted-foreground text-center mb-8">
              Create your portfolio in minutes
            </p>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="signup-email">{t('admin.email')}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="signup-password">{t('admin.password')}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  At least 6 characters
                </p>
              </div>

              <Button
                type="submit"
                className="w-full btn-liquid btn-accent"
                disabled={loading}
              >
                {loading ? "Creating account..." : t('admin.createAccount')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </GlassPanel>
    </div>
  );
}
