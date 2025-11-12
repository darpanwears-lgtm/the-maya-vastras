import type { Order, UpcomingLaunch } from './types';

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
        // @ts-ignore
        date: "2023-10-27",
        totalAmount: 135.00,
        status: "Shipped",
        items: [
            { productId: "prod_001", productName: "Cosmic Chakra T-Shirt", quantity: 1, price: 45.00 },
            { productId: "prod_002", productName: "Matrix Mandala Hoodie", quantity: 1, price: 90.00 },
        ],
        userId: '',
        orderDate: new Date(),
        shippingAddress: {
            address: '',
            city: '',
            state: '',
            pincode: '',
            phone: ''
        }
    },
    {
        id: "ORD-002",
        customerName: "Trinity",
        customerEmail: "trinity@matrix.com",
        // @ts-ignore
        date: "2023-10-28",
        totalAmount: 75.00,
        status: "Pending",
        items: [
            { productId: "prod_003", productName: "Neon Nataraja Sweatpants", quantity: 1, price: 75.00 },
        ],
        userId: '',
        orderDate: new Date(),
        shippingAddress: {
            address: '',
            city: '',
            state: '',
            pincode: '',
            phone: ''
        }
    },
    {
        id: "ORD-003",
        customerName: "Morpheus",
        customerEmail: "morpheus@matrix.com",
        // @ts-ignore
        date: "2023-10-28",
        totalAmount: 150.00,
        status: "Delivered",
        items: [
            { productId: "prod_004", productName: "Yantra Glitch Jacket", quantity: 1, price: 150.00 },
        ],
        userId: '',
        orderDate: new Date(),
        shippingAddress: {
            address: '',
            city: '',
            state: '',
            pincode: '',
            phone: ''
        }
    }
];
