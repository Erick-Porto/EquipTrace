import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import {
  ArrowLeft,
  Navigation,
  Battery,
  Cpu,
  Activity,
  Clock,
  MapPin,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useTrackerContext } from "./context/TrackerContext";
import L from "leaflet";

// --- ÍCONES ---
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- ROTA PRÉ-DEFINIDA (VOLTA REDONDA) ---
// Simula um trajeto na Av. dos Trabalhadores / Vila Santa Cecília
const MOCK_ROUTE = [
  [-22.52002, -44.10698], // Ponto 1 (Início)
  [-22.5215, -44.1055], // Ponto 2 (Reta)
  [-22.5232, -44.1041], // Ponto 3 (Centro)
  [-22.5245, -44.1025], // Ponto 4 (Continuando)
  [-22.526, -44.101], // Ponto 5 (Fim da reta)
  [-22.525, -44.099], // Ponto 6 (Curva)
  [-22.52002, -44.10698], // Volta pro início (Loop)
];

// --- COMPONENTE DE MAPA ---
const MapController = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.panTo(position, { animate: true, duration: 1 });
  }, [position, map]);
  return null;
};

const Monitor = () => {
  const { id } = useParams();
  const { getAssetById, hardwares } = useTrackerContext();

  const asset = getAssetById(id);
  const hardware = asset
    ? hardwares.find((h) => h.id === asset.linkedHardwareId)
    : null;

  // --- ESTADOS DA ANIMAÇÃO ---
  const [position, setPosition] = useState(MOCK_ROUTE[0]);
  const [routeIndex, setRouteIndex] = useState(0); // Em qual trecho da rota estamos (0 a 6)
  const [progress, setProgress] = useState(0); // Porcentagem concluída do trecho (0.0 a 1.0)
  const [speed, setSpeed] = useState(45); // Começa com 45km/h

  // --- LÓGICA DE MOVIMENTO LINEAR (LERP) ---
  useEffect(() => {
    if (!hardware) return;

    // Atualiza a cada 50ms para ficar MUITO suave (20 frames por segundo)
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const step = 0.01; // Velocidade do movimento (aumente para ir mais rápido)
        const newProgress = prevProgress + step;

        // Se completou o trecho (chegou em 100%)
        if (newProgress >= 1) {
          // Muda para o próximo ponto da rota
          setRouteIndex(
            (prevIndex) => (prevIndex + 1) % (MOCK_ROUTE.length - 1)
          );
          return 0; // Reseta progresso para 0%
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [hardware]);

  // Calcula a posição exata baseada no progresso entre Ponto A e Ponto B
  useEffect(() => {
    const startPoint = MOCK_ROUTE[routeIndex];
    const endPoint = MOCK_ROUTE[(routeIndex + 1) % MOCK_ROUTE.length];

    if (!startPoint || !endPoint) return;

    // Matemática de Interpolação Linear
    const lat = startPoint[0] + (endPoint[0] - startPoint[0]) * progress;
    const lng = startPoint[1] + (endPoint[1] - startPoint[1]) * progress;

    setPosition([lat, lng]);

    // Simula variação de velocidade nas curvas (mero efeito visual)
    if (progress < 0.1 || progress > 0.9) setSpeed(30); // Reduz nas pontas
    else setSpeed(52); // Acelera no meio da reta
  }, [progress, routeIndex]);

  // --- RENDERIZAÇÃO ---
  if (!asset)
    return <div className="text-white p-10">Ativo não encontrado.</div>;
  if (!hardware)
    return <div className="text-white p-10">Sem hardware vinculado.</div>;

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col z-20 shadow-2xl h-full">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950">
          <Link
            to="/dashboard"
            className="flex items-center text-slate-400 hover:text-white mb-6 gap-2 transition text-sm"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
          <h1 className="text-2xl font-bold text-white truncate">
            {asset.name}
          </h1>
          <p className="text-blue-400 text-xs font-mono mt-1 flex items-center gap-1">
            <Cpu size={12} /> {hardware.model}
          </p>
        </div>

        {/* Info */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Status Grande */}
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse"></div>
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">
              Status Atual
            </span>
            <div className="text-2xl font-bold text-white mt-1 flex justify-center items-center gap-2">
              <Activity size={24} className="text-green-500" /> EM MOVIMENTO
            </div>
            <div className="mt-4 flex justify-around border-t border-slate-700 pt-4">
              <div>
                <span className="block text-xs text-slate-500">Velocidade</span>
                <span className="block text-xl font-bold text-white">
                  {speed} km/h
                </span>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Ignição</span>
                <span className="block text-xl font-bold text-green-400">
                  ON
                </span>
              </div>
            </div>
          </div>

          {/* Lista de Detalhes */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <Navigation size={16} /> Latitude
              </span>
              <span className="text-white font-mono text-xs">
                {position[0].toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <Navigation size={16} /> Longitude
              </span>
              <span className="text-white font-mono text-xs">
                {position[1].toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <Battery size={16} /> Bateria Tracker
              </span>
              <span className="text-green-400 font-bold">
                {hardware.battery}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <Clock size={16} /> Última Atualização
              </span>
              <span className="text-white text-xs">Agora (Tempo Real)</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAPA */}
      <div className="flex-1 relative h-full">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full bg-slate-900"
        >
          <TileLayer
            attribution="&copy; CartoDB"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <MapController position={position} />

          {/* Desenha a Rota Fixa no Mapa (Linha Cinza) */}
          <Polyline
            positions={MOCK_ROUTE}
            pathOptions={{ color: "#64748b", weight: 4, opacity: 0.3 }}
          />

          {/* Desenha o Rastro Percorrido (Linha Azul) */}
          {/* Truque visual: desenha linha do início até a posição atual */}
          <Polyline
            positions={[...MOCK_ROUTE.slice(0, routeIndex + 1), position]}
            pathOptions={{ color: "#3b82f6", weight: 4, opacity: 1 }}
          />

          <Marker position={position}>
            <Popup>
              <strong>{asset.name}</strong>
              <br />
              {speed} km/h
            </Popup>
          </Marker>
        </MapContainer>

        {/* Widget Flutuante */}
        <div className="absolute top-4 right-4 z-[1000] bg-slate-900/90 text-white px-4 py-2 rounded-lg border border-slate-700 shadow-xl text-sm flex items-center gap-3">
          <MapPin size={16} className="text-blue-500" />
          <span>
            Monitorando: <b>Volta Redonda, RJ</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
