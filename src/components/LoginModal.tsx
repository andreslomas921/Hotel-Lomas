import React, { useState } from "react";
import { X, ShieldCheck, Lock, User, AlertCircle, KeyRound } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Exact requested credentials: usuario admin / contraseña 172839al
    if (username.trim() === "admin" && password === "172839al") {
      setError("");
      onLoginSuccess();
      onClose();
    } else {
      setError("Credenciales incorrectas. Verifique el usuario y la contraseña de seguridad.");
    }
  };

  const fillDemoCreds = () => {
    setUsername("admin");
    setPassword("172839al");
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="login-modal-overlay">
      <div className="bg-[#faf9f6] rounded-2xl w-full max-w-md border border-[#e2dfd5] shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2dfd5] bg-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#8c826e]" />
            <span className="font-display font-bold text-base text-[#1e1e1c] uppercase tracking-wide">Acceso Interno</span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 hover:bg-neutral-100 rounded-full transition-all focus:outline-none cursor-pointer"
            id="btn-close-login-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center pb-2">
            <p className="text-xs text-neutral-500">
              Ingrese credenciales autorizadas del establecimiento para editar tarifas, registrar reservas y configurar la visibilidad general.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100 font-semibold flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Nombre de Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] text-sm focus:outline-none bg-white transition-all text-neutral-800"
                placeholder="Escriba usuario de administración (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-300 focus:border-[#8c826e] text-sm focus:outline-none bg-white transition-all text-neutral-800"
                placeholder="Introduzca contraseña (172839al)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Preset trigger for testing convenience */}
          <div className="py-2 flex items-center justify-between border-t border-b border-dashed border-neutral-200">
            <span className="text-[10px] text-neutral-400 font-mono">Prueba Rápida de Credenciales:</span>
            <button
              type="button"
              onClick={fillDemoCreds}
              className="inline-flex items-center gap-1 bg-[#8c826e]/10 hover:bg-[#8c826e]/20 text-[#5a503d] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer focus:outline-none"
              id="btn-fill-demo"
            >
              <KeyRound className="h-3 w-3" /> Auto-completar
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1e1e1c] hover:bg-[#8c826e] text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer focus:outline-none shadow-md"
            id="btn-login-submit"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
