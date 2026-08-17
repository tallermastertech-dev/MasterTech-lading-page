import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Calendar, 
  LogOut, 
  Settings as SettingsIcon, 
  Trash2, 
  Edit, 
  ExternalLink, 
  Lock, 
  RefreshCw, 
  AlertCircle, 
  User, 
  Car, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  X, 
  Check, 
  Save, 
  Loader2, 
  Plus, 
  Tag, 
  Package, 
  Layers, 
  HelpCircle, 
  Users, 
  Sparkles, 
  MessageSquare, 
  Star, 
  Zap,
  TrendingUp,
  LayoutDashboard,
  BellRing,
  Globe,
  Radio,
  FileSpreadsheet,
  Send,
  Sliders,
  ChevronRight,
  Filter,
  Bot
} from 'lucide-react';
import ImageUploader from './components/ImageUploader';

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

const DEFAULT_SERVICES = [
  { id: 1, title: "Mecánica General", desc: "Reparación profunda de motores, sustitución de embragues y solución de fallas mecánicas complejas con repuestos de alta calidad.", img: "/assets/servicio-mecanica.jpg" },
  { id: 2, title: "Mantenimiento Preventivo", desc: "Cambios de aceite sintético, reemplazo de filtros y fluidos esenciales para alargar la vida útil de tu motor.", img: "/24214142.png" },
  { id: 3, title: "Electricidad y Electrónica", desc: "Diagnóstico computarizado, reparación de alternadores, arranques y corrección de cableado y módulos electrónicos.", img: "/assets/servicio-electricidad.jpg" },
  { id: 4, title: "Frenos y Suspensión", desc: "Cambio de pastillas, rectificación de discos, reemplazo de amortiguadores y ajuste completo de tren delantero.", img: "/assets/servicio-frenos.jpg" },
  { id: 5, title: "Inyección Electrónica", desc: "Limpieza ultrasónica de inyectores, diagnóstico de bombas de gasolina y optimización del consumo de combustible.", img: "/assets/servicio-inyeccion.jpg" },
  { id: 6, title: "Climatización", desc: "Carga de gas refrigerante, detección de fugas y mantenimiento completo del sistema de aire acondicionado.", img: "/assets/servicio-climatizacion.jpg" },
  { id: 7, title: "Zona de Lavado", desc: "Lavado detallado de carrocería, limpieza profunda de motor e interior para entregar tu vehículo impecable.", img: "/assets/instalaciones.jpg" }
];

const DEFAULT_FAQS = [
  { q: "¿Cuánto tiempo toma un mantenimiento preventivo básico?", a: "El tiempo estimado oscila entre 45 minutos y 1 hora y media, dependiendo del plan de servicio requerido. Durante la intervención, puede esperar cómodamente en nuestra área Lounge VIP, equipada con estación de café y conectividad Wi-Fi de alta velocidad." },
  { q: "¿Tienen garantía los trabajos que realizan?", a: "Absolutamente. Todos nuestros servicios están respaldados por la Garantía Total MasterTech. Cubrimos la mano de obra calificada y los componentes o consumibles suministrados en nuestras instalaciones, asegurando un estándar óptimo de durabilidad y rendimiento." },
  { q: "¿Cómo agendo una cita para mi vehículo?", a: "Puede gestionar su cita en tiempo real de dos formas: directamente desde nuestra plataforma web haciendo clic en el botón \"Reserva Ahora\", o comunicándose directamente con nuestro equipo de asesores de servicio vía WhatsApp." },
  { q: "¿Cuáles son los métodos de pago aceptados?", a: "Para su comodidad, disponemos de múltiples canales de pago: Pago Móvil, transferencias bancarias nacionales en bolívares, transferencias internacionales, efectivo (USD/EUR) y Zelle." },
  { q: "¿Qué tipo de herramientas o tecnología utilizan para el diagnóstico?", a: "Contamos con equipos de diagnóstico computarizado y escáneres multimarca de última generación. Esto nos permite interactuar con los módulos electrónicos del vehículo, analizar datos en tiempo real y detectar fallas con precisión quirúrgica antes de cualquier reparación." },
  { q: "¿Puedo dejar mi vehículo en el taller si la reparación toma varios días?", a: "Sí. Disponemos de instalaciones cerradas con sistemas de seguridad activa y monitoreo para resguardar su vehículo si requiere procedimientos mecánicos o electrónicos complejos que extiendan el tiempo de entrega." },
  { q: "¿Me informan antes de realizar algún trabajo adicional en mi vehículo?", a: "Totalmente. Mantenemos una política de cero sorpresas. Si durante la inspección o diagnóstico detectamos alguna anomalía extra, nuestro asesor de servicio le enviará un reporte técnico detallado junto al presupuesto correspondiente para su aprobación previa por WhatsApp antes de proceder." }
];

const DEFAULT_TEAM = [
  { id: 1, name: 'Jesús Mata', role: 'JEFE DE MECANICA', desc: 'Experto en diagnóstico avanzado y reparación de motores con más de 15 años de experiencia multimarca.', img: '/jesus.jpg' },
  { id: 2, name: 'J. Vicente Betancourt', role: 'CEO - DIRECTOR', desc: 'Dirección general y gestión estratégica de MasterTech Taller.', img: '/assets/servicio-mecanica.jpg' },
  { id: 3, name: 'Brenda Santaella', role: 'COORDINADORA LOGISTICA', desc: 'Coordinación y gestión de repuestos e insumos automotrices.', img: '/assets/servicio-electricidad.jpg' },
  { id: 4, name: 'Ambar Salazar', role: 'ASESORA DE LOGISTICA', desc: 'Atención directa y seguimiento continuo a clientes.', img: '/assets/servicio-inyeccion.jpg' },
  { id: 5, name: 'Aaron Rivas', role: 'TECNICO ELECTRONICA', desc: 'Especialista en diagnóstico computarizado y reprogramación de módulos.', img: '/assets/servicio-electricidad.jpg' },
  { id: 6, name: 'Domingo Blandin', role: 'ASESOR DE SERVICIO', desc: 'Asesoría técnica personalizada y recepción de vehículos.', img: '/assets/servicio-frenos.jpg' },
  { id: 7, name: 'Beltran Lopez', role: 'TECNICO MECANICO', desc: 'Mantenimiento preventivo, correctivo y sistemas de suspensión.', img: '/assets/servicio-mecanica.jpg' },
  { id: 8, name: 'Jose Vasquez', role: 'MARKETING - DESARROLLADOR WEB', desc: 'Desarrollo tecnológico, presencia digital y comunicación.', img: '/assets/servicio-climatizacion.jpg' }
];

const DEFAULT_REVIEWS = [
  { id: 1, name: 'Carlos R.', car: 'Jeep Grand Cherokee', quote: 'Excelente servicio técnico. Diagnosticaron una falla eléctrica en mi Cherokee que otros talleres no lograban descifrar. Transparencia total.' },
  { id: 2, name: 'Mariana G.', car: 'Toyota Fortuner', quote: 'El cambio de aceite y mantenimiento de frenos fue rápido y con repuestos 100% originales. La atención de la asesora excelente.' },
  { id: 3, name: 'Roberto V.', car: 'Honda CR-V', quote: 'Impecable trabajo en la reconstrucción del motor y climatización. Quedó enfriando perfecto. Muy recomendados en Porlamar.' }
];

