'use client';
import { useDoc, useFirebase, useMemoFirebase } from '@/firebase';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { doc } from 'firebase/firestore';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { firestore } = useFirebase();

  const productRef = useMemoFirebase(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, 'products', params.id);
  }, [firestore, params.id]);

  const { data: product, isLoading } = useDoc<Product>(productRef);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="mr-2 h-16 w-16 animate-spin text-primary" />
        <span className="text-xl">Loading Product...</span>
      </div>
    );
  }
  
  if (!product) {
    notFound();
  }
  
  const imageUrl = product.images?.[0]?.url || 'https://placehold.co/800x1067';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="overflow-hidden rounded-lg shadow-lg shadow-primary/10">
            <Image
              src={imageUrl}
              alt={product.name}
              width={800}
              height={1067}
              className="object-cover w-full h-full"
              data-ai-hint="fashion product"
            />
        </div>
        
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="outline" className="mb-2 border-primary text-primary">{product.garmentType}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold">{product.name}</h1>
          </div>
          
          <p className="text-3xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="space-y-4">
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Select Color:</h3>
                <RadioGroup defaultValue={product.colors[0]} className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <div key={color}>
                      <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                      <Label 
                        htmlFor={`color-${color}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
               <div>
                <h3 className="font-semibold mb-3">Select Size:</h3>
                <RadioGroup defaultValue={product.sizes[0]} className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                      <Label 
                        htmlFor={`size-${size}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>

          <Button size="lg" asChild className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
            <Link href="/checkout">
              <CreditCard className="mr-2 h-5 w-5" />
              Buy Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
