
'use client';

import { upcomingLaunch } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Header from '@/components/header';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { firestore } = useFirebase();
  const heroImage = "https://images.unsplash.com/photo-1698422634311-54a43463375b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhYnN0cmFjdCUyMHZlZGljfGVufDB8fHx8MTc2NDUzOTY2NXww&ixlib=rb-4.1.0&q=80&w=1080";

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "products")
    );
  }, [firestore]);

  const { data: availableProducts, isLoading } = useCollection<Product>(productsQuery);

  return (
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <section className="relative text-center my-16 py-20 rounded-lg overflow-hidden">
              {heroImage && (
                <Image 
                  src={heroImage}
                  alt="Abstract vedic and mayan inspired art for hero background"
                  fill
                  className="object-cover w-full h-full z-0"
                  data-ai-hint="abstract vedic"
                />
              )}
              <div className="absolute inset-0 bg-black/60 z-10"/>
              <div className="relative z-20">
                <Badge variant="outline" className="mb-4 border-primary text-primary text-sm py-1 px-4 bg-background/50">
                  {upcomingLaunch.date}
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-4 text-white">
                  {upcomingLaunch.name}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  {upcomingLaunch.description}
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
                  Explore The Collection
                </Button>
              </div>
            </section>

            {isLoading ? (
               <section className="text-center my-20 p-8">
                 <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                    <span>Loading Products...</span>
                 </div>
               </section>
            ) : availableProducts && availableProducts.length > 0 ? (
              <section>
                <h2 className="text-3xl font-bold text-center mb-10 font-headline">Available Now</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {availableProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ) : (
              <section className="text-center my-20 p-8 border border-dashed border-border rounded-lg">
                <h2 className="text-2xl font-bold font-headline mb-2">The Portal is Closed</h2>
                <p className="text-muted-foreground">There are no products available at this time. A new transmission is imminent.</p>
              </section>
            )}
          </div>
        </main>
      </div>
  );
}
