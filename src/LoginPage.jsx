import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import logo from "./assets/image_0.png"; // Importe a imagem do logo

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (email === "admin@equiptrace.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      setError("Credenciais inválidas. Tente admin@equiptrace.com / 123456");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="EquipTrace Logo"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">
            Acesso Restrito
          </h1>
          <p className="text-slate-400 text-sm">
            Painel Administrativo EquipTrace
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
            <ShieldAlert size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              E-mail Corporativo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-accent outline-none transition"
              placeholder="ex: admin@equiptrace.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-accent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-secondary hover:bg-purple-primary text-white font-bold py-3 rounded-lg transition shadow-lg shadow-purple-900/20 mt-4"
          >
            Entrar no Sistema
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-600">
            Esqueceu a senha? Contate o suporte técnico.
            <br />
            (Dica Demo: admin@equiptrace.com / 123456)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
