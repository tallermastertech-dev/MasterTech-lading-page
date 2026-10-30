import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

interface JornadaComingSoonHeroProps {
  jornada: {
    id: string;
    title: string;
    subtitle?: string;
    season?: string;
    targetMonth?: string;
    comingSoonTitle?: string;
    comingSoonSubtitle?: string;
    countdownEnd?: string;
    promoPrice?: string;
  };
  whatsappLink: string;
  phoneNumber: string;
  onCountdownComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

export default function JornadasComingSoonHero({
  jornada,
  whatsappLink,
  phoneNumber,
  onCountdownComplete
}: JornadaComingSoonHeroProps) {
  // Calculamos la fecha objetivo del contador
  const getTargetDate = (): string => {
    if (jornada.countdownEnd) return jornada.countdownEnd;

    const monthMap: Record<string, number> = {
      ENERO: 0, FEBRERO: 1, MARZO: 2, ABRIL: 3, MAYO: 4, JUNIO: 5,
      JULIO: 6, AGOSTO: 7, SEPTIEMBRE: 8, OCTUBRE: 9, NOVIEMBRE: 10, DICIEMBRE: 11
    };

    const targetMonthStr = (jornada.targetMonth || '').toUpperCase().trim();
    const now = new Date();
    const currentYear = now.getFullYear();

    if (monthMap[targetMonthStr] !== undefined) {
      const monthIdx = monthMap[targetMonthStr];
      let targetYear = currentYear;
      if (monthIdx < now.getMonth()) {
        targetYear += 1;
      }
      const targetDate = new Date(targetYear, monthIdx, 20, 8, 0, 0);
      return targetDate.toISOString();
    }

    const defaultTarget = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    return defaultTarget.toISOString();
  };

  const targetDateStr = getTargetDate();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(targetDateStr).getTime();
      const now = Date.now();
      const diff = target - now;

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
    <div className="relative w-full max-w-5xl mx-auto my-4 transition-colors">
      {/* VISTA MODO CLARO: Edición Develación VIP (Car Reveal Cloth en Seda Champagne) */}
      <div className="block dark:hidden bg-gradient-to-b from-[#fdfbf9] via-[#f8f5ef] to-[#f2ede4] border border-[#e2dcd2] rounded-3xl overflow-hidden shadow-2xl shadow-stone-300/40 relative">
        {/* Acento sutil superior en oro y rojo MasterTech */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-[#d4af37] to-red-600" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[460px] lg:min-h-[480px]">
          {/* COLUMNA IZQUIERDA (6 cols): Textos editoriales estilo alta costura, cuenta regresiva y botón VIP */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-start text-left space-y-4 z-20">
            {/* Badge MasterTech & Edición */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ede7dc]/80 border border-[#ded5c6] shadow-xs">
              <img src="/logo.png" alt="Taller MasterTech" className="h-5 w-auto object-contain" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#2c2720] uppercase font-mono">
                MASTERTECH C.A.
              </span>
              <span className="text-amber-800/40">•</span>
              <span className="text-[10px] sm:text-[11px] font-black uppercase text-red-600">
                {jornada.season || 'EDICIÓN ESPECIAL'}
              </span>
            </div>

            {/* Titular Editorial COMING Soon inspirado en la referencia */}
            <div className="space-y-1">
              <div className="flex items-baseline flex-wrap gap-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-[0.22em] uppercase text-[#1e1b18] select-none leading-none">
                  COMING
                </h2>
                <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#b8860b] font-normal lowercase tracking-normal -translate-y-1">
                  Soon
                </span>
              </div>
              <div className="flex items-center gap-3 pt-1.5">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-black tracking-widest uppercase text-amber-700">
                  {displayMonthOrSeason}
                </h3>
                <span className="h-[2px] w-12 sm:w-16 bg-gradient-to-r from-amber-600 to-transparent" />
              </div>
            </div>

            {/* Título y Subtítulo de la Jornada */}
            <div className="space-y-1.5">
              <p className="text-sm sm:text-base font-black text-[#1e1b18] uppercase tracking-wide leading-snug">
                {jornada.title}
              </p>
              <p className="text-xs sm:text-sm text-[#5a544c] max-w-lg leading-relaxed">
                {jornada.comingSoonSubtitle || 'La mayor jornada de alto rendimiento automotriz está por abrir cupos en Isla de Margarita. Regístrate en la lista de espera prioritaria antes del lanzamiento oficial.'}
              </p>
            </div>

            {/* Contador Regresivo en Cajas de Cristal Marfil */}
            <div className="pt-1 w-full sm:w-auto">
              <span className="text-[10px] font-bold text-[#7a7266] uppercase tracking-widest block mb-2">
                Tiempo para apertura de cupos:
              </span>
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#ede7dc]/80 backdrop-blur-md px-4 sm:px-5 py-2.5 rounded-2xl border border-[#ded5c6] shadow-sm">
                {[
                  { val: timeLeft.days, label: 'DÍAS' },
                  { val: timeLeft.hours, label: 'HORAS' },
                  { val: timeLeft.mins, label: 'MIN' },
                  { val: timeLeft.secs, label: 'SEG' }
                ].map((unit, idx) => (
                  <React.Fragment key={idx}>
                    <div className="text-center min-w-[42px] sm:min-w-[48px]">
                      <span className="text-xl sm:text-2xl font-display font-black text-[#1e1b18] block leading-none font-mono">
                        {String(unit.val).padStart(2, '0')}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-bold text-[#7a7266] uppercase tracking-widest block mt-1">
                        {unit.label}
                      </span>
                    </div>
                    {idx < 3 && <span className="text-amber-600 font-bold text-base sm:text-lg opacity-70">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Botón VIP Lista de Espera */}
            <div className="pt-2 w-full sm:w-auto space-y-2">
              <button
                type="button"
                onClick={handleWaitlistClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(220,38,38,0.30)] transition-all cursor-pointer hover:scale-105 border border-red-500/30"
              >
                <WhatsAppIcon size={16} className="text-white fill-current shrink-0" />
                <span>UNIRME A LA LISTA DE ESPERA VIP</span>
                <ChevronRight size={15} />
              </button>

              <span className="text-[10px] text-[#6b6458] font-semibold flex items-center gap-1.5 pt-1">
                <ShieldCheck size={13} className="text-emerald-700 shrink-0" />
                <span>Acceso anticipado a cupos con tarifa preferencial MasterTech</span>
              </span>
            </div>
          </div>

          {/* COLUMNA DERECHA (6 cols): Vitrina con el superdeportivo velado en seda de develación */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-6 flex items-center justify-center">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-b from-[#f7f3ea] via-[#efe8db] to-[#e6dccb] border border-[#ded5c6] shadow-inner flex items-center justify-center">
              {/* Badge de Develación VIP */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#ded5c6] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#2c2720] font-mono">
                  DEVELACIÓN VIP
                </span>
              </div>

              {/* Halo sutil cálido detrás del velo */}
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Fotografía de la camioneta SUV (Toyota 4Runner / Jeep) cubierta en seda satinada champagne */}
              <img
                src="/assets/coming_soon_suv_reveal_silk_v2.webp"
                alt="Develación VIP MasterTech - Toyota 4Runner / Jeep"
                className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* VISTA MODO OSCURO: Layout cinematográfico de Develación VIP (Car Reveal Cloth en Seda Rubí Nocturna) */}
      <div className="hidden dark:block rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0c0e14] via-[#07080a] to-[#040507] shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative">
        {/* Acento sutil superior en rojo y oro MasterTech */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-[#d4af37] to-amber-500" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[460px] lg:min-h-[480px]">
          {/* COLUMNA IZQUIERDA (6 cols): Textos editoriales estilo alta costura, cuenta regresiva y botón VIP */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-start text-left space-y-4 z-20">
            {/* Logo MasterTech & Badge de Temporada */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-xs">
              <img src="/logo.png" alt="Taller MasterTech" className="h-5 w-auto object-contain" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#D4AF37] uppercase font-mono">
                MASTERTECH C.A.
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-[10px] sm:text-[11px] font-black uppercase text-red-400">
                {jornada.season || 'EDICIÓN ESPECIAL'}
              </span>
            </div>

            {/* Titular Editorial COMING soon en Modo Oscuro */}
            <div className="space-y-1">
              <div className="flex items-baseline flex-wrap gap-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-[0.22em] uppercase text-white select-none leading-none">
                  COMING
                </h2>
                <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#D4AF37] font-normal lowercase tracking-normal -translate-y-1">
                  soon
                </span>
              </div>
              <div className="flex items-center gap-3 pt-1.5">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-black tracking-widest uppercase text-[#D4AF37]">
                  {displayMonthOrSeason}
                </h3>
                <span className="h-[2px] w-12 sm:w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
              </div>
            </div>

            {/* Título y Subtítulo de la Jornada */}
            <div className="space-y-1.5">
              <p className="text-sm sm:text-base font-black text-white uppercase tracking-wide leading-snug">
                {jornada.title}
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
                {jornada.comingSoonSubtitle || 'La mayor jornada de alto rendimiento automotriz está por abrir cupos en Isla de Margarita. Regístrate en la lista de espera prioritaria antes del lanzamiento oficial.'}
              </p>
            </div>

            {/* Contador Regresivo */}
            <div className="pt-1 w-full sm:w-auto">
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
                    <div className="text-center min-w-[42px] sm:min-w-[48px]">
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
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(220,38,38,0.35)] transition-all cursor-pointer hover:scale-105 border border-red-500/30"
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

          {/* COLUMNA DERECHA (6 cols): Vitrina oscura con el superdeportivo velado en seda líquida carmesí */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-6 flex items-center justify-center">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-b from-[#11141c] via-[#090b10] to-[#040507] border border-white/10 shadow-inner flex items-center justify-center">
              {/* Badge de Develación VIP */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300 font-mono">
                  DEVELACIÓN VIP
                </span>
              </div>

              {/* Halo ambiental rojo detrás del velo */}
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-red-600/20 rounded-full blur-[80px] pointer-events-none" />

              {/* Imagen del vehículo para Modo Oscuro: Camioneta SUV (Toyota 4Runner / Jeep) bajo seda líquida carmesí */}
              <img
                src="/assets/coming_soon_suv_reveal_silk_dark_v2.webp"
                alt="Develación VIP MasterTech - Toyota 4Runner / Jeep"
                className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
