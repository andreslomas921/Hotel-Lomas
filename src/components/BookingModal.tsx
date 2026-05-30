import React, { useState, useEffect } from "react";
import { Room, Booking } from "../types";
import { X, Calendar, User, Mail, CreditCard, Sparkles, CheckCircle2 } from "lucide-react";

interface BookingModalProps {
  room: Room | null;
  onClose: () => void;
  onAddBooking: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ room, onClose, onAddBooking }) => {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Set default dates: today and tomorrow
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatDateVal = (d: Date) => {
      const yr = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, "0");
      const dy = String(d.getDate()).padStart(2, "0");
      return `${yr}-${mo}-${dy}`;
    };

    setStartDate(formatDateVal(today));
    setEndDate(formatDateVal(tomorrow));
  }, [room]);

  if (!room) return null;

  // Calculate nights
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const diffTime = Math.abs(endD.getTime() - startD.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const totalPrice = room.price * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      setErrorMsg("Por favor, complete todos los campos de contacto.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setErrorMsg("La fecha de salida debe ser posterior a la fecha de entrada.");
      return;
    }

    setErrorMsg("");

    const newBooking: Booking = {
      id: "booking-" + Math.random().toString(36).substring(2, 9),
      roomId: room.id,
      roomName: room.name,
      guestName: guestName,
      guestEmail: guestEmail,
      startDate: startDate,
      endDate: endDate,
      totalPrice: totalPrice,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    onAddBooking(newBooking);
    setCreatedBooking(newBooking);
    setIsSuccess(true);
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      setErrorMsg("Por favor, complete todos los campos de contacto antes de continuar con WhatsApp.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setErrorMsg("La fecha de salida debe ser posterior a la fecha de entrada.");
      return;
    }

    setErrorMsg("");

    const newBooking: Booking = {
      id: "booking-" + Math.random().toString(36).substring(2, 9),
      roomId: room.id,
      roomName: room.name,
      guestName: guestName,
      guestEmail: guestEmail,
      startDate: startDate,
      endDate: endDate,
      totalPrice: totalPrice,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    onAddBooking(newBooking);
    setCreatedBooking(newBooking);

    // Build the descriptive WhatsApp Message
    const textMsg = `¡Hola! Me gustaría reservar en *Hotel Lomas*
    
*Detalles del Huésped:*
• *Nombre:* ${guestName.trim()}
• *Correo:* ${guestEmail.trim()}

*Detalles de la Reserva:*
• *Habitación:* ${room.name} (${room.category})
• *Fechas del viaje:* del ${startDate} al ${endDate} (${nights} ${nights > 1 ? "noches" : "noche"})
• *Huéspedes:* ${guestCount} ${guestCount === 1 ? "persona" : "personas"}
• *Total Estimado:* $${totalPrice} USD

¡Por favor confírmenme la disponibilidad! Muchas gracias.`;

    const waUrl = `https://api.whatsapp.com/send?phone=593980259612&text=${encodeURIComponent(textMsg)}`;
    
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="booking-modal-overlay">
      <div className="bg-[#faf9f6] rounded-2xl w-full max-w-2xl border border-[#e2dfd5] shadow-2xl overflow-hidden transition-all duration-300 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2dfd5] bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#8c826e]" />
            <h3 className="font-display font-bold text-lg text-[#1e1e1c]">
              {isSuccess ? "Reserva Confirmada" : "Confirmación de Estadía"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 hover:bg-neutral-100 rounded-full transition-all focus:outline-none cursor-pointer"
            id="btn-close-booking-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess && createdBooking ? (
          // Success State Dashboard
          <div className="p-8 text-center overflow-y-auto flex-1 flex flex-col items-center justify-center">
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full mb-4 animate-bounce">
              <CheckCircle2 className="h-12 w-12" id="success-icon" />
            </div>
            <h4 className="font-display text-2xl font-bold text-emerald-800 tracking-tight">
              ¡Reserva Guardada con Éxito!
            </h4>
            <p className="text-neutral-600 text-sm mt-3 max-w-md mx-auto">
              Te hemos enviado un correo de confirmación con los detalles para el check-in. ¡Tu lujosa experiencia en <span className="font-medium text-[#1e1e1c]">Hotel Lomas</span> te espera!
            </p>

            <div className="mt-6 bg-white p-5 rounded-xl border border-[#e2dfd5] text-left w-full max-w-md">
              <span className="text-[10px] uppercase font-mono font-bold text-[#8c826e] tracking-wider block mb-2">Detalle de la Reserva</span>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-dashed border-neutral-100">
                  <span className="text-neutral-500">Habitación:</span>
                  <span className="font-semibold text-neutral-800">{room.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed border-neutral-100">
                  <span className="text-neutral-500">Huésped:</span>
                  <span className="font-medium text-neutral-800">{createdBooking.guestName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed border-neutral-100">
                  <span className="text-neutral-500">Correo:</span>
                  <span className="text-neutral-700">{createdBooking.guestEmail}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed border-neutral-100">
                  <span className="text-neutral-500">Duración:</span>
                  <span className="font-medium text-neutral-800">{nights} {nights > 1 ? "noches" : "noche"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed border-neutral-100">
                  <span className="text-neutral-500">Fechas:</span>
                  <span className="font-mono text-xs text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
                    {startDate} al {endDate}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-base font-bold text-[#1e1e1c]">
                  <span>Total Pagado:</span>
                  <span>${createdBooking.totalPrice} USD</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 bg-[#1e1e1c] hover:bg-[#8c826e] text-white px-8 py-3 rounded-full font-medium tracking-wide text-xs uppercase cursor-pointer transition-all focus:outline-none"
              id="btn-confirm-success-close"
            >
              Cerrar y Volver
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 flex flex-col">
            <div className="p-6 space-y-6 flex-1">
              {/* Room Card Preview */}
              <div className="flex gap-4 p-4 bg-white rounded-xl border border-[#e2dfd5]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-24 h-24 object-cover rounded-lg border border-neutral-200"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-[#8c826e]/10 text-[#8c826e] px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider mb-1">
                      {room.category}
                    </span>
                    <h4 className="font-display font-bold text-neutral-800 text-sm leading-snug">
                      {room.name}
                    </h4>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-[#1e1e1c]">${room.price} USD</span>
                    <span className="text-xs text-neutral-500">{room.priceNote}</span>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Su Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] text-sm focus:outline-none bg-white transition-all text-neutral-800 placeholder-neutral-400"
                      placeholder="Ej. Andrés Lomas"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <input
                      type="email"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] text-sm focus:outline-none bg-white transition-all text-neutral-800 placeholder-neutral-400"
                      placeholder="correo@ejemplo.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Fecha de Entrada
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <input
                      type="date"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] text-sm focus:outline-none bg-white transition-all text-neutral-800"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Fecha de Salida
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <input
                      type="date"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] text-sm focus:outline-none bg-white transition-all text-neutral-800"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Guest count choice */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Número de Huéspedes
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all focus:outline-none cursor-pointer ${
                        guestCount === num
                          ? "bg-[#1e1e1c] text-white border-transparent"
                          : "bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      {num} {num === 1 ? "Persona" : "Personas"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features snippet */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <h5 className="text-[10px] font-bold text-[#8c826e] uppercase tracking-wider mb-2">Servicios incluidos de cortesía</h5>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
                  {room.services.slice(0, 4).map((srv, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#8c826e]" />
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price calculation bar & action */}
            <div className="bg-[#1e1e1c] px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left w-full md:w-auto shrink-0 mb-2 md:mb-0">
                <span className="text-[10px] font-mono text-[#8c826e] uppercase tracking-widest block">Estadía de {nights} {nights > 1 ? "noches" : "noche"}</span>
                <span className="text-[#faf9f6]/95 text-xs font-light">Total Estimado Premium: </span>
                <span className="text-white text-2xl font-bold tracking-tight font-mono">${totalPrice} USD</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto items-stretch sm:items-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#d7c9b0]/15 hover:bg-[#d7c9b0]/30 text-[#d7c9b0] hover:text-white border border-[#d7c9b0]/40 px-5 py-3 rounded-full font-bold uppercase text-[11px] tracking-wider transition-all duration-300 cursor-pointer focus:outline-none"
                  id="btn-confirm-booking"
                >
                  <CreditCard className="h-3.5 w-3.5" /> Registro Local
                </button>
                
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-full font-bold uppercase text-[11px] tracking-widest transition-all duration-300 cursor-pointer focus:outline-none shadow-md shadow-emerald-950/20"
                  id="btn-whatsapp-booking"
                >
                  <svg className="w-4 h-4 text-white fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.457 5.704 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Reservar por WhatsApp
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
