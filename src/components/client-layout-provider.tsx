
'use client';

import WelcomeAnimation from '@/components/welcome-animation';

export default function ClientLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <WelcomeAnimation />
      {children}
    </>
  );
}
