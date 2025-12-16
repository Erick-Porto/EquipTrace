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
import logo from "../assets/image_0.png"; // Importe a imagem do logo

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium text-sm ${
      isActive
        ? "bg-purple-secondary text-white shadow-lg shadow-purple-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  const baseClasses =
    "bg-slate-950 border-r border-slate-800 flex flex-col h-full";
  const layoutClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`
    : "hidden md:flex w-64 sticky top-0 h-screen";

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside className={`${baseClasses} ${layoutClasses}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <img src={logo} alt="EquipTrace Logo" className="h-8 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Equip<span className="text-purple-accent">Trace</span>
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                Rastreamento de Equipamentos
              </p>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1"
            >
              <X size={24} />
            </button>
          )}
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-600 uppercase px-4 py-2 mt-2">
            Operação
          </div>
          <NavLink to="/dashboard" onClick={onClose} className={navItemClass}>
            <LayoutDashboard size={18} /> Visão Geral
          </NavLink>
          <NavLink
            to="/manage-assets"
            onClick={onClose}
            className={navItemClass}
          >
            <Truck size={18} /> Ativos Monitorados
          </NavLink>
          <div className="text-[10px] font-bold text-slate-600 uppercase px-4 py-2 mt-4">
            Técnico
          </div>
          <NavLink
            to="/manage-hardware"
            onClick={onClose}
            className={navItemClass}
          >
            <Cpu size={18} /> Estoque (Hardware)
          </NavLink>
          <NavLink
            to="/manage-users"
            onClick={onClose}
            className={navItemClass}
          >
            <Users size={18} /> Efetivo
          </NavLink>
          <div className="text-[10px] font-bold text-slate-600 uppercase px-4 py-2 mt-4">
            Configuração
          </div>
          <NavLink
            to="/manage-roles"
            onClick={onClose}
            className={navItemClass}
          >
            <ShieldCheck size={18} /> Cargos
          </NavLink>
          <NavLink
            to="/manage-types"
            onClick={onClose}
            className={navItemClass}
          >
            <Tags size={18} /> Tipos de Ativos
          </NavLink>
        </nav>
        <div className="p-4 border-t border-slate-800 bg-slate-950 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition font-medium text-sm"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
