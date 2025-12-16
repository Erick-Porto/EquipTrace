import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTrackerContext } from "./context/TrackerContext";
import {
  UserPlus,
  Trash2,
  Edit,
  Briefcase,
  Mail,
  Settings,
  Save,
  X,
} from "lucide-react";

const ManageUsers = () => {
  const { users, addUser, updateUser, removeUser, roles } = useTrackerContext();

  // State de Edição
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: roles.length > 0 ? roles[0].label : "",
  });

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      role: roles.length > 0 ? roles[0].label : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingId) {
      updateUser(editingId, formData);
    } else {
      addUser(formData);
    }
    handleCancel();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Gestão de Efetivo
          </h1>
          <p className="text-slate-400">
            Controle de acesso e responsabilidades.
          </p>
        </div>
        <Link
          to="/manage-roles"
          className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium transition flex items-center gap-2 backdrop-blur-sm"
        >
          <Settings size={18} /> Gerenciar Cargos
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-1">
          <div
            className={`glass-panel p-6 rounded-2xl sticky top-6 transition-all ${
              editingId ? "border-violet-500/50 shadow-violet-900/20" : ""
            }`}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  editingId
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {editingId ? <Edit size={20} /> : <UserPlus size={20} />}
              </div>
              {editingId ? "Editar Colaborador" : "Novo Colaborador"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-modern mt-2"
                  placeholder="Ex: Carlos Silva"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input-modern mt-2"
                  placeholder="email@equiptrace.com"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Função
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="input-modern mt-2 appearance-none"
                >
                  {roles.map((role) => (
                    <option
                      key={role.id}
                      value={role.label}
                      className="bg-slate-900"
                    >
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
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
                  className="btn-primary flex-1 flex justify-center items-center gap-2"
                >
                  {editingId ? "Salvar" : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Lista */}
        <div className="lg:col-span-2 space-y-4">
          {users.map((user) => {
            const isEditing = editingId === user.id;
            return (
              <div
                key={user.id}
                className={`glass-card p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                  isEditing ? "bg-violet-500/10 border-violet-500/50" : ""
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-300 font-bold text-lg border border-white/5 shadow-inner">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {user.name}
                      {isEditing && (
                        <span className="text-[10px] bg-violet-500 text-white px-2 py-0.5 rounded-full">
                          EDITANDO
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-violet-400" />{" "}
                        {user.role}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail size={14} className="text-slate-500" />{" "}
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 self-end sm:self-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-violet-500/20 hover:text-violet-300 transition border border-white/5"
                    disabled={isEditing}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Excluir usuário?"))
                        removeUser(user.id);
                    }}
                    className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-300 transition border border-white/5"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
