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
  launchDateStart: Timestamp | Date;
  launchDateEnd: Timestamp | Date;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
};

export type UpcomingLaunch = {
  name: string;
  date: string;
  description: string;
};
