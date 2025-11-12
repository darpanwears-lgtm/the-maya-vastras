
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/logo";
import Header from "@/components/header";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import MatrixBackground from "@/components/matrix-background";

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 265.2 0 128.5 110.3 18.2 244 18.2c71.4 0 133.3 29.3 178.9 76.5l-68.9 67.3c-24.5-23-58.6-37.5-98.3-37.5-82.9 0-151.1 67.1-151.1 149.9s68.2 149.9 151.1 149.9c97.1 0 130.4-71.1 134.4-108.3H244v-88.4h244z"></path>
  </svg>
);


export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Firebase Auth service is not available. Please try again later.",
      });
      return;
    }
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The useEffect will handle the redirect on successful login
    } catch (error: any) {
      console.error("Error signing in with Google: ", error);
      toast({
        variant: "destructive",
        title: "Sign-in Failed",
        description: error.message || "An unknown error occurred during sign-in.",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <>
      <MatrixBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="flex min-h-[calc(100vh-theme(spacing.14))] items-center justify-center p-4">
            <Card className="w-full max-w-sm border-border/50 bg-card/50">
              <CardHeader className="text-center">
                <Logo className="mx-auto mb-2" />
                <CardTitle className="font-headline text-xl md:text-2xl">Enter the Verse</CardTitle>
                <CardDescription>Sign in to continue your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <Button className="w-full bg-white text-black hover:bg-gray-200" onClick={handleGoogleSignIn} disabled={isUserLoading || isSigningIn}>
                      {isSigningIn ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <GoogleIcon />
                      )}
                      {isSigningIn ? "Signing In..." : "Sign in with Google"}
                  </Button>
                  <p className="px-8 text-center text-sm text-muted-foreground">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
