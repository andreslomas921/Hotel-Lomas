import React, { useState } from "react";
import { Room, Booking } from "../types";
import { Plus, Edit3, Trash2, Calendar, Star, StarOff, CheckCircle, XCircle, Search, ToggleLeft, ToggleRight, DollarSign } from "lucide-react";

interface AdminPanelProps {
  rooms: Room[];
  bookings: Booking[];
  onAddRoom: () => void;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (id: string) => void;
  onToggleAvailability: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onClearBookings: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  rooms,
  bookings,
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
  onToggleAvailability,
  onToggleFeatured,
  onClearBookings
}) => {
  const [activeTab, setActiveTab] = useState<"rooms" | "bookings">("rooms");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(rooms.map((r) => r.category)));

  // Calculate statistics
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.isAvailable).length;
  const featuredRooms = rooms.filter(r => r.isFeatured).length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-20 pt-8" id="admin-panel-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Panel Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-[#e2dfd5] gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-[#1e1e1c] tracking-tight">
              Consola de Administración de Hotel
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Configure la oferta de habitaciones del portal, controle disponibilidad y administre estancias activas en tiempo real.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onAddRoom}
              className="flex items-center gap-2 bg-[#1e1e1c] hover:bg-[#8c826e] text-white px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
              id="btn-new-room"
            >
              <Plus className="h-4 w-4" /> Nueva Habitación
            </button>
          </div>
        </div>

        {/* Multi-widget KPIs metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[#e2dfd5] shadow-sm">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block">Habitaciones Registradas</span>
            <span className="text-3xl font-display font-bold text-neutral-800 block mt-1">{totalRooms}</span>
            <span className="text-[10px] text-neutral-500 block mt-2">Capacidad total cargada</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#e2dfd5] shadow-sm">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block">Disponibles Online</span>
            <span className="text-3xl font-display font-bold text-emerald-600 block mt-1">{availableRooms}</span>
            <span className="text-[10px] text-emerald-500 block mt-2">{totalRooms - availableRooms} no disponibles en el Catálogo</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#e2dfd5] shadow-sm">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block">Rooms Destacadas</span>
            <span className="text-3xl font-display font-bold text-[#8c826e] block mt-1">
              <span className="flex items-center gap-1.5">
                {featuredRooms} <Star className="h-5 w-5 text-[#8c826e] fill-current" />
              </span>
            </span>
            <span className="text-[10px] text-neutral-500 block mt-2">Sección banner principal</span>
          </div>
          <div className="bg-[#1e1e1c] p-5 rounded-xl border border-transparent shadow-sm text-white">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block">Ventas Estancias</span>
            <span className="text-3xl font-display font-bold text-[#d7c9b0] block mt-1">${totalRevenue} USD</span>
            <span className="text-[11px] text-neutral-300 block mt-2">{bookings.length} Reservas registradas</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#e2dfd5] gap-6 mb-6">
          <button
            onClick={() => setActiveTab("rooms")}
            className={`pb-4 text-sm font-semibold tracking-wide uppercase focus:outline-none transition-all cursor-pointer ${
              activeTab === "rooms"
                ? "border-b-2 border-[#1e1e1c] text-[#1e1e1c]"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
            id="tab-rooms-view"
          >
            Habitaciones ({filteredRooms.length})
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`pb-4 text-sm font-semibold tracking-wide uppercase focus:outline-none transition-all cursor-pointer ${
              activeTab === "bookings"
                ? "border-b-2 border-[#1e1e1c] text-[#1e1e1c]"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
            id="tab-bookings-view"
          >
            Historial de Reservas ({bookings.length})
          </button>
        </div>

        {/* TAB Panel: Rooms */}
        {activeTab === "rooms" ? (
          <div className="space-y-4">
            
            {/* Filter Search actions */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-[#e2dfd5] shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm bg-[#faf9f6] focus:outline-none focus:border-[#8c826e] text-neutral-800"
                  placeholder="Buscar habitación por título, categoría..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none text-neutral-700"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Todas las Categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Rooms Grid Table list */}
            {filteredRooms.length === 0 ? (
              <div className="bg-white text-center py-16 px-4 rounded-2xl border border-[#e2dfd5]">
                <p className="text-neutral-400 text-sm">No se encontraron habitaciones cargadas en el sistema.</p>
                <button
                  onClick={onAddRoom}
                  className="mt-4 inline-flex items-center gap-2 bg-[#d7c9b0] text-[#1e1e1c] px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all focus:outline-none cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Crear Primera Habitación
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#e2dfd5] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#faf9f6] border-b border-[#e2dfd5] text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        <th className="py-4 px-6">Detalle Habitación</th>
                        <th className="py-4 px-3">Categoría</th>
                        <th className="py-4 px-3">Precio USD</th>
                        <th className="py-4 px-3 text-center">Destacada</th>
                        <th className="py-4 px-3 text-center">Visibilidad Landing</th>
                        <th className="py-4 px-6 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm">
                      {filteredRooms.map((room) => (
                        <tr key={room.id} className="hover:bg-[#faf9f6]/30 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img
                                src={room.image}
                                alt={room.name}
                                className="w-14 h-14 object-cover rounded-lg border border-neutral-200"
                              />
                              <div>
                                <span className="font-semibold text-neutral-800 block text-sm leading-tight">
                                  {room.name}
                                </span>
                                <span className="text-[11px] text-neutral-500 block line-clamp-1 max-w-sm mt-1">
                                  {room.description}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-3">
                            <span className="inline-block bg-[#1e1e1c]/5 text-[#1e1e1c] px-2.5 py-0.5 rounded text-xs font-medium">
                              {room.category}
                            </span>
                          </td>

                          <td className="py-4 px-3">
                            <div className="font-mono text-[#1e1e1c] font-semibold text-xs">
                              ${room.price} <span className="text-neutral-400 font-sans text-[10px]">{room.priceNote}</span>
                            </div>
                          </td>

                          <td className="py-4 px-3 text-center">
                            <button
                              onClick={() => onToggleFeatured(room.id)}
                              className="p-1 rounded-full text-neutral-400 hover:text-[#8c826e] focus:outline-none transition-colors cursor-pointer"
                              title={room.isFeatured ? "Marcar como común" : "Destacar en la landing principal"}
                            >
                              {room.isFeatured ? (
                                <Star className="h-5 w-5 text-amber-500 fill-current mx-auto" />
                              ) : (
                                <StarOff className="h-5 w-5 text-neutral-300 mx-auto" />
                              )}
                            </button>
                          </td>

                          <td className="py-4 px-3 text-center">
                            <button
                              onClick={() => onToggleAvailability(room.id)}
                              className={`flex items-center gap-1 mx-auto px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${
                                room.isAvailable
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : "bg-red-50 text-red-800 border-red-200"
                              }`}
                            >
                              {room.isAvailable ? (
                                <>
                                  <ToggleRight className="h-4 w-4 text-emerald-600" /> Disponible
                                </>
                              ) : (
                                <>
                                  <ToggleLeft className="h-4 w-4 text-red-400" /> Oculta
                                </>
                              )}
                            </button>
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => onEditRoom(room)}
                                className="flex items-center gap-1 text-[#8c826e] hover:bg-neutral-100 p-2 rounded-lg text-xs font-medium transition-all cursor-pointer focus:outline-none"
                                title="Editar Habitación"
                              >
                                <Edit3 className="h-3.5 w-3.5" /> Editar
                              </button>
                              <button
                                onClick={() => onDeleteRoom(room.id)}
                                className="flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded-lg text-xs font-medium transition-all cursor-pointer focus:outline-none"
                                title="Eliminar Habitación"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* TAB Panel: Bookings history list */
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#e2dfd5] shadow-sm">
              <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Historial de Estancias Registradas</span>
              
              {bookings.length > 0 && (
                <button
                  onClick={onClearBookings}
                  className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors uppercase tracking-wider cursor-pointer focus:outline-none"
                  id="btn-clear-bookings"
                >
                  Vaciar Historial
                </button>
              )}
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white text-center py-16 px-4 rounded-2xl border border-[#e2dfd5]">
                <Calendar className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-400 text-sm">No hay registros de estancias registradas todavía.</p>
                <p className="text-neutral-500 text-xs mt-1">Registra reservas haciendo click en "Reservar" desde la landing page.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#e2dfd5] overflow-hidden shadow-sm">
                <div className="overflow-x-auto box-border">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#faf9f6] border-b border-[#e2dfd5] text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        <th className="py-4 px-6">ID Reserva</th>
                        <th className="py-4 px-4">Huésped</th>
                        <th className="py-4 px-4">Habitación</th>
                        <th className="py-4 px-4">Entrada / Salida</th>
                        <th className="py-4 px-4">Monto Facturado</th>
                        <th className="py-4 px-6 text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-[#faf9f6]/30 transition-colors">
                          <td className="py-4 px-6 font-mono text-xs text-cyan-800 font-semibold">
                            {booking.id}
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <span className="font-semibold text-neutral-800 block text-xs">
                                {booking.guestName}
                              </span>
                              <span className="text-[11px] text-neutral-400 block break-all">
                                {booking.guestEmail}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium text-neutral-700 text-xs">
                            {booking.roomName}
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-[#1e1e1c]">
                            {booking.startDate} al {booking.endDate}
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-neutral-800 text-xs">
                            ${booking.totalPrice} USD
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle className="h-3 w-3 text-emerald-600" /> Confirmada
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
