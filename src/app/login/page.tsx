import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/logo";
import MatrixBackground from "@/components/matrix-background";
import Header from "@/components/header";

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 265.2 0 128.5 110.3 18.2 244 18.2c71.4 0 133.3 29.3 178.9 76.5l-68.9 67.3c-24.5-23-58.6-37.5-98.3-37.5-82.9 0-151.1 67.1-151.1 149.9s68.2 149.9 151.1 149.9c97.1 0 130.4-71.1 134.4-108.3H244v-88.4h244z"></path>
  </svg>
);


export default function LoginPage() {
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
                <CardTitle className="font-headline text-2xl">Enter the Verse</CardTitle>
                <CardDescription>Sign in to continue your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <Button className="w-full bg-white text-black hover:bg-gray-200">
                      <GoogleIcon/>
                      Sign in with Google
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
