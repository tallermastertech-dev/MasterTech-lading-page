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
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0c0e14] via-[#07080a] to-[#040507] shadow-[0_25px_80px_rgba(0,0,0,0.95)] my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[500px] lg:min-h-[540px]">
        {/* COLUMNA IZQUIERDA (7 cols): Contenido textual, cuenta regresiva y botón 100% legibles */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center items-start text-left space-y-4 z-20">
          {/* Logo MasterTech & Badge de Temporada */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-md">
            <img src="/logo.png" alt="Taller MasterTech" className="h-5 w-auto object-contain" />
            <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#D4AF37] uppercase font-mono">
              MASTERTECH C.A.
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase text-red-400">
              {jornada.season || 'EDICIÓN ESPECIAL'}
            </span>
          </div>

          {/* Titular Principal COMING SOON + Mes */}
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_4px_15px_rgba(255,255,255,0.25)] select-none leading-none">
              {jornada.comingSoonTitle || 'COMING SOON'}
            </h2>
            <div className="flex items-center gap-3 pt-1">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black tracking-widest uppercase text-[#D4AF37] drop-shadow-[0_2px_8px_rgba(212,175,55,0.45)]">
                {displayMonthOrSeason}
              </h3>
              <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </div>
          </div>

          {/* Título y Subtítulo de la Jornada */}
          <div className="space-y-1">
            <p className="text-sm sm:text-base font-bold text-white leading-snug">
              {jornada.title}
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
              {jornada.comingSoonSubtitle || 'La mayor jornada de alto rendimiento automotriz está por abrir cupos en Isla de Margarita. Regístrate en la lista de espera prioritaria antes del lanzamiento oficial.'}
            </p>
          </div>

          {/* Contador Regresivo con cajas individuales de alto contraste */}
          <div className="pt-2 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
              Tiempo para apertura de cupos:
            </span>
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-black/80 backdrop-blur-md px-4 sm:px-5 py-2.5 rounded-2xl border border-white/15 shadow-xl">
              {[
                { val: timeLeft.days, label: 'DÍAS' },
                { val: timeLeft.hours, label: 'HORAS' },
                { val: timeLeft.mins, label: 'MIN' },
                { val: timeLeft.secs, label: 'SEG' }
              ].map((unit, idx) => (
                <React.Fragment key={idx}>
                  <div className="text-center min-w-[42px] sm:min-w-[50px]">
                    <span className="text-xl sm:text-2xl font-display font-black text-white block leading-none font-mono">
                      {String(unit.val).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mt-1">
                      {unit.label}
                    </span>
                  </div>
                  {idx < 3 && <span className="text-amber-400 font-bold text-base sm:text-lg opacity-70">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Botón VIP Lista de Espera */}
          <div className="pt-2 w-full sm:w-auto space-y-2">
            <button
              type="button"
              onClick={handleWaitlistClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(220,38,38,0.5)] transition-all cursor-pointer hover:scale-105 border border-red-400/40"
            >
              <WhatsAppIcon size={16} className="text-white fill-current shrink-0" />
              <span>UNIRME A LA LISTA DE ESPERA VIP</span>
              <ChevronRight size={15} />
            </button>

            <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1.5 pt-1">
              <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
              <span>Acceso anticipado a cupos con tarifa preferencial MasterTech</span>
            </span>
          </div>
        </div>

        {/* COLUMNA DERECHA (5 cols): El deportivo rojo con sus faros, completamente libre de textos */}
        <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] lg:h-full min-h-[420px] lg:min-h-[540px] flex items-end justify-center overflow-hidden">
          {/* Imagen del auto y faros sin ningún texto ni botón que la tape */}
          <img
            src="/assets/coming_soon_car_clean.webp"
            alt="Próxima Jornada MasterTech"
            className="w-full h-full object-cover object-bottom pointer-events-none select-none transition-transform duration-700 hover:scale-105"
          />
          {/* Difuminado sutil en el borde izquierdo para integrarse con la columna de texto en desktop */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07080a] to-transparent pointer-events-none" />
          {/* Difuminado sutil en el borde superior en móvil */}
          <div className="lg:hidden absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07080a] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
