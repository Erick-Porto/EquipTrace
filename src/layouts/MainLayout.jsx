import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";
import logo from "../assets/image_0.png"; // Importe a imagem do logo

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-900 font-sans text-slate-100">
      <Sidebar isMobile={false} />
      <Sidebar
        isMobile={true}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-400 hover:text-white active:bg-slate-800 rounded-lg transition"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <img src={logo} alt="EquipTrace Logo" className="h-6 w-auto" />
              <h1 className="font-bold text-lg tracking-tight">
                Equip<span className="text-purple-accent">Trace</span>
              </h1>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-xs font-bold shadow-lg">
            A
          </div>
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
