export interface Villa {
  id: string;
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
  category: 'standard' | 'deluxe' | 'premium' | 'suite';
}

export interface Wahana {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  capacity: number;
  category: 'water' | 'adventure' | 'family' | 'leisure';
  rating: number;
  available: boolean;
  minAge?: number;
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
  category: 'appetizer' | 'main' | 'dessert' | 'snack' | 'beverage' | 'cocktail';
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

export interface CartItem {
  item: DiningItem | Wahana;
  quantity: number;
  type: 'food' | 'wahana';
}

export interface Booking {
  id: string;
  villaId?: string;
  villaName?: string;
  wahanaId?: string;
  wahanaName?: string;
  type: 'villa' | 'wahana' | 'food';
  image: string;
  checkIn?: string;
  checkOut?: string;
  date?: string;
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
  type: 'villa' | 'restaurant' | 'event' | 'wahana';
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
  VillaDetail: { villa: Villa };
  BookingVilla: { villa: Villa };
  Payment: { totalPrice: number; type: string; itemName: string };
  BookingSuccess: undefined;
  Events: undefined;
  MapView: undefined;
  FnB: undefined;
  FnBOrder: { restaurant: Restaurant };
  FnBCart: undefined;
  WahanaList: undefined;
  WahanaDetail: { wahana: Wahana };
  WahanaTicket: { wahana: Wahana };
  Wishlist: undefined;
  Profile: undefined;
  MyBookings: undefined;
  Search: undefined;
};
