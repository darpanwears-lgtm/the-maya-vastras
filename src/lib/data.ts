import type { Product, Order, UpcomingLaunch } from './types';

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

const pastLaunch = getLaunchDates(-10, 5); // A launch that ended 5 days ago
const currentLaunch = getLaunchDates(-2, 7); // A launch that started 2 days ago and lasts for 7 days
const futureLaunch = getLaunchDates(10, 5); // A launch starting in 10 days

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Cosmic Chakra T-Shirt',
    description: 'Unlock your inner universe with the Cosmic Chakra T-Shirt. This premium black tee features a mesmerizing neon green print of ancient Vedic symbols interwoven with digital Matrix code, representing the harmony of spirit and technology. Crafted from 100% combed cotton for a soft, breathable feel that keeps you comfortable as you navigate your reality.',
    price: 45.00,
    images: ['prod_001_img_1'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Matrix Black', 'Vedic Green'],
    category: 'Tops',
    garmentType: 'T-Shirt',
    launchStartDate: currentLaunch.start,
    launchEndDate: currentLaunch.end,
  },
  {
    id: 'prod_002',
    name: 'Matrix Mandala Hoodie',
    description: 'Embrace the digital divine. Our Matrix Mandala Hoodie is engineered for the modern mystic, featuring an intricate purple and neon green mandala design that flows like a river of data. The heavyweight fleece fabric provides warmth and structure, while the oversized fit ensures maximum comfort. A hidden pocket inside the kangaroo pouch keeps your essentials secure in any dimension.',
    price: 90.00,
    images: ['prod_002_img_1'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cosmic Black', 'Digital Purple'],
    category: 'Tops',
    garmentType: 'Hoodie',
    launchStartDate: currentLaunch.start,
    launchEndDate: currentLaunch.end,
  },
  {
    id: 'prod_003',
    name: 'Neon Nataraja Sweatpants',
    description: 'Move with the rhythm of the cosmos. The Neon Nataraja Sweatpants are designed for ultimate freedom of movement, whether you\'re in a deep meditative state or exploring the urban jungle. A subtle, glowing representation of Shiva\'s cosmic dance adorns the leg, rendered in our signature neon green. Made with a premium cotton-poly blend, these joggers offer both style and durability.',
    price: 75.00,
    images: ['prod_003_img_1'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Deep Space Black', 'Cyber Neon Green'],
    category: 'Bottoms',
    garmentType: 'Sweatpants',
    launchStartDate: currentLaunch.start,
    launchEndDate: currentLaunch.end,
  },
  {
    id: 'prod_004',
    name: 'Yantra Glitch Jacket',
    description: 'A protective layer against the digital noise. The Yantra Glitch Jacket is a statement piece, blending a classic bomber silhouette with a futuristic aesthetic. A complex, glitch-art inspired Yantra is embroidered on the back in purple and green thread, symbolizing cosmic order within chaos. The jacket is water-resistant and features a quilted lining for all-weather comfort.',
    price: 150.00,
    images: ['prod_004_img_1'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Midnight Black', 'Glitch Green'],
    category: 'Outerwear',
    garmentType: 'Jacket',
    launchStartDate: currentLaunch.start,
    launchEndDate: currentLaunch.end,
  },
   {
    id: 'prod_005',
    name: 'Vedic Glitch T-Shirt',
    description: 'A past relic of a forgotten code. This shirt was a legend in its time.',
    price: 40.00,
    images: ['prod_005_img_1'],
    sizes: ['S', 'M', 'L'],
    colors: ['Archive Black'],
    category: 'Tops',
    garmentType: 'T-Shirt',
    launchStartDate: pastLaunch.start,
    launchEndDate: pastLaunch.end,
  },
  {
    id: 'prod_006',
    name: 'Maya Code Hoodie',
    description: 'The future is encoded. This hoodie is not yet available, but its arrival is foretold.',
    price: 95.00,
    images: ['prod_006_img_1'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Future Black'],
    category: 'Tops',
    garmentType: 'Hoodie',
    launchStartDate: futureLaunch.start,
    launchEndDate: futureLaunch.end,
  }
];

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
