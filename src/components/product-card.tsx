import Image from 'next/image';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const placeholderImage = PlaceHolderImages.find(img => img.id === product.images[0]);

  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
      <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
        <CardHeader className="p-0">
          <div className="overflow-hidden rounded-t-lg">
            {placeholderImage && (
              <Image
                src={placeholderImage.imageUrl}
                alt={product.name}
                width={600}
                height={800}
                className="object-cover w-full h-auto aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={placeholderImage.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-lg tracking-normal">{product.name}</CardTitle>
          <p className="text-primary font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full bg-primary/90 text-primary-foreground transition-all hover:bg-primary hover:shadow-[0_0_15px_2px_hsl(var(--primary)/0.5)]">
            <Link href={`/products/${product.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Product
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
