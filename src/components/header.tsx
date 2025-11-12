
'use client';
import Link from 'next/link';
import Logo from './logo';
import { Button } from './ui/button';
import { User, LogIn, GanttChartSquare, LogOut } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {user && (
              <Button variant="ghost" asChild>
                <Link href="/admin/dashboard">
                  <GanttChartSquare className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </Button>
            )}
            {isUserLoading ? null : user ? (
               <Button variant="outline" onClick={handleSignOut} className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
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
  );
};

export default Header;
