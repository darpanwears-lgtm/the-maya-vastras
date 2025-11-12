import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import MatrixBackground from '@/components/matrix-background';
import Header from '@/components/header';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'VedicVerse',
  description: 'A clothing brand with a Vedic, Indian, Maya, black and neon green, Matrix design theme.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'font-body antialiased',
          spaceGrotesk.variable
        )}
      >
        <MatrixBackground />
        <div className="relative z-10 flex min-h-screen flex-col bg-background/80 backdrop-blur-sm">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
