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
      if (saved === 'dark') {
        document.documentElement.classList.remove('theme-light', 'light');
        document.body.classList.remove('theme-light', 'light');
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
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
          SECTION 1: HERO - EDITORIAL LIGHT DEALER SHOWCASE
          ========================================================================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 px-4 sm:px-6 overflow-hidden bg-white dark:bg-[#0b0d11] transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
        {/* Subtle high-end architectural automotive dot pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-40 automotive-subtle-pattern" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          {/* Status & Location Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-8 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-red-600 shrink-0" />
              <span className="font-medium">Sector Sucre, Calle Principal, Porlamar · Isla de Margarita</span>
            </div>
            {(() => {
              const tallerStatus = getTallerStatus(config.IS_OPEN);
              return (
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${tallerStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {tallerStatus.badgeText} · Lun a Vie 8:00 AM - 5:00 PM
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold tracking-wider mb-5 uppercase">
                <ShieldCheck size={14} className="text-red-600" />
                <span>TALLER MECÁNICO & CENTRO DE DIAGNÓSTICO</span>
              </div>

              <h1 className="text-slate-900 dark:text-white text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-[1.12]">
                Tecnología, Precisión y Confianza Automotriz
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 max-w-xl leading-relaxed font-normal">
                Atención especializada en <strong>Jeep, Toyota y todas las marcas</strong> en Porlamar. Diagnóstico computarizado por escáner de nivel OEM, mecánica integral, climatización y repuestos con garantía escrita.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
                <a 
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-7 !py-3.5 text-sm shadow-lg font-bold"
                >
                  <WhatsAppIcon size={18} />
                  <span>CONSULTAR POR WHATSAPP</span>
                  <ArrowRight size={16} />
                </a>

                <a 
                  href="/servicios" 
                  className="btn-secondary !px-6 !py-3.5 text-sm border-slate-300 dark:border-slate-700 hover:border-red-600 shadow-sm"
                >
                  <Wrench size={16} className="text-red-600" />
                  <span>EXPLORAR SERVICIOS</span>
                </a>
              </div>

              {/* 4 Clean Key Trust Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-black text-slate-900 dark:text-white">6 Meses</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Garantía Escrita</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-black text-slate-900 dark:text-white">OEM & Marca</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Repuestos Confiables</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-black text-slate-900 dark:text-white">100% Claro</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Presupuesto Previo</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-black text-slate-900 dark:text-white">+1.850</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Vehículos Atendidos</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column: Workshop Video / Action Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 relative w-full max-w-[420px] lg:max-w-none mx-auto"
            >
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3.5 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 mb-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2 text-red-600 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                    <span>Conoce Nuestro Taller</span>
                  </div>
                  <span className="text-slate-500 text-[11px] font-semibold">Sede Porlamar</span>
                </div>

                {/* Video Window */}
                <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black relative flex items-center justify-center border border-slate-200 dark:border-slate-800">
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

                <div className="flex items-center justify-between px-3 pt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>Mecánica & Diagnóstico en Acción</span>
                  <a href="/contacto" className="text-red-600 dark:text-red-400 hover:underline font-bold">
                    Agendar Cita →
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2: PILARES DE CONFIANZA (COMPROMISO MASTERTECH)
          ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50 dark:bg-[#0e1218] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-2">
              COMPROMISO MASTERTECH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Por Qué Elegir Nuestro Taller
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Trabajamos con transparencia y rigor técnico en cada vehículo que ingresa a nuestras bahías.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="p-8 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-5">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Garantía por Escrito</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Toda intervención mayor cuenta con respaldo por escrito de 6 meses o 10.000 km en mano de obra y repuestos suministrados por el taller.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-5">
                <CheckCircle2 size={26} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Presupuesto Previo Claro</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Recibes por WhatsApp el detalle exacto de repuestos y mano de obra antes de realizar cualquier intervención. Cero sorpresas en la cuenta final.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                <Clock size={26} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Sala VIP Climatizada</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Instalaciones cómodas con aire acondicionado, Wi-Fi de alta velocidad y café en Porlamar para que esperes cómodamente mientras atendemos tu vehículo.
              </p>
            </div>

          </div>

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
                Trabajo Real en Nuestras Bahías
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                4 bahías de servicio con elevadores hidráulicos de 4 toneladas, escáner de nivel OEM y técnicos uniformados en Porlamar.
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
            
            {/* Foto 1: Desarme y Mecánica Mayor */}
            <div className="group rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img 
                  src="/assets/instalaciones.webp" 
                  alt="Bahía de mecánica mayor en MasterTech Porlamar" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase border border-white/20">
                  Bahía Hidráulica #1
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Mecánica Mayor & Motores
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Desarme técnico, calibración de tolerancias, rectificación y armado con grúa hidráulica según especificaciones de torque OEM.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Torque de precisión garantizado</span>
                </div>
              </div>
            </div>

            {/* Foto 2: Diagnóstico Electrónico de Toyota */}
            <div className="group rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img 
                  src="/assets/servicio-electricidad.webp" 
                  alt="Diagnóstico electrónico computarizado en Toyota MasterTech" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-md">
                  Diagnóstico OEM
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Diagnóstico por Escáner
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Lectura en vivo de parámetros de sensores, pruebas de actuadores y reseteo de computadoras ECU sin inventar diagnósticos.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Detección de códigos DTC exactos</span>
                </div>
              </div>
            </div>

            {/* Foto 3: Jeep & Suspensión en Bahía #2 */}
            <div className="group rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img 
                  src="/assets/servicio-frenos.webp" 
                  alt="Mantenimiento de Jeep y suspensión en bahía MasterTech" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase border border-white/20">
                  Bahía #2 · Jeep 4x4
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Tren Motriz, Frenos & 4x4
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Inspección profunda de terminales, bujes, amortiguadores, pastillas cerámicas y tracción en camionetas Jeep y Toyota.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Seguridad en carretera garantizada</span>
                </div>
              </div>
            </div>

            {/* Foto 4: Tina Ultrasónica e Inyectores */}
            <div className="group rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img 
                  src="/assets/servicio-inyeccion.webp" 
                  alt="Banco de pruebas e inyección ultrasónica MasterTech" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase border border-white/20">
                  Laboratorio
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Inyección & Ultrasonido
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Limpieza en tina ultrasónica, medición de caudal y verificación del patrón de pulverización para óptimo consumo de combustible.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Prueba dinámica en banco digital</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: ACCESOS A PORTALES Y ESPECIALIDADES (PORTAL HUB)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-[#0e1218] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
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
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
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
              <a href="/jeep" className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                <span>Ver página de Jeep</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* 2. Portal Toyota */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
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
              <a href="/toyota" className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                <span>Ver página de Toyota</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* 3. Portal Línea de Inspección Gratuita */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">Sin Costo</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Inspección Preventiva</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Revisión preliminar de fluidos, tren delantero, frenos y escaneo básico con turno agendado sin costo alguno.
                </p>
              </div>
              <a href="/inspeccion" className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                <span>Agendar Inspección</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* 4. Portal Manuales por Motor */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 shadow-sm transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 transition-colors shadow-sm">
                  <BookOpen size={24} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Guías Técnicas</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/80 dark:border-slate-700">
                    Próximamente
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Manuales 5.000 KM</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Intervalos recomendados, especificaciones de aceite y tolerancias críticas organizadas por motorización exacta.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 cursor-default select-none">
                <Clock size={13} />
                <span>En edición · Próximamente disponible</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: CALIDAD COMPROBADA (TRABAJOS REALES ANTES Y DESPUÉS)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#0b0d11] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-2">
              RESULTADOS AUDITABLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Calidad Comprobada en Taller
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Fotografías reales de intervenciones ejecutadas por nuestros mecánicos en Porlamar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Caso 1: Reconstrucción de Motor */}
            <div className="rounded-2xl bg-slate-50 dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-900">
                <img 
                  src={config.BEFORE_AFTER_1 || "/assets/before_after_1.webp"} 
                  alt="Reconstrucción de motor antes y después MasterTech" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase border border-white/20">
                  Antes & Después · Motor
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Reconstrucción Integral de Bloque & Cámaras
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Desarme completo por recalentamiento severo, rectificación de plano de bloque, asientos de válvulas, reemplazo de empacaduras multilámina MLS y calibración a torque exacto.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Compresión 100% de fábrica</span>
                <span className="text-slate-400">Garantía 6 meses</span>
              </div>
            </div>

            {/* Caso 2: Restauración Jeep Wrangler */}
            <div className="rounded-2xl bg-white dark:bg-[#13171f] border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-900">
                <img 
                  src={config.BEFORE_AFTER_2 || "/assets/before_after_2.webp"} 
                  alt="Restauración Jeep Wrangler en taller MasterTech" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase border border-white/20">
                  Antes & Después · Jeep
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Armado & Puesta a Punto · Jeep Wrangler
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Restauración completa de cableado eléctrico automotriz, montaje de enfriador de aceite nuevo, alineación de tren delantero y purgado de sistema hidráulico de frenos.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Entregado listo para ruta</span>
                <span className="text-slate-400">Garantía 6 meses</span>
              </div>
            </div>

          </div>

        </div>
      </section>





      {/* =========================================================================
          SECTION 6: REPUTACIÓN AUDITADA GOOGLE BUSINESS
          ========================================================================= */}
      <GoogleReviewsWidget googleBusinessUrl={config.GOOGLE_MAPS_LINK} />


      {/* =========================================================================
          SECTION 7: LLAMADO A LA ACCIÓN & UBICACIÓN RÁPIDA (PORTAL CONVERSIÓN)
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-900 text-white transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
                ATENCIÓN INMEDIATA EN MARGARITA
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                ¿Listo para Atender tu Vehículo?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Escríbenos por WhatsApp para coordinar tu ingreso, cotizar un servicio o agendar tu cita en nuestro taller de Porlamar.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-red-500" />
                  <span>Sector Sucre, Porlamar</span>
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
                <span>Agendar Cita en Línea (/contacto)</span>
              </a>
            </div>
          </div>

        </div>
      </section>


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
