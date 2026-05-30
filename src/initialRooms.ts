import { Room } from "./types";

export const INITIAL_ROOMS: Room[] = [
  {
    id: "room-1",
    name: "EXCLUSIVE MATRIMONIAL",
    category: "Deluxe",
    price: 18,
    priceNote: "/ noche",
    description: "Nuestra habitación más exclusiva. Disfruta de un diseño de confort y elegancia en nuestra Habitación Exclusive Matrimonial, diseñada para brindar el máximo descanso en pareja.",
    services: [
      "Wi-Fi de alta velocidad",
      "Servicio a la habitación 24/7",
      "Desayuno Premium buffet",
      "Mini bar libre"
    ],
    features: [
      "Cama King Size de lino",
      "cafetera",
      "pantalla plasma"
    ],
    isFeatured: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-2",
    name: "COMFORT SIMPLE",
    category: "Estándar",
    price: 13,
    priceNote: "/ noche",
    description: "Diseñada para brindar comodidad, funcionalidad y descanso, nuestra Habitación Simple es la elección ideal para viajeros que buscan una estancia placentera en un espacio acogedor y moderno.",
    services: [
      "Wi-Fi gratis",
      "Estacionamiento privado",
      "Limpieza diaria",
      "Televisores inteligentes"
    ],
    features: [
      "Cama Individual de algodón",
      "Escritorio moderno",
      "Lámpara de lectura"
    ],
    isFeatured: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-3",
    name: "COMFORT DOBLE",
    category: "Especializado",
    price: 22,
    priceNote: "/ noche",
    description: "Diseñada para quienes buscan compartir una estancia cómoda sin renunciar al confort, nuestra Habitación Doble ofrece un espacio amplio y acogedor, ideal para amigos, colegas o parejas del viaje.",
    services: [
      "Wi-Fi ultrarrápido",
      "Café de especialidad incluido"
    ],
    features: [
      "Área de trabajo dedicada",
      "Dos camas Twin confortables",
      "Ducha efecto lluvia"
    ],
    isFeatured: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-4",
    name: "COMFORT TRIPLE",
    category: "Familiar",
    price: 32,
    priceNote: "/ noche",
    description: "El espacio perfecto para viajar en familia o con amigos. Con tres acogedoras camas y amplios ambientes compartidos en una ubicación privilegiada del complejo.",
    services: [
      "Wi-Fi de alta velocidad",
      "Agua caliente permanente",
      "Parqueadero privado gratis",
      "Atención 24 Horas",
      "Servicio rápido de lavandería",
      "Videovigilancia de seguridad",
      "Mini Bar para huéspedes"
    ],
    features: [
      "1 Cama de dos plazas + 2 Camas Twin de algodón",
      "Cocina equipada",
      "Baño con tina de hidromasaje",
      "Balcón con comedor exterior"
    ],
    isFeatured: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "room-5",
    name: "COMFORT SUITE DELUXE",
    category: "Deluxe",
    price: 45,
    priceNote: "/ noche",
    description: "Rodeado por un santuario tropical de plantas nativas y con un diseño de confort, ofrece un entorno inigualable y las mayores comodidades para toda su estadía.",
    services: [
      "Wi-Fi de alta velocidad",
      "Agua caliente permanente",
      "Parqueadero privado gratis",
      "Atención 24 Horas",
      "Videovigilancia de seguridad",
      "Mini Bar y refrigerio premium"
    ],
    features: [
      "Cama Queen Premium",
      "Ducha al aire libre (Privada)",
      "Ventilación bioclimática",
      "Hamacas de macramé"
    ],
    isFeatured: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
  }
];
