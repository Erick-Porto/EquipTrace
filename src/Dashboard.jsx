import React from "react";
import { Link } from "react-router-dom";
import {
  Battery,
  Link as LinkIcon,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { useTrackerContext } from "./context/TrackerContext";
import { iconMap } from "./utils/iconMap";

const Dashboard = () => {
  const { assets, hardwares, assetTypes } = useTrackerContext();

  const getIcon = (typeId) => {
    const type = assetTypes.find((t) => t.id === typeId);
    const Icon = iconMap[type?.iconKey] || iconMap["Box"];
    return <Icon className="text-white" />;
  };

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
      {/* Header Moderno */}
      <header className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Painel de Controle
          </h1>
          <p className="text-slate-400 text-lg">
            Monitoramento em tempo real de{" "}
            <span className="text-white font-semibold">
              {assets.length} ativos
            </span>{" "}
            conectados.
          </p>
        </div>
        <Link
          to="/manage-assets"
          className="btn-primary flex items-center gap-2"
        >
          Gerenciar Frota <ArrowRight size={18} />
        </Link>
      </header>

      {/* Grid de Cards Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assets.map((asset) => {
          const hardware = hardwares.find(
            (h) => h.id === asset.linkedHardwareId
          );

          return (
            // Uso da classe glass-card definida no CSS
            <div
              key={asset.id}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              {/* Efeito de Glow no Hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-violet-500/20"></div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center shadow-lg">
                  {getIcon(asset.type)}
                </div>

                {hardware ? (
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border shadow-sm ${
                      hardware.battery < 20
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {hardware.battery < 20 ? "Bateria Baixa" : "Monitorado"}
                  </div>
                ) : (
                  <div className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border bg-slate-700/30 text-slate-400 border-slate-600/30">
                    Offline
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-1 truncate">
                {asset.name}
              </h3>

              {hardware ? (
                <>
                  <p className="text-sm text-slate-400 mb-6 flex items-center gap-2">
                    <LinkIcon size={14} className="text-violet-400" />
                    <span className="font-mono text-xs opacity-70">
                      {hardware.model}
                    </span>
                  </p>

                  {/* Barra de Status Minimalista */}
                  <div className="flex items-center gap-4 text-sm mb-6 bg-slate-950/30 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                      <Battery
                        size={16}
                        className={
                          hardware.battery < 20
                            ? "text-red-400"
                            : "text-emerald-400"
                        }
                      />
                      <span className="font-semibold text-white">
                        {hardware.battery}%
                      </span>
                    </div>
                    <div className="w-px h-4 bg-white/10"></div>
                    <span className="text-slate-400 text-xs truncate">
                      Visto: {hardware.lastSeen}
                    </span>
                  </div>

                  <Link
                    to={`/monitor/${asset.id}`}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 text-white font-medium text-sm transition-all flex justify-center items-center gap-2 group-hover:shadow-lg"
                  >
                    Rastrear no Mapa
                  </Link>
                </>
              ) : (
                <div className="mt-4 mb-2 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 text-sm flex items-center gap-3">
                  <AlertTriangle size={18} />
                  <span>Sem vínculo de hardware.</span>
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
