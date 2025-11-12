
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

const InstagramIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c-4.04.05-4.555.2-6.113.86a6.22 6.22 0 00-4.32 4.32c-.66 1.558-.81 2.073-.86 6.113-.05 4.04.2 4.555.86 6.113a6.22 6.22 0 004.32 4.32c1.558.66 2.073.81 6.113.86 4.04-.05 4.555-.2 6.113-.86a6.22 6.22 0 004.32-4.32c.66-1.558.81-2.073.86-6.113.05-4.04-.2-4.555-.86-6.113a6.22 6.22 0 00-4.32-4.32C16.87 2.2 16.355 2.05 12.315 2zm-1.8 3.9h3.6a.4.4 0 01.4.4v3.6a.4.4 0 01-.4.4h-3.6a.4.4 0 01-.4-.4V6.3a.4.4 0 01.4-.4zM12 10.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 5.5a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
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
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://instagram.com/themayavastra" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </Link>
          </Button>
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
