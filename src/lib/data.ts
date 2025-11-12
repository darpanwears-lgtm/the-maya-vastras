import type { Order, UpcomingLaunch } from './types';

// Helper to get future dates
const getLaunchDates = (startInDays: number, durationDays: number): { start: string, end: string } => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + startInDays);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + durationDays);
  return {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
  };
};

export const upcomingLaunch: UpcomingLaunch = {
  name: 'Drop 02: Quantum Dharma',
  date: 'LAUNCHING NOVEMBER 10-15',
  description: 'A new reality unfolds. Our second drop, Quantum Dharma, merges ancient wisdom with digital aesthetics. Limited pieces available for a limited time. Prepare to transcend.',
};

export const orders: Order[] = [
    {
        id: "ORD-001",
        customerName: "Neo Anderson",
        customerEmail: "neo@matrix.com",
        date: "2023-10-27",
        total: 135.00,
        status: "Shipped",
        items: [
            { productId: "prod_001", productName: "Cosmic Chakra T-Shirt", quantity: 1, price: 45.00 },
            { productId: "prod_002", productName: "Matrix Mandala Hoodie", quantity: 1, price: 90.00 },
        ]
    },
    {
        id: "ORD-002",
        customerName: "Trinity",
        customerEmail: "trinity@matrix.com",
        date: "2023-10-28",
        total: 75.00,
        status: "Pending",
        items: [
            { productId: "prod_003", productName: "Neon Nataraja Sweatpants", quantity: 1, price: 75.00 },
        ]
    },
    {
        id: "ORD-003",
        customerName: "Morpheus",
        customerEmail: "morpheus@matrix.com",
        date: "2023-10-28",
        total: 150.00,
        status: "Delivered",
        items: [
            { productId: "prod_004", productName: "Yantra Glitch Jacket", quantity: 1, price: 150.00 },
        ]
    }
];
