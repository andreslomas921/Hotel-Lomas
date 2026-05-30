import React from "react";
import { Hotel, ShieldAlert, LogOut, ArrowLeft, CalendarRange } from "lucide-react";

interface NavbarProps {
  currentView: "landing" | "admin";
  onViewChange: (view: "landing" | "admin") => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
  onOpenLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  isAdminLoggedIn,
  onLogout,
  onOpenLoginModal
}) => {
  return (
    <nav className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#e2dfd5] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and branding */}
          <button
            onClick={() => onViewChange("landing")}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            id="nav-logo"
          >
            <div className="bg-[#1e1e1c] text-[#faf9f6] p-2.5 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <Hotel className="h-5 w-5" />
            </div>
            <div>
              <span className="block font-display text-xl font-bold tracking-tight text-[#1e1e1c] uppercase">
                Hotel Lomas
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-[#8c826e] uppercase">
                Estadías Selectas
              </span>
            </div>
          </button>

          {/* Nav menu links */}
          <div className="hidden md:flex space-x-8 items-center">
            {currentView === "landing" ? (
              <>
                <a href="#hero" className="text-sm font-medium text-[#1e1e1c] hover:text-[#8c826e] transition-colors focus:outline-none">
                  Inicio
                </a>
                <a href="#rooms-section" className="text-sm font-medium text-[#1e1e1c] hover:text-[#8c826e] transition-colors focus:outline-none">
                  Habitaciones
                </a>
                <a href="#services-section" className="text-sm font-medium text-[#1e1e1c] hover:text-[#8c826e] transition-colors focus:outline-none">
                  Servicios
                </a>
                <a href="#experience-section" className="text-sm font-medium text-[#1e1e1c] hover:text-[#8c826e] transition-colors focus:outline-none">
                  Contacto
                </a>
              </>
            ) : (
              <button
                onClick={() => onViewChange("landing")}
                className="flex items-center gap-2 text-sm font-medium text-[#1e1e1c] hover:text-[#8c826e] transition-colors cursor-pointer focus:outline-none"
                id="btn-back-to-landing"
              >
                <ArrowLeft className="h-4 w-4" /> Volver a la Landing
              </button>
            )}
          </div>

          {/* System Admin buttons */}
          <div className="flex items-center gap-4">
            {currentView === "landing" ? (
              isAdminLoggedIn ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onViewChange("admin")}
                    className="flex items-center gap-2 bg-[#d7c9b0]/20 hover:bg-[#d7c9b0]/40 text-[#5a503d] border border-[#d7c9b0]/60 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none"
                    id="btn-go-admin-direct"
                  >
                    <CalendarRange className="h-3.5 w-3.5" /> Login Admin
                  </button>
                  <button
                    onClick={onLogout}
                    className="p-2 text-[#7c715c] hover:text-red-600 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer focus:outline-none"
                    title="Cerrar sesión de administrador"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="flex items-center gap-2 bg-[#1e1e1c] hover:bg-[#8c826e] text-[#faf9f6] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus:outline-none"
                  id="btn-admin-login"
                >
                  <ShieldAlert className="h-3.5 w-3.5 text-[#d7c9b0]" /> Login Admin
                </button>
              )
            ) : (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider">
                  Admin Autenticado
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 bg-neutral-100 hover:bg-red-50 hover:text-red-600 text-neutral-700 border border-neutral-300 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none"
                  id="btn-admin-logout"
                >
                  <LogOut className="h-3.5 w-3.5" /> Salir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
