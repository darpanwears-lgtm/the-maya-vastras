'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ShoppingBag } from 'lucide-react';
import Header from '@/components/header';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser, useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { useEffect, useTransition } from 'react';
import { Product } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { generateOrderEmailBody } from '@/ai/flows/send-order-email';

const checkoutFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: 'City is required.' }),
  state: z.string().min(1, { message: 'State is required.' }),
  pincode: z.string().min(6, { message: 'PIN code must be at least 6 digits.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();
  const [isPending, startTransition] = useTransition();

  const productId = searchParams.get('productId');
  const color = searchParams.get('color');
  const size = searchParams.get('size');

  const productRef = useMemoFirebase(() => {
    if (!firestore || !productId) return null;
    return doc(firestore, 'products', productId);
  }, [firestore, productId]);

  const { data: product, isLoading: isProductLoading } = useDoc<Product>(productRef);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (user && !isUserLoading) {
      form.setValue('email', user.email || '');
      if (user.displayName) {
        const nameParts = user.displayName.split(' ');
        const firstName = nameParts.shift() || '';
        const lastName = nameParts.join(' ');
        form.setValue('firstName', firstName);
        form.setValue('lastName', lastName);
      }
    }
  }, [user, isUserLoading, form]);


  function onSubmit(data: CheckoutFormValues) {
    if (!product || !color || !size) return;
  
    startTransition(async () => {
      try {
        const fullAddress = `${data.address}, ${data.apartment || ''}\n${data.city}, ${data.state} - ${data.pincode}`;
        const customerName = `${data.firstName} ${data.lastName}`;
        
        // Generate the email body using the Genkit flow
        const emailContent = await generateOrderEmailBody({
          customerName,
          productName: product.name,
          price: product.price,
          color,
          size,
          address: fullAddress,
          email: data.email,
          phone: data.phone,
        });

        const recipient = 'gamingcloud3401@gmail.com';
        const subject = `New Order for ${product.name}`;
        
        // Create the mailto link
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent.emailBody)}`;

        // Open the user's email client
        window.location.href = mailtoLink;
        
        toast({
          title: "Finalize Your Order",
          description: "Your email app has opened with the order details. Please press 'Send' to confirm your purchase.",
        });
  
        // Optional: Redirect after a delay to give the user time to see the toast.
        setTimeout(() => {
            router.push("/");
        }, 3000);

      } catch (error) {
        console.error("Failed to process order:", error);
        toast({
          variant: "destructive",
          title: "Order Failed",
          description: "Could not prepare the order email at this time.",
        });
      }
    });
  }

  if (isUserLoading || isProductLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!productId || !product) {
    return (
       <div className="flex h-screen w-full items-center justify-center bg-background text-center p-4">
         <div>
          <h2 className="text-2xl font-bold font-headline mb-2">Invalid Checkout Session</h2>
          <p className="text-muted-foreground mb-4">No product was selected. Please go back and select a product to purchase.</p>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
         </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-3xl font-headline">Checkout</CardTitle>
                <CardDescription>Enter your shipping information to complete your order.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold font-headline">Contact Information</h3>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="neo@matrix.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-xl font-semibold font-headline">Shipping Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Neo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Anderson" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main Street" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="apartment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apartment 101" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Zion" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="Last Human City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PIN Code</FormLabel>
                              <FormControl>
                                <Input placeholder="010101" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                       <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300" disabled={isPending}>
                       {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ShoppingBag className="mr-2 h-5 w-5" />}
                      {isPending ? 'Processing Order...' : `Confirm Order (₹${product.price.toFixed(2)})`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
