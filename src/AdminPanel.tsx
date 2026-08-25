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
  ChevronLeft,
  List, 
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
  ChevronDown,
  Filter,
  Bot,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Mail,
  Eye,
  EyeOff,
  UserCheck,
  Key,
  History,
  FileText,
  Activity,
  ShieldAlert,
  Crown,
  Briefcase,
  ShoppingCart,
  Building2,
  CreditCard,
  Copy,
  DollarSign,
  Wallet,
  QrCode,
  Truck,
  PhoneCall,
  FileCheck,
  Sun,
  Moon,
  Banknote,
  Smartphone
} from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import BrechaCambiariaPanel from './components/BrechaCambiariaPanel';
import { getTallerStatus } from './utils/tallerStatus';

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

export interface CatalogItem {
  id: number;
  title: string;
  category: string;
  price: string;
  desc: string;
  longDesc?: string;
  img?: string;
  isPopular?: boolean;
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
  { id: "reprogramacion", badge: "Jornada de Potenciación", title: "Reprogramación Electrónica & Chiptuning (Stage 1 / Stage 2)", subtitle: "Aumenta la potencia y el torque de tu vehículo de forma segura optimizando el software de la computadora (ECU/TCU).", img: "/assets/servicio-mecanica.jpg", regularPrice: "$250 USD", promoPrice: "$160 USD", discountBadge: "AHORRAS $90 USD", duration: "2 a 3 horas", benefits: ["Incremento de +15% a +35% de HP y Torque comprobables", "Eliminación total del retardo (lag) del pedal del acelerador", "Ahorro de hasta un 10% de combustible en viajes largos y autopista"], specs: [{ label: "Potencia Extra", val: "+25 HP a +65 HP" }, { label: "Garantía", val: "1 Año Software" }], compatibleModels: "Toyota, Jeep, Ford, Chevrolet, Nissan, VW & Turbo." },
  { id: "egr-dpf", badge: "Solución Electrónica Definitiva", title: "Desactivación Electrónica EGR / DPF / AdBlue / DTC Off", subtitle: "Elimina fallas molestas de Check Engine, atascamiento de Válvula EGR y problemas de Filtro DPF o AdBlue sin dañar el motor.", img: "/assets/servicio-electricidad.jpg", regularPrice: "$180 USD", promoPrice: "$120 USD", discountBadge: "AHORRAS $60 USD", duration: "1.5 a 2.5 horas", benefits: ["Anulación electrónica limpia de Válvula EGR", "Solución definitiva a regeneración atascada de Filtro DPF", "Eliminación de modo emergencia/limitación por AdBlue"], specs: [{ label: "Falla EGR/DPF", val: "100% Resuelta" }, { label: "Check Engine", val: "Luz Apagada" }], compatibleModels: "Toyota Hilux/Fortuner, Ford Ranger, Mitsubishi, Nissan NP300, VW Amarok." }
];

export interface MetodoPagoBanco {
  id?: string;
  banco: string;
  tipoCuenta: 'Corriente' | 'Ahorro';
  numeroCuenta: string;
  titular: string;
  documento: string;
}

export interface MetodoPagoMovil {
  id?: string;
  banco: string;
  telefono: string;
  documento: string;
  titular?: string;
}

export interface MetodoZelle {
  correoTelefono: string;
  titular: string;
}

export interface MetodoBinance {
  payId: string;
  correoBinance?: string;
  walletUsdt?: string;
  titular?: string;
}

export interface Proveedor {
  id: string;
  nombreComercial: string;
  razonSocial?: string;
  rif?: string;
  categoria: string;
  contactoNombre?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  aceptaCredito?: boolean;
  diasCredito?: string;
  notas?: string;
  bancos: MetodoPagoBanco[];
  pagoMovil: MetodoPagoMovil[];
  zelle?: MetodoZelle;
  binance?: MetodoBinance;
  aceptaEfectivoDivisas?: boolean;
  actualizadoEn?: string;
}

export const BANCOS_VENEZUELA = [
  { codigo: "0102", nombre: "Banco de Venezuela (0102)" },
  { codigo: "0104", nombre: "Banco Venezolano de Crédito (0104)" },
  { codigo: "0105", nombre: "Banco Mercantil (0105)" },
  { codigo: "0108", nombre: "Banco Provincial BBVA (0108)" },
  { codigo: "0114", nombre: "Bancaribe (0114)" },
  { codigo: "0115", nombre: "Banco Exterior (0115)" },
  { codigo: "0128", nombre: "Banco Caroní (0128)" },
  { codigo: "0134", nombre: "Banesco Banco Universal (0134)" },
  { codigo: "0137", nombre: "Banco Sofitasa (0137)" },
  { codigo: "0138", nombre: "Banco Plaza (0138)" },
  { codigo: "0146", nombre: "Bangente (0146)" },
  { codigo: "0151", nombre: "BFC Banco Fondo Común (0151)" },
  { codigo: "0156", nombre: "100% Banco (0156)" },
  { codigo: "0157", nombre: "DelSur Banco Universal (0157)" },
  { codigo: "0163", nombre: "Banco del Tesoro (0163)" },
  { codigo: "0166", nombre: "Banco Agrícola de Venezuela (0166)" },
  { codigo: "0168", nombre: "Bancrecer (0168)" },
  { codigo: "0169", nombre: "Mi Banco (0169)" },
  { codigo: "0171", nombre: "Banco Activo (0171)" },
  { codigo: "0172", nombre: "Bancamiga Banco Universal (0172)" },
  { codigo: "0173", nombre: "Banco Internacional de Desarrollo (0173)" },
  { codigo: "0174", nombre: "Banplus Banco Universal (0174)" },
  { codigo: "0175", nombre: "Banco Bicentenario del Pueblo (0175)" },
  { codigo: "0177", nombre: "BANFANB (0177)" },
  { codigo: "0191", nombre: "BNC - Banco Nacional de Crédito (0191)" },
  { codigo: "0601", nombre: "Instituto Municipal de Crédito Popular (0601)" }
];

export const DEFAULT_PROVEEDORES: Proveedor[] = [
  {
    id: "prov-demo-master",
    nombreComercial: "Distribuidora Automotriz Total C.A. (Demo Proveedor)",
    razonSocial: "Inversiones & Repuestos Automotriz Total C.A.",
    rif: "J-30987654-2",
    categoria: "Autopartes & Repuestos Generales",
    contactoNombre: "Lcdo. Alejandro Rivas (Ventas & Cobranzas)",
    telefono: "+584141234567",
    correo: "ventas@repuestostotal.com",
    direccion: "Av. 4 de Mayo, Edif. Centro Automotriz, Local 4, Porlamar",
    aceptaCredito: true,
    diasCredito: "30 Días de Crédito",
    notas: "Proveedor de prueba completo con todos los métodos de pago activos: Cuentas Bancarias Banesco y Mercantil, Pago Móvil, Zelle, Binance Pay y Crédito 30 días.",
    bancos: [
      {
        id: "b1_demo",
        banco: "Banesco",
        tipoCuenta: "Corriente",
        numeroCuenta: "01340055123456789012",
        titular: "Distribuidora Automotriz Total C.A.",
        documento: "J-30987654-2"
      },
      {
        id: "b2_demo",
        banco: "Banco Mercantil",
        tipoCuenta: "Corriente",
        numeroCuenta: "01050024987654321098",
        titular: "Distribuidora Automotriz Total C.A.",
        documento: "J-30987654-2"
      }
    ],
    pagoMovil: [
      {
        id: "pm1_demo",
        banco: "Banesco (0134)",
        telefono: "04141234567",
        documento: "J-30987654-2",
        titular: "Distribuidora Automotriz Total C.A."
      },
      {
        id: "pm2_demo",
        banco: "Banco de Venezuela (0102)",
        telefono: "04129876543",
        documento: "J-30987654-2",
        titular: "Distribuidora Automotriz Total C.A."
      }
    ],
    zelle: {
      correoTelefono: "pagos@repuestostotalusa.com",
      titular: "Auto Parts Total LLC"
    },
    binance: {
      payId: "83920184",
      correoBinance: "crypto@repuestostotal.com"
    },
    aceptaEfectivoDivisas: true,
    actualizadoEn: new Date().toISOString()
  },
  {
    id: "prov-1",
    nombreComercial: "Distribuidora Mopar & Jeep Oriente",
    razonSocial: "Inversiones Mopar Oriente C.A.",
    rif: "J-31456789-0",
    categoria: "Repuestos Motor & OEM",
    contactoNombre: "Ing. Carlos Mendoza (Ventas)",
    telefono: "+584123565012",
    correo: "ventas@moparoriente.com",
    direccion: "Av. 4 de Mayo, Edif. Centro Automotriz, Porlamar",
    aceptaCredito: true,
    diasCredito: "15 días crédito",
    notas: "Descuento del 10% para Taller MasterTech en compras mayores a $300. Código cliente: MT-104.",
    bancos: [
      {
        id: "b1",
        banco: "Banesco",
        tipoCuenta: "Corriente",
        numeroCuenta: "01340055123456789012",
        titular: "Inversiones Mopar Oriente C.A.",
        documento: "J-31456789-0"
      },
      {
        id: "b2",
        banco: "Mercantil",
        tipoCuenta: "Corriente",
        numeroCuenta: "01050022987654321098",
        titular: "Inversiones Mopar Oriente C.A.",
        documento: "J-31456789-0"
      }
    ],
    pagoMovil: [
      {
        id: "pm1",
        banco: "Banesco (0134)",
        telefono: "04141234567",
        documento: "J-31456789-0",
        titular: "Inversiones Mopar Oriente C.A."
      }
    ],
    zelle: {
      correoTelefono: "pagos@moparoriente.com",
      titular: "Mopar Oriente USA LLC"
    },
    binance: {
      payId: "84729104",
      correoBinance: "crypto@moparoriente.com",
      walletUsdt: "TYdNG78sV29xK9... (TRC20)",
      titular: "Mopar Oriente Crypto"
    },
    aceptaEfectivoDivisas: true
  },
  {
    id: "prov-2",
    nombreComercial: "Lubricantes & Filtros Margarita",
    razonSocial: "Lubricentro Insular S.R.L.",
    rif: "J-40123987-1",
    categoria: "Lubricantes & Filtros",
    contactoNombre: "Marcos Suárez (Despacho)",
    telefono: "+584149876543",
    correo: "pedidos@lubrimargarita.com",
    direccion: "Sector Conejeros, Galpón 14, Porlamar",
    diasCredito: "Contado / Entrega Inmediata",
    notas: "Distribuidor oficial Motul, Mobil 1 y filtros Mann Filter. Despacho a taller sin costo adicional.",
    bancos: [
      {
        id: "b3",
        banco: "Banco de Venezuela (BDV)",
        tipoCuenta: "Corriente",
        numeroCuenta: "01020112345678901234",
        titular: "Lubricentro Insular S.R.L.",
        documento: "J-40123987-1"
      }
    ],
    pagoMovil: [
      {
        id: "pm2",
        banco: "Bancamiga (0172)",
        telefono: "04249876543",
        documento: "J-40123987-1",
        titular: "Lubricentro Insular S.R.L."
      }
    ],
    zelle: {
      correoTelefono: "lubrimargarita@gmail.com",
      titular: "Marcos Suarez"
    },
    binance: {
      payId: "59103847",
      correoBinance: "lubri_crypto@hotmail.com"
    },
    aceptaEfectivoDivisas: true
  },
  {
    id: "prov-3",
    nombreComercial: "Frenos & Suspensiones del Caribe",
    razonSocial: "Caribe Brakes C.A.",
    rif: "J-29876543-2",
    categoria: "Frenos & Suspensión",
    contactoNombre: "Lcda. Andrea Peña",
    telefono: "+584245550011",
    direccion: "Av. Juan Bautista Arismendi, La Asunción",
    diasCredito: "7 días crédito",
    notas: "Pastillas cerámicas Wagner, discos Raybestos y amortiguadores KYB.",
    bancos: [
      {
        id: "b4",
        banco: "Bancaribe",
        tipoCuenta: "Corriente",
        numeroCuenta: "01140011223344556677",
        titular: "Caribe Brakes C.A.",
        documento: "J-29876543-2"
      }
    ],
    pagoMovil: [
      {
        id: "pm3",
        banco: "Mercantil (0105)",
        telefono: "04125550011",
        documento: "V-18765432",
        titular: "Andrea Pena"
      }
    ],
    zelle: {
      correoTelefono: "andrea_brakes@yahoo.com",
      titular: "Andrea Pena"
    },
    binance: {
      payId: "39201948"
    },
    aceptaEfectivoDivisas: true
  }
];

interface AdminPanelProps {
  config?: any;
  onLogout?: () => void;
}

