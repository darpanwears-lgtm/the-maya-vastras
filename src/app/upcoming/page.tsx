
'use client';

import Header from '@/components/header';
import ProductCard from '@/components/product-card';
import { useFirebase, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import type { Product, LaunchSchedule } from '@/lib/types';
import { collection, query, where, Timestamp, doc } from 'firebase/firestore';
import { Loader2, Lock } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UnlockingAnimation from '@/components/unlocking-animation';
import { Badge } from '@/components/ui/badge';

export default function UpcomingPage() {
  const { firestore } = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const launchScheduleRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'launchSchedules', 'main-launch');
  }, [firestore]);

  const { data: launchSchedule, isLoading: isScheduleLoading } = useDoc<LaunchSchedule>(launchScheduleRef);
  
  const upcomingProductsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const now = Timestamp.now();
    return query(
      collection(firestore, "products"),
      where("launchDateStart", ">", now)
    );
  }, [firestore]);

  const { data: upcomingProducts, isLoading: areProductsLoading } = useCollection<Product>(upcomingProductsQuery);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (launchSchedule && password === launchSchedule.accessCode) {
      setError('');
      setIsUnlocking(true);
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsUnlocking(false);
      }, 2500);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const isLoading = isScheduleLoading || areProductsLoading;

  const renderContent = () => {
    if (isLoading) {
       return (
        <section className="text-center my-20 p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Loading...</span>
          </div>
        </section>
      );
    }

    if (isUnlocking) {
      return (
        <section className="flex justify-center items-center py-20">
          <UnlockingAnimation />
        </section>
      )
    }
    
    if (!isAuthenticated) {
      return (
        <section className="flex justify-center items-center py-20">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Lock className="text-primary"/>
                Prepaid Access
              </CardTitle>
              <CardDescription>
                This drop is password protected. Enter the access code to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input 
                  type="password"
                  placeholder="Enter access code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full">Unlock Drop</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      )
    }

    if (upcomingProducts && upcomingProducts.length > 0) {
      return (
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {upcomingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      );
    }
    
    return (
       <section className="text-center my-20 p-8 border border-dashed border-border rounded-lg">
          <h2 className="text-2xl font-bold font-headline mb-2">No Upcoming Transmissions</h2>
          <p className="text-muted-foreground">The future is unwritten. Check back soon for the next reveal.</p>
        </section>
    );
  }

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <section className="text-center my-12">
            <Badge variant="outline" className="mb-4 border-primary text-primary text-sm py-1 px-4 bg-background/50">
              PREPAID ACCESS
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-4 text-white">
              Upcoming Drops
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Be the first to know. Here's a look at what's coming next from THE MAYA VASTRA.
            </p>
          </section>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
