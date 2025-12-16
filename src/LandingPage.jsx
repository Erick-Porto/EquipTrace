import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Shield,
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import logo from "./assets/image_0.png";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden text-white selection:bg-violet-500/30">
      {/* Background Decorativo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      </div>

      <header className="p-6 md:p-10 flex justify-between items-center max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold tracking-tighter">
            Equip
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Trace
            </span>
          </h1>
        </div>
        <Link
          to="/login"
          className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition font-medium text-sm backdrop-blur-md"
        >
          Área do Cliente
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-slate-300 uppercase tracking-widest">
            Sistema Operacional v1.0
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
          O controle total dos seus <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
            ativos em tempo real.
          </span>
        </h2>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Elimine perdas e aumente a produtividade. A plataforma definitiva para
          rastreamento de ferramentas, veículos e equipamentos IoT.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/login"
            className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4"
          >
            Acessar Plataforma <ArrowRight size={20} />
          </Link>
          <Link
            to="https://github.com/erick-porto/EquipTrace.git"
            className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-bold transition flex items-center justify-center gap-2 backdrop-blur-md"
            target="_blank"
          >
            Ver Documentação
          </Link>
        </div>

        {/* Cards de Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-6xl w-full text-left">
          {[
            {
              icon: MapPin,
              title: "Rastreio Preciso",
              desc: "Localização exata via GPS e LoRaWAN com histórico de rotas.",
            },
            {
              icon: Shield,
              title: "Segurança Total",
              desc: "Criptografia de ponta a ponta e controle de acesso hierárquico.",
            },
            {
              icon: Smartphone,
              title: "Gestão Mobile",
              desc: "Controle sua operação de qualquer lugar com nossa interface responsiva.",
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl group">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="p-8 text-center text-slate-600 border-t border-white/5 relative z-10 backdrop-blur-sm bg-black/20">
        <p>© 2025 EquipTrace System. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
