
'use client';
import Link from 'next/link';
import Logo from './logo';
import { Button } from './ui/button';
import { User, LogIn, GanttChartSquare, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UnlockingAnimation from './unlocking-animation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 265.2 0 128.5 110.3 18.2 244 18.2c71.4 0 133.3 29.3 178.9 76.5l-68.9 67.3c-24.5-23-58.6-37.5-98.3-37.5-82.9 0-151.1 67.1-151.1 149.9s68.2 149.9 151.1 149.9c97.1 0 130.4-71.1 134.4-108.3H244v-88.4h244z"></path>
  </svg>
);


const Header = () => {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      if (auth) {
        setIsSigningOut(true);
        setTimeout(async () => {
          await signOut(auth);
          router.push('/login');
          setIsSigningOut(false);
        }, 2500);
      }
    } catch (error) {
      console.error("Error signing out: ", error);
      setIsSigningOut(false);
    }
  };

  return (
    <>
    {isSigningOut && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <UnlockingAnimation />
        </div>
    )}
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-center space-x-2 md:space-x-4">
          <div className="hidden items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground md:flex">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Trusted by Google</span>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {isUserLoading ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                      <AvatarFallback>{user.displayName?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href="/admin/dashboard">
                      <GanttChartSquare className="mr-2 h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
