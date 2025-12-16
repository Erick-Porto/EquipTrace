import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Mail, ArrowRight } from "lucide-react";
import logo from "./assets/image_0.png";

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
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden p-4">
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="w-full max-w-md glass-panel p-8 md:p-10 rounded-3xl relative z-10 shadow-2xl shadow-violet-900/20">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-slate-400">
            Insira suas credenciais para acessar.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl mb-6 text-sm flex items-center gap-3 animate-shake">
            <ShieldAlert size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              E-mail Corporativo
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition"
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-modern pl-12"
                placeholder="admin@equiptrace.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Senha
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition"
                size={18}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-modern pl-12"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
          >
            Entrar no Sistema <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Esqueceu a senha? Contate o suporte.
            <br />
            (Demo: admin@equiptrace.com / 123456)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
