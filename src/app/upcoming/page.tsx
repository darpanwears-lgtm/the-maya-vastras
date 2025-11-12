
'use client';

import Header from '@/components/header';
import ProductCard from '@/components/product-card';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import type { Product } from '@/lib/types';
import { collection, query, where, Timestamp } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export default function UpcomingPage() {
  const { firestore } = useFirebase();

  const upcomingProductsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // Query for products whose launch date is in the future
    return query(
      collection(firestore, "products"),
      where("launchDateStart", ">", Timestamp.now())
    );
  }, [firestore]);

  const { data: upcomingProducts, isLoading } = useCollection<Product>(upcomingProductsQuery);

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <section className="text-center my-12">
            <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-4 text-white">
              Upcoming Drops
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Be the first to know. Here's a look at what's coming next from THE MAYA VASTRA.
            </p>
          </section>

          {isLoading ? (
            <section className="text-center my-20 p-8">
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <span>Loading Upcoming Products...</span>
              </div>
            </section>
          ) : upcomingProducts && upcomingProducts.length > 0 ? (
            <section>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {upcomingProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ) : (
            <section className="text-center my-20 p-8 border border-dashed border-border rounded-lg">
              <h2 className="text-2xl font-bold font-headline mb-2">No Upcoming Transmissions</h2>
              <p className="text-muted-foreground">The future is unwritten. Check back soon for the next reveal.</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
