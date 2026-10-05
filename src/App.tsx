/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { 
  MessageCircle, 
  Settings, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2,
  Menu,
  X,
  Calendar,
  User,
  Car,
  ChevronDown,
  Wrench,
  Search,
  Award,
  Activity,
  ArrowRight,
  Plus,
  Minus,
  Instagram,
  Youtube,
  Cpu,
  Fuel,
  Droplets,
  Layers,
  Gauge,
  FileText,
  Check,
  Flame,
  SlidersHorizontal,
  ExternalLink,
  ShieldAlert,
  AlertCircle,
  ClipboardCheck,
  Sparkles,
  Terminal,
  Crosshair,
  Compass,
  BookOpen,
  Disc,
  Volume2,
  VolumeX,
  Package,
  Tag,
  BadgePercent
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InspectionSlotPicker from './InspectionSlotPicker';
import { getTallerStatus } from './utils/tallerStatus';
import Inspeccion from './Inspeccion';
import Contacto from './Contacto';
import Faq from './Faq';
import Nosotros from './Nosotros';
import Servicios from './Servicios';
import Catalogo, { DEFAULT_CATALOG } from './Catalogo';
import Jornadas from './Jornadas';
import TrabajaConNosotros from './TrabajaConNosotros';
import Jeep from './Jeep';
import Toyota from './Toyota';
import PreviewManuales from './PreviewManuales';
import GarantiaMasterTech from './components/GarantiaMasterTech';
import GoogleReviewsWidget from './components/GoogleReviewsWidget';
import BrechaCambiariaPanel from './components/BrechaCambiariaPanel';
import { MT01AdvisorModal } from './components/MT01AdvisorModal';
import { fetchSettingsWithTTL, getCachedSettings } from './utils/settingsCache';

const TikTokIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.894 2.896 2.896 0 0 1-2.894-2.894 2.896 2.896 0 0 1 2.894-2.894c.328 0 .64.053.93.15V9.458a6.326 6.326 0 0 0-.93-.07 6.34 6.34 0 0 0-6.335 6.336 6.34 6.34 0 0 0 6.335 6.335 6.34 6.34 0 0 0 6.336-6.335V8.756a8.21 8.21 0 0 0 4.78 1.488V6.8a4.815 4.815 0 0 1-1.005-.114z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

function getInstagramReelId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  return match ? match[1] : null;
}

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([A-Za-z0-9_-]{11})/i);
  return match ? match[1] : null;
}

function isDirectVideoUrl(url?: string): boolean {
  if (!url) return false;
  const clean = (url || '').trim().toLowerCase();
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.mov') || clean.endsWith('.m4v') || clean.includes('/assets/') || clean.startsWith('data:video') || clean.includes('mastertech-media/videos');
}
// --- CONFIGURACIÓN ---
const CONFIG = {
  PHONE_NUMBER: "+584123565012", 
  WHATSAPP_LINK: "https://wa.link/xnj37f", 
  WEBHOOK_URL: "https://script.google.com/macros/s/AKfycbxIzUm7itb1hP8BCfbt3tWThExU_jBM9h_-kxJbGb7TlMryGA-zc01OmRnoAASU5AOM/exec", 
  GOOGLE_MAPS_LINK: "https://maps.app.goo.gl/fybS1jW9buxQD5gv7",
  INSTAGRAM_LINK: "https://www.instagram.com/tallermastertech/",
  TIKTOK_LINK: "https://www.tiktok.com/@tallermastertech",
  YOUTUBE_LINK: "https://www.youtube.com/@tallermastertech",
  HERO_REEL_URL: "/assets/taller_video.mp4",
  GOOGLE_MAPS_EMBED: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.5!2d-63.8681155!3d10.9701683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c318fe358d81b01%3A0xf0c67c88a5063093!2sTaller%20MasterTech!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
  GOOGLE_BUSINESS_URL: "https://maps.app.goo.gl/fybS1jW9buxQD5gv7",
  HERO_IMG: "/assets/instalaciones.webp",
  LOGO_URL: "/logo.png", 
  BEFORE_AFTER_1: "/assets/before_after_1.webp",
  BEFORE_AFTER_2: "/assets/before_after_2.webp",
  SUCCESS_BADGE: "¡TIENES HASTA UN 15% DE DESCUENTO!",
  SUCCESS_TEXT: "Un técnico especialista se comunicará contigo vía WhatsApp en breve para coordinar tu descuento y cita.",
  PROMO_BAR_MODE: "jornadas",
  PROMO_BAR_TARGET_ID: ""
};

const DEFAULT_JORNADAS = [
  {
    id: "reprogramacion",
    badge: "Jornada de Potenciación",
    title: "Reprogramación Electrónica & Chiptuning (Stage 1 / Stage 2)",
    subtitle: "Aumenta la potencia y el torque de tu vehículo de forma segura optimizando el software de la computadora (ECU/TCU).",
    img: "/assets/servicio-mecanica.webp",
    regularPrice: "$250 USD",
    promoPrice: "$160 USD",
    discountBadge: "AHORRAS $90 USD (36% OFF)",
    duration: "2 a 3 horas",
    benefits: [
      "Incremento de +15% a +35% de HP y Torque comprobables",
      "Eliminación total del retardo (lag) del pedal del acelerador",
      "Ahorro de hasta un 10% de combustible en viajes largos y autopista"
    ],
    specs: [{ label: "Potencia Extra", val: "+25 HP a +65 HP" }, { label: "Garantía", val: "1 Año Software" }],
    compatibleModels: "Toyota, Jeep, Ford, Chevrolet, Nissan, VW & Turbo."
  },
  {
    id: "egr-dpf",
    badge: "Solución Electrónica Definitiva",
    title: "Desactivación Electrónica EGR / DPF / AdBlue / DTC Off",
    subtitle: "Elimina fallas molestas de Check Engine, atascamiento de Válvula EGR y problemas de Filtro DPF o AdBlue sin dañar el motor.",
    img: "/assets/servicio-electricidad.webp",
    regularPrice: "$180 USD",
    promoPrice: "$120 USD",
    discountBadge: "AHORRAS $60 USD (33% OFF)",
    duration: "1.5 a 2.5 horas",
    benefits: [
      "Anulación electrónica limpia de Válvula EGR",
      "Solución definitiva a regeneración atascada de Filtro DPF",
      "Eliminación de limitación de velocidad por sistema AdBlue/DEF"
    ],
    specs: [{ label: "Falla EGR/DPF", val: "100% Resuelta" }, { label: "Check Engine", val: "Luz Apagada" }],
    compatibleModels: "Toyota Hilux/Fortuner, Ford Ranger, Mitsubishi, Nissan NP300, VW Amarok."
  },
  {
    id: "cielo-estrellado",
    badge: "Estética VIP Rolls-Royce",
    title: "Cielo Estrellado de Fibra Óptica LED RGBW",
    subtitle: "Transforma el techo interior de tu vehículo en un cielo estrellado de lujo artesanal con destellos dinámicos.",
    img: "/assets/instalaciones.webp",
    regularPrice: "$380 USD",
    promoPrice: "$260 USD",
    discountBadge: "AHORRAS $120 USD (32% OFF)",
    duration: "1 día (Instalación Artesanal)",
    benefits: [
      "De 200 a 600 micro-hilos de fibra óptica ultra-fina integrados al techo",
      "Control de efectos por App Bluetooth en Smartphone + Control Remoto",
      "Acabado profesional sin cables ni conexiones visibles"
    ],
    specs: [{ label: "Micro-hilos", val: "200 a 600 Puntos" }, { label: "Garantía", val: "1 Año" }],
    compatibleModels: "Apto para Sedanes, Coupés, SUVs, Camionetas 4x4 y Pick-ups."
  },
  {
    id: "climatizacion",
    badge: "Confort & Máximo Frío",
    title: "Jornada de Climatización & Recuperación de Aire Acondicionado",
    subtitle: "Restaura el frío polar de tu sistema A/A con recarga R134a de máxima pureza, aceite PAG sintético y trazador UV anti-fugas.",
    img: "/assets/servicio-climatizacion.webp",
    regularPrice: "$65 USD",
    promoPrice: "$40 USD",
    discountBadge: "AHORRAS $25 USD (38% OFF)",
    duration: "45 min a 1 hora",
    benefits: [
      "Recarga con gas refrigerante ecológico R134a certificado",
      "Inyección de aceite sintético PAG para lubricación del compresor",
      "Aplicación de contraste UV para detección temprana de micro-fugas"
    ],
    specs: [{ label: "Enfriamiento", val: "Frío Polar Rápido" }, { label: "Garantía", val: "6 Meses" }],
    compatibleModels: "Apto para todas las marcas y modelos con sistema R134a."
  }
];

