import type { Metadata } from 'next';
import { Space_Grotesk, Cinzel_Decorative } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Image from 'next/image';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel-decorative',
});

export const metadata: Metadata = {
  title: 'THE MAYA VASTRA',
  description: 'A clothing brand with a Vedic, Indian, Maya, black and neon green, Matrix design theme.',
};

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
        className={cn(
          'font-body antialiased',
          spaceGrotesk.variable,
          cinzelDecorative.variable
        )}
      >
        <Image 
            src="https://images.unsplash.com/photo-1588523334946-f6d7c71676de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Peaceful Vedic background"
            fill
            className="object-cover w-full h-full z-0 opacity-20"
            data-ai-hint="vedic pattern"
        />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </div>
  );
}
