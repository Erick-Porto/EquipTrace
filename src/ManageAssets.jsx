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
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Ativos Monitorados
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Gerencie a frota e vincule os rastreadores do estoque.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* FORMULÁRIO */}
        <div className="lg:col-span-1">
          <div
            className={`rounded-xl p-5 md:p-6 border sticky top-4 transition-colors ${
              editingId
                ? "bg-blue-900/20 border-blue-500/50"
                : "bg-slate-800 border-slate-700"
            }`}
          >
            <h2 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
              {editingId ? (
                <>
                  <Edit size={20} className="text-blue-400" /> Editar Ativo
                </>
              ) : (
                <>
                  <Truck size={20} className="text-blue-500" /> Novo Ativo
                </>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Nome do Ativo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2.5 text-white outline-none focus:border-blue-500 transition mt-1"
                  placeholder="Ex: Carro 01"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2.5 text-white outline-none focus:border-blue-500 transition mt-1"
                >
                  {assetTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <LinkIcon size={12} /> Hardware Vinculado
                </label>
                <select
                  value={formData.linkedHardwareId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      linkedHardwareId: e.target.value,
                    })
                  }
                  className={`w-full bg-slate-900 border rounded px-3 py-2.5 text-white outline-none focus:border-blue-500 transition mt-1 ${
                    formData.linkedHardwareId
                      ? "border-green-500/50 text-green-300"
                      : "border-slate-600"
                  }`}
                >
                  <option value="">-- Nenhum --</option>
                  {availableHardwares.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.model} — {h.serial}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Responsável
                </label>
                <select
                  value={formData.assignedUserId}
                  onChange={(e) =>
                    setFormData({ ...formData, assignedUserId: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2.5 text-white outline-none focus:border-blue-500 transition mt-1"
                >
                  <option value="">-- Ninguém --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded transition flex justify-center items-center gap-2"
                  >
                    <X size={18} /> Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className={`flex-1 font-bold py-3 rounded transition flex justify-center items-center gap-2 shadow-lg ${
                    editingId
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {editingId ? (
                    <>
                      <Save size={18} /> Salvar
                    </>
                  ) : (
                    <>
                      <Plus size={18} /> Criar Ativo
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* LISTA */}
        <div className="lg:col-span-2 space-y-3">
          {assets.map((asset) => {
            const hw = hardwares.find((h) => h.id === asset.linkedHardwareId);
            const user = users.find((u) => u.id == asset.assignedUserId);
            const typeObj = assetTypes.find((t) => t.id === asset.type);
            const Icon = iconMap[typeObj?.iconKey] || iconMap["Box"];
            const isEditing = editingId === asset.id;

            return (
              <div
                key={asset.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                  isEditing
                    ? "bg-blue-900/10 border-blue-500/50"
                    : "bg-slate-800 border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isEditing
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-slate-700 text-blue-400"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 truncate">
                      {asset.name}{" "}
                      {isEditing && (
                        <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded">
                          EDITANDO
                        </span>
                      )}
                    </h3>
                    <div className="text-sm text-slate-400 flex flex-col gap-1 mt-1">
                      <span className="flex items-center gap-1.5 truncate">
                        <Cpu
                          size={14}
                          className={hw ? "text-green-400" : "text-red-400"}
                        />{" "}
                        {hw ? (
                          <span className="text-slate-300 truncate">
                            {hw.model}{" "}
                            <span className="text-slate-500 font-mono text-xs">
                              ({hw.serial})
                            </span>
                          </span>
                        ) : (
                          "Sem hardware vinculado"
                        )}
                      </span>
                      {user && (
                        <span className="flex items-center gap-1.5 truncate">
                          <User size={14} /> Resp: {user.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleEdit(asset)}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded transition"
                    disabled={isEditing}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Excluir ${asset.name}?`))
                        removeAsset(asset.id);
                    }}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
          {assets.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
              Nenhum ativo cadastrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAssets;
