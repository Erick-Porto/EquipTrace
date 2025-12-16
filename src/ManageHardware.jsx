import React, { useState } from "react";
import { useTrackerContext } from "./context/TrackerContext";
import { Cpu, Plus, Trash2, Edit, Link2, Box } from "lucide-react";

const ManageHardware = () => {
  const { hardwares, addHardware, updateHardware, removeHardware, assets } =
    useTrackerContext();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    model: "SenseCAP T1000",
    serial: "",
    key: "",
  });

  const handleEdit = (hw) => {
    setEditingId(hw.id);
    setFormData({ model: hw.model, serial: hw.serial, key: hw.key });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ model: "SenseCAP T1000", serial: "", key: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.serial) return alert("Informe o Serial Number");
    editingId ? updateHardware(editingId, formData) : addHardware(formData);
    handleCancel();
  };

  const getLinkedAsset = (hwId) =>
    assets.find((a) => a.linkedHardwareId === hwId);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          Inventário de Hardware
        </h1>
        <p className="text-slate-400">
          Controle de estoque dos dispositivos IoT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div
            className={`glass-panel p-6 rounded-2xl sticky top-6 ${
              editingId ? "border-violet-500/50" : ""
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
                {editingId ? <Edit size={20} /> : <Cpu size={20} />}
              </div>
              {editingId ? "Editar Hardware" : "Adicionar Hardware"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Modelo
                </label>
                <select
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="input-modern mt-2 appearance-none"
                >
                  <option className="bg-slate-900">SenseCAP T1000</option>
                  <option className="bg-slate-900">Macaron F08-AZ</option>
                  <option className="bg-slate-900">Dragino LGT-92</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={formData.serial}
                  onChange={(e) =>
                    setFormData({ ...formData, serial: e.target.value })
                  }
                  className="input-modern mt-2 font-mono"
                  placeholder="SN-123456"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Chave API
                </label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) =>
                    setFormData({ ...formData, key: e.target.value })
                  }
                  className="input-modern mt-2 font-mono"
                  placeholder="Key..."
                />
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

        {/* LISTA DE HARDWARE */}
        <div className="lg:col-span-2 space-y-4">
          {hardwares.map((hw) => {
            const linkedAsset = getLinkedAsset(hw.id);
            const isEditing = editingId === hw.id;

            return (
              <div
                key={hw.id}
                className={`glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                  isEditing ? "border-violet-500/50 bg-violet-500/5" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{hw.model}</h3>
                    <span className="text-slate-500 text-xs font-mono bg-black/30 px-2 py-1 rounded border border-white/5">
                      {hw.serial}
                    </span>
                  </div>
                  <div className="mt-3 text-sm">
                    {linkedAsset ? (
                      <span className="text-emerald-400 flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit border border-emerald-500/20">
                        <Link2 size={14} /> Vinculado: <b>{linkedAsset.name}</b>
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg w-fit">
                        <Box size={14} /> Disponível em Estoque
                      </span>
                    )}
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO RESTAURADOS */}
                <div className="flex gap-3 self-end sm:self-center">
                  <button
                    onClick={() => handleEdit(hw)}
                    className="p-3 rounded-xl bg-white/5 text-slate-300 hover:bg-violet-500/20 hover:text-violet-300 border border-white/10 transition-all hover:scale-105"
                    disabled={isEditing}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Excluir hardware?"))
                        removeHardware(hw.id);
                    }}
                    className="p-3 rounded-xl bg-white/5 text-slate-300 hover:bg-red-500/20 hover:text-red-300 border border-white/10 transition-all hover:scale-105"
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

export default ManageHardware;
