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
    comingSoonImgLight?: string;
    comingSoonImgDark?: string;
    img?: string;
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

  // Titular configurable (ej: COMING SOON, PRÓXIMA EDICIÓN, etc.)
  const rawTitle = (jornada.comingSoonTitle || 'COMING SOON').trim();
  const titleWords = rawTitle.split(/\s+/);
  const titleFirst = titleWords[0] || 'COMING';
  const titleRest = titleWords.slice(1).join(' ');

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

  // Imágenes configurables con fallback a las oficiales de develación SUV
  const lightImg = jornada.comingSoonImgLight || '/assets/coming_soon_suv_reveal_silk_v2.webp';
  const darkImg = jornada.comingSoonImgDark || jornada.comingSoonImgLight || '/assets/coming_soon_suv_reveal_silk_dark_v2.webp';

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4 transition-colors">
      {/* VISTA MODO CLARO: Tarjeta de Develación VIP con fondo de seda integrado */}
      <div className="block dark:hidden relative rounded-3xl overflow-hidden border border-[#ded5c6] shadow-2xl shadow-stone-300/40 bg-[#fdfbf9]">
        {/* Acento superior en degradado oro/rojo */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-[#d4af37] to-amber-600 z-30" />

        {/* Imagen de fondo integrada a la derecha con máscara ultra-suave */}
        <div 
          className="absolute top-0 right-0 bottom-0 w-full lg:w-[68%] pointer-events-none select-none z-0 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 10%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.7) 60%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 10%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.7) 60%, black 100%)'
          }}
        >
          <img
            src={lightImg}
            alt="Develación VIP MasterTech - Modo Claro"
            className="w-full h-full object-cover object-right opacity-95 transition-transform duration-1000 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Viñeta sutil en móvil para asegurar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf9] via-transparent to-[#fdfbf9]/30 lg:hidden pointer-events-none z-[1]" />

        {/* Contenido en primer plano */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl flex flex-col justify-center items-start text-left space-y-4 min-h-[460px] lg:min-h-[480px]">
          {/* Eyebrow de Lanzamiento */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-black tracking-[0.25em] uppercase text-red-600">
              PRÓXIMO LANZAMIENTO
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-red-600/40 to-transparent" />
          </div>

          {/* Badge MasterTech & Edición */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ede7dc]/90 backdrop-blur-md border border-[#ded5c6] shadow-xs">
            <img src="/logo.png" alt="Taller MasterTech" className="h-5 w-auto object-contain" />
            <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#2c2720] uppercase font-mono">
              MASTERTECH C.A.
            </span>
            <span className="text-amber-800/40">•</span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase text-red-600">
              {jornada.season || 'EDICIÓN ESPECIAL'}
            </span>
          </div>

          {/* Titular Principal de Alto Impacto */}
          <div className="space-y-2">
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-stone-900 select-none leading-none font-sans">
                {titleFirst}
              </h2>
              {titleRest ? (
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase bg-gradient-to-r from-red-600 via-amber-600 to-amber-700 bg-clip-text text-transparent select-none leading-none font-sans">
                  {titleRest}
                </span>
              ) : null}
            </div>

            {/* Mes / Temporada con Pill Técnico */}
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-900 text-[#f59e0b] border border-stone-800 text-[11px] sm:text-xs font-mono font-black tracking-[0.22em] uppercase shadow-xs">
                <Calendar size={12} className="text-amber-400 shrink-0" />
                {displayMonthOrSeason}
              </span>
              <span className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-amber-600/50 to-transparent" />
            </div>
          </div>

          {/* Nombre de la Jornada y Descripción */}
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-base sm:text-lg lg:text-xl font-black text-stone-900 tracking-tight leading-snug">
              {jornada.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              {jornada.comingSoonSubtitle || 'La mayor jornada de alto rendimiento automotriz está por abrir cupos en Isla de Margarita. Regístrate en la lista de espera prioritaria antes del lanzamiento oficial.'}
            </p>
          </div>

          {/* Contador Regresivo en Cajas de Cristal Marfil */}
          <div className="pt-1 w-full sm:w-auto">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-stone-500 uppercase tracking-[0.2em] block mb-2">
              Tiempo para apertura de cupos:
            </span>
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#ede7dc]/90 backdrop-blur-md px-4 sm:px-5 py-2.5 rounded-2xl border border-[#ded5c6] shadow-sm">
              {[
                { val: timeLeft.days, label: 'DÍAS' },
                { val: timeLeft.hours, label: 'HORAS' },
                { val: timeLeft.mins, label: 'MIN' },
                { val: timeLeft.secs, label: 'SEG' }
              ].map((unit, idx) => (
                <React.Fragment key={idx}>
                  <div className="text-center min-w-[42px] sm:min-w-[48px]">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-stone-900 block leading-none tabular-nums">
                      {String(unit.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block mt-1">
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
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(220,38,38,0.30)] transition-all cursor-pointer hover:scale-105 border border-red-500/30"
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
      </div>

      {/* VISTA MODO OSCURO: Tarjeta de Develación VIP con fondo de seda roja nocturna integrada */}
      <div className="hidden dark:block relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-[#07080a]">
        {/* Acento superior en rojo y oro MasterTech */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-[#d4af37] to-amber-500 z-30" />

        {/* Imagen de fondo integrada a la derecha */}
        <div 
          className="absolute top-0 right-0 bottom-0 w-full lg:w-[68%] pointer-events-none select-none z-0 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 10%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.7) 60%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 10%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.7) 60%, black 100%)'
          }}
        >
          <img
            src={darkImg}
            alt="Develación VIP MasterTech - Modo Oscuro"
            className="w-full h-full object-cover object-right opacity-90 transition-transform duration-1000 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Viñeta sutil en esquinas y resplandor ambiental rojo carmesí */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a] via-[#07080a]/60 via-35% to-transparent pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/40 lg:hidden pointer-events-none z-[1]" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/15 rounded-full blur-[90px] pointer-events-none z-[1]" />

        {/* Contenido en primer plano */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl flex flex-col justify-center items-start text-left space-y-4 min-h-[460px] lg:min-h-[480px]">
          {/* Eyebrow de Lanzamiento */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-black tracking-[0.25em] uppercase text-red-400">
              PRÓXIMO LANZAMIENTO
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-red-500/40 to-transparent" />
          </div>

          {/* Logo MasterTech & Badge de Temporada */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-xs backdrop-blur-md">
            <img src="/logo.png" alt="Taller MasterTech" className="h-5 w-auto object-contain" />
            <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#D4AF37] uppercase font-mono">
              MASTERTECH C.A.
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase text-red-400">
              {jornada.season || 'EDICIÓN ESPECIAL'}
            </span>
          </div>

          {/* Titular Principal de Alto Impacto */}
          <div className="space-y-2">
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white select-none leading-none font-sans">
                {titleFirst}
              </h2>
              {titleRest ? (
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent select-none leading-none font-sans">
                  {titleRest}
                </span>
              ) : null}
            </div>

            {/* Mes / Temporada con Pill Técnico */}
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] sm:text-xs font-mono font-black tracking-[0.22em] uppercase backdrop-blur-md shadow-xs">
                <Calendar size={12} className="text-[#D4AF37] shrink-0" />
                {displayMonthOrSeason}
              </span>
              <span className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
            </div>
          </div>

          {/* Nombre de la Jornada y Descripción */}
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight leading-snug">
              {jornada.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {jornada.comingSoonSubtitle || 'La mayor jornada de alto rendimiento automotriz está por abrir cupos en Isla de Margarita. Regístrate en la lista de espera prioritaria antes del lanzamiento oficial.'}
            </p>
          </div>

          {/* Contador Regresivo */}
          <div className="pt-1 w-full sm:w-auto">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-2">
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
                    <span className="text-2xl sm:text-3xl font-mono font-black text-white block leading-none tabular-nums">
                      {String(unit.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mt-1">
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
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(220,38,38,0.35)] transition-all cursor-pointer hover:scale-105 border border-red-500/30"
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
      </div>
    </div>
  );
}
