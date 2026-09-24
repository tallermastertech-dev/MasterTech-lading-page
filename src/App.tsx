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
  Disc
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InspectionSlotPicker from './InspectionSlotPicker';
import { getTallerStatus } from './utils/tallerStatus';
import Inspeccion from './Inspeccion';
import Contacto from './Contacto';
import Faq from './Faq';
import Nosotros from './Nosotros';
import Servicios from './Servicios';
import Catalogo from './Catalogo';
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

function isDirectVideoUrl(url?: string): boolean {
  if (!url) return false;
  const clean = (url || '').trim().toLowerCase();
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.mov') || clean.includes('/assets/') || clean.startsWith('data:video');
}

function getInstagramEmbedUrl(url?: string): string {
  if (!url || !url.trim()) {
    return "https://www.instagram.com/reel/DYQxwH6jywd/embed";
  }

  let cleanUrl = url.trim();

  // 1. If user pasted an <iframe> HTML snippet, extract the src attribute
  if (cleanUrl.includes('<iframe') && cleanUrl.includes('src=')) {
    const srcMatch = cleanUrl.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      cleanUrl = srcMatch[1];
    }
  }

  // 2. If it's already a complete embed URL
  if (cleanUrl.includes('/embed')) {
    return cleanUrl;
  }

  // 3. Strip trailing query parameters like ?igsh=...
  const urlWithoutQuery = cleanUrl.split('?')[0];

  // 4. Match /reel/, /reels/, /p/, /tv/ followed by media ID
  const match = urlWithoutQuery.match(/(?:reels?|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (match && match[1]) {
    return `https://www.instagram.com/reel/${match[1]}/embed`;
  }

  // 5. Fallback for segment extraction
  const segments = urlWithoutQuery.replace(/\/$/, '').split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  if (lastSegment && lastSegment.length >= 5 && !lastSegment.includes('instagram') && !lastSegment.includes('www.')) {
    return `https://www.instagram.com/reel/${lastSegment}/embed`;
  }

  return cleanUrl.endsWith('/') ? `${cleanUrl}embed` : `${cleanUrl}/embed`;
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
  HERO_REEL_URL: "https://www.instagram.com/reel/DYQxwH6jywd/",
  GOOGLE_MAPS_EMBED: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.5!2d-63.8681155!3d10.9701683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c318fe358d81b01%3A0xf0c67c88a5063093!2sTaller%20MasterTech!5e0!3m2!1ses!2sve!4v1700000000000!5m2!1ses!2sve",
  GOOGLE_BUSINESS_URL: "https://maps.app.goo.gl/fybS1jW9buxQD5gv7",
  HERO_IMG: "/assets/instalaciones.webp",
  LOGO_URL: "/logo.png", 
  BEFORE_AFTER_1: "/assets/before_after_1.webp",
  BEFORE_AFTER_2: "/assets/before_after_2.webp",
  SUCCESS_BADGE: "¡TIENES HASTA UN 15% DE DESCUENTO!",
  SUCCESS_TEXT: "Un técnico especialista se comunicará contigo vía WhatsApp en breve para coordinar tu descuento y cita."
};

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
  const [activeBayTab, setActiveBayTab] = useState<number>(0);

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

  // Dynamic JSON arrays for team, reviews, and brands
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [brands, setBrands] = useState<string[]>([
    "Jeep", "Toyota", "Honda", "Dodge", "Nissan", "Chrysler", "Lexus"
  ]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mastertech_public_theme') || localStorage.getItem('mastertech_admin_theme') || localStorage.getItem('mastertech_theme');
      if (saved === 'light') {
        document.documentElement.classList.add('theme-light', 'light');
        document.body.classList.add('theme-light', 'light');
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('theme-light', 'light');
        document.body.classList.remove('theme-light', 'light');
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
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
      } catch (err) {
        console.error("Error cargando configuración dinámica:", err);
      }
    };

    // Call loadSettings (will skip network request if cache is within TTL)
    loadSettings();

    // Live update listener for instant admin updates across tabs
    const handleSettingsUpdated = (e: any) => {
      const updated = e?.detail || e;
      if (updated && typeof updated === 'object') {
        setConfig((prev: any) => ({ ...prev, ...updated }));
        try { if (updated.TEAM_MEMBERS_JSON) setTeamMembers(JSON.parse(updated.TEAM_MEMBERS_JSON)); } catch (err) {}
        try { if (updated.REVIEWS_JSON) setReviews(JSON.parse(updated.REVIEWS_JSON)); } catch (err) {}
        try { if (updated.SERVICES_JSON) setServices(JSON.parse(updated.SERVICES_JSON)); } catch (err) {}
      } else {
        loadSettings(true);
      }
    };
    window.addEventListener('mastertech_settings_updated', handleSettingsUpdated);
    window.addEventListener('storage', () => loadSettings(true));

    return () => {
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
    <div className="theme-root min-h-screen selection:bg-amber-500 selection:text-black overflow-x-hidden w-full max-w-full font-sans">
      {/* WhatsApp Direct Action Button */}
      <a 
        href={config.WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group border border-emerald-400/40"
        title="Asesoría Técnica Inmediata"
      >
        <span className="absolute right-full mr-3 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-slate-700">
          WHATSAPP TÉCNICO
        </span>
        <WhatsAppIcon size={24} className="text-white fill-current" />
      </a>

      {/* Navigation with Dropdown Menus */}
      <Navbar activePage="inicio" config={config} />

      {/* =========================================================================
          SECTION 1: INDUSTRIAL COCKPIT HERO
          ========================================================================= */}
      <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 px-4 sm:px-6 overflow-hidden min-h-[calc(100vh-60px)] flex flex-col justify-center bg-slate-50 dark:bg-[#090b0e] transition-colors duration-300 automotive-grid">
        {/* Workshop Ambient Background & Precise Vignette */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img 
            src={config.HERO_IMG || "/assets/hero_bg_custom.webp"} 
            alt="MasterTech Centro Automotriz" 
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-15 dark:opacity-30 mix-blend-luminosity filter contrast-125" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#090b0e] dark:via-[#090b0e]/95 dark:to-[#090b0e]/70 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50/70 dark:from-[#090b0e] dark:via-transparent dark:to-[#090b0e]/70 transition-colors duration-300" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          {/* Telemetry Status Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-mono tracking-wider text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-none rotate-45 bg-amber-500 inline-block" />
              <span>ISLA DE MARGARITA // LAT: 10.9701° N · LON: 63.8681° W</span>
            </div>
            {(() => {
              const tallerStatus = getTallerStatus(config.IS_OPEN);
              return (
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${tallerStatus.dotColor} ${tallerStatus.isOpen ? 'animate-ping' : ''}`} />
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {tallerStatus.badgeText} · RECEPCIÓN ACTIVA
                  </span>
                </div>
              );
            })()}
            <div className="hidden md:flex items-center gap-2 text-slate-400">
              <Terminal size={12} className="text-amber-500" />
              <span>CENTRO DE INGENIERÍA & DIAGNÓSTICO</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Authoritative Editorial Presentation */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-wider mb-4 uppercase">
                <Cpu size={13} className="text-amber-500" />
                <span>ESPECIALISTAS EN PLATAFORMAS JAPONESAS Y AMERICANAS</span>
              </div>

              <h1 className="text-slate-900 dark:text-white text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase leading-[1.06]">
                INGENIERÍA & DIAGNÓSTICO <br />
                <span className="text-amber-500 dark:text-amber-400">AUTOMOTRIZ DE PRECISIÓN</span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg mb-8 max-w-xl leading-relaxed font-normal">
                Centro técnico especializado con osciloscopios de 4 canales, escaneo computarizado de grado concesionario, laboratorio de inyección GDI / Common Rail y calibración de transmisiones automáticas y CVT. <strong>Cero adivinanzas:</strong> analizamos el flujo de datos en tiempo real bajo tolerancias de fábrica.
              </p>

              {/* Action Buttons: Solid Architectural Style */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
                <a 
                  href="#admision" 
                  className="btn-primary !px-7 !py-3.5 text-xs sm:text-sm shadow-md"
                >
                  <Calendar size={16} />
                  <span>AGENDAR ADMISIÓN TÉCNICA</span>
                  <ArrowRight size={16} />
                </a>

                <a 
                  href="/preview-manuales" 
                  className="btn-secondary !px-6 !py-3.5 text-xs sm:text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 text-slate-800 dark:text-slate-100 shadow-sm"
                >
                  <BookOpen size={16} className="text-amber-500" />
                  <span>MANUALES POR MOTOR (5.000 KM)</span>
                </a>
              </div>

              {/* 4 Precision Telemetry Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80">
                  <div className="text-base sm:text-lg font-black text-amber-500 font-mono">100% OEM</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase leading-tight mt-0.5">Fluidos & Repuestos</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80">
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">&lt; 48 HORAS</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase leading-tight mt-0.5">Diagnóstico Complejo</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80">
                  <div className="text-base sm:text-lg font-black text-emerald-500 font-mono">6 MESES</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase leading-tight mt-0.5">Garantía Escrita</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80">
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">+1.850</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase leading-tight mt-0.5">Órdenes Atendidas</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column: Workshop Telemetry Display (CCTV / Diagnostic Bay Feed) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none mx-auto"
            >
              {/* Industrial Frame Chassis */}
              <div className="relative bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 shadow-2xl overflow-hidden tech-crosshair">
                
                {/* Telemetry Header on Monitor */}
                <div className="flex items-center justify-between px-3 py-1.5 mb-2 bg-black/80 border border-slate-800 rounded text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-red-500 font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>REC // FEED BAHÍA 01</span>
                  </div>
                  <span className="text-slate-400">CAM-01 [DIAGNÓSTICO EN VIVO]</span>
                </div>

                {/* Video Window */}
                <div className="w-full aspect-[9/16] rounded-lg overflow-hidden bg-black relative flex items-center justify-center border border-slate-800">
                  {isDirectVideoUrl(config.HERO_REEL_URL) ? (
                    <video 
                      src={config.HERO_REEL_URL}
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      preload="auto"
                      controls={false}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full overflow-hidden relative bg-black flex items-center justify-center">
                      <iframe 
                        key={getInstagramEmbedUrl(config.HERO_REEL_URL)}
                        src={getInstagramEmbedUrl(config.HERO_REEL_URL)}
                        className="w-[130%] h-[145%] border-0 pointer-events-auto shrink-0"
                        style={{
                          transform: 'scale(1.42)',
                          transformOrigin: 'center 50%',
                          marginTop: '65%'
                        }}
                        allowTransparency={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        scrolling="no"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="MasterTech Taller Reel"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
                      
                      <a 
                        href={config.HERO_REEL_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/95 hover:bg-black text-white border border-slate-700 text-xs font-mono font-bold px-3.5 py-1.5 rounded z-20 flex items-center gap-2 transition-all shadow-xl hover:scale-105 whitespace-nowrap"
                      >
                        <Instagram size={14} className="text-amber-500" />
                        <span>VER EN INSTAGRAM</span>
                        <ExternalLink size={12} className="text-slate-400" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Monitor Footer Telemetry */}
                <div className="flex items-center justify-between px-2 pt-2 text-[10px] font-mono text-slate-500">
                  <span>SISTEMA: OSCILOSCOPIO + ESCÁNER</span>
                  <span>PROCEDIMIENTO ISO-TALLER</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2: MATRIZ DE PLATAFORMAS & MOTORIZACIONES (No AI Ticker)
          ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white dark:bg-[#0c0f15] border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-1.5">
                <Wrench size={13} />
                <span>ESPECIALIZACIÓN POR FABRICANTE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                PLATAFORMAS Y ARQUITECTURAS ATENDIDAS
              </h2>
            </div>
            <a 
              href="/preview-manuales" 
              className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5 uppercase"
            >
              <span>Ver todos los manuales y tolerancias</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Toyota */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-red-500 font-mono tracking-wider">TOYOTA</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20 font-bold uppercase">Gasolina & Diésel</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">D-4D, DUAL VVT-i & DYNAMIC FORCE</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Hilux, Fortuner, 4Runner, Prado, Land Cruiser 70/200, Corolla, RAV4</p>
                <div className="text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60">
                  <div><strong>Motores:</strong> 1GD-FTV (2.8L), 1GR-FE (4.0L V6), M20A (2.0L)</div>
                  <div><strong>Puntos Clave:</strong> Doble purga de sedimentador cada 2.500 km, cajas Direct-Shift CVT K120 y engrase de 6 crucetas cardán.</div>
                </div>
              </div>
              <a href="/preview-manuales?brand=toyota" className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-amber-500 hover:underline flex items-center justify-between">
                <span>CONSULTAR FICHA TOYOTA</span>
                <ChevronRight size={14} />
              </a>
            </div>

            {/* 2. Jeep & RAM */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-amber-500 font-mono tracking-wider">JEEP / RAM</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase">Gasolina V6 & V8</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">PENTASTAR & HEMI MDS</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Grand Cherokee WK2/WL, Wrangler JK/JL, Gladiator JT, RAM 1500</p>
                <div className="text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60">
                  <div><strong>Motores:</strong> 3.6L Pentastar V6 24V, 5.7L HEMI V8 MDS</div>
                  <div><strong>Puntos Clave:</strong> Sustitución de base plástica de enfriador de aceite en la V, aceite estricto MS-6395 y cajas ZF 8HP.</div>
                </div>
              </div>
              <a href="/jeep" className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-amber-500 hover:underline flex items-center justify-between">
                <span>CONSULTAR ESPECIALIDAD JEEP</span>
                <ChevronRight size={14} />
              </a>
            </div>

            {/* 3. Nissan */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-rose-500 font-mono tracking-wider">NISSAN</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20 font-bold uppercase">Gasolina GDI & Diésel</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">XTRONIC CVT & DIG / YD25</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Sentra B17/B18, Frontier / Navara, X-Trail, Versa, Kicks</p>
                <div className="text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60">
                  <div><strong>Motores:</strong> 2.0L MR20DD, 1.6L HR16DE, 2.5L YD25 Diésel</div>
                  <div><strong>Puntos Clave:</strong> Monitoreo de deterioro de fluido CVT NS-3 con escáner, descarbonización GDI y purga de trampa diésel.</div>
                </div>
              </div>
              <a href="/preview-manuales?brand=nissan" className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-amber-500 hover:underline flex items-center justify-between">
                <span>CONSULTAR FICHA NISSAN</span>
                <ChevronRight size={14} />
              </a>
            </div>

            {/* 4. Ford */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-blue-500 font-mono tracking-wider">FORD</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase">EcoBoost & Coyote</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">TWIN-TURBO DIT & DURATORQ</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Explorer 3.5L/2.3L, F-150 EcoBoost & Coyote 5.0L, Ranger Diésel</p>
                <div className="text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60">
                  <div><strong>Motores:</strong> 3.5L EcoBoost, 5.0L Coyote V8, 3.2L Puma Diésel</div>
                  <div><strong>Puntos Clave:</strong> Cajas 10R80 Mercon ULV, solenoides Ti-VCT y regla de drenaje 10 min en bomba variable de aceite.</div>
                </div>
              </div>
              <a href="/preview-manuales?brand=ford" className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-amber-500 hover:underline flex items-center justify-between">
                <span>CONSULTAR FICHA FORD</span>
                <ChevronRight size={14} />
              </a>
            </div>

            {/* 5. Honda */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-emerald-500 font-mono tracking-wider">HONDA</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase">Turbo & i-VTEC</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">EARTH DREAMS & VCM V6</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Civic Turbo, CR-V, Accord 1.5T/2.0T, Pilot V6 3.5L, HR-V</p>
                <div className="text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60">
                  <div><strong>Motores:</strong> L15B7 Turbo (1.5L), K24/R20, J35 V6 con VCM</div>
                  <div><strong>Puntos Clave:</strong> Formulación 0W-20 API SP anti-LSPI, reglaje manual de válvulas y fluido Genuine HCF-2 en CVT.</div>
                </div>
              </div>
              <a href="/preview-manuales?brand=honda" className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-amber-500 hover:underline flex items-center justify-between">
                <span>CONSULTAR FICHA HONDA</span>
                <ChevronRight size={14} />
              </a>
            </div>

            {/* 6. Chevrolet */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-purple-500 font-mono tracking-wider">CHEVROLET</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase">V8 EcoTec3 & Turbo</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1.5">AFM / DFM & SIDI DIRECT</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Tahoe, Suburban, Silverado 1500, Trailblazer, Cruze Turbo</p>
                <div className="text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60">
                  <div><strong>Motores:</strong> 5.3L / 6.2L EcoTec3 V8, Ecotec Turbo</div>
                  <div><strong>Puntos Clave:</strong> Certificación Dexos 1 Gen 3 para botadores VLOM, fluido Mobil 1 LV ATF HP en cajas 8L90.</div>
                </div>
              </div>
              <a href="/preview-manuales?brand=chevrolet" className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-amber-500 hover:underline flex items-center justify-between">
                <span>CONSULTAR FICHA CHEVROLET</span>
                <ChevronRight size={14} />
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: EL PROTOCOLO DE INGENIERÍA EN 4 FASES
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-100 dark:bg-[#090b0e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-2">METODOLOGÍA DE TALLER CERTIFICADA</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              PROTOCOLO TÉCNICO EN 4 FASES
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              La diferencia entre cambiar piezas a ciegas y resolver fallas de raíz radica en el método científico de diagnóstico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-4xl font-black font-mono text-slate-200 dark:text-slate-800 block mb-2">01</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 uppercase">TELEMETRÍA & LIVE DATA</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Conectamos escáneres multimarca profesionales para registrar en tiempo real presiones de combustible, compensaciones de mezcla (STFT/LTFT), ciclos de trabajo de solenoides y anomalías en redes CAN-Bus.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-amber-500 font-bold uppercase">
                Instrumental: Autel MaxiSys / Launch
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-4xl font-black font-mono text-slate-200 dark:text-slate-800 block mb-2">02</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 uppercase">COMPROBACIÓN FÍSICA</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Medición con osciloscopio automotriz en sensores de cigüeñal/levas, prueba de compresión hidrostática, prueba de estanqueidad de vacío y comprobación de caída de tensión en circuitos de potencia.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-amber-500 font-bold uppercase">
                Instrumental: PicoScope 4 Ch / Vacuómetro
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-4xl font-black font-mono text-slate-200 dark:text-slate-800 block mb-2">03</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 uppercase">PRESUPUESTO OEM</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Elaboración de orden técnica transparente con desglose de repuestos con código de parte genuino, lubricantes con certificación estricta y horas de trabajo requeridas antes de iniciar cualquier labor.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-amber-500 font-bold uppercase">
                Trazabilidad: 100% Repuestos Auditados
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-4xl font-black font-mono text-slate-200 dark:text-slate-800 block mb-2">04</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 uppercase">TORQUE & RUTA AUDITADA</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ajuste de tuercas y pernos con torquímetros digitales calibrados según manual oficial. Prueba de ruta activa con escáner conectado para certificar la corrección de la falla y entrega con garantía escrita.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-emerald-500 font-bold uppercase">
                Garantía: 6 Meses o 10.000 km
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: INFRAESTRUCTURA TÉCNICA & BAHÍAS OPERATIVAS (Bespoke Bays)
          ========================================================================= */}
      <section id="instalaciones" className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#0c0f15] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* Left: Interactive Bay Switcher */}
            <div className="flex-1 w-full">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-2">CAPACIDAD INSTALADA & HERRAMENTAL</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
                BAHÍAS TÉCNICAS ESPECIALIZADAS
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Nuestra sede en Porlamar fue diseñada con áreas de trabajo segregadas para garantizar limpieza, precisión en el desarme y mediciones electrónicas libres de interferencias.
              </p>

              {/* Bay Tabs */}
              <div className="space-y-3">
                {[
                  {
                    id: 0,
                    tag: "BAHÍA 01",
                    title: "Diagnóstico Computarizado & Redes Multiplexadas",
                    specs: "Escáneres Autel MaxiSys Ultra, programación de módulos ECU/TCM, osciloscopios de 4 canales y prueba de caída de tensión.",
                    equip: "Autel MaxiSys · PicoScope 4425A · Analizador de Red CAN"
                  },
                  {
                    id: 1,
                    tag: "BAHÍA 02",
                    title: "Laboratorio de Inyección & Ultrasonido (GDI / Common Rail)",
                    specs: "Banco de prueba de inyectores multipunto y alta presión directa. Descarbonización química y por cavitación ultrasónica de toberas.",
                    equip: "Banco Launch CNC-603A · Tina Ultrasónica · Manómetros 200 bar"
                  },
                  {
                    id: 2,
                    tag: "BAHÍA 03",
                    title: "Transmisiones Automáticas, Cajas CVT & 4x4",
                    specs: "Estación de recirculación y diálisis de fluidos CVT/ATF a temperatura controlada. Nivelación por reboce a 35°C–45°C y reset de degradación.",
                    equip: "Máquina de Diálisis ATF/CVT · Escáner OBD2 · Termómetro Láser"
                  },
                  {
                    id: 3,
                    tag: "BAHÍA 04",
                    title: "Mecánica Mayor, Elevadores 4.5 Ton & Almacén OEM",
                    specs: "Elevadores electromecánicos de 2 y 4 columnas. Ajuste con torquímetro angular según manual oficial y stock directo de repuestos certificados.",
                    equip: "Elevadores 4.5 Ton · Torquímetros Calibrados · Almacén In-Situ"
                  }
                ].map((bay) => {
                  const isActive = activeBayTab === bay.id;
                  return (
                    <div 
                      key={bay.id}
                      onClick={() => setActiveBayTab(bay.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-slate-100 dark:bg-slate-800/90 border-amber-500/80 shadow-md' 
                          : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-mono font-black uppercase tracking-wider ${isActive ? 'text-amber-500' : 'text-slate-400'}`}>
                          {bay.tag}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono font-bold text-amber-500 uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Seleccionada
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase mb-1">
                        {bay.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                        {bay.specs}
                      </p>
                      <div className="text-[10px] font-mono text-slate-400">
                        <strong>Herramental:</strong> {bay.equip}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Technical Photo Display */}
            <div className="flex-1 w-full relative">
              <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 shadow-2xl overflow-hidden tech-crosshair">
                <div className="flex items-center justify-between px-3 py-1.5 mb-2 bg-black/80 border border-slate-800 rounded text-[10px] font-mono text-slate-400">
                  <span className="text-amber-500 font-bold">SEDE OPERATIVA MASTERTECH</span>
                  <span>PORLAMAR · ISLA DE MARGARITA</span>
                </div>
                
                <img 
                  src={config.IMG_INSTALACIONES || "/assets/instalaciones.webp"} 
                  alt="Instalaciones Taller MasterTech" 
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg w-full aspect-[4/3] object-cover filter contrast-105"
                />

                <div className="p-3 bg-black/60 border border-slate-800/80 rounded mt-2 text-xs space-y-1 text-slate-300">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-slate-400">Capacidad Simultánea:</span>
                    <span className="text-white font-bold">Hasta 8 vehículos en bahía</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-slate-400">Sala de Espera VIP:</span>
                    <span className="text-emerald-400 font-bold">Climatizada · Wi-Fi · Café</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-slate-400">Almacén de Repuestos:</span>
                    <span className="text-amber-400 font-bold">Filtros OEM · Aceites Sintéticos</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: REPUTACIÓN AUDITADA GOOGLE BUSINESS
          ========================================================================= */}
      <GoogleReviewsWidget googleBusinessUrl={config.GOOGLE_MAPS_LINK} />


      {/* =========================================================================
          SECTION 6: ORDEN DE ADMISIÓN TÉCNICA (THE REDESIGNED BOOKING FORM)
          ========================================================================= */}
      <section id="admision" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-100 dark:bg-[#090b0e] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div id="contacto" className="max-w-5xl mx-auto">
          
          <div className="p-5 sm:p-10 lg:p-12 rounded-2xl bg-white dark:bg-[#0e1218] border border-slate-300 dark:border-slate-800 shadow-2xl relative overflow-hidden tech-crosshair">
            
            {/* Header Document Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-amber-500" />
                <span className="font-bold text-slate-900 dark:text-white uppercase">ORDEN DE ADMISIÓN TÉCNICA // FOLIO MT-2026</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400">CENTRO DE SERVICIO PORLAMAR</span>
            </div>

            {formStatus === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 sm:py-16">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
                  ORDEN DE ADMISIÓN GENERADA
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-6">
                  Tu solicitud ha sido transmitida. Un asesor técnico te atenderá vía WhatsApp para coordinar el ingreso de tu vehículo.
                </p>

                <a
                  href={whatsappUrl || config.WHATSAPP_LINK || 'https://wa.me/584123565012'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !bg-[#25D366] hover:!bg-[#20bd5a] !text-black font-black py-4 px-6 rounded-lg w-full max-w-md mx-auto text-center flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                >
                  <WhatsAppIcon size={20} />
                  <span>CONFIRMAR INGRESO EN WHATSAPP</span>
                </a>

                <button 
                  onClick={() => setFormStatus('idle')} 
                  className="mt-6 text-amber-500 font-mono text-xs font-bold uppercase tracking-wider hover:underline block mx-auto cursor-pointer"
                >
                  [ + Generar otra solicitud ]
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Motivo / Síntoma Principal (Interactive Chips) */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2.5">
                    1. SELECCIONA EL SÍNTOMA O SERVICIO REQUERIDO:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "Luz Check Engine / Falla Eléctrica", icon: AlertCircle },
                      { id: "Transmisión / Tirones en Caja CVT", icon: Gauge },
                      { id: "Mantenimiento Preventivo 5.000 km", icon: Clock },
                      { id: "Frenos / Ruidos en Suspensión", icon: Disc },
                      { id: "Recalentamiento / Fuga Refrigerante", icon: Flame },
                      { id: "Climatización A/A", icon: Droplets },
                      { id: "Inspección Pre-Compra de Vehículo", icon: ShieldCheck },
                      { id: "Línea de inspección gratuita", icon: Sparkles }
                    ].map((item) => {
                      const isSelected = selectedSymptom === item.id || selectedService === item.id;
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedSymptom(item.id);
                            if (item.id === "Línea de inspección gratuita") {
                              setSelectedService("Línea de inspección gratuita");
                            }
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-amber-500 text-black border border-amber-400 shadow-md font-black'
                              : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                          }`}
                        >
                          <IconComp size={13} />
                          <span>{item.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Propietario & Contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="lead-form-nombre" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Nombre del Propietario *
                    </label>
                    <input 
                      id="lead-form-nombre" 
                      required 
                      name="nombre" 
                      type="text" 
                      placeholder="Ej: Carlos Mendoza" 
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans" 
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="lead-form-telefono" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Teléfono WhatsApp *
                    </label>
                    <input 
                      id="lead-form-telefono" 
                      required 
                      name="telefono" 
                      type="tel" 
                      placeholder="0412 000 0000" 
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans" 
                    />
                  </div>
                </div>

                {/* 3. Vehículo & Servicio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="lead-form-vehiculo" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Vehículo (Marca / Modelo / Año) *
                    </label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        id="lead-form-vehiculo" 
                        required 
                        name="vehiculo" 
                        type="text" 
                        placeholder="Ej: Toyota Hilux 2022 o Grand Cherokee 3.6L" 
                        className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 pl-9 pr-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="lead-form-servicio" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Servicio Técnico *
                    </label>
                    <select 
                      id="lead-form-servicio"
                      name="servicio" 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans cursor-pointer"
                    >
                      <option value="Línea de inspección gratuita">Línea de inspección preventiva gratuita</option>
                      <option value="Diagnóstico computarizado por escáner">Diagnóstico computarizado por escáner</option>
                      <option value="Mantenimiento preventivo de motor">Mantenimiento preventivo de motor</option>
                      <option value="Mecánica general y reparación">Mecánica general y reparación</option>
                      <option value="Frenos y tren delantero">Frenos y tren delantero</option>
                      <option value="Servicio de inyección y ultrasonido">Servicio de inyección y ultrasonido</option>
                      <option value="Transmisión y cajas automáticas/CVT">Transmisión y cajas automáticas/CVT</option>
                      <option value="Climatización automotriz A/A">Climatización automotriz A/A</option>
                      <option value="Otro">Otro requerimiento específico</option>
                    </select>
                  </div>
                </div>

                {/* Slot Picker if Free Inspection */}
                {selectedService === 'Línea de inspección gratuita' && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 mb-2">
                      SELECCIONA TU TURNO PARA LA LÍNEA DE INSPECCIÓN:
                    </div>
                    <InspectionSlotPicker 
                      onSelectSlot={(slotStr, isValid) => {
                        setInspectionSlotStr(slotStr);
                        setIsInspectionSlotValid(isValid);
                      }} 
                    />
                  </div>
                )}

                {/* 4. Observaciones */}
                <div className="space-y-1.5">
                  <label htmlFor="lead-form-falla" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Descripción de la Falla o Trabajo Deseado
                  </label>
                  <textarea 
                    id="lead-form-falla"
                    name="falla" 
                    placeholder="Describe síntomas específicos: ruidos, tironeos, pérdida de potencia, o kilometraje actual..." 
                    rows={2} 
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans resize-none" 
                  />
                </div>

                {/* Submit Action */}
                <button 
                  disabled={formStatus === 'loading'} 
                  type="submit" 
                  className="btn-primary w-full !py-4 shadow-xl text-xs sm:text-sm font-black tracking-wider cursor-pointer"
                >
                  <ClipboardCheck size={16} />
                  <span>{formStatus === 'loading' ? 'PROCESANDO ORDEN...' : 'TRANSMITIR ORDEN TÉCNICA A WHATSAPP'}</span>
                </button>

                {formStatus === 'error' && (
                  <p className="text-red-500 text-center text-xs font-mono font-bold">{formErrorMessage}</p>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>ATENCIÓN TÉCNICA PERSONALIZADA</span>
                  <span>RESPUESTA DIRECTA VÍA WHATSAPP</span>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 7: CERTIFICADO DE GARANTÍA & EDITORIAL FOOTER
          ========================================================================= */}
      <footer className="theme-footer border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 px-4 sm:px-6 bg-slate-50 dark:bg-[#07090c] text-slate-400">
        <div className="max-w-7xl mx-auto">
          
          {/* Warranty Certificate Banner */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
                <ShieldCheck size={26} />
              </div>
              <div>
                <h4 className="text-base font-black uppercase tracking-wider text-white">
                  GARANTÍA ESCRITA MASTERTECH · 6 MESES O 10.000 KM
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Toda intervención mayor cuenta con respaldo por escrito en mano de obra y repuestos OEM suministrados por nuestro taller.
                </p>
              </div>
            </div>
            <a 
              href="/faq" 
              className="btn-secondary !px-4 !py-2.5 text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 shrink-0"
            >
              <span>TÉRMINOS DE GARANTÍA</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={config.LOGO_URL || "/logo.png"} alt="MasterTech" className="h-8 w-auto object-contain logo-gold" />
                <span className="font-display font-black text-xl tracking-tighter uppercase text-slate-900 dark:text-white">
                  MASTER<span className="text-amber-500 italic">TECH</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
                Centro Especializado de Ingeniería Automotriz en Porlamar, Isla de Margarita. Diagnóstico computarizado avanzado, laboratorio de inyección y mantenimiento bajo especificación técnica oficial.
              </p>
              <div className="flex gap-3">
                <a 
                  href={config.INSTAGRAM_LINK || "https://www.instagram.com/tallermastertech/"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center hover:border-amber-500 text-slate-700 dark:text-white transition-colors"
                  title="Instagram"
                >
                  <Instagram size={17} />
                </a>
                <a 
                  href={config.TIKTOK_LINK || "https://www.tiktok.com/@tallermastertech"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center hover:border-amber-500 text-slate-700 dark:text-white transition-colors"
                  title="TikTok"
                >
                  <TikTokIcon size={17} />
                </a>
                <a 
                  href={config.YOUTUBE_LINK || "https://www.youtube.com/@tallermastertech"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center hover:border-amber-500 text-slate-700 dark:text-white transition-colors"
                  title="YouTube"
                >
                  <Youtube size={17} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                PROTOCOLOS TÉCNICOS
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li><a href="/preview-manuales?brand=toyota" className="hover:text-amber-500 transition-colors">Toyota D-4D & Dual VVT-i</a></li>
                <li><a href="/jeep" className="hover:text-amber-500 transition-colors">Jeep Pentastar & HEMI MDS</a></li>
                <li><a href="/preview-manuales?brand=nissan" className="hover:text-amber-500 transition-colors">Nissan CVT NS-3 & DIG</a></li>
                <li><a href="/preview-manuales?brand=ford" className="hover:text-amber-500 transition-colors">Ford EcoBoost & 10R80</a></li>
                <li><a href="/preview-manuales?brand=honda" className="hover:text-amber-500 transition-colors">Honda Earth Dreams Anti-LSPI</a></li>
                <li><a href="/preview-manuales?brand=chevrolet" className="hover:text-amber-500 transition-colors">Chevrolet V8 AFM/DFM Dexos 1</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                UBICACIÓN & HORARIO
              </h4>
              <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
                <li>
                  <a 
                    href={config.GOOGLE_MAPS_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex gap-2.5 hover:text-amber-500 transition-colors"
                  >
                    <MapPin size={15} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>Sector Sucre, Calle Principal, Porlamar, Isla de Margarita.</span>
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <Clock size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>Lunes a Viernes: 8:00 AM – 5:00 PM<br />Sábados: Previa Cita</span>
                </li>
                <li>
                  <a 
                    href={config.WHATSAPP_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex gap-2.5 hover:text-amber-500 transition-colors font-bold text-slate-900 dark:text-slate-200"
                  >
                    <Phone size={15} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{config.PHONE_NUMBER}</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500">
            <p>© 2026 SOLUCIONES MASTERTECH C.A. Rif: J-50000000-0. Isla de Margarita, Venezuela.</p>
            <div className="flex gap-6">
              <a href="/faq" className="hover:text-amber-500 transition-colors">Garantía Escrita</a>
              <a href="/catalogo" className="hover:text-amber-500 transition-colors">Catálogo OEM</a>
              <a href="/contacto" className="hover:text-amber-500 transition-colors">Contacto Taller</a>
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
