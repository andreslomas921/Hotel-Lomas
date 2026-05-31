import React, { useState, useEffect } from "react";
import { Room } from "../types";
import { X, Save, Image as ImageIcon, Plus, Trash2 } from "lucide-react";

interface RoomModalProps {
  room: Room | null; // Null if creating
  onClose: () => void;
  onSave: (room: Room) => void;
}

const CATEGORIES = ["Deluxe", "Familiar", "Estándar", "Especializado", "Económico"];

const SAMPLE_IMAGES = [
  { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80", label: "Gris Minimalista" },
  { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", label: "Azul Marítimo" },
  { url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80", label: "Cozy Beige" },
  { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", label: "Royal Suite" },
  { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", label: "Tropical Eco" }
];

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Deluxe");
  const [price, setPrice] = useState(100);
  const [priceNote, setPriceNote] = useState("/ noche");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  
  // Gallery state
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  
  // Tag lists
  const [services, setServices] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  
  // New tag inputs
  const [newService, setNewService] = useState("");
  const [newFeature, setNewFeature] = useState("");
  
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (room) {
      setName(room.name);
      setCategory(room.category);
      setPrice(room.price);
      setPriceNote(room.priceNote || "/ noche");
      setDescription(room.description);
      setImage(room.image);
      setImages(room.images || (room.image ? [room.image] : []));
      setServices(room.services || []);
      setFeatures(room.features || []);
      setIsFeatured(room.isFeatured);
      setIsAvailable(room.isAvailable);
    } else {
      // Clear fields for new room
      setName("");
      setCategory("Deluxe");
      setPrice(120);
      setPriceNote("/ noche");
      setDescription("");
      setImage(SAMPLE_IMAGES[0].url);
      setImages([SAMPLE_IMAGES[0].url]);
      setServices(["Wi-Fi gratis", "Desayuno buffet", "Servicio integral"]);
      setFeatures(["Cama matrimonial", "Aire acondicionado", "Baño privado"]);
      setIsFeatured(false);
      setIsAvailable(true);
    }
  }, [room]);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.trim() && !services.includes(newService.trim())) {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleRemoveService = (srv: string) => {
    setServices(services.filter((s) => s !== srv));
  };

  const handleRemoveFeature = (feat: string) => {
    setFeatures(features.filter((f) => f !== feat));
  };

  const handleAddImage = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = newImageUrl.trim();
    if (url && !images.includes(url)) {
      setImages([...images, url]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (index === 0 && updated.length > 0) {
      setImage(updated[0]);
    }
  };

  const handleSelectPreset = (url: string) => {
    setImage(url);
    if (!images.includes(url)) {
      setImages([url, ...images.filter((img) => img !== url)]);
    } else {
      // Move it to first position since it's now primary
      setImages([url, ...images.filter((img) => img !== url)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Por favor escriba un nombre.");
    
    // De-duplicate and ensure primary cover 'image' is always the first item
    const cleanPrimary = image.trim() || SAMPLE_IMAGES[0].url;
    const finalImagesList = [
      cleanPrimary,
      ...images.filter((img) => img.trim() && img.trim() !== cleanPrimary)
    ].filter(Boolean);

    const savedRoom: Room = {
      id: room ? room.id : "room-" + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      category: category,
      price: Number(price) || 0,
      priceNote: priceNote.trim() || "/ noche",
      description: description.trim(),
      image: cleanPrimary,
      images: finalImagesList,
      services: services,
      features: features,
      isFeatured: isFeatured,
      isAvailable: isAvailable
    };

    onSave(savedRoom);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="room-editor-modal">
      <div className="bg-[#faf9f6] rounded-2xl w-full max-w-3xl border border-[#e2dfd5] shadow-2xl overflow-hidden transition-all duration-300 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2dfd5] bg-white">
          <h3 className="font-display font-bold text-lg text-[#1e1e1c]">
            {room ? "Editar Habitación" : "Nueva Habitación"}
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 hover:bg-neutral-100 rounded-full transition-all focus:outline-none cursor-pointer"
            id="btn-close-room-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: General info */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Nombre de la Habitación
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-sm text-neutral-800"
                  placeholder="Ej. Junior Suite Vista Jardín"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Categoría
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-sm text-neutral-800"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Precio (USD)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-sm text-neutral-800"
                    placeholder="90"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Glosa de Precio
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-sm text-neutral-800"
                    placeholder="e.g. / noche"
                    value={priceNote}
                    onChange={(e) => setPriceNote(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-neutral-300 accent-[#8c826e]"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    <span className="text-xs font-medium text-neutral-700">¿Destacada?</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-neutral-300 accent-[#8c826e]"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                    />
                    <span className="text-xs font-medium text-neutral-700">Disponible</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Descripción Corta
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-sm text-neutral-800 h-28 resize-none"
                  placeholder="Describa el espacio, ambiente, iluminación y experiencia en pocas palabras..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right Column: Services, tags and Image selector */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  URL de Imagen de Portada (Principal)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-sm text-neutral-800"
                    placeholder="https://..."
                    value={image}
                    onChange={(e) => {
                      const val = e.target.value;
                      setImage(val);
                      if (val && !images.includes(val)) {
                        setImages([val, ...images]);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Quick Preset Images */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Galería rápida de presets de hotel:</span>
                <div className="grid grid-cols-5 gap-2">
                  {SAMPLE_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => handleSelectPreset(img.url)}
                      className={`h-11 rounded-lg overflow-hidden border-2 relative cursor-pointer transition-all ${
                        image === img.url ? "border-[#8c826e] scale-105" : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                      title={img.label}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <p className="text-[9px] text-neutral-400 italic leading-tight">* Al pulsar un preset rápido se establece como portada e ingresa a la galería.</p>
              </div>

              {/* Multiple Images Gallery Grid */}
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Galería de Múltiples Fotos (Ángulos)
                  </label>
                  <span className="text-[10px] text-neutral-400 font-mono">({images.length} fotos)</span>
                </div>
                
                {/* Add Custom URL to images array */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-xs text-neutral-800"
                    placeholder="Escriba o pegue URL de otra imagen"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="bg-[#d7c9b0] text-[#1e1e1c] hover:bg-[#8c826e] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Thumbnails of currently stored list in gallery */}
                <div className="grid grid-cols-4 gap-2 p-2 bg-neutral-100/60 border border-neutral-200 rounded-xl max-h-40 overflow-y-auto">
                  {images.map((imgUrl, index) => (
                    <div key={index} className="relative group/thumb aspect-video rounded-lg overflow-hidden border border-neutral-200 bg-white shadow-xs">
                      <img src={imgUrl} alt={`Vista ${index}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      
                      {/* Badge if it is the primary cover */}
                      {imgUrl === image ? (
                        <span className="absolute bottom-1 left-1 bg-[#1e1e1c] text-white text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded-sm z-10 scale-90">
                          Portada
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setImage(imgUrl)}
                          className="absolute bottom-1 left-1 bg-[#8c826e] hover:bg-[#1e1e1c] text-white text-[8px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded-sm z-10 opacity-0 group-hover/thumb:opacity-100 transition-opacity focus:opacity-100 cursor-pointer scale-90"
                          title="Fijar como portada principal"
                        >
                          Usar Portada
                        </button>
                      )}

                      {/* Remove image icon */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-0.5 bg-black/60 rounded-full text-white/80 hover:text-red-400 opacity-0 group-hover/thumb:opacity-100 transition-opacity focus:opacity-100 cursor-pointer"
                        title="Eliminar de galería"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  {images.length === 0 && (
                    <div className="col-span-4 text-center py-4 text-xs text-neutral-400">
                      No hay fotos en galería. Añada alguna o pulse los presets rápidos.
                    </div>
                  )}
                </div>
              </div>

              {/* Services Tags Management */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Servicios Incluidos
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-xs text-neutral-800"
                    placeholder="Escriba un servicio (e.g. Wi-Fi de alta velocidad)"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="bg-[#d7c9b0] text-[#1e1e1c] hover:bg-[#8c826e] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-white border border-neutral-200 rounded-lg">
                  {services.length === 0 ? (
                    <span className="text-[11px] text-neutral-400 p-1">No hay servicios guardados.</span>
                  ) : (
                    services.map((srv) => (
                      <span
                        key={srv}
                        className="inline-flex items-center gap-1 bg-[#8c826e]/15 text-[#5a503d] px-2 py-0.5 rounded text-[11px]"
                      >
                        {srv}
                        <button
                          type="button"
                          onClick={() => handleRemoveService(srv)}
                          className="hover:text-red-600 focus:outline-none cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Features Tags Management */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Características de Equipamiento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] focus:outline-none bg-white text-xs text-neutral-800"
                    placeholder="Escriba una característica (e.g. Cama King de Plumas)"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="bg-[#d7c9b0] text-[#1e1e1c] hover:bg-[#8c826e] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-white border border-neutral-200 rounded-lg">
                  {features.length === 0 ? (
                    <span className="text-[11px] text-neutral-400 p-1">No hay características guardadas.</span>
                  ) : (
                    features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1 bg-[#1e1e1c]/10 text-neutral-800 px-2 py-0.5 rounded text-[11px]"
                      >
                        {feat}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feat)}
                          className="hover:text-red-600 focus:outline-none cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions footer */}
          <div className="pt-6 border-t border-[#e2dfd5] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1e1e1c] hover:bg-[#8c826e] text-[#faf9f6] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer focus:outline-none"
              id="btn-save-room-submit"
            >
              <Save className="h-4 w-4 text-[#d7c9b0]" /> Guardar Habitación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