export interface CatalogItem {
  id: number;
  title: string;
  category: string;
  price: string;
  desc: string;
  longDesc?: string;
  img: string;
  images?: string[];
  badge?: string;
  specs?: string[];
  compatibility?: string;
  partNumber?: string;
  isImportedUSA?: boolean;
}

const DEFAULT_CATALOG: CatalogItem[] = [
  {
    id: 1,
    title: "Kit Aceite Sintético Motor 5W-30 + Filtro de Aceite OEM",
    category: "Aceites y Lubricantes",
    price: "$45 USD",
    desc: "Lubricante 100% sintético de máxima protección térmica con filtro de aceite de alta eficiencia.",
    longDesc: "Formulado para brindar protección extrema contra el desgaste del motor a altas temperaturas. Incluye filtro de aceite OEM certificado.",
    img: "/24214142.png",
    images: ["/24214142.png", "/assets/servicio-mecanica.jpg"],
    badge: "Mantenimiento Esencial",
    partNumber: "SYN-5W30-KIT",
    specs: ["Aceite Sintético 5W-30 (4 Litros)", "Filtro de Aceite Anti-Drenaje", "Arandela de Cárter de Cobre", "Revisión de Niveles Gratis"],
    compatibility: "Toyota, Chevrolet, Ford, Honda, Hyundai, Kia (Motores 4 y 6 cilindros)",
    isImportedUSA: true
  },
  {
    id: 2,
    title: "Pastillas de Freno Cerámicas Delanteras Premium (Brembo/Akebono)",
    category: "Frenos y Seguridad",
    price: "$55 USD",
    desc: "Pastillas de compuesto cerámico de bajo polvo y cero ruidos con máxima capacidad de frenado.",
    longDesc: "Diseñadas para brindar frenadas precisas y silenciosas en condiciones extremas. Compuesto térmico resistente al desvanecimiento.",
    img: "/assets/servicio-frenos.jpg",
    images: ["/assets/servicio-frenos.jpg"],
    badge: "Frenado de Alta Precisión",
    partNumber: "AK-CERAMIC-DEL",
    specs: ["Compuesto Cerámico Aislante", "Sensor de Desgaste Incluido", "Grasa Antiruido Térmica", "Limpieza de Cálipers Incluida"],
    compatibility: "Toyota Hilux / Fortuner / 4Runner, Jeep Cherokee, Chevrolet Silverado, Ford Explorer",
    isImportedUSA: true
  }
];

const DEFAULT_JORNADAS = [
  { id: "reprogramacion", badge: "🏎️ Jornada de Potenciación", title: "Reprogramación Electrónica & Chiptuning (Stage 1 / Stage 2)", subtitle: "Aumenta la potencia y el torque de tu vehículo de forma segura optimizando el software de la computadora (ECU/TCU).", img: "/assets/servicio-mecanica.jpg", regularPrice: "$250 USD", promoPrice: "$160 USD", discountBadge: "AHORRAS $90 USD", duration: "2 a 3 horas", benefits: ["Incremento de +15% a +35% de HP y Torque comprobables", "Eliminación total del retardo (lag) del pedal del acelerador", "Ahorro de hasta un 10% de combustible en viajes largos y autopista"], specs: [{ label: "Potencia Extra", val: "+25 HP a +65 HP" }, { label: "Garantía", val: "1 Año Software" }], compatibleModels: "Toyota, Jeep, Ford, Chevrolet, Nissan, VW & Turbo." },
  { id: "egr-dpf", badge: "⚡ Solución Electrónica Definitiva", title: "Desactivación Electrónica EGR / DPF / AdBlue / DTC Off", subtitle: "Elimina fallas molestas de Check Engine, atascamiento de Válvula EGR y problemas de Filtro DPF o AdBlue sin dañar el motor.", img: "/assets/servicio-electricidad.jpg", regularPrice: "$180 USD", promoPrice: "$120 USD", discountBadge: "AHORRAS $60 USD", duration: "1.5 a 2.5 horas", benefits: ["Anulación electrónica limpia de Válvula EGR", "Solución definitiva a regeneración atascada de Filtro DPF", "Eliminación de modo emergencia/limitación por AdBlue"], specs: [{ label: "Falla EGR/DPF", val: "100% Resuelta" }, { label: "Check Engine", val: "Luz Apagada" }], compatibleModels: "Toyota Hilux/Fortuner, Ford Ranger, Mitsubishi, Nissan NP300, VW Amarok." }
];

interface AdminPanelProps {
  config?: any;
  onLogout?: () => void;
}

