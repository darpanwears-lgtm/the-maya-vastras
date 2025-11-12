
'use client';

import { upcomingLaunch as staticLaunchData } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import { useFirebase, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, where, Timestamp, doc } from 'firebase/firestore';
import type { Product, HeroSection } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { firestore } = useFirebase();

  // Product Data Fetching
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "products"),
      where("launchDateStart", "<=", Timestamp.now()),
    );
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery);
  
  // Filter out products whose launch window has ended
  const availableProducts = products?.filter(p => {
    if (!p.launchDateEnd) return true;
    return p.launchDateEnd.toDate() > new Date();
  });

  // Hero Section Data Fetching
  const heroContentRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'siteSettings/hero');
  }, [firestore]);
  
  const { data: heroData, isLoading: isLoadingHero } = useDoc<HeroSection>(heroContentRef);

  const heroContent = {
    date: heroData?.badgeText || staticLaunchData.date,
    name: heroData?.title || staticLaunchData.name,
    description: heroData?.description || staticLaunchData.description,
  }

  return (
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <section className="relative text-center my-16 py-20 rounded-lg overflow-hidden">
              <div className="relative z-20">
                {isLoadingHero ? (
                  <div className="flex justify-center mb-4"><Loader2 className="h-6 w-6 animate-spin" /></div>
                ) : (
                  <>
                    <Badge variant="outline" className="mb-4 border-primary text-primary text-sm py-1 px-4 bg-background/50">
                      {heroContent.date}
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-4 text-white">
                      {heroContent.name}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                      {heroContent.description}
                    </p>
                  </>
                )}
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300" asChild>
                  <Link href="/upcoming">Upcoming Products</Link>
                </Button>
              </div>
            </section>

            {isLoadingProducts ? (
               <section className="text-center my-20 p-8">
                 <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                    <span>Loading Products...</span>
                 </div>
               </section>
            ) : availableProducts && availableProducts.length > 0 ? (
              <section>
                <h2 className="text-3xl font-bold text-center mb-10 font-headline">Available Now</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
