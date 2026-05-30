import { Room } from "./types";

export const INITIAL_ROOMS: Room[] = [
  {
    id: "room-1",
    name: "Master Suite Terraza y Jacuzzi",
    category: "Deluxe",
    price: 240,
    priceNote: "/ noche",
    description: "Nuestra habitación más exclusiva. Disfruta de un diseño minimalista y cálido con detalles en madera noble, una amplia terraza privada con jacuzzi exterior y vistas inigualables al amanecer.",
    services: ["Wi-Fi de alta velocidad", "Agua caliente permanente", "Parqueadero privado gratis", "Atención 24 Horas", "Mini Bar para huéspedes", "Videovigilancia de seguridad"],
    features: ["Cama King Size de lino", "Jacuzzi climatizado privado", "Cafetera Espresso", "Proyector de cine inteligente"],
    isFeatured: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-2",
    name: "Suite Familiar Vista al Mar",
    category: "Familiar",
    price: 185,
    priceNote: "/ noche",
    description: "El espacio perfecto para viajar en familia o con amigos. Con dos ambientes conectados y una terraza espaciosa frente al océano, ofrece toda la tranquilidad y el confort que necesitan.",
    services: ["Wi-Fi de alta velocidad", "Agua caliente permanente", "Parqueadero privado gratis", "Atención 24 Horas", "Servicio rápido de lavandería", "Videovigilancia de seguridad", "Mini Bar para huéspedes"],
    features: ["1 Cama King + 2 Camas Twin", "Cocina equipada", "Baño con tina de hidromasaje", "Balcón con comedor exterior"],
    isFeatured: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-3",
    name: "Habitación Studio Premium",
    category: "Estándar",
    price: 110,
    priceNote: "/ noche",
    description: "Diseñada para el viajero de negocios continuo o parejas que buscan eficiencia y comodidad elegante. Iluminación inteligente regulable, escritorio ergonómico de trabajo y baño de mármol.",
    services: ["Wi-Fi de alta velocidad", "Agua caliente permanente", "Parqueadero privado gratis", "Atención 24 Horas", "Servicio rápido de lavandería", "Mini Bar para huéspedes"],
    features: ["Cama Queen con almohadas de pluma", "Área de trabajo dedicada", "Ducha efecto lluvia", "Altavoz inteligente Bluetooth"],
    isFeatured: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-4",
    name: "Penthouse Suite Imperial",
    category: "Deluxe",
    price: 420,
    priceNote: "/ noche",
    description: "Viva el máximo esplendor en nuestro ático superior. Ofrece 150 metros cuadrados de pura sofisticación, salón comedor integrado, piano de media cola, chimenea de diseño y las vistas más altas del Resort.",
    services: ["Wi-Fi de alta velocidad", "Agua caliente permanente", "Parqueadero privado gratis", "Atención 24 Horas", "Servicio rápido de lavandería", "Videovigilancia de seguridad", "Mini Bar completo de uso libre"],
    features: ["Cama California King", "Chimenea ecológica", "Bar privado equipado", "Baño spa de vapor"],
    isFeatured: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-5",
    name: "Eco-Bungalow Oasis",
    category: "Especial",
    price: 160,
    priceNote: "/ noche",
    description: "Rodeado por un santuario tropical de plantas nativas y con acceso directo a una piscina de arena natural. Construido respetando el entorno con materiales sustentables y acabados artesanales.",
    services: ["Wi-Fi de alta velocidad", "Agua caliente permanente", "Parqueadero privado gratis", "Atención 24 Horas", "Videovigilancia de seguridad", "Mini Bar para huéspedes"],
    features: ["Cama Queen Premium", "Ducha al aire libre (Privada)", "Ventilación bioclimática", "Hamacas de macramé"],
    isFeatured: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
  }
];
