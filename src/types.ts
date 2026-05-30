export interface Room {
  id: string;
  name: string;
  category: string;
  price: number;
  priceNote: string;
  description: string;
  services: string[];
  features: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  image: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
