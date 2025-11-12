
'use client';
import { Suspense } from 'react';
import Header from '@/components/header';
import { Loader2 } from 'lucide-react';
import CheckoutForm from './checkout-form';

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={
            <div className="flex h-[50vh] w-full items-center justify-center bg-background">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }>
            <CheckoutForm />
          </Suspense>
        </div>
      </main>
    </>
  );
}
