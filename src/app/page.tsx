import { products, upcomingLaunch } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const now = new Date();
  const availableProducts = products.filter(p => {
    const startDate = new Date(p.launchStartDate);
    const endDate = new Date(p.launchEndDate);
    return now >= startDate && now <= endDate;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center my-16">
        <Badge variant="outline" className="mb-4 border-primary text-primary text-sm py-1 px-4">
          {upcomingLaunch.date}
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary">
          {upcomingLaunch.name}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {upcomingLaunch.description}
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
          Explore The Collection
        </Button>
      </section>

      {availableProducts.length > 0 ? (
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 font-headline">Live Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {availableProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center my-20 p-8 border border-dashed border-border rounded-lg">
          <h2 className="text-2xl font-bold font-headline mb-2">The Portal is Closed</h2>
          <p className="text-muted-foreground">The current launch has ended. A new transmission is imminent.</p>
          <p className="text-primary font-bold mt-4">{`Next drop: ${upcomingLaunch.date}`}</p>
        </section>
      )}
    </div>
  );
}
