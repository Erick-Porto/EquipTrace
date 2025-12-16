import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Tags,
  LogOut,
  Cpu,
  X,
  Truck,
  ShieldCheck,
} from "lucide-react";
import logo from "../assets/image_0.png";

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  // Link Ativo com Glow Roxo e Fundo Gradiente
  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
      isActive
        ? "bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white shadow-lg shadow-violet-500/20 border border-white/10"
        : "text-slate-400 hover:bg-white/5 hover:text-white hover:pl-5" // Efeito de slide no hover
    }`;

  // Base com Glassmorphism
  const baseClasses =
    "flex flex-col h-full bg-slate-950/80 backdrop-blur-xl border-r border-white/5";

  const layoutClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`
    : "hidden md:flex w-72 sticky top-0 h-screen";

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`${baseClasses} ${layoutClasses}`}>
        {/* Header com Logo */}
        <div className="p-8 pb-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
              <img src={logo} alt="Logo" className="relative h-10 w-auto" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Equip
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                  Trace
                </span>
              </h1>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  Online
                </p>
              </div>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Navegação */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-bold text-slate-500 uppercase px-4 py-2 mt-2 tracking-widest">
            Dashboards
          </div>
          <NavLink to="/dashboard" onClick={onClose} className={navItemClass}>
            <LayoutDashboard size={18} /> Visão Geral
          </NavLink>
          <NavLink
            to="/manage-assets"
            onClick={onClose}
            className={navItemClass}
          >
            <Truck size={18} /> Frota & Ativos
          </NavLink>

          <div className="text-[10px] font-bold text-slate-500 uppercase px-4 py-2 mt-6 tracking-widest">
            Gestão
          </div>
          <NavLink
            to="/manage-hardware"
            onClick={onClose}
            className={navItemClass}
          >
            <Cpu size={18} /> Hardware IoT
          </NavLink>
          <NavLink
            to="/manage-users"
            onClick={onClose}
            className={navItemClass}
          >
            <Users size={18} /> Colaboradores
          </NavLink>

          <div className="text-[10px] font-bold text-slate-500 uppercase px-4 py-2 mt-6 tracking-widest">
            Sistema
          </div>
          <NavLink
            to="/manage-roles"
            onClick={onClose}
            className={navItemClass}
          >
            <ShieldCheck size={18} /> Permissões
          </NavLink>
          <NavLink
            to="/manage-types"
            onClick={onClose}
            className={navItemClass}
          >
            <Tags size={18} /> Categorias
          </NavLink>
        </nav>

        {/* Footer com Perfil */}
        <div className="p-4 border-t border-white/5 bg-black/20 mx-4 mb-4 rounded-xl">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-slate-400 hover:text-red-400 transition group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-white/10 group-hover:border-red-500/30">
              <LogOut size={16} />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white group-hover:text-red-400">
                Sair da Conta
              </p>
              <p className="text-[10px]">Admin Logged</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
