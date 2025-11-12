
import type { Metadata } from 'next';
import { Space_Grotesk, Cinzel_Decorative } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import MatrixBackground from '@/components/matrix-background';

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
        <MatrixBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-background/80 backdrop-blur-sm">{children}</main>
        </div>
        <Toaster />
      </div>
  );
}
