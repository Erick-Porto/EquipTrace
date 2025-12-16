import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "./context/TrackerContext";
import { iconMap, availableIcons } from "./utils/iconMap";
import { ArrowLeft, Trash2, Plus, Tags, Edit } from "lucide-react";

const ManageAssetTypes = () => {
  const navigate = useNavigate();
  const { assetTypes, addAssetType, updateAssetType, removeAssetType } =
    useTrackerContext();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ label: "", iconKey: "Box" });

  const handleEdit = (type) => {
    setEditingId(type.id);
    setFormData({ label: type.label, iconKey: type.iconKey });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ label: "", iconKey: "Box" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.label.trim()) return;

    if (editingId) {
      updateAssetType(editingId, formData);
    } else {
      addAssetType(formData.label, formData.iconKey);
    }
    handleCancel();
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Tipos de Ativos
          </h1>
          <p className="text-slate-400">Categorias e ícones para o mapa.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Lista */}
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
              <Tags size={20} />
            </div>
            Categorias Cadastradas
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {assetTypes.map((type) => {
              const IconComponent = iconMap[type.iconKey] || iconMap["Box"];
              const isEditing = editingId === type.id;

              return (
                <div
                  key={type.id}
                  className={`glass-card p-4 rounded-xl flex items-center justify-between group ${
                    isEditing ? "border-emerald-500/50 bg-emerald-500/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-800 rounded-lg text-emerald-400 border border-white/10 shadow-inner">
                      <IconComponent size={20} />
                    </div>
                    <span className="text-white font-medium">
                      {type.label}
                      {isEditing && (
                        <span className="ml-2 text-[10px] text-emerald-300 font-bold uppercase animate-pulse">
                          Editando
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(type)}
                      className="p-2.5 rounded-lg bg-white/5 text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/20 transition"
                      disabled={isEditing}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => removeAssetType(type.id)}
                      className="p-2.5 rounded-lg bg-white/5 text-slate-400 hover:text-red-300 hover:bg-red-500/20 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulário */}
        <div
          className={`glass-panel p-6 rounded-2xl h-fit sticky top-6 transition-all ${
            editingId ? "border-emerald-500/50 shadow-emerald-900/10" : ""
          }`}
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                editingId
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {editingId ? <Edit size={20} /> : <Plus size={20} />}
            </div>
            {editingId ? "Editar Categoria" : "Nova Categoria"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">
                Nome da Categoria
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="input-modern"
                placeholder="Ex: Moto, Gerador..."
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 block mb-2">
                Ícone do Mapa
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 p-3 bg-slate-950/50 rounded-xl border border-white/10 max-h-48 overflow-y-auto custom-scrollbar">
                {availableIcons.map((iconKey) => {
                  const IconComp = iconMap[iconKey];
                  const isSelected = formData.iconKey === iconKey;
                  return (
                    <button
                      key={iconKey}
                      type="button"
                      onClick={() => setFormData({ ...formData, iconKey })}
                      className={`p-2.5 rounded-lg flex justify-center items-center transition-all aspect-square ${
                        isSelected
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                          : "text-slate-500 hover:bg-white/10 hover:text-white"
                      }`}
                      title={iconKey}
                    >
                      <IconComp size={22} />
                    </button>
                  );
                })}
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
                className="btn-primary flex-1 flex items-center justify-center gap-2 from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-900/20"
              >
                {editingId ? "Salvar" : "Criar Categoria"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageAssetTypes;
