import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sparkles, 
  Flame, 
  Calendar, 
  Car, 
  Award, 
  History, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JornadaItemState {
  id: string;
  badge?: string;
  title: string;
  subtitle?: string;
  status?: 'active' | 'coming_soon' | 'completed';
  season?: string;
  targetMonth?: string;
  comingSoonTitle?: string;
  comingSoonSubtitle?: string;
  countdownEnd?: string;
  jornadaEnd?: string;
  vehiculosAtendidos?: number | string;
  fechaRealizacion?: string;
  regularPrice?: string;
  promoPrice?: string;
  discountBadge?: string;
  duration?: string;
  benefits?: string[];
  specs?: { label: string; val: string }[];
  compatibleModels?: string;
  img?: string;
  packages?: any[];
}

interface JornadasComingSoonHeroProps {
  jornada: JornadaItemState;
  whatsappLink?: string;
  phoneNumber?: string;
  onCountdownComplete?: () => void;
}

const MONTHS_LIST = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
];

export const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

export default function JornadasComingSoonHero({
  jornada,
  whatsappLink = "https://wa.link/xnj37f",
  phoneNumber = "+584123565012",
  onCountdownComplete
}: JornadasComingSoonHeroProps) {
  // Cuenta regresiva
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number }>({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0
  });

  const targetDateStr = jornada.countdownEnd || '';

  useEffect(() => {
    const calculateCountdown = () => {
      let target: Date;
      if (targetDateStr) {
        target = new Date(targetDateStr);
      } else {
        // Fallback: 10 días a partir de hoy
        target = new Date();
        target.setDate(target.getDate() + 10);
        target.setHours(20, 0, 0, 0);
      }

      const diff = target.getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        if (targetDateStr && onCountdownComplete) {
          onCountdownComplete();
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, mins, secs });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // Texto del mes o temporada
  const displayMonthOrSeason = (jornada.targetMonth || jornada.season || 'PRÓXIMO MES').toUpperCase();

  const handleWaitlistClick = () => {
    const msg = `*HOLA MASTERTECH, DESEO ENTRAR EN LA LISTA VIP DE ESPERA*\n\n*Jornada de Temporada:* ${jornada.title}\n*Temporada / Mes:* ${displayMonthOrSeason}\n\nDeseo recibir acceso prioritario y la notificacion de apertura de cupos antes de que se agoten.`;
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    let url = "";
    if (whatsappLink.includes('wa.me') || whatsappLink.includes('api.whatsapp.com')) {
      url = `${whatsappLink}?text=${encodeURIComponent(msg)}`;
    } else {
      url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full max-w-xl sm:max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/15 bg-[#07080a] shadow-[0_25px_80px_rgba(0,0,0,0.95)] my-6 aspect-[720/1024]">
      {/* Fondo: Deportivo rojo iluminando en la oscuridad - 100% visible sin oscurecimiento */}
      <img
        src="/assets/coming_soon_car_clean.webp"
        alt="Próxima Jornada MasterTech"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none"
      />

      {/* Zona Superior de Contenido: El texto se ubica arriba en la atmósfera oscura, dejando el capó y faros completamente libres */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-8 pt-6 sm:pt-10 space-y-2.5 sm:space-y-3.5 max-w-lg mx-auto">
        {/* Logo MasterTech & Badge de Temporada */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
          <img src="/logo.png" alt="Taller MasterTech" className="h-5 w-auto object-contain" />
          <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#D4AF37] uppercase font-mono">
            MASTERTECH C.A.
          </span>
          <span className="text-zinc-500">•</span>
          <span className="text-[10px] sm:text-[11px] font-black uppercase text-red-400">
            {jornada.season || 'EDICIÓN ESPECIAL'}
          </span>
        </div>

        {/* Titular Principal COMING SOON con efecto metálico */}
        <div className="space-y-0.5 sm:space-y-1 pt-1">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_8px_25px_rgba(255,255,255,0.3)] select-none">
            {jornada.comingSoonTitle || 'COMING SOON'}
          </h2>

          {/* Mes Variable */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="h-[1.5px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-black tracking-widest uppercase text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.45)]">
              {displayMonthOrSeason}
            </h3>
            <span className="h-[1.5px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {/* Mensaje de Misterio / Subtítulo */}
        <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-zinc-300 max-w-md mx-auto leading-snug drop-shadow-md px-2">
          {jornada.comingSoonSubtitle || 'La mayor jornada de alto rendimiento automotriz está por comenzar en Isla de Margarita.'}
        </p>

        {/* Contador Regresivo Compacto Horizontal */}
        <div className="pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-3 bg-black/75 backdrop-blur-md px-3 sm:px-5 py-2 rounded-2xl border border-white/15 shadow-xl">
            {[
              { val: timeLeft.days, label: 'DÍAS' },
              { val: timeLeft.hours, label: 'HORAS' },
              { val: timeLeft.mins, label: 'MIN' },
              { val: timeLeft.secs, label: 'SEG' }
            ].map((unit, idx) => (
              <React.Fragment key={idx}>
                <div className="text-center min-w-[34px] sm:min-w-[46px]">
                  <span className="text-base sm:text-2xl font-display font-black text-white block leading-none font-mono">
                    {String(unit.val).padStart(2, '0')}
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                    {unit.label}
                  </span>
                </div>
                {idx < 3 && <span className="text-amber-400 font-bold text-sm sm:text-lg opacity-70">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Botón Lista de Espera VIP */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleWaitlistClick}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(220,38,38,0.5)] transition-all cursor-pointer hover:scale-105 border border-red-400/40"
          >
            <WhatsAppIcon size={16} className="text-white fill-current shrink-0" />
            <span>UNIRME A LA LISTA DE ESPERA VIP</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <span className="text-[9px] sm:text-[10px] text-zinc-400 font-semibold flex items-center justify-center gap-1.5 pt-0.5">
          <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
          <span>Acceso anticipado a cupos con tarifa preferencial MasterTech</span>
        </span>
      </div>
    </div>
  );
}
