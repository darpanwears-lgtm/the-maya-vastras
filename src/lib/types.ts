import { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  sizes: string[];
  colors: string[];
  category: string;
  garmentType: string;
  launchDateStart: string;
  launchDateEnd: string;
};

export type Order = {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  orderDate: Timestamp;
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Paid';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }[];
  shippingAddress: {
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
};


export type UpcomingLaunch = {
  name: string;
  date: string;
  description: string;
};
