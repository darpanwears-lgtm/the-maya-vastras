
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  PanelLeft,
  PackagePlus,
  ArrowLeft,
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
import { usePathname } from 'next/navigation';
import MatrixBackground from '@/components/matrix-background';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith('/login');

  // Mock admin check. In a real app, this would involve checking user roles from a session.
  const isAdmin = true;

  if (!isAdmin) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-8">You do not have permission to view this page.</p>
            <Button asChild>
                <Link href="/">Return to Homepage</Link>
            </Button>
        </div>
    );
  }

  return (
    <>
      <MatrixBackground />
      <div className="relative z-10">
        {!isLoginPage && <Header />}
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
      </div>
    </>
  );
}
