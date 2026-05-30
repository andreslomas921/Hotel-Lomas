import { useState, useEffect } from "react";
import { Room, Booking } from "./types";
import { INITIAL_ROOMS } from "./initialRooms";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { AdminPanel } from "./components/AdminPanel";
import { LoginModal } from "./components/LoginModal";
import { RoomModal } from "./components/RoomModal";
import { BookingModal } from "./components/BookingModal";

export default function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentView, setCurrentView] = useState<"landing" | "admin">("landing");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Modal controller states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);

  // 1. Initial State Data Retrieval from client-side localStorage
  useEffect(() => {
    const savedRooms = localStorage.getItem("lomas_rooms");
    if (savedRooms) {
      try {
        setRooms(JSON.parse(savedRooms));
      } catch (e) {
        setRooms(INITIAL_ROOMS);
        localStorage.setItem("lomas_rooms", JSON.stringify(INITIAL_ROOMS));
      }
    } else {
      setRooms(INITIAL_ROOMS);
      localStorage.setItem("lomas_rooms", JSON.stringify(INITIAL_ROOMS));
    }

    const savedBookings = localStorage.getItem("lomas_bookings");
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        setBookings([]);
      }
    }

    const savedLogged = localStorage.getItem("lomas_admin_logged");
    if (savedLogged === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // 2. Real-time Save Helper for persistence
  const saveRoomsToStorage = (updatedRooms: Room[]) => {
    setRooms(updatedRooms);
    localStorage.setItem("lomas_rooms", JSON.stringify(updatedRooms));
  };

  const saveBookingsToStorage = (updatedBookings: Booking[]) => {
    setBookings(updatedBookings);
    localStorage.setItem("lomas_bookings", JSON.stringify(updatedBookings));
  };

  // 3. Admin Credentials handler
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem("lomas_admin_logged", "true");
    setCurrentView("admin"); // Take authenticated user straight to the Administrative cockpit
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("lomas_admin_logged");
    setCurrentView("landing"); // Return to standard landing layout
  };

  // 4. Room DB operations
  const handleOpenAddRoom = () => {
    setEditingRoom(null);
    setIsRoomModalOpen(true);
  };

  const handleOpenEditRoom = (room: Room) => {
    setEditingRoom(room);
    setIsRoomModalOpen(true);
  };

  const handleSaveRoom = (savedRoom: Room) => {
    let updatedRooms: Room[];
    const exists = rooms.some((r) => r.id === savedRoom.id);

    if (exists) {
      updatedRooms = rooms.map((r) => (r.id === savedRoom.id ? savedRoom : r));
    } else {
      updatedRooms = [...rooms, savedRoom];
    }

    saveRoomsToStorage(updatedRooms);
    setIsRoomModalOpen(false);
    setEditingRoom(null);
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm("¿Está completamente seguro que desea eliminar este registro de habitación?")) {
      const updatedRooms = rooms.filter((r) => r.id !== id);
      saveRoomsToStorage(updatedRooms);
    }
  };

  const handleToggleAvailability = (id: string) => {
    const updatedRooms = rooms.map((r) =>
      r.id === id ? { ...r, isAvailable: !r.isAvailable } : r
    );
    saveRoomsToStorage(updatedRooms);
  };

  const handleToggleFeatured = (id: string) => {
    const updatedRooms = rooms.map((r) =>
      r.id === id ? { ...r, isFeatured: !r.isFeatured } : r
    );
    saveRoomsToStorage(updatedRooms);
  };

  // 5. Booking DB operations
  const handleOpenBookRoom = (room: Room) => {
    setBookingRoom(room);
  };

  const handleAddBooking = (newBooking: Booking) => {
    const updatedBookings = [newBooking, ...bookings];
    saveBookingsToStorage(updatedBookings);
  };

  const handleClearBookings = () => {
    if (window.confirm("¿Está seguro que desea limpiar todo el historial de estancias registradas?")) {
      saveBookingsToStorage([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-[#1e1e1c] selection:bg-[#d7c9b0]/50" id="application-container">
      
      {/* Universal header navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={(view) => {
          if (view === "admin" && !isAdminLoggedIn) {
            setIsLoginModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleLogout}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main View Router switch */}
      <div className="flex-grow">
        {currentView === "landing" ? (
          <LandingPage
            rooms={rooms}
            onBookRoom={handleOpenBookRoom}
            onOpenLoginModal={() => {
              if (isAdminLoggedIn) {
                setCurrentView("admin");
              } else {
                setIsLoginModalOpen(true);
              }
            }}
          />
        ) : (
          <AdminPanel
            rooms={rooms}
            bookings={bookings}
            onAddRoom={handleOpenAddRoom}
            onEditRoom={handleOpenEditRoom}
            onDeleteRoom={handleDeleteRoom}
            onToggleAvailability={handleToggleAvailability}
            onToggleFeatured={handleToggleFeatured}
            onClearBookings={handleClearBookings}
          />
        )}
      </div>

      {/* MODAL LAYER OVERLAYS */}
      
      {/* 1. Login Modal for Administrative cockpit entry */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* 2. Room editor modal for creation and corrections */}
      {isRoomModalOpen && (
        <RoomModal
          room={editingRoom}
          onClose={() => {
            setIsRoomModalOpen(false);
            setEditingRoom(null);
          }}
          onSave={handleSaveRoom}
        />
      )}

      {/* 3. Booking reservation transaction modal */}
      {bookingRoom && (
        <BookingModal
          room={bookingRoom}
          onClose={() => setBookingRoom(null)}
          onAddBooking={handleAddBooking}
        />
      )}

    </div>
  );
}
