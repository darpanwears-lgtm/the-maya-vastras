
'use client';

import { upcomingLaunch as staticLaunchData } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import { useFirebase, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, where, Timestamp, doc } from 'firebase/firestore';
import type { Product, HeroSection } from '@/lib/types';
import { Loader2, Search, ListFilter } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export default function Home() {
  const { firestore } = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  
  // Product Data Fetching
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "products"),
      where("launchDateStart", "<=", Timestamp.now()),
    );
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery);

  // Dynamic carousel images from products
  const carouselImages = useMemo(() => {
    if (!products) return [];
    return products
      .filter(p => p.images && p.images.length > 0)
      .map(p => ({
        id: p.id,
        imageUrl: p.images[0].url,
        description: p.name,
        imageHint: "fashion product"
      }));
  }, [products]);

  // Memoize categories
  const categories = useMemo(() => {
    if (!products) return ['All'];
    const uniqueCategories = new Set(products.map(p => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products
      ?.filter(p => { // First, filter by availability
        if (!p.launchDateEnd) return true;
        const now = new Date();
        const endDate = p.launchDateEnd.toDate();
        return endDate > now;
      })
      .filter(p => { // Then, filter by category
        if (selectedCategory === 'All') return true;
        return p.category === selectedCategory;
      })
      .filter(p => { // Finally, filter by search term
        return p.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [products, selectedCategory, searchTerm]);


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
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <section className="text-center my-12">
            <h2 
              className="text-2xl md:text-4xl font-headline text-primary tracking-widest"
              style={{ textShadow: '0 0 15px hsl(var(--primary) / 0.5)' }}
            >
              &quot;The veil of Maya is thin here. Look closer.&quot;
            </h2>
          </section>
          <section className="relative text-center mb-8 py-12 md:mb-16 md:py-20 rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent z-[5]"></div>
            <div className="relative z-20">
              {isLoadingHero ? (
                <div className="flex justify-center mb-4"><Loader2 className="h-6 w-6 animate-spin" /></div>
              ) : (
                <>
                  <Badge variant="outline" className="mb-4 border-primary text-primary text-sm py-1 px-4 bg-background/50">
                    {heroContent.date}
                  </Badge>
                  <h1 className="text-4xl md:text-7xl font-bold font-headline tracking-tighter mb-4 text-white">
                    {heroContent.name}
                  </h1>
                  <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                    {heroContent.description}
                  </p>
                </>
              )}
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300" asChild>
                <Link href="/upcoming">Early Access</Link>
              </Button>
            </div>
          </section>

           {carouselImages.length > 0 && (
              <section className="relative mb-16 rounded-lg overflow-hidden border border-border/20 bg-background/50 backdrop-blur-sm">
                  <div className="relative z-10 p-4 md:p-8">
                      <Carousel
                        plugins={[plugin.current]}
                        className="w-full max-w-3xl mx-auto"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                      >
                        <CarouselContent>
                          {carouselImages.map((image) => (
                            <CarouselItem key={image.id}>
                              <div className="overflow-hidden rounded-md shadow-lg shadow-primary/10">
                                <Image
                                  src={image.imageUrl}
                                  alt={image.description}
                                  width={1200}
                                  height={675}
                                  className="object-cover w-full h-auto aspect-video"
                                  data-ai-hint={image.imageHint}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
                      </Carousel>
                  </div>
              </section>
           )}

          {isLoadingProducts ? (
             <section className="text-center my-20 p-8">
               <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                  <span>Loading Products...</span>
               </div>
             </section>
          ) : products && products.length > 0 ? (
            <section>
              <h2 className="text-3xl font-bold text-center mb-10 font-headline">Available Now</h2>
              
              <div className="mb-10 flex justify-center gap-4">
                <div className="relative max-w-lg w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="icon">
                        <ListFilter className="h-4 w-4" />
                        <span className="sr-only">Filter by category</span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                      {categories.map((category) => (
                        <DropdownMenuRadioItem key={category} value={category}>
                          {category}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>


              {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center my-20 p-8 border border-dashed border-border rounded-lg">
                  <h3 className="text-xl font-bold font-headline mb-2">No Products Found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter.</p>
                </div>
              )}
            </section>
          ) : (
            <section className="text-center my-20 p-8 border border-dashed border-border rounded-lg">
              <h2 className="text-2xl font-bold font-headline mb-2">The Portal is Closed</h2>
              <p className="text-muted-foreground">There are no products available at this time. A new transmission is imminent.</p>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
