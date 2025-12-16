import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "./context/TrackerContext";
import { iconMap, availableIcons } from "./utils/iconMap";
import { ArrowLeft, Trash2, Plus } from "lucide-react";

const ManageAssetTypes = () => {
  const navigate = useNavigate();
  const { assetTypes, addAssetType, removeAssetType } = useTrackerContext();

  // State local para o formulário de novo tipo
  const [newLabel, setNewLabel] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Box");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    addAssetType(newLabel, selectedIcon);
    setNewLabel(""); // Limpa input
    alert("Tipo adicionado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition"
          >
            <ArrowLeft />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Gerenciar Tipos de Ativos
            </h1>
            <p className="text-slate-400">
              Crie categorias personalizadas para seus rastreadores
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Coluna 1: Lista Atual */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Tipos Cadastrados
            </h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {assetTypes.map((type) => {
                const IconComponent = iconMap[type.iconKey] || iconMap["Box"];
                return (
                  <div
                    key={type.id}
                    className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-700 group hover:border-slate-600 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-800 rounded-lg text-blue-400 border border-slate-700">
                        <IconComponent size={20} />
                      </div>
                      <span className="text-white font-medium">
                        {type.label}
                      </span>
                    </div>
                    <button
                      onClick={() => removeAssetType(type.id)}
                      className="text-slate-600 hover:text-red-500 hover:bg-red-500/10 transition p-2 rounded"
                      title="Excluir Tipo"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coluna 2: Criar Novo */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-fit sticky top-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Criar Novo Tipo
            </h2>
            <form onSubmit={handleAdd}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Nome do Tipo (Ex: Moto, Notebook)
                </label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Digite o nome..."
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Escolha um Ícone
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-60 overflow-y-auto p-3 bg-slate-900 rounded-lg border border-slate-600">
                  {availableIcons.map((iconKey) => {
                    const IconComp = iconMap[iconKey];
                    const isSelected = selectedIcon === iconKey;
                    return (
                      <button
                        key={iconKey}
                        type="button"
                        onClick={() => setSelectedIcon(iconKey)}
                        className={`p-2 rounded-lg flex justify-center items-center transition aspect-square ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900"
                            : "text-slate-400 hover:bg-slate-700 hover:text-white"
                        }`}
                        title={iconKey}
                      >
                        <IconComp size={24} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                <Plus size={20} /> Cadastrar Tipo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAssetTypes;
