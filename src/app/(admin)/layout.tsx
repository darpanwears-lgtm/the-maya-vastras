
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  PackagePlus,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { useRouter } from 'next/navigation';
import MatrixBackground from '@/components/matrix-background';
import { useUser, useDoc, useFirebase, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

// This new component will only be rendered when the user is a confirmed admin.
function AdminContent({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <Logo />
              <SidebarTrigger className="hidden md:flex" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/dashboard" asChild>
                  <Link href="/admin/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/products" asChild>
                   <Link href="/admin/products">
                    <Package />
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/orders" asChild>
                  <Link href="/admin/orders">
                    <ShoppingCart />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/settings" asChild>
                  <Link href="/admin/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator />
               <SidebarMenuItem>
                <SidebarMenuButton href="/" asChild>
                  <Link href="/">
                    <ArrowLeft />
                    <span>Back to Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/products/new">
                <PackagePlus className="mr-2" />
                New Product
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-background/80 backdrop-blur-sm">
           <div className="md:hidden flex items-center justify-between p-2 border-b">
             <Logo/>
             <SidebarTrigger/>
           </div>
           <div className="p-4 md:p-6 lg:p-8">
            {children}
           </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();

  const adminRoleRef = useMemoFirebase(() => {
    // Only create the reference if we have a definite user ID.
    if (!firestore || !user?.uid) return null;
    return doc(firestore, `roles_admin/${user.uid}`);
  }, [firestore, user?.uid]);

  // isUserLoading is true until the auth state is known.
  // We should wait for that before trusting the `user` object.
  const { data: adminRole, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);
  
  // The overall loading state depends on both user auth and the admin role check.
  const isLoading = isUserLoading || isAdminRoleLoading;
  
  // We can only determine admin status if we are not loading and have a user.
  const isAdmin = !isUserLoading && !!user && !!adminRole;

  React.useEffect(() => {
    // If we're done loading and there's no user, redirect to login.
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  return (
    <>
      <MatrixBackground />
      <div className="relative z-10">
        <Header />
        {isLoading ? (
          <div className="flex h-[calc(100vh-theme(spacing.14))] w-full items-center justify-center bg-background">
            <div className="relative z-10 flex items-center gap-2 text-lg">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span>Authenticating & Verifying Access...</span>
            </div>
          </div>
        ) : isAdmin ? (
          <AdminContent>{children}</AdminContent>
        ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-theme(spacing.14))] text-center p-4">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p className="text-muted-foreground mb-8 max-w-md">You do not have permission to view this page. Ensure you are logged in with an admin account.</p>
                <Button asChild>
                    <Link href="/">Return to Homepage</Link>
                </Button>
            </div>
        )}
      </div>
    </>
  );
}
