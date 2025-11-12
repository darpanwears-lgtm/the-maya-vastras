
'use client';

import { useFirebase, useUser } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function MakeMeAdminPage() {
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleMakeAdmin = async () => {
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to perform this action.',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const adminRoleRef = doc(firestore, `roles_admin/${user.uid}`);
      await setDoc(adminRoleRef, {
        email: user.email,
        displayName: user.displayName,
        grantedAt: new Date(),
      });

      toast({
        title: 'Success!',
        description: 'You have been granted admin privileges. Redirecting to dashboard...',
      });

      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error granting admin role:', error);
      toast({
        variant: 'destructive',
        title: 'Operation Failed',
        description: 'Could not grant admin role. See console for details.',
      });
      setIsProcessing(false);
    }
  };
  
  if (isUserLoading || !user) {
     return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="relative z-10 flex items-center gap-2 text-lg">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span>Loading User...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center p-4">
          <h1 className="text-3xl font-bold font-headline mb-4">Grant Admin Access</h1>
          <p className="text-muted-foreground mb-2 max-w-md">
            You are logged in as <span className="text-primary font-bold">{user?.email}</span>.
          </p>
          <p className="text-muted-foreground mb-8 max-w-md">
            Click the button below to permanently grant this account administrator privileges for the site.
          </p>
          <Button onClick={handleMakeAdmin} disabled={isProcessing} size="lg">
            {isProcessing ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-5 w-5" />
            )}
            {isProcessing ? 'Processing...' : 'Make Me an Admin'}
          </Button>
          <p className="text-xs text-muted-foreground mt-8 max-w-md">
            <strong>Important:</strong> After successfully gaining access, it is highly recommended to delete the file at <code>src/app/make-me-admin/page.tsx</code> to prevent misuse.
          </p>
        </div>
      </div>
    </>
  );
}
