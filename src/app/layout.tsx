
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, Cinzel_Decorative } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import MatrixBackground from '@/components/matrix-background';
import Header from '@/components/header';
import { usePathname } from 'next/navigation';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel-decorative',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isProductPage = pathname.startsWith('/products/');

  const metadata: Metadata = {
    title: 'THE MAYA VASTRA',
    description: 'A clothing brand with a Vedic, Indian, Maya, black and neon green, Matrix design theme.',
  };

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
          spaceGrotesk.variable,
          cinzelDecorative.variable
        )}
      >
        {!isProductPage && <MatrixBackground />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
