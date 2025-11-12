import Link from 'next/link';
import Logo from './logo';
import { Button } from './ui/button';
import { User, LogIn, GanttChartSquare } from 'lucide-react';

const Header = () => {
  const isLoggedIn = false; // Mocked for now

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/admin/dashboard">
                <GanttChartSquare className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
            {isLoggedIn ? (
               <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <User className="mr-2 h-4 w-4" />
                Account
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
