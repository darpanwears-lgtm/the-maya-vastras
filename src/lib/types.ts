export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  category: string;
  garmentType: string;
  launchStartDate: string;
  launchEndDate: string;
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
