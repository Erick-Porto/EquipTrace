import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "./context/TrackerContext";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Briefcase,
  ShieldCheck,
  Edit,
} from "lucide-react";

const ManageRoles = () => {
  const navigate = useNavigate();
  const { roles, addRole, updateRole, removeRole } = useTrackerContext();

  const [editingId, setEditingId] = useState(null);
  const [roleLabel, setRoleLabel] = useState("");

  const handleEdit = (role) => {
    setEditingId(role.id);
    setRoleLabel(role.label);
    // Foco no input (opcional)
  };

  const handleCancel = () => {
    setEditingId(null);
    setRoleLabel("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roleLabel.trim()) return;

    if (editingId) {
      updateRole(editingId, roleLabel);
    } else {
      addRole(roleLabel);
    }
    handleCancel();
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
        <button
          onClick={() => navigate("/manage-users")}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Cargos e Funções
          </h1>
          <p className="text-slate-400">
            Defina a hierarquia de acesso do sistema.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Lista */}
        <div className="glass-panel p-6 rounded-2xl order-2 md:order-1">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
              <ShieldCheck size={20} />
            </div>
            Cargos Ativos
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {roles.map((role) => {
              const isEditing = editingId === role.id;
              return (
                <div
                  key={role.id}
                  className={`glass-card p-4 rounded-xl flex items-center justify-between group ${
                    isEditing ? "border-violet-500/50 bg-violet-500/10" : ""
                  }`}
                >
                  <span className="text-white font-medium flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    {role.label}
                    {isEditing && (
                      <span className="text-[10px] text-violet-300 font-bold px-2 animate-pulse">
                        EDITANDO
                      </span>
                    )}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(role)}
                      className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-violet-300 hover:bg-violet-500/20 transition"
                      disabled={isEditing}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => removeRole(role.id)}
                      className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-red-300 hover:bg-red-500/20 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulário */}
        <div className="glass-panel p-6 rounded-2xl h-fit sticky top-6 order-1 md:order-2 border border-violet-500/30 shadow-lg shadow-violet-900/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                editingId
                  ? "bg-violet-500/20 text-violet-300"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {editingId ? <Edit size={20} /> : <Plus size={20} />}
            </div>
            {editingId ? "Editar Cargo" : "Novo Cargo"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">
                Nome da Função
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase size={18} className="text-slate-500" />
                </div>
                <input
                  type="text"
                  value={roleLabel}
                  onChange={(e) => setRoleLabel(e.target.value)}
                  className="input-modern pl-11"
                  placeholder="Ex: Supervisor Logístico"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white font-bold transition"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {editingId ? "Salvar" : "Adicionar Cargo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageRoles;
