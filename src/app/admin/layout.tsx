
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  Package,
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
import { useUser } from '@/firebase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  React.useEffect(() => {
    // Redirect to login if auth check is complete and no user is found
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  // Show a loading screen while user state is being determined
  if (isUserLoading) {
    return (
      <>
        <MatrixBackground />
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="relative z-10 flex items-center gap-2 text-lg">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span>Loading...</span>
          </div>
        </div>
      </>
    );
  }

  // If user is logged in, show the admin UI
  if (user) {
    return (
        <SidebarProvider>
          <MatrixBackground />
          <div className="relative z-10">
            <Header />
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
          </div>
        </SidebarProvider>
    );
  }

  // If no user and not loading, it will be redirected by useEffect.
  // Return null or a minimal loader to avoid flash of content.
  return null;
}