export default function AdminPanel({ config: propConfig, onLogout }: AdminPanelProps) {
  // Theme State: Dark & Light Mode
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('mastertech_admin_theme') as 'dark' | 'light') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('mastertech_admin_theme', next);
      localStorage.setItem('mastertech_public_theme', next);
      localStorage.setItem('mastertech_theme', next);
    } catch (e) {}
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'light') {
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
    }
  }, [theme]);

  // Auth State (Email & Password Multi-user)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mastertech_admin_token'));
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const u = localStorage.getItem('mastertech_admin_user');
      return u ? JSON.parse(u) : { name: 'Administrador MasterTech', email: 'admin@tallermastertech.com', role: 'Super Administrador' };
    } catch (e) {
      return { name: 'Administrador MasterTech', email: 'admin@tallermastertech.com', role: 'Super Administrador' };
    }
  });

  // Admin Users Management State
  const [adminUsersList, setAdminUsersList] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userModalError, setUserModalError] = useState('');
  const [isSavingUser, setIsSavingUser] = useState(false);

  // Permission Checker: Full Access (CEO, Director, Super Admin, Marketing), Administración (Dashboard + Proveedores), Logística (Dashboard + Citas + Catálogo + Jornadas + Proveedores)
  const isFullAdminUser = (user: any) => {
    if (!user) return false;
    const email = (user.email || '').toLowerCase().trim();
    const role = (user.role || '').toLowerCase().trim();
    const access = (user.accessLevel || '').toLowerCase().trim();

    // J. Vasquez y J. Vicente Betancourt tienen acceso total siempre
    if (email === 'jvaask16@gmail.com' || email === 'josevbv@gmail.com') return true;
    if (access === 'full') return true;
    if (role.includes('ceo') || role.includes('director') || role.includes('marketing') || role.includes('super')) return true;
    return false;
  };

  const getAllowedTabsForUser = (user: any): string[] => {
    if (!user) return ['dashboard'];
    const email = (user.email || '').toLowerCase().trim();
    const role = (user.role || '').toLowerCase().trim();
    const access = (user.accessLevel || '').toLowerCase().trim();

    // 1. Acceso Total
    if (email === 'jvaask16@gmail.com' || email === 'josevbv@gmail.com' || access === 'full') {
      return ['dashboard', 'leads', 'catalogo', 'jornadas', 'proveedores', 'contenido', 'usuarios', 'settings', 'auditoria'];
    }
    if (role.includes('ceo') || role.includes('director') || role.includes('marketing') || role.includes('super')) {
      return ['dashboard', 'leads', 'catalogo', 'jornadas', 'proveedores', 'contenido', 'usuarios', 'settings', 'auditoria'];
    }

    // 2. Rol Administración (Solo Dashboard para ver la tasa y Admin Proveedores)
    if (access === 'administracion' || role === 'administración' || role === 'administracion') {
      return ['dashboard', 'proveedores'];
    }

    // 3. Rol Logística (Dashboard, Citas, Catálogo, Jornadas y Admin Proveedores)
    if (access === 'logistica' || role.includes('log') || role.includes('asesor') || role.includes('coordinad')) {
      return ['dashboard', 'leads', 'catalogo', 'jornadas', 'proveedores'];
    }

    return ['dashboard', 'proveedores'];
  };

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'catalogo' | 'jornadas' | 'proveedores' | 'settings' | 'contenido' | 'auditoria' | 'usuarios'>('dashboard');
  const [contentSubTab, setContentSubTab] = useState<'servicios' | 'faqs' | 'equipo' | 'testimonios'>('servicios');

  // Audit Logs State (Registro de Actividad y Cambios de Usuarios)
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [logCategoryFilter, setLogCategoryFilter] = useState<string>('TODOS');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Fetch Audit Logs
  const fetchAuditLogs = async () => {
    if (!token) return;
    setIsLoadingLogs(true);
    try {
      const res = await fetch(`/api/admin/logs?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(Array.isArray(data.logs) ? data.logs : []);
      }
    } catch (e) {
      console.error("Error fetching audit logs:", e);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  // Helper: Log Client-Side Actions to Audit Logs
  const logClientAction = async (action: string, category: 'AUTH' | 'CATALOGO' | 'JORNADAS' | 'CITAS' | 'USUARIOS' | 'AJUSTES' | 'CONTENIDO', details: string) => {
    if (!token) return;
    try {
      await fetch('/api/admin/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          action,
          category,
          details,
          userName: currentUser?.name || 'J. Vicente Betancourt',
          userEmail: currentUser?.email || 'josevbv@gmail.com',
          userRole: currentUser?.role || 'CEO - Director'
        })
      });
    } catch (e) {}
  };

  // Route guard: auto redirect limited users to allowed tab if they attempt restricted tab
  useEffect(() => {
    if (currentUser) {
      const allowed = getAllowedTabsForUser(currentUser);
      if (!allowed.includes(activeTab)) {
        setActiveTab(allowed[0] as any || 'dashboard');
      }
    }
    if (activeTab === 'auditoria') {
      fetchAuditLogs();
    }
  }, [activeTab, currentUser]);

  // Dynamic Data States
  const [settings, setSettings] = useState<any>({});
  const [settingsForm, setSettingsForm] = useState<any>({});
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSuccessMessage, setSettingsSuccessMessage] = useState('');
  const [settingsErrorMessage, setSettingsErrorMessage] = useState('');

  // Leads State & Segregated Categories (Trabajo, Catálogo, Inspección, Taller)
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [leadCategoryFilter, setLeadCategoryFilter] = useState<'TODOS' | 'TRABAJO' | 'CATALOGO' | 'INSPECCION' | 'TALLER'>('TODOS');
  const [dateFilter, setDateFilter] = useState<string>('TODOS');
  const [customDateFilter, setCustomDateFilter] = useState<string>('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [pickerMonthDate, setPickerMonthDate] = useState<Date>(new Date());

  // Citas View Mode & Manual Appointment Modal State
  const [citasViewMode, setCitasViewMode] = useState<'calendar' | 'list'>('calendar');
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<string | null>(null);
  const [selectedDayCita, setSelectedDayCita] = useState<any | null>(null);
  const [hoveredCitaInfo, setHoveredCitaInfo] = useState<{ cita: any; rect: DOMRect } | null>(null);
  const [isManualCitaModalOpen, setIsManualCitaModalOpen] = useState(false);
  const [manualCitaData, setManualCitaData] = useState<{
    nombre: string;
    telefono: string;
    vehiculo: string;
    fecha: string;
    hora: string;
    servicio: string;
    notas: string;
    status: string;
    prioridad: string;
  }>({
    nombre: '',
    telefono: '',
    vehiculo: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    servicio: 'Inspección Diagnóstica 25 Puntos Gratuita',
    notas: '',
    status: 'Confirmado',
    prioridad: 'media'
  });
  const [isSavingManualCita, setIsSavingManualCita] = useState(false);
  const [manualCitaError, setManualCitaError] = useState('');

  // Recordatorios State & Persistence
  const [reminders, setReminders] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('mastertech_reminders_cache');
      return stored ? JSON.parse(stored) : [
        {
          id: 'rem-demo-1',
          titulo: 'Llamar a cliente Raed Maklad para confirmar repuesto Toyota Corolla',
          fecha: new Date().toISOString().split('T')[0],
          hora: '10:00',
          clienteNombre: 'Raed Maklad',
          clienteTelefono: '04147935555',
          categoria: 'seguimiento',
          prioridad: 'alta',
          completado: false,
          createdAt: new Date().toISOString()
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderFilter, setReminderFilter] = useState<'PENDIENTES' | 'HOY' | '3_DIAS' | '1_DIA' | 'COMPLETADOS' | 'TODOS'>('PENDIENTES');
  const [newReminderData, setNewReminderData] = useState({
    titulo: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    clienteNombre: '',
    clienteTelefono: '',
    categoria: 'cita',
    prioridad: 'media'
  });

  const saveReminders = async (updated: any[]) => {
    setReminders(updated);
    try {
      localStorage.setItem('mastertech_reminders_cache', JSON.stringify(updated));
      const serialized = JSON.stringify(updated.slice(0, 100));
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'SAVED_REMINDERS', value: serialized })
      });
    } catch (e) {}
  };

  // Solicitud de Permisos de Notificaciones Push Nativas y Registro de Service Worker para Segundo Plano
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then((reg) => {
          console.log("Service Worker activado para notificaciones en segundo plano:", reg.scope);
        }).catch((err) => console.warn("Service worker notice:", err));
      }
    }
  }, []);

  // Helper para emitir notificaciones persistentes (vía Service Worker si está disponible o Web API)
  const dispatchPushNotification = (title: string, options: any) => {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification(title, options);
        });
      } else if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, options);
      }
    } catch (e) {}
  };

  // Helper: Calcular diferencia en días entre hoy y la fecha objetivo (YYYY-MM-DD)
  const getDaysUntilDate = (targetDateStr: string): number | null => {
    if (!targetDateStr) return null;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = new Date(targetDateStr + 'T00:00:00');
      target.setHours(0, 0, 0, 0);
      const diffTime = target.getTime() - today.getTime();
      return Math.round(diffTime / (1000 * 3600 * 24));
    } catch (e) {
      return null;
    }
  };

  // Helper: Capitalizar nombres (ej. "carlos perez" -> "Carlos Perez")
  const formatName = (str: string): string => {
    if (!str) return 'Cliente';
    return str.split(' ').map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '').join(' ');
  };

  // Helper: Limpiar duplicados de sistema en el campo de Notas/Falla
  const cleanFallaNotes = (rawStr: string): string => {
    if (!rawStr) return '';
    let cleaned = rawStr;
    cleaned = cleaned.replace(/(?:\[?\s*Cita Inspección:\s*\]?)+/gi, '').trim();
    cleaned = cleaned.replace(/\[Prioridad:\s*(?:alta|media|baja)\]/gi, '').trim();
    cleaned = cleaned.replace(/\[Agendado por Logística[^\]]*\]/gi, '').trim();
    cleaned = cleaned.replace(/^\[?\d{4}-\d{2}-\d{2}\]?\s*(?:Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)?[^]*?a las \d{2}:\d{2}\s*(?:AM|PM)?/gi, '').trim();
    cleaned = cleaned.replace(/^[:\s\-\]\[]+/, '').trim();
    return cleaned;
  };

  // Intervalo de chequeo de recordatorios para emitir notificación en pantalla/dispositivo (Incluye 3 días y 1 día antes)
  useEffect(() => {
    const checkReminderInterval = setInterval(() => {
      if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') return;
      
      const todayStr = new Date().toISOString().split('T')[0];
      const nowTime = new Date().toTimeString().slice(0, 5); // HH:MM

      // 1. Chequeo de Recordatorios Operativos Manuales
      reminders.forEach(r => {
        if (!r.completado && r.fecha === todayStr && r.hora === nowTime && !r.notified) {
          dispatchPushNotification('🔔 Recordatorio Operativo Taller', {
            body: `📌 ${r.titulo}${r.clienteNombre ? `\n👤 Cliente: ${formatName(r.clienteNombre)}` : ''}`,
            icon: '/logo.png',
            tag: r.id
          });
          r.notified = true;
        }
      });

      // 2. Chequeo Automático de Citas a 3 Días y 1 Día de distancia
      leads.forEach(l => {
        const leadDate = getLeadDateStr(l);
        if (!leadDate || l.status === 'Cancelado' || l.status === 'Atendido') return;
        
        const daysDiff = getDaysUntilDate(leadDate);
        const notifKey3Days = `notified_3d_${l.id}`;
        const notifKey1Day = `notified_1d_${l.id}`;
        const clientName = formatName(l.nombre);
        const leadTime = getLeadTimeStr(l);

        if (daysDiff === 3 && !sessionStorage.getItem(notifKey3Days)) {
          dispatchPushNotification('📢 Cita Agendada en 3 Días', {
            body: `👤 ${clientName} | 🚗 ${l.vehiculo || 'Vehículo'}\n🛠️ ${l.servicio} (📅 ${leadDate})`,
            icon: '/logo.png',
            tag: `lead-3d-${l.id}`
          });
          sessionStorage.setItem(notifKey3Days, 'true');
        }

        if (daysDiff === 1 && !sessionStorage.getItem(notifKey1Day)) {
          dispatchPushNotification('⏰ Cita Agendada para Mañana', {
            body: `👤 ${clientName} | 🚗 ${l.vehiculo || 'Vehículo'}\n🛠️ ${l.servicio} (⏰ ${leadTime})`,
            icon: '/logo.png',
            tag: `lead-1d-${l.id}`
          });
          sessionStorage.setItem(notifKey1Day, 'true');
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkReminderInterval);
  }, [reminders, leads]);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderData.titulo.trim()) return;
    const item = {
      id: 'rem-' + Date.now(),
      ...newReminderData,
      completado: false,
      createdAt: new Date().toISOString()
    };
    const updated = [item, ...reminders];
    saveReminders(updated);
    setNewReminderData({
      titulo: '',
      fecha: new Date().toISOString().split('T')[0],
      hora: '09:00',
      clienteNombre: '',
      clienteTelefono: '',
      categoria: 'cita',
      prioridad: 'media'
    });
  };

  const handleToggleReminder = (id: string | number) => {
    const updated = reminders.map(r => r.id === id ? { ...r, completado: !r.completado } : r);
    saveReminders(updated);
  };

  const handleDeleteReminder = (id: string | number) => {
    const updated = reminders.filter(r => r.id !== id);
    saveReminders(updated);
  };

  // Helper: Extraer Fecha YYYY-MM-DD de una Cita/Lead
  const getLeadDateStr = (l: any): string => {
    if (!l) return '';
    if (l.fecha_hora) {
      const matchYMD = String(l.fecha_hora).match(/\d{4}-\d{2}-\d{2}/);
      if (matchYMD) return matchYMD[0];
      const matchDMY = String(l.fecha_hora).match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      if (matchDMY) {
        const [, d, m, y] = matchDMY;
        return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      }
    }
    if (l.created_at) {
      const match = String(l.created_at).match(/\d{4}-\d{2}-\d{2}/);
      if (match) return match[0];
    }
    return '';
  };

  // Helper: Extraer Hora Format de una Cita/Lead
  const getLeadTimeStr = (l: any): string => {
    if (!l) return '09:00 AM';
    if (l.fecha_hora) {
      const timeMatch = String(l.fecha_hora).match(/\b(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)\b/);
      if (timeMatch) return timeMatch[1].toUpperCase();
    }
    if (l.created_at) {
      try {
        const d = new Date(l.created_at);
        return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      } catch (e) {}
    }
    return '09:00 AM';
  };

  // Handler: Guardar Cita Manual
  const handleSaveManualCita = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCitaData.nombre.trim() || !manualCitaData.telefono.trim() || !manualCitaData.fecha) {
      setManualCitaError('Por favor completa el nombre, teléfono y fecha de la cita.');
      return;
    }
    setIsSavingManualCita(true);
    setManualCitaError('');

    try {
      const fechaHoraFormatted = `${manualCitaData.fecha} ${manualCitaData.hora || '09:00'}`;
      const payload = {
        nombre: manualCitaData.nombre.trim(),
        telefono: manualCitaData.telefono.trim(),
        vehiculo: manualCitaData.vehiculo.trim() || 'Vehículo no especificado',
        servicio: manualCitaData.servicio || 'Servicio General Taller',
        fecha_hora: fechaHoraFormatted,
        falla: manualCitaData.notas ? `[Prioridad: ${manualCitaData.prioridad || 'media'}] [Agendado por Logística - ${currentUser?.name || 'Asesor'}] ${manualCitaData.notas}` : `[Prioridad: ${manualCitaData.prioridad || 'media'}] [Agendado por Logística - ${currentUser?.name || 'Asesor'}]`,
        status: manualCitaData.status || 'Confirmado',
        prioridad: manualCitaData.prioridad || 'media',
        tipo: 'manual',
        origen: 'admin',
        is_manual: true
      };

      const newManualLead = {
        id: Date.now(),
        nombre: manualCitaData.nombre.trim(),
        telefono: manualCitaData.telefono.trim(),
        vehiculo: manualCitaData.vehiculo.trim() || 'Vehículo no especificado',
        servicio: manualCitaData.servicio || 'Servicio General Taller',
        fecha_hora: fechaHoraFormatted,
        falla: manualCitaData.notas ? `[Prioridad: ${manualCitaData.prioridad || 'media'}] [Agendado por Logística - ${currentUser?.name || 'Asesor'}] ${manualCitaData.notas}` : `[Prioridad: ${manualCitaData.prioridad || 'media'}] [Agendado por Logística - ${currentUser?.name || 'Asesor'}]`,
        status: manualCitaData.status || 'Confirmado',
        prioridad: manualCitaData.prioridad || 'media',
        created_at: new Date().toISOString()
      };

      // Optimistic update for instant UI feedback (< 5ms)
      setLeads(prev => [newManualLead, ...prev]);
      setIsManualCitaModalOpen(false);
      setManualCitaData({
        nombre: '',
        telefono: '',
        vehiculo: '',
        fecha: new Date().toISOString().split('T')[0],
        hora: '09:00',
        servicio: 'Inspección Diagnóstica 25 Puntos Gratuita',
        notas: '',
        status: 'Confirmado',
        prioridad: 'media'
      });

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        logClientAction('Agendó Cita Manual', 'CITAS', `Agendó cita para ${manualCitaData.nombre} (${manualCitaData.vehiculo}) el ${fechaHoraFormatted}`);
        fetchLeads();
      }
    } catch (err: any) {
      console.warn("Manual cita background sync warning:", err);
    } finally {
      setIsSavingManualCita(false);
    }
  };

  // Helper: Clasificar tipo de solicitud
  const getLeadCategory = (l: any): 'trabajo' | 'catalogo' | 'inspeccion' | 'taller' => {
    if (!l) return 'taller';
    const s = String(l.servicio || '').toLowerCase();
    const v = String(l.vehiculo || '').toLowerCase();
    const f = String(l.falla || '').toLowerCase();

    if (s.includes('reclutamiento') || s.includes('postul') || v.includes('postulante') || f.includes('[experiencia:') || f.includes('[cv') || f.includes('cv:')) {
      return 'trabajo';
    }
    if (s.includes('catálogo') || s.includes('catalogo') || s.includes('pedido') || f.includes('piezas') || f.includes('carrito')) {
      return 'catalogo';
    }
    if (s.includes('línea de inspección') || s.includes('inspeccion') || s.includes('inspección') || l.fecha_hora || l.fecha_turno) {
      return 'inspeccion';
    }
    return 'taller';
  };

  // Helper: Extraer enlace de CV si existe
  const getCvDownloadUrl = (l: any): string | null => {
    if (!l) return null;
    const text = `${l.falla || ''} ${l.detalles || ''} ${l.cv_url || ''}`;
    const match = text.match(/https?:\/\/[^\s\]\)\"]+(?:\.pdf|\.doc|\.docx|\.jpg|\.png|cvs\/[^\s\]\)\"]+)/i);
    return match ? match[0] : (l.cv_url || null);
  };

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

  // Proveedores & Comercios Aliados (Control de Métodos de Pago y Datos Bancarios)
  const [proveedoresList, setProveedoresList] = useState<Proveedor[]>(() => {
    try {
      const s = localStorage.getItem('mastertech_settings_store');
      if (s) { const p = JSON.parse(s); if (p.PROVEEDORES_JSON) return JSON.parse(p.PROVEEDORES_JSON); }
    } catch (e) {}
    return DEFAULT_PROVEEDORES;
  });
  const [editingProveedor, setEditingProveedor] = useState<Proveedor | null>(null);
  const [isProveedorModalOpen, setIsProveedorModalOpen] = useState(false);
  const [selectedProveedorFicha, setSelectedProveedorFicha] = useState<Proveedor | null>(null);
  const [selectedFichaTab, setSelectedFichaTab] = useState<'bancos' | 'pagoMovil' | 'zelle' | 'binance'>('bancos');
  const [proveedorSearch, setProveedorSearch] = useState('');
  const [proveedorMetodoFilter, setProveedorMetodoFilter] = useState<'TODOS' | 'CREDITO' | 'CONTADO' | 'ZELLE' | 'BINANCE' | 'PAGO_MOVIL' | 'BANCOS'>('TODOS');
  const [proveedorCategoriaFilter, setProveedorCategoriaFilter] = useState<string>('TODAS');
  const [copiedFieldId, setCopiedFieldId] = useState<string | null>(null);
  const [isSavingProveedor, setIsSavingProveedor] = useState(false);
  const [expandedProvIds, setExpandedProvIds] = useState<string[]>([]);

  const openFichaModal = (prov: Proveedor) => {
    setSelectedProveedorFicha(prov);
    if (prov.bancos && prov.bancos.length > 0) {
      setSelectedFichaTab('bancos');
    } else if (prov.pagoMovil && prov.pagoMovil.length > 0) {
      setSelectedFichaTab('pagoMovil');
    } else if (prov.zelle?.correoTelefono) {
      setSelectedFichaTab('zelle');
    } else if (prov.binance?.payId) {
      setSelectedFichaTab('binance');
    } else {
      setSelectedFichaTab('bancos');
    }
  };

  const toggleExpandProv = (id: string) => {
    setExpandedProvIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Helper para copiar al portapapeles con confirmación visual
  const copyToClipboard = (text: string, fieldId: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedFieldId(fieldId);
      setTimeout(() => setCopiedFieldId(null), 2000);
    } catch (e) {}
  };

  // Helper para copiar Pago Móvil en formato puro (Código de Banco, Teléfono, C.I./RIF en líneas limpias)
  const formatCleanPagoMovil = (pm: { banco?: string; telefono?: string; documento?: string }) => {
    let bankCode = '';
    if (pm.banco) {
      const match = pm.banco.match(/\b(\d{4})\b/) || pm.banco.match(/\((\d{4})\)/);
      if (match) {
        bankCode = match[1];
      } else {
        bankCode = pm.banco.trim();
      }
    }
    const cleanPhone = (pm.telefono || '').trim();
    const cleanDoc = (pm.documento || '').trim();

    return `${bankCode}\r\n${cleanPhone}\r\n${cleanDoc}`.trim();
  };

  // Helper para copiar ficha bancaria completa
  const copyFullProveedorPaymentInfo = (prov: Proveedor) => {
    let text = `🏢 *DATOS DE PAGO - ${prov.nombreComercial.toUpperCase()}*\n`;
    if (prov.rif) text += `📄 *RIF / Identificación:* ${prov.rif}\n`;
    if (prov.contactoNombre) text += `👤 *Contacto:* ${prov.contactoNombre} (${prov.telefono || ''})\n`;
    text += `\n`;

    if (prov.bancos && prov.bancos.length > 0) {
      text += `🏦 *CUENTAS BANCARIAS NACIONALES:*\n`;
      prov.bancos.forEach((b) => {
        text += `• ${b.banco} (${b.tipoCuenta || 'Corriente'})\n  N° Cuenta: ${b.numeroCuenta}\n  Titular: ${b.titular}\n  Doc: ${b.documento}\n\n`;
      });
    }

    if (prov.pagoMovil && prov.pagoMovil.length > 0) {
      text += `📱 *PAGO MÓVIL:*\n`;
      prov.pagoMovil.forEach((pm) => {
        text += `• Banco: ${pm.banco}\n  Teléfono: ${pm.telefono}\n  C.I./RIF: ${pm.documento}\n  ${pm.titular ? `Titular: ${pm.titular}\n` : ''}\n`;
      });
    }

    if (prov.zelle && prov.zelle.correoTelefono) {
      text += `💵 *ZELLE:*\n• Correo/Tlf: ${prov.zelle.correoTelefono}\n• Titular: ${prov.zelle.titular}\n\n`;
    }

    if (prov.binance && (prov.binance.payId || prov.binance.walletUsdt)) {
      text += `🟡 *BINANCE / CRYPTO:*\n`;
      if (prov.binance.payId) text += `• Binance Pay ID: ${prov.binance.payId}\n`;
      if (prov.binance.correoBinance) text += `• Correo Binance: ${prov.binance.correoBinance}\n`;
      if (prov.binance.walletUsdt) text += `• USDT Wallet: ${prov.binance.walletUsdt}\n`;
      text += `\n`;
    }

    if (prov.aceptaCredito) {
      text += `⏳ *Condición:* Acepta Crédito (${prov.diasCredito || 'Plazo acordado'})\n`;
    } else {
      text += `💵 *Condición:* Solo Contado / Pago Inmediato\n`;
    }
    if (prov.notas) text += `📝 *Notas:* ${prov.notas}\n`;

    copyToClipboard(text, `full-${prov.id}`);
  };

  // Helper para guardar lista de proveedores en Base de Datos Supabase & Caché
  const handleSaveProveedores = async (updatedList: Proveedor[], logMsg?: string) => {
    setProveedoresList(updatedList);
    setIsSavingProveedor(true);
    const activeAuthToken = token || localStorage.getItem('mastertech_admin_token') || 'mastertech2026';

    try {
      const jsonStr = JSON.stringify(updatedList);
      
      // 1. Guardar en localStorage de inmediato
      try {
        const stored = localStorage.getItem('mastertech_settings_store') || '{}';
        const parsed = JSON.parse(stored);
        parsed.PROVEEDORES_JSON = jsonStr;
        localStorage.setItem('mastertech_settings_store', JSON.stringify(parsed));
      } catch (e) {}

      // Sincronizar estados React para evitar sobreescritura accidental
      setSettings(prev => ({ ...prev, PROVEEDORES_JSON: jsonStr }));
      setSettingsForm(prev => ({ ...prev, PROVEEDORES_JSON: jsonStr }));

      // 2. Persistir en Supabase vía endpoints seguros
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeAuthToken}`
      };

      await Promise.allSettled([
        fetch('/api/admin/proveedores', {
          method: 'POST',
          headers,
          body: JSON.stringify({ proveedores: updatedList })
        }),
        fetch('/api/settings', {
          method: 'PUT',
          headers,
          body: JSON.stringify({ PROVEEDORES_JSON: jsonStr })
        })
      ]);

      if (logMsg) {
        logClientAction('Gestión Proveedores', 'AJUSTES', logMsg);
      }
    } catch (e) {
      console.error("Error guardando proveedores en Supabase:", e);
    } finally {
      setIsSavingProveedor(false);
    }
  };

  // Content States
  const [services, setServices] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

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

    // Priority: localData (current user edits) overrides serverData
    const merged: any = { ...(serverData || {}), ...(localData || {}) };
    setSettings(merged);
    setSettingsForm(merged);

    if (merged.CATALOG_PRODUCTS_JSON) {
      try { const p = JSON.parse(merged.CATALOG_PRODUCTS_JSON); if (Array.isArray(p)) setCatalogItems(p); } catch (e) {}
    }
    if (merged.JORNADAS_JSON) {
      try { const p = JSON.parse(merged.JORNADAS_JSON); if (Array.isArray(p)) setJornadasList(p); } catch (e) {}
    }
    if (merged.PROVEEDORES_JSON !== undefined && merged.PROVEEDORES_JSON !== null) {
      try { 
        const p = typeof merged.PROVEEDORES_JSON === 'string' ? JSON.parse(merged.PROVEEDORES_JSON) : merged.PROVEEDORES_JSON; 
        if (Array.isArray(p)) {
          setProveedoresList(p);
        }
      } catch (e) {}
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

  // Fetch Admin Users
  const fetchAdminUsers = async () => {
    if (!token) return;
    setIsLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          setAdminUsersList(data.users);
        }
      }
    } catch (e) {
      console.error("Error fetching admin users:", e);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLeads();
      fetchAdminUsers();
    }
  }, [token]);

  // Auth Handler (Email + Password)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.trim(),
          password: passwordInput.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('mastertech_admin_token', data.token);
        if (data.user) {
          localStorage.setItem('mastertech_admin_user', JSON.stringify(data.user));
          setCurrentUser(data.user);
        }
        setToken(data.token);
        setEmailInput('');
        setPasswordInput('');
      } else {
        setAuthError(data.error || 'Correo o contraseña incorrectos.');
      }
    } catch (err) {
      setAuthError('Error al conectar con el servidor.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mastertech_admin_token');
    localStorage.removeItem('mastertech_admin_user');
    setToken(null);
    if (onLogout) onLogout();
  };

  // User CRUD Handlers
  const handleSaveAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !token) return;
    if (!editingUser.name || !editingUser.email) {
      setUserModalError('El nombre y el correo son obligatorios.');
      return;
    }

    setIsSavingUser(true);
    setUserModalError('');
    try {
      const payload = {
        ...editingUser,
        actorName: currentUser?.name || 'J. Vicente Betancourt',
        actorEmail: currentUser?.email || 'josevbv@gmail.com',
        actorRole: currentUser?.role || 'CEO - Director'
      };
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsUserModalOpen(false);
        setEditingUser(null);
        fetchAdminUsers();
      } else {
        setUserModalError(data.error || 'Error al guardar el usuario.');
      }
    } catch (err) {
      setUserModalError('Error de conexión al guardar.');
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleDeleteAdminUser = async (id: string) => {
    if (!token || !window.confirm('¿Seguro que deseas revocar el acceso a este usuario?')) return;
    try {
      const targetUser = adminUsersList.find(u => u.id === id);
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          actorName: currentUser?.name || 'J. Vicente Betancourt',
          actorEmail: currentUser?.email || 'josevbv@gmail.com',
          actorRole: currentUser?.role || 'CEO - Director'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchAdminUsers();
      } else {
        alert(data.error || 'No se pudo eliminar el usuario.');
      }
    } catch (err) {
      alert('Error de conexión al eliminar usuario.');
    }
  };

  // Section-by-section Independent Save States
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSectionSuccess, setSavedSectionSuccess] = useState<string | null>(null);

  // Dedicated Independent Save Function for each module with strict Supabase database verification
  const handleSaveSection = async (sectionKey: string, customPayload?: any) => {
    const activeAuthToken = token || localStorage.getItem('mastertech_admin_token') || 'admin-token';
    setSavingSection(sectionKey);
    setSavedSectionSuccess(null);

    const targetForm = {
      ...settingsForm,
      ...(customPayload || {}),
      TEAM_MEMBERS_JSON: (customPayload && customPayload.TEAM_MEMBERS_JSON !== undefined) ? customPayload.TEAM_MEMBERS_JSON : JSON.stringify(teamMembers),
      REVIEWS_JSON: (customPayload && customPayload.REVIEWS_JSON !== undefined) ? customPayload.REVIEWS_JSON : JSON.stringify(reviews),
      SERVICES_JSON: (customPayload && customPayload.SERVICES_JSON !== undefined) ? customPayload.SERVICES_JSON : JSON.stringify(services),
      FAQS_JSON: (customPayload && customPayload.FAQS_JSON !== undefined) ? customPayload.FAQS_JSON : JSON.stringify(faqs),
      CATALOG_PRODUCTS_JSON: (customPayload && customPayload.CATALOG_PRODUCTS_JSON !== undefined) ? customPayload.CATALOG_PRODUCTS_JSON : JSON.stringify(catalogItems),
      JORNADAS_JSON: (customPayload && customPayload.JORNADAS_JSON !== undefined) ? customPayload.JORNADAS_JSON : JSON.stringify(jornadasList),
      PROVEEDORES_JSON: (customPayload && customPayload.PROVEEDORES_JSON !== undefined) ? customPayload.PROVEEDORES_JSON : JSON.stringify(proveedoresList)
    };

    try {
      // 1. Await server and Supabase persistence response strictly
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeAuthToken}`
        },
        body: JSON.stringify(targetForm)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || errData.details || `Error en servidor (HTTP ${res.status})`);
      }

      const data = await res.json();
      const confirmedSettings = { ...(data.settings || {}), ...targetForm };

      // 2. Update local state ONLY AFTER database confirmation
      setSettings(confirmedSettings);
      setSettingsForm(confirmedSettings);
      try { localStorage.setItem('mastertech_settings_store', JSON.stringify(confirmedSettings)); } catch (e) {}
      try { window.dispatchEvent(new Event('mastertech_settings_updated')); } catch (e) {}

      setSavedSectionSuccess(sectionKey);
      logClientAction('Modificación de Ajustes', 'AJUSTES', `Guardó cambios en el módulo "${sectionKey}" del sitio web.`);
      alert('✅ ¡Cambios guardados y revalidados exitosamente en Supabase y la web pública!');
      setTimeout(() => setSavedSectionSuccess(null), 4000);
    } catch (err: any) {
      console.error("Fallo al guardar sección en Supabase:", err);
      alert(`❌ Error de Persistencia en Base de Datos: ${err.message || 'No se pudo conectar con Supabase'}`);
    } finally {
      setSavingSection(null);
    }
  };

  // Save Settings Function
  const handleSaveSettings = async (overrideForm?: any) => {
    return handleSaveSection('general', overrideForm);
  };

  // Lead Status Handler
  const handleUpdateLeadStatus = async (id: number | string, newStatus: string) => {
    if (!token) return;
    const targetLead = leads.find(l => String(l.id) === String(id));
    const updated = leads.map(l => String(l.id) === String(id) ? { ...l, status: newStatus } : l);
    setLeads(updated);
    if (selectedLead && String(selectedLead.id) === String(id)) setSelectedLead({ ...selectedLead, status: newStatus });

    logClientAction('Actualizó Estado de Cita', 'CITAS', `Marcó la cita de ${targetLead?.nombre || 'Cliente'} (${targetLead?.telefono || ''}) como "${newStatus}".`);

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
    const targetLead = leads.find(l => String(l.id) === String(id));
    const updated = leads.filter(l => String(l.id) !== String(id));
    setLeads(updated);
    if (selectedLead && String(selectedLead.id) === String(id)) setSelectedLead(null);

    logClientAction('Eliminación de Cita', 'CITAS', `Eliminó la cita de ${targetLead?.nombre || 'Cliente'} (${targetLead?.servicio || 'Servicio'}).`);

    try {
      await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
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
        if (data.success) {
          const item = data.item || data;
          setEditingProduct(prev => {
            if (!prev) return null;
            return {
              ...prev,
              title: item.title || item.titulo || prev.title,
              category: item.category || item.categoria || prev.category,
              price: item.price || item.precio || prev.price || '$35 USD',
              desc: item.desc || item.descripcionCorta || item.descripcion || prev.desc,
              longDesc: item.longDesc || item.descripcionDetallada || item.desc || prev.longDesc,
              badge: item.badge || prev.badge || 'Repuesto Certificado OEM',
              compatibility: item.compatibility || item.compatibilidad || prev.compatibility,
              partNumber: item.partNumber || item.codigo || prev.partNumber,
              specs: (item.specs && item.specs.length > 0) ? item.specs : (prev.specs || []),
              img: item.img || prev.img || ''
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
    const isEdit = product.id && catalogItems.some(p => p.id === product.id);
    let updated: CatalogItem[] = [];
    if (isEdit) {
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

    logClientAction(
      isEdit ? 'Modificación de Repuesto' : 'Creación de Repuesto',
      'CATALOGO',
      `${isEdit ? 'Modificó datos del repuesto' : 'Añadió nuevo repuesto'} "${product.title}" (${product.category || 'General'}, ${product.price || '$0'}).`
    );
  };

  const handleDeleteCatalogItem = (id: number | string) => {
    if (!window.confirm('¿Eliminar este repuesto o producto del catálogo?')) return;
    const targetProd = catalogItems.find(p => String(p.id) === String(id));
    const updated = catalogItems.filter(p => String(p.id) !== String(id));
    setCatalogItems(updated);
    const jsonStr = JSON.stringify(updated);
    const updatedForm = { ...settingsForm, CATALOG_PRODUCTS_JSON: jsonStr };
    setSettingsForm(updatedForm);
    setSettings(updatedForm);
    handleSaveSettings(updatedForm);

    logClientAction('Eliminación de Repuesto', 'CATALOGO', `Eliminó el repuesto "${targetProd?.title || id}" del catálogo.`);
  };

  // Jornada Item Save
  const handleSaveJornadaItem = (jornada: any) => {
    const isEdit = jornada.id && jornadasList.some(j => String(j.id) === String(jornada.id));
    let updated: any[] = [];
    if (isEdit) {
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

    logClientAction(
      isEdit ? 'Modificación de Jornada VIP' : 'Creación de Jornada VIP',
      'JORNADAS',
      `${isEdit ? 'Actualizó la jornada' : 'Publicó nueva jornada'} "${jornada.title}" (Promo: ${jornada.promoPrice}).`
    );
  };

  const handleDeleteJornadaItem = (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar esta jornada especial?')) return;
    const targetJor = jornadasList.find(j => String(j.id) === String(id));
    const updated = jornadasList.filter(j => String(j.id) !== String(id));
    setJornadasList(updated);
    const jsonStr = JSON.stringify(updated);
    const updatedForm = { ...settingsForm, JORNADAS_JSON: jsonStr };
    setSettingsForm(updatedForm);
    setSettings(updatedForm);
    handleSaveSettings(updatedForm);

    logClientAction('Eliminación de Jornada VIP', 'JORNADAS', `Eliminó la jornada VIP "${targetJor?.title || id}".`);
  };

  // Filtered Leads with category segregation and date classification
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch =
        (l.nombre || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.telefono || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.vehiculo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.servicio || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.falla || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || l.status === statusFilter;
      
      const cat = getLeadCategory(l);
      let matchesCategory = true;
      if (leadCategoryFilter === 'TRABAJO') matchesCategory = (cat === 'trabajo');
      else if (leadCategoryFilter === 'CATALOGO') matchesCategory = (cat === 'catalogo');
      else if (leadCategoryFilter === 'INSPECCION') matchesCategory = (cat === 'inspeccion');
      else if (leadCategoryFilter === 'TALLER') matchesCategory = (cat === 'taller');

      const matchesDate = (() => {
        if (dateFilter === 'TODOS') return true;
        const leadDate = getLeadDateStr(l);
        if (!leadDate) return false;

        const todayStr = new Date().toISOString().split('T')[0];
        if (dateFilter === 'HOY') return leadDate === todayStr;

        if (dateFilter === 'MANANA') {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const tomorrowStr = tomorrow.toISOString().split('T')[0];
          return leadDate === tomorrowStr;
        }

        if (dateFilter === 'ESTA_SEMANA') {
          const now = new Date();
          const startOfWeek = new Date(now);
          const day = now.getDay();
          const diff = now.getDate() - day + (day === 0 ? -6 : 1);
          startOfWeek.setDate(diff);
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);

          const lDate = new Date(leadDate + 'T00:00:00');
          return lDate >= startOfWeek && lDate <= endOfWeek;
        }

        if (dateFilter === 'DIA_ESPECIFICO') {
          if (!customDateFilter) return true;
          return leadDate === customDateFilter;
        }

        return true;
      })();

      return matchesSearch && matchesStatus && matchesCategory && matchesDate;
    });
  }, [leads, searchQuery, statusFilter, leadCategoryFilter, dateFilter, customDateFilter]);

  // LOGIN SCREEN (Email & Password Multi-user)
  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0b0f] text-white flex items-center justify-center p-6 selection:bg-primary selection:text-black">
        <div className="max-w-md w-full bg-[#12141a]/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-display font-black uppercase tracking-tight text-white">Panel de Administración</h1>
            <p className="text-xs text-zinc-400">Ingresa tu correo y contraseña autorizada para gestionar Taller MasterTech.</p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@tallermastertech.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white outline-none focus:border-amber-400 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="admin-pass" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  id="admin-pass"
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-11 text-xs text-white font-mono outline-none focus:border-amber-400 transition-all placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
                  title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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
    <div className={`min-h-screen flex flex-col md:flex-row font-sans selection:bg-primary selection:text-black transition-colors duration-200 ${
      theme === 'light' 
        ? 'bg-[#e5e8ed] text-slate-900 admin-theme-light' 
        : 'bg-[#0a0b0f] text-white admin-theme-dark'
    }`}>
      {/* Light Mode CSS Overrides Scope */}
      <style>{`
        /* ========================================================================= */
        /* GLOBAL LIGHT THEME ARCHITECTURE (WARM SOFT GRAY - ANTI-FATIGUE HIGH CONTRAST) */
        /* ========================================================================= */
        .admin-theme-light {
          background-color: #e5e8ed !important;
          color: #0f172a !important;
        }

        /* 1. Main Backgrounds and Cards */
        .admin-theme-light [class*="bg-[#"],
        .admin-theme-light [class*="from-[#"],
        .admin-theme-light [class*="via-[#"],
        .admin-theme-light [class*="to-[#"] {
          background: #f1f4f8 !important;
          background-color: #f1f4f8 !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
        }

        /* 2. Sub-cards, Containers & Contact Boxes */
        .admin-theme-light [class*="bg-black"],
        .admin-theme-light [class*="bg-zinc-9"],
        .admin-theme-light [class*="bg-slate-9"],
        .admin-theme-light [class*="bg-gray-9"] {
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
        }
        .admin-theme-light [class*="bg-black"] *,
        .admin-theme-light [class*="bg-zinc-9"] * {
          color: #0f172a !important;
        }

        /* 3. Border Harmonization */
        .admin-theme-light [class*="border-white"] {
          border-color: #cbd5e1 !important;
        }

        /* 4. Sidebar & Header in Matte Soft Gray */
        .admin-theme-light aside {
          background-color: #edf0f4 !important;
          border-color: #cbd5e1 !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
        }
        .admin-theme-light header {
          background-color: rgba(237, 240, 245, 0.98) !important;
          border-color: #cbd5e1 !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
        }

        /* 5. Navigation Sidebar Buttons */
        .admin-theme-light nav button {
          color: #1e293b !important;
        }
        .admin-theme-light nav button:hover {
          background-color: #dde2e8 !important;
          color: #0f172a !important;
        }
        .admin-theme-light nav button span {
          color: #1e293b !important;
        }
        .admin-theme-light nav button:hover span {
          color: #0f172a !important;
        }
        .admin-theme-light .bg-gradient-to-r.from-amber-500\/20.to-primary\/20,
        .admin-theme-light nav button.bg-gradient-to-r {
          background: #fef3c7 !important;
          border-color: #f59e0b !important;
          color: #78350f !important;
          font-weight: 800 !important;
          box-shadow: 0 2px 4px rgba(245, 158, 11, 0.15) !important;
        }
        .admin-theme-light .bg-gradient-to-r.from-amber-500\/20.to-primary\/20 span,
        .admin-theme-light nav button.bg-gradient-to-r span {
          color: #78350f !important;
          font-weight: 800 !important;
        }

        /* 6. Inputs, Selects & Textareas */
        .admin-theme-light input,
        .admin-theme-light select,
        .admin-theme-light textarea {
          background-color: #ffffff !important;
          border: 1.5px solid #94a3b8 !important;
          color: #0f172a !important;
          font-weight: 600 !important;
        }
        .admin-theme-light input::placeholder,
        .admin-theme-light textarea::placeholder {
          color: #64748b !important;
          font-weight: 500 !important;
        }
        .admin-theme-light input:focus,
        .admin-theme-light select:focus,
        .admin-theme-light textarea:focus {
          border-color: #d97706 !important;
          outline: 2px solid rgba(217, 119, 6, 0.2) !important;
        }

        /* 7. Typography Hierarchy & High Contrast (Crystal Clear) */
        .admin-theme-light h1,
        .admin-theme-light h2,
        .admin-theme-light h3,
        .admin-theme-light h4 {
          color: #0f172a !important;
        }
        .admin-theme-light [class*="text-white"],
        .admin-theme-light [class*="text-zinc-100"],
        .admin-theme-light [class*="text-zinc-200"],
        .admin-theme-light [class*="text-zinc-300"] {
          color: #0f172a !important;
          font-weight: 600;
        }
        .admin-theme-light [class*="text-zinc-400"],
        .admin-theme-light [class*="text-zinc-500"],
        .admin-theme-light [class*="text-zinc-600"],
        .admin-theme-light [class*="text-slate-400"],
        .admin-theme-light [class*="text-slate-500"] {
          color: #1e293b !important;
          font-weight: 600;
        }

        /* 8. Colored Highlight Texts */
        .admin-theme-light .text-primary,
        .admin-theme-light [class*="text-amber-400"],
        .admin-theme-light [class*="text-amber-300"] {
          color: #92400e !important;
          font-weight: 800 !important;
        }
        .admin-theme-light [class*="text-blue-300"],
        .admin-theme-light [class*="text-blue-400"] {
          color: #1e40af !important;
          font-weight: 800 !important;
        }
        .admin-theme-light [class*="text-emerald-300"],
        .admin-theme-light [class*="text-emerald-400"] {
          color: #166534 !important;
          font-weight: 800 !important;
        }
        .admin-theme-light [class*="text-cyan-300"],
        .admin-theme-light [class*="text-cyan-400"] {
          color: #0e7490 !important;
          font-weight: 800 !important;
        }

        /* 9. Light Mode Badges & Chips (Pills) */
        .admin-theme-light span[class*="bg-blue-500/"],
        .admin-theme-light span[class*="bg-cyan-500/"] {
          background-color: #dbeafe !important;
          border-color: #93c5fd !important;
          color: #1e40af !important;
        }
        .admin-theme-light span[class*="bg-blue-500/"] span,
        .admin-theme-light span[class*="bg-cyan-500/"] span {
          color: #1e40af !important;
        }

        .admin-theme-light span[class*="bg-emerald-500/"] {
          background-color: #dcfce7 !important;
          border-color: #86efac !important;
          color: #166534 !important;
        }
        .admin-theme-light span[class*="bg-emerald-500/"] span {
          color: #166534 !important;
        }

        .admin-theme-light span[class*="bg-amber-"],
        .admin-theme-light div[class*="bg-amber-100"],
        .admin-theme-light div[class*="bg-amber-200"] {
          background-color: #fef3c7 !important;
          border-color: #fcd34d !important;
          color: #78350f !important;
        }
        .admin-theme-light span[class*="bg-amber-"] *,
        .admin-theme-light div[class*="bg-amber-100"] *,
        .admin-theme-light div[class*="bg-amber-200"] * {
          color: #78350f !important;
          font-weight: 900 !important;
        }

        /* Status bar & Sources text */
        .admin-theme-light div[class*="border-l-amber-500"] {
          background-color: #f1f4f8 !important;
          border-color: #cbd5e1 !important;
          border-left-color: #f59e0b !important;
        }
        .admin-theme-light div[class*="border-l-amber-500"] * {
          color: #0f172a !important;
          font-weight: 700 !important;
        }

        /* 10. Solid Action Buttons (Crisp White/Black text) */
        .admin-theme-light button[class*="bg-blue-600"],
        .admin-theme-light button[class*="bg-blue-500"] {
          background-color: #2563eb !important;
          color: #ffffff !important;
          border: none !important;
        }
        .admin-theme-light button[class*="bg-blue-600"] *,
        .admin-theme-light button[class*="bg-blue-500"] * {
          color: #ffffff !important;
          font-weight: 800 !important;
        }

        .admin-theme-light button[class*="bg-emerald-600"],
        .admin-theme-light button[class*="bg-emerald-500"],
        .admin-theme-light a[class*="bg-emerald-500"] {
          background-color: #16a34a !important;
          color: #ffffff !important;
          border: none !important;
        }
        .admin-theme-light button[class*="bg-emerald-600"] *,
        .admin-theme-light button[class*="bg-emerald-500"] *,
        .admin-theme-light a[class*="bg-emerald-500"] * {
          color: #ffffff !important;
          font-weight: 800 !important;
        }

        .admin-theme-light button[class*="bg-amber-500"] {
          background-color: #f59e0b !important;
          color: #000000 !important;
          border: none !important;
        }
        .admin-theme-light button[class*="bg-amber-500"] * {
          color: #000000 !important;
          font-weight: 900 !important;
        }

        /* 11. Secondary & Ghost Buttons (Light background, dark text) */
        .admin-theme-light button[class*="bg-white/"],
        .admin-theme-light button[class*="bg-slate-200"] {
          background-color: #ffffff !important;
          color: #0f172a !important;
          border: 1px solid #cbd5e1 !important;
        }
        .admin-theme-light button[class*="bg-white/"] *,
        .admin-theme-light button[class*="bg-slate-200"] * {
          color: #0f172a !important;
          font-weight: 700 !important;
        }
        .admin-theme-light button[class*="bg-white/"]:hover,
        .admin-theme-light button[class*="bg-slate-200"]:hover {
          background-color: #e2e8f0 !important;
        }

        /* 11. Tables */
        .admin-theme-light table {
          background-color: #f1f4f8 !important;
          color: #0f172a !important;
        }
        .admin-theme-light th,
        .admin-theme-light thead th {
          background-color: #e2e7ec !important;
          color: #0f172a !important;
          border-bottom: 2px solid #cbd5e1 !important;
          font-weight: 800 !important;
        }
        .admin-theme-light td {
          background-color: #ffffff !important;
          color: #0f172a !important;
          border-bottom: 1px solid #cbd5e1 !important;
        }
        .admin-theme-light td span,
        .admin-theme-light td p,
        .admin-theme-light td div {
          color: #0f172a !important;
          font-weight: 600;
        }
        .admin-theme-light tr:hover td {
          background-color: #f1f5f9 !important;
        }
        .admin-theme-light .btn-primary {
          background: linear-gradient(135deg, #eab308, #ca8a04) !important;
          color: #000000 !important;
          box-shadow: 0 4px 6px -1px rgba(234, 179, 8, 0.3) !important;
        }
        .admin-theme-light [class*="bg-amber-500/10"],
        .admin-theme-light [class*="bg-amber-500/20"] {
          background-color: #fef3c7 !important;
          color: #92400e !important;
          border-color: #fde68a !important;
        }
        .admin-theme-light [class*="bg-emerald-500/10"],
        .admin-theme-light [class*="bg-emerald-500/20"] {
          background-color: #dcfce7 !important;
          color: #166534 !important;
          border-color: #bbf7d0 !important;
        }
        .admin-theme-light [class*="bg-cyan-500/10"],
        .admin-theme-light [class*="bg-cyan-500/20"] {
          background-color: #ecfeff !important;
          color: #0e7490 !important;
          border-color: #a5f3fc !important;
        }
        .admin-theme-light [class*="bg-rose-500/10"],
        .admin-theme-light [class*="bg-rose-500/20"] {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
          border-color: #fecaca !important;
        }

        /* 10. Modals & Overlays */
        .admin-theme-light .fixed.inset-0 [class*="bg-[#"] {
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        }
      `}</style>
      
      {/* SIDEBAR NAVIGATION (Desktop & Mobile) */}
      <aside className="w-full md:w-64 bg-[#12141a]/95 backdrop-blur-2xl border-r border-white/10 shrink-0 p-5 flex flex-col justify-between z-30 transition-colors">
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

          {/* Navigation Menu (Filtered by User Access Level) */}
          <nav className="space-y-1">
            {(() => {
              const isFull = isFullAdminUser(currentUser);
              const allTabs = [
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
                { id: 'leads', label: `Calendario & Citas (${leads.length})`, icon: <Calendar size={18} /> },
                { id: 'catalogo', label: 'Catálogo Repuestos', icon: <Package size={18} /> },
                { id: 'jornadas', label: 'Jornadas VIP', icon: <Zap size={18} />, badge: 'PROMO' },
                { id: 'proveedores', label: `Admin Proveedores (${proveedoresList.length})`, icon: <Building2 size={18} /> },
                { id: 'contenido', label: 'Contenidos Sitio Web', icon: <Layers size={18} /> },
                { id: 'usuarios', label: 'Equipo & Accesos', icon: <Users size={18} /> },
                { id: 'settings', label: 'Ajustes Principales', icon: <SettingsIcon size={18} /> },
                { id: 'auditoria', label: 'Registro de Actividad', icon: <History size={18} /> },
              ];

              const allowedTabsIds = getAllowedTabsForUser(currentUser);
              const allowedTabs = allTabs.filter(t => allowedTabsIds.includes(t.id));

              return allowedTabs.map(tab => {
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
              });
            })()}
          </nav>
        </div>

        {/* Footer Admin info, Theme Toggle & Logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          {/* Theme Quick Switcher in Sidebar */}
          <button
            onClick={toggleTheme}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? <Moon size={14} className="text-blue-400" /> : <Sun size={14} className="text-amber-500" />}
              <span>{theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}</span>
            </div>
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-white/10 text-amber-300">
              {theme === 'dark' ? 'Oscuro' : 'Claro'}
            </span>
          </button>

          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-primary/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-xs shrink-0 shadow-md">
              {(() => {
                const nameParts = (currentUser?.name || 'Admin MasterTech').split(' ');
                const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0].slice(0, 2);
                return initials.toUpperCase();
              })()}
            </div>
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">
                {currentUser?.name || 'Administrador MasterTech'}
              </span>
              <span className="text-[10px] text-amber-400 font-semibold block truncate">
                {currentUser?.role || 'Super Administrador'}
              </span>
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
        <header className="bg-[#12141a]/80 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 transition-colors">
          <div className="flex items-center gap-3">
            {(() => {
              const st = getTallerStatus(settings.IS_OPEN);
              return (
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${st.badgeBg} ${st.badgeBorder}`}>
                  <span className={`w-2 h-2 rounded-full ${st.dotColor} ${st.isOpen ? 'animate-ping' : ''}`} />
                  {st.isOpen ? 'TALLER ABIERTO — EN VIVO' : 'TALLER CERRADO — EN VIVO'}
                </span>
              );
            })()}
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline-block">| {timeStr}</span>
          </div>

          {/* Header Action Controls: Theme Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={15} className="text-amber-400" />
                  <span className="hidden sm:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-blue-500" />
                  <span className="hidden sm:inline">Modo Oscuro</span>
                </>
              )}
            </button>
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

              {/* Live Automotive Exchange Telemetry & Budget Calculator Panel (Placed First on Top) */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <BrechaCambiariaPanel initialOpen={true} />
              </div>

              {/* Segregated Metrics Grid */}
              {(() => {
                const jobApps = leads.filter(l => getLeadCategory(l) === 'trabajo');
                const catalogOrders = leads.filter(l => getLeadCategory(l) === 'catalogo');
                const inspectionLeads = leads.filter(l => getLeadCategory(l) === 'inspeccion');
                const workshopLeads = leads.filter(l => getLeadCategory(l) === 'taller');

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    {/* 1. Postulaciones de Trabajo */}
                    <div 
                      onClick={() => { setActiveTab('leads'); setLeadCategoryFilter('TRABAJO'); }}
                      className="bg-[#12141a] hover:bg-[#181a24] transition-all p-4 rounded-2xl border border-purple-500/30 space-y-1.5 cursor-pointer shadow-lg group"
                    >
                      <div className="flex justify-between items-center text-purple-400">
                        <span className="text-[9px] font-black uppercase tracking-wider">Postulaciones</span>
                        <Briefcase size={16} className="group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">{jobApps.length}</div>
                      <span className="text-[9px] text-zinc-500 block truncate">Talentos & CVs</span>
                    </div>

                    {/* 2. Pedidos Catálogo */}
                    <div 
                      onClick={() => { setActiveTab('leads'); setLeadCategoryFilter('CATALOGO'); }}
                      className="bg-[#12141a] hover:bg-[#181a24] transition-all p-4 rounded-2xl border border-blue-500/30 space-y-1.5 cursor-pointer shadow-lg group"
                    >
                      <div className="flex justify-between items-center text-blue-400">
                        <span className="text-[9px] font-black uppercase tracking-wider">Pedidos Catálogo</span>
                        <ShoppingCart size={16} className="group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">{catalogOrders.length}</div>
                      <span className="text-[9px] text-zinc-500 block truncate">Repuestos pedidos</span>
                    </div>

                    {/* 3. Línea Inspección */}
                    <div 
                      onClick={() => { setActiveTab('leads'); setLeadCategoryFilter('INSPECCION'); }}
                      className="bg-[#12141a] hover:bg-[#181a24] transition-all p-4 rounded-2xl border border-amber-500/30 space-y-1.5 cursor-pointer shadow-lg group"
                    >
                      <div className="flex justify-between items-center text-amber-400">
                        <span className="text-[9px] font-black uppercase tracking-wider">Inspección</span>
                        <Calendar size={16} className="group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">{inspectionLeads.length}</div>
                      <span className="text-[9px] text-zinc-500 block truncate">Línea gratuita</span>
                    </div>

                    {/* 4. Citas Taller */}
                    <div 
                      onClick={() => { setActiveTab('leads'); setLeadCategoryFilter('TALLER'); }}
                      className="bg-[#12141a] hover:bg-[#181a24] transition-all p-4 rounded-2xl border border-cyan-500/30 space-y-1.5 cursor-pointer shadow-lg group"
                    >
                      <div className="flex justify-between items-center text-cyan-400">
                        <span className="text-[9px] font-black uppercase tracking-wider">Citas Taller</span>
                        <Wrench size={16} className="group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">{workshopLeads.length}</div>
                      <span className="text-[9px] text-zinc-500 block truncate">Servicio general</span>
                    </div>

                    {/* 5. Repuestos en Catálogo */}
                    <div 
                      onClick={() => setActiveTab('catalogo')}
                      className="bg-[#12141a] hover:bg-[#181a24] transition-all p-4 rounded-2xl border border-white/10 space-y-1.5 cursor-pointer shadow-lg group"
                    >
                      <div className="flex justify-between items-center text-primary">
                        <span className="text-[9px] font-black uppercase tracking-wider">Catálogo</span>
                        <Package size={16} className="group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">{catalogItems.length}</div>
                      <span className="text-[9px] text-zinc-500 block truncate">Items en stock</span>
                    </div>

                    {/* 6. Especialistas Taller */}
                    <div 
                      onClick={() => { setActiveTab('contenido'); setContentSubTab('equipo'); }}
                      className="bg-[#12141a] hover:bg-[#181a24] transition-all p-4 rounded-2xl border border-emerald-500/30 space-y-1.5 cursor-pointer shadow-lg group"
                    >
                      <div className="flex justify-between items-center text-emerald-400">
                        <span className="text-[9px] font-black uppercase tracking-wider">Equipo</span>
                        <Users size={16} className="group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">{teamMembers.length}</div>
                      <span className="text-[9px] text-zinc-500 block truncate">Técnicos activos</span>
                    </div>
                  </div>
                );
              })()}

              {/* Recent Solicitudes / Leads Preview with Category Badges */}
              <div className="bg-[#12141a] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
                    <Clock className="text-primary" size={16} />
                    <span>Últimas Solicitudes Recibidas (Clasificadas)</span>
                  </h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs text-primary hover:underline font-bold">Ver todas ({leads.length}) →</button>
                </div>

                {leads.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-4 text-center">No hay registros de solicitudes recientes todavía.</p>
                ) : (
                  <div className="space-y-3">
                    {leads.slice(0, 6).map((l, idx) => {
                      const cat = getLeadCategory(l);
                      const cvUrl = getCvDownloadUrl(l);

                      return (
                        <div key={l.id || idx} className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">{l.nombre || 'Sin nombre'}</span>
                              
                              {/* Category Badge */}
                              {cat === 'trabajo' && (
                                <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                                  <Briefcase size={10} /> POSTULANTE
                                </span>
                              )}
                              {cat === 'catalogo' && (
                                <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                                  <ShoppingCart size={10} /> PEDIDO CATÁLOGO
                                </span>
                              )}
                              {cat === 'inspeccion' && (
                                <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                  <Calendar size={10} /> INSPECCIÓN
                                </span>
                              )}
                              {cat === 'taller' && (
                                <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                                  <Wrench size={10} /> TALLER
                                </span>
                              )}
                            </div>

                            <span className="text-[11px] text-zinc-400 block">
                              {l.vehiculo && l.vehiculo !== 'Postulante Equipo MasterTech' ? `${l.vehiculo} — ` : ''}
                              {l.servicio || 'Servicio'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            {/* Ver CV Button if exists */}
                            {cvUrl && (
                              <a
                                href={cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-[10px] font-bold flex items-center gap-1 transition-colors"
                                title="Ver / Descargar Currículum Vitae"
                              >
                                <FileText size={12} />
                                <span>Ver CV</span>
                              </a>
                            )}

                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
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
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODULE 2: GESTOR DE CITAS Y SOLICITUDES (SEGREGADAS POR ÁREA) */}
          {/* ========================================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fade-in">
              {(() => {
                const jobAppsCount = leads.filter(l => getLeadCategory(l) === 'trabajo').length;
                const catalogOrdersCount = leads.filter(l => getLeadCategory(l) === 'catalogo').length;
                const inspectionCount = leads.filter(l => getLeadCategory(l) === 'inspeccion').length;
                const workshopCount = leads.filter(l => getLeadCategory(l) === 'taller').length;

                return (
                  <>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">Gestión de Solicitudes y Citas</h1>
                        <p className="text-xs text-zinc-400 mt-1">Agenda visual interactiva y clasificación para Citas de Vehículos, Inspecciones, Catálogo y Talento.</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Selector Vista Calendario vs Tabla */}
                        <div className="flex items-center bg-slate-200 dark:bg-[#12141a] p-1 rounded-xl border border-slate-300 dark:border-white/10 shadow-inner">
                          <button
                            onClick={() => setCitasViewMode('calendar')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              citasViewMode === 'calendar' ? '!bg-primary !text-black font-black shadow-md' : 'text-slate-700 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                            }`}
                          >
                            <Calendar size={14} />
                            <span>Calendario</span>
                          </button>
                          <button
                            onClick={() => setCitasViewMode('list')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              citasViewMode === 'list' ? '!bg-slate-800 dark:!bg-white/20 !text-white font-black shadow-md' : 'text-slate-700 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                            }`}
                          >
                            <List size={14} />
                            <span>Tabla</span>
                          </button>
                        </div>

                        {/* Botón Agendar Cita Manual */}
                        <button
                          onClick={() => {
                            setManualCitaData({
                              nombre: '',
                              telefono: '',
                              vehiculo: '',
                              fecha: new Date().toISOString().split('T')[0],
                              hora: '09:00',
                              servicio: 'Inspección Diagnóstica 25 Puntos Gratuita',
                              notas: '',
                              status: 'Confirmado'
                            });
                            setManualCitaError('');
                            setIsManualCitaModalOpen(true);
                          }}
                          className="px-3.5 py-2 rounded-xl !bg-primary hover:!bg-amber-400 !text-black text-xs font-black uppercase tracking-tight flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                        >
                          <Plus size={15} />
                          <span>Agendar Cita Manual</span>
                        </button>

                        {/* Botón Gestor de Recordatorios */}
                        <button
                          onClick={() => setIsReminderModalOpen(true)}
                          className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-xs font-black uppercase tracking-tight flex items-center gap-1.5 hover:bg-slate-300 dark:hover:bg-white/20 transition-all cursor-pointer shadow-md"
                        >
                          <BellRing size={15} className="text-amber-500 shrink-0" />
                          <span>Recordatorios</span>
                          {reminders.filter(r => !r.completado).length > 0 && (
                            <span className="bg-amber-500 text-black text-[10px] font-black px-1.5 py-0.2 rounded-full">
                              {reminders.filter(r => !r.completado).length}
                            </span>
                          )}
                        </button>

                        <button onClick={fetchLeads} className="p-2 rounded-xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-zinc-300 flex items-center gap-1.5 hover:bg-slate-300 dark:hover:bg-white/10 transition-colors cursor-pointer">
                          <RefreshCw size={14} className={isLoadingLeads ? 'animate-spin' : ''} />
                          <span>Actualizar</span>
                        </button>
                      </div>
                    </div>

                    {/* Category Tabs / Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setLeadCategoryFilter('TODOS')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          leadCategoryFilter === 'TODOS'
                            ? '!bg-primary !text-black shadow-lg font-black'
                            : 'bg-white dark:bg-[#12141a] text-slate-700 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-slate-300 dark:border-white/10 shadow-sm'
                        }`}
                      >
                        <Layers size={14} />
                        <span>Todas las Solicitudes ({leads.length})</span>
                      </button>

                      <button
                        onClick={() => setLeadCategoryFilter('TRABAJO')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          leadCategoryFilter === 'TRABAJO'
                            ? 'bg-purple-600 text-white shadow-lg font-black'
                            : 'bg-white dark:bg-[#12141a] text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-white border border-purple-300 dark:border-purple-500/30 shadow-sm'
                        }`}
                      >
                        <Briefcase size={14} />
                        <span>Postulaciones & CVs ({jobAppsCount})</span>
                      </button>

                      <button
                        onClick={() => setLeadCategoryFilter('CATALOGO')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          leadCategoryFilter === 'CATALOGO'
                            ? 'bg-blue-600 text-white shadow-lg font-black'
                            : 'bg-white dark:bg-[#12141a] text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-white border border-blue-300 dark:border-blue-500/30 shadow-sm'
                        }`}
                      >
                        <ShoppingCart size={14} />
                        <span>Pedidos Catálogo ({catalogOrdersCount})</span>
                      </button>

                      <button
                        onClick={() => setLeadCategoryFilter('INSPECCION')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          leadCategoryFilter === 'INSPECCION'
                            ? '!bg-amber-500 !text-black shadow-lg font-black'
                            : 'bg-white dark:bg-[#12141a] text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-white border border-amber-300 dark:border-amber-500/30 shadow-sm'
                        }`}
                      >
                        <Calendar size={14} />
                        <span>Línea de Inspección ({inspectionCount})</span>
                      </button>

                      <button
                        onClick={() => setLeadCategoryFilter('TALLER')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          leadCategoryFilter === 'TALLER'
                            ? '!bg-cyan-500 !text-black shadow-lg font-black'
                            : 'bg-white dark:bg-[#12141a] text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-white border border-cyan-300 dark:border-cyan-500/30 shadow-sm'
                        }`}
                      >
                        <Wrench size={14} />
                        <span>Citas de Taller ({workshopCount})</span>
                      </button>
                    </div>

                    {/* Filters & Search Row (Search + Date Filter + Status Filter) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      {/* Búsqueda por Texto */}
                      <div className="md:col-span-5 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                          type="text"
                          placeholder="Buscar por nombre, teléfono, vehículo, especialidad o repuesto..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-200 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white outline-none focus:border-primary font-bold"
                        />
                      </div>

                      {/* Clasificación por Fecha / Día */}
                      <div className="md:col-span-4 flex items-center gap-2">
                        <Calendar size={16} className="text-amber-500 shrink-0" />
                        <select
                          value={dateFilter}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDateFilter(val);
                            if (val !== 'DIA_ESPECIFICO') setCustomDateFilter('');
                          }}
                          className="w-full bg-slate-200 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-white outline-none focus:border-primary cursor-pointer font-bold"
                        >
                          <option value="TODOS">Todas las Fechas</option>
                          <option value="HOY">Citas de Hoy</option>
                          <option value="MANANA">Citas de Mañana</option>
                          <option value="ESTA_SEMANA">Esta Semana</option>
                          <option value="DIA_ESPECIFICO">Seleccionar Día Específico...</option>
                        </select>

                        {dateFilter === 'DIA_ESPECIFICO' && (
                          <div className="relative shrink-0">
                            <button
                              type="button"
                              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                              className="px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                            >
                              <Calendar size={15} />
                              <span>
                                {customDateFilter
                                  ? new Date(customDateFilter + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
                                  : 'Elegir Día'}
                              </span>
                              <ChevronDown size={14} />
                            </button>

                            {isDatePickerOpen && (
                              <div className="absolute right-0 top-full mt-2 z-50 bg-[#12141a] border border-white/20 rounded-2xl p-4 shadow-2xl w-72 space-y-3 backdrop-blur-xl">
                                {/* Header: Month & Navigation */}
                                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                  <button
                                    type="button"
                                    onClick={() => setPickerMonthDate(new Date(pickerMonthDate.getFullYear(), pickerMonthDate.getMonth() - 1, 1))}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                                  >
                                    <ChevronLeft size={16} />
                                  </button>

                                  <span className="text-xs font-black uppercase text-white font-display tracking-tight">
                                    {pickerMonthDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => setPickerMonthDate(new Date(pickerMonthDate.getFullYear(), pickerMonthDate.getMonth() + 1, 1))}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                                  >
                                    <ChevronRight size={16} />
                                  </button>
                                </div>

                                {/* Days of week header */}
                                <div className="grid grid-cols-7 text-center text-[10px] font-black text-zinc-500 uppercase">
                                  {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(d => (
                                    <span key={d}>{d}</span>
                                  ))}
                                </div>

                                {/* Calendar Days Grid */}
                                <div className="grid grid-cols-7 gap-1 text-xs">
                                  {(() => {
                                    const year = pickerMonthDate.getFullYear();
                                    const month = pickerMonthDate.getMonth();
                                    const firstDayIndex = new Date(year, month, 1).getDay();
                                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                                    const todayStr = new Date().toISOString().split('T')[0];

                                    const cells = [];
                                    for (let i = 0; i < firstDayIndex; i++) {
                                      cells.push(<div key={`empty-${i}`} className="h-8" />);
                                    }

                                    for (let day = 1; day <= daysInMonth; day++) {
                                      const mStr = String(month + 1).padStart(2, '0');
                                      const dStr = String(day).padStart(2, '0');
                                      const dateStr = `${year}-${mStr}-${dStr}`;

                                      const isSelected = customDateFilter === dateStr;
                                      const isToday = todayStr === dateStr;
                                      const hasLeads = leads.some(l => getLeadDateStr(l) === dateStr);

                                      cells.push(
                                        <button
                                          key={day}
                                          type="button"
                                          onClick={() => {
                                            setCustomDateFilter(dateStr);
                                            setIsDatePickerOpen(false);
                                          }}
                                          className={`h-8 rounded-xl font-bold flex flex-col items-center justify-center relative transition-all cursor-pointer text-xs ${
                                            isSelected
                                              ? 'bg-amber-500 text-black font-black shadow-lg scale-105'
                                              : isToday
                                              ? 'border border-amber-500/60 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                                              : 'text-zinc-200 hover:bg-white/10'
                                          }`}
                                        >
                                          <span>{day}</span>
                                          {hasLeads && !isSelected && (
                                            <span className="w-1 h-1 rounded-full bg-amber-400 absolute bottom-1" />
                                          )}
                                        </button>
                                      );
                                    }
                                    return cells;
                                  })()}
                                </div>

                                {/* Quick Actions Footer */}
                                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-1 text-[10px]">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const todayStr = new Date().toISOString().split('T')[0];
                                      setCustomDateFilter(todayStr);
                                      setPickerMonthDate(new Date());
                                      setIsDatePickerOpen(false);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-black font-bold cursor-pointer transition-all"
                                  >
                                    Hoy
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const tomorrow = new Date();
                                      tomorrow.setDate(tomorrow.getDate() + 1);
                                      const tomorrowStr = tomorrow.toISOString().split('T')[0];
                                      setCustomDateFilter(tomorrowStr);
                                      setPickerMonthDate(tomorrow);
                                      setIsDatePickerOpen(false);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 font-bold cursor-pointer transition-colors"
                                  >
                                    Mañana
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCustomDateFilter('');
                                      setDateFilter('TODOS');
                                      setIsDatePickerOpen(false);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 font-bold cursor-pointer transition-colors"
                                  >
                                    Limpiar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Filtro por Estado */}
                      <div className="md:col-span-3 flex items-center gap-2">
                        <Filter size={16} className="text-zinc-400 shrink-0" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full bg-slate-200 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-white outline-none focus:border-primary cursor-pointer font-bold"
                        >
                          <option value="Todos">Todos los Estados</option>
                          <option value="Pendiente">Pendientes</option>
                          <option value="Contactado">Contactados</option>
                          <option value="Entrevistado">Entrevistados</option>
                          <option value="Confirmado">Confirmados</option>
                          <option value="Atendido">Atendidos</option>
                          <option value="Cancelado">Cancelados</option>
                        </select>
                      </div>
                    </div>

                    {/* Conditional Display: Calendar Mode vs Table Mode */}
                    {citasViewMode === 'calendar' ? (
                      <div className="bg-[#12141a] border border-white/10 rounded-3xl p-5 space-y-5 shadow-2xl">
                        {/* Month Header & Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/30 text-primary">
                              <Calendar size={22} />
                            </div>
                            <div>
                              <h2 className="text-lg font-black text-white capitalize tracking-tight flex items-center gap-2">
                                <span>{calendarDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
                              </h2>
                              <p className="text-[11px] text-zinc-400">
                                Haz clic en cualquier día o en el botón <strong>+</strong> para agendar una cita rápida
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const prev = new Date(calendarDate);
                                prev.setMonth(prev.getMonth() - 1);
                                setCalendarDate(prev);
                              }}
                              className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                              title="Mes Anterior"
                            >
                              <ChevronLeft size={18} />
                            </button>

                            <button
                              onClick={() => setCalendarDate(new Date())}
                              className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
                            >
                              Hoy
                            </button>

                            <button
                              onClick={() => {
                                const next = new Date(calendarDate);
                                next.setMonth(next.getMonth() + 1);
                                setCalendarDate(next);
                              }}
                              className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                              title="Mes Siguiente"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Calendar Grid */}
                        {(() => {
                          const year = calendarDate.getFullYear();
                          const month = calendarDate.getMonth();
                          const firstDayOfMonth = new Date(year, month, 1);
                          let startOffset = firstDayOfMonth.getDay() - 1;
                          if (startOffset === -1) startOffset = 6; // Monday start
                          const daysInMonth = new Date(year, month + 1, 0).getDate();
                          const daysInPrevMonth = new Date(year, month, 0).getDate();

                          const todayStr = new Date().toISOString().split('T')[0];
                          const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

                          const cells: Array<{ day: number; dateStr: string; isCurrentMonth: boolean }> = [];

                          for (let i = startOffset - 1; i >= 0; i--) {
                            const d = daysInPrevMonth - i;
                            const prevMonthDate = new Date(year, month - 1, d);
                            const y = prevMonthDate.getFullYear();
                            const m = String(prevMonthDate.getMonth() + 1).padStart(2, '0');
                            const dayFormatted = String(d).padStart(2, '0');
                            cells.push({ day: d, dateStr: `${y}-${m}-${dayFormatted}`, isCurrentMonth: false });
                          }

                          for (let d = 1; d <= daysInMonth; d++) {
                            const m = String(month + 1).padStart(2, '0');
                            const dayFormatted = String(d).padStart(2, '0');
                            cells.push({ day: d, dateStr: `${year}-${m}-${dayFormatted}`, isCurrentMonth: true });
                          }

                          const totalSoFar = cells.length;
                          const totalCellsNeeded = totalSoFar > 35 ? 42 : 35;
                          for (let d = 1; d <= totalCellsNeeded - totalSoFar; d++) {
                            const nextMonthDate = new Date(year, month + 1, d);
                            const y = nextMonthDate.getFullYear();
                            const m = String(nextMonthDate.getMonth() + 1).padStart(2, '0');
                            const dayFormatted = String(d).padStart(2, '0');
                            cells.push({ day: d, dateStr: `${y}-${m}-${dayFormatted}`, isCurrentMonth: false });
                          }

                          return (
                            <div className="space-y-2">
                              {/* Header Days of Week */}
                              <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-black uppercase tracking-wider text-zinc-400 pb-1 border-b border-white/5">
                                {weekDays.map((wd, i) => (
                                  <div key={i} className="py-1">{wd}</div>
                                ))}
                              </div>

                              {/* Cells */}
                              <div className="grid grid-cols-7 gap-1.5">
                                {cells.map((cell, idx) => {
                                  const dayLeads = filteredLeads.filter(l => getLeadDateStr(l) === cell.dateStr);
                                  const isToday = cell.dateStr === todayStr;

                                  return (
                                    <div
                                      key={idx}
                                      onClick={() => {
                                        if (!cell.isCurrentMonth) return;
                                        if (dayLeads.length > 0) {
                                          setSelectedCalendarDay(cell.dateStr);
                                        } else {
                                          setManualCitaData({
                                            nombre: '',
                                            telefono: '',
                                            vehiculo: '',
                                            fecha: cell.dateStr,
                                            hora: '09:00',
                                            servicio: 'Inspección Diagnóstica 25 Puntos Gratuita',
                                            notas: '',
                                            status: 'Confirmado'
                                          });
                                          setManualCitaError('');
                                          setIsManualCitaModalOpen(true);
                                        }
                                      }}
                                      className={`min-h-[105px] md:min-h-[125px] p-2 rounded-2xl border transition-all flex flex-col justify-between group/cell cursor-pointer ${
                                        !cell.isCurrentMonth
                                          ? 'bg-black/20 border-white/5 opacity-40 cursor-default'
                                          : isToday
                                          ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/30 hover:border-primary'
                                          : 'bg-black/40 border-white/10 hover:border-white/30'
                                      }`}
                                    >
                                      {/* Top Header inside day cell */}
                                      <div className="flex items-center justify-between">
                                        <span className={`text-xs font-black px-1.5 py-0.5 rounded-md ${
                                          isToday ? 'bg-primary text-black font-black' : cell.isCurrentMonth ? 'text-white' : 'text-zinc-500'
                                        }`}>
                                          {cell.day}
                                        </span>

                                        {cell.isCurrentMonth && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setManualCitaData({
                                                nombre: '',
                                                telefono: '',
                                                vehiculo: '',
                                                fecha: cell.dateStr,
                                                hora: '09:00',
                                                servicio: 'Inspección Diagnóstica 25 Puntos Gratuita',
                                                notas: '',
                                                status: 'Confirmado'
                                              });
                                              setManualCitaError('');
                                              setIsManualCitaModalOpen(true);
                                            }}
                                            className="opacity-0 group-hover/cell:opacity-100 p-1 rounded-md bg-primary/20 hover:bg-primary text-primary hover:text-black transition-all cursor-pointer"
                                            title={`Agendar Cita para el ${cell.dateStr}`}
                                          >
                                            <Plus size={12} />
                                          </button>
                                        )}
                                      </div>

                                      {/* Day Appointments List */}
                                      <div className="space-y-1 my-1 overflow-y-auto max-h-[85px] scrollbar-thin">
                                        {dayLeads.slice(0, 3).map((l, lIdx) => {
                                          const prio = l.prioridad === 'alta' || String(l.falla || '').toLowerCase().includes('[prioridad: alta]') ? 'alta'
                                            : l.prioridad === 'baja' || String(l.falla || '').toLowerCase().includes('[prioridad: baja]') ? 'baja'
                                            : 'media';

                                          const priorityStyle = 
                                            prio === 'alta' ? 'bg-red-950/70 border-red-500/60 text-red-200 hover:border-red-400' :
                                            prio === 'baja' ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200 hover:border-emerald-400' :
                                            'bg-amber-950/70 border-amber-500/60 text-amber-200 hover:border-amber-400';

                                          const prioLabel = prio === 'alta' ? 'Alta' : prio === 'baja' ? 'Baja' : 'Media';
                                          const clientNameFormatted = formatName(l.nombre);

                                          return (
                                            <div
                                              key={l.id || lIdx}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedDayCita(l);
                                              }}
                                              onMouseEnter={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                setHoveredCitaInfo({ cita: l, rect });
                                              }}
                                              onMouseLeave={() => setHoveredCitaInfo(null)}
                                              className={`p-1.5 rounded-lg border text-[10px] cursor-pointer transition-all hover:scale-[1.02] shadow-sm relative ${priorityStyle}`}
                                            >
                                              <div className="flex items-center justify-between font-mono font-bold leading-tight">
                                                <span className="truncate">{getLeadTimeStr(l)}</span>
                                                <span className={`text-[8px] font-black px-1 rounded ${
                                                  prio === 'alta' ? 'bg-red-900/80 text-red-200' :
                                                  prio === 'baja' ? 'bg-emerald-900/80 text-emerald-200' :
                                                  'bg-amber-900/80 text-amber-200'
                                                }`}>{prioLabel}</span>
                                              </div>
                                              <div className="font-black text-white text-[11px] truncate mt-0.5 leading-tight">
                                                {clientNameFormatted}
                                              </div>
                                            </div>
                                          );
                                        })}

                                        {dayLeads.length > 3 && (
                                          <div className="text-[9px] font-bold text-center text-primary italic pt-0.5">
                                            +{dayLeads.length - 3} citas más
                                          </div>
                                        )}
                                      </div>

                                      {/* Bottom badge */}
                                      {dayLeads.length > 0 && (
                                        <div className="text-[9px] font-bold text-zinc-400 text-right">
                                          {dayLeads.length} {dayLeads.length === 1 ? 'cita' : 'citas'}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      /* Table View */
                      <div className="bg-[#12141a] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-zinc-300">
                          <thead className="bg-black/60 text-zinc-400 uppercase tracking-wider text-[10px] font-black border-b border-white/10">
                            <tr>
                              <th className="p-4">Tipo</th>
                              <th className="p-4">Solicitante</th>
                              <th className="p-4">Teléfono</th>
                              <th className="p-4">Detalle / Vehículo</th>
                              <th className="p-4">Servicio / Cargo</th>
                              <th className="p-4">CV / Turno</th>
                              <th className="p-4">Estado</th>
                              <th className="p-4 text-right">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {filteredLeads.length === 0 ? (
                              <tr>
                                <td colSpan={8} className="p-10 text-center text-zinc-500">
                                  No se encontraron registros para la categoría o búsqueda seleccionada.
                                </td>
                              </tr>
                            ) : (
                              filteredLeads.map((l, idx) => {
                                const cat = getLeadCategory(l);
                                const cvUrl = getCvDownloadUrl(l);

                                // Formatear saludo personalizado de WhatsApp según el tipo de solicitud
                                let waMsg = `Hola ${l.nombre || ''}, te contactamos desde Taller MasterTech.`;
                                if (cat === 'trabajo') {
                                  waMsg = `Hola ${l.nombre || ''}, te contactamos desde la Coordinación de Recursos Humanos de Taller MasterTech sobre tu postulación laboral para el área de ${l.servicio || 'especialista'}.`;
                                } else if (cat === 'catalogo') {
                                  waMsg = `Hola ${l.nombre || ''}, te contactamos desde el Departamento de Repuestos de Taller MasterTech sobre tu pedido de catálogo (${l.servicio || 'piezas'}).`;
                                } else if (cat === 'inspeccion') {
                                  waMsg = `Hola ${l.nombre || ''}, te contactamos de Taller MasterTech para confirmar tu cita en la Línea de Inspección Gratuita para tu ${l.vehiculo || 'vehículo'}.`;
                                }

                                return (
                                  <tr key={l.id || idx} className="hover:bg-white/5 transition-colors">
                                    {/* Tipo Badge */}
                                    <td className="p-4">
                                      {cat === 'trabajo' && (
                                        <span className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 inline-flex items-center gap-1">
                                          <Briefcase size={11} /> TRABAJO
                                        </span>
                                      )}
                                      {cat === 'catalogo' && (
                                        <span className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40 inline-flex items-center gap-1">
                                          <ShoppingCart size={11} /> CATÁLOGO
                                        </span>
                                      )}
                                      {cat === 'inspeccion' && (
                                        <span className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1">
                                          <Calendar size={11} /> INSPECCIÓN
                                        </span>
                                      )}
                                      {cat === 'taller' && (
                                        <span className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 inline-flex items-center gap-1">
                                          <Wrench size={11} /> TALLER
                                        </span>
                                      )}
                                    </td>

                                    {/* Solicitante */}
                                    <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                                      {l.nombre || 'Sin nombre'}
                                    </td>

                                    {/* Teléfono */}
                                    <td className="p-4 font-mono font-bold text-slate-800 dark:text-zinc-300 whitespace-nowrap">
                                      {l.telefono || '-'}
                                    </td>

                                    {/* Detalle / Vehículo */}
                                    <td className="p-4 font-semibold text-slate-900 dark:text-zinc-300">
                                      {cat === 'trabajo' ? (
                                        <span className="text-purple-900 dark:text-purple-300 font-bold">{l.vehiculo || 'Postulante'}</span>
                                      ) : (
                                        <span className="text-slate-900 dark:text-zinc-200">{l.vehiculo || '-'}</span>
                                      )}
                                    </td>

                                    {/* Servicio / Cargo */}
                                    <td className="p-4 text-amber-900 dark:text-primary font-black">
                                      {l.servicio || '-'}
                                    </td>

                                    {/* CV / Turno */}
                                    <td className="p-4">
                                      {cvUrl ? (
                                        <a
                                          href={cvUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-500/20 hover:bg-purple-200 dark:hover:bg-purple-500/30 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40 text-[10px] font-black transition-colors shadow-xs"
                                          title="Ver / Descargar Currículum"
                                        >
                                          <FileText size={12} />
                                          <span>Descargar CV</span>
                                        </a>
                                      ) : (
                                        <span className="text-slate-800 dark:text-zinc-400 font-medium text-[11px]">
                                          {l.fecha_turno || l.fecha || l.fecha_hora || 'Por acordar'}
                                        </span>
                                      )}
                                    </td>

                                    {/* Estado */}
                                    <td className="p-4">
                                      <select
                                        value={l.status || 'Pendiente'}
                                        onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer bg-black ${
                                          l.status === 'Confirmado' || l.status === 'Entrevistado'
                                            ? 'border-green-500/40 text-green-400' 
                                            : l.status === 'Contactado' || l.status === 'Atendido'
                                            ? 'border-cyan-500/40 text-cyan-400'
                                            : l.status === 'Cancelado'
                                            ? 'border-red-500/40 text-red-400'
                                            : 'border-amber-500/40 text-amber-300'
                                        }`}
                                      >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Contactado">Contactado</option>
                                        <option value="Entrevistado">Entrevistado</option>
                                        <option value="Confirmado">Confirmado</option>
                                        <option value="Atendido">Atendido</option>
                                        <option value="Cancelado">Cancelado</option>
                                      </select>
                                    </td>

                                    {/* Acciones */}
                                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                      <a
                                        href={`https://wa.me/${(l.telefono || '').replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex p-1.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/40 transition-colors"
                                        title="Contactar por WhatsApp"
                                      >
                                        <WhatsAppIcon size={14} />
                                      </a>
                                      <button
                                        onClick={() => handleDeleteLead(l.id)}
                                        className="p-1.5 rounded-lg bg-white/5 text-zinc-500 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
                                        title="Eliminar registro"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  </>
                );
              })()}
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
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSaveSection('catalogo', { CATALOG_PRODUCTS_JSON: JSON.stringify(catalogItems) })}
                    disabled={savingSection === 'catalogo'}
                    className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shadow-lg"
                  >
                    {savingSection === 'catalogo' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    <span>{savedSectionSuccess === 'catalogo' ? '¡Catálogo Guardado!' : 'Guardar Catálogo Completo'}</span>
                  </button>

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
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-2 hover:bg-white/10"
                  >
                    <Plus size={16} />
                    <span>Nuevo Repuesto</span>
                  </button>
                </div>
              </div>

              {savedSectionSuccess === 'catalogo' && (
                <div className="p-3.5 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-xs font-bold flex items-center gap-2 shadow-lg">
                  <CheckCircle2 size={18} />
                  <span>¡El catálogo de repuestos ha sido guardado e integrado públicamente en `/catalogo`!</span>
                </div>
              )}

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
                      badge: "Jornada Especial",
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

              {/* Clock Timer & Empty State Config */}
              <div className="bg-[#12141a] p-6 rounded-2xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                    <Clock size={16} />
                    <span>Configuración del Reloj & Banner de Apertura de Cupos</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleSaveSection('jornadas')}
                    disabled={savingSection === 'jornadas'}
                    className="btn-primary !py-2 !px-5 text-[11px] font-black uppercase flex items-center gap-1.5 border-none shadow-md cursor-pointer"
                  >
                    {savingSection === 'jornadas' ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                    <span>{savedSectionSuccess === 'jornadas' ? '¡Banner Guardado!' : 'Guardar Banner y Reloj'}</span>
                  </button>
                </div>

                {savedSectionSuccess === 'jornadas' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>¡Reloj y Banner de Apertura de Cupos guardados e integrados públicamente en `/jornada`!</span>
                  </div>
                )}

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-400 font-bold block mb-1">Encabezado del Reloj (Reloj Digital)</label>
                      <input
                        type="text"
                        value={settingsForm.JORNADA_COUNTDOWN_TITLE || 'CIERRE DE CUPOS JORNADA:'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, JORNADA_COUNTDOWN_TITLE: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-bold outline-none focus:border-primary"
                        placeholder="Ej. CIERRE DE CUPOS JORNADA:"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 font-bold block mb-1">Botones Rápido Cierre del Reloj</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {[1, 3, 7, 14].map(days => (
                          <button
                            key={days}
                            type="button"
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

                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <h4 className="text-[11px] font-black uppercase text-zinc-300">Textos del Banner de Cero Jornadas Activas</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-zinc-400 font-bold block mb-1">Distintivo / Pill Superior</label>
                        <input
                          type="text"
                          value={settingsForm.JORNADA_EMPTY_BADGE || '⚡ PRÓXIMA APERTURA DE CUPOS'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, JORNADA_EMPTY_BADGE: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-amber-300 font-bold outline-none focus:border-primary"
                          placeholder="Ej. ⚡ PRÓXIMA APERTURA DE CUPOS"
                        />
                      </div>

                      <div>
                        <label className="text-zinc-400 font-bold block mb-1">Título Principal</label>
                        <input
                          type="text"
                          value={settingsForm.JORNADA_EMPTY_TITLE || 'No hay Jornadas VIP Activas en este momento'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, JORNADA_EMPTY_TITLE: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-bold outline-none focus:border-primary"
                          placeholder="Ej. No hay Jornadas VIP Activas en este momento"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 font-bold block mb-1">Mensaje Explicativo / Descripción</label>
                      <textarea
                        rows={3}
                        value={settingsForm.JORNADA_EMPTY_DESC || 'Nuestras jornadas automotrices especializadas (Reprogramación ECU Stage 1/2, Desactivación EGR/DPF, Techo Estrellado, A/A e Inyección) se abren en fechas exclusivas por lotes de cupos limitados. ¡Escríbenos por WhatsApp para ser notificado de la próxima fecha o agendar tu servicio estándar en taller!'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, JORNADA_EMPTY_DESC: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-zinc-400 font-bold block mb-1">Texto del Botón WhatsApp</label>
                        <input
                          type="text"
                          value={settingsForm.JORNADA_EMPTY_BTN_WA || 'CONSULTAR PRÓXIMA FECHA POR WHATSAPP'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, JORNADA_EMPTY_BTN_WA: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-amber-400 font-black outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="text-zinc-400 font-bold block mb-1">Texto del Botón Secundario</label>
                        <input
                          type="text"
                          value={settingsForm.JORNADA_EMPTY_BTN_SEC || 'Ver Servicios de Taller Disponibles'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, JORNADA_EMPTY_BTN_SEC: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-bold outline-none focus:border-primary"
                        />
                      </div>
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
          {/* MODULE: ADMINISTRACIÓN DE PROVEEDORES & MÉTODOS DE PAGO */}
          {/* ========================================================================= */}
          {activeTab === 'proveedores' && (
            <div className="space-y-6 animate-fade-in">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-primary">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-display font-black uppercase text-white tracking-tight">Administración de Proveedores</h1>
                      <p className="text-xs text-zinc-400">Control de comercios aliados, cuentas bancarias nacionales, Pago Móvil, Zelle y Binance Pay para pagos del taller.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={() => {
                      setEditingProveedor({
                        id: `prov_${Date.now()}`,
                        nombreComercial: '',
                        razonSocial: '',
                        rif: '',
                        categoria: 'Repuestos Motor & OEM',
                        contactoNombre: '',
                        telefono: '',
                        correo: '',
                        direccion: '',
                        diasCredito: 'Contado / Inmediato',
                        notas: '',
                        bancos: [
                          {
                            id: `b_${Date.now()}`,
                            banco: 'Banesco',
                            tipoCuenta: 'Corriente',
                            numeroCuenta: '',
                            titular: '',
                            documento: ''
                          }
                        ],
                        pagoMovil: [
                          {
                            id: `pm_${Date.now()}`,
                            banco: 'Banesco (0134)',
                            telefono: '',
                            documento: '',
                            titular: ''
                          }
                        ],
                        zelle: {
                          correoTelefono: '',
                          titular: ''
                        },
                        binance: {
                          payId: '',
                          correoBinance: '',
                          walletUsdt: '',
                          titular: ''
                        },
                        aceptaEfectivoDivisas: true
                      });
                      setIsProveedorModalOpen(true);
                    }}
                    className="btn-primary !py-2.5 !px-4 text-xs font-black uppercase flex items-center gap-2 rounded-xl shadow-lg border-none cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>Registrar Proveedor</span>
                  </button>
                </div>
              </div>

              {/* Metric Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#12141a] border border-white/10 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-zinc-400">Total Proveedores</span>
                    <Building2 size={16} className="text-primary" />
                  </div>
                  <span className="text-2xl font-black text-white mt-1 block">{proveedoresList.length}</span>
                  <span className="text-[10px] text-zinc-500 font-medium">Comercios Aliados</span>
                </div>

                <div className="bg-[#12141a] border border-white/10 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-amber-400">Otorgan Crédito</span>
                    <Clock size={16} className="text-amber-400" />
                  </div>
                  <span className="text-2xl font-black text-amber-400 mt-1 block">
                    {proveedoresList.filter(p => p.aceptaCredito || (p.diasCredito && !p.diasCredito.toLowerCase().includes('contado'))).length}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium">Plazos & Facturación</span>
                </div>

                <div className="bg-[#12141a] border border-white/10 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-emerald-400">Aceptan Zelle</span>
                    <DollarSign size={16} className="text-emerald-400" />
                  </div>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">
                    {proveedoresList.filter(p => p.zelle?.correoTelefono).length}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium">Pagos en Dólares USA</span>
                </div>

                <div className="bg-[#12141a] border border-white/10 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-blue-400">Pago Móvil & Bs</span>
                    <CreditCard size={16} className="text-blue-400" />
                  </div>
                  <span className="text-2xl font-black text-blue-400 mt-1 block">
                    {proveedoresList.filter(p => (p.pagoMovil && p.pagoMovil.length > 0) || (p.bancos && p.bancos.length > 0)).length}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium">Banca Nacional Vzla</span>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="bg-[#12141a] border border-white/10 p-4 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, RIF, banco, Zelle, Binance Pay ID, crédito o contacto..."
                      value={proveedorSearch}
                      onChange={(e) => setProveedorSearch(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-primary transition-colors"
                    />
                    {proveedorSearch && (
                      <button onClick={() => setProveedorSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <select
                    value={proveedorCategoriaFilter}
                    onChange={(e) => setProveedorCategoriaFilter(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-300 font-bold outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="TODAS">Categoría: Todas</option>
                    <option value="Autopartes & Repuestos Generales">Autopartes & Repuestos Generales</option>
                    <option value="Caucheras, Neumáticos & Rines">Caucheras, Neumáticos & Rines</option>
                    <option value="Lubricantes, Aceites & Filtros">Lubricantes, Aceites & Filtros</option>
                    <option value="Baterías & Electroauto">Baterías & Electroauto</option>
                    <option value="Frenos, Suspensión & Tren Delantero">Frenos, Suspensión & Tren Delantero</option>
                    <option value="Repuestos Motor & OEM">Repuestos Motor & OEM</option>
                    <option value="Tornos, Rectificadoras & Mecanizado">Tornos, Rectificadoras & Mecanizado</option>
                    <option value="Auto Periquitos & Accesorios">Auto Periquitos & Accesorios</option>
                    <option value="Autolavado, Car Wash & Detailing">Autolavado, Car Wash & Detailing</option>
                    <option value="Pintura, Latonería & Detailing">Pintura, Latonería & Detailing</option>
                    <option value="Herramientas, Tornillería & Consumibles">Herramientas, Tornillería & Consumibles</option>
                    <option value="Talleres Aliados & Servicios Externos">Talleres Aliados & Servicios Externos</option>
                    <option value="Otros Comercios Aliados">Otros Comercios Aliados</option>
                  </select>
                </div>

                {/* Method Pills Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-[10px] font-bold uppercase text-zinc-500 shrink-0">Filtrar:</span>
                  {[
                    { id: 'TODOS', label: `Todos (${proveedoresList.length})`, icon: <Layers size={13} /> },
                    { id: 'CREDITO', label: `Con Crédito (${proveedoresList.filter(p => p.aceptaCredito || (p.diasCredito && !p.diasCredito.toLowerCase().includes('contado'))).length})`, icon: <Clock size={13} className="text-amber-500" /> },
                    { id: 'CONTADO', label: `Solo Contado (${proveedoresList.filter(p => !p.aceptaCredito && (!p.diasCredito || p.diasCredito.toLowerCase().includes('contado'))).length})`, icon: <Banknote size={13} className="text-emerald-500" /> },
                    { id: 'ZELLE', label: `Zelle (${proveedoresList.filter(p => p.zelle?.correoTelefono).length})`, icon: <DollarSign size={13} className="text-emerald-500" /> },
                    { id: 'BINANCE', label: `Binance Pay (${proveedoresList.filter(p => p.binance?.payId || p.binance?.walletUsdt).length})`, icon: <Wallet size={13} className="text-amber-500" /> },
                    { id: 'PAGO_MOVIL', label: `Pago Móvil (${proveedoresList.filter(p => p.pagoMovil && p.pagoMovil.length > 0).length})`, icon: <Smartphone size={13} className="text-cyan-500" /> },
                    { id: 'BANCOS', label: `Bancos Bs (${proveedoresList.filter(p => p.bancos && p.bancos.length > 0).length})`, icon: <Building2 size={13} className="text-blue-500" /> }
                  ].map(tab => {
                    const isSelected = proveedorMetodoFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setProveedorMetodoFilter(tab.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500 text-black shadow-md font-black'
                            : 'bg-slate-200/90 dark:bg-white/5 text-slate-800 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/5'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Proveedores Cards List */}
              {(() => {
                const filtered = proveedoresList.filter(p => {
                  const q = proveedorSearch.toLowerCase();
                  const matchesSearch =
                    !q ||
                    p.nombreComercial.toLowerCase().includes(q) ||
                    (p.razonSocial || '').toLowerCase().includes(q) ||
                    (p.rif || '').toLowerCase().includes(q) ||
                    (p.categoria || '').toLowerCase().includes(q) ||
                    (p.contactoNombre || '').toLowerCase().includes(q) ||
                    (p.telefono || '').toLowerCase().includes(q) ||
                    (p.notas || '').toLowerCase().includes(q) ||
                    (p.diasCredito || '').toLowerCase().includes(q) ||
                    (p.zelle?.correoTelefono || '').toLowerCase().includes(q) ||
                    (p.binance?.payId || '').toLowerCase().includes(q) ||
                    (p.bancos || []).some(b => b.banco.toLowerCase().includes(q) || b.numeroCuenta.includes(q) || b.titular.toLowerCase().includes(q)) ||
                    (p.pagoMovil || []).some(pm => pm.banco.toLowerCase().includes(q) || pm.telefono.includes(q) || pm.documento.includes(q));

                  const matchesCat = proveedorCategoriaFilter === 'TODAS' || p.categoria === proveedorCategoriaFilter;

                  let matchesMetodo = true;
                  if (proveedorMetodoFilter === 'CREDITO') matchesMetodo = Boolean(p.aceptaCredito || (p.diasCredito && !p.diasCredito.toLowerCase().includes('contado')));
                  else if (proveedorMetodoFilter === 'CONTADO') matchesMetodo = !p.aceptaCredito && (!p.diasCredito || p.diasCredito.toLowerCase().includes('contado'));
                  else if (proveedorMetodoFilter === 'ZELLE') matchesMetodo = Boolean(p.zelle?.correoTelefono);
                  else if (proveedorMetodoFilter === 'BINANCE') matchesMetodo = Boolean(p.binance?.payId || p.binance?.walletUsdt);
                  else if (proveedorMetodoFilter === 'PAGO_MOVIL') matchesMetodo = Boolean(p.pagoMovil && p.pagoMovil.length > 0);
                  else if (proveedorMetodoFilter === 'BANCOS') matchesMetodo = Boolean(p.bancos && p.bancos.length > 0);

                  return matchesSearch && matchesCat && matchesMetodo;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-16 bg-[#12141a] border border-white/10 rounded-3xl space-y-3">
                      <Building2 size={40} className="mx-auto text-zinc-600" />
                      <h3 className="text-base font-bold text-white">No se encontraron proveedores</h3>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                        {proveedorSearch 
                          ? 'No hay comercios aliados que coincidan con tu búsqueda. Intenta con otro término.' 
                          : 'Comienza registrando los comercios aliados o carga el proveedor de prueba demo.'}
                      </p>
                      {!proveedorSearch && (
                        <button
                          onClick={() => {
                            setEditingProveedor({
                              id: `prov_${Date.now()}`,
                              nombreComercial: '',
                              razonSocial: '',
                              rif: '',
                              categoria: 'Repuestos Motor & OEM',
                              contactoNombre: '',
                              telefono: '',
                              correo: '',
                              direccion: '',
                              diasCredito: 'Contado / Inmediato',
                              notas: '',
                              bancos: [],
                              pagoMovil: [],
                              aceptaEfectivoDivisas: true
                            });
                            setIsProveedorModalOpen(true);
                          }}
                          className="btn-primary !py-2 !px-4 text-xs font-black rounded-xl inline-flex items-center gap-2 mx-auto cursor-pointer"
                        >
                          <Plus size={14} />
                          <span>Registrar Proveedor</span>
                        </button>
                      )}
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filtered.map(prov => {
                      const isExpanded = expandedProvIds.includes(prov.id);
                      return (
                        <div key={prov.id} className="bg-[#12141a] border border-white/10 rounded-2xl p-5 space-y-3.5 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
                          <div className="space-y-3">
                            {/* Card Header: Name, Category, RIF & Quick Actions */}
                            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 px-2.5 py-0.5 rounded-md">
                                    {prov.categoria || 'Repuestos'}
                                  </span>
                                  {prov.aceptaCredito ? (
                                    <span className="text-[10px] font-black text-amber-900 dark:text-amber-300 bg-amber-200/80 dark:bg-amber-500/20 border border-amber-400 dark:border-amber-500/40 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                      <Clock size={11} className="text-amber-800 dark:text-amber-300" />
                                      <span>Crédito: {prov.diasCredito || 'Activo'}</span>
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold text-slate-800 dark:text-zinc-400 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                                      <Banknote size={11} className="text-slate-700 dark:text-zinc-400" />
                                      <span>Solo Contado</span>
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-display font-black text-slate-900 dark:text-white text-base tracking-wide leading-tight mt-1">
                                  {prov.nombreComercial}
                                </h3>
                                {prov.razonSocial && prov.razonSocial !== prov.nombreComercial && (
                                  <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">{prov.razonSocial}</p>
                                )}
                                {prov.rif && (
                                  <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-zinc-400 bg-slate-200/70 dark:bg-black/40 px-2 py-0.5 rounded border border-slate-300 dark:border-white/5 inline-block">
                                    RIF: {prov.rif}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingProveedor({ ...prov });
                                    setIsProveedorModalOpen(true);
                                  }}
                                  className="p-2 rounded-xl bg-slate-200/80 dark:bg-white/5 hover:bg-amber-500/20 text-slate-700 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors cursor-pointer"
                                  title="Editar Proveedor"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`¿Seguro que deseas eliminar al proveedor "${prov.nombreComercial}"?`)) {
                                      const updated = proveedoresList.filter(p => p.id !== prov.id);
                                      handleSaveProveedores(updated, `Eliminó el proveedor ${prov.nombreComercial}`);
                                    }
                                  }}
                                  className="p-2 rounded-xl bg-slate-200/80 dark:bg-white/5 hover:bg-red-500/20 text-slate-700 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                                  title="Eliminar Proveedor"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {prov.contactoNombre && (
                                <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-300 font-bold bg-slate-100 dark:bg-black/30 p-2 rounded-xl border border-slate-300 dark:border-white/5">
                                  <User size={14} className="text-slate-600 dark:text-zinc-500 shrink-0" />
                                  <span className="truncate">{prov.contactoNombre}</span>
                                </div>
                              )}
                              {prov.telefono && (
                                <div className="flex items-center justify-between gap-2 text-slate-900 dark:text-zinc-300 font-bold bg-slate-100 dark:bg-black/30 p-2 rounded-xl border border-slate-300 dark:border-white/5">
                                  <div className="flex items-center gap-2 truncate">
                                    <Phone size={14} className="text-slate-600 dark:text-zinc-500 shrink-0" />
                                    <span className="font-mono">{prov.telefono}</span>
                                  </div>
                                  <a
                                    href={`https://wa.me/${prov.telefono.replace(/[^\d]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 shrink-0"
                                    title="Abrir WhatsApp"
                                  >
                                    <WhatsAppIcon size={14} />
                                  </a>
                                </div>
                              )}
                            </div>

                            {prov.notas && (
                              <div className="bg-amber-100/70 dark:bg-amber-500/5 border border-amber-300 dark:border-amber-500/20 p-2.5 rounded-xl text-xs text-amber-950 dark:text-amber-200/90 font-bold flex items-start gap-2">
                                <Tag size={13} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                                <span className="leading-snug">{prov.notas}</span>
                              </div>
                            )}

                            {/* Payment Methods Badges Summary */}
                            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                              <span className="text-[10px] font-black text-slate-700 dark:text-zinc-500 uppercase shrink-0 mr-1">Acepta:</span>
                              {prov.bancos && prov.bancos.length > 0 && (
                                <span className="text-[10px] font-black text-blue-900 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Building2 size={11} />
                                  <span>{prov.bancos.length} {prov.bancos.length === 1 ? 'Banco' : 'Bancos'}</span>
                                </span>
                              )}
                              {prov.pagoMovil && prov.pagoMovil.length > 0 && (
                                <span className="text-[10px] font-black text-cyan-900 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Smartphone size={11} />
                                  <span>{prov.pagoMovil.length} Pago Móvil</span>
                                </span>
                              )}
                              {prov.zelle?.correoTelefono && (
                                <span className="text-[10px] font-black text-emerald-900 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <DollarSign size={11} />
                                  <span>Zelle</span>
                                </span>
                              )}
                              {prov.binance?.payId && (
                                <span className="text-[10px] font-black text-amber-900 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Wallet size={11} />
                                  <span>Binance Pay</span>
                                </span>
                              )}
                              {prov.aceptaEfectivoDivisas && (
                                <span className="text-[10px] font-black text-slate-800 dark:text-zinc-400 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <Banknote size={11} />
                                  <span>Efectivo $</span>
                                </span>
                              )}
                            </div>

                            {/* Collapsible Payment Details In-Place */}
                            {isExpanded && (
                              <div className="space-y-2 pt-2 border-t border-white/10 animate-fade-in">
                                {/* 1. Bancos */}
                                {prov.bancos && prov.bancos.map((b, bIdx) => (
                                  <div key={bIdx} className="bg-black/50 border border-white/10 rounded-xl p-2.5 flex items-center justify-between gap-2 text-xs">
                                    <div className="space-y-0.5 min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5">
                                        <Building2 size={12} className="text-primary" />
                                        <span className="font-bold text-white">{b.banco}</span>
                                        <span className="text-[9px] text-zinc-400 uppercase bg-white/5 px-1 rounded">{b.tipoCuenta || 'Cta'}</span>
                                      </div>
                                      <p className="font-mono text-amber-400 text-xs tracking-wider select-all font-bold">{b.numeroCuenta}</p>
                                      <p className="text-[10px] text-zinc-400 truncate">Titular: {b.titular} ({b.documento})</p>
                                    </div>
                                    <button
                                      onClick={() => copyToClipboard(b.numeroCuenta, `banco-${prov.id}-${bIdx}`)}
                                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-amber-500/20 text-white hover:text-amber-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                      {copiedFieldId === `banco-${prov.id}-${bIdx}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                      <span>Cuenta</span>
                                    </button>
                                  </div>
                                ))}

                                {/* 2. Pago Móvil */}
                                {prov.pagoMovil && prov.pagoMovil.map((pm, pmIdx) => (
                                  <div key={pmIdx} className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-2.5 space-y-2 text-xs">
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-1.5 text-blue-300 font-bold">
                                        <Smartphone size={12} />
                                        <span>PM: {pm.banco}</span>
                                      </div>
                                      <button
                                        onClick={() => {
                                          copyToClipboard(formatCleanPagoMovil(pm), `pm-${prov.id}-${pmIdx}`);
                                        }}
                                        className="px-2 py-0.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                      >
                                        {copiedFieldId === `pm-${prov.id}-${pmIdx}` ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                                        <span>{copiedFieldId === `pm-${prov.id}-${pmIdx}` ? '¡Copiado!' : 'Copiar Todo'}</span>
                                      </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <button
                                        onClick={() => copyToClipboard(pm.telefono, `pm-tel-${prov.id}-${pmIdx}`)}
                                        className="bg-black/40 hover:bg-black/60 p-1.5 rounded-lg border border-white/5 text-left flex items-center justify-between gap-1 transition-colors cursor-pointer"
                                        title="Copiar solo teléfono"
                                      >
                                        <span className="font-mono text-blue-300 font-bold text-[11px] truncate">{pm.telefono}</span>
                                        <span className="text-[9px] text-zinc-400 font-sans">{copiedFieldId === `pm-tel-${prov.id}-${pmIdx}` ? '¡OK!' : 'Tlf'}</span>
                                      </button>
                                      <button
                                        onClick={() => copyToClipboard(pm.documento, `pm-doc-${prov.id}-${pmIdx}`)}
                                        className="bg-black/40 hover:bg-black/60 p-1.5 rounded-lg border border-white/5 text-left flex items-center justify-between gap-1 transition-colors cursor-pointer"
                                        title="Copiar solo C.I. o RIF"
                                      >
                                        <span className="font-mono text-white font-bold text-[11px] truncate">{pm.documento}</span>
                                        <span className="text-[9px] text-zinc-400 font-sans">{copiedFieldId === `pm-doc-${prov.id}-${pmIdx}` ? '¡OK!' : 'Doc'}</span>
                                      </button>
                                    </div>
                                    {pm.titular && <p className="text-[10px] text-zinc-400 truncate">Titular: {pm.titular}</p>}
                                  </div>
                                ))}

                                {/* 3. Zelle */}
                                {prov.zelle?.correoTelefono && (
                                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-2.5 flex items-center justify-between gap-2 text-xs">
                                    <div className="space-y-0.5 min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                                        <DollarSign size={12} />
                                        <span>Zelle ($ USA)</span>
                                      </div>
                                      <p className="font-mono text-emerald-300 text-xs font-bold truncate">{prov.zelle.correoTelefono}</p>
                                      <p className="text-[10px] text-zinc-400 truncate">Titular: {prov.zelle.titular}</p>
                                    </div>
                                    <button
                                      onClick={() => copyToClipboard(prov.zelle!.correoTelefono, `zelle-${prov.id}`)}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                      {copiedFieldId === `zelle-${prov.id}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                      <span>Zelle</span>
                                    </button>
                                  </div>
                                )}

                                {/* 4. Binance */}
                                {prov.binance?.payId && (
                                  <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-2.5 flex items-center justify-between gap-2 text-xs">
                                    <div className="space-y-0.5 min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                                        <Wallet size={12} />
                                        <span>Binance Pay</span>
                                      </div>
                                      <p className="font-mono text-amber-300 text-xs font-bold">Pay ID: {prov.binance.payId}</p>
                                    </div>
                                    <button
                                      onClick={() => copyToClipboard(prov.binance!.payId, `binance-${prov.id}`)}
                                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                      {copiedFieldId === `binance-${prov.id}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                      <span>Pay ID</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Card Footer Actions */}
                          <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                            <button
                              onClick={() => openFichaModal(prov)}
                              className="btn-primary !py-2.5 !px-3.5 text-xs font-black uppercase flex items-center justify-center gap-1.5 rounded-xl shadow-md cursor-pointer flex-1"
                            >
                              <Zap size={14} />
                              <span>Ver Cuentas & Pagar</span>
                            </button>

                            <button
                              onClick={() => copyFullProveedorPaymentInfo(prov)}
                              className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Copiar todos los datos de pago"
                            >
                              {copiedFieldId === `full-${prov.id}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                              <span>{copiedFieldId === `full-${prov.id}` ? '¡Copiado!' : 'Copiar'}</span>
                            </button>

                            <button
                              onClick={() => toggleExpandProv(prov.id)}
                              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs transition-colors cursor-pointer"
                              title={isExpanded ? 'Ocultar detalles' : 'Desplegar cuentas en tarjeta'}
                            >
                              <ChevronDown size={16} className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180 text-amber-400' : ''}`} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
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
                  <div className="flex justify-between items-center bg-[#12141a] p-4 rounded-2xl border border-white/10">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Servicios del Taller MasterTech</h3>
                      <p className="text-[11px] text-zinc-400">Modifica títulos, descripciones, imágenes o elimina servicios de la lista.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = [...services, { id: Date.now(), title: "Nuevo Servicio", desc: "Descripción del servicio...", img: "/assets/servicio-mecanica.jpg" }];
                          setServices(updated);
                        }}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-white/10 transition-colors"
                      >
                        <Plus size={15} />
                        <span>Añadir Servicio</span>
                      </button>

                      <button
                        onClick={() => handleSaveSection('servicios', { SERVICES_JSON: JSON.stringify(services) })}
                        disabled={savingSection === 'servicios'}
                        className="btn-primary !py-2 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shadow-lg"
                      >
                        {savingSection === 'servicios' ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
                        <span>{savedSectionSuccess === 'servicios' ? '¡Servicios Guardados!' : 'Guardar Sección Servicios'}</span>
                      </button>
                    </div>
                  </div>

                  {savedSectionSuccess === 'servicios' && (
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>¡Los cambios en Servicios han sido guardados e integrados públicamente!</span>
                    </div>
                  )}

                  {services.map((srv, idx) => (
                    <div key={srv.id || idx} className="bg-[#12141a] p-5 rounded-2xl border border-white/10 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Servicio #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (!window.confirm(`¿Seguro que deseas eliminar el servicio "${srv.title || 'sin nombre'}"?`)) return;
                            const updated = services.filter((_, i) => i !== idx);
                            setServices(updated);
                          }}
                          className="text-zinc-500 hover:text-red-400 p-1.5 rounded-xl bg-white/5 border border-white/10 transition-colors flex items-center gap-1 text-xs font-bold"
                          title="Eliminar este servicio"
                        >
                          <Trash2 size={14} />
                          <span>Eliminar</span>
                        </button>
                      </div>

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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-wider">Equipo de Especialistas Taller MasterTech</h3>
                      <p className="text-xs text-zinc-400 mt-1">Gestiona los técnicos, ingenieros y coordinadores que aparecen en `/nosotros`.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = [...teamMembers, { id: Date.now(), name: "Nuevo Especialista", role: "ESPECIALISTA TECNICO", desc: "Descripción del cargo...", img: "/assets/servicio-mecanica.jpg" }];
                          setTeamMembers(updated);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-white/10 transition-colors"
                      >
                        <Plus size={16} />
                        <span>Añadir Ficha</span>
                      </button>

                      <button
                        onClick={() => handleSaveSection('equipo', { TEAM_MEMBERS_JSON: JSON.stringify(teamMembers) })}
                        disabled={savingSection === 'equipo'}
                        className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shadow-lg"
                      >
                        {savingSection === 'equipo' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        <span>{savedSectionSuccess === 'equipo' ? '¡Equipo Guardado!' : 'Guardar Equipo de Trabajo'}</span>
                      </button>
                    </div>
                  </div>

                  {savedSectionSuccess === 'equipo' && (
                    <div className="p-3.5 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-xs font-bold flex items-center gap-2 shadow-lg">
                      <CheckCircle2 size={18} />
                      <span>¡Las fotos y datos del Equipo han sido guardados e integrados públicamente en `/nosotros`!</span>
                    </div>
                  )}

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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-wider">Gestión de Reseñas y Testimonios</h3>
                      <p className="text-xs text-zinc-400 mt-1">Edita u organiza las opiniones de los clientes en la sección de inicio.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = [...reviews, { id: Date.now(), name: "Nombre Cliente", car: "Modelo Vehículo", quote: "Excelente atención y diagnóstico preciso." }];
                          setReviews(updated);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-white/10 transition-colors"
                      >
                        <Plus size={16} />
                        <span>Añadir Reseña</span>
                      </button>

                      <button
                        onClick={() => handleSaveSection('testimonios', { REVIEWS_JSON: JSON.stringify(reviews) })}
                        disabled={savingSection === 'testimonios'}
                        className="btn-primary !py-2.5 !px-5 text-xs font-black uppercase border-none flex items-center gap-2 shadow-lg"
                      >
                        {savingSection === 'testimonios' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        <span>{savedSectionSuccess === 'testimonios' ? '¡Reseñas Guardadas!' : 'Guardar Testimonios'}</span>
                      </button>
                    </div>
                  </div>

                  {savedSectionSuccess === 'testimonios' && (
                    <div className="p-3.5 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-xs font-bold flex items-center gap-2 shadow-lg">
                      <CheckCircle2 size={18} />
                      <span>¡Los Testimonios han sido guardados e integrados públicamente!</span>
                    </div>
                  )}

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
                  <div className="flex justify-between items-center bg-[#12141a] p-4 rounded-2xl border border-white/10">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Preguntas Frecuentes (FAQs)</h3>
                      <p className="text-[11px] text-zinc-400">Preguntas y respuestas visibles en `/faq`.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = [...faqs, { q: "Nueva Pregunta Frecuente", a: "Respuesta detallada..." }];
                          setFaqs(updated);
                        }}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-1 hover:bg-white/10"
                      >
                        <Plus size={14} />
                        <span>Añadir</span>
                      </button>

                      <button
                        onClick={() => handleSaveSection('faqs', { FAQS_JSON: JSON.stringify(faqs) })}
                        disabled={savingSection === 'faqs'}
                        className="btn-primary !py-2 !px-4 text-xs font-black uppercase border-none flex items-center gap-1.5 shadow-lg"
                      >
                        {savingSection === 'faqs' ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                        <span>{savedSectionSuccess === 'faqs' ? '¡FAQs Guardadas!' : 'Guardar FAQs'}</span>
                      </button>
                    </div>
                  </div>

                  {savedSectionSuccess === 'faqs' && (
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>¡Preguntas frecuentes guardadas e integradas públicamente!</span>
                    </div>
                  )}

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
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-primary"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updated = faqs.filter((_, i) => i !== idx);
                            setFaqs(updated);
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
          {/* MODULE: EQUIPO & PERFILES DE ACCESO (MULTIUSUARIO) */}
          {/* ========================================================================= */}
          {activeTab === 'usuarios' && (
            <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-xl font-display font-black uppercase tracking-tight text-white flex items-center gap-2.5">
                    <Users className="text-amber-400" size={24} />
                    <span>Equipo & Perfiles de Acceso</span>
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Crea y administra las cuentas de las personas autorizadas con su correo y clave personal para gestionar el taller.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingUser({ name: '', email: '', password: '', role: 'Administrador' });
                    setUserModalError('');
                    setIsUserModalOpen(true);
                  }}
                  className="btn-primary !py-2.5 !px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border-none shadow-lg cursor-pointer shrink-0"
                >
                  <Plus size={16} />
                  <span>Crear Nuevo Perfil</span>
                </button>
              </div>

              {/* Users Grid */}
              {isLoadingUsers ? (
                <div className="py-20 text-center">
                  <Loader2 className="animate-spin text-amber-400 mx-auto mb-3" size={32} />
                  <span className="text-xs text-zinc-500">Cargando perfiles del equipo...</span>
                </div>
              ) : adminUsersList.length === 0 ? (
                <div className="p-8 text-center bg-[#12141a] rounded-2xl border border-white/10 text-zinc-500 text-xs">
                  No hay perfiles adicionales registrados. Haz clic en "Crear Nuevo Perfil".
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {adminUsersList.map(u => {
                    const nameParts = (u.name || 'Admin').split(' ');
                    const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0].slice(0, 2);
                    const isFull = isFullAdminUser(u);

                    return (
                      <div
                        key={u.id}
                        className="bg-[#12141a] border border-white/10 hover:border-amber-400/40 rounded-2xl p-5 space-y-4 shadow-xl transition-all relative flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 flex items-center justify-center text-amber-950 dark:text-amber-300 font-black text-sm shadow-xs shrink-0">
                              {initials.toUpperCase()}
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{u.name}</h3>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-zinc-300 border-slate-300 dark:border-white/15">
                                  {u.role || 'Asesor Logística'}
                                </span>
                                <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                                  isFull 
                                    ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-500/40' 
                                    : (u.accessLevel === 'administracion' || u.role === 'Administración')
                                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
                                    : 'bg-blue-100 dark:bg-blue-500/20 text-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-500/40'
                                }`}>
                                  {isFull ? (
                                    <>
                                      <Crown size={11} className="text-amber-700 dark:text-amber-300" />
                                      <span>Acceso Total</span>
                                    </>
                                  ) : (u.accessLevel === 'administracion' || u.role === 'Administración') ? (
                                    <>
                                      <Building2 size={11} className="text-emerald-700 dark:text-emerald-300" />
                                      <span>Administración (Dashboard + Proveedores)</span>
                                    </>
                                  ) : (
                                    <>
                                      <Package size={11} className="text-blue-700 dark:text-blue-300" />
                                      <span>Logística & Taller (5 Módulos)</span>
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-slate-500 dark:text-zinc-500 shrink-0" />
                            <span className="text-slate-900 dark:text-zinc-300 truncate font-mono font-bold">{u.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Key size={14} className="text-slate-500 dark:text-zinc-500 shrink-0" />
                            <span className="text-slate-700 dark:text-zinc-500 font-medium">Contraseña asignada y encriptada</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              setEditingUser({ ...u, password: '', accessLevel: isFull ? 'full' : 'logistica' });
                              setUserModalError('');
                              setIsUserModalOpen(true);
                            }}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-zinc-300 hover:text-black dark:hover:text-white text-xs font-black py-2 px-3 rounded-xl border border-slate-300 dark:border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Edit size={13} />
                            <span>Editar Perfil / Clave</span>
                          </button>

                          {adminUsersList.length > 1 && (
                            <button
                              onClick={() => handleDeleteAdminUser(u.id)}
                              className="p-2 rounded-xl bg-red-100 hover:bg-red-200 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-500/20 transition-colors cursor-pointer shadow-xs"
                              title="Revocar acceso"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* MODAL CREAR / EDITAR USUARIO */}
              {isUserModalOpen && editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                  <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <UserCheck className="text-amber-400" size={20} />
                        <h2 className="text-base font-bold text-white uppercase tracking-tight">
                          {editingUser.id ? 'Editar Perfil de Acceso' : 'Crear Nuevo Perfil'}
                        </h2>
                      </div>
                      <button
                        onClick={() => { setIsUserModalOpen(false); setEditingUser(null); }}
                        className="text-zinc-500 hover:text-white p-1"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {userModalError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{userModalError}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveAdminUser} className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                          Nombre y Apellido *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingUser.name || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                          placeholder="Ej: Brenda Santaella"
                          className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          value={editingUser.email || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          placeholder="Ej: bresantaella@gmail.com"
                          className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Password */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                          {editingUser.id ? 'Nueva Contraseña (dejar vacío para no cambiarla)' : 'Contraseña de Acceso *'}
                        </label>
                        <input
                          type="password"
                          required={!editingUser.id}
                          value={editingUser.password || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                          placeholder="••••••••••••"
                          className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white font-mono outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Role Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                          Cargo / Función en el Taller
                        </label>
                        <select
                          value={editingUser.role || 'Asesor Logística'}
                          onChange={(e) => {
                            const newRole = e.target.value;
                            const isFull = newRole.includes('CEO') || newRole.includes('Director') || newRole.includes('Marketing') || newRole.includes('Super');
                            const isAdmin = newRole.includes('Administra') || newRole.includes('Admin');
                            setEditingUser({ 
                              ...editingUser, 
                              role: newRole,
                              accessLevel: isFull ? 'full' : isAdmin ? 'administracion' : 'logistica'
                            });
                          }}
                          className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
                        >
                          <option value="CEO - Director">CEO - Director</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Administración">Administración</option>
                          <option value="Asesor Logística">Asesor Logística</option>
                          <option value="Coordinadora Logística">Coordinadora Logística</option>
                        </select>
                      </div>

                      {/* Access Level Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                          Nivel de Permisos en el Panel
                        </label>
                        <select
                          value={editingUser.accessLevel || (editingUser.role === 'Administración' ? 'administracion' : isFullAdminUser(editingUser) ? 'full' : 'logistica')}
                          onChange={(e) => setEditingUser({ ...editingUser, accessLevel: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white outline-none focus:border-amber-400 cursor-pointer"
                        >
                          <option value="full">Super Administrador (Acceso Total: Todas las 9 pestañas del Panel)</option>
                          <option value="administracion">Administración (Acceso exclusivo a Dashboard y Admin Proveedores)</option>
                          <option value="logistica">Logística & Almacén (Dashboard, Citas, Catálogo, Jornadas y Admin Proveedores)</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => { setIsUserModalOpen(false); setEditingUser(null); }}
                          className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-bold py-2.5 rounded-xl border border-white/10 transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          disabled={isSavingUser}
                          className="flex-1 btn-primary !py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 border-none shadow-lg"
                        >
                          {isSavingUser ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                          <span>{isSavingUser ? 'Guardando...' : 'Guardar Perfil'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
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
                        onChange={(val) => setSettingsForm({ ...settingsForm, HERO_IMG: val })}
                        aspectRatio={16 / 9}
                        placeholder="/assets/hero_bg_custom.jpg"
                      />

                      <ImageUploader
                        label="Logo Oficial del Taller MasterTech"
                        value={settingsForm.LOGO_URL || ''}
                        onChange={(val) => setSettingsForm({ ...settingsForm, LOGO_URL: val })}
                        aspectRatio={1 / 1}
                        placeholder="/logo.png"
                      />

                      <ImageUploader
                        label="Imagen de la Sección 'NUESTRAS INSTALACIONES'"
                        value={settingsForm.IMG_INSTALACIONES || ''}
                        onChange={(val) => setSettingsForm({ ...settingsForm, IMG_INSTALACIONES: val })}
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
                      onChange={(e) => setSettingsForm({ ...settingsForm, HERO_REEL_URL: e.target.value })}
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

                      <div className="sm:col-span-2 pt-2 border-t border-white/10">
                        <label className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1.5">
                          Estado Operativo del Taller (Insignia Pública)
                        </label>
                        <select
                          value={settingsForm.IS_OPEN || 'auto'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, IS_OPEN: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-primary cursor-pointer"
                        >
                          <option value="auto" className="bg-[#12141a] text-white">
                            Automático por Horario (Lun-Vie 8:00 AM - 5:00 PM • Hora Venezuela)
                          </option>
                          <option value="force_open" className="bg-[#12141a] text-white">
                            Forzar Taller Abierto (Guardia Especial / Abierto 24/7)
                          </option>
                          <option value="force_closed" className="bg-[#12141a] text-white">
                            Forzar Taller Cerrado (Solo Emergencias)
                          </option>
                        </select>
                        <p className="text-[11px] text-zinc-400 mt-1">
                          En modo automático, la web cambia sola a "Cerrado" a partir de las 5:00 PM y los fines de semana.
                        </p>
                      </div>
                    </div>
                  </div>

                  {savedSectionSuccess === 'settings' && (
                    <div className="p-3.5 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-xs font-bold flex items-center gap-2 shadow-lg">
                      <CheckCircle2 size={18} />
                      <span>¡Los Ajustes Generales del Sitio (Imágenes, WhatsApp y Redes) han sido guardados e integrados públicamente!</span>
                    </div>
                  )}

                  {/* Telegram Integration */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-amber-400">3. Notificaciones Bot de Telegram</h3>
                      <button
                        type="button"
                        onClick={() => handleSaveSection('telegram')}
                        disabled={savingSection === 'telegram'}
                        className="px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {savingSection === 'telegram' ? <Loader2 className="animate-spin" size={13} /> : <Save size={13} />}
                        <span>{savedSectionSuccess === 'telegram' ? '¡Telegram Guardado!' : 'Guardar Telegram'}</span>
                      </button>
                    </div>

                    {savedSectionSuccess === 'telegram' && (
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        <span>¡Configuración del Bot de Telegram guardada correctamente!</span>
                      </div>
                    )}

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
                    type="button"
                    onClick={() => handleSaveSection('settings')}
                    disabled={savingSection === 'settings'}
                    className="btn-primary !py-2.5 !px-6 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-none shadow-lg cursor-pointer"
                  >
                    {savingSection === 'settings' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    <span>{savedSectionSuccess === 'settings' ? '¡Ajustes Guardados!' : 'Guardar Ajustes Generales'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODULE: REGISTRO DE ACTIVIDAD & AUDITORÍA DE USUARIOS */}
          {/* ========================================================================= */}
          {activeTab === 'auditoria' && (
            <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-xl font-display font-black uppercase tracking-tight text-white flex items-center gap-2.5">
                    <History className="text-amber-400" size={24} />
                    <span>Registro de Actividad & Auditoría</span>
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Historial cronológico en tiempo real de cada inicio de sesión, cambios, modificaciones y eliminaciones por usuario.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchAuditLogs}
                    disabled={isLoadingLogs}
                    className="bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                    title="Actualizar registro"
                  >
                    <RefreshCw size={14} className={isLoadingLogs ? "animate-spin text-amber-400" : "text-zinc-400"} />
                    <span>{isLoadingLogs ? "Cargando..." : "Actualizar"}</span>
                  </button>

                  {auditLogs.length > 0 && isFullAdminUser(currentUser) && (
                    <button
                      onClick={async () => {
                        if (!window.confirm('¿Seguro que deseas vaciar el historial de auditoría? Esta acción es irreversible.')) return;
                        try {
                          await fetch('/api/admin/logs', {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${token}` }
                          });
                          fetchAuditLogs();
                        } catch (e) {}
                      }}
                      className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Limpiar registro"
                    >
                      <Trash2 size={14} />
                      <span>Limpiar Historial</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Filters & Search Controls */}
              <div className="bg-[#12141a] border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Buscar por usuario, correo, acción o detalle..."
                      value={logSearchQuery}
                      onChange={(e) => setLogSearchQuery(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Category Filter Pills (Strict Single Line with Lucide SVG Icons) */}
                <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar flex-nowrap whitespace-nowrap pb-1">
                  {[
                    { id: 'TODOS', label: 'Todos los Eventos', icon: <Layers size={13} className="shrink-0" /> },
                    { id: 'AUTH', label: 'Inicios de Sesión', icon: <Key size={13} className="shrink-0" /> },
                    { id: 'CATALOGO', label: 'Repuestos', icon: <Package size={13} className="shrink-0" /> },
                    { id: 'CITAS', label: 'Citas', icon: <Calendar size={13} className="shrink-0" /> },
                    { id: 'USUARIOS', label: 'Usuarios', icon: <Users size={13} className="shrink-0" /> },
                    { id: 'JORNADAS', label: 'Jornadas', icon: <Zap size={13} className="shrink-0" /> },
                    { id: 'AJUSTES', label: 'Ajustes Web', icon: <Sliders size={13} className="shrink-0" /> },
                  ].map(cat => {
                    const isSelected = logCategoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setLogCategoryFilter(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-md shadow-amber-500/10'
                            : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <span className={isSelected ? 'text-amber-300' : 'text-zinc-500'}>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Logs Timeline List */}
              {isLoadingLogs ? (
                <div className="py-20 text-center">
                  <Loader2 className="animate-spin text-amber-400 mx-auto mb-3" size={32} />
                  <span className="text-xs text-zinc-500">Cargando registros de auditoría...</span>
                </div>
              ) : (() => {
                const filtered = auditLogs.filter(log => {
                  const matchesCategory = logCategoryFilter === 'TODOS' || log.category === logCategoryFilter;
                  const q = logSearchQuery.toLowerCase().trim();
                  const matchesSearch = !q || 
                    (log.userName || '').toLowerCase().includes(q) ||
                    (log.userEmail || '').toLowerCase().includes(q) ||
                    (log.action || '').toLowerCase().includes(q) ||
                    (log.details || '').toLowerCase().includes(q);
                  return matchesCategory && matchesSearch;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="bg-[#12141a] border border-white/10 rounded-2xl p-12 text-center space-y-2">
                      <ShieldAlert size={32} className="text-zinc-600 mx-auto" />
                      <p className="text-sm font-bold text-white">No hay registros de actividad aún</p>
                      <p className="text-xs text-zinc-500">Las acciones que realice cada usuario (inicios de sesión, cambios de repuestos, citas o usuarios) aparecerán aquí registradas al instante.</p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-2.5">
                    {filtered.map(log => {
                      const nameParts = (log.userName || 'Admin').split(' ');
                      const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0].slice(0, 2);
                      const isAuth = log.category === 'AUTH';
                      const isCat = log.category === 'CATALOGO';
                      const isCitas = log.category === 'CITAS';
                      const isUsers = log.category === 'USUARIOS';
                      const isJor = log.category === 'JORNADAS';

                      let dateFormatted = '';
                      try {
                        dateFormatted = new Date(log.timestamp).toLocaleString('es-VE', {
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true
                        });
                      } catch (e) {
                        dateFormatted = log.timestamp || '';
                      }

                      return (
                        <div
                          key={log.id}
                          className="bg-[#12141a] border border-white/10 hover:border-amber-400/30 rounded-2xl p-4 transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-primary/20 to-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-black text-xs shrink-0 shadow-md">
                              {initials.toUpperCase()}
                            </div>

                            <div className="space-y-0.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-black text-white">{log.userName || 'Usuario'}</span>
                                <span className="text-[10px] text-zinc-500 font-mono">({log.userEmail})</span>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-400">
                                  {log.userRole || 'Administrador'}
                                </span>
                              </div>

                              <p className="text-xs text-zinc-300 leading-snug">
                                {log.details}
                              </p>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                            <span className={`inline-block text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                              isAuth 
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                                : isCat 
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : isCitas
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                : isUsers
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : isJor
                                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            }`}>
                              {log.action}
                            </span>

                            <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                              <Clock size={11} />
                              <span>{dateFormatted}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Distintivo / Badge</label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    placeholder="Ej. Mantenimiento Esencial"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-white font-bold select-none">
                    <input
                      type="checkbox"
                      checked={!!editingProduct.isImportedUSA}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isImportedUSA: e.target.checked })}
                      className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                    />
                    <span className="text-xs text-amber-300 flex items-center gap-1.5">
                      <Globe size={13} />
                      <span>Importado desde EE.UU.</span>
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Compatibilidad (Marca, Modelo, Años)</label>
                <input
                  type="text"
                  value={editingProduct.compatibility || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, compatibility: e.target.value })}
                  placeholder="Ej. Toyota Hilux / Fortuner 2016-2025, Jeep Grand Cherokee 2012-2022"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Especificaciones Clave (Una por línea)</label>
                <textarea
                  rows={3}
                  value={Array.isArray(editingProduct.specs) ? editingProduct.specs.join('\n') : (editingProduct.specs || '')}
                  onChange={(e) => setEditingProduct({ ...editingProduct, specs: e.target.value.split('\n') })}
                  placeholder="Ej: Aceite Sintético 5W-30 (4L)&#10;Filtro de Aceite Anti-Drenaje&#10;Incluye arandela de cobre"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <div className="space-y-4 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">
                    Galería de Imágenes (Sin Límite)
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const currentImgs = [...(editingProduct.images || [])];
                      currentImgs.push('');
                      setEditingProduct({ ...editingProduct, images: currentImgs });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Añadir Foto a la Galería</span>
                  </button>
                </div>
                
                {/* Imagen Principal */}
                <ImageUploader
                  label="Imagen Principal (Portada / Vista Previa del Catálogo)"
                  value={editingProduct.img || ''}
                  onChange={(val) => setEditingProduct({ ...editingProduct, img: val })}
                  aspectRatio={4 / 3}
                  placeholder="/assets/servicio-mecanica.jpg"
                />

                {/* Galería Adicional Indefinida */}
                {(editingProduct.images || []).map((imgUrl, imgIdx) => (
                  <div key={imgIdx} className="bg-black/30 p-3 rounded-2xl border border-white/5 space-y-2 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Foto Adicional #{imgIdx + 2}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentImgs = [...(editingProduct.images || [])];
                          currentImgs.splice(imgIdx, 1);
                          setEditingProduct({ ...editingProduct, images: currentImgs });
                        }}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1 flex items-center gap-1 text-[10px] font-bold"
                        title="Eliminar esta foto"
                      >
                        <Trash2 size={12} />
                        <span>Quitar</span>
                      </button>
                    </div>
                    <ImageUploader
                      label=""
                      value={imgUrl || ''}
                      onChange={(val) => {
                        const currentImgs = [...(editingProduct.images || [])];
                        currentImgs[imgIdx] = val;
                        setEditingProduct({ ...editingProduct, images: currentImgs });
                      }}
                      aspectRatio={4 / 3}
                      placeholder="/assets/servicio-frenos.jpg"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const currentImgs = [...(editingProduct.images || [])];
                    currentImgs.push('');
                    setEditingProduct({ ...editingProduct, images: currentImgs });
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>+ Añadir Otra Foto a la Galería (Sin Límite)</span>
                </button>
              </div>
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

      {/* ========================================================================= */}
      {/* MODAL: EDITAR / REGISTRAR PROVEEDOR */}
      {/* ========================================================================= */}
      {isProveedorModalOpen && editingProveedor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-primary">
                  <Building2 size={18} />
                </div>
                <h3 className="text-sm font-bold text-white uppercase">
                  {editingProveedor.id && proveedoresList.some(p => p.id === editingProveedor.id)
                    ? `Editar Proveedor: ${editingProveedor.nombreComercial}`
                    : 'Registrar Nuevo Comercio Aliado / Proveedor'}
                </h3>
              </div>
              <button onClick={() => setIsProveedorModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Section 1: Datos Comerciales */}
              <div className="bg-black/30 border border-white/10 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-[11px] font-black uppercase text-amber-400 block tracking-wider flex items-center gap-1.5">
                    <Building2 size={14} />
                    <span>1. Información Comercial & Contacto</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium">Campos principales del aliado</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre Comercial */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      Nombre Comercial / Tienda <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: AutoRepuestos El Oriental"
                      value={editingProveedor.nombreComercial}
                      onChange={(e) => setEditingProveedor({ ...editingProveedor, nombreComercial: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white font-bold outline-none focus:border-primary text-xs"
                    />
                  </div>

                  {/* Categoría */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      Categoría de Especialidad <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={editingProveedor.categoria}
                      onChange={(e) => setEditingProveedor({ ...editingProveedor, categoria: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white font-bold outline-none focus:border-primary cursor-pointer text-xs"
                    >
                      <option value="Autopartes & Repuestos Generales">Autopartes & Repuestos Generales</option>
                      <option value="Caucheras, Neumáticos & Rines">Caucheras, Neumáticos & Rines</option>
                      <option value="Lubricantes, Aceites & Filtros">Lubricantes, Aceites & Filtros</option>
                      <option value="Baterías & Electroauto">Baterías & Electroauto</option>
                      <option value="Frenos, Suspensión & Tren Delantero">Frenos, Suspensión & Tren Delantero</option>
                      <option value="Repuestos Motor & OEM">Repuestos Motor & OEM</option>
                      <option value="Tornos, Rectificadoras & Mecanizado">Tornos, Rectificadoras & Mecanizado</option>
                      <option value="Auto Periquitos & Accesorios">Auto Periquitos & Accesorios</option>
                      <option value="Autolavado, Car Wash & Detailing">Autolavado, Car Wash & Detailing</option>
                      <option value="Pintura, Latonería & Detailing">Pintura, Latonería & Detailing</option>
                      <option value="Herramientas, Tornillería & Consumibles">Herramientas, Tornillería & Consumibles</option>
                      <option value="Talleres Aliados & Servicios Externos">Talleres Aliados & Servicios Externos</option>
                      <option value="Otros Comercios Aliados">Otros Comercios Aliados</option>
                    </select>
                  </div>

                  {/* RIF o Documento */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      RIF o Cédula Fiscal
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: J-12345678-9"
                      value={editingProveedor.rif || ''}
                      onChange={(e) => setEditingProveedor({ ...editingProveedor, rif: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white outline-none focus:border-primary text-xs"
                    />
                  </div>

                  {/* Persona de Contacto */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      Persona de Contacto / Asesor
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Carlos Mendoza (Ventas)"
                      value={editingProveedor.contactoNombre || ''}
                      onChange={(e) => setEditingProveedor({ ...editingProveedor, contactoNombre: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white outline-none focus:border-primary text-xs"
                    />
                  </div>

                  {/* Teléfono / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      Teléfono / WhatsApp Directo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: +58 412 1234567"
                      value={editingProveedor.telefono || ''}
                      onChange={(e) => setEditingProveedor({ ...editingProveedor, telefono: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white outline-none focus:border-primary font-mono text-xs"
                    />
                  </div>

                  {/* Selector ¿Acepta Crédito? */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      ¿Otorga Crédito Comercial? <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={editingProveedor.aceptaCredito ? 'si' : 'no'}
                      onChange={(e) => {
                        const isCredit = e.target.value === 'si';
                        setEditingProveedor({
                          ...editingProveedor,
                          aceptaCredito: isCredit,
                          diasCredito: isCredit 
                            ? (editingProveedor.diasCredito && !editingProveedor.diasCredito.toLowerCase().includes('contado') ? editingProveedor.diasCredito : '15 Días de Crédito') 
                            : 'Contado / Inmediato'
                        });
                      }}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white font-bold outline-none focus:border-primary cursor-pointer text-xs"
                    >
                      <option value="no">No — Solo Contado (Pago Inmediato)</option>
                      <option value="si">Sí — Acepta Crédito Comercial</option>
                    </select>
                  </div>

                  {/* Días de Crédito Acordados */}
                  {editingProveedor.aceptaCredito ? (
                    <div className="space-y-1.5 animate-fade-in">
                      <label className="text-[11px] text-amber-400 font-bold block">
                        Plazo / Días de Crédito Acordados *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: 15 Días, 30 Días, Fin de Mes"
                        value={editingProveedor.diasCredito || ''}
                        onChange={(e) => setEditingProveedor({ ...editingProveedor, diasCredito: e.target.value })}
                        className="w-full bg-black/50 border border-amber-500/40 rounded-xl py-2.5 px-3.5 text-amber-300 font-bold outline-none focus:border-primary text-xs"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1.5 opacity-60">
                      <label className="text-[11px] text-zinc-400 font-bold block">
                        Condición de Pago
                      </label>
                      <input
                        type="text"
                        disabled
                        value="Contado / Pago Inmediato"
                        className="w-full bg-black/30 border border-white/5 rounded-xl py-2.5 px-3.5 text-zinc-400 text-xs cursor-not-allowed"
                      />
                    </div>
                  )}

                  {/* Dirección */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      Dirección o Ubicación del Comercio
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Av. 4 de Mayo, Edif. Central, Porlamar"
                      value={editingProveedor.direccion || ''}
                      onChange={(e) => setEditingProveedor({ ...editingProveedor, direccion: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white outline-none focus:border-primary text-xs"
                    />
                  </div>

                  {/* Notas Internas */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      Notas Internas & Descuentos Acordados
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Descuento del 10% para MasterTech. Código cliente: MT-104."
                      value={editingProveedor.notas || ''}
                      onChange={(e) => setEditingProveedor({ ...editingProveedor, notas: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-amber-200 outline-none focus:border-primary text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Selector de Métodos de Pago Activos */}
              <div className="bg-black/40 border border-white/10 p-4 rounded-2xl space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 block tracking-wider">
                    2. ¿Qué Métodos de Pago Acepta este Proveedor?
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Selecciona únicamente los métodos que utiliza para desplegar solo las casillas necesarias:
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Option 1: Transferencia Bancaria */}
                  <button
                    type="button"
                    onClick={() => {
                      const hasBancos = editingProveedor.bancos && editingProveedor.bancos.length > 0;
                      if (hasBancos) {
                        setEditingProveedor({ ...editingProveedor, bancos: [] });
                      } else {
                        setEditingProveedor({
                          ...editingProveedor,
                          bancos: [{
                            id: `b_${Date.now()}`,
                            banco: 'Banesco',
                            tipoCuenta: 'Corriente' as const,
                            numeroCuenta: '',
                            titular: editingProveedor.nombreComercial || '',
                            documento: editingProveedor.rif || ''
                          }]
                        });
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer select-none ${
                      editingProveedor.bancos && editingProveedor.bancos.length > 0
                        ? 'bg-blue-500/20 border-blue-500/60 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-black/30 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-lg ${editingProveedor.bancos && editingProveedor.bancos.length > 0 ? 'bg-blue-500 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <Building2 size={16} />
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-black ${
                        editingProveedor.bancos && editingProveedor.bancos.length > 0
                          ? 'bg-blue-500 text-black border-blue-400'
                          : 'border-zinc-700 bg-black/40'
                      }`}>
                        {editingProveedor.bancos && editingProveedor.bancos.length > 0 ? '✓' : ''}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Transferencia</span>
                      <span className="text-[9px] text-zinc-400">Bancos Nacionales</span>
                    </div>
                  </button>

                  {/* Option 2: Pago Móvil */}
                  <button
                    type="button"
                    onClick={() => {
                      const hasPm = editingProveedor.pagoMovil && editingProveedor.pagoMovil.length > 0;
                      if (hasPm) {
                        setEditingProveedor({ ...editingProveedor, pagoMovil: [] });
                      } else {
                        setEditingProveedor({
                          ...editingProveedor,
                          pagoMovil: [{
                            id: `pm_${Date.now()}`,
                            banco: 'Banesco (0134)',
                            telefono: editingProveedor.telefono || '',
                            documento: editingProveedor.rif || '',
                            titular: editingProveedor.nombreComercial || ''
                          }]
                        });
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer select-none ${
                      editingProveedor.pagoMovil && editingProveedor.pagoMovil.length > 0
                        ? 'bg-cyan-500/20 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-black/30 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-lg ${editingProveedor.pagoMovil && editingProveedor.pagoMovil.length > 0 ? 'bg-cyan-500 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <CreditCard size={16} />
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-black ${
                        editingProveedor.pagoMovil && editingProveedor.pagoMovil.length > 0
                          ? 'bg-cyan-500 text-black border-cyan-400'
                          : 'border-zinc-700 bg-black/40'
                      }`}>
                        {editingProveedor.pagoMovil && editingProveedor.pagoMovil.length > 0 ? '✓' : ''}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Pago Móvil</span>
                      <span className="text-[9px] text-zinc-400">Banca Móvil Vzla</span>
                    </div>
                  </button>

                  {/* Option 3: Zelle */}
                  <button
                    type="button"
                    onClick={() => {
                      const hasZelle = Boolean(editingProveedor.zelle?.correoTelefono);
                      if (hasZelle || editingProveedor.zelle !== undefined) {
                        setEditingProveedor({ ...editingProveedor, zelle: undefined });
                      } else {
                        setEditingProveedor({
                          ...editingProveedor,
                          zelle: {
                            correoTelefono: '',
                            titular: editingProveedor.nombreComercial || ''
                          }
                        });
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer select-none ${
                      editingProveedor.zelle !== undefined
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-black/30 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-lg ${editingProveedor.zelle !== undefined ? 'bg-emerald-500 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <DollarSign size={16} />
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-black ${
                        editingProveedor.zelle !== undefined
                          ? 'bg-emerald-500 text-black border-emerald-400'
                          : 'border-zinc-700 bg-black/40'
                      }`}>
                        {editingProveedor.zelle !== undefined ? '✓' : ''}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Zelle ($ USA)</span>
                      <span className="text-[9px] text-zinc-400">Dólares EE.UU.</span>
                    </div>
                  </button>

                  {/* Option 4: Binance Pay */}
                  <button
                    type="button"
                    onClick={() => {
                      const hasBinance = Boolean(editingProveedor.binance?.payId || editingProveedor.binance?.walletUsdt);
                      if (hasBinance || editingProveedor.binance !== undefined) {
                        setEditingProveedor({ ...editingProveedor, binance: undefined });
                      } else {
                        setEditingProveedor({
                          ...editingProveedor,
                          binance: {
                            payId: '',
                            correoBinance: '',
                            walletUsdt: '',
                            titular: editingProveedor.nombreComercial || ''
                          }
                        });
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer select-none ${
                      editingProveedor.binance !== undefined
                        ? 'bg-amber-500/20 border-amber-500/60 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-black/30 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-lg ${editingProveedor.binance !== undefined ? 'bg-amber-500 text-black' : 'bg-white/5 text-zinc-400'}`}>
                        <Wallet size={16} />
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-black ${
                        editingProveedor.binance !== undefined
                          ? 'bg-amber-500 text-black border-amber-400'
                          : 'border-zinc-700 bg-black/40'
                      }`}>
                        {editingProveedor.binance !== undefined ? '✓' : ''}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Binance Pay</span>
                      <span className="text-[9px] text-zinc-400">USDT / Cripto</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Mensaje de Ayuda si no hay métodos seleccionados */}
              {!((editingProveedor.bancos && editingProveedor.bancos.length > 0) || (editingProveedor.pagoMovil && editingProveedor.pagoMovil.length > 0) || editingProveedor.zelle !== undefined || editingProveedor.binance !== undefined) && (
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center space-y-1">
                  <span className="text-xs font-bold text-amber-300 block">💡 Selecciona uno o más métodos de pago arriba</span>
                  <span className="text-[11px] text-zinc-400 block">Por ejemplo, activa <strong>"Transferencia"</strong> y <strong>"Pago Móvil"</strong> para completar sus datos bancarios.</span>
                </div>
              )}

              {/* Section 3: Cuentas Bancarias Nacionales (Bs / $) - Condicional */}
              {(editingProveedor.bancos && editingProveedor.bancos.length > 0) && (
                <div className="bg-black/30 border border-blue-500/30 p-4 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-blue-400 block tracking-wider flex items-center gap-1.5">
                      <Building2 size={13} />
                      <span>Cuentas Bancarias Nacionales (Transferencias)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newBancos = [
                          ...(editingProveedor.bancos || []),
                          {
                            id: `b_${Date.now()}`,
                            banco: 'Banesco',
                            tipoCuenta: 'Corriente' as const,
                            numeroCuenta: '',
                            titular: editingProveedor.nombreComercial || '',
                            documento: editingProveedor.rif || ''
                          }
                        ];
                        setEditingProveedor({ ...editingProveedor, bancos: newBancos });
                      }}
                      className="text-[10px] font-bold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-2.5 py-1 rounded-lg border border-blue-500/30 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={12} />
                      <span>Agregar Otra Cuenta</span>
                    </button>
                  </div>

                  {(editingProveedor.bancos || []).map((b, bIdx) => (
                    <div key={bIdx} className="bg-black/60 border border-white/10 p-3 rounded-xl space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase text-zinc-500">Cuenta #{bIdx + 1}</span>
                        {(editingProveedor.bancos || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newB = editingProveedor.bancos.filter((_, idx) => idx !== bIdx);
                              setEditingProveedor({ ...editingProveedor, bancos: newB });
                            }}
                            className="text-red-400 hover:text-red-300 text-[10px] flex items-center gap-0.5"
                          >
                            <Trash2 size={12} />
                            <span>Quitar</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Banco Nacional & Código</label>
                          <select
                            value={b.banco}
                            onChange={(e) => {
                              const newB = [...editingProveedor.bancos];
                              const selectedBank = e.target.value;
                              newB[bIdx].banco = selectedBank;
                              const found = BANCOS_VENEZUELA.find(bk => bk.nombre === selectedBank || bk.codigo === selectedBank);
                              if (found && (!newB[bIdx].numeroCuenta || newB[bIdx].numeroCuenta.length <= 4)) {
                                newB[bIdx].numeroCuenta = found.codigo;
                              }
                              setEditingProveedor({ ...editingProveedor, bancos: newB });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white font-bold outline-none focus:border-primary text-xs cursor-pointer"
                          >
                            <option value="">-- Selecciona el Banco --</option>
                            {BANCOS_VENEZUELA.map((bk) => (
                              <option key={bk.codigo} value={bk.nombre}>
                                {bk.codigo} - {bk.nombre}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Tipo de Cuenta</label>
                          <select
                            value={b.tipoCuenta || 'Corriente'}
                            onChange={(e) => {
                              const newB = [...editingProveedor.bancos];
                              newB[bIdx].tipoCuenta = e.target.value as any;
                              setEditingProveedor({ ...editingProveedor, bancos: newB });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-primary text-xs cursor-pointer"
                          >
                            <option value="Corriente">Cuenta Corriente</option>
                            <option value="Ahorro">Cuenta de Ahorro</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Número de Cuenta (20 dígitos)</label>
                        <input
                          type="text"
                          placeholder="0134 0000 00 0000000000"
                          value={b.numeroCuenta}
                          onChange={(e) => {
                            const newB = [...editingProveedor.bancos];
                            newB[bIdx].numeroCuenta = e.target.value.replace(/[^\d]/g, '').slice(0, 20);
                            setEditingProveedor({ ...editingProveedor, bancos: newB });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-amber-400 font-mono font-bold tracking-wider outline-none focus:border-primary text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Nombre del Titular</label>
                          <input
                            type="text"
                            placeholder="Nombre o Razón Social"
                            value={b.titular}
                            onChange={(e) => {
                              const newB = [...editingProveedor.bancos];
                              newB[bIdx].titular = e.target.value;
                              setEditingProveedor({ ...editingProveedor, bancos: newB });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-primary text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">RIF / Cédula del Titular</label>
                          <input
                            type="text"
                            placeholder="J-00000000-0 o V-00000000"
                            value={b.documento}
                            onChange={(e) => {
                              const newB = [...editingProveedor.bancos];
                              newB[bIdx].documento = e.target.value;
                              setEditingProveedor({ ...editingProveedor, bancos: newB });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white font-mono outline-none focus:border-primary text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Section 4: Pago Móvil - Condicional */}
              {(editingProveedor.pagoMovil && editingProveedor.pagoMovil.length > 0) && (
                <div className="bg-black/30 border border-cyan-500/30 p-4 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-cyan-400 block tracking-wider flex items-center gap-1.5">
                      <CreditCard size={13} />
                      <span>Pago Móvil</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newPm = [
                          ...(editingProveedor.pagoMovil || []),
                          {
                            id: `pm_${Date.now()}`,
                            banco: 'Banesco Banco Universal (0134)',
                            telefono: editingProveedor.telefono || '',
                            documento: editingProveedor.rif || '',
                            titular: editingProveedor.nombreComercial || ''
                          }
                        ];
                        setEditingProveedor({ ...editingProveedor, pagoMovil: newPm });
                      }}
                      className="text-[10px] font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/30 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={12} />
                      <span>Agregar Pago Móvil</span>
                    </button>
                  </div>

                  {(editingProveedor.pagoMovil || []).map((pm, pmIdx) => (
                    <div key={pmIdx} className="bg-black/60 border border-white/10 p-3 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase text-zinc-500">Pago Móvil #{pmIdx + 1}</span>
                        {(editingProveedor.pagoMovil || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newPm = editingProveedor.pagoMovil.filter((_, idx) => idx !== pmIdx);
                              setEditingProveedor({ ...editingProveedor, pagoMovil: newPm });
                            }}
                            className="text-red-400 hover:text-red-300 text-[10px] flex items-center gap-0.5"
                          >
                            <Trash2 size={12} />
                            <span>Quitar</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Banco & Código</label>
                          <select
                            value={pm.banco}
                            onChange={(e) => {
                              const newPm = [...editingProveedor.pagoMovil];
                              newPm[pmIdx].banco = e.target.value;
                              setEditingProveedor({ ...editingProveedor, pagoMovil: newPm });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white font-bold outline-none focus:border-primary text-xs cursor-pointer"
                          >
                            <option value="">-- Selecciona el Banco --</option>
                            {BANCOS_VENEZUELA.map((bk) => (
                              <option key={bk.codigo} value={bk.nombre}>
                                {bk.codigo} - {bk.nombre}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Teléfono Pago Móvil</label>
                          <input
                            type="text"
                            placeholder="Ej: 04141234567"
                            value={pm.telefono}
                            onChange={(e) => {
                              const newPm = [...editingProveedor.pagoMovil];
                              newPm[pmIdx].telefono = e.target.value;
                              setEditingProveedor({ ...editingProveedor, pagoMovil: newPm });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-cyan-300 font-mono font-bold outline-none focus:border-primary text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">C.I. / RIF</label>
                          <input
                            type="text"
                            placeholder="Ej: J-31456789-0 o V-18765432"
                            value={pm.documento}
                            onChange={(e) => {
                              const newPm = [...editingProveedor.pagoMovil];
                              newPm[pmIdx].documento = e.target.value;
                              setEditingProveedor({ ...editingProveedor, pagoMovil: newPm });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white font-mono outline-none focus:border-primary text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Section 5: Zelle - Condicional */}
              {editingProveedor.zelle !== undefined && (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/40 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign size={15} className="text-emerald-400" />
                      <span className="font-bold text-white text-xs">Datos Zelle ($ USA)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingProveedor({ ...editingProveedor, zelle: undefined })}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 size={12} />
                      <span>Desactivar Zelle</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Correo o Teléfono Zelle</label>
                      <input
                        type="text"
                        placeholder="pagos@empresa.com o +1 305..."
                        value={editingProveedor.zelle?.correoTelefono || ''}
                        onChange={(e) => setEditingProveedor({
                          ...editingProveedor,
                          zelle: {
                            correoTelefono: e.target.value,
                            titular: editingProveedor.zelle?.titular || editingProveedor.nombreComercial || ''
                          }
                        })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-emerald-300 font-mono font-bold outline-none focus:border-primary text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Nombre del Titular Zelle</label>
                      <input
                        type="text"
                        placeholder="Nombre completo / Empresa USA"
                        value={editingProveedor.zelle?.titular || ''}
                        onChange={(e) => setEditingProveedor({
                          ...editingProveedor,
                          zelle: {
                            correoTelefono: editingProveedor.zelle?.correoTelefono || '',
                            titular: e.target.value
                          }
                        })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-primary text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 6: Binance Pay - Condicional */}
              {editingProveedor.binance !== undefined && (
                <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wallet size={15} className="text-amber-400" />
                      <span className="font-bold text-white text-xs">Binance Pay / USDT</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingProveedor({ ...editingProveedor, binance: undefined })}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 size={12} />
                      <span>Desactivar Binance</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Binance Pay ID</label>
                      <input
                        type="text"
                        placeholder="Ej: 84729104"
                        value={editingProveedor.binance?.payId || ''}
                        onChange={(e) => setEditingProveedor({
                          ...editingProveedor,
                          binance: {
                            ...editingProveedor.binance,
                            payId: e.target.value
                          }
                        })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-amber-300 font-mono font-bold outline-none focus:border-primary text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-500 font-bold block text-[10px] mb-0.5">Correo Binance</label>
                      <input
                        type="text"
                        placeholder="usuario@binance.com"
                        value={editingProveedor.binance?.correoBinance || ''}
                        onChange={(e) => setEditingProveedor({
                          ...editingProveedor,
                          binance: {
                            ...editingProveedor.binance,
                            payId: editingProveedor.binance?.payId || '',
                            correoBinance: e.target.value
                          }
                        })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-primary text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsProveedorModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!editingProveedor.nombreComercial.trim()) {
                    alert('Por favor ingresa el nombre comercial del proveedor.');
                    return;
                  }

                  const isEdit = proveedoresList.some(p => p.id === editingProveedor.id);
                  let updated: Proveedor[] = [];

                  if (isEdit) {
                    updated = proveedoresList.map(p => p.id === editingProveedor.id ? { ...editingProveedor, actualizadoEn: new Date().toISOString() } : p);
                  } else {
                    const newProv: Proveedor = {
                      ...editingProveedor,
                      id: editingProveedor.id || `prov_${Date.now()}`,
                      actualizadoEn: new Date().toISOString()
                    };
                    updated = [newProv, ...proveedoresList];
                  }

                  handleSaveProveedores(
                    updated,
                    `${isEdit ? 'Actualizó datos del proveedor' : 'Registró nuevo proveedor'} "${editingProveedor.nombreComercial}".`
                  );
                  setIsProveedorModalOpen(false);
                  setEditingProveedor(null);
                }}
                disabled={isSavingProveedor}
                className="btn-primary !py-2.5 !px-6 text-xs font-black uppercase border-none rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
              >
                {isSavingProveedor ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                <span>{isSavingProveedor ? 'Guardando...' : 'Guardar Proveedor'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: FICHA RÁPIDA DE PAGO (DISEÑO FINTECH LIMPIO CON PESTAÑAS) */}
      {/* ========================================================================= */}
      {selectedProveedorFicha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#12141a] border border-white/15 rounded-3xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-white/10 pb-3.5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    {selectedProveedorFicha.categoria || 'Proveedor'}
                  </span>
                  {selectedProveedorFicha.aceptaCredito ? (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock size={11} className="text-amber-300" />
                      <span>Crédito: {selectedProveedorFicha.diasCredito || 'Activo'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Banknote size={11} className="text-zinc-400" />
                      <span>Solo Contado</span>
                    </span>
                  )}
                </div>

                <h2 className="text-base font-display font-black text-white leading-tight mt-1">
                  {selectedProveedorFicha.nombreComercial}
                </h2>
                {selectedProveedorFicha.rif && (
                  <span className="text-[10px] font-mono text-zinc-400">
                    RIF: <strong className="text-zinc-300">{selectedProveedorFicha.rif}</strong>
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedProveedorFicha(null)}
                className="text-zinc-400 hover:text-white p-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                title="Cerrar Ficha"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tabs de Selección de Método (Evita saturar la pantalla) */}
            <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-2xl overflow-x-auto">
              {selectedProveedorFicha.bancos && selectedProveedorFicha.bancos.length > 0 && (
                <button
                  onClick={() => setSelectedFichaTab('bancos')}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    selectedFichaTab === 'bancos'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Building2 size={13} />
                  <span>Bancos ({selectedProveedorFicha.bancos.length})</span>
                </button>
              )}

              {selectedProveedorFicha.pagoMovil && selectedProveedorFicha.pagoMovil.length > 0 && (
                <button
                  onClick={() => setSelectedFichaTab('pagoMovil')}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    selectedFichaTab === 'pagoMovil'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Smartphone size={13} />
                  <span>Pago Móvil ({selectedProveedorFicha.pagoMovil.length})</span>
                </button>
              )}

              {selectedProveedorFicha.zelle?.correoTelefono && (
                <button
                  onClick={() => setSelectedFichaTab('zelle')}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    selectedFichaTab === 'zelle'
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <DollarSign size={13} />
                  <span>Zelle</span>
                </button>
              )}

              {selectedProveedorFicha.binance?.payId && (
                <button
                  onClick={() => setSelectedFichaTab('binance')}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    selectedFichaTab === 'binance'
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Wallet size={13} />
                  <span>Binance</span>
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="min-h-[140px] space-y-3">
              {/* 1. Tab Bancos */}
              {selectedFichaTab === 'bancos' && selectedProveedorFicha.bancos && (
                <div className="space-y-2.5 animate-fade-in">
                  {selectedProveedorFicha.bancos.map((b, i) => {
                    const isCopiedAccount = copiedFieldId === `quick-banco-${i}`;
                    const isCopiedDoc = copiedFieldId === `quick-doc-${i}`;
                    return (
                      <div key={i} className="p-3.5 bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 dark:text-white">{b.banco}</span>
                            <span className="text-[9px] font-bold text-slate-700 dark:text-zinc-400 uppercase bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded">
                              {b.tipoCuenta || 'Corriente'}
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(b.numeroCuenta, `quick-banco-${i}`)}
                            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-black rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                          >
                            {isCopiedAccount ? <Check size={12} className="text-black" /> : <Copy size={12} />}
                            <span>{isCopiedAccount ? '¡Copiada!' : 'Copiar Cuenta'}</span>
                          </button>
                        </div>

                        <div className="bg-slate-200/90 dark:bg-black/60 p-2 rounded-xl border border-slate-300 dark:border-white/5 font-mono text-xs text-amber-900 dark:text-amber-400 font-black tracking-wider select-all">
                          {b.numeroCuenta}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-zinc-400 pt-0.5 font-bold">
                          <span className="truncate">Titular: <strong className="text-slate-900 dark:text-zinc-200 font-black">{b.titular}</strong></span>
                          <button
                            onClick={() => copyToClipboard(b.documento, `quick-doc-${i}`)}
                            className="text-slate-900 dark:text-amber-300 font-mono text-[10px] font-bold bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-pointer shrink-0 ml-2 border border-slate-300 dark:border-transparent"
                            title="Copiar Documento"
                          >
                            {isCopiedDoc ? '¡Doc Copiado!' : `Doc: ${b.documento}`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 2. Tab Pago Móvil */}
              {selectedFichaTab === 'pagoMovil' && selectedProveedorFicha.pagoMovil && (
                <div className="space-y-2.5 animate-fade-in">
                  {selectedProveedorFicha.pagoMovil.map((pm, i) => {
                    const isCopiedAll = copiedFieldId === `quick-pm-${i}`;
                    const isCopiedTel = copiedFieldId === `quick-pm-tel-${i}`;
                    const isCopiedDoc = copiedFieldId === `quick-pm-doc-${i}`;
                    return (
                      <div key={i} className="p-3.5 bg-blue-100/80 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-500/20 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-blue-950 dark:text-blue-300 flex items-center gap-1.5">
                            <Smartphone size={14} className="text-blue-700 dark:text-blue-400" />
                            <span>{pm.banco}</span>
                          </span>
                          <button
                            onClick={() => {
                              copyToClipboard(formatCleanPagoMovil(pm), `quick-pm-${i}`);
                            }}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                          >
                            {isCopiedAll ? <Check size={12} className="text-white" /> : <Copy size={12} />}
                            <span>{isCopiedAll ? '¡Copiado Completo!' : 'Copiar Todo el PM'}</span>
                          </button>
                        </div>

                        {/* Campos individuales con botón de copiado 1-clic */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {/* Teléfono */}
                          <div className="bg-white dark:bg-black/50 p-2.5 rounded-xl border border-slate-300 dark:border-white/5 flex items-center justify-between gap-2 shadow-sm">
                            <div className="min-w-0">
                              <span className="text-[9px] uppercase font-black text-slate-600 dark:text-zinc-400 block">Teléfono</span>
                              <span className="font-mono text-blue-950 dark:text-blue-300 font-black text-xs">{pm.telefono}</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(pm.telefono, `quick-pm-tel-${i}`)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-zinc-300 text-[10px] font-black rounded-lg flex items-center gap-1 cursor-pointer transition-colors shrink-0 border border-slate-300 dark:border-transparent"
                              title="Copiar solo teléfono"
                            >
                              {isCopiedTel ? <Check size={11} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={11} />}
                              <span>{isCopiedTel ? '¡Listo!' : 'Copiar'}</span>
                            </button>
                          </div>

                          {/* Cédula / RIF */}
                          <div className="bg-white dark:bg-black/50 p-2.5 rounded-xl border border-slate-300 dark:border-white/5 flex items-center justify-between gap-2 shadow-sm">
                            <div className="min-w-0">
                              <span className="text-[9px] uppercase font-black text-slate-600 dark:text-zinc-400 block">C.I. / RIF</span>
                              <span className="font-mono text-slate-900 dark:text-white font-black text-xs">{pm.documento}</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(pm.documento, `quick-pm-doc-${i}`)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-zinc-300 text-[10px] font-black rounded-lg flex items-center gap-1 cursor-pointer transition-colors shrink-0 border border-slate-300 dark:border-transparent"
                              title="Copiar solo C.I. o RIF"
                            >
                              {isCopiedDoc ? <Check size={11} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={11} />}
                              <span>{isCopiedDoc ? '¡Listo!' : 'Copiar'}</span>
                            </button>
                          </div>
                        </div>

                        {pm.titular && (
                          <p className="text-[11px] text-slate-700 dark:text-zinc-400 font-bold truncate pt-0.5">
                            Titular: <strong className="text-slate-900 dark:text-zinc-200 font-black">{pm.titular}</strong>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. Tab Zelle */}
              {selectedFichaTab === 'zelle' && selectedProveedorFicha.zelle?.correoTelefono && (
                <div className="p-4 bg-emerald-100/80 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/20 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                      <DollarSign size={14} className="text-emerald-700 dark:text-emerald-400" />
                      <span>Zelle ($ USA)</span>
                    </span>
                    <button
                      onClick={() => copyToClipboard(selectedProveedorFicha.zelle!.correoTelefono, 'quick-zelle')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                    >
                      {copiedFieldId === 'quick-zelle' ? <Check size={12} className="text-white" /> : <Copy size={12} />}
                      <span>{copiedFieldId === 'quick-zelle' ? '¡Copiado!' : 'Copiar Correo'}</span>
                    </button>
                  </div>

                  <div className="bg-white dark:bg-black/50 p-2.5 rounded-xl border border-slate-300 dark:border-white/5 font-mono text-xs text-emerald-950 dark:text-emerald-400 font-black text-center select-all shadow-sm">
                    {selectedProveedorFicha.zelle.correoTelefono}
                  </div>

                  {selectedProveedorFicha.zelle.titular && (
                    <p className="text-[11px] text-slate-700 dark:text-zinc-400 font-bold text-center">
                      Titular: <strong className="text-slate-900 dark:text-zinc-200 font-black">{selectedProveedorFicha.zelle.titular}</strong>
                    </p>
                  )}
                </div>
              )}

              {/* 4. Tab Binance */}
              {selectedFichaTab === 'binance' && selectedProveedorFicha.binance?.payId && (
                <div className="p-4 bg-amber-100/80 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-500/20 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                      <Wallet size={14} className="text-amber-700 dark:text-amber-400" />
                      <span>Binance Pay (USDT)</span>
                    </span>
                    <button
                      onClick={() => copyToClipboard(selectedProveedorFicha.binance!.payId, 'quick-binance')}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-black rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                    >
                      {copiedFieldId === 'quick-binance' ? <Check size={12} className="text-black" /> : <Copy size={12} />}
                      <span>{copiedFieldId === 'quick-binance' ? '¡Copiado!' : 'Copiar Pay ID'}</span>
                    </button>
                  </div>

                  <div className="bg-white dark:bg-black/50 p-2.5 rounded-xl border border-slate-300 dark:border-white/5 font-mono text-xs text-amber-950 dark:text-amber-400 font-black text-center select-all shadow-sm">
                    Pay ID: {selectedProveedorFicha.binance.payId}
                  </div>

                  {selectedProveedorFicha.binance.correoBinance && (
                    <p className="text-[11px] text-slate-700 dark:text-zinc-400 font-bold text-center">
                      Correo Binance: <strong className="text-slate-900 dark:text-zinc-200 font-black">{selectedProveedorFicha.binance.correoBinance}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={() => copyFullProveedorPaymentInfo(selectedProveedorFicha)}
                className="flex-1 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-zinc-300 hover:text-black dark:hover:text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedFieldId === `full-${selectedProveedorFicha.id}` ? <Check size={13} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedFieldId === `full-${selectedProveedorFicha.id}` ? '¡Ficha Completa Copiada!' : 'Copiar Toda la Ficha'}</span>
              </button>

              {selectedProveedorFicha.telefono && (
                <a
                  href={`https://wa.me/${selectedProveedorFicha.telefono.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hola ${selectedProveedorFicha.contactoNombre || selectedProveedorFicha.nombreComercial}, un gusto saludarte. Te escribo de parte del Taller MasterTech para coordinar un pago / pedido de repuestos.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CITAS DE UN DÍA ESPECÍFICO SELECCIONADO */}
      {selectedCalendarDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" size={20} />
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-tight">
                    Citas Agendadas del Día
                  </h3>
                  <p className="text-xs font-bold text-amber-400 font-mono">{selectedCalendarDay}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCalendarDay(null)} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* List of appointments for that specific day */}
            <div className="space-y-2.5 text-xs">
              {(() => {
                const dayLeads = filteredLeads.filter(l => getLeadDateStr(l) === selectedCalendarDay);
                if (dayLeads.length === 0) {
                  return (
                    <div className="p-6 text-center text-zinc-400 text-xs italic bg-black/40 rounded-2xl border border-white/10">
                      No hay citas agendadas para esta fecha.
                    </div>
                  );
                }
                return dayLeads.map((l, idx) => {
                  const st = (l.status || 'Pendiente').toLowerCase();
                  const statusColor = 
                    st === 'confirmado' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                    st === 'contactado' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                    st === 'atendido' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                    st === 'cancelado' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                    'bg-amber-500/20 text-amber-300 border-amber-500/40';

                  return (
                    <div key={l.id || idx} className="p-3 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-amber-400 font-bold">{getLeadTimeStr(l)}</span>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${statusColor}`}>
                            {l.status || 'Pendiente'}
                          </span>
                        </div>
                        <div className="font-black text-white text-sm truncate">{l.nombre || 'Cliente'}</div>
                        <div className="text-zinc-300 text-xs truncate">🚗 {l.vehiculo || 'Vehículo no especificado'}</div>
                        <div className="text-primary text-[11px] font-bold truncate">🛠️ {l.servicio}</div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {l.telefono && (
                          <a
                            href={`https://wa.me/${l.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${l.nombre || ''}, te escribimos desde Taller MasterTech para confirmar tu cita agendada para el ${getLeadDateStr(l)} a las ${getLeadTimeStr(l)}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black transition-all cursor-pointer"
                            title="Chat por WhatsApp"
                          >
                            <WhatsAppIcon size={16} />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            setSelectedCalendarDay(null);
                            setSelectedDayCita(l);
                          }}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                          title="Ver / Editar Cita"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Action to add new appointment for this day */}
            <div className="pt-2 border-t border-white/10 flex justify-end gap-2">
              <button
                onClick={() => setSelectedCalendarDay(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white font-bold text-xs cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  const targetDay = selectedCalendarDay;
                  setSelectedCalendarDay(null);
                  setManualCitaData({
                    nombre: '',
                    telefono: '',
                    vehiculo: '',
                    fecha: targetDay,
                    hora: '09:00',
                    servicio: 'Inspección Diagnóstica 25 Puntos Gratuita',
                    notas: '',
                    status: 'Confirmado'
                  });
                  setManualCitaError('');
                  setIsManualCitaModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Plus size={15} />
                <span>Agendar Otra Cita para este Día</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AGENDAR CITA MANUAL */}
      {isManualCitaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" size={20} />
                <h3 className="text-base font-bold text-white uppercase tracking-tight">Agendar Cita Manual</h3>
              </div>
              <button onClick={() => setIsManualCitaModalOpen(false)} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {manualCitaError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{manualCitaError}</span>
              </div>
            )}

            <form onSubmit={handleSaveManualCita} className="space-y-4 text-xs">
              {/* Nombre Cliente */}
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Nombre del Cliente *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={manualCitaData.nombre}
                  onChange={(e) => setManualCitaData({ ...manualCitaData, nombre: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
              </div>

              {/* Teléfono y Vehículo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Número de Teléfono / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. +58 412 1234567"
                    value={manualCitaData.telefono}
                    onChange={(e) => setManualCitaData({ ...manualCitaData, telefono: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Vehículo (Marca, Modelo, Año)</label>
                  <input
                    type="text"
                    placeholder="Ej. Toyota Fortuner 2.7L 2018"
                    value={manualCitaData.vehiculo}
                    onChange={(e) => setManualCitaData({ ...manualCitaData, vehiculo: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Fecha y Hora Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Fecha de la Cita *</label>
                  <input
                    type="date"
                    required
                    value={manualCitaData.fecha}
                    onChange={(e) => setManualCitaData({ ...manualCitaData, fecha: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Hora de la Cita *</label>
                  <input
                    type="time"
                    required
                    value={manualCitaData.hora}
                    onChange={(e) => setManualCitaData({ ...manualCitaData, hora: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Servicio Requerido (Input de Texto Libre + Datalist de Sugerencias) */}
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Servicio / Motivo de Cita (Escribe o Selecciona)</label>
                <input
                  type="text"
                  list="servicios-preset-list"
                  placeholder="Ej. Inspección Diagnóstica, Revisión de Frenos, Cambio de Aceite..."
                  value={manualCitaData.servicio}
                  onChange={(e) => setManualCitaData({ ...manualCitaData, servicio: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
                <datalist id="servicios-preset-list">
                  <option value="Inspección Diagnóstica 25 Puntos Gratuita" />
                  <option value="Mecánica General & Mantenimiento Preventivo" />
                  <option value="Diagnóstico Electrónico & Ultrasonido Inyectores" />
                  <option value="Frenos, Amortiguadores & Suspensión" />
                  <option value="Climatización A/A (Carga Gas R134a)" />
                  <option value="Jornada Preventiva Especial VIP" />
                  <option value="Instalación de Repuestos Adquiridos" />
                </datalist>
              </div>

              {/* Estado y Nivel de Prioridad Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Estado Inicial de la Cita</label>
                  <select
                    value={manualCitaData.status}
                    onChange={(e) => setManualCitaData({ ...manualCitaData, status: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Contactado">Contactado</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Nivel de Prioridad *</label>
                  <select
                    value={manualCitaData.prioridad || 'media'}
                    onChange={(e) => setManualCitaData({ ...manualCitaData, prioridad: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="alta">🔴 Alta Prioridad (Urgente)</option>
                    <option value="media">🟡 Prioridad Media (Normal)</option>
                    <option value="baja">🟢 Prioridad Baja (Rutina)</option>
                  </select>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Notas u Observaciones Adicionales</label>
                <textarea
                  rows={2}
                  placeholder="Ej. Trae repuesto propio / Solicita revisión adicional..."
                  value={manualCitaData.notas}
                  onChange={(e) => setManualCitaData({ ...manualCitaData, notas: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-primary"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsManualCitaModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingManualCita}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-amber-400 text-black font-black flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  {isSavingManualCita ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>Guardar Cita</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETALLE DE CITA SELECCIONADA DESDE CALENDARIO */}
      {selectedDayCita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" size={20} />
                <h3 className="text-base font-bold text-white uppercase tracking-tight">Detalle de la Cita</h3>
              </div>
              <button onClick={() => setSelectedDayCita(null)} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-black/40 border border-white/10 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-black text-zinc-400">Cliente</span>
                  <div className="flex items-center gap-1.5">
                    {(selectedDayCita.prioridad === 'alta' || String(selectedDayCita.falla || '').includes('[Prioridad: alta]')) && (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md border bg-red-500/20 text-red-300 border-red-500/40 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                        🔴 Prioridad Alta
                      </span>
                    )}
                    {(selectedDayCita.prioridad === 'baja' || String(selectedDayCita.falla || '').includes('[Prioridad: baja]')) && (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md border bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                        🟢 Prioridad Baja
                      </span>
                    )}
                    {(!selectedDayCita.prioridad || selectedDayCita.prioridad === 'media' || String(selectedDayCita.falla || '').includes('[Prioridad: media]')) && (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md border bg-amber-500/20 text-amber-300 border-amber-500/40">
                        🟡 Prioridad Media
                      </span>
                    )}
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
                      selectedDayCita.status === 'Confirmado' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                      selectedDayCita.status === 'Contactado' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                      selectedDayCita.status === 'Atendido' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                      selectedDayCita.status === 'Cancelado' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                      'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {selectedDayCita.status || 'Pendiente'}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-black text-white">{selectedDayCita.nombre || 'Sin nombre'}</div>
                <div className="font-mono text-zinc-300 font-bold flex items-center gap-1.5">
                  <Phone size={13} className="text-primary" />
                  <span>{selectedDayCita.telefono || 'Sin teléfono'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                  <span className="text-[9px] uppercase font-black text-zinc-400 block mb-0.5">Vehículo</span>
                  <span className="font-bold text-white block truncate">{selectedDayCita.vehiculo || 'No especificado'}</span>
                </div>

                <div className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                  <span className="text-[9px] uppercase font-black text-zinc-400 block mb-0.5">Fecha y Hora</span>
                  <span className="font-mono font-bold text-amber-400 block truncate">
                    {getLeadDateStr(selectedDayCita)} {getLeadTimeStr(selectedDayCita)}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                <span className="text-[9px] uppercase font-black text-zinc-400 block mb-0.5">Servicio Requerido</span>
                <span className="font-black text-primary block">{selectedDayCita.servicio || 'Servicio General'}</span>
              </div>

              {(() => {
                const notes = cleanFallaNotes(selectedDayCita.falla);
                if (!notes) return null;
                return (
                  <div className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                    <span className="text-[9px] uppercase font-black text-zinc-400 block mb-0.5">Notas / Detalles</span>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">{notes}</p>
                  </div>
                );
              })()}

              {/* Cambiar Estado Rápido */}
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Cambiar Estado</label>
                <select
                  value={selectedDayCita.status || 'Pendiente'}
                  onChange={async (e) => {
                    const newSt = e.target.value;
                    setSelectedDayCita({ ...selectedDayCita, status: newSt });
                    await handleUpdateLeadStatus(selectedDayCita.id, newSt);
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-white font-bold outline-none focus:border-primary cursor-pointer"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Contactado">Contactado</option>
                  <option value="Entrevistado">Entrevistado</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Atendido">Atendido</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              {selectedDayCita.telefono && (
                <a
                  href={`https://wa.me/${selectedDayCita.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${selectedDayCita.nombre || ''}, te escribimos desde Taller MasterTech para confirmar tu cita agendada para el ${getLeadDateStr(selectedDayCita)} a las ${getLeadTimeStr(selectedDayCita)}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg cursor-pointer"
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp</span>
                </a>
              )}

              <button
                onClick={() => {
                  const id = selectedDayCita.id;
                  setSelectedDayCita(null);
                  handleDeleteLead(id);
                }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
                title="Eliminar Cita"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL GESTOR DE RECORDATORIOS Y TAREAS */}
      {isReminderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12141a] border border-white/20 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <BellRing className="text-amber-400" size={22} />
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-tight">Recordatorios & Tareas Pendientes</h3>
                  <p className="text-xs text-zinc-400">Seguimiento a clientes, repuestos y alertas operativas del taller.</p>
                </div>
              </div>
              <button onClick={() => setIsReminderModalOpen(false)} className="text-zinc-400 hover:text-white p-1 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Formulario Crear Nuevo Recordatorio */}
            <form onSubmit={handleAddReminder} className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-amber-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Plus size={14} />
                  <span>Crear Nuevo Recordatorio</span>
                </span>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Ej. Llamar a Juan Pérez para confirmar repuestos / Recordar cita..."
                  value={newReminderData.titulo}
                  onChange={(e) => setNewReminderData({ ...newReminderData, titulo: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-amber-400 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-400 font-bold block mb-1">Fecha Alerta</label>
                  <input
                    type="date"
                    required
                    value={newReminderData.fecha}
                    onChange={(e) => setNewReminderData({ ...newReminderData, fecha: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-white outline-none focus:border-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 font-bold block mb-1">Hora Alerta</label>
                  <input
                    type="time"
                    required
                    value={newReminderData.hora}
                    onChange={(e) => setNewReminderData({ ...newReminderData, hora: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-white outline-none focus:border-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 font-bold block mb-1">Prioridad</label>
                  <select
                    value={newReminderData.prioridad}
                    onChange={(e) => setNewReminderData({ ...newReminderData, prioridad: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-white outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="alta">🔴 Alta Prioridad</option>
                    <option value="media">🟡 Prioridad Media</option>
                    <option value="baja">🔵 Prioridad Baja</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Nombre Cliente (Opcional)"
                  value={newReminderData.clienteNombre}
                  onChange={(e) => setNewReminderData({ ...newReminderData, clienteNombre: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-white outline-none focus:border-amber-400"
                />

                <input
                  type="text"
                  placeholder="Teléfono / WhatsApp (Opcional)"
                  value={newReminderData.clienteTelefono}
                  onChange={(e) => setNewReminderData({ ...newReminderData, clienteTelefono: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-white outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <Plus size={15} />
                  <span>Guardar Recordatorio</span>
                </button>
              </div>
            </form>

            {/* Filter Tabs for Reminders */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 overflow-x-auto scrollbar-thin">
              <div className="flex items-center gap-1.5 shrink-0">
                {(() => {
                  const count3Days = leads.filter(l => getDaysUntilDate(getLeadDateStr(l)) === 3 && l.status !== 'Cancelado' && l.status !== 'Atendido').length;
                  const count1Day = leads.filter(l => getDaysUntilDate(getLeadDateStr(l)) === 1 && l.status !== 'Cancelado' && l.status !== 'Atendido').length;

                  return (['PENDIENTES', 'HOY', '3_DIAS', '1_DIA', 'COMPLETADOS', 'TODOS'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setReminderFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        reminderFilter === tab
                          ? 'bg-amber-500 text-black font-black shadow-md'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {tab === 'PENDIENTES' ? `Pendientes (${reminders.filter(r => !r.completado).length})` :
                       tab === 'HOY' ? `Hoy (${reminders.filter(r => r.fecha === new Date().toISOString().split('T')[0]).length})` :
                       tab === '3_DIAS' ? `📢 3 Días Antes (${count3Days})` :
                       tab === '1_DIA' ? `⏰ 1 Día Antes (${count1Day})` :
                       tab === 'COMPLETADOS' ? `Completados (${reminders.filter(r => r.completado).length})` :
                       `Todos (${reminders.length})`}
                    </button>
                  ));
                })()}
              </div>
            </div>

            {/* List of Reminders / Automatic Lead Reminders */}
            <div className="space-y-2 text-xs">
              {(() => {
                const todayStr = new Date().toISOString().split('T')[0];

                if (reminderFilter === '3_DIAS' || reminderFilter === '1_DIA') {
                  const targetDays = reminderFilter === '3_DIAS' ? 3 : 1;
                  const autoLeads = leads.filter(l => getDaysUntilDate(getLeadDateStr(l)) === targetDays && l.status !== 'Cancelado' && l.status !== 'Atendido');

                  if (autoLeads.length === 0) {
                    return (
                      <div className="p-8 text-center text-zinc-400 text-xs italic bg-black/30 rounded-2xl border border-white/10">
                        No hay citas agendadas para dentro de {targetDays} {targetDays === 1 ? 'día (Mañana)' : 'días'}.
                      </div>
                    );
                  }

                  return autoLeads.map((l, idx) => {
                    const leadDate = getLeadDateStr(l);
                    const leadTime = getLeadTimeStr(l);
                    const whatsappMsg = targetDays === 3
                      ? `Hola ${l.nombre || ''}, te saludamos desde Taller MasterTech. Te recordamos que tienes tu cita agendada en 3 días (el ${leadDate} a las ${leadTime}) para tu vehículo ${l.vehiculo || ''} (${l.servicio}). Por favor confírmanos si estás listo. ¡Feliz día!`
                      : `Hola ${l.nombre || ''}, te recordamos que MAÑANA es tu cita en Taller MasterTech a las ${leadTime} para tu vehículo ${l.vehiculo || ''} (${l.servicio}). Por favor confírmanos tu asistencia. ¡Te esperamos!`;

                    return (
                      <div key={l.id || idx} className="p-3 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-between gap-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-amber-400 font-bold">{leadTime}</span>
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-md border bg-amber-500/20 text-amber-300 border-amber-500/40">
                              {targetDays === 3 ? '📢 Faltan 3 Días' : '⏰ MAÑANA (1 Día)'}
                            </span>
                          </div>
                          <div className="font-black text-white text-sm truncate">{l.nombre || 'Cliente'}</div>
                          <div className="text-zinc-300 text-xs truncate">🚗 {l.vehiculo || 'Vehículo no especificado'}</div>
                          <div className="text-primary text-[11px] font-bold truncate">🛠️ {l.servicio}</div>
                        </div>

                        {l.telefono && (
                          <a
                            href={`https://wa.me/${l.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
                          >
                            <WhatsAppIcon size={15} />
                            <span>Recordatorio WA ({targetDays === 3 ? '3 Días' : '1 Día'})</span>
                          </a>
                        )}
                      </div>
                    );
                  });
                }

                const list = reminders.filter(r => {
                  if (reminderFilter === 'PENDIENTES') return !r.completado;
                  if (reminderFilter === 'HOY') return r.fecha === todayStr;
                  if (reminderFilter === 'COMPLETADOS') return r.completado;
                  return true;
                });

                if (list.length === 0) {
                  return (
                    <div className="p-8 text-center text-zinc-400 text-xs italic bg-black/30 rounded-2xl border border-white/10">
                      No hay recordatorios en esta categoría.
                    </div>
                  );
                }

                return list.map(r => (
                  <div
                    key={r.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      r.completado
                        ? 'bg-black/20 border-white/5 opacity-50 line-through'
                        : r.prioridad === 'alta'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-black/40 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={r.completado}
                        onChange={() => handleToggleReminder(r.id)}
                        className="w-4.5 h-4.5 rounded border-white/20 bg-black/40 text-amber-400 focus:ring-amber-400 cursor-pointer shrink-0"
                      />

                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${
                            r.prioridad === 'alta' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                            r.prioridad === 'media' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {r.prioridad}
                          </span>

                          <span className="font-mono text-[11px] text-amber-400 font-bold">
                            📅 {r.fecha} {r.hora ? `⏰ ${r.hora}` : ''}
                          </span>
                        </div>

                        <div className="font-bold text-white text-xs leading-snug">{r.titulo}</div>

                        {r.clienteNombre && (
                          <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                            <span>👤 {r.clienteNombre}</span>
                            {r.clienteTelefono && <span className="font-mono">📞 {r.clienteTelefono}</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {r.clienteTelefono && (
                        <a
                          href={`https://wa.me/${r.clienteTelefono.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${r.clienteNombre || ''}, te escribimos de Taller MasterTech: ${r.titulo}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black transition-all cursor-pointer"
                          title="Contactar vía WhatsApp"
                        >
                          <WhatsAppIcon size={15} />
                        </a>
                      )}

                      <button
                        onClick={() => handleDeleteReminder(r.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
                        title="Eliminar Recordatorio"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING HOVER POPOVER CARD FOR CALENDAR APPOINTMENTS */}
      {hoveredCitaInfo && (
        <div
          style={{
            position: 'fixed',
            top: `${Math.max(12, hoveredCitaInfo.rect.top - 180)}px`,
            left: `${Math.min(window.innerWidth - 270, Math.max(12, hoveredCitaInfo.rect.left + hoveredCitaInfo.rect.width / 2 - 130))}px`,
          }}
          className="z-[9999] w-64 p-3.5 bg-[#12141a]/95 border border-amber-500/40 rounded-2xl shadow-2xl text-xs text-white pointer-events-none backdrop-blur-xl space-y-2 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5 font-mono text-amber-400 font-bold text-xs">
              <Clock size={14} className="text-amber-400 shrink-0" />
              <span>{getLeadTimeStr(hoveredCitaInfo.cita)}</span>
            </div>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
              (hoveredCitaInfo.cita.prioridad === 'alta' || String(hoveredCitaInfo.cita.falla || '').toLowerCase().includes('[prioridad: alta]'))
                ? 'bg-red-500/20 text-red-300 border-red-500/40'
                : (hoveredCitaInfo.cita.prioridad === 'baja' || String(hoveredCitaInfo.cita.falla || '').toLowerCase().includes('[prioridad: baja]'))
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {(hoveredCitaInfo.cita.prioridad === 'alta' || String(hoveredCitaInfo.cita.falla || '').toLowerCase().includes('[prioridad: alta]')) ? 'Prioridad Alta'
                : (hoveredCitaInfo.cita.prioridad === 'baja' || String(hoveredCitaInfo.cita.falla || '').toLowerCase().includes('[prioridad: baja]')) ? 'Prioridad Baja'
                : 'Prioridad Media'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-white font-bold text-xs">
            <User size={14} className="text-amber-400 shrink-0" />
            <span className="truncate">{formatName(hoveredCitaInfo.cita.nombre)}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
            <Car size={14} className="text-zinc-400 shrink-0" />
            <span className="truncate">{hoveredCitaInfo.cita.vehiculo || 'No especificado'}</span>
          </div>

          <div className="flex items-start gap-2 text-zinc-300 text-[11px]">
            <Wrench size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <span className="truncate leading-snug">{hoveredCitaInfo.cita.servicio}</span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1.5 border-t border-white/10 mt-1">
            <div className="flex items-center gap-1 font-semibold">
              <Tag size={12} className="text-zinc-500 shrink-0" />
              <span>Estado: {hoveredCitaInfo.cita.status || 'Pendiente'}</span>
            </div>
            <span className="text-amber-400 font-bold text-[10px]">Haz clic para ver más</span>
          </div>
        </div>
      )}
    </div>
  );
}