export default function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedService, setSelectedService] = useState<string>('Línea de inspección gratuita');
  const [inspectionSlotStr, setInspectionSlotStr] = useState<string>('');
  const [isInspectionSlotValid, setIsInspectionSlotValid] = useState<boolean>(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const heroVideoRef = React.useRef<HTMLVideoElement>(null);


  // Dynamic config initialized with static CONFIG fallback
  const [config, setConfig] = useState<any>(CONFIG);
  const [isInspeccion, setIsInspeccion] = useState(
    window.location.pathname === '/inspeccion'
  );
  const [isContacto, setIsContacto] = useState(
    window.location.pathname === '/contacto'
  );
  const [isFaq, setIsFaq] = useState(
    window.location.pathname.toLowerCase() === '/faq' ||
    window.location.pathname.toLowerCase() === '/garantia'
  );
  const [isNosotros, setIsNosotros] = useState(
    window.location.pathname.toLowerCase() === '/nosotros'
  );
  const [isServicios, setIsServicios] = useState(
    window.location.pathname.toLowerCase() === '/servicios'
  );
  const [isCatalogo, setIsCatalogo] = useState(
    window.location.pathname.toLowerCase() === '/catalogo'
  );
  const [isJornadas, setIsJornadas] = useState(
    window.location.pathname.toLowerCase() === '/jornada' ||
    window.location.pathname.toLowerCase() === '/jornadas' ||
    window.location.hash === '#jornadas'
  );
  const [isTrabajaConNosotros, setIsTrabajaConNosotros] = useState(
    window.location.pathname.toLowerCase() === '/postulacion' ||
    window.location.hash === '#postulacion'
  );
  const [isJeep, setIsJeep] = useState(
    window.location.pathname.toLowerCase() === '/jeep'
  );
  const [isToyota, setIsToyota] = useState(
    window.location.pathname.toLowerCase() === '/toyota'
  );
  const [isPreviewManuales, setIsPreviewManuales] = useState(
    window.location.pathname.toLowerCase() === '/preview-manuales' ||
    window.location.pathname.toLowerCase() === '/manuales-preview' ||
    window.location.search.includes('preview=manuales')
  );

  // Dynamic JSON arrays for team, reviews, brands and workshop showcases
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [brands, setBrands] = useState<string[]>([
    "Jeep", "Toyota", "Honda", "Dodge", "Nissan", "Chrysler", "Lexus"
  ]);
  const [services, setServices] = useState<any[]>([]);
  const [instalacionesList, setInstalacionesList] = useState<any[]>([
    {
      id: 1,
      badge: 'Puesto de Trabajo #1',
      title: 'Mecánica Mayor & Motores',
      desc: 'Desarme técnico, calibración de tolerancias, rectificación y armado con grúa hidráulica según especificaciones de torque OEM.',
      img: '/assets/servicio-mecanica.webp',
      feature: 'Torque de precisión garantizado',
      servicioId: 'mecanica',
      servicioNombre: 'Mecánica General & Mantenimiento'
    },
    {
      id: 2,
      badge: 'Diagnóstico OEM',
      title: 'Diagnóstico por Escáner',
      desc: 'Lectura en vivo de parámetros de sensores, pruebas de actuadores y reseteo de computadoras ECU sin inventar diagnósticos.',
      img: '/assets/servicio-electricidad.webp',
      feature: 'Detección de códigos DTC exactos',
      servicioId: 'diagnostico',
      servicioNombre: 'Diagnóstico Electrónico & Escáner'
    },
    {
      id: 3,
      badge: 'Puesto #2 · Jeep 4x4',
      title: 'Tren Motriz, Frenos & 4x4',
      desc: 'Inspección profunda de terminales, bujes, amortiguadores, pastillas cerámicas y tracción en camionetas Jeep y Toyota.',
      img: '/assets/servicio-frenos.webp',
      feature: 'Seguridad en carretera garantizada',
      servicioId: 'frenos',
      servicioNombre: 'Frenos, Dirección & Suspensión'
    },
    {
      id: 4,
      badge: 'Laboratorio',
      title: 'Inyección & Ultrasonido',
      desc: 'Limpieza en tina ultrasónica, medición de caudal y verificación del patrón de pulverización para óptimo consumo de combustible.',
      img: '/assets/servicio-inyeccion.webp',
      feature: 'Prueba dinámica en banco digital',
      servicioId: 'inyectores',
      servicioNombre: 'Limpieza de Inyectores por Ultrasonido'
    }
  ]);

  const [jornadasList, setJornadasList] = useState<any[]>(() => {
    try {
      const s = localStorage.getItem('mastertech_settings_store');
      if (s) {
        const p = JSON.parse(s);
        if (p.JORNADAS_JSON) {
          const parsed = typeof p.JORNADAS_JSON === 'string' ? JSON.parse(p.JORNADAS_JSON) : p.JORNADAS_JSON;
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch (e) {}
    return DEFAULT_JORNADAS;
  });

  const sanitizeCatalogItems = (items: any[]): any[] => {
    if (!Array.isArray(items)) return DEFAULT_CATALOG;

    // Filter out invalid items (blank title or price $0.00)
    const valid = items.filter(item => {
      if (!item) return false;
      const title = String(item.title || '').trim();
      const priceStr = String(item.price || item.promoPrice || '').replace(/[^0-9.]/g, '');
      const priceNum = parseFloat(priceStr);
      return title.length > 0 && !isNaN(priceNum) && priceNum > 0;
    });

    const baseList = valid.length > 0 ? valid : DEFAULT_CATALOG;

    return baseList.map(item => {
      let copy = { ...item };
      if (copy.id === 101 || copy.partNumber === '88210-02040' || (copy.title && copy.title.toLowerCase().includes('radar frontal'))) {
        if (!copy.img || copy.img.includes('cat_baterias_electricidad') || copy.img.includes('placeholder')) {
          copy.img = '/assets/cat_radar_tss.jpg';
        }
      }
      if (copy.id === 2 || copy.partNumber === 'WAG-QC-CER-88' || (copy.title && copy.title.toLowerCase().includes('pastillas de freno cerámicas wagner'))) {
        if (!copy.img || copy.img.includes('promo_brakes_caliper') || copy.img.includes('cat_frenos_discos')) {
          copy.img = '/assets/cat_pastillas_freno.jpg';
        }
        if (!copy.regularPrice) {
          copy.regularPrice = '$70.00';
          copy.discountBadge = 'AHORRAS $15 USD (21% OFF)';
          copy.isPromo = true;
        }
      }
      return copy;
    });
  };

  const [promoSectionTab, setPromoSectionTab] = useState<'jornadas' | 'repuestos'>('repuestos');

  const [catalogList, setCatalogList] = useState<any[]>(() => {
    try {
      const s = localStorage.getItem('mastertech_settings_store');
      if (s) {
        const p = JSON.parse(s);
        if (p.CATALOG_PRODUCTS_JSON) {
          const parsed = typeof p.CATALOG_PRODUCTS_JSON === 'string' ? JSON.parse(p.CATALOG_PRODUCTS_JSON) : p.CATALOG_PRODUCTS_JSON;
          if (Array.isArray(parsed) && parsed.length > 0) return sanitizeCatalogItems(parsed);
        }
      }
    } catch (e) {}
    return sanitizeCatalogItems(DEFAULT_CATALOG);
  });

  // Calculate discount percentage dynamically for each promotion (both Jornadas and Repuestos)
  const getPromoDiscountPct = (item: any): number => {
    if (!item) return 0;
    if (item.regularPrice && (item.promoPrice || item.price)) {
      const reg = parseFloat(String(item.regularPrice).replace(/[^0-9.]/g, ''));
      const pro = parseFloat(String(item.promoPrice || item.price).replace(/[^0-9.]/g, ''));
      if (!isNaN(reg) && !isNaN(pro) && reg > 0 && pro < reg) {
        return Math.round(((reg - pro) / reg) * 100);
      }
    }
    const matchPct = (item.discountBadge || item.badge || '').match(/(\d+)%/);
    if (matchPct && matchPct[1]) return parseInt(matchPct[1], 10);
    return 0;
  };

  const processedJornadas = React.useMemo(() => {
    const list = (jornadasList && jornadasList.length > 0) ? jornadasList : DEFAULT_JORNADAS;
    const targetId = (config.PROMO_BAR_TARGET_ID || '').trim();
    return list.map((item: any) => ({
      ...item,
      promoType: 'jornada' as const,
      discountPct: getPromoDiscountPct(item),
      isSelectedPromo: targetId ? (String(item.id) === targetId) : false
    })).sort((a: any, b: any) => {
      if (a.isSelectedPromo && !b.isSelectedPromo) return -1;
      if (!a.isSelectedPromo && b.isSelectedPromo) return 1;
      return b.discountPct - a.discountPct;
    });
  }, [jornadasList, config.PROMO_BAR_TARGET_ID]);

  const processedRepuestos = React.useMemo(() => {
    const list = sanitizeCatalogItems((catalogList && catalogList.length > 0) ? catalogList : DEFAULT_CATALOG);
    const mapped = list.map((item: any) => ({
      ...item,
      promoType: 'repuesto' as const,
      promoPrice: item.promoPrice || item.price,
      discountPct: getPromoDiscountPct(item),
    }));

    const slot1Id = (config.PROMO_REPUESTO_1 || config.PROMO_BAR_TARGET_ID || '').trim();
    const slot2Id = (config.PROMO_REPUESTO_2 || '').trim();
    const slot3Id = (config.PROMO_REPUESTO_3 || '').trim();

    const isMatch = (item: any, id: string) => id ? (String(item.id) === id || item.partNumber === id) : false;

    // Highest discount pool for empty slots
    const sortedDefault = [...mapped].sort((a: any, b: any) => {
      if (b.discountPct !== a.discountPct) return b.discountPct - a.discountPct;
      if (b.isPromo && !a.isPromo) return -1;
      if (!b.isPromo && a.isPromo) return 1;
      return 0;
    });

    const chosen1 = slot1Id ? mapped.find((item: any) => isMatch(item, slot1Id)) : null;
    const chosen2 = slot2Id ? mapped.find((item: any) => isMatch(item, slot2Id)) : null;
    const chosen3 = slot3Id ? mapped.find((item: any) => isMatch(item, slot3Id)) : null;

    const used = new Set([chosen1, chosen2, chosen3].filter(Boolean));
    const available = sortedDefault.filter((item: any) => !used.has(item));

    const final1 = chosen1 || available.shift() || mapped[0];
    const final2 = chosen2 || available.shift() || mapped[1] || mapped[0];
    const final3 = chosen3 || available.shift() || mapped[2] || mapped[1] || mapped[0];

    const result = [
      final1 ? { ...final1, isSelectedPromo: !!slot1Id } : null,
      final2 ? { ...final2, isSelectedPromo: !!slot2Id } : null,
      final3 ? { ...final3, isSelectedPromo: !!slot3Id } : null,
    ].filter(Boolean);

    return (result.length > 0 ? result : sortedDefault).slice(0, 3);
  }, [catalogList, config.PROMO_BAR_TARGET_ID, config.PROMO_REPUESTO_1, config.PROMO_REPUESTO_2, config.PROMO_REPUESTO_3]);

  // Selected Active Promotion for the Flash Notification Bar based on Admin Mode
  const activePromo = React.useMemo(() => {
    const mode = (config.PROMO_BAR_MODE || 'auto').toLowerCase();
    const targetId = (config.PROMO_BAR_TARGET_ID || '').trim();

    if (targetId) {
      if (mode === 'repuestos') {
        const found = processedRepuestos.find((r: any) => String(r.id) === targetId || r.partNumber === targetId);
        if (found) return found;
      } else if (mode === 'jornadas') {
        const found = processedJornadas.find((j: any) => String(j.id) === targetId);
        if (found) return found;
      } else {
        const foundJ = processedJornadas.find((j: any) => String(j.id) === targetId);
        if (foundJ) return foundJ;
        const foundR = processedRepuestos.find((r: any) => String(r.id) === targetId || r.partNumber === targetId);
        if (foundR) return foundR;
      }
    }

    if (mode === 'repuestos') {
      return processedRepuestos[0] || null;
    }
    if (mode === 'jornadas') {
      return processedJornadas[0] || null;
    }

    // mode === 'auto'
    const bestJ = processedJornadas[0];
    const bestR = processedRepuestos[0];
    if (bestR && bestR.discountPct > (bestJ?.discountPct || 0)) {
      return bestR;
    }
    return bestJ || bestR || null;
  }, [config.PROMO_BAR_MODE, config.PROMO_BAR_TARGET_ID, processedJornadas, processedRepuestos]);

  // Synchronize the default active tab of the Home Page Promotion Section with the Admin Selection
  useEffect(() => {
    const mode = (config.PROMO_BAR_MODE || '').toLowerCase();
    if (mode === 'jornadas') {
      setPromoSectionTab('jornadas');
    } else {
      setPromoSectionTab('repuestos');
    }
  }, [config.PROMO_BAR_MODE, activePromo?.promoType]);

  const scrollToPromo = (promoId?: string) => {
    if (activePromo?.promoType === 'repuesto') {
      setPromoSectionTab('repuestos');
    } else {
      setPromoSectionTab('jornadas');
    }
    const targetId = promoId ? `promo-${promoId}` : (activePromo ? `promo-${activePromo.id}` : 'seccion-promociones');
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-red-500', 'ring-offset-4', 'dark:ring-offset-slate-900', 'transition-all');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-red-500', 'ring-offset-4', 'dark:ring-offset-slate-900');
        }, 3500);
      } else {
        const sec = document.getElementById('seccion-promociones');
        if (sec) {
          sec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  useEffect(() => {

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      localStorage.removeItem('mastertech_admin_theme');
      localStorage.removeItem('mastertech_theme');
      localStorage.removeItem('theme');
      const saved = localStorage.getItem('mastertech_public_theme');
      if (saved === 'dark') {
        document.documentElement.classList.remove('theme-light', 'light');
        document.body.classList.remove('theme-light', 'light');
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        localStorage.setItem('mastertech_public_theme', 'light');
        document.documentElement.classList.add('theme-light', 'light');
        document.body.classList.add('theme-light', 'light');
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    // SEO setup
    document.title = "MasterTech | Tecnología y Precisión Automotriz";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Taller mecánico en Porlamar, Isla de Margarita. Diagnóstico por scanner, mecánica general y especializada, frenos, aire acondicionado y repuestos de calidad.');

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', 'https://www.tallermastertech.com/');

    // 1. Instant load from localStorage cache via TTL manager
    const cached = getCachedSettings();
    const localData = cached.data;

    if (localData) {
      if (localData.SUCCESS_BADGE && localData.SUCCESS_BADGE.includes('30%')) {
        localData.SUCCESS_BADGE = '¡TIENES HASTA UN 15% DE DESCUENTO!';
      }
      setConfig((prev: any) => ({ ...prev, ...localData }));
      try { if (localData.TEAM_MEMBERS_JSON) setTeamMembers(JSON.parse(localData.TEAM_MEMBERS_JSON)); } catch (e) {}
      try { if (localData.REVIEWS_JSON) setReviews(JSON.parse(localData.REVIEWS_JSON)); } catch (e) {}
      try { if (localData.BRANDS_JSON) setBrands(JSON.parse(localData.BRANDS_JSON)); } catch (e) {}
      try { if (localData.SERVICES_JSON) setServices(JSON.parse(localData.SERVICES_JSON)); } catch (e) {}
      try {
        if (localData.INSTALACIONES_JSON) {
          const p = JSON.parse(localData.INSTALACIONES_JSON);
          if (Array.isArray(p) && p.length > 0) setInstalacionesList(p);
        }
      } catch (e) {}
      try {
        if (localData.JORNADAS_JSON) {
          const p = typeof localData.JORNADAS_JSON === 'string' ? JSON.parse(localData.JORNADAS_JSON) : localData.JORNADAS_JSON;
          if (Array.isArray(p) && p.length > 0) setJornadasList(p);
        }
      } catch (e) {}
      try {
        if (localData.CATALOG_PRODUCTS_JSON) {
          const p = typeof localData.CATALOG_PRODUCTS_JSON === 'string' ? JSON.parse(localData.CATALOG_PRODUCTS_JSON) : localData.CATALOG_PRODUCTS_JSON;
          if (Array.isArray(p) && p.length > 0) setCatalogList(sanitizeCatalogItems(p));
        }
      } catch (e) {}
    }

    // 2. Fetch fresh settings respecting TTL (5 min cache)
    const loadSettings = async (force = false) => {
      try {
        const data = await fetchSettingsWithTTL({ force });
        if (!data || typeof data !== 'object') return;

        if (data.SUCCESS_BADGE && data.SUCCESS_BADGE.includes('30%')) {
          data.SUCCESS_BADGE = '¡TIENES HASTA UN 15% DE DESCUENTO!';
        }

        setConfig((prev: any) => ({ ...prev, ...data }));
        try { if (data.TEAM_MEMBERS_JSON) setTeamMembers(JSON.parse(data.TEAM_MEMBERS_JSON)); } catch (e) {}
        try { if (data.REVIEWS_JSON) setReviews(JSON.parse(data.REVIEWS_JSON)); } catch (e) {}
        try { if (data.BRANDS_JSON) setBrands(JSON.parse(data.BRANDS_JSON)); } catch (e) {}
        try {
          if (data.SERVICES_JSON) setServices(JSON.parse(data.SERVICES_JSON));
          else setServices([]);
        } catch (e) {}
        try {
          if (data.INSTALACIONES_JSON) {
            const p = JSON.parse(data.INSTALACIONES_JSON);
            if (Array.isArray(p) && p.length > 0) setInstalacionesList(p);
          }
        } catch (e) {}
        try {
          if (data.JORNADAS_JSON) {
            const p = typeof data.JORNADAS_JSON === 'string' ? JSON.parse(data.JORNADAS_JSON) : data.JORNADAS_JSON;
            if (Array.isArray(p) && p.length > 0) setJornadasList(p);
          }
        } catch (e) {}
        try {
          if (data.CATALOG_PRODUCTS_JSON) {
            const p = typeof data.CATALOG_PRODUCTS_JSON === 'string' ? JSON.parse(data.CATALOG_PRODUCTS_JSON) : data.CATALOG_PRODUCTS_JSON;
            if (Array.isArray(p) && p.length > 0) setCatalogList(sanitizeCatalogItems(p));
          }
        } catch (e) {}
      } catch (err) {
        console.error("Error cargando configuración dinámica:", err);
      }
    };

    // Revalidate settings in background on mount and focus
    loadSettings(true);

    const handleFocus = () => loadSettings(true);
    window.addEventListener('focus', handleFocus);

    // Live update listener for instant admin updates across tabs
    const handleSettingsUpdated = (e: any) => {
      const updated = e?.detail || e;
      if (updated && typeof updated === 'object') {
        setConfig((prev: any) => ({ ...prev, ...updated }));
        try { if (updated.TEAM_MEMBERS_JSON) setTeamMembers(JSON.parse(updated.TEAM_MEMBERS_JSON)); } catch (err) {}
        try { if (updated.REVIEWS_JSON) setReviews(JSON.parse(updated.REVIEWS_JSON)); } catch (err) {}
        try { if (updated.SERVICES_JSON) setServices(JSON.parse(updated.SERVICES_JSON)); } catch (err) {}
        try {
          if (updated.INSTALACIONES_JSON) {
            const p = JSON.parse(updated.INSTALACIONES_JSON);
            if (Array.isArray(p) && p.length > 0) setInstalacionesList(p);
          }
        } catch (err) {}
        try {
          if (updated.JORNADAS_JSON) {
            const p = typeof updated.JORNADAS_JSON === 'string' ? JSON.parse(updated.JORNADAS_JSON) : updated.JORNADAS_JSON;
            if (Array.isArray(p) && p.length > 0) setJornadasList(p);
          }
        } catch (err) {}
        try {
          if (updated.CATALOG_PRODUCTS_JSON) {
            const p = typeof updated.CATALOG_PRODUCTS_JSON === 'string' ? JSON.parse(updated.CATALOG_PRODUCTS_JSON) : updated.CATALOG_PRODUCTS_JSON;
            if (Array.isArray(p) && p.length > 0) setCatalogList(sanitizeCatalogItems(p));
          }
        } catch (err) {}
      } else {
        loadSettings(true);
      }
    };

    window.addEventListener('mastertech_settings_updated', handleSettingsUpdated);
    window.addEventListener('storage', () => loadSettings(true));

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('mastertech_settings_updated', handleSettingsUpdated);
      window.removeEventListener('storage', () => loadSettings(true));
    };

    // Internal router listener
    const handleHashChange = () => {
      setIsInspeccion(window.location.pathname === '/inspeccion');
      setIsContacto(window.location.pathname === '/contacto');
      setIsFaq(
        window.location.pathname.toLowerCase() === '/faq' ||
        window.location.pathname.toLowerCase() === '/garantia'
      );
      setIsNosotros(window.location.pathname.toLowerCase() === '/nosotros');
      setIsServicios(window.location.pathname.toLowerCase() === '/servicios');
      setIsCatalogo(window.location.pathname.toLowerCase() === '/catalogo');
      setIsJornadas(
        window.location.pathname.toLowerCase() === '/jornada' ||
        window.location.pathname.toLowerCase() === '/jornadas' ||
        window.location.hash === '#jornadas'
      );
      setIsTrabajaConNosotros(
        window.location.pathname.toLowerCase() === '/postulacion' ||
        window.location.hash === '#postulacion'
      );
      setIsPreviewManuales(
        window.location.pathname.toLowerCase() === '/preview-manuales' ||
        window.location.pathname.toLowerCase() === '/manuales-preview' ||
        window.location.search.includes('preview=manuales')
      );
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormErrorMessage('');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (selectedService === 'Línea de inspección gratuita') {
      if (inspectionSlotStr) {
        data.fecha_hora = inspectionSlotStr;
      }
    }

    // Format WhatsApp Direct Link
    const targetPhone = "584123565012";
    let msg = `⚙️ *ORDEN DE ADMISIÓN TÉCNICA // MASTERTECH* 🛠️\n\n`;
    msg += `👤 *Propietario:* ${data.nombre || ''}\n`;
    msg += `📱 *Teléfono:* ${data.telefono || ''}\n`;
    msg += `🚗 *Vehículo:* ${data.vehiculo || 'No especificado'}\n`;
    msg += `🔧 *Servicio:* ${data.servicio || selectedService || 'Diagnóstico e inspección'}\n`;
    if (selectedSymptom) msg += `⚠️ *Síntoma Detectado:* ${selectedSymptom}\n`;
    if (data.fecha_hora) msg += `⏱️ *Turno Solicitado:* ${data.fecha_hora}\n`;
    if (data.falla) msg += `📝 *Observaciones:* ${data.falla}\n`;
    msg += `\n_Solicitud enviada desde el Centro Técnico MasterTech Web._`;

    const generatedWhatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    setWhatsappUrl(generatedWhatsappUrl);

    // Create local lead object immediately for client-side storage
    const localLead = {
      id: Date.now(),
      nombre: String(data.nombre || ''),
      telefono: String(data.telefono || ''),
      vehiculo: String(data.vehiculo || ''),
      servicio: String(data.servicio || ''),
      status: 'Pendiente',
      falla: String(data.falla || data.descripcion || ''),
      fecha_hora: String(data.fecha_hora || ''),
      created_at: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mastertech_leads_store') || '[]');
      existing.unshift(localLead);
      localStorage.setItem('mastertech_leads_store', JSON.stringify(existing.slice(0, 100)));
    } catch (e) {}

    // Auto-open WhatsApp in background
    setTimeout(() => {
      try { window.open(generatedWhatsappUrl, '_blank'); } catch (e) {}
    }, 300);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.lead) {
          try {
            const existing = JSON.parse(localStorage.getItem('mastertech_leads_store') || '[]');
            const filtered = existing.filter((l: any) => l.id !== localLead.id);
            filtered.unshift(json.lead);
            localStorage.setItem('mastertech_leads_store', JSON.stringify(filtered.slice(0, 100)));
          } catch (e) {}
        }
        setFormStatus('success');
      } else {
        if (res.status === 409) {
          const json = await res.json();
          alert(json.error || "El turno seleccionado ya fue reservado por otro usuario. Por favor selecciona otro turno libre.");
          setFormStatus('idle');
          return;
        }
        setFormStatus('success');
      }
    } catch (error) {
      console.warn("Fetch completed with local storage sync:", error);
      setFormStatus('success');
    }
  };

  if (isInspeccion) {
    return <Inspeccion />;
  }

  if (isContacto) {
    return <Contacto />;
  }

  if (isFaq) {
    return <Faq />;
  }

  if (isNosotros) {
    return <Nosotros />;
  }

  if (isServicios) {
    return <Servicios />;
  }

  if (isCatalogo) {
    return <Catalogo />;
  }

  if (isJornadas) {
    return <Jornadas />;
  }

  if (isTrabajaConNosotros) {
    return <TrabajaConNosotros />;
  }

  if (isJeep) {
    return <Jeep />;
  }

  if (isToyota) {
    return <Toyota />;
  }

  if (isPreviewManuales) {
    return <PreviewManuales />;
  }

  return (
    <div className="theme-root min-h-screen selection:bg-red-600 selection:text-white overflow-x-hidden w-full max-w-full font-sans">
      {/* WhatsApp Direct Action Button */}
      <a 
        href={config.WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group border border-white/20"
        title="Atención Directa por WhatsApp"
      >
        <span className="absolute right-full mr-3 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-slate-700">
          Chatear por WhatsApp
        </span>
        <WhatsAppIcon size={24} className="text-white fill-current" />
      </a>

      {/* Navigation with Dropdown Menus */}
      <Navbar activePage="inicio" config={config} />

      {/* =========================================================================
          SECTION 1: HERO - EDITORIAL LIGHT DEALER SHOWCASE
          ========================================================================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 px-4 sm:px-6 overflow-hidden bg-slate-950 text-white transition-colors duration-300 border-b border-slate-800">
        {/* Background Hero Image with 55% dark overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src={config.HERO_IMG || "/assets/instalaciones.webp"} 
            alt="Taller MasterTech Instalaciones" 
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
          />
          {/* Capa de oscuridad al 55% para que la imagen de fondo se aprecie con total claridad */}
          <div className="absolute inset-0 bg-slate-950/55 dark:bg-black/55 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" />
        </div>

        {/* Subtle high-end architectural automotive dot pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 automotive-subtle-pattern z-[1]" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          {/* Status & Location Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-8 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs text-slate-200 shadow-md">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-red-500 shrink-0" />
              <span className="font-medium">Calle Progreso, Av. Circunvalación Nte., Porlamar 6301, Nueva Esparta</span>
            </div>
            {(() => {
              const tallerStatus = getTallerStatus(config.IS_OPEN);
              return (
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${tallerStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span className="font-semibold text-white">
                    {tallerStatus.badgeText}
                  </span>
                </div>
              );
            })()}
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Authoritative Editorial Presentation */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-bold tracking-wider mb-5 uppercase backdrop-blur-md shadow-sm">
                <ShieldCheck size={14} className="text-red-500" />
                <span>TALLER MECÁNICO & CENTRO DE DIAGNÓSTICO</span>
              </div>

              <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-[1.12] drop-shadow-md">
                Tecnología, Precisión y Confianza Automotriz
              </h1>

              <p className="text-slate-200 text-base sm:text-lg mb-8 max-w-xl leading-relaxed font-normal drop-shadow-sm">
                Atención especializada en <strong className="text-white font-bold">Jeep, Toyota y todas las marcas</strong> en Porlamar. Diagnóstico computarizado por escáner de nivel OEM, mecánica integral, climatización y repuestos de alta calidad.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
                <a 
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-7 !py-3.5 text-sm shadow-xl font-bold"
                >
                  <WhatsAppIcon size={18} />
                  <span>CONSULTAR POR WHATSAPP</span>
                  <ArrowRight size={16} />
                </a>

                <a 
                  href="/catalogo" 
                  className="btn-secondary !px-6 !py-3.5 text-sm bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-red-500 shadow-md backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Package size={16} className="text-red-400" />
                  <span>CATÁLOGO DE REPUESTOS</span>
                </a>
              </div>


              {/* 3 Clean Key Trust Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-6 border-t border-white/10">
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-sm text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-white">+6 Puestos</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Atención Simultánea</div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-sm text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-white">Escáner OEM</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Diagnóstico Preciso</div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-sm text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-white">+1.850</div>
                  <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Vehículos Atendidos</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column: Workshop Video Showcase (Native HTML5 Video + Pure CSS) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 relative w-full flex justify-center items-center"
            >
              {(() => {
                const reelUrl = (config.HERO_REEL_URL || '').trim();
                const instagramId = getInstagramReelId(reelUrl);
                const youTubeId = getYouTubeId(reelUrl);
                const isInstagram = Boolean(instagramId);
                const isYouTube = Boolean(youTubeId);
                const directVideoSrc = isDirectVideoUrl(reelUrl) ? reelUrl : "/assets/taller_video.mp4";

                return (
                  <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl group flex items-center justify-center">
                    {isInstagram ? (
                      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center">
                        <iframe 
                          src={`https://www.instagram.com/reel/${instagramId}/embed/`}
                          title="Instagram Reel Taller MasterTech"
                          className="border-0 select-none bg-black pointer-events-auto"
                          style={{
                            position: 'absolute',
                            width: '138%',
                            height: '150%',
                            top: '-92px',
                            left: '-19%',
                            maxWidth: 'none'
                          }}
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                          scrolling="no"
                        />
                      </div>

                    ) : isYouTube ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=1`}
                        title="Video YouTube Taller MasterTech"
                        className="w-full h-full border-0 select-none bg-black"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <video 
                          ref={heroVideoRef}
                          src={directVideoSrc} 
                          autoPlay 
                          loop 
                          muted={isVideoMuted}
                          playsInline
                          preload="auto"
                          className="w-full h-full object-cover select-none"
                        />

                        {/* Audio Toggle Button for Native Video */}
                        <button
                          type="button"
                          onClick={() => {
                            if (heroVideoRef.current) {
                              heroVideoRef.current.muted = !isVideoMuted;
                              setIsVideoMuted(!isVideoMuted);
                            }
                          }}
                          className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer z-20"
                          title={isVideoMuted ? "Activar audio" : "Silenciar audio"}
                        >
                          {isVideoMuted ? <VolumeX size={15} className="text-slate-300" /> : <Volume2 size={15} className="text-emerald-400" />}
                        </button>
                      </>
                    )}

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg select-none z-20 pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                      <span>{isInstagram ? "Reel de Instagram" : isYouTube ? "Video de YouTube" : "Video del Taller"}</span>
                    </div>

                    {/* Bottom Dark Protection Mask (Completely eliminates any white Instagram card bleed) */}
                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-black/90 backdrop-blur-sm z-15 pointer-events-none border-t border-white/10" />

                    {/* Bottom Info & Instagram Direct Link */}
                    <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                      <p className="text-white text-xs font-bold leading-tight drop-shadow">Taller MasterTech</p>
                      <p className="text-slate-300 text-[10px]">Porlamar, Margarita</p>
                    </div>

                    <a 
                      href={isInstagram ? reelUrl : (config.INSTAGRAM_LINK || "https://www.instagram.com/tallermastertech/")} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="absolute bottom-3 right-3 bg-black/90 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg z-20 flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 backdrop-blur-sm border border-white/20 cursor-pointer"
                    >
                      <Instagram size={13} className="text-pink-400" />
                      <span>{isInstagram ? "Ver en Instagram" : "Instagram"}</span>
                      <ExternalLink size={11} className="text-slate-400" />
                    </a>
                  </div>
                );
              })()}
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          BARRA DE NOTIFICACIÓN DE PROMOCIÓN FLASH (CONFIGURABLE: JORNADAS O REPUESTOS)
          ========================================================================= */}
      {activePromo && (
        <aside aria-label="Promoción destacada" className="relative z-20 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 dark:from-red-950 dark:via-red-900/95 dark:to-amber-950 border-y border-red-500/40 shadow-md text-white transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3.5 text-center md:text-left flex-wrap md:flex-nowrap justify-center">
              <span className="inline-flex items-center gap-1.5 bg-black/35 backdrop-blur-sm border border-white/20 px-2.5 py-1 rounded-full text-[11px] font-black tracking-wider uppercase text-amber-300 shadow-sm shrink-0">
                {activePromo.promoType === 'repuesto' ? (
                  <>
                    <Package size={14} className="text-amber-400" />
                    <span>{config.PROMO_BAR_BADGE_TEXT || "OFERTA EN REPUESTO OEM"}</span>
                  </>
                ) : (
                  <>
                    <Flame size={14} className="text-amber-400 animate-pulse" />
                    <span>{config.PROMO_BAR_BADGE_TEXT || "OFERTA DESTACADA"}</span>
                  </>
                )}
              </span>
              
              <div className="flex items-center gap-2 flex-wrap justify-center text-xs sm:text-sm">
                <span className="bg-white text-red-700 font-black px-2.5 py-0.5 rounded shadow-sm tracking-wide shrink-0">
                  {activePromo.discountPct > 0 ? `-${activePromo.discountPct}% OFF` : (activePromo.discountBadge || (activePromo.promoType === 'repuesto' ? "PRECIO ESPECIAL" : "OFERTA"))}
                </span>
                <span className="font-bold text-white/95 drop-shadow-sm">
                  {activePromo.title}
                </span>
                {(activePromo.promoPrice || activePromo.regularPrice || activePromo.price) && (
                  <span className="font-semibold text-amber-200 flex items-center gap-1.5 ml-1">
                    {activePromo.regularPrice && (
                      <span className="line-through text-white/60 text-xs">{activePromo.regularPrice}</span>
                    )}
                    <span className="text-white font-extrabold text-sm">{activePromo.promoPrice || activePromo.price}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activePromo.promoType === 'repuesto' ? (
                <>
                  <a
                    href={`/catalogo?search=${encodeURIComponent(activePromo.partNumber || activePromo.title)}`}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-amber-50 active:scale-95 text-red-700 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow transition-all cursor-pointer group"
                  >
                    <span>{config.PROMO_BAR_BTN_TEXT || "Ver Repuesto"}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="/catalogo"
                    className="hidden sm:inline-flex items-center gap-1 text-xs text-white/80 hover:text-white underline underline-offset-4 px-2 py-1"
                  >
                    <span>{config.PROMO_BAR_LINK_TEXT || "Catálogo de repuestos"}</span>
                  </a>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => scrollToPromo(activePromo.id)}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-amber-50 active:scale-95 text-red-700 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow transition-all cursor-pointer group"
                  >
                    <span>{config.PROMO_BAR_BTN_TEXT || "Aprovechar Descuento"}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToPromo()}
                    className="hidden sm:inline-flex items-center gap-1 text-xs text-white/80 hover:text-white underline underline-offset-4 px-2 py-1 cursor-pointer"
                  >
                    <span>{config.PROMO_BAR_LINK_TEXT || "Ver todas"}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* =========================================================================
          SECTION 2: CENTROS DE ATENCIÓN Y RECURSOS
          ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50 dark:bg-[#0e1218] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-2">
              CENTROS DE ATENCIÓN Y RECURSOS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ¿Qué Necesita tu Vehículo Hoy?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Accede directamente a la información técnica o solicita atención según tu marca o requerimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Portal Jeep */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-sm">
                  <Car size={24} />
                </div>
                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">Especialidad</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Jeep & RAM</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Mecánica de motor Pentastar 3.6L y HEMI 5.7L, enfriadores de aceite de aluminio, cajas ZF y tracción 4x4.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 select-none">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>Escáner OEM & Repuestos Mopar</span>
              </div>
            </div>

            {/* 2. Portal Toyota */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-sm">
                  <Wrench size={24} />
                </div>
                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">Especialidad</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Toyota Margarita</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Mantenimiento de motores diésel 1GD/2GD D-4D, V6 1GR, Hilux, Fortuner, 4Runner, Prado y Land Cruiser.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 select-none">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>Techstream & Repuestos Genuinos</span>
              </div>
            </div>

            {/* 3. Portal Cita de Revisión */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">Diagnóstico Especializado</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cita de Revisión</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Revisión preventiva y asesoría especializada con presupuesto previo antes de cualquier intervención.
                </p>
              </div>
              <a href="/contacto" className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                <span>Solicitar Cita de Revisión</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* 4. Portal Catálogo de Repuestos & Autopartes */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-sm">
                  <Package size={24} />
                </div>
                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">Stock & Encargo</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Catálogo de Repuestos</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Frenos cerámicos, amortiguadores, lubricantes sintéticos y piezas OEM en Margarita o importación express desde EE.UU.
                </p>
              </div>
              <a href="/catalogo" className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                <span>Ver Catálogo de Repuestos</span>
                <ArrowRight size={14} />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECCIÓN DE PROMOCIONES Y JORNADAS ESPECIALES
          ========================================================================= */}
      <section id="seccion-promociones" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-100/80 dark:bg-[#090b0e] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Flame size={14} className="text-red-500 animate-pulse" />
                <span>{config.PROMO_SECTION_BADGE || "OFERTAS Y PROMOCIONES VIGENTES"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {promoSectionTab === 'jornadas'
                  ? (config.PROMO_SECTION_TITLE_JORNADAS || 'Jornadas VIP y Descuentos Especiales')
                  : (config.PROMO_SECTION_TITLE_REPUESTOS || 'Ofertas en Repuestos OEM y Accesorios')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                {promoSectionTab === 'jornadas'
                  ? (config.PROMO_SECTION_DESC_JORNADAS || 'Cupos limitados con precios promocionales en reprogramación de software, soluciones de emisiones y confort automotriz garantizado en Margarita.')
                  : (config.PROMO_SECTION_DESC_REPUESTOS || 'Descuentos exclusivos en repuestos originales OEM certificados, sensores de asistencia avanzada e insumos automotrices garantizados.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-start md:self-auto shrink-0">
              {promoSectionTab === 'jornadas' ? (
                <a 
                  href="/jornadas" 
                  className="btn-secondary !px-5 !py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Ver Catálogo de Jornadas</span>
                  <ArrowRight size={14} />
                </a>
              ) : (
                <a 
                  href="/catalogo" 
                  className="btn-secondary !px-5 !py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Ver Catálogo de Repuestos</span>
                  <ArrowRight size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {promoSectionTab === 'jornadas' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {processedJornadas.slice(0, 3).map((item: any, idx: number) => {
                const baseWa = config?.WHATSAPP_LINK 
                  ? config.WHATSAPP_LINK.split('?')[0] 
                  : 'https://wa.me/584123565012';
                const waMessage = `Hola Taller MasterTech, deseo agendar la promoción de ${item.title} con el precio especial de ${item.promoPrice || 'descuento'}.`;
                const waHref = `${baseWa}?text=${encodeURIComponent(waMessage)}`;
                const isTop = idx === 0 && (item.discountPct > 0 || item.isSelectedPromo);

                return (
                  <div 
                    key={item.id || idx}
                    id={`promo-${item.id}`}
                    className={`relative rounded-3xl bg-white dark:bg-[#13171f] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl group ${
                      isTop 
                        ? 'border-red-500/80 ring-2 ring-red-500/30' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* Top highlight badge for maximum discount or selected promo */}
                    {isTop && (
                      <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider py-1.5 px-4 text-center flex items-center justify-center gap-1.5 shadow-sm">
                        <Flame size={13} className="text-amber-300 animate-pulse" />
                        <span>{item.isSelectedPromo ? "OFERTA DESTACADA EN PORTADA" : "MAYOR DESCUENTO ACTIVO"}</span>
                      </div>
                    )}

                    <div>
                      {/* Image Container with Badges */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 group/img">
                        <img 
                          src={item.img || "/assets/servicio-mecanica.webp"} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                          {item.badge}
                        </div>

                        {/* Prominent Discount Badge */}
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-red-400 flex items-center gap-1">
                          <Tag size={12} />
                          <span>{item.discountPct > 0 ? `-${item.discountPct}% OFF` : item.discountBadge}</span>
                        </div>

                        {/* Pricing Tag Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <div>
                            {item.regularPrice && (
                              <span className="text-slate-300 line-through text-xs block font-medium">
                                Precio Normal: {item.regularPrice}
                              </span>
                            )}
                            <span className="text-2xl font-black text-white tracking-tight drop-shadow">
                              {item.promoPrice}
                            </span>
                          </div>
                          {item.duration && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 font-medium">
                              <Clock size={12} className="text-red-400" />
                              <span>{item.duration}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                          {item.subtitle}
                        </p>

                        {/* Benefits List */}
                        {item.benefits && item.benefits.length > 0 && (
                          <div className="space-y-2 mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                            {item.benefits.slice(0, 3).map((benefit: string, bIdx: number) => (
                              <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span className="leading-tight">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Compatible Models */}
                        {item.compatibleModels && (
                          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-2.5 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-1.5 mb-2">
                            <Car size={13} className="text-red-500 shrink-0 mt-0.5" />
                            <span className="leading-tight line-clamp-2">
                              <strong className="text-slate-800 dark:text-slate-200 font-semibold">Modelos:</strong> {item.compatibleModels}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions Block */}
                    <div className="p-6 pt-0">
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <MessageCircle size={16} />
                        <span>Reservar Cupo con Descuento</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {processedRepuestos.slice(0, 3).map((item: any, idx: number) => {
                const baseWa = config?.WHATSAPP_LINK 
                  ? config.WHATSAPP_LINK.split('?')[0] 
                  : 'https://wa.me/584123565012';
                const waMessage = `Hola Taller MasterTech, deseo consultar la oferta del repuesto: ${item.title} (OEM ${item.partNumber || 'N/A'}) con el precio especial de ${item.promoPrice || item.price}.`;
                const waHref = `${baseWa}?text=${encodeURIComponent(waMessage)}`;
                const isTop = idx === 0 && (item.discountPct > 0 || item.isSelectedPromo);

                return (
                  <div 
                    key={item.id || idx}
                    id={`promo-${item.id}`}
                    className={`relative rounded-3xl bg-white dark:bg-[#13171f] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl group ${
                      isTop 
                        ? 'border-red-500/80 ring-2 ring-red-500/30' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* Top highlight badge */}
                    {isTop && (
                      <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider py-1.5 px-4 text-center flex items-center justify-center gap-1.5 shadow-sm">
                        <Flame size={13} className="text-amber-300 animate-pulse" />
                        <span>{item.isSelectedPromo ? "OFERTA DESTACADA EN PORTADA" : "MEJOR DESCUENTO EN REPUESTOS"}</span>
                      </div>
                    )}

                    <div>
                      {/* Image Container with Badges */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 group/img">
                        <img 
                          src={item.img || "/assets/cat_frenos_discos.webp"} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                          {item.category || item.badge || 'Repuesto OEM'}
                        </div>

                        {/* Prominent Discount Badge */}
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-red-400 flex items-center gap-1">
                          <Tag size={12} />
                          <span>{item.discountPct > 0 ? `-${item.discountPct}% OFF` : (item.discountBadge || 'OFERTA')}</span>
                        </div>

                        {/* Pricing Tag Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <div>
                            {item.regularPrice && (
                              <span className="text-slate-300 line-through text-xs block font-medium">
                                Regular: {item.regularPrice}
                              </span>
                            )}
                            <span className="text-2xl font-black text-white tracking-tight drop-shadow">
                              {item.promoPrice || item.price}
                            </span>
                          </div>
                          {item.partNumber && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 font-mono font-bold">
                              <span>OEM #{item.partNumber}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded border border-red-200 dark:border-red-900/40">
                            {item.badge || 'OEM Importado'}
                          </span>
                          {item.stock !== undefined && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                              Stock: {item.stock} disponibles
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>

                        {/* Specs List */}
                        {item.specs && item.specs.length > 0 && (
                          <div className="space-y-1.5 mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                            {item.specs.slice(0, 3).map((spec: string, sIdx: number) => (
                              <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                                <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span className="leading-tight line-clamp-1">{spec}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Compatible Models */}
                        {item.compatibility && (
                          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-2.5 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-1.5 mb-2">
                            <Car size={13} className="text-red-500 shrink-0 mt-0.5" />
                            <span className="leading-tight line-clamp-2">
                              <strong className="text-slate-800 dark:text-slate-200 font-semibold">Compatibilidad:</strong> {item.compatibility}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions Block */}
                    <div className="p-6 pt-0 space-y-2">
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <MessageCircle size={16} />
                        <span>Consultar / Comprar Oferta</span>
                      </a>
                      <a
                        href={`/catalogo?search=${encodeURIComponent(item.partNumber || item.title)}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 font-semibold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer"
                      >
                        <span>Ver Ficha Técnica en Catálogo</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: NUESTRAS INSTALACIONES Y TRABAJO EN ACCIÓN (SHOWCASE REAL)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#0b0d11] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-1">
                INSTALACIONES & CAPACIDAD TÉCNICA
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Trabajo Real en Nuestros Puestos de Trabajo
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                6 puestos de trabajo con elevadores hidráulicos de 4 toneladas, escáner de nivel OEM y técnicos uniformados en Porlamar.
              </p>
            </div>
            <a 
              href="/nosotros" 
              className="btn-secondary !px-5 !py-2.5 text-xs font-bold flex items-center gap-2 self-start md:self-auto"
            >
              <span>Conocer el Taller y Equipo</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instalacionesList.map((item, idx) => {
              const serviceHref = item.servicioId 
                ? `/servicios#${item.servicioId}` 
                : '/servicios';
              const targetTitle = item.servicioNombre || item.title || 'Servicio Automotriz';
              const baseWa = config?.WHATSAPP_LINK 
                ? config.WHATSAPP_LINK.split('?')[0] 
                : 'https://wa.me/584123565012';
              const waHref = `${baseWa}?text=${encodeURIComponent(`Hola Taller MasterTech, deseo consultar y agendar el servicio de ${targetTitle}`)}`;

              return (
                <div key={item.id || idx} className="group rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <a href={serviceHref} className="block relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900 group/img">
                      <img 
                        src={item.img || "/assets/instalaciones.webp"} 
                        alt={item.title || "Puesto de trabajo MasterTech"} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.badge && (
                        <span className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase border border-white/20 ${
                          item.badge.toLowerCase().includes('oem') || item.badge.toLowerCase().includes('diagn')
                            ? 'bg-red-600 shadow-md border-transparent'
                            : 'bg-slate-900/90'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                          <span>Ver Servicio</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </a>

                    <div className="p-5 pb-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                        <a href={serviceHref} className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                          {item.title}
                        </a>
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-3 mt-2">
                    {item.feature && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{item.feature}</span>
                      </div>
                    )}

                    <div className="pt-1 flex items-center gap-2">
                      <a 
                        href={serviceHref}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 group/btn"
                      >
                        <span>Ver Servicio</span>
                        <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                      <a 
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white dark:text-emerald-400 transition-colors flex items-center justify-center"
                        title={`Agendar ${targetTitle}`}
                      >
                        <WhatsAppIcon size={16} className="fill-current" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: LLAMADO A LA ACCIÓN & CONTACTO RÁPIDO
          ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-slate-900 text-white transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
                ATENCIÓN PROFESIONAL EN MARGARITA
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight">
                SOLICITA TU CITA DE REVISIÓN <br />
                <span className="text-red-500">EN TALLER MASTERTECH</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                Revisión preventiva y asesoría especializada con presupuesto previo antes de cualquier intervención.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-red-500" />
                  <span>Calle Progreso, Av. Circunvalación Nte., Porlamar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-red-500" />
                  <span>Lun a Vie 8:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              <a 
                href={config.WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-7 !py-4 text-sm font-bold justify-center shadow-lg"
              >
                <WhatsAppIcon size={18} />
                <span>Chatear por WhatsApp</span>
              </a>

              <a 
                href="/contacto" 
                className="btn-secondary !px-7 !py-3.5 text-xs font-semibold justify-center bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <span>Agendar Cita en Línea</span>
              </a>
            </div>
          </div>

        </div>
      </section>










      {/* =========================================================================
          SECTION 6: REPUTACIÓN AUDITADA GOOGLE BUSINESS
          ========================================================================= */}
      <GoogleReviewsWidget googleBusinessUrl={config.GOOGLE_MAPS_LINK} />





      {/* =========================================================================
          SECTION 7: EDITORIAL FOOTER
          ========================================================================= */}
      <footer className="theme-footer border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 px-4 sm:px-6 bg-slate-950 text-slate-400">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={config.LOGO_URL || "/logo.png"} alt="MasterTech" className="h-8 w-auto object-contain" />
                <span className="font-display font-extrabold text-xl tracking-tight uppercase text-white">
                  MASTER<span className="text-red-500">TECH</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
                Taller mecánico automotriz y centro de servicio especializado en Porlamar, Isla de Margarita. Diagnóstico por escáner, mecánica integral y climatización.
              </p>
              <div className="flex gap-3">
                <a 
                  href={config.INSTAGRAM_LINK || "https://www.instagram.com/tallermastertech/"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                  title="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href={config.TIKTOK_LINK || "https://www.tiktok.com/@tallermastertech"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                  title="TikTok"
                >
                  <TikTokIcon size={16} />
                </a>
                <a 
                  href={config.YOUTUBE_LINK || "https://www.youtube.com/@tallermastertech"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                  title="YouTube"
                >
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                ENLACES RÁPIDOS
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="/servicios" className="hover:text-red-400 transition-colors">Servicios Mecánicos</a></li>
                <li><span className="text-slate-500 cursor-default">Manuales por Motor (Próximamente)</span></li>
                <li><a href="/jeep" className="hover:text-red-400 transition-colors">Especialista Jeep Margarita</a></li>
                <li><a href="/toyota" className="hover:text-red-400 transition-colors">Especialista Toyota Margarita</a></li>
                <li><a href="/catalogo" className="hover:text-red-400 transition-colors">Repuestos y Fluidos</a></li>
                <li><a href="/faq" className="hover:text-red-400 transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                UBICACIÓN & CONTACTO
              </h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex gap-2.5">
                  <MapPin size={15} className="text-red-500 shrink-0 mt-0.5" />
                  <span>Calle Progreso, Av. Circunvalación Nte., Porlamar 6301, Nueva Esparta.</span>
                </li>
                <li className="flex gap-2.5">
                  <Clock size={15} className="text-red-500 shrink-0 mt-0.5" />
                  <span>Lun a Vie: 8:00 AM – 5:00 PM</span>
                </li>
                <li>
                  <a 
                    href={config.WHATSAPP_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex gap-2.5 hover:text-red-400 transition-colors font-bold text-white"
                  >
                    <Phone size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <span>{config.PHONE_NUMBER}</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Taller MasterTech C.A. Todos los derechos reservados. Porlamar, Isla de Margarita.</p>
            <div className="flex gap-6">
              <a href="/faq" className="hover:text-slate-300 transition-colors">Términos de Garantía</a>
              <a href="/contacto" className="hover:text-slate-300 transition-colors">Contacto</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Hideable Bubble Widget: Live Exchange Rates & Budget Calculator */}
      <BrechaCambiariaPanel />

      {/* MT-01 · Especialista MasterTech — AI Automotive Advisor & VIN Decoder */}
      <MT01AdvisorModal />
    </div>
  );
}
