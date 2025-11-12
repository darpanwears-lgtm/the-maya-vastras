
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Sparkles, PlusCircle, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { generateProductDescription } from "@/ai/flows/generate-product-description";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { useFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase";
import { useRouter } from "next/navigation";


const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  category: z.string().min(1, "Please enter a category."),
  garmentType: z.string().min(1, "Please select a garment type."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  price: z.coerce.number().min(0, "Price cannot be negative."),
  images: z.array(z.object({ url: z.string().url("Please enter a valid URL.") })).min(1, "Please add at least one image."),
  colors: z.string().min(1, "Please enter at least one color."),
  sizes: z.string().min(1, "Please enter at least one size."),
  launchDate: z.object({
    from: z.date({ required_error: "A start date is required."}),
    to: z.date({ required_error: "An end date is required."}),
  }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export function ProductForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { firestore } = useFirebase();
  const router = useRouter();


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      garmentType: "",
      description: "",
      price: 0,
      images: [{ url: "" }],
      colors: "",
      sizes: "",
      launchDate: {
        from: undefined,
        to: undefined,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  function onSubmit(data: ProductFormValues) {
    if (!firestore) return;
    
    startTransition(async () => {
      try {
        const productData = {
          ...data,
          launchDateStart: data.launchDate.from,
          launchDateEnd: data.launchDate.to,
          colors: data.colors.split(',').map(s => s.trim()),
          sizes: data.sizes.split(',').map(s => s.trim()),
        };
        
        const productsCollection = collection(firestore, "products");
        await addDocumentNonBlocking(productsCollection, productData);

        toast({
          title: "Product Submitted",
          description: "The new product has been saved successfully.",
        });
        router.push("/admin/products");
      } catch (error) {
        console.error("Failed to save product:", error);
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: "Could not save the product at this time.",
        });
      }
    });
  }

  const handleGenerateDescription = () => {
    const { category, garmentType } = form.getValues();
    if (!category || !garmentType) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a category and garment type first.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await generateProductDescription({
          category,
          garmentType,
          theme: "vedic indian maya black and neon green with matrix design",
        });
        if (result.description) {
          form.setValue("description", result.description, { shouldValidate: true });
          toast({
            title: "Description Generated",
            description: "AI-powered description has been added.",
          });
        }
      } catch (error) {
        console.error("Failed to generate description:", error);
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Could not generate a description at this time.",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Cosmic Chakra T-Shirt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tops, Bottoms, Accessories" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a category for this product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name="garmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Garment Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a garment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="T-Shirt">T-Shirt</SelectItem>
                    <SelectItem value="Hoodie">Hoodie</SelectItem>
                    <SelectItem value="Sweatpants">Sweatpants</SelectItem>
                    <SelectItem value="Jacket">Jacket</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Description</FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerateDescription}
                  disabled={isPending}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  {isPending ? 'Generating...' : 'Generate with AI'}
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder="A compelling, sales-oriented summary of the product."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Product Images</FormLabel>
          <FormDescription className="mb-2">
            Add one or more URLs for your product images.
          </FormDescription>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`images.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ url: "" })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Image URL
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Black, Neon Green" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter comma-separated color names.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., S, M, L, XL" {...field} />
                  </FormControl>
                   <FormDescription>
                    Enter comma-separated size names.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 3500.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="launchDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Launch Date Window</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value?.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={{from: field.value?.from, to: field.value?.to}}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending}>Save Product</Button>
      </form>
    </Form>
  );
}
