
import { ProductForm } from "../product-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProductPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">Add New Product</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Fill out the form below to add a new product to your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductForm />
                </CardContent>
            </Card>
        </div>
    )
}
