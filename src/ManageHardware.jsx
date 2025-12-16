import React, { useState } from "react";
import { useTrackerContext } from "./context/TrackerContext";
import { Cpu, Plus, Trash2, Edit, Save, X, Box, Link2 } from "lucide-react";

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
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Inventário de Hardware
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Cadastro técnico e manutenção (Estoque).
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
                  <Edit size={20} className="text-blue-400" /> Editar Hardware
                </>
              ) : (
                <>
                  <Cpu size={20} className="text-blue-500" /> Adicionar Hardware
                </>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Modelo
                </label>
                <select
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2.5 text-white outline-none focus:border-blue-500 transition mt-1"
                >
                  <option>SenseCAP T1000</option>
                  <option>Macaron F08-AZ</option>
                  <option>Dragino LGT-92</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={formData.serial}
                  onChange={(e) =>
                    setFormData({ ...formData, serial: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2.5 text-white outline-none font-mono focus:border-blue-500 transition mt-1"
                  placeholder="SN-123456"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Chave API
                </label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) =>
                    setFormData({ ...formData, key: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2.5 text-white outline-none font-mono focus:border-blue-500 transition mt-1"
                  placeholder="Key..."
                />
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
                      <Plus size={18} /> Cadastrar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* LISTA */}
        <div className="lg:col-span-2 space-y-3">
          {hardwares.map((hw) => {
            const linkedAsset = getLinkedAsset(hw.id);
            const isEditing = editingId === hw.id;

            return (
              <div
                key={hw.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                  isEditing
                    ? "bg-blue-900/10 border-blue-500/50"
                    : "bg-slate-800 border-slate-700 hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold">{hw.model}</h3>
                    <span className="text-slate-500 text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {hw.serial}
                    </span>
                    {isEditing && (
                      <span className="text-[10px] text-blue-400 font-bold px-2 animate-pulse">
                        EDITANDO
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-sm">
                    {linkedAsset ? (
                      <span className="text-green-400 flex items-center gap-1">
                        <Link2 size={14} /> Vinculado: <b>{linkedAsset.name}</b>
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Box size={14} /> Disponível em Estoque
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleEdit(hw)}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded transition"
                    disabled={isEditing}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Excluir hardware?"))
                        removeHardware(hw.id);
                    }}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
          {hardwares.length === 0 && (
            <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
              Estoque vazio.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageHardware;
