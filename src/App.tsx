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
          SECTION 1: HERO - PRESTIGIOUS & HUMAN AUTOMOTIVE WORKSHOP
          ========================================================================= */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 overflow-hidden min-h-[calc(100vh-60px)] flex flex-col justify-center bg-slate-900 text-white">
        {/* Authentic Workshop Photo Background with Dark Gradient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img 
            src={config.HERO_IMG || "/assets/instalaciones.webp"} 
            alt="Taller MasterTech Instalaciones" 
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-30 filter contrast-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          {/* Status & Location Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-red-500 shrink-0" />
              <span>Sector Sucre, Calle Principal, Porlamar · Isla de Margarita</span>
            </div>
            {(() => {
              const tallerStatus = getTallerStatus(config.IS_OPEN);
              return (
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${tallerStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span className="font-semibold text-slate-200">
                    {tallerStatus.badgeText} · Lun a Vie 8:00 AM - 5:00 PM
                  </span>
                </div>
              );
            })()}
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Clear, Trustworthy Value Proposition */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold tracking-wider mb-5 uppercase">
                <ShieldCheck size={14} className="text-red-500" />
                <span>TALLER MECÁNICO Y DIAGNÓSTICO EN MARGARITA</span>
              </div>

              <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-tight">
                Tecnología, Precisión y Confianza Automotriz
              </h1>

              <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl leading-relaxed font-normal">
                Mantenimiento integral, diagnóstico computarizado por escáner y reparación para <strong>Jeep, Toyota y todas las marcas</strong>. Presupuestos claros antes de iniciar, repuestos de calidad y garantía por escrito en cada servicio.
              </p>

              {/* Action Buttons: Solid Red & Clean Secondary */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
                <a 
                  href="#contacto" 
                  className="btn-primary !px-7 !py-3.5 text-sm shadow-lg font-bold"
                >
                  <Calendar size={18} />
                  <span>AGENDAR CITA O DIAGNÓSTICO</span>
                  <ArrowRight size={16} />
                </a>

                <a 
                  href="#servicios" 
                  className="btn-secondary !px-6 !py-3.5 text-sm bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 shadow-sm"
                >
                  <Wrench size={16} className="text-red-400" />
                  <span>NUESTROS SERVICIOS</span>
                </a>
              </div>

              {/* 4 Clean Key Trust Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-white">6 Meses</div>
                  <div className="text-xs text-slate-400 mt-0.5">Garantía por Escrito</div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-white">OEM & Marca</div>
                  <div className="text-xs text-slate-400 mt-0.5">Repuestos Confiables</div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-white">100% Claro</div>
                  <div className="text-xs text-slate-400 mt-0.5">Presupuesto Previo</div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-white">+1.850</div>
                  <div className="text-xs text-slate-400 mt-0.5">Vehículos Atendidos</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column: Workshop Video / Action Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-none mx-auto"
            >
              <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-3 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 mb-2 bg-slate-900 rounded-lg text-xs font-medium text-slate-300">
                  <div className="flex items-center gap-2 text-red-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Conoce Nuestro Taller</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Sede Porlamar</span>
                </div>

                {/* Video Window */}
                <div className="w-full aspect-[9/16] rounded-xl overflow-hidden bg-black relative flex items-center justify-center border border-slate-800/80">
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
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
                      
                      <a 
                        href={config.HERO_REEL_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/95 hover:bg-black text-white border border-slate-700 text-xs font-semibold px-4 py-2 rounded-lg z-20 flex items-center gap-2 transition-all shadow-xl hover:scale-105 whitespace-nowrap"
                      >
                        <Instagram size={14} className="text-red-400" />
                        <span>Ver en Instagram</span>
                        <ExternalLink size={12} className="text-slate-400" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between px-2 pt-2.5 text-xs text-slate-400">
                  <span>Mecánica & Diagnóstico Especializado</span>
                  <a href={config.WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline font-medium">
                    Consultar Cita →
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2: MARCAS & MODELOS ATENDIDOS
          ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50 dark:bg-[#0e1218] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-1">
                COBERTURA Y CAPACIDAD TÉCNICA
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Marcas y Modelos que Atendemos
              </h2>
            </div>
            <a 
              href="/preview-manuales" 
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors"
            >
              <span>Ver manuales de mantenimiento por motor</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Toyota */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-red-600 dark:text-red-500 tracking-wider">TOYOTA</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">Gasolina & Diésel</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hilux, Fortuner, 4Runner & Prado</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  Mantenimiento de motores 1GD, 1GR-FE V6 y Dynamic Force. Diagnóstico de inyección common rail, cajas automáticas y mantenimiento de 4x4.
                </p>
              </div>
              <a href="/preview-manuales?brand=toyota" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center justify-between">
                <span>Ver especificaciones Toyota</span>
                <ChevronRight size={15} />
              </a>
            </div>

            {/* 2. Jeep & RAM */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-slate-900 dark:text-white tracking-wider">JEEP / RAM</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">V6 Pentastar & V8 HEMI</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Grand Cherokee, Wrangler & RAM</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  Especialistas en enfriador de aceite, tren delantero, cajas ZF 8HP, sistema de tracción Quadra-Trac y electrónica de carrocería.
                </p>
              </div>
              <a href="/jeep" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center justify-between">
                <span>Ver especialidad Jeep Margarita</span>
                <ChevronRight size={15} />
              </a>
            </div>

            {/* 3. Ford */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-blue-600 dark:text-blue-400 tracking-wider">FORD</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">EcoBoost & Coyote</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Explorer, F-150 & Ranger</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  Diagnóstico de turbocompresores EcoBoost, distribución variable Ti-VCT, cajas 6R80 / 10R80 y calibración electrónica con escáner.
                </p>
              </div>
              <a href="/preview-manuales?brand=ford" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center justify-between">
                <span>Ver especificaciones Ford</span>
                <ChevronRight size={15} />
              </a>
            </div>

            {/* 4. Chevrolet */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-amber-600 dark:text-amber-500 tracking-wider">CHEVROLET</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">V8 EcoTec & Turbo</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Silverado, Tahoe & Suburban</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  Mantenimiento de sistemas AFM / DFM, inyección directa SIDI, lubricación estricta Dexos y diagnóstico de transmisión automática.
                </p>
              </div>
              <a href="/preview-manuales?brand=chevrolet" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center justify-between">
                <span>Ver especificaciones Chevrolet</span>
                <ChevronRight size={15} />
              </a>
            </div>

            {/* 5. Nissan */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-red-700 dark:text-red-400 tracking-wider">NISSAN</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">XTRONIC CVT & Diésel</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Patrol, X-Trail, Sentra & Frontier</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  Monitoreo de degradación de fluido CVT con escáner, mantenimiento de cajas XTRONIC, inyección DIG y motores diésel YD25.
                </p>
              </div>
              <a href="/preview-manuales?brand=nissan" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center justify-between">
                <span>Ver especificaciones Nissan</span>
                <ChevronRight size={15} />
              </a>
            </div>

            {/* 6. Honda & Multimarca */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-wider">MULTIMARCA</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">Asiáticos y Americanos</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Honda, Dodge, Hyundai & Kia</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  Escaneo computarizado para todas las marcas, lectura de códigos OBD2, reseteo de intervalos de servicio y mantenimiento general.
                </p>
              </div>
              <a href="#contacto" className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center justify-between">
                <span>Consultar por mi modelo</span>
                <ChevronRight size={15} />
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: SERVICIOS TALLER CON FOTOS REALES
          ========================================================================= */}
      <section id="servicios" className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#0b0d11] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-2">
              SOLUCIONES AUTOMOTRICES INTEGRALES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Nuestros Servicios de Taller
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base mt-3 leading-relaxed">
              Equipamiento técnico moderno, repuestos garantizados y mano de obra calificada en Porlamar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Servicio 1: Mecánica General */}
            <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/servicio-mecanica.webp" 
                  alt="Mecánica General Automotriz" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  Mantenimiento Integral
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Mecánica General & Motores</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Mantenimiento preventivo de 5.000 y 10.000 km, cambio de correas y cadenas de distribución, bombas de agua, empacaduras y afinación completa.
                </p>
                <a 
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Servicio 2: Diagnóstico Electrónico */}
            <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/servicio-electricidad.webp" 
                  alt="Diagnóstico Electrónico por Scanner" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  Escáner Multimarca
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Diagnóstico Electrónico & Escáner</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Lectura de códigos de falla DTC, monitoreo de sensores en vivo, prueba de actuadores, reseteo de testigos de advertencia y diagnóstico certero.
                </p>
                <a 
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Servicio 3: Frenos y Suspensión */}
            <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/servicio-frenos.webp" 
                  alt="Frenos y Tren Delantero" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  Seguridad Activa
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Frenos, Dirección & Suspensión</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Sustitución de pastillas y discos cerámicos, rectificación, amortiguadores, terminales de dirección, bujes, muñones y eliminación de ruidos.
                </p>
                <a 
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Servicio 4: Climatización A/A */}
            <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/servicio-climatizacion.webp" 
                  alt="Aire Acondicionado Automotriz" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  Climatización
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Aire Acondicionado Automotriz</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Carga de gas refrigerante R134a con balanza digital, prueba de estanqueidad al vacío, detección de microfugas UV y servicio de compresores.
                </p>
                <a 
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Servicio 5: Laboratorio de Inyectores */}
            <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/servicio-inyeccion.webp" 
                  alt="Limpieza de Inyectores por Ultrasonido" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  Laboratorio
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Inyección & Tina Ultrasónica</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Prueba en banco computarizado de inyección, lavado por ultrasonido, medición de caudal, estanqueidad y sustitución de microfiltros y sellos.
                </p>
                <a 
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Servicio 6: Cajas Automáticas & Transmisiones */}
            <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/cat_aceites_lubricantes.webp" 
                  alt="Transmisiones Automáticas y Fluidos" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  Transmisión & Fluidos
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cajas Automáticas, CVT & Fluidos</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Mantenimiento y cambio de fluido para transmisiones automáticas y CVT con aceites homologados según especificación estricta de fabricante.
                </p>
                <a 
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: PROCESO TRANSPARENTE DE ATENCIÓN
          ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50 dark:bg-[#0e1218] border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-2">
              CLARIDAD Y CONFIANZA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base mt-2">
              Sin sorpresas en la cuenta final. Tienes el control de tu presupuesto en todo momento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="w-10 h-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-sm mb-5">1</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Recepción & Diagnóstico</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ingresas tu vehículo al taller, escuchamos los síntomas que has notado y conectamos el escáner computarizado para obtener un diagnóstico técnico certero.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black flex items-center justify-center text-sm mb-5">2</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Presupuesto por WhatsApp</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Te enviamos a tu WhatsApp el detalle exacto de repuestos necesarios, opciones disponibles y costo de mano de obra antes de realizar cualquier intervención.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-sm mb-5">3</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Reparación & Garantía Escrita</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ejecutamos el trabajo bajo especificaciones de fábrica, realizamos prueba funcional y te entregamos tu orden con garantía respaldada por escrito.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: NUESTRAS INSTALACIONES EN PORLAMAR
          ========================================================================= */}
      <section id="instalaciones" className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#0b0d11] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block">
                SEDE OPERATIVA EN PORLAMAR
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Instalaciones Modernas, Cómodas y Seguras
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Diseñamos nuestro taller para ofrecer un servicio transparente y eficiente en la Isla de Margarita. Contamos con bahías especializadas, elevadores de carga y un entorno ordenado.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">4 Bahías de Trabajo con Elevadores Hidráulicos</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Capacidad para atender vehículos medianos, camionetas 4x4 y de carga ligera.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Laboratorio de Inyección & Escaneo</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Equipos de diagnóstico computarizado y banco de pruebas ultrasónico para inyectores.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sala de Clientes Climatizada</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Espacio cómodo con aire acondicionado, Wi-Fi y café mientras esperas tu vehículo.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={config.GOOGLE_MAPS_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <MapPin size={16} />
                  <span>Ver ubicación en Google Maps (Sector Sucre, Porlamar)</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                <img 
                  src={config.IMG_INSTALACIONES || "/assets/instalaciones.webp"} 
                  alt="Taller MasterTech Margarita" 
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6: OPINIONES DE CLIENTES (GOOGLE REVIEWS WIDGET)
          ========================================================================= */}
      <GoogleReviewsWidget googleBusinessUrl={config.GOOGLE_MAPS_LINK} />


      {/* =========================================================================
          SECTION 7: FORMULARIO DE ADMISIÓN & CONTACTO DIRECTO
          ========================================================================= */}
      <section id="contacto" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-[#0e1218] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div id="admision" className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-1">
              ATENCIÓN PERSONALIZADA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Agenda tu Cita o Solicita Presupuesto
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              Completa el formulario y te confirmaremos disponibilidad de inmediato a tu WhatsApp.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white dark:bg-[#13171f] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
              
              {formStatus === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    ¡Solicitud Enviada con Éxito!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
                    Hemos preparado los datos de tu vehículo. Pulsa el botón inferior para confirmar tu cita directamente en WhatsApp con un asesor técnico.
                  </p>

                  <a
                    href={whatsappUrl || config.WHATSAPP_LINK || 'https://wa.me/584123565012'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !bg-[#25D366] hover:!bg-[#20bd5a] !border-[#20bd5a] py-3.5 px-6 rounded-lg w-full max-w-sm mx-auto text-center flex items-center justify-center gap-2 shadow-lg"
                  >
                    <WhatsAppIcon size={20} />
                    <span>Confirmar en WhatsApp</span>
                  </a>

                  <button 
                    onClick={() => setFormStatus('idle')} 
                    className="mt-5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-semibold underline block mx-auto cursor-pointer"
                  >
                    Enviar otra solicitud
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Nombre & Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="lead-form-nombre" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Tu Nombre y Apellido *
                      </label>
                      <input 
                        id="lead-form-nombre" 
                        required 
                        name="nombre" 
                        type="text" 
                        placeholder="Ej: Carlos Mendoza" 
                        className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 transition-colors" 
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="lead-form-telefono" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Número de WhatsApp *
                      </label>
                      <input 
                        id="lead-form-telefono" 
                        required 
                        name="telefono" 
                        type="tel" 
                        placeholder="0412 000 0000" 
                        className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 transition-colors" 
                      />
                    </div>
                  </div>

                  {/* Vehículo & Servicio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="lead-form-vehiculo" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Vehículo (Marca / Modelo / Año) *
                      </label>
                      <input 
                        id="lead-form-vehiculo" 
                        required 
                        name="vehiculo" 
                        type="text" 
                        placeholder="Ej: Toyota Hilux 2021 o Grand Cherokee" 
                        className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 transition-colors" 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="lead-form-servicio" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Servicio Requerido *
                      </label>
                      <select 
                        id="lead-form-servicio"
                        name="servicio" 
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
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
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Selecciona el turno para tu inspección preventiva:
                      </div>
                      <InspectionSlotPicker 
                        onSelectSlot={(slotStr, isValid) => {
                          setInspectionSlotStr(slotStr);
                          setIsInspectionSlotValid(isValid);
                        }} 
                      />
                    </div>
                  )}

                  {/* Observaciones */}
                  <div className="space-y-1.5">
                    <label htmlFor="lead-form-falla" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Detalles o Falla que Presenta (Opcional)
                    </label>
                    <textarea 
                      id="lead-form-falla"
                      name="falla" 
                      placeholder="Indícanos si hay algún ruido, luz encendida en tablero o kilometraje actual..." 
                      rows={2} 
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 transition-colors resize-none" 
                    />
                  </div>

                  {/* Submit Action */}
                  <button 
                    disabled={formStatus === 'loading'} 
                    type="submit" 
                    className="btn-primary w-full !py-3.5 text-sm font-bold tracking-wide cursor-pointer shadow-md"
                  >
                    <ClipboardCheck size={18} />
                    <span>{formStatus === 'loading' ? 'Procesando...' : 'Agendar Cita por WhatsApp'}</span>
                  </button>

                  {formStatus === 'error' && (
                    <p className="text-red-500 text-center text-xs font-semibold">{formErrorMessage}</p>
                  )}

                  <p className="text-[11px] text-center text-slate-500">
                    Al hacer clic, se abrirá un chat directo de WhatsApp con tu solicitud lista para enviar.
                  </p>
                </form>
              )}

            </div>

            {/* Direct Contact Info Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Información del Taller
                </h3>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Ubicación:</strong>
                      <span>Sector Sucre, Calle Principal, Porlamar, Isla de Margarita, Edo. Nueva Esparta.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Horario de Atención:</strong>
                      <span>Lunes a Viernes: 8:00 AM – 5:00 PM<br />Sábados: Con cita previa</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Teléfono / WhatsApp:</strong>
                      <a href={config.WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
                        {config.PHONE_NUMBER}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <a 
                    href={config.GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-xs font-semibold py-2.5 justify-center"
                  >
                    <span>Abrir Ruta en Google Maps</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Warranty Guarantee Callout */}
              <div className="p-6 rounded-2xl bg-red-600 text-white shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider">Garantía por Escrito</h4>
                  <p className="text-xs text-white/90 mt-0.5">
                    Respaldamos formalmente cada servicio mecánico y repuesto con garantía certificada de 6 meses o 10.000 km.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 8: EDITORIAL FOOTER
          ========================================================================= */}
      <footer className="theme-footer border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 px-4 sm:px-6 bg-slate-900 text-slate-300">
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
                <li><a href="#servicios" className="hover:text-red-400 transition-colors">Servicios Mecánicos</a></li>
                <li><a href="/preview-manuales" className="hover:text-red-400 transition-colors">Manuales por Motor</a></li>
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
                  <span>Sector Sucre, Calle Principal, Porlamar, Isla de Margarita.</span>
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
