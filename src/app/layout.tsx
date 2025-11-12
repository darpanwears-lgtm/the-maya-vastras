
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, Cinzel_Decorative } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { useState, useEffect } from 'react';
import WelcomeAnimation from '@/components/welcome-animation';
import Footer from '@/components/footer';


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
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Check if the animation has already been shown in this session
    const hasBeenShown = sessionStorage.getItem('welcomeAnimationShown');
    if (hasBeenShown) {
      setShowAnimation(false);
      return;
    }

    // Hide animation after 5 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false);
      // Mark as shown for the current session
      sessionStorage.setItem('welcomeAnimationShown', 'true');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const metadata: Metadata = {
    title: 'THE MAYA VASTRA',
    description: 'A clothing brand with a Vedic, Indian, Maya, black and neon green, Matrix design theme.',
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <WelcomeAnimation isVisible={showAnimation} />
        <FirebaseClientProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
