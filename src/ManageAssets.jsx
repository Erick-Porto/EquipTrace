import React, { useState } from "react";
import { useTrackerContext } from "./context/TrackerContext";
import { iconMap } from "./utils/iconMap";
import {
  Truck,
  Plus,
  Trash2,
  User,
  Cpu,
  Edit,
  Save,
  X,
  Link as LinkIcon,
} from "lucide-react";

const ManageAssets = () => {
  const {
    assets,
    addAsset,
    updateAsset,
    removeAsset,
    hardwares,
    users,
    assetTypes,
  } = useTrackerContext();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "veiculo_leve",
    assignedUserId: "",
    linkedHardwareId: "",
  });

  const availableHardwares = hardwares.filter(
    (h) =>
      !assets.find((a) => a.linkedHardwareId === h.id && a.id !== editingId)
  );

  const handleEdit = (asset) => {
    setEditingId(asset.id);
    setFormData({
      name: asset.name,
      type: asset.type,
      assignedUserId: asset.assignedUserId || "",
      linkedHardwareId: asset.linkedHardwareId || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "",
      type: "veiculo_leve",
      assignedUserId: "",
      linkedHardwareId: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert("O ativo precisa de um nome.");
    const payload = {
      ...formData,
      linkedHardwareId: formData.linkedHardwareId
        ? Number(formData.linkedHardwareId)
        : null,
    };
    editingId ? updateAsset(editingId, payload) : addAsset(payload);
    handleCancel();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          Ativos Monitorados
        </h1>
        <p className="text-slate-400">
          Gerencie a frota e vínculos de hardware.
        </p>
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
                {editingId ? <Edit size={20} /> : <Plus size={20} />}
              </div>
              {editingId ? "Editar Ativo" : "Novo Ativo"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Nome do Ativo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-modern mt-2"
                  placeholder="Ex: Carro 01"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="input-modern mt-2 appearance-none"
                >
                  {assetTypes.map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-900">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <LinkIcon size={12} /> Hardware
                </label>
                <select
                  value={formData.linkedHardwareId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      linkedHardwareId: e.target.value,
                    })
                  }
                  className={`input-modern mt-2 appearance-none ${
                    formData.linkedHardwareId
                      ? "border-green-500/50 text-green-300"
                      : ""
                  }`}
                >
                  <option value="" className="bg-slate-900">
                    -- Nenhum --
                  </option>
                  {availableHardwares.map((h) => (
                    <option key={h.id} value={h.id} className="bg-slate-900">
                      {h.model} — {h.serial}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Responsável
                </label>
                <select
                  value={formData.assignedUserId}
                  onChange={(e) =>
                    setFormData({ ...formData, assignedUserId: e.target.value })
                  }
                  className="input-modern mt-2 appearance-none"
                >
                  <option value="" className="bg-slate-900">
                    -- Ninguém --
                  </option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id} className="bg-slate-900">
                      {u.name}
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
                  {editingId ? "Salvar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* LISTA DE ATIVOS */}
        <div className="lg:col-span-2 space-y-4">
          {assets.map((asset) => {
            const hw = hardwares.find((h) => h.id === asset.linkedHardwareId);
            const user = users.find((u) => u.id == asset.assignedUserId);
            const typeObj = assetTypes.find((t) => t.id === asset.type);
            const Icon = iconMap[typeObj?.iconKey] || iconMap["Box"];
            const isEditing = editingId === asset.id;

            return (
              <div
                key={asset.id}
                className={`glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                  isEditing ? "border-violet-500/50 bg-violet-500/5" : ""
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                      isEditing
                        ? "bg-violet-500 text-white"
                        : "bg-slate-800 text-slate-400 border border-white/5"
                    }`}
                  >
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      {asset.name}
                      {isEditing && (
                        <span className="text-[10px] bg-violet-500 text-white px-2 py-0.5 rounded-full">
                          EDITANDO
                        </span>
                      )}
                    </h3>
                    <div className="text-sm text-slate-400 flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                      <span
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/20 ${
                          hw ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        <Cpu size={14} /> {hw ? hw.model : "Sem hardware"}
                      </span>
                      {user && (
                        <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/20">
                          <User size={14} /> {user.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO RESTAURADOS */}
                <div className="flex gap-3 self-end sm:self-center">
                  <button
                    onClick={() => handleEdit(asset)}
                    className="p-3 rounded-xl bg-white/5 text-slate-300 hover:bg-violet-500/20 hover:text-violet-300 border border-white/10 transition-all hover:scale-105"
                    title="Editar"
                    disabled={isEditing}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Excluir ${asset.name}?`))
                        removeAsset(asset.id);
                    }}
                    className="p-3 rounded-xl bg-white/5 text-slate-300 hover:bg-red-500/20 hover:text-red-300 border border-white/10 transition-all hover:scale-105"
                    title="Excluir"
                  >
                    <Trash2 size={20} />
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

export default ManageAssets;
