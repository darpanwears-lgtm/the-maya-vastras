'use client';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/firebase';

function getStatus(startDate: string, endDate: string): { text: string; variant: "default" | "secondary" | "destructive" | "outline" } {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return { text: "Upcoming", variant: "outline" };
    if (now > end) return { text: "Expired", variant: "secondary" };
    return { text: "Live", variant: "default" };
}

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const { user } = useUser();

  const imageUrl = product.images?.[0]?.url || 'https://placehold.co/800x1067';
  const checkoutUrl = `/checkout?productId=${product.id}&color=${selectedColor}&size=${selectedSize}`;

  const status = getStatus(product.launchDateStart, product.launchDateEnd);
  const isAvailable = status.text === 'Live';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative">
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
           <Badge variant={status.variant} className="absolute top-4 right-4 text-lg py-2 px-4">
              {status.text}
            </Badge>
        </div>
        
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="outline" className="mb-2 border-primary text-primary">{product.garmentType}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold font-headline">{product.name}</h1>
          </div>
          
          <p className="text-3xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="space-y-4">
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Select Color:</h3>
                <RadioGroup 
                  defaultValue={selectedColor} 
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-2"
                >
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
                <RadioGroup 
                  defaultValue={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
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

          <div className="flex flex-col gap-4">
            {user && isAvailable ? (
              <Button size="lg" asChild className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
                <Link href={checkoutUrl}>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Buy Now
                </Link>
              </Button>
            ) : user ? (
              <Button size="lg" disabled className="w-full md:w-auto">
                Not Currently Available
              </Button>
            ) : (
              <Button size="lg" asChild className="w-full md:w-auto">
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
  );
}
