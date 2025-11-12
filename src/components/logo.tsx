import Link from 'next/link';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("text-2xl font-headline text-primary tracking-wider", className)}>
      THE MAYA VASTRA
    </Link>
  );
};

export default Logo;
