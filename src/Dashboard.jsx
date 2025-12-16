import React from "react";
import { Link } from "react-router-dom";
import { Battery, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { useTrackerContext } from "./context/TrackerContext";
import { iconMap } from "./utils/iconMap";

const Dashboard = () => {
  const { assets, hardwares, assetTypes } = useTrackerContext();

  const getIcon = (typeId) => {
    const type = assetTypes.find((t) => t.id === typeId);
    const Icon = iconMap[type?.iconKey] || iconMap["Box"];
    return <Icon className="text-blue-400" />;
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Visão Geral
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Monitoramento em Tempo Real dos Ativos
          </p>
        </div>
        <Link
          to="/manage-assets"
          className="w-full md:w-auto text-center bg-blue-600 px-4 py-2.5 rounded-lg text-white font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-900/20"
        >
          Gerenciar Ativos
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {assets.map((asset) => {
          const hardware = hardwares.find(
            (h) => h.id === asset.linkedHardwareId
          );

          return (
            <div
              key={asset.id}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition group hover:shadow-xl hover:shadow-blue-900/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-700 p-3 rounded-lg border border-slate-600 group-hover:bg-slate-600 transition">
                  {getIcon(asset.type)}
                </div>
                {hardware ? (
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border ${
                      hardware.battery < 20
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-green-500/10 text-green-400 border-green-500/20"
                    }`}
                  >
                    Ativo
                  </div>
                ) : (
                  <div className="px-3 py-1 rounded-full text-[10px] uppercase font-bold border bg-slate-600/10 text-slate-400 border-slate-600/20">
                    Offline
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1 truncate">
                {asset.name}
              </h3>

              {hardware ? (
                <>
                  <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                    <LinkIcon size={12} /> {hardware.model}
                  </p>
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-6 bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                    <Battery
                      size={14}
                      className={
                        hardware.battery < 20
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    />
                    <span>{hardware.battery}%</span>
                    <span className="text-slate-600">|</span>
                    <span className="truncate">Visto: {hardware.lastSeen}</span>
                  </div>
                  <div className="grid grid-cols-1">
                    <Link
                      to={`/monitor/${asset.id}`}
                      className="flex justify-center items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-lg text-sm font-medium transition border border-slate-600 hover:border-slate-500"
                    >
                      Localizar no Mapa
                    </Link>
                  </div>
                </>
              ) : (
                <div className="mt-4 mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-xs flex items-center gap-2">
                  <AlertTriangle size={14} /> Sem rastreador vinculado.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
