/** Home page content — hero, trending destinations, service links. */

export const HERO_IMAGE = {
  base: 'https://images.unsplash.com/photo-1493988577905-2fa4018652be',
  alt: 'Traveler overlooking a mountain valley at golden hour',
};

export interface TrendingDestination {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const TRENDING: TrendingDestination[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    image:
      'https://images.unsplash.com/photo-1715837484239-9e9b191a6bb6?q=80&w=1200&auto=format&fit=crop',
    description: 'Explore vibrant culture and cuisine. Immerse yourself in the heart of Japan!',
  },
  {
    id: 'bali',
    name: 'Bali',
    image:
      'https://images.unsplash.com/photo-1536152470836-b943b246224c?q=80&w=1200&auto=format&fit=crop',
    description:
      'A tropical paradise waiting for you. Unwind on stunning beaches and explore lush landscapes!',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    image:
      'https://images.unsplash.com/photo-1509821361533-422c91a204f0?q=80&w=1200&auto=format&fit=crop',
    description:
      'Luxury, adventure, and unforgettable experiences. Discover the magic of the desert!',
  },
  {
    id: 'paris',
    name: 'Paris',
    image:
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop',
    description:
      'The city of love and lights! Stroll along the Seine, enjoy fine dining, and see the Eiffel Tower!',
  },
];

export interface Service {
  icon: string;
  title: string;
  description: string;
  path: string;
}

export const SERVICES: Service[] = [
  {
    icon: '🗺️',
    title: 'Itinerary Builder',
    description: 'Plan your trip day by day with ease.',
    path: '/itinerary-builder',
  },
  {
    icon: '🧳',
    title: 'Packing List',
    description: 'Get a customized packing list for your destination.',
    path: '/packing-list',
  },
  {
    icon: '🌟',
    title: 'Travel Suggestions',
    description: 'Discover exciting destinations and activities.',
    path: '/travel-suggestions',
  },
  {
    icon: '💰',
    title: 'Budget Estimator',
    description: 'Plan your trip within your budget efficiently.',
    path: '/budget-estimator',
  },
  {
    icon: '☀️',
    title: 'Weather Forecast',
    description: 'Stay updated with destination weather forecasts.',
    path: '/weather-forecast',
  },
];
