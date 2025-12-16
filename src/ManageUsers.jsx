import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTrackerContext } from "./context/TrackerContext";
import { UserPlus, Trash2, Briefcase, Mail, Settings } from "lucide-react";

const ManageUsers = () => {
  const { users, addUser, removeUser, roles } = useTrackerContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: roles.length > 0 ? roles[0].label : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addUser(formData);
    setFormData({
      name: "",
      email: "",
      role: roles.length > 0 ? roles[0].label : "",
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Gestão de Efetivo
          </h1>
          <p className="text-slate-400 text-sm">
            Cadastre técnicos e motoristas.
          </p>
        </div>
        <Link
          to="/manage-roles"
          className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-lg hover:bg-slate-700 hover:text-white transition text-slate-300 font-medium"
        >
          <Settings size={18} /> Gerenciar Cargos
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Formulário */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-xl p-5 md:p-6 border border-slate-700 sticky top-4">
            <h2 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus size={20} className="text-blue-500" /> Novo Colaborador
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-white outline-none focus:border-blue-500 mt-1"
                  placeholder="Ex: Carlos Silva"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-white outline-none focus:border-blue-500 mt-1"
                  placeholder="email@loshall.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Função
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-white outline-none focus:border-blue-500 mt-1"
                >
                  <option value="" disabled>
                    Selecione...
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.label}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-2"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>

        {/* Lista */}
        <div className="lg:col-span-2 space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-lg uppercase">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-bold">{user.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-slate-400 mt-1">
                    <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 text-xs">
                      <Briefcase size={12} /> {user.role}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <Mail size={12} /> {user.email}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeUser(user.id)}
                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition self-end sm:self-center"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {users.length === 0 && (
            <div className="text-center py-10 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
              Nenhum usuário cadastrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
