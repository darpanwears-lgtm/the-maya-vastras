
import { doc, getDoc, collection, getDocs, Timestamp } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';
import { initializeFirebase } from '@/firebase/init-server';
import ProductDetails from './product-details';

const { firestore } = initializeFirebase();

export async function generateStaticParams() {
  try {
    const productsCollection = collection(firestore, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const paths = productSnapshot.docs.map(doc => ({
      id: doc.id,
    }));
    return paths;
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

async function getProduct(id: string): Promise<Product | null> {
    try {
        const productRef = doc(firestore, 'products', id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
            return null;
        }

        const productData = productSnap.data();
        
        return {
            id: productSnap.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            images: productData.images,
            sizes: productData.sizes,
            colors: productData.colors,
            category: productData.category,
            garmentType: productData.garmentType,
        };
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
