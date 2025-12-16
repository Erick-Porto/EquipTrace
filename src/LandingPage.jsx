import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Shield, Smartphone } from "lucide-react";
import logo from "./assets/image_0.png"; // Importe a imagem do logo

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <img src={logo} alt="EquipTrace Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-white tracking-tighter">
            Equip<span className="text-purple-accent">Trace</span>
          </h1>
        </div>
        <Link
          to="/login"
          className="px-6 py-2 bg-purple-secondary hover:bg-purple-primary rounded-full font-medium transition text-white shadow-lg shadow-purple-900/20"
        >
          Acessar Plataforma
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text leading-tight">
          Rastreamento Inteligente de Equipamentos.
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mb-10">
          Monitore seus ativos em tempo real com a tecnologia EquipTrace.
          Segurança, precisão e autonomia em uma única plataforma unificada.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-8 py-4 bg-white text-purple-primary font-bold rounded-lg hover:bg-gray-100 transition shadow-lg"
          >
            Começar Agora
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl w-full">
          <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition">
            <MapPin className="w-12 h-12 text-purple-accent mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-white">
              Localização Precisa
            </h3>
            <p className="text-slate-400">
              Integração via API para dados de GPS e LoRaWAN em tempo real.
            </p>
          </div>
          <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition">
            <Shield className="w-12 h-12 text-purple-accent mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-white">
              Segurança Total
            </h3>
            <p className="text-slate-400">
              Dados criptografados e acesso restrito aos seus dispositivos.
            </p>
          </div>
          <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition">
            <Smartphone className="w-12 h-12 text-purple-accent mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-white">Gestão Mobile</h3>
            <p className="text-slate-400">
              Controle total da sua frota pelo nosso painel responsivo.
            </p>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-slate-600 border-t border-slate-800/50">
        © 2025 EquipTrace System. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default LandingPage;
