import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { 
  Zap, 
  Sparkles, 
  Snowflake, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Car, 
  Phone, 
  Award,
  ChevronLeft,
  ChevronRight,
  Flame,
  Star,
  Activity,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InspectionSlotPicker from './InspectionSlotPicker';
import BrechaCambiariaPanel from './components/BrechaCambiariaPanel';
import { fetchSettingsWithTTL } from './utils/settingsCache';

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

const CONFIG_DEFAULT = {
  PHONE_NUMBER: "+584123565012",
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

interface JornadaItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  img: string;
  regularPrice: string;
  promoPrice: string;
  discountBadge: string;
  duration: string;
  benefits: string[];
  specs: { label: string; val: string }[];
  compatibleModels: string;
  popularAddon?: string;
  jornadaDay?: string | number;
  dateLabel?: string;
  jornadaSlots?: string[] | string;
  images?: string[];
}

const JORNADAS_DATA: JornadaItem[] = [
  {
    id: "reprogramacion",
    badge: "Jornada de Potenciación",
    title: "Reprogramación Electrónica & Chiptuning (Stage 1 / Stage 2)",
    subtitle: "Aumenta la potencia y el torque de tu vehículo de forma segura optimizando el software de la computadora (ECU/TCU).",
    icon: <Zap className="w-6 h-6 text-primary" />,
    img: "/assets/servicio-mecanica.webp",
    regularPrice: "$250 USD",
    promoPrice: "$160 USD",
    discountBadge: "AHORRAS $90 USD",
    duration: "2 a 3 horas",
    benefits: [
      "Incremento de +15% a +35% de HP y Torque comprobables",
      "Eliminación total del retardo (lag) del pedal del acelerador",
      "Ahorro de hasta un 10% de combustible en viajes largos y autopista",
      "Optimización de curvas de cambios en cajas automáticas (TCU Tuning)",
      "Respaldo de mapa original 100% reversible en todo momento"
    ],
    specs: [
      { label: "Potencia Extra", val: "+25 HP a +65 HP" },
      { label: "Respuesta Acelerador", val: "Instantánea (0s lag)" },
      { label: "Consumo Carretera", val: "-10% consumo" },
      { label: "Garantía", val: "1 Año Software" }
    ],
    compatibleModels: "Toyota (Hilux, Fortuner, 4Runner, Camry, Machito), Jeep (Cherokee, Grand Cherokee, Wrangler), Ford (F-150, Explorer, Mustang), Chevrolet (Silverado, Tahoe, Colorado), Nissan, VW & Turbo.",
    popularAddon: "Incluye diagnóstico computarizado pre-tune sin costo adicional."
  },
  {
    id: "egr-dpf",
    badge: "Solución Electrónica Definitiva",
    title: "Desactivación Electrónica EGR / DPF / AdBlue / DTC Off",
    subtitle: "Elimina fallas molestas de Check Engine, atascamiento de Válvula EGR y problemas de Filtro DPF o AdBlue sin dañar el motor.",
    icon: <Activity className="w-6 h-6 text-amber-400" />,
    img: "/assets/servicio-electricidad.webp",
    regularPrice: "$180 USD",
    promoPrice: "$120 USD",
    discountBadge: "AHORRAS $60 USD",
    duration: "1.5 a 2.5 horas",
    benefits: [
      "Anulación electrónica limpia de Válvula EGR (evita acumulación de hollín)",
      "Solución definitiva a regeneración atascada de Filtro DPF/FAP en motores Diésel",
      "Eliminación de modo emergencia/limitación de velocidad por sistema AdBlue/DEF",
      "Limpieza de códigos DTC persistentes y luces de advertencia en tablero",
      "Recuperación de la compresión y potencia original del motor"
    ],
    specs: [
      { label: "Falla EGR/DPF", val: "100% Resuelta" },
      { label: "Hollín en Admisión", val: "Eliminado 0%" },
      { label: "Check Engine", val: "Luz Apagada" },
      { label: "Reversibilidad", val: "100% Archivo Original" }
    ],
    compatibleModels: "Toyota Hilux/Fortuner D4D/GD6, Ford Ranger/F-150, Mitsubishi Montero, Chevrolet Silverado/LUV D-Max, VW Amarok, Nissan NP300/Navara y motores Diésel/Gasolina.",
    popularAddon: "Descuento especial combinándolo con Reprogramación Stage 1."
  },
  {
    id: "cielo-estrellado",
    badge: "Estética VIP Rolls-Royce",
    title: "Cielo Estrellado de Fibra Óptica LED RGBW (Starlight Headliner)",
    subtitle: "Transforma el techo interior de tu vehículo en un cielo estrellado de lujo artesanal con destellos y estrellas fugaces.",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    img: "/assets/instalaciones.webp",
    regularPrice: "$380 USD",
    promoPrice: "$260 USD",
    discountBadge: "AHORRAS $120 USD",
    duration: "1 día (Instalación Artesanal)",
    benefits: [
      "De 200 a 600 micro-hilos de fibra óptica ultra-fina integrados al techo",
      "Control de colores y efectos por App de Smartphone (Bluetooth) + Control Remoto",
      "Efecto de centelleo dinámico (Twinkle Effect) y Estrellas Fugaces (Shooting Stars)",
      "Consumo eléctrico ultrabajo (módulo LED de última generación 12V)",
      "Acabado 100% profesional sin cables ni conexiones visibles"
    ],
    specs: [
      { label: "Micro-hilos LED", val: "200 a 600 Puntos" },
      { label: "Control", val: "Bluetooth App + Remoto" },
      { label: "Efectos", val: "Twinkle + RGBW" },
      { label: "Garantía", val: "1 Año Instalación" }
    ],
    compatibleModels: "Apto para todo tipo de vehículos: Sedanes, Coupés, SUVs, Camionetas 4x4 y Pick-ups.",
    popularAddon: "Incluye limpieza profunda de tapicería de techo pre-instalación."
  },
  {
    id: "climatizacion",
    badge: "Confort & Máximo Frío",
    title: "Jornada de Climatización & Recuperación de Aire Acondicionado",
    subtitle: "Restaura el frío polar de tu sistema A/A con recarga R134a de máxima pureza, aceite PAG sintético y trazador UV anti-fugas.",
    icon: <Snowflake className="w-6 h-6 text-cyan-400" />,
    img: "/assets/servicio-climatizacion.webp",
    regularPrice: "$65 USD",
    promoPrice: "$40 USD",
    discountBadge: "AHORRAS $25 USD",
    duration: "45 min a 1 hora",
    benefits: [
      "Carga completa de gas refrigerante R134a sintético 100% puro",
      "Inyección de aceite PAG sintético con aditivo lubricante para compresor",
      "Aplicación de trazador fluorescente UV para detección rápida de micro-fugas",
      "Desinfección de ductos con ozono para eliminar bacterias y malos olores",
      "Medición de presiones de alta/baja y temperatura de salida en cabina"
    ],
    specs: [
      { label: "Refrigerante", val: "R134a Ecológico" },
      { label: "Trazador UV", val: "Incluido sin costo" },
      { label: "Temperatura Output", val: "4°C a 7°C" },
      { label: "Desinfección", val: "Tratamiento Ozono" }
    ],
    compatibleModels: "Todas las marcas y modelos con sistema de aire acondicionado automotriz R134a.",
    popularAddon: "Reemplazo preventivo del micro-filtro de polen de cabina a precio de costo."
  },
  {
    id: "inyeccion",
    badge: "Rendimiento & Limpieza",
    title: "Jornada de Limpieza & Calibración de Inyectores por Ultrasonido",
    subtitle: "Devuelve la suavidad al motor y elimina tirones limpiando inyectores en banco ultrasónico con reemplazo de micro-filtros.",
    icon: <Wrench className="w-6 h-6 text-emerald-400" />,
    img: "/assets/servicio-inyeccion.webp",
    regularPrice: "$50 USD",
    promoPrice: "$30 USD",
    discountBadge: "AHORRAS $20 USD",
    duration: "1 a 1.5 horas",
    benefits: [
      "Limpieza ultrasónica a 40 kHz en tina térmica especializada",
      "Prueba de abanico, estanqueidad y balanza de caudal en banco digital",
      "Reemplazo de micro-filtros de cobre internos y juntas o-rings de Vitón",
      "Optimización de la pulverización para evitar humo negro y temblores en mínimo",
      "Verificación de presión de bomba de gasolina e historial de inyección"
    ],
    specs: [
      { label: "Frecuencia Ultrasonido", val: "40 kHz" },
      { label: "Sellos O-Rings", val: "Vitón Alta Presión" },
      { label: "Micro-filtros", val: "Nuevos Incluidos" },
      { label: "Prueba Banco", val: "Caudal & Pulso" }
    ],
    compatibleModels: "Sistemas de inyección de gasolina multipunto (MPFI) e inyección directa (GDI) multimarca.",
    popularAddon: "Revisión gratuita de presión de riel y estado de bujías."
  }
];

export default function Jornadas() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [activeJornadaId, setActiveJornadaId] = useState<string>("reprogramacion");
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isSlotValid, setIsSlotValid] = useState<boolean>(false);

  const tabsRef = React.useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientVehicle, setClientVehicle] = useState('');
  const [clientYear, setClientYear] = useState('');
  const [notes, setNotes] = useState('');

  // Countdown timer state (simulated target: 3 days remaining)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 28, secs: 45 });

  useEffect(() => {
    document.title = "Jornadas Especiales - Taller MasterTech";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Reserva tu cupo en las Jornadas Especiales MasterTech: Reprogramación ECU Stage 1/2, Desactivación EGR/DPF, Cielo Estrellado Rolls-Royce, A/A y Limpieza de Inyectores en Porlamar.');
    }

    const fetchSettings = async (force = false) => {
      try {
        const data = await fetchSettingsWithTTL({ force });
        if (data) {
          let currentLocal: any = null;
          try {
            const stored = localStorage.getItem('mastertech_settings_store');
            if (stored) currentLocal = JSON.parse(stored);
          } catch (e) {}

          const merged = { ...(currentLocal || {}), ...(data || {}) };
          setConfig((prev: any) => ({ ...prev, ...merged }));
        }
      } catch (err) {}
    };
    fetchSettings();

    const handleSettingsUpdated = () => fetchSettings(true);
    window.addEventListener('mastertech_settings_updated', handleSettingsUpdated);
    window.addEventListener('storage', handleSettingsUpdated);

    // Dynamic Countdown Timer calculation
    const calculateTimeLeft = () => {
      let targetTime = Date.now() + (3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000);
      if (config && config.JORNADA_COUNTDOWN_END) {
        const parsed = new Date(config.JORNADA_COUNTDOWN_END).getTime();
        if (!isNaN(parsed) && parsed > 0) {
          targetTime = parsed;
        }
      }
      const diff = Math.max(0, targetTime - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, mins, secs });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('mastertech_settings_updated', handleSettingsUpdated);
    };
  }, [config.JORNADA_COUNTDOWN_END]);

  const currentJornadasList = React.useMemo(() => {
    if (config && config.JORNADAS_JSON !== undefined && config.JORNADAS_JSON !== null && config.JORNADAS_JSON !== '') {
      try {
        const parsed = JSON.parse(config.JORNADAS_JSON);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return JORNADAS_DATA;
  }, [config]);

  useEffect(() => {
    if (currentJornadasList.length > 0 && !currentJornadasList.some((j: any) => j.id === activeJornadaId)) {
      setActiveJornadaId(currentJornadasList[0].id);
    }
  }, [currentJornadasList, activeJornadaId]);

  const rawJornada = currentJornadasList.find((j: any) => j.id === activeJornadaId) || currentJornadasList[0] || JORNADAS_DATA[0];

  const currentJornada = React.useMemo(() => {
    const fallback = JORNADAS_DATA[0];
    return {
      id: rawJornada?.id || 'reprogramacion',
      badge: rawJornada?.badge || fallback.badge,
      title: rawJornada?.title || fallback.title,
      subtitle: rawJornada?.subtitle || fallback.subtitle,
      img: rawJornada?.img || fallback.img,
      regularPrice: rawJornada?.regularPrice || fallback.regularPrice,
      promoPrice: rawJornada?.promoPrice || fallback.promoPrice,
      discountBadge: rawJornada?.discountBadge || fallback.discountBadge,
      duration: rawJornada?.duration || fallback.duration,
      benefits: Array.isArray(rawJornada?.benefits) ? rawJornada.benefits : fallback.benefits,
      specs: Array.isArray(rawJornada?.specs) ? rawJornada.specs : fallback.specs,
      compatibleModels: rawJornada?.compatibleModels || fallback.compatibleModels,
      icon: rawJornada?.icon || fallback.icon,
      jornadaDay: rawJornada?.jornadaDay !== undefined ? rawJornada.jornadaDay : undefined,
      dateLabel: rawJornada?.dateLabel || '',
      jornadaSlots: rawJornada?.jornadaSlots || undefined,
      images: Array.isArray(rawJornada?.images) ? rawJornada.images : []
    };
  }, [rawJornada]);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isHoveredGallery, setIsHoveredGallery] = useState(false);

  useEffect(() => {
    setActivePhotoIdx(0);
  }, [activeJornadaId]);

  const allPhotos = React.useMemo(() => {
    const list = [currentJornada.img, ...(currentJornada.images || [])].filter((url: any) => typeof url === 'string' && url.trim().length > 0);
    return Array.from(new Set(list));
  }, [currentJornada.img, currentJornada.images]);

  // Auto-slide gallery every 3.5 seconds when multiple photos exist and user is not hovering
  useEffect(() => {
    if (allPhotos.length <= 1 || isHoveredGallery) return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % allPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [allPhotos.length, isHoveredGallery]);

  const { jornadaDaysOfWeek, jornadaDateLabel, jornadaTurnos } = React.useMemo(() => {
    let days: number[] = [3]; // Default Miércoles for VIP Jornada
    let label = currentJornada.dateLabel || '';

    if (currentJornada.jornadaDay !== undefined && currentJornada.jornadaDay !== null && currentJornada.jornadaDay !== '') {
      const dayVal = String(currentJornada.jornadaDay);
      if (dayVal.includes(',')) {
        days = dayVal.split(',').map((n: string) => parseInt(n.trim(), 10)).filter((n: number) => !isNaN(n));
      } else if (!isNaN(Number(dayVal))) {
        days = [Number(dayVal)];
      } else {
        const lower = dayVal.toLowerCase();
        if (lower.includes('lunes')) days = [1];
        else if (lower.includes('martes')) days = [2];
        else if (lower.includes('miercol') || lower.includes('miércol')) days = [3];
        else if (lower.includes('jueves')) days = [4];
        else if (lower.includes('viernes')) days = [5];
        else if (lower.includes('sabado') || lower.includes('sábado')) days = [6];
        else if (lower.includes('todos')) days = [0, 1, 2, 3, 4, 5, 6];
      }
    } else {
      const searchStr = `${currentJornada.title} ${currentJornada.subtitle} ${currentJornada.discountBadge} ${currentJornada.duration}`.toLowerCase();
      if (searchStr.includes('miercol') || searchStr.includes('miércol')) {
        days = [3];
      } else if (searchStr.includes('lunes')) {
        days = [1];
      } else if (searchStr.includes('viernes')) {
        days = [5];
      }
    }

    if (!label) {
      if (days.length === 1) {
        const dayMap: Record<number, string> = {
          0: 'Sólo Domingos', 1: 'Sólo Lunes', 2: 'Sólo Martes', 3: 'Sólo Miércoles',
          4: 'Sólo Jueves', 5: 'Sólo Viernes', 6: 'Sólo Sábados'
        };
        label = `Fecha (${dayMap[days[0]] || 'Día de Jornada'})`;
      } else if (days.length === 5) {
        label = 'Fecha (Lunes a Viernes)';
      } else {
        label = 'Fecha Disponible';
      }
    }

    let turnos = ["08:30 AM", "09:00 AM", "09:30 AM"];
    if (Array.isArray(currentJornada.jornadaSlots) && currentJornada.jornadaSlots.length > 0) {
      turnos = currentJornada.jornadaSlots;
    } else if (typeof currentJornada.jornadaSlots === 'string' && currentJornada.jornadaSlots.trim().length > 0) {
      turnos = currentJornada.jornadaSlots.split(',').map((s: string) => s.trim()).filter(Boolean);
    } else {
      const searchStr = `${currentJornada.title} ${currentJornada.subtitle} ${currentJornada.discountBadge}`.toLowerCase();
      if (searchStr.includes('5 cupos')) {
        turnos = ["08:30 AM", "09:30 AM", "10:30 AM", "01:30 PM", "03:00 PM"];
      } else if (searchStr.includes('3 cupos')) {
        turnos = ["08:30 AM", "09:00 AM", "09:30 AM"];
      }
    }

    if (turnos.includes('02:00 PM') || turnos.includes('10:30 AM')) {
      turnos = ["08:30 AM", "09:00 AM", "09:30 AM"];
    }

    return { jornadaDaysOfWeek: days, jornadaDateLabel: label, jornadaTurnos: turnos };
  }, [currentJornada]);

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const nameStr = clientName || "Cliente MasterTech";
    const vehicleStr = clientVehicle ? `${clientVehicle} ${clientYear}`.trim() : "Mi Vehículo";
    const slotStr = selectedSlot ? `para el *${selectedSlot}*` : "lo antes posible";

    const messageLines = [
      `👋 *¡HOLA MASTERTECH! DESEO APARTAR MI CUPO DE JORNADA* 🛠️`,
      ``,
      `🎯 *Jornada Seleccionada:* ${currentJornada.title}`,
      `🏷️ *Precio Especial:* ${currentJornada.promoPrice} _(${currentJornada.discountBadge})_`,
      `👤 *Nombre:* ${nameStr}`,
      `🚗 *Vehículo:* ${vehicleStr}`,
      `📞 *Teléfono:* ${clientPhone || "No indicado"}`,
      `📅 *Turno Solicitado:* ${slotStr}`,
      notes ? `📝 *Detalles/Notas:* ${notes}` : '',
      ``,
      `¿Tienen disponibilidad de cupo para confirmar mi cita con el descuento especial?`
    ].filter(Boolean);

    const fullMessage = messageLines.join('\n');
    const waBase = config.WHATSAPP_LINK || "https://wa.link/xnj37f";
    
    // Construct WhatsApp URL with encoded message
    let finalUrl = "";
    if (waBase.includes('wa.me') || waBase.includes('api.whatsapp.com')) {
      finalUrl = `${waBase}?text=${encodeURIComponent(fullMessage)}`;
    } else {
      const cleanPhone = (config.PHONE_NUMBER || "+584123565012").replace(/\D/g, '');
      finalUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;
    }

    window.open(finalUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white selection:bg-primary selection:text-black font-sans jornada-scope">
      <Navbar />

      {/* Hero Banner with Countdown Timer */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden border-b border-white/10 jornada-hero-section">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-primary/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-amber-500/10"
          >
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>JORNADAS ESPECIALES AUTOMOTRICES 2026 — CUPOS LIMITADOS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[1.1] mb-6 max-w-4xl mx-auto"
          >
            <span style={{ color: '#ffffff' }}>TECNOLOGÍA DE ALTO NIVEL</span> <br />
            <span className="text-amber-400 italic block mt-1 font-black" style={{ color: '#fbbf24' }}>
              CON PRECIOS DE JORNADA
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-medium"
            style={{ color: '#cbd5e1' }}
          >
            Aprovecha nuestros días de servicio especializado con equipos importados de diagnóstico y programación. Reserva tu turno a precio promocional antes de que agoten los cupos.
          </motion.p>

          {/* Live Countdown Timer Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#12141a]/95 backdrop-blur-xl border border-amber-500/40 p-4 md:p-6 rounded-3xl shadow-2xl mb-12"
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest sm:pr-4 sm:border-r sm:border-white/10" style={{ color: '#fbbf24' }}>
              <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s', color: '#fbbf24' }} />
              <span style={{ color: '#fbbf24' }}>{config.JORNADA_COUNTDOWN_TITLE || 'CIERRE DE CUPOS JORNADA:'}</span>
            </div>

            <div className="flex items-center gap-3">
              {[
                { val: timeLeft.days, unit: "Días" },
                { val: timeLeft.hours, unit: "Horas" },
                { val: timeLeft.mins, unit: "Min" },
                { val: timeLeft.secs, unit: "Seg" }
              ].map((t, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-black/70 border border-white/15 rounded-2xl px-3.5 py-2 min-w-[65px] text-center">
                    <span className="text-2xl md:text-3xl font-display font-black block leading-none" style={{ color: '#fbbf24' }}>
                      {String(t.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest mt-1 block" style={{ color: '#a1a1aa' }}>
                      {t.unit}
                    </span>
                  </div>
                  {idx < 3 && <span className="text-xl font-bold" style={{ color: 'rgba(251, 191, 36, 0.6)' }}>:</span>}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conditional Rendering: VIP Empty State vs Active Jornadas */}
      {currentJornadasList.length === 0 ? (
        <section className="py-16 px-6 max-w-4xl mx-auto dark-vip-card-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-[#12141a] via-[#0d0e12] to-black border border-amber-500/40 rounded-3xl p-8 md:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden dark-vip-card"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-[#C2A472] to-amber-600 p-0.5 shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center mx-auto relative z-10">
              <div className="w-full h-full rounded-[22px] bg-[#12141a] flex items-center justify-center vip-icon-box" style={{ backgroundColor: '#12141a' }}>
                <Sparkles size={36} className="animate-pulse text-amber-400 vip-sparkles-icon" style={{ color: '#fbbf24', stroke: '#fbbf24' }} />
              </div>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto relative z-10">
              <span className="px-5 py-2 rounded-full bg-amber-400 text-black text-xs font-black uppercase tracking-widest inline-block shadow-lg shadow-amber-400/20">
                {config.JORNADA_EMPTY_BADGE || '⚡ PRÓXIMA APERTURA DE CUPOS'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight dark-vip-card-title" style={{ color: '#ffffff' }}>
                {config.JORNADA_EMPTY_TITLE || 'No hay Jornadas VIP Activas en este momento'}
              </h2>
              <p className="text-white text-sm sm:text-base leading-relaxed font-medium" style={{ color: '#ffffff' }}>
                {config.JORNADA_EMPTY_DESC || 'Nuestras jornadas automotrices especializadas (Reprogramación ECU Stage 1/2, Desactivación EGR/DPF, Techo Estrellado, A/A e Inyección) se abren en fechas exclusivas por lotes de cupos limitados. ¡Escríbenos por WhatsApp para ser notificado de la próxima fecha o agendar tu servicio estándar en taller!'}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <a
                href={config.WHATSAPP_LINK || "https://wa.link/xnj37f"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl shadow-[0_10px_35px_rgba(251,191,36,0.35)] flex items-center justify-center gap-2.5 border border-amber-300 transition-all cursor-pointer hover:scale-105"
              >
                <WhatsAppIcon size={20} className="text-black fill-current" />
                <span className="text-black font-black">{config.JORNADA_EMPTY_BTN_WA || 'CONSULTAR PRÓXIMA FECHA POR WHATSAPP'}</span>
              </a>
              <a
                href="/servicios"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-bold transition-all text-center"
                style={{ color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <span style={{ color: '#ffffff', backgroundColor: 'transparent', fontWeight: 800 }}>{config.JORNADA_EMPTY_BTN_SEC || 'Ver Servicios de Taller Disponibles'}</span>
              </a>
            </div>
          </motion.div>
        </section>
      ) : (
        <main>
          {/* Jornadas Navigation Tabs Slider */}
          <section className="py-10 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-white mb-2">
                SELECCIONA LA JORNADA PARA TU VEHÍCULO
              </h2>
              <p className="text-xs md:text-sm text-zinc-400">
                Desliza o usa las flechas laterales para explorar todas las jornadas disponibles
              </p>
            </div>

            <div className="relative flex items-center group/slider">
              {/* Left Slide Arrow */}
              <button
                type="button"
                onClick={() => scrollTabs('left')}
                className="hidden md:flex absolute -left-4 z-20 w-11 h-11 rounded-full bg-black/90 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/40 items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                title="Deslizar hacia la izquierda"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Scrollable Container */}
              <div
                ref={tabsRef}
                className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 px-2 scroll-smooth scrollbar-none snap-x w-full"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {currentJornadasList.map((j: any) => {
                  const isActive = j.id === activeJornadaId;
                  return (
                    <button
                      type="button"
                      key={j.id}
                      onClick={() => setActiveJornadaId(j.id)}
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl border text-xs font-bold transition-all shrink-0 cursor-pointer snap-start ${
                        isActive 
                          ? 'bg-gradient-to-r from-amber-500/30 to-primary/30 border-primary text-white shadow-[0_10px_30px_rgba(194,164,114,0.3)] scale-105 z-10' 
                          : 'bg-[#12141a] border-white/10 text-zinc-400 hover:text-white hover:border-amber-500/40 hover:bg-white/5'
                      }`}
                    >
                      {j.icon || <Zap className="w-6 h-6 text-amber-400 shrink-0" />}
                      <div className="text-left">
                        <span className="block text-[10px] font-black uppercase text-amber-400 tracking-wider">{j.badge}</span>
                        <span className="font-bold text-xs whitespace-nowrap">{j.title ? j.title.split('(')[0] : 'Jornada'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Slide Arrow */}
              <button
                type="button"
                onClick={() => scrollTabs('right')}
                className="hidden md:flex absolute -right-4 z-20 w-11 h-11 rounded-full bg-black/90 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/40 items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                title="Deslizar hacia la derecha"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </section>

          {/* Selected Jornada Detail Display */}
          <section className="py-8 px-6 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentJornada.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 bg-[#12141a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Left Content (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {currentJornada.badge}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      Duración: {currentJornada.duration}
                    </span>
                  </div>

                  {allPhotos.length > 0 && (
                    <div 
                      className="space-y-3"
                      onMouseEnter={() => setIsHoveredGallery(true)}
                      onMouseLeave={() => setIsHoveredGallery(false)}
                    >
                      <div className="w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-black border border-white/10 relative shadow-xl group">
                        <img
                          key={activePhotoIdx}
                          src={allPhotos[activePhotoIdx] || allPhotos[0]}
                          alt={currentJornada.title}
                          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/servicio-mecanica.webp'; }}
                          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-transparent to-transparent pointer-events-none" />

                        {allPhotos.length > 1 && (
                          <>
                            {/* Counter badge with auto-slide pulse */}
                            <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg pointer-events-none flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              <span>Foto {activePhotoIdx + 1} de {allPhotos.length}</span>
                            </div>

                            {/* Left Navigation Arrow */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePhotoIdx((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
                              }}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/80 hover:bg-amber-500 text-white hover:text-black border border-white/20 hover:border-amber-500 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg"
                              title="Foto anterior"
                            >
                              <ChevronLeft size={18} />
                            </button>

                            {/* Right Navigation Arrow */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePhotoIdx((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/80 hover:bg-amber-500 text-white hover:text-black border border-white/20 hover:border-amber-500 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg"
                              title="Siguiente foto"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Thumbnail Strip */}
                      {allPhotos.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {allPhotos.map((photoUrl: string, pIdx: number) => (
                            <button
                              type="button"
                              key={pIdx}
                              onClick={() => setActivePhotoIdx(pIdx)}
                              className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                pIdx === activePhotoIdx 
                                  ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-md' 
                                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40'
                              }`}
                            >
                              <img
                                src={photoUrl}
                                alt={`Miniatura ${pIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight uppercase text-white leading-tight">
                    {currentJornada.title}
                  </h2>

                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    {currentJornada.subtitle}
                  </p>
                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {(currentJornada.specs || []).map((s, idx) => (
                      <div key={idx} className="bg-black/50 border border-white/10 rounded-2xl p-3 text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">{s.label}</span>
                        <span className="text-xs md:text-sm font-bold text-primary block truncate">{s.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benefits Checklist */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">BENEFICIOS INCLUIDOS EN LA JORNADA:</h3>
                    <div className="space-y-2.5">
                      {(currentJornada.benefits || []).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-xs md:text-sm text-zinc-300 font-medium leading-normal">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Compatibility Banner */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
                    <Car className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">VEHÍCULOS Y MARCAS COMPATIBLES:</span>
                      <p className="text-xs text-zinc-300 leading-relaxed">{currentJornada.compatibleModels}</p>
                    </div>
                  </div>
                </div>

                {/* Right Booking Card & Price (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-black/60 border border-white/10 rounded-3xl p-6 relative">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">PRECIO REGULAR</span>
                        <span className="text-base text-zinc-400 line-through font-bold">{currentJornada.regularPrice}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">PRECIO JORNADA</span>
                        <span className="text-3xl font-display font-black text-primary">{currentJornada.promoPrice}</span>
                      </div>
                    </div>

                    {currentJornada.discountBadge && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 text-center">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center justify-center gap-1.5">
                          <Flame className="w-4 h-4 text-amber-400" />
                          {currentJornada.discountBadge}
                        </span>
                      </div>
                    )}

                    {currentJornada.popularAddon && (
                      <p className="text-[11px] text-zinc-400 italic text-center">
                        {currentJornada.popularAddon}
                      </p>
                    )}
                  </div>

                  {/* Interactive Booking Form */}
                  <form onSubmit={handleWhatsAppBooking} className="space-y-4 pt-2 border-t border-white/10">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>APARTAR MI CUPO EN LA JORNADA</span>
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Nombre Completo</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Carlos Pérez"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-black/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Teléfono</label>
                          <input
                            type="tel"
                            required
                            placeholder="Ej. 04123565012"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            className="w-full bg-black/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Vehículo / Modelo</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Toyota Hilux 2020"
                            value={clientVehicle}
                            onChange={(e) => setClientVehicle(e.target.value)}
                            className="w-full bg-black/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Slot Picker Integration */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">Seleccionar Turno Disponible (Sólo Miércoles)</label>
                        <InspectionSlotPicker
                          isJornada={true}
                          allowedDaysOfWeek={[3]}
                          dateLabel="Fecha (Sólo Miércoles)"
                          customSlots={jornadaTurnos && jornadaTurnos.length > 0 ? jornadaTurnos : ["08:30 AM", "09:00 AM", "09:30 AM"]}
                          onSelectSlot={(slotStr, isValid) => {
                            setSelectedSlot(slotStr);
                            setIsSlotValid(isValid);
                          }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary !py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 border-none shadow-[0_10px_25px_rgba(194,164,114,0.3)] hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <WhatsAppIcon size={18} />
                      <span>RESERVAR CUPO VÍA WHATSAPP ({currentJornada.promoPrice})</span>
                    </button>

                    <p className="text-[10px] text-zinc-500 text-center">
                      Reserva directa protegida. Al tocar el botón serás redirigido a nuestro WhatsApp oficial para confirmar tu cupo.
                    </p>
                  </form>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        </main>
      )}

      {/* Guarantees & Why MasterTech */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#12141a] p-6 rounded-3xl border border-white/10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Garantía Total MasterTech</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Todos nuestros trabajos de reprogramación, electrónica y climatización incluyen respaldo directo por escrito y garantía de satisfacción.
              </p>
            </div>
          </div>

          <div className="bg-[#12141a] p-6 rounded-3xl border border-white/10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 text-primary">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Equipos Importados OEM</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Utilizamos escáneres multimarca y programadores de última generación para garantizar lecturas quirúrgicas sin riesgos en tu vehículo.
              </p>
            </div>
          </div>

          <div className="bg-[#12141a] p-6 rounded-3xl border border-white/10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Atención VIP & Lounge</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Espera cómodamente en nuestra área climatizada VIP con Wi-Fi de alta velocidad, café de cortesía y atención personalizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <img src={config.LOGO_URL || "/logo.png"} alt="MasterTech" className="h-6 object-contain" />
            <span className="font-display font-black tracking-widest text-white text-sm">MASTERTECH</span>
          </div>
          <p>© 2026 SOLUCIONES MASTERTECH C.A. Todos los derechos reservados.</p>
          <p className="text-[11px] text-zinc-600">Porlamar, Isla de Margarita — Venezuela.</p>
        </div>
      </footer>

      {/* Floating Hideable Bubble Widget: Live Exchange Rates & Budget Calculator */}
      <BrechaCambiariaPanel />
    </div>
  );
}
