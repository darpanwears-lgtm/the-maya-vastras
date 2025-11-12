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

export type UpcomingLaunch = {
  name: string;
  date: string;
  description: string;
};
