import React, { useState } from "react";
import { Room } from "../types";
import { Star, ShieldAlert, BadgeCheck, Compass, Sparkles, SlidersHorizontal, ArrowRight, Utensils, Waves, MoonStar, Coffee, Wifi, Flame, Car, Clock, Shirt, Camera, GlassWater, Phone } from "lucide-react";
import { RoomImageCarousel } from "./RoomImageCarousel";

interface LandingPageProps {
  rooms: Room[];
  onBookRoom: (room: Room) => void;
  onOpenLoginModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  rooms,
  onBookRoom,
  onOpenLoginModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  // Filter available rooms
  const availableRoomsList = rooms.filter((r) => r.isAvailable);

  const categories = Array.from(new Set(availableRoomsList.map((r) => r.category)));

  const filteredCatalog = availableRoomsList.filter((room) => {
    const matchesCategory = selectedCategory === "all" || room.category === selectedCategory;
    const matchesFeatured = !onlyFeatured || room.isFeatured;
    return matchesCategory && matchesFeatured;
  });

  return (
    <div className="bg-mesh min-h-screen" id="landing-page-root">
      
      {/* 1. HERO BANNER SECTION */}
      <header id="hero" className="relative h-[85vh] flex items-center justify-center text-center hero-gradient px-4 select-none">
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-4xl mx-auto space-y-6 z-10 text-white p-4">
          <div className="inline-flex items-center gap-1.5 bg-[#faf9f6]/10 border border-[#faf9f6]/20 px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest text-[#d7c9b0]">
            <Sparkles className="h-3 w-3" /> Redefiniendo el Descanso de Lujo
          </div>
          
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight uppercase">
            UN REFUGIO SELECTO <br />
            <span className="text-[#d7c9b0]">PARA EL ESPÍRITU LIBRE</span>
          </h1>
          
          <p className="text-sm sm:text-base text-neutral-200 font-light max-w-xl mx-auto leading-relaxed">
            Descubra habitaciones únicas integradas con el confort contemporáneo y el ritmo de la naturaleza salvaje. Diseños galardonados creados para inspirar su estancia ideal.
          </p>

          <div className="pt-6 flex justify-center gap-4">
            <a
              href="#rooms-section"
              className="bg-[#faf9f6] text-[#1e1e1c] hover:bg-[#d7c9b0]/90 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-all duration-300 pointer-events-auto"
            >
              Explorar Habitaciones
            </a>
            <a
              href="#services-section"
              className="border border-[#faf9f6]/50 hover:bg-white/10 hover:border-white text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              Nuestra Experiencia
            </a>
          </div>
        </div>

        {/* Ambient indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-[9px] font-mono tracking-widest text-white uppercase">Siga Explorando hacia Abajo</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#d7c9b0] animate-bounce" />
        </div>
      </header>

      {/* 2. STATS BAR / INTRO */}
      <section className="bg-[#1e1e1c] py-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            <div className="pt-4 md:pt-0">
              <span className="text-3xl font-display font-light block text-[#d7c9b0]">100%</span>
              <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase mt-1 block">Privacidad Garantizada</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="text-3xl font-display font-light block text-[#d7c9b0]">4.9 ★</span>
              <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase mt-1 block">Calificación de Huéspedes</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="text-3xl font-display font-light block text-[#d7c9b0]">15+</span>
              <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase mt-1 block">Servicios del Resort Gratis</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="text-3xl font-display font-light block text-[#d7c9b0]">24/7</span>
              <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase mt-1 block">Soporte y Conserjería Concierge</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATALOG HABITACIONES SECTION */}
      <main id="rooms-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header content section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold text-[#8c826e] tracking-widest uppercase block mb-1">Catálogo Exclusivo</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1e1e1c] tracking-tight leading-none uppercase">
              SELECCIONE SU HABITACIÓN
            </h2>
            <p className="text-neutral-500 text-sm mt-3">
              Mostrando habitaciones creadas por la administración. Cada una ofrece una decoración personalizada y equipamiento de lino ecológico de máxima gama.
            </p>
          </div>

          {/* Filtering Controls Widget Box */}
          <div className="bg-white p-3 rounded-2xl border border-[#e2dfd5] shadow-sm flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-neutral-400 border-r border-[#e2dfd5] mr-1 font-mono uppercase font-semibold">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#8c826e]" /> Filtrar
            </div>

            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all focus:outline-none ${
                selectedCategory === "all"
                  ? "bg-[#1e1e1c] text-white"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700"
              }`}
            >
              Todas ({availableRoomsList.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all focus:outline-none ${
                  selectedCategory === cat
                    ? "bg-[#1e1e1c] text-white"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700"
                }`}
              >
                {cat} ({availableRoomsList.filter((r) => r.category === cat).length})
              </button>
            ))}

            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`ml-2 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all flex items-center gap-1 focus:outline-none ${
                onlyFeatured
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-white text-neutral-500 border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              <Star className={`h-3 w-3 ${onlyFeatured ? "fill-current text-amber-500" : ""}`} /> Destacadas
            </button>
          </div>
        </div>

        {/* Catalog Grid List */}
        {filteredCatalog.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#e2dfd5] shadow-sm">
            <Compass className="h-10 w-10 text-[#8c826e] mx-auto mb-3" />
            <h4 className="font-display font-bold text-lg text-neutral-800">No hay estancias coincidentes</h4>
            <p className="text-neutral-500 text-sm mt-1 max-w-sm mx-auto">
              No disponemos de habitaciones de esta categoría asignadas como disponibles actualmente. Modifique los filtros de consulta.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setOnlyFeatured(false);
              }}
              className="mt-4 bg-[#1e1e1c] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none"
            >
              Resetear Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCatalog.map((room) => (
              <article
                key={room.id}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl flex flex-col ${
                  room.isFeatured
                    ? "border-[#d7c9b0] shadow-[#d7c9b0]/5 ring-1 ring-[#d7c9b0]/45"
                    : "border-[#e2dfd5] shadow-md"
                }`}
                id={`room-card-${room.id}`}
              >
                {/* Room Image Container */}
                <div className="relative h-64 overflow-hidden group">
                  <RoomImageCarousel images={room.images && room.images.length > 0 ? room.images : [room.image]} altText={room.name} />

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10">
                    <span className="bg-[#1e1e1c]/95 text-[#faf9f6] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                      {room.category}
                    </span>
                    {room.isFeatured && (
                      <span className="bg-[#d7c9b0]/95 text-[#1e1e1c] border border-amber-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-current text-[#1e1e1c]" /> Destacada
                      </span>
                    )}
                  </div>

                  {/* Price Overlay */}
                  <div className="absolute bottom-4 right-4 bg-[#faf9f6] px-4 py-2 rounded-xl shadow-lg border border-[#e2dfd5] z-10">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg font-bold text-[#1e1e1c] font-mono">${room.price} USD</span>
                      <span className="text-[10px] text-neutral-500 font-sans">{room.priceNote}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-display font-extrabold text-xl text-neutral-800 tracking-tight leading-tight uppercase limit-line">
                      {room.name}
                    </h3>
                    <p className="text-[#5c5c56] text-xs leading-relaxed font-light line-clamp-3">
                      {room.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-4 pt-4 border-t border-dashed border-[#e2dfd5]">
                    {room.features && room.features.length > 0 && (
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#8c826e] block mb-1.5">Equipamiento Premium</span>
                        <div className="flex flex-wrap gap-1">
                          {room.features.slice(0, 3).map((feat, i) => (
                            <span
                              key={i}
                              className="bg-neutral-100 border border-neutral-200/60 text-neutral-700 px-2.5 py-0.5 rounded text-[10px] font-medium"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {room.services && room.services.length > 0 && (
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#8c826e] block mb-1.5">Ventajas Incluidas</span>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-neutral-600">
                          {room.services.slice(0, 4).map((srv, i) => (
                            <span key={i} className="flex items-center gap-1 text-neutral-700 font-light truncate">
                              <BadgeCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Call to action button */}
                  <button
                    onClick={() => onBookRoom(room)}
                    className="w-full bg-[#1e1e1c] hover:bg-[#8c826e] text-white py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 mt-4 flex items-center justify-center gap-2 focus:outline-none shadow-md"
                    id={`btn-book-${room.id}`}
                  >
                    Reservar Estadía <ArrowRight className="h-3.5 w-3.5 text-[#d7c9b0]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* 4. PREMIUM SECTIONS (SERVICES & HOTEL PHILOSOPHY) */}
      <section id="services-section" className="bg-[#f3ede1]/90 py-24 border-t border-b border-[#e2dfd5] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono font-bold text-[#8c826e] tracking-widest uppercase block">Experiencia Exclusiva</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1e1e1c] uppercase tracking-tight">
              ESTANCIA DE COMPLETO BIENESTAR
            </h2>
            <p className="text-neutral-500 text-sm font-light">
              Nuestra filosofía entrelaza el lujo no pretencioso con la relajación. Acceda a una curaduría de comodidades de primer nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] space-y-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#1e1e1c] text-white rounded-xl inline-block">
                <Wifi className="h-5 w-5 text-[#d7c9b0]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1e1e1c] uppercase tracking-tight">Wi-Fi de Alta Velocidad</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Conectividad inalámbrica veloz y estable disponible sin costo en todas las habitaciones y áreas comunes del establecimiento.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] space-y-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#1e1e1c] text-white rounded-xl inline-block">
                <Flame className="h-5 w-5 text-[#d7c9b0]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1e1e1c] uppercase tracking-tight">Agua Caliente</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Duchas reconfortantes con flujo continuo de agua caliente y regulación térmica perfecta para su relax total.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] space-y-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#1e1e1c] text-white rounded-xl inline-block">
                <Car className="h-5 w-5 text-[#d7c9b0]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1e1e1c] uppercase tracking-tight">Parqueadero Privado</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Estacionamiento exclusivo y seguro dentro de nuestras instalaciones, completamente gratuito para todos los huéspedes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] space-y-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#1e1e1c] text-white rounded-xl inline-block">
                <Clock className="h-5 w-5 text-[#d7c9b0]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1e1e1c] uppercase tracking-tight">Atención 24 Horas</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Recepción activa y asistencia personalizada las 24 horas del día. Siempre listos para responder a cualquier necesidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] space-y-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#1e1e1c] text-white rounded-xl inline-block">
                <Shirt className="h-5 w-5 text-[#d7c9b0]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1e1e1c] uppercase tracking-tight">Lavandería</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Servicio ágil de lavado y planchado para mantener sus pertenencias en perfecto estado y pulcritud durante su viaje.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] space-y-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#1e1e1c] text-white rounded-xl inline-block">
                <Camera className="h-5 w-5 text-[#d7c9b0]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1e1e1c] uppercase tracking-tight">Video Vigilancia</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Circuito cerrado de cámaras de seguridad y monitorización constante para resguardar la tranquilidad de sus vacaciones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e2dfd5] space-y-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#1e1e1c] text-white rounded-xl inline-block">
                <GlassWater className="h-5 w-5 text-[#d7c9b0]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#1e1e1c] uppercase tracking-tight">Mini Bar para Clientes</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Compartimiento privado abastecido en su suite con una selecta colección de refrescos helados y aperitivos finos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOTEL GALLERY & PHILOSOPHY TEXT BLOCK */}
      <section id="experience-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
              alt="Hotel Ambient"
              className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl border border-[#e2dfd5] shadow-lg hidden sm:block max-w-[200px]">
              <span className="text-amber-500 font-bold block text-lg">“Un Sueño”</span>
              <span className="text-neutral-500 text-[11px] block mt-1 leading-snug">
                "La atención, el diseño de la Suite y la paz general del hotel es incomparable."
              </span>
              <span className="text-[9px] font-mono text-[#8c826e] tracking-widest block uppercase mt-2">Valeria M. (2026)</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-mono font-bold text-[#8c826e] tracking-widest uppercase block">La Filosofía Lomas</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1e1e1c] uppercase leading-tight tracking-tight">
              DÓNDE EL DISEÑO DE AUTOR SE UNE DE FORMA NATURAL CON EL SILENCIO
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed font-light">
              Descubra un espacio donde la comodidad, la atención personalizada y la seguridad se unen para ofrecer una experiencia de hospedaje superior. Nuestras habitaciones han sido diseñadas para garantizar descanso, privacidad y bienestar, con servicios exclusivos.
            </p>

            {/* CONTACT NUMBERS AREA */}
            <div className="bg-white p-5 rounded-2xl border border-[#e2dfd5] shadow-sm space-y-3">
              <span className="text-[10px] uppercase font-mono font-bold text-[#8c826e] tracking-wider block">Central de Atención y Reservas</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="tel:+593980259612" 
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 hover:bg-emerald-50 border border-neutral-100 hover:border-emerald-200 text-neutral-800 hover:text-emerald-700 font-bold text-sm transition-all focus:outline-none"
                >
                  <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <span className="block text-[9px] font-mono text-neutral-400 font-normal uppercase">Principal & Reservas</span>
                    +593 980 259 612
                  </div>
                </a>

                <a 
                  href="tel:+593999139878" 
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 hover:bg-amber-50 border border-neutral-100 hover:border-amber-200 text-neutral-800 hover:text-amber-700 font-bold text-sm transition-all focus:outline-none"
                >
                  <Phone className="h-4 w-4 text-amber-600 shrink-0" />
                  <div className="text-left">
                    <span className="block text-[9px] font-mono text-neutral-400 font-normal uppercase">Atención General</span>
                    +593 999 139 878
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenLoginModal}
                className="inline-flex items-center gap-2 border-b-2 border-[#1e1e1c] hover:border-amber-600 pb-1.5 text-xs font-bold uppercase tracking-widest text-[#1e1e1c] hover:text-[#8c826e] transition-all cursor-pointer focus:outline-none"
              >
                Ingresar a Gestión Interna <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SYSTEM FOOTER */}
      <footer className="bg-[#1e1e1c] text-white pt-16 pb-8 border-t border-neutral-850 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-neutral-800">
          <div className="space-y-4">
            <span className="font-display text-xl font-extrabold tracking-widest uppercase text-[#faf9f6]">
              Hotel Lomas
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Espacio boutique de relajación, diseño contemporáneo con servicios de primer nivel. Un rincón lomas donde el tiempo se detiene.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="font-mono text-xs uppercase tracking-widest text-neutral-400">Atajuelos de Navegación</h5>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li><a href="#hero" className="hover:text-[#d7c9b0] transition-colors">Inicio Refugio</a></li>
              <li><a href="#rooms-section" className="hover:text-[#d7c9b0] transition-colors">Habitaciones Catálogo</a></li>
              <li><a href="#services-section" className="hover:text-[#d7c9b0] transition-colors">Servicios Integrales</a></li>
              <li><a href="#experience-section" className="hover:text-[#d7c9b0] transition-colors">Filosofía Lomas</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#d7c9b0]">Reserva Exprés por WhatsApp</h5>
            <p className="text-xs text-neutral-400 font-light leading-normal">
              Contáctenos de forma directa al whatsapp principal para cotizaciones inmediatas, peticiones especiales o confirmaciones rápidas.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://api.whatsapp.com/send?phone=593980259612&text=Hola!%20Me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20las%20habitaciones%20de%20Hotel%20Lomas."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase text-[10px] tracking-widest px-4 py-2.5 rounded-xl transition-all duration-300 w-fit focus:outline-none cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.457 5.704 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Reservas
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 gap-4">
          <p>© 2026 Hotel Lomas S.A. Todos los derechos reservados. Desarrollado con Contactabilidad WhatsApp Directa.</p>
          <div className="flex gap-4">
            <span className="hover:text-neutral-300 transition-colors">Términos del Portal</span>
            <span className="hover:text-neutral-300 transition-colors">Políticas de Cancelación (24h)</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
