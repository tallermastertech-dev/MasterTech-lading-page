import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, KeyRound, ArrowLeft, ArrowRight, Eye, EyeOff, ShieldCheck, HelpCircle } from 'lucide-react';
import Catalogo from './Catalogo';

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

const VALID_KEYS = [
  'mastertech',
  'mastertech2026',
  'taller',
  'admin',
  '6301',
  'privado',
  'master',
];

export default function PrivateCatalogoGuard() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    
    // Check URL search parameters
    const params = new URLSearchParams(window.location.search);
    const accessKey = params.get('access') || params.get('clave') || params.get('key') || params.get('token');
    if (accessKey && VALID_KEYS.includes(accessKey.trim().toLowerCase())) {
      localStorage.setItem('mastertech_catalogo_private_access', 'true');
      return true;
    }

    // Check localStorage authorization
    if (localStorage.getItem('mastertech_catalogo_private_access') === 'true') {
      return true;
    }

    // Check if user has an active Supabase session in localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('sb-') && k.endsWith('-auth-token')) {
          const val = localStorage.getItem(k);
          if (val && val.includes('access_token')) {
            return true;
          }
        }
      }
    } catch {
      // Ignore storage read errors
    }

    return false;
  });

  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputKey.trim().toLowerCase();
    if (VALID_KEYS.includes(clean)) {
      localStorage.setItem('mastertech_catalogo_private_access', 'true');
      setIsAuthorized(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Clave de acceso no válida. Ingrese la clave asignada por el equipo técnico.');
    }
  };

  const handleLockAgain = () => {
    localStorage.removeItem('mastertech_catalogo_private_access');
    setIsAuthorized(false);
  };

  if (isAuthorized) {
    return (
      <div className="relative">
        {/* Floating pill for internal testing notice */}
        <div className="fixed bottom-4 left-4 z-[9999] bg-[#12141a]/95 text-white border border-amber-500/40 rounded-full px-4 py-2 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold text-amber-300">Catálogo en Modo Privado (Pruebas Internas)</span>
          </div>
          <button
            onClick={handleLockAgain}
            className="text-[11px] bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            Bloquear acceso
          </button>
        </div>
        <Catalogo />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[450px] bg-amber-500/5 rounded-full blur-[130px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <a href="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="Taller MasterTech" 
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-wider uppercase text-white group-hover:text-red-400 transition-colors">
              MASTERTECH
            </span>
            <span className="text-[10px] text-zinc-400 tracking-widest font-semibold uppercase">
              Taller Mecánico Especializado
            </span>
          </div>
        </a>

        <a 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-all"
        >
          <ArrowLeft size={14} />
          <span>Volver al Inicio</span>
        </a>
      </header>

      {/* Main Lock Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#13161f]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle top accent gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

          {/* Lock Icon Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-amber-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-inner mb-4">
              <Lock size={28} className="text-red-400" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wider uppercase mb-2">
              <ShieldAlert size={12} />
              <span>Acceso Privado · En Preparación</span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Catálogo de Repuestos
            </h1>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              El catálogo digital se encuentra en calibración técnica e integración de inventario OEM para Isla de Margarita.
            </p>
          </div>

          {/* Form to enter technical PIN/key */}
          <form onSubmit={handleUnlock} className="space-y-4 mb-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center justify-between">
                <span>Clave de Acceso Técnico</span>
                <span className="text-[10px] text-zinc-500 font-normal lowercase">uso administrativo</span>
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={inputKey}
                  onChange={(e) => {
                    setInputKey(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Ingrese clave de acceso..."
                  className="w-full bg-[#0a0c10] border border-white/15 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all pr-10 font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errorMsg && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <span>{errorMsg}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound size={15} />
              <span>Desbloquear Catálogo</span>
            </button>
          </form>

          {/* Help / WhatsApp consultation alternative */}
          <div className="pt-5 border-t border-white/10 space-y-2.5">
            <p className="text-center text-[11px] text-zinc-400">
              ¿Necesitas cotizar repuestos, fluidos o importación de piezas?
            </p>

            <a
              href="https://wa.me/584123565012?text=Hola%20Taller%20MasterTech%2C%20deseo%20consultar%20disponibilidad%20y%20precio%20de%20repuestos."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <WhatsAppIcon size={16} />
              <span>Cotizar Directamente por WhatsApp</span>
            </a>

            <a
              href="/servicios"
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-white py-2 transition-colors"
            >
              <span>Ver nuestros servicios mecánicos disponibles</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 text-center text-[11px] text-zinc-500 border-t border-white/5">
        MasterTech Porlamar, Isla de Margarita · Especialistas en Jeep, Toyota y Multimarca.
      </footer>
    </div>
  );
}
