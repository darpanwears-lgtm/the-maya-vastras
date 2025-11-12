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
  launchDateStart?: Timestamp;
  launchDateEnd?: Timestamp;
};

export type UpcomingLaunch = {
  name: string;
  date: string;
  description: string;
};

export type LaunchSchedule = {
  id: string;
  description: string;
  accessCode: string;
  launchDateStart: Timestamp;
  launchDateEnd: Timestamp;
}

export type HeroSection = {
  badgeText: string;
  title: string;
  description: string;
}
