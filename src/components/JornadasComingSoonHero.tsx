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
  phoneNumber = "+584123565012"
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
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/15 bg-[#050608] shadow-[0_20px_70px_rgba(0,0,0,0.9)] my-6">
      {/* Fondo: Deportivo rojo iluminando en la oscuridad */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[720px] flex flex-col justify-between p-6 sm:p-10 z-10">
        
        {/* Imagen de fondo con faros encendidos */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat pointer-events-none opacity-90 transition-all duration-700"
          style={{ backgroundImage: "url('/assets/coming_soon_car_clean.webp')" }}
        />

        {/* Gradientes de contraste cinemático */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

        {/* ==================== ZONA SUPERIOR: LOGO Y BADGE ==================== */}
        <div className="relative z-20 flex flex-col items-center text-center space-y-3 pt-2">
          {/* Logo MasterTech */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <img src="/logo.png" alt="Taller MasterTech" className="h-6 w-auto object-contain" />
            <span className="text-[11px] font-black tracking-widest text-[#D4AF37] uppercase font-mono">
              MASTERTECH C.A.
            </span>
          </div>

          {/* Badge de Temporada */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black tracking-widest uppercase shadow-lg shadow-red-950/50">
            <Flame size={14} className="animate-pulse text-red-500" />
            <span>{jornada.season || 'EDICIÓN ESPECIAL LIMITADA'}</span>
          </div>
        </div>

        {/* ==================== ZONA CENTRAL: COMING SOON + MES VARIABLE ==================== */}
        <div className="relative z-20 flex flex-col items-center text-center space-y-3 my-auto py-8">
          {/* Texto Principal COMING SOON con efecto metálico iluminado */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_10px_25px_rgba(255,255,255,0.25)] select-none">
            {jornada.comingSoonTitle || 'COMING SOON'}
          </h2>

          {/* Mes o Temporada Dinámica */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <h3 className="text-xl sm:text-3xl md:text-4xl font-display font-black tracking-widest uppercase text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
              {displayMonthOrSeason}
            </h3>
            <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          {/* Título de la jornada a develar */}
          <p className="text-xs sm:text-sm md:text-base font-bold text-slate-200 max-w-xl mx-auto leading-relaxed drop-shadow-md px-4">
            {jornada.title}
          </p>

          <p className="text-[11px] sm:text-xs text-zinc-400 max-w-md mx-auto">
            {jornada.comingSoonSubtitle || 'Estamos preparando cupos estrictamente limitados y paquetes de optimización al más alto nivel.'}
          </p>
        </div>

        {/* ==================== ZONA INFERIOR: COUNTDOWN + BOTÓN LISTA VIP ==================== */}
        <div className="relative z-20 flex flex-col items-center space-y-5 pb-2">
          {/* Contador Regresivo */}
          <div className="flex items-center gap-2 sm:gap-3 bg-black/75 backdrop-blur-md px-4 sm:px-6 py-2.5 rounded-2xl border border-white/15 shadow-xl">
            {[
              { val: timeLeft.days, label: 'DÍAS' },
              { val: timeLeft.hours, label: 'HORAS' },
              { val: timeLeft.mins, label: 'MIN' },
              { val: timeLeft.secs, label: 'SEG' }
            ].map((unit, idx) => (
              <React.Fragment key={idx}>
                <div className="text-center min-w-[48px] sm:min-w-[58px]">
                  <span className="text-xl sm:text-3xl font-display font-black text-white block leading-none font-mono">
                    {String(unit.val).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                    {unit.label}
                  </span>
                </div>
                {idx < 3 && <span className="text-amber-400 font-black text-lg sm:text-2xl opacity-70">:</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Botón Lista de Espera */}
          <button
            type="button"
            onClick={handleWaitlistClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_35px_rgba(220,38,38,0.5)] transition-all cursor-pointer hover:scale-105 border border-red-400/40"
          >
            <WhatsAppIcon size={18} className="text-white fill-current shrink-0" />
            <span>UNIRME A LA LISTA DE ESPERA VIP</span>
            <ChevronRight size={16} />
          </button>

          <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Acceso anticipado a cupos con tarifa preferencial MasterTech</span>
          </span>
        </div>
      </div>
    </div>
  );
}
