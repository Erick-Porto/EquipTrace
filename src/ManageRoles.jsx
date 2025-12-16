import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "./context/TrackerContext";
import { ArrowLeft, Trash2, Plus, Briefcase, ShieldCheck } from "lucide-react";

const ManageRoles = () => {
  const navigate = useNavigate();
  const { roles, addRole, removeRole } = useTrackerContext();
  const [newRole, setNewRole] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newRole.trim()) return;
    addRole(newRole);
    setNewRole("");
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
        <button
          onClick={() => navigate("/manage-users")}
          className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"
        >
          <ArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Cargos</h1>
          <p className="text-slate-400 text-sm">
            Defina as funções disponíveis.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Coluna 1: Lista */}
        <div className="bg-slate-800 rounded-xl p-5 md:p-6 border border-slate-700 order-2 md:order-1">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-500" /> Cargos Ativos
          </h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition"
              >
                <span className="text-white font-medium flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {role.label}
                </span>
                <button
                  onClick={() => removeRole(role.id)}
                  className="text-slate-600 hover:text-red-500 hover:bg-red-500/10 transition p-2 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna 2: Adicionar */}
        <div className="bg-slate-800 rounded-xl p-5 md:p-6 border border-slate-700 h-fit sticky top-4 order-1 md:order-2">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Plus size={20} className="text-blue-500" /> Novo Cargo
          </h2>
          <form onSubmit={handleAdd}>
            <div className="mb-6">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Nome da Função
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase size={18} className="text-slate-500" />
                </div>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ex: Supervisor"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <Plus size={20} /> Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageRoles;
