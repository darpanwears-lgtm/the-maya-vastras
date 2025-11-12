
'use client';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, ShieldCheck, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useMemo } from 'react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Timestamp } from 'firebase/firestore';
import MatrixBackground from '@/components/matrix-background';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';


export default function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const { user } = useUser();
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  const isUpcoming = useMemo(() => {
    if (!product.launchDateStart) return false;
    const startDate = product.launchDateStart instanceof Timestamp 
      ? product.launchDateStart.toDate()
      : new Date(product.launchDateStart);
    return startDate > new Date();
  }, [product.launchDateStart]);
  
  const checkoutUrl = `/checkout?productId=${product.id}&color=${selectedColor}&size=${selectedSize}`;

  return (
    <>
      <MatrixBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="mb-6">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <div className="relative w-full max-w-lg">
                <Carousel 
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {product.images.length > 0 ? product.images.map((image, index) => (
                      <CarouselItem key={index}>
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="overflow-hidden rounded-lg shadow-lg shadow-primary/10 cursor-zoom-in">
                                <Image
                                  src={image.url}
                                  alt={`${product.name} - image ${index + 1}`}
                                  width={800}
                                  height={800}
                                  className="object-cover w-full h-full aspect-square"
                                  data-ai-hint="fashion product"
                                />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
                              <Image
                                  src={image.url}
                                  alt={`${product.name} - image ${index + 1}`}
                                  width={1200}
                                  height={1200}
                                  className="object-contain w-full h-auto rounded-lg"
                                />
                            </DialogContent>
                          </Dialog>
                      </CarouselItem>
                    )) : (
                      <CarouselItem>
                        <div className="overflow-hidden rounded-lg shadow-lg shadow-primary/10">
                          <Image
                            src='https://placehold.co/800x800'
                            alt={product.name}
                            width={800}
                            height={800}
                            className="object-cover w-full h-full aspect-square"
                            data-ai-hint="fashion product"
                          />
                        </div>
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  {product.images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
                    </>
                  )}
                </Carousel>
              </div>
              
              <div className="flex flex-col gap-4 w-full max-w-lg">
                <div>
                  <Badge variant="outline" className="mb-2 border-primary text-primary">{product.garmentType}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
                </div>
                
                <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
                
                <p className="text-muted-foreground leading-relaxed bg-black/50 p-4 rounded-md">{product.description}</p>
                
                <div className="space-y-4">
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Select Color: <span className="text-primary font-bold">{selectedColor}</span></h3>
                      <RadioGroup 
                        value={selectedColor} 
                        onValueChange={setSelectedColor}
                        className="flex flex-wrap gap-2"
                      >
                        {product.colors.map(color => (
                          <Label 
                            key={color}
                            htmlFor={`color-${color}`}
                            className="flex items-center justify-center rounded-md border-2 border-muted bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                          >
                            <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                            {color}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {product.sizes && product.sizes.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Select Size: <span className="text-primary font-bold">{selectedSize}</span></h3>
                      <RadioGroup 
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                        className="flex flex-wrap gap-2"
                      >
                        {product.sizes.map(size => (
                          <Label 
                            key={size}
                            htmlFor={`size-${size}`}
                            className="flex items-center justify-center rounded-md border-2 border-muted bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                          >
                            <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                            {size}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  {user ? (
                    <Button size="lg" asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
                      <Link href={checkoutUrl}>
                        {isUpcoming ? <Clock className="mr-2 h-5 w-5" /> : <CreditCard className="mr-2 h-5 w-5" />}
                        {isUpcoming ? 'Pre-Order Now' : 'Buy Now'}
                      </Link>
                    </Button>
                  ) : (
                    <Button size="lg" asChild className="w-full">
                      <Link href="/login">
                        Login to Purchase
                      </Link>
                    </Button>
                  )}
                  <p className="text-xs text-muted-foreground flex items-center gap-2 justify-center">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Secure payment and shipping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}