export default function AdminPanel({ config: propConfig, onLogout }: AdminPanelProps) {
  // Auth State
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mastertech_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'catalogo' | 'jornadas' | 'settings' | 'contenido' | 'integraciones'>('dashboard');
  const [contentSubTab, setContentSubTab] = useState<'servicios' | 'faqs' | 'equipo' | 'testimonios'>('servicios');

  // Dynamic Data States
  const [settings, setSettings] = useState<any>({});
  const [settingsForm, setSettingsForm] = useState<any>({});
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSuccessMessage, setSettingsSuccessMessage] = useState('');
  const [settingsErrorMessage, setSettingsErrorMessage] = useState('');

  // Leads State
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  // Catalog State
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(() => {
    try {
      const s = localStorage.getItem('mastertech_settings_store');
      if (s) { const p = JSON.parse(s); if (p.CATALOG_PRODUCTS_JSON) return JSON.parse(p.CATALOG_PRODUCTS_JSON); }
    } catch (e) {}
    return DEFAULT_CATALOG;
  });
  const [editingProduct, setEditingProduct] = useState<CatalogItem | null>(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isAiAutofilling, setIsAiAutofilling] = useState(false);
  const [aiStatusMsg, setAiStatusMsg] = useState('');

  // Jornadas State
  const [jornadasList, setJornadasList] = useState<any[]>(() => {
    try {
      const s = localStorage.getItem('mastertech_settings_store');
      if (s) { const p = JSON.parse(s); if (p.JORNADAS_JSON) return JSON.parse(p.JORNADAS_JSON); }
    } catch (e) {}
    return DEFAULT_JORNADAS;
  });
  const [editingJornada, setEditingJornada] = useState<any>(null);
  const [isJornadaModalOpen, setIsJornadaModalOpen] = useState(false);

  // Content States
  const [services, setServices] = useState<any[]>(DEFAULT_SERVICES);
  const [faqs, setFaqs] = useState<any[]>(DEFAULT_FAQS);
  const [teamMembers, setTeamMembers] = useState<any[]>(DEFAULT_TEAM);
  const [reviews, setReviews] = useState<any[]>(DEFAULT_REVIEWS);

  // Real-time clock for header
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Settings from Supabase (Source of Truth)
  const fetchSettings = async () => {
    let serverData: any = null;
    try {
      const res = await fetch(`/api/settings?t=${Date.now()}`);
      if (res.ok) serverData = await res.json();
    } catch (err) {}

    let localData: any = null;
    try {
      const stored = localStorage.getItem('mastertech_settings_store');
      if (stored) localData = JSON.parse(stored);
    } catch (e) {}

    const merged: any = { ...(localData || {}), ...(serverData || {}) };
    setSettings(merged);
    setSettingsForm(merged);

    if (merged.CATALOG_PRODUCTS_JSON) {
      try { const p = JSON.parse(merged.CATALOG_PRODUCTS_JSON); if (Array.isArray(p)) setCatalogItems(p); } catch (e) {}
    }
    if (merged.JORNADAS_JSON) {
      try { const p = JSON.parse(merged.JORNADAS_JSON); if (Array.isArray(p)) setJornadasList(p); } catch (e) {}
    }
    if (merged.TEAM_MEMBERS_JSON) {
      try { const p = JSON.parse(merged.TEAM_MEMBERS_JSON); if (Array.isArray(p)) setTeamMembers(p); } catch (e) {}
    }
    if (merged.REVIEWS_JSON) {
      try { const p = JSON.parse(merged.REVIEWS_JSON); if (Array.isArray(p)) setReviews(p); } catch (e) {}
    }
    if (merged.SERVICES_JSON) {
      try { const p = JSON.parse(merged.SERVICES_JSON); if (Array.isArray(p)) setServices(p); } catch (e) {}
    }
    if (merged.FAQS_JSON) {
      try { const p = JSON.parse(merged.FAQS_JSON); if (Array.isArray(p)) setFaqs(p); } catch (e) {}
    }
  };

  // Fetch Leads
  const fetchLeads = async () => {
    if (!token) return;
    setIsLoadingLeads(true);
    try {
      const res = await fetch(`/api/leads?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      }
    } catch (err) {} finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (token) fetchLeads();
  }, [token]);

  // Auth Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('mastertech_admin_token', data.token);
        setToken(data.token);
        setPasswordInput('');
      } else {
        setAuthError(data.error || 'Contraseña incorrecta.');
      }
    } catch (err) {
      setAuthError('Error al conectar con el servidor.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mastertech_admin_token');
    setToken(null);
    if (onLogout) onLogout();
  };

  // Save Settings Function
  const handleSaveSettings = async (overrideForm?: any) => {
    if (!token) return;
    setIsSavingSettings(true);
    setSettingsSuccessMessage('');
    setSettingsErrorMessage('');

    const base = overrideForm || settingsForm;
    const targetForm = {
      ...base,
      TEAM_MEMBERS_JSON: (overrideForm && overrideForm.TEAM_MEMBERS_JSON !== undefined) ? overrideForm.TEAM_MEMBERS_JSON : JSON.stringify(teamMembers),
      REVIEWS_JSON: (overrideForm && overrideForm.REVIEWS_JSON !== undefined) ? overrideForm.REVIEWS_JSON : JSON.stringify(reviews),
      SERVICES_JSON: (overrideForm && overrideForm.SERVICES_JSON !== undefined) ? overrideForm.SERVICES_JSON : JSON.stringify(services),
      FAQS_JSON: (overrideForm && overrideForm.FAQS_JSON !== undefined) ? overrideForm.FAQS_JSON : JSON.stringify(faqs),
      CATALOG_PRODUCTS_JSON: (overrideForm && overrideForm.CATALOG_PRODUCTS_JSON !== undefined) ? overrideForm.CATALOG_PRODUCTS_JSON : JSON.stringify(catalogItems),
      JORNADAS_JSON: (overrideForm && overrideForm.JORNADAS_JSON !== undefined) ? overrideForm.JORNADAS_JSON : JSON.stringify(jornadasList)
    };

    try { localStorage.setItem('mastertech_settings_store', JSON.stringify(targetForm)); } catch (e) {}
    setSettings(targetForm);
    setSettingsForm(targetForm);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(targetForm)
      });

      if (res.status === 401) {
        handleLogout();
        setAuthError('Tu sesión ha expirado. Ingresa la contraseña.');
        return;
      }

      if (res.ok) {
        const data = await res.json();
        const updated = { ...(data.settings || {}), ...targetForm };
        setSettings(updated);
        setSettingsForm(updated);
        setSettingsSuccessMessage('¡Cambios guardados e integrados públicamente!');
        setTimeout(() => setSettingsSuccessMessage(''), 4000);
      }
    } catch (err) {
      setSettingsSuccessMessage('¡Guardado localmente!');
      setTimeout(() => setSettingsSuccessMessage(''), 4000);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Lead Status Handler
  const handleUpdateLeadStatus = async (id: number | string, newStatus: string) => {
    if (!token) return;
    const updated = leads.map(l => String(l.id) === String(id) ? { ...l, status: newStatus } : l);
    setLeads(updated);
    if (selectedLead && String(selectedLead.id) === String(id)) setSelectedLead({ ...selectedLead, status: newStatus });

    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}
  };

  const handleDeleteLead = async (id: number | string) => {
    if (!token || !window.confirm('¿Estás seguro de eliminar este registro de cita?')) return;
    const updated = leads.filter(l => String(l.id) !== String(id));
    setLeads(updated);
    if (selectedLead && String(selectedLead.id) === String(id)) setSelectedLead(null);

    try {
      await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {}
  };

  // AI Autofill Function for Catalog
  const handleAiAutofill = async (partNumArg?: string) => {
    const partToSearch = (partNumArg || editingProduct?.partNumber || editingProduct?.title || '').trim();
    if (!partToSearch) {
      setAiStatusMsg('⚠️ Ingresa un número de parte (OEM) o título primero.');
      setTimeout(() => setAiStatusMsg(''), 3000);
      return;
    }

    setIsAiAutofilling(true);
    setAiStatusMsg('✨ Buscando en base de datos OEM e Inteligencia Artificial...');

    try {
      const res = await fetch('/api/autofill-part', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partNumber: partToSearch })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.item) {
          const fetched = data.item;
          setEditingProduct(prev => {
            if (!prev) return null;
            return {
              ...prev,
              title: fetched.title || prev.title,
              category: fetched.category || prev.category,
              price: fetched.price || prev.price,
              desc: fetched.desc || prev.desc,
              longDesc: fetched.longDesc || prev.longDesc,
              badge: fetched.badge || prev.badge,
              compatibility: fetched.compatibility || prev.compatibility,
              partNumber: fetched.partNumber || prev.partNumber,
              specs: fetched.specs && fetched.specs.length > 0 ? fetched.specs : prev.specs,
              img: fetched.img || prev.img
            };
          });
          setAiStatusMsg('✅ Datos completados con éxito desde catálogo OEM.');
        } else {
          setAiStatusMsg('ℹ️ No se encontró código OEM exacto, llena los campos manualmente.');
        }
      }
    } catch (e) {
      setAiStatusMsg('⚠️ Error al consultar IA.');
    } finally {
      setIsAiAutofilling(false);
      setTimeout(() => setAiStatusMsg(''), 4000);
    }
  };

  // Catalog Item Save
  const handleSaveCatalogItem = (product: CatalogItem) => {
    let updated: CatalogItem[] = [];
    if (product.id && catalogItems.some(p => p.id === product.id)) {
      updated = catalogItems.map(p => p.id === product.id ? product : p);
    } else {
      updated = [{ ...product, id: Date.now() }, ...catalogItems];
    }

    setCatalogItems(updated);
    const jsonStr = JSON.stringify(updated);
    const updatedForm = { ...settingsForm, CATALOG_PRODUCTS_JSON: jsonStr };
    setSettingsForm(updatedForm);
    setSettings(updatedForm);
    setIsCatalogModalOpen(false);
    setEditingProduct(null);
    handleSaveSettings(updatedForm);
  };

  const handleDeleteCatalogItem = (id: number | string) => {
    if (!window.confirm('¿Eliminar este repuesto o producto del catálogo?')) return;
    const updated = catalogItems.filter(p => String(p.id) !== String(id));
    setCatalogItems(updated);
    const jsonStr = JSON.stringify(updated);
    const updatedForm = { ...settingsForm, CATALOG_PRODUCTS_JSON: jsonStr };
    setSettingsForm(updatedForm);
    setSettings(updatedForm);
    handleSaveSettings(updatedForm);
  };

  // Jornada Item Save
  const handleSaveJornadaItem = (jornada: any) => {
    let updated: any[] = [];
    if (jornada.id && jornadasList.some(j => String(j.id) === String(jornada.id))) {
      updated = jornadasList.map(j => String(j.id) === String(jornada.id) ? jornada : j);
    } else {
      const newId = jornada.id || `jornada_${Date.now()}`;
      updated = [{ ...jornada, id: newId }, ...jornadasList];
    }

    setJornadasList(updated);
    const jsonStr = JSON.stringify(updated);
    const updatedForm = { ...settingsForm, JORNADAS_JSON: jsonStr };
    setSettingsForm(updatedForm);
    setSettings(updatedForm);
    setIsJornadaModalOpen(false);
    setEditingJornada(null);
    handleSaveSettings(updatedForm);
  };

  const handleDeleteJornadaItem = (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar esta jornada especial?')) return;
    const updated = jornadasList.filter(j => String(j.id) !== String(id));
    setJornadasList(updated);
    const jsonStr = JSON.stringify(updated);
    const updatedForm = { ...settingsForm, JORNADAS_JSON: jsonStr };
    setSettingsForm(updatedForm);
    setSettings(updatedForm);
    handleSaveSettings(updatedForm);
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch =
        (l.nombre || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.telefono || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.vehiculo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.servicio || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0b0f] text-white flex items-center justify-center p-6 selection:bg-primary selection:text-black">
        <div className="max-w-md w-full bg-[#12141a]/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-display font-black uppercase tracking-tight text-white">Panel de Administración</h1>
            <p className="text-xs text-zinc-400">Ingresa la contraseña maestra para gestionar Taller MasterTech.</p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="space-y-2">
              <label htmlFor="admin-pass" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Contraseña Maestra</label>
              <input
                id="admin-pass"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-white font-mono outline-none focus:border-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-primary !py-3.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border-none shadow-xl cursor-pointer"
            >
              {isLoggingIn ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              <span>{isLoggingIn ? 'Verificando...' : 'Iniciar Sesión'}</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-white/5">
            <a href="/" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-1">
              <span>← Volver a la página principal</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD INTERFACE
  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white flex flex-col md:flex-row font-sans selection:bg-primary selection:text-black">
      
      {/* SIDEBAR NAVIGATION (Desktop & Mobile) */}
      <aside className="w-full md:w-64 bg-[#12141a]/95 backdrop-blur-2xl border-r border-white/10 shrink-0 p-5 flex flex-col justify-between z-30">
        <div className="space-y-6">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <img src={settingsForm.LOGO_URL || "/logo.png"} alt="MasterTech Logo" className="w-8 h-8 object-contain" />
              <div>
                <span className="font-display font-black text-sm tracking-widest text-white block leading-none">MASTERTECH</span>
                <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider">PANEL EXECUTIVE</span>
              </div>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white" title="Abrir sitio público">
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'leads', label: `Citas Solicitadas (${leads.length})`, icon: <Calendar size={18} /> },
              { id: 'catalogo', label: 'Catálogo Repuestos', icon: <Package size={18} /> },
              { id: 'jornadas', label: 'Jornadas VIP', icon: <Zap size={18} />, badge: 'PROMO' },
              { id: 'contenido', label: 'Contenidos Sitio Web', icon: <Layers size={18} /> },
              { id: 'settings', label: 'Ajustes Principales', icon: <SettingsIcon size={18} /> },
              { id: 'integraciones', label: 'Telegram & Webhook', icon: <Bot size={18} /> },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500/20 to-primary/20 border border-primary/40 text-white shadow-lg shadow-amber-500/5' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-primary' : 'text-zinc-400'}>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded-md">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin info & Logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs">
              MT
            </div>
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">Administrador MasterTech</span>
              <span className="text-[10px] text-zinc-500 block truncate">Sesión Activa</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-white/5 hover:bg-red-500/20 border border-white/10 text-zinc-400 hover:text-red-400 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP EXECUTIVE HEADER BAR */}
        <header className="bg-[#12141a]/80 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              TALLER ABIERTO — EN VIVO
            </span>
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline-block">| {timeStr}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchSettings()}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Recargar configuraciones de Supabase"
            >
              <RefreshCw size={15} />
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2 !px-4 text-xs font-black uppercase tracking-wider border-none flex items-center gap-1.5 shadow-md"
            >
              <Globe size={14} />
              <span>Ver Web pública</span>
            </a>
          </div>
        </header>

        {/* TAB BODY CONTAINER */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">

          {/* ========================================================================= */}
          {/* MODULE 1: DASHBOARD EJECUTIVO */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">Resumen Ejecutivo Taller MasterTech</h1>
                  <p className="text-xs text-zinc-400 mt-1">Control general de citas, catálogo y promociones activas.</p>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shadow-lg"
                >
                  <Calendar size={16} />
                  <span>Ver Citas ({leads.length})</span>
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="text-[10px] font-black uppercase tracking-widest">Citas Totales Recibidas</span>
                    <Calendar className="text-amber-400" size={18} />
                  </div>
                  <div className="text-3xl font-black text-white">{leads.length}</div>
                  <span className="text-[10px] text-zinc-500 block">Registradas vía web / WhatsApp</span>
                </div>

                <div className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="text-[10px] font-black uppercase tracking-widest">Repuestos en Catálogo</span>
                    <Package className="text-primary" size={18} />
                  </div>
                  <div className="text-3xl font-black text-white">{catalogItems.length}</div>
                  <span className="text-[10px] text-zinc-500 block">Productos disponibles públicamente</span>
                </div>

                <div className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="text-[10px] font-black uppercase tracking-widest">Jornadas VIP Activas</span>
                    <Zap className="text-purple-400" size={18} />
                  </div>
                  <div className="text-3xl font-black text-white">{jornadasList.length}</div>
                  <span className="text-[10px] text-zinc-500 block">Promociones vigentes</span>
                </div>

                <div className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="text-[10px] font-black uppercase tracking-widest">Especialistas Taller</span>
                    <Users className="text-emerald-400" size={18} />
                  </div>
                  <div className="text-3xl font-black text-white">{teamMembers.length}</div>
                  <span className="text-[10px] text-zinc-500 block">Técnicos y coordinadores</span>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="bg-[#12141a] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
                    <Clock className="text-primary" size={16} />
                    <span>Últimas Citas Solicitadas</span>
                  </h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs text-primary hover:underline font-bold">Ver todas →</button>
                </div>

                {leads.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-4 text-center">No hay registros de citas recientes todavía.</p>
                ) : (
                  <div className="space-y-3">
                    {leads.slice(0, 5).map((l, idx) => (
                      <div key={l.id || idx} className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                        <div>
                          <span className="font-bold text-xs text-white block">{l.nombre || 'Cliente sin nombre'}</span>
                          <span className="text-[11px] text-zinc-400">{l.vehiculo || 'Vehículo'} — {l.servicio || 'Servicio'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            {l.status || 'Pendiente'}
                          </span>
                          <a
                            href={`https://wa.me/${(l.telefono || '').replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/40 transition-colors"
                            title="Abrir WhatsApp directo"
                          >
                            <WhatsAppIcon size={14} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODULE 2: GESTOR DE CITAS Y LEADS */}
          {/* ========================================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">Gestión de Citas y Solicitudes</h1>
                  <p className="text-xs text-zinc-400 mt-1">Revisa y responde a las citas agendadas por los clientes vía web.</p>
                </div>
                <button onClick={fetchLeads} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-2">
                  <RefreshCw size={14} className={isLoadingLeads ? 'animate-spin' : ''} />
                  <span>Actualizar Lista</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar por cliente, teléfono, vehículo o servicio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-zinc-400 shrink-0" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white outline-none focus:border-primary"
                  >
                    <option value="Todos">Todos los Estados</option>
                    <option value="Pendiente">Pendientes</option>
                    <option value="Confirmado">Confirmados</option>
                    <option value="Atendido">Atendidos</option>
                    <option value="Cancelado">Cancelados</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-[#12141a] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-black/60 text-zinc-400 uppercase tracking-wider text-[10px] font-black border-b border-white/10">
                      <tr>
                        <th className="p-4">Cliente</th>
                        <th className="p-4">Teléfono</th>
                        <th className="p-4">Vehículo</th>
                        <th className="p-4">Servicio</th>
                        <th className="p-4">Fecha / Turno</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-zinc-500">
                            No se encontraron registros de citas con los filtros indicados.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((l, idx) => (
                          <tr key={l.id || idx} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-white">{l.nombre || 'Sin nombre'}</td>
                            <td className="p-4 font-mono">{l.telefono || '-'}</td>
                            <td className="p-4">{l.vehiculo || '-'}</td>
                            <td className="p-4 text-primary font-bold">{l.servicio || '-'}</td>
                            <td className="p-4 text-zinc-400">{l.fecha_turno || l.fecha || 'Por acordar'}</td>
                            <td className="p-4">
                              <select
                                value={l.status || 'Pendiente'}
                                onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                                className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer bg-black ${
                                  l.status === 'Confirmado' 
                                    ? 'border-green-500/40 text-green-400' 
                                    : l.status === 'Atendido'
                                    ? 'border-cyan-500/40 text-cyan-400'
                                    : l.status === 'Cancelado'
                                    ? 'border-red-500/40 text-red-400'
                                    : 'border-amber-500/40 text-amber-300'
                                }`}
                              >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Confirmado">Confirmado</option>
                                <option value="Atendido">Atendido</option>
                                <option value="Cancelado">Cancelado</option>
                              </select>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <a
                                href={`https://wa.me/${(l.telefono || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${l.nombre || ''}, te contactamos desde Taller MasterTech sobre tu solicitud de cita de ${l.servicio || 'servicio'}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex p-1.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/40 transition-colors"
                                title="Contactar por WhatsApp"
                              >
                                <WhatsAppIcon size={14} />
                              </a>
                              <button
                                onClick={() => handleDeleteLead(l.id)}
                                className="p-1.5 rounded-lg bg-white/5 text-zinc-500 hover:text-red-400 border border-white/10 transition-colors"
                                title="Eliminar registro"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODULE 3: GESTOR DE CATÁLOGO DE REPUESTOS CON AUTOFILL IA */}
          {/* ========================================================================= */}
          {activeTab === 'catalogo' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">Catálogo de Repuestos & Productos</h1>
                  <p className="text-xs text-zinc-400 mt-1">Gestiona el inventario de repuestos visibles públicamente en `/catalogo`.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct({
                      id: 0,
                      title: '',
                      category: 'Mantenimiento Esencial',
                      price: '$0 USD',
                      desc: '',
                      img: '/assets/servicio-mecanica.jpg',
                      images: [],
                      partNumber: ''
                    });
                    setIsCatalogModalOpen(true);
                  }}
                  className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shadow-lg"
                >
                  <Plus size={16} />
                  <span>Nuevo Repuesto</span>
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catalogItems.map((prod) => (
                  <div key={prod.id} className="bg-[#12141a] border border-white/10 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-full h-40 rounded-xl bg-black border border-white/10 overflow-hidden relative">
                        <img src={prod.img || "/assets/servicio-mecanica.jpg"} alt={prod.title} className="w-full h-full object-cover" />
                        {prod.partNumber && (
                          <span className="absolute top-2 left-2 text-[9px] font-mono font-bold bg-black/80 text-amber-400 px-2 py-0.5 rounded-md border border-white/10">
                            OEM: {prod.partNumber}
                          </span>
                        )}
                        <span className="absolute bottom-2 right-2 text-xs font-black text-primary bg-black/90 px-2.5 py-1 rounded-lg border border-primary/30">
                          {prod.price}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-zinc-500 block">{prod.category}</span>
                        <h3 className="font-bold text-white text-sm leading-snug line-clamp-1">{prod.title}</h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{prod.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsCatalogModalOpen(true);
                        }}
                        className="flex-1 bg-white/5 hover:bg-amber-500/20 border border-white/10 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit size={14} />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCatalogItem(prod.id)}
                        className="bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 p-2 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODULE 4: GESTOR DE JORNADAS VIP */}
          {/* ========================================================================= */}
          {activeTab === 'jornadas' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">Jornadas VIP Automotrices</h1>
                  <p className="text-xs text-zinc-400 mt-1">Crea o elimina las promociones especiales con precios de jornada en `/jornada`.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingJornada({
                      id: `jornada_${Date.now()}`,
                      badge: "🏎️ Jornada Especial",
                      title: "Título de la Jornada",
                      subtitle: "Descripción corta de la jornada...",
                      img: "/assets/servicio-mecanica.jpg",
                      regularPrice: "$100 USD",
                      promoPrice: "$60 USD",
                      discountBadge: "AHORRAS $40 USD",
                      duration: "1 a 2 horas",
                      benefits: ["Beneficio 1", "Beneficio 2"],
                      specs: [{ label: "Garantía", val: "1 Año" }],
                      compatibleModels: "Apto para todas las marcas."
                    });
                    setIsJornadaModalOpen(true);
                  }}
                  className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shadow-lg"
                >
                  <Plus size={16} />
                  <span>Nueva Jornada VIP</span>
                </button>
              </div>

              {/* Clock Timer Config */}
              <div className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-3">
                <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                  <Clock size={16} />
                  <span>Configuración del Reloj de Cierre de Cupos</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-zinc-400 font-bold block mb-1">Encabezado del Reloj</label>
                    <input
                      type="text"
                      value={settingsForm.JORNADA_COUNTDOWN_TITLE || 'CIERRE DE CUPOS JORNADA:'}
                      onChange={(e) => {
                        const updated = { ...settingsForm, JORNADA_COUNTDOWN_TITLE: e.target.value };
                        setSettingsForm(updated);
                        handleSaveSettings(updated);
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-bold block mb-1">Botones Rápido Cierre</label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 3, 7, 14].map(days => (
                        <button
                          key={days}
                          onClick={() => {
                            const newEnd = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
                            const updated = { ...settingsForm, JORNADA_COUNTDOWN_END: newEnd };
                            setSettingsForm(updated);
                            handleSaveSettings(updated);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold hover:bg-amber-500/20 transition-colors"
                        >
                          + {days} {days === 1 ? 'Día' : 'Días'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Jornadas List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jornadasList.map((j) => (
                  <div key={j.id} className="bg-[#12141a] border border-white/10 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-xl bg-black overflow-hidden border border-white/10 shrink-0">
                          <img src={j.img || "/assets/servicio-mecanica.jpg"} alt={j.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full inline-block">
                            {j.badge}
                          </span>
                          <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 mt-1">{j.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 text-xs">
                        <div>
                          <span className="text-[9px] text-zinc-500 block">REGULAR</span>
                          <span className="text-zinc-400 line-through font-bold">{j.regularPrice}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-amber-400 font-bold block">PROMO</span>
                          <span className="text-lg font-black text-primary">{j.promoPrice}</span>
                        </div>
                        <span className="bg-amber-500/10 text-amber-300 text-[10px] font-bold px-2 py-1 rounded-md border border-amber-500/30">
                          {j.discountBadge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => {
                          setEditingJornada(j);
                          setIsJornadaModalOpen(true);
                        }}
                        className="flex-1 bg-white/5 hover:bg-amber-500/20 border border-white/10 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit size={14} />
                        <span>Editar Jornada</span>
                      </button>
                      <button
                        onClick={() => handleDeleteJornadaItem(j.id)}
                        className="bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 p-2 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODULE 5: CONTENIDOS DEL SITIO WEB */}
          {/* ========================================================================= */}
          {activeTab === 'contenido' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">Contenidos del Sitio Web</h1>
                  <p className="text-xs text-zinc-400 mt-1">Administra las secciones de servicios, equipo de especialistas, testimonios y preguntas frecuentes.</p>
                </div>

                <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
                  {[
                    { id: 'servicios', label: 'Servicios Taller' },
                    { id: 'equipo', label: 'Equipo Taller' },
                    { id: 'testimonios', label: 'Testimonios' },
                    { id: 'faqs', label: 'FAQs' }
                  ].map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setContentSubTab(sub.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        contentSubTab === sub.id ? 'bg-primary text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-tab 1: Services */}
              {contentSubTab === 'servicios' && (
                <div className="space-y-4">
                  {services.map((srv, idx) => (
                    <div key={srv.id || idx} className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-3">
                          <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">Título del Servicio</label>
                            <input
                              type="text"
                              value={srv.title || ''}
                              onChange={(e) => {
                                const updated = [...services];
                                updated[idx].title = e.target.value;
                                setServices(updated);
                                handleSaveSettings({ ...settingsForm, SERVICES_JSON: JSON.stringify(updated) });
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">Descripción Corta</label>
                            <textarea
                              rows={2}
                              value={srv.desc || ''}
                              onChange={(e) => {
                                const updated = [...services];
                                updated[idx].desc = e.target.value;
                                setServices(updated);
                                handleSaveSettings({ ...settingsForm, SERVICES_JSON: JSON.stringify(updated) });
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <ImageUploader
                            label="Imagen Representativa"
                            value={srv.img || ''}
                            onChange={(val) => {
                              const updated = [...services];
                              updated[idx].img = val;
                              setServices(updated);
                              handleSaveSettings({ ...settingsForm, SERVICES_JSON: JSON.stringify(updated) });
                            }}
                            aspectRatio={16 / 9}
                            placeholder="/assets/servicio-mecanica.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-tab 2: Equipo Taller */}
              {contentSubTab === 'equipo' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-wider">Equipo de Especialistas Taller MasterTech</h3>
                      <p className="text-xs text-zinc-400 mt-1">Gestiona los técnicos, ingenieros y coordinadores que aparecen en `/nosotros`.</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = [...teamMembers, { id: Date.now(), name: "Nuevo Especialista", role: "ESPECIALISTA TECNICO", desc: "Descripción del cargo...", img: "/assets/servicio-mecanica.jpg" }];
                        setTeamMembers(updated);
                        handleSaveSettings({ ...settingsForm, TEAM_MEMBERS_JSON: JSON.stringify(updated) });
                      }}
                      className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shrink-0 shadow-lg"
                    >
                      <Plus size={16} />
                      <span>Agregar Miembro al Equipo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers.map((member, idx) => (
                      <div key={member.id || idx} className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-2">
                              <div>
                                <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Nombre Completo</label>
                                <input
                                  type="text"
                                  value={member.name || ''}
                                  onChange={(e) => {
                                    const updated = [...teamMembers];
                                    updated[idx].name = e.target.value;
                                    setTeamMembers(updated);
                                    handleSaveSettings({ ...settingsForm, TEAM_MEMBERS_JSON: JSON.stringify(updated) });
                                  }}
                                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-primary"
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Cargo / Especialidad</label>
                                <input
                                  type="text"
                                  value={member.role || ''}
                                  onChange={(e) => {
                                    const updated = [...teamMembers];
                                    updated[idx].role = e.target.value;
                                    setTeamMembers(updated);
                                    handleSaveSettings({ ...settingsForm, TEAM_MEMBERS_JSON: JSON.stringify(updated) });
                                  }}
                                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs font-bold text-amber-400 outline-none focus:border-primary"
                                />
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (!window.confirm(`¿Eliminar a "${member.name}" del equipo?`)) return;
                                const updated = teamMembers.filter((_, i) => i !== idx);
                                setTeamMembers(updated);
                                handleSaveSettings({ ...settingsForm, TEAM_MEMBERS_JSON: JSON.stringify(updated) });
                              }}
                              className="text-zinc-500 hover:text-red-400 p-2 rounded-xl bg-white/5 border border-white/10"
                              title="Eliminar Miembro"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Descripción / Experiencia</label>
                            <textarea
                              rows={2}
                              value={member.desc || ''}
                              onChange={(e) => {
                                const updated = [...teamMembers];
                                updated[idx].desc = e.target.value;
                                setTeamMembers(updated);
                                handleSaveSettings({ ...settingsForm, TEAM_MEMBERS_JSON: JSON.stringify(updated) });
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-primary"
                            />
                          </div>

                          <ImageUploader
                            label={`Foto Oficial de ${member.name || `Miembro #${idx + 1}`}`}
                            value={member.img || ''}
                            onChange={(val) => {
                              const updated = [...teamMembers];
                              updated[idx].img = val;
                              setTeamMembers(updated);
                              handleSaveSettings({ ...settingsForm, TEAM_MEMBERS_JSON: JSON.stringify(updated) });
                            }}
                            aspectRatio={1 / 1}
                            placeholder="/assets/servicio-mecanica.jpg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-tab 3: Testimonios */}
              {contentSubTab === 'testimonios' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-wider">Gestión de Reseñas y Testimonios</h3>
                      <p className="text-xs text-zinc-400 mt-1">Edita u organiza las opiniones de los clientes en la sección de inicio.</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = [...reviews, { id: Date.now(), name: "Nombre Cliente", car: "Modelo Vehículo", quote: "Excelente atención y diagnóstico preciso." }];
                        setReviews(updated);
                        handleSaveSettings({ ...settingsForm, REVIEWS_JSON: JSON.stringify(updated) });
                      }}
                      className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shrink-0 shadow-lg"
                    >
                      <Plus size={16} />
                      <span>Agregar Testimonio</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((rev, idx) => (
                      <div key={rev.id || idx} className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-4">
                        <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                            <div>
                              <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Nombre Cliente</label>
                              <input
                                type="text"
                                value={rev.name || ''}
                                onChange={(e) => {
                                  const updated = [...reviews];
                                  updated[idx].name = e.target.value;
                                  setReviews(updated);
                                  handleSaveSettings({ ...settingsForm, REVIEWS_JSON: JSON.stringify(updated) });
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-primary"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Vehículo del Cliente</label>
                              <input
                                type="text"
                                value={rev.car || ''}
                                onChange={(e) => {
                                  const updated = [...reviews];
                                  updated[idx].car = e.target.value;
                                  setReviews(updated);
                                  handleSaveSettings({ ...settingsForm, REVIEWS_JSON: JSON.stringify(updated) });
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-primary"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (!window.confirm(`¿Eliminar reseña de "${rev.name}"?`)) return;
                              const updated = reviews.filter((_, i) => i !== idx);
                              setReviews(updated);
                              handleSaveSettings({ ...settingsForm, REVIEWS_JSON: JSON.stringify(updated) });
                            }}
                            className="text-zinc-500 hover:text-red-400 p-2 rounded-xl bg-white/5 border border-white/10"
                            title="Eliminar Reseña"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Testimonio / Opinión</label>
                          <textarea
                            rows={2}
                            value={rev.quote || ''}
                            onChange={(e) => {
                              const updated = [...reviews];
                              updated[idx].quote = e.target.value;
                              setReviews(updated);
                              handleSaveSettings({ ...settingsForm, REVIEWS_JSON: JSON.stringify(updated) });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-tab 4: FAQs */}
              {contentSubTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white uppercase">Preguntas Frecuentes</h3>
                    <button
                      onClick={() => {
                        const updated = [...faqs, { q: "Nueva Pregunta Frecuente", a: "Respuesta detallada..." }];
                        setFaqs(updated);
                        handleSaveSettings({ ...settingsForm, FAQS_JSON: JSON.stringify(updated) });
                      }}
                      className="btn-primary !py-2 !px-4 text-xs border-none flex items-center gap-1"
                    >
                      <Plus size={14} />
                      <span>Agregar FAQ</span>
                    </button>
                  </div>

                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-[#12141a] p-4 rounded-xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={faq.q}
                            onChange={(e) => {
                              const updated = [...faqs];
                              updated[idx].q = e.target.value;
                              setFaqs(updated);
                              handleSaveSettings({ ...settingsForm, FAQS_JSON: JSON.stringify(updated) });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-primary"
                          />
                          <textarea
                            rows={2}
                            value={faq.a}
                            onChange={(e) => {
                              const updated = [...faqs];
                              updated[idx].a = e.target.value;
                              setFaqs(updated);
                              handleSaveSettings({ ...settingsForm, FAQS_JSON: JSON.stringify(updated) });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-primary"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updated = faqs.filter((_, i) => i !== idx);
                            setFaqs(updated);
                            handleSaveSettings({ ...settingsForm, FAQS_JSON: JSON.stringify(updated) });
                          }}
                          className="text-zinc-500 hover:text-red-400 p-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODULE 6: AJUSTES PRINCIPALES & INTEGRACIONES */}
          {/* ========================================================================= */}
          {(activeTab === 'settings' || activeTab === 'integraciones') && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
              <div className="bg-[#12141a] p-6 rounded-2xl border border-white/10 space-y-6">
                <h2 className="text-base font-bold uppercase tracking-tight text-white flex items-center gap-2 border-b border-white/10 pb-4">
                  <SettingsIcon className="text-primary" size={20} />
                  <span>Configuración General del Sitio & Webhooks</span>
                </h2>

                <div className="space-y-6">
                  {/* Hero, Logo, Instalaciones Uploaders */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">1. Imágenes del Sitio (Hero, Logo & Instalaciones)</h3>
                    <div className="space-y-4">
                      <ImageUploader
                        label="Imagen de Fondo Hero (Portada Principal)"
                        value={settingsForm.HERO_IMG || ''}
                        onChange={(val) => {
                          const updated = { ...settingsForm, HERO_IMG: val };
                          setSettingsForm(updated);
                          handleSaveSettings(updated);
                        }}
                        aspectRatio={16 / 9}
                        placeholder="/assets/hero_bg_custom.jpg"
                      />

                      <ImageUploader
                        label="Logo Oficial del Taller MasterTech"
                        value={settingsForm.LOGO_URL || ''}
                        onChange={(val) => {
                          const updated = { ...settingsForm, LOGO_URL: val };
                          setSettingsForm(updated);
                          handleSaveSettings(updated);
                        }}
                        aspectRatio={1 / 1}
                        placeholder="/logo.png"
                      />

                      <ImageUploader
                        label="Imagen de la Sección 'NUESTRAS INSTALACIONES'"
                        value={settingsForm.IMG_INSTALACIONES || ''}
                        onChange={(val) => {
                          const updated = { ...settingsForm, IMG_INSTALACIONES: val };
                          setSettingsForm(updated);
                          handleSaveSettings(updated);
                        }}
                        aspectRatio={4 / 3}
                        placeholder="/assets/instalaciones.jpg"
                      />
                    </div>
                  </div>

                  {/* Video Reel Link */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                        URL del Reel de Instagram / Video Promocional de Portada
                      </label>
                      {settingsForm.HERO_REEL_URL && (
                        <a
                          href={settingsForm.HERO_REEL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-primary hover:underline font-bold flex items-center gap-1"
                        >
                          <ExternalLink size={12} />
                          <span>Abrir Enlace</span>
                        </a>
                      )}
                    </div>
                    <input
                      type="text"
                      value={settingsForm.HERO_REEL_URL || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const updated = { ...settingsForm, HERO_REEL_URL: val };
                        setSettingsForm(updated);
                        handleSaveSettings(updated);
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-xs font-bold text-white outline-none focus:border-primary"
                      placeholder="Ej. https://www.instagram.com/reel/DYQxwH6jywd/ o tu video mp4"
                    />
                    <p className="text-[10.5px] text-zinc-500">
                      Pega cualquier link de Instagram Reel. Se reproducirá automáticamente en la portada del sitio web.
                    </p>
                  </div>

                  {/* Phone & WhatsApp Links */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">2. Canales de Contacto & Redes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">Teléfono de Contacto (Texto)</label>
                        <input
                          type="text"
                          value={settingsForm.PHONE_NUMBER || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, PHONE_NUMBER: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase block mb-1">Enlace Directo a WhatsApp</label>
                        <input
                          type="text"
                          value={settingsForm.WHATSAPP_LINK || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, WHATSAPP_LINK: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-primary"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold text-pink-400 uppercase block mb-1">Perfil Oficial de Instagram</label>
                        <input
                          type="text"
                          value={settingsForm.INSTAGRAM_LINK || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, INSTAGRAM_LINK: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-pink-500"
                          placeholder="https://www.instagram.com/tallermastertech/"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Telegram Integration */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h3 className="text-xs font-black uppercase text-amber-400">3. Telegram Bot Notifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[9px] text-zinc-400 block mb-1">Telegram Bot Token</label>
                        <input
                          type="text"
                          value={settingsForm.TELEGRAM_BOT_TOKEN || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, TELEGRAM_BOT_TOKEN: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs font-mono text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-zinc-400 block mb-1">Telegram Chat ID (Grupo)</label>
                        <input
                          type="text"
                          value={settingsForm.TELEGRAM_CHAT_ID || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, TELEGRAM_CHAT_ID: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs font-mono text-white outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-zinc-400 block mb-1">Telegram Topic ID (Opcional)</label>
                        <input
                          type="text"
                          value={settingsForm.TELEGRAM_TOPIC_ID || ''}
                          onChange={(e) => setSettingsForm({ ...settingsForm, TELEGRAM_TOPIC_ID: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs font-mono text-white outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => handleSaveSettings()}
                    disabled={isSavingSettings}
                    className="btn-primary !py-2.5 !px-6 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-none shadow-lg"
                  >
                    {isSavingSettings ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    <span>Guardar Todos los Ajustes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL EDIT CATALOG PRODUCT */}
      {isCatalogModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white uppercase">{editingProduct.id ? 'Editar Repuesto' : 'Nuevo Repuesto'}</h3>
              <button onClick={() => setIsCatalogModalOpen(false)} className="text-zinc-400 hover:text-white"><X size={18} /></button>
            </div>

            {aiStatusMsg && (
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-bold flex items-center gap-2">
                <Sparkles size={16} />
                <span>{aiStatusMsg}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-zinc-400 font-bold block">Número de Parte OEM</label>
                <button
                  type="button"
                  onClick={() => handleAiAutofill()}
                  disabled={isAiAutofilling}
                  className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 text-[10px] font-black uppercase px-2 py-0.5 rounded-lg flex items-center gap-1"
                >
                  <Sparkles size={12} className={isAiAutofilling ? 'animate-spin' : ''} />
                  <span>Autofill IA</span>
                </button>
              </div>

              <input
                type="text"
                value={editingProduct.partNumber || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, partNumber: e.target.value })}
                onBlur={(e) => { if (e.target.value && !editingProduct.title) handleAiAutofill(e.target.value); }}
                placeholder="Ej. OEM #52088898AD"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none focus:border-primary"
              />

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Título del Repuesto</label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Precio</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-bold outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Categoría</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Descripción Corta</label>
                <textarea
                  rows={2}
                  value={editingProduct.desc}
                  onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
              </div>

              <ImageUploader
                label="Imagen Principal"
                value={editingProduct.img || ''}
                onChange={(val) => setEditingProduct({ ...editingProduct, img: val })}
                aspectRatio={4 / 3}
                placeholder="/assets/servicio-mecanica.jpg"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button onClick={() => setIsCatalogModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400 text-xs font-bold">Cancelar</button>
              <button onClick={() => handleSaveCatalogItem(editingProduct)} className="btn-primary !py-2 !px-5 text-xs font-black uppercase border-none">Guardar Repuesto</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT JORNADA */}
      {isJornadaModalOpen && editingJornada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white uppercase">Editar Jornada VIP</h3>
              <button onClick={() => setIsJornadaModalOpen(false)} className="text-zinc-400 hover:text-white"><X size={18} /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Distintivo / Badge</label>
                <input
                  type="text"
                  value={editingJornada.badge}
                  onChange={(e) => setEditingJornada({ ...editingJornada, badge: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Título de la Jornada</label>
                <input
                  type="text"
                  value={editingJornada.title}
                  onChange={(e) => setEditingJornada({ ...editingJornada, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Precio Regular</label>
                  <input
                    type="text"
                    value={editingJornada.regularPrice}
                    onChange={(e) => setEditingJornada({ ...editingJornada, regularPrice: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Precio Jornada Promo</label>
                  <input
                    type="text"
                    value={editingJornada.promoPrice}
                    onChange={(e) => setEditingJornada({ ...editingJornada, promoPrice: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-bold text-primary outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Subtítulo / Descripción</label>
                <textarea
                  rows={2}
                  value={editingJornada.subtitle}
                  onChange={(e) => setEditingJornada({ ...editingJornada, subtitle: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
              </div>

              <ImageUploader
                label="Imagen Promocional"
                value={editingJornada.img || ''}
                onChange={(val) => setEditingJornada({ ...editingJornada, img: val })}
                aspectRatio={16 / 9}
                placeholder="/assets/servicio-mecanica.jpg"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button onClick={() => setIsJornadaModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400 text-xs font-bold">Cancelar</button>
              <button onClick={() => handleSaveJornadaItem(editingJornada)} className="btn-primary !py-2 !px-5 text-xs font-black uppercase border-none">Guardar Jornada</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
