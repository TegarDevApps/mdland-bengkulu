export interface Resort {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
  coordinates: { latitude: number; longitude: number };
  featured: boolean;
}

export interface Villa {
  id: string;
  resortId: string;
  name: string;
  description: string;
  images: string[];
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  rating: number;
  available: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  genre: string;
  artist?: string;
  price: number;
  attending: number;
}

export interface DiningItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'cocktail' | 'wine' | 'beer';
  rating: number;
  isSignature: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  openHours: string;
  items: DiningItem[];
}

export interface Booking {
  id: string;
  villaId: string;
  villaName: string;
  resortName: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  tier: 'silver' | 'gold' | 'platinum';
  bookingsCount: number;
}

export interface MapMarker {
  id: string;
  title: string;
  description: string;
  coordinate: { latitude: number; longitude: number };
  type: 'resort' | 'restaurant' | 'event' | 'activity';
  image: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Home: undefined;
  Explore: undefined;
  ResortDetail: { resort: Resort };
  VillaDetail: { villa: Villa; resortName: string };
  Booking: { villa: Villa; resortName: string };
  Payment: { villa: Villa; checkIn: string; checkOut: string; guests: number; totalPrice: number };
  BookingSuccess: { bookingId: string };
  Events: undefined;
  MapView: undefined;
  Dining: undefined;
  Wishlist: undefined;
  Profile: undefined;
  MyBookings: undefined;
  Search: undefined;
};
