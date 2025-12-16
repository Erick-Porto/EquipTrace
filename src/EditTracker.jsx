import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, X, User } from "lucide-react";
import { useTrackerContext } from "./context/TrackerContext";
import { iconMap } from "./utils/iconMap";

const EditTracker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Pegamos users e assetTypes do contexto
  const { getTrackerById, updateTracker, assetTypes, users } =
    useTrackerContext();

  const [formData, setFormData] = useState({
    name: "",
    model: "",
    type: "",
    interval: "5",
    alertEnabled: false,
    assignedUserId: "", // Novo campo de vínculo
  });

  useEffect(() => {
    const tracker = getTrackerById(id);
    if (tracker) {
      setFormData(tracker);
    } else {
      navigate("/dashboard");
    }
  }, [id, getTrackerById, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTracker(id, formData);
    navigate("/dashboard");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header Simples pois já temos sidebar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Editar Rastreador</h1>
          <p className="text-slate-400">ID: #{id}</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-slate-800 p-2 rounded-lg text-slate-400 hover:text-white transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Dados Básicos */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label-style">Nome do Rastreador</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-style"
              />
            </div>
            <div>
              <label className="label-style">Modelo do Hardware</label>
              <select
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="input-style"
              >
                <option value="Macaron F08-AZ">Loshall Macaron F08-AZ</option>
                <option value="SenseCAP T1000">SenseCAP T1000</option>
              </select>
            </div>
          </div>

          {/* Vínculo de Responsável (NOVO) */}
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700/50">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <User size={18} className="text-blue-500" /> Responsável pelo
              Ativo
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-style">
                  Quem está com o equipamento?
                </label>
                <select
                  name="assignedUserId"
                  value={formData.assignedUserId || ""}
                  onChange={handleChange}
                  className="input-style bg-slate-800 border-blue-500/30 focus:border-blue-500"
                >
                  <option value="">-- Ninguém / Estoque --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role})
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-slate-400 pt-7">
                * Vincular um usuário permite rastrear o histórico de posse do
                equipamento.
              </div>
            </div>
          </div>

          {/* Tipos de Ativos (Dinâmico e Restrito) */}
          <div>
            <label className="label-style mb-3 block">
              Classificação do Ativo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {assetTypes.map((type) => {
                const IconComponent = iconMap[type.iconKey] || iconMap["Box"];
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, type: type.id }))
                    }
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition h-20 ${
                      formData.type === type.id
                        ? "bg-blue-600 border-blue-500 text-white ring-2 ring-blue-400/20"
                        : "bg-slate-900 border-slate-600 text-slate-400 hover:border-slate-500 hover:bg-slate-800"
                    }`}
                  >
                    <IconComponent size={24} className="mb-2" />
                    <span className="text-[10px] w-full text-center truncate px-1 font-medium">
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-700 flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary flex justify-center items-center gap-2"
            >
              <Save size={20} /> Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      {/* Styles Helper */}
      <style>{`
        .label-style { @apply block text-sm font-medium text-slate-400 mb-2; }
        .input-style { @apply w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition; }
        .btn-primary { @apply px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-900/20; }
        .btn-secondary { @apply px-4 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition font-medium; }
      `}</style>
    </div>
  );
};

export default EditTracker;
