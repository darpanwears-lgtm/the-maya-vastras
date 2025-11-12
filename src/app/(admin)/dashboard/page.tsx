import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PackagePlus } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the VedicVerse Admin Panel</CardTitle>
          <CardDescription>
            This is your control center. Manage products, view orders, and configure your store's launch settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            You can start by adding a new product to your catalog or checking the existing product list.
          </p>
          <Button asChild>
            <Link href="/admin/products/new">
              <PackagePlus className="mr-2 h-4 w-4" />
              Add New Product
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
