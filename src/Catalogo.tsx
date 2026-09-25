import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './Navbar';
import { ChevronLeft, Search, Tag, Filter, CheckCircle2, Check, ShieldCheck, ArrowRight, ExternalLink, Package, X, Wrench, Plane, Send, Car, User, MapPin, ShoppingCart, Plus, Minus, Trash2, ShoppingBag, ZoomIn, Disc, Zap, Droplets, Sparkles, Layers, Flame, Gauge, Copy, CheckCheck, SlidersHorizontal, ArrowUpDown, RotateCcw, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrechaCambiariaPanel from './components/BrechaCambiariaPanel';
import { fetchSettingsWithTTL } from './utils/settingsCache';

const CONFIG_DEFAULT = {
  PHONE_NUMBER: "+584123565012",
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
  INSTAGRAM_LINK: "https://www.instagram.com/tallermastertech/",
  TIKTOK_LINK: "https://www.tiktok.com/@tallermastertech",
};

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
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
  img: string;
  images?: string[];
  badge?: string;
  specs?: string[];
  compatibility?: string;
  partNumber?: string;
  stock?: number;
  isImportedUSA?: boolean;
}

const DEFAULT_CATALOG: CatalogItem[] = [
  // 1. Frenos & Discos
  {
    id: 1,
    title: "Kit de Discos Ranurados Ventilados & Cálispers Brembo 4-Pistones",
    category: "Frenos & Discos",
    price: "$185.00",
    desc: "Discos ventilados de alto rendimiento térmico con pinzas Brembo de 4 pistones para frenadas precisas.",
    longDesc: "Ensamble Brembo Performance: disco ranurado ventilado con disipación térmica y pinza de 4 pistones para frenadas estables y sin fatiga.",
    img: "/assets/cat_frenos_discos.webp",
    badge: "Brembo Racing",
    specs: ["Cáliper 4 pistones alto torque", "Disco ranurado térmico Brembo", "Ensamble directo Plug & Play"],
    compatibility: "Vehículos deportivos y SUVs seleccionadas",
    partNumber: "BRM-STR-4P-GT",
    stock: 4,
    isImportedUSA: true
  },
  {
    id: 2,
    title: "Pastillas de Freno Cerámicas Wagner / Raybestos (Juego Delantero)",
    category: "Frenos & Discos",
    price: "$55.00",
    desc: "Pastillas cerámicas de formulación silenciosa, mínima emisión de polvo y óptima fricción térmica.",
    longDesc: "Fórmula de fricción cerámica de grado OEM: previene chirridos metálicos y prolonga la vida útil de los discos de freno.",
    img: "/assets/promo_brakes_caliper.webp",
    badge: "Wagner / OEM",
    specs: ["Compuesto 100% cerámico", "Libre de polvo metálico", "Resistencia superior a 650°C"],
    compatibility: "Vehículos Japoneses, Americanos y Coreanos",
    partNumber: "WAG-QC-CER-88",
    stock: 12,
    isImportedUSA: true
  },

  // 2. Suspensión & Amortiguadores
  {
    id: 3,
    title: "Juego de Amortiguadores Heavy Duty Monroe / KYB Gas-Magnum (Par)",
    category: "Suspensión & Amortiguadores",
    price: "$120.00",
    desc: "Amortiguadores presurizados con nitrógeno y tecnología multirrango para máxima estabilidad en vía.",
    longDesc: "Línea Heavy Duty a gas: control superior de oscilación y rebote en baches y asfalto exigente.",
    img: "/assets/cat_suspension_amortiguadores.webp",
    badge: "Monroe / KYB",
    specs: ["Doble tubo presurizado a nitrógeno", "Certificación internacional OEM", "Vástago de acero microcromado"],
    compatibility: "Jeep, Toyota, Ford, Chevrolet, Dodge",
    partNumber: "MNR-GAS-HD-202",
    stock: 8,
    isImportedUSA: true
  },
  {
    id: 4,
    title: "Coilover Deportivo Pro con Muelle Helicoidal Regulable",
    category: "Suspensión & Amortiguadores",
    price: "$95.00",
    desc: "Amortiguador deportivo con muelle helicoidal y válvula de control de rebote para camionetas y sedanes.",
    longDesc: "Ingeniería Pro Suspension: respuesta inmediata de estabilidad con mínima oscilación en curvas y frenadas bruscas.",
    img: "/assets/promo_suspension_spring.webp",
    badge: "Bilstein / Pro",
    specs: ["Muelle helicoidal reforzado", "Vástago cromado de baja fricción", "Ajuste de altura milimétrico"],
    compatibility: "Vehículos livianos y sedanes",
    partNumber: "BLS-SP-COIL-90",
    stock: 6,
    isImportedUSA: true
  },

  // 3. Aceites & Lubricantes
  {
    id: 5,
    title: "Kit Aceite 100% Sintético 5W-30 (Mopar / Motul / Mobil 1) + Filtro OEM",
    category: "Aceites & Lubricantes",
    price: "$45.00",
    desc: "Aceite sintético con aditivos antidesgaste de última generación API SP y filtro de aceite genuino.",
    longDesc: "Protección térmica total: reduce el rozamiento térmico en motores modernos con tecnología VVT / Turbo y protege en frío.",
    img: "/assets/cat_aceites_lubricantes.webp",
    badge: "Mopar / Motul",
    specs: ["Certificación API SP / ILSAC GF-6A", "Incluye filtro de aceite de alta eficiencia", "Soporta altas temperaturas y tráfico pesado"],
    compatibility: "Jeep, Toyota, Honda, Nissan, Dodge, Lexus, Hyundai",
    partNumber: "MPR-5W30-SYN-KT",
    stock: 20,
    isImportedUSA: true
  },
  {
    id: 6,
    title: "Fluido Sintético de Transmisión Automática ATF+4 / Dexron VI (Galón)",
    category: "Aceites & Lubricantes",
    price: "$38.00",
    desc: "Fluido de transmisión de alta estabilidad térmica para cajas automáticas secuenciales y transmisiones modernas.",
    longDesc: "Protección contra fricción y deslizamiento en cambios de marcha continuos bajo climas cálidos.",
    img: "/assets/cat_aceites_lubricantes.webp",
    badge: "Mopar / Valvoline",
    specs: ["Compatible ATF+4 / Dexron VI / Mercon LV", "Protección antidesgaste para embragues", "Alta resistencia a la oxidación"],
    compatibility: "Transmisiones automáticas multimarca",
    partNumber: "MPR-ATF4-SYN-GL",
    stock: 14,
    isImportedUSA: true
  },

  // 4. Baterías & Electricidad
  {
    id: 7,
    title: "Batería Sellada Libre de Mantenimiento Duncan / ACDelco 700A",
    category: "Baterías & Electricidad",
    price: "$85.00",
    desc: "Batería de aleación plata-calcio de alta resistencia diseñada para arranque instantáneo y clima tropical.",
    longDesc: "Potencia de arranque garantizada: placas reforzadas resistentes a vibraciones y alta temperatura.",
    img: "/assets/cat_baterias_electricidad.webp",
    badge: "Duncan / ACDelco",
    specs: ["Sellada 100% libre de mantenimiento", "Alta capacidad de arranque en frío (CCA)", "Garantía de respaldo técnico en taller"],
    compatibility: "Universal 12V vehículos livianos y camionetas",
    partNumber: "DNC-700A-MF-12V",
    stock: 15,
    isImportedUSA: false
  },
  {
    id: 8,
    title: "Alternador Reforzado de Alto Rendimiento 140A Denso / Bosch",
    category: "Baterías & Electricidad",
    price: "$165.00",
    desc: "Alternador con bobinado de cobre de alta pureza y regulador interno para alta demanda eléctrica.",
    longDesc: "Alimentación eléctrica continua y estable para sistemas de climatización, audio e iluminación auxiliar.",
    img: "/assets/cat_baterias_electricidad.webp",
    badge: "Denso / Bosch",
    specs: ["Salida nominal 140 Amperios 12V", "Bobinado de cobre de máxima pureza", "Regulador electrónico de voltaje integrado"],
    compatibility: "Camionetas, SUVs y sistemas con accesorios",
    partNumber: "DNS-ALT-140A-HD",
    stock: 5,
    isImportedUSA: true
  },

  // 5. Filtros & Consumibles
  {
    id: 9,
    title: "Filtro de Aire Cónico de Alto Flujo K&N / Intake Performance",
    category: "Filtros & Consumibles",
    price: "$42.00",
    desc: "Filtro de aire cónico de algodón plisado lavable y reutilizable para mayor flujo de admisión.",
    longDesc: "Maximiza la respuesta de aceleración protegiendo las cámaras de combustión contra micropartículas.",
    img: "/assets/cat_filtros_oem.webp",
    badge: "K&N Performance",
    specs: ["Malla de algodón multicapa lavable", "Cuello universal adaptable de 3 pulgadas", "Incremento de flujo de aire"],
    compatibility: "Sistemas de inducción directa y tomas universales",
    partNumber: "KN-CONE-AIR-3IN",
    stock: 18,
    isImportedUSA: true
  },
  {
    id: 10,
    title: "Kit de Microfiltros y Sellos Vitón para Inyectores OEM",
    category: "Filtros & Consumibles",
    price: "$35.00",
    desc: "Kit de microfiltros de alta retención y sellos vitón resistentes a gasolina para inyección electrónica.",
    longDesc: "Mantenimiento preventivo para inyectores: asegura pulverización uniforme y previene fugas de combustible.",
    img: "/assets/cat_filtros_oem.webp",
    badge: "Bosch / Denso OEM",
    specs: ["Sellos Vitón de alta presión y temperatura", "Microfiltros de micromalla metálica", "Estanqueidad 100% garantizada"],
    compatibility: "Inyectores Bosch, Denso, Delphi, Magneti Marelli",
    partNumber: "INJ-KIT-OEM-VITON",
    stock: 25,
    isImportedUSA: true
  },

  // 6. Fluidos & Climatización
  {
    id: 11,
    title: "Garrafa Gas Refrigerante R134a Chemours + Aceite Sintético PAG",
    category: "Fluidos & Climatización",
    price: "$48.00",
    desc: "Refrigerante puro R134a de grado automotriz con lubricante sintético PAG para compresores de aire acondicionado.",
    longDesc: "Restaura la presión y la capacidad de enfriamiento óptima del sistema de aire acondicionado del vehículo.",
    img: "/assets/cat_climatizacion.webp",
    badge: "Chemours R134a",
    specs: ["Gas refrigerante puro R134a", "Aceite sintético PAG ISO 46/100", "Compatible con detector UV antifugas"],
    compatibility: "Sistemas de aire acondicionado automotriz R134a",
    partNumber: "CHM-R134A-PAG-KT",
    stock: 16,
    isImportedUSA: true
  },
  {
    id: 12,
    title: "Refrigerante / Anticongelante Orgánico 50/50 Long Life (Galón)",
    category: "Fluidos & Climatización",
    price: "$22.00",
    desc: "Coolant prediluido con tecnología de ácidos orgánicos (OAT) para protección contra sobrecalentamiento.",
    longDesc: "Protección térmica contra cavitación y corrosión galvánica en radiadores y bloques de aluminio.",
    img: "/assets/cat_climatizacion.webp",
    badge: "Prestone / Mopar",
    specs: ["Fórmula 50/50 lista para usar", "Tecnología OAT de larga duración", "Punto de ebullición elevado"],
    compatibility: "Todos los radiadores y motores gasolina/diésel",
    partNumber: "PRS-COOL-5050-OAT",
    stock: 30,
    isImportedUSA: true
  },

  // 7. Inyección & Motor
  {
    id: 13,
    title: "Turbocargador Garrett / BorgWarner Twin Scroll OEM",
    category: "Inyección & Motor",
    price: "$340.00",
    desc: "Turbocargador de geometría de precisión con rodamientos reforzados para motores sobrealimentados.",
    longDesc: "Presión de sobrealimentación estable y balanceado dinámico para máxima durabilidad en exigencia.",
    img: "/assets/promo_turbo_charger.webp",
    badge: "Garrett OEM",
    specs: ["Carcasa Twin Scroll de alta resistencia", "Rodamientos de precisión", "Líneas de refrigeración y lubricación"],
    compatibility: "Motores gasolina y diésel turboalimentados",
    partNumber: "GRT-TWIN-SC-OEM",
    stock: 3,
    isImportedUSA: true
  },
  {
    id: 14,
    title: "Juego de Inyectores de Combustible Multi-Punto Bosch / Denso (Set x4)",
    category: "Inyección & Motor",
    price: "$90.00",
    desc: "Inyectores originales de respuesta rápida con pulverización balanceada para óptima combustión.",
    longDesc: "Caudal equilibrado y pulverización atomizada que reducen emisiones y optimizan el consumo de combustible.",
    img: "/assets/promo_turbo_charger.webp",
    badge: "Bosch / Denso",
    specs: ["Pulverización multi-orificio", "Caudal balanceado de fábrica", "Conectores estándar OEM"],
    compatibility: "Motores 4 y 6 cilindros",
    partNumber: "BSH-INJ-FLOW-4X",
    stock: 9,
    isImportedUSA: true
  },

  // 8. Cuidado & Detailing
  {
    id: 15,
    title: "Cera Cerámica Hidrofóbica SiO2 Meguiar's / 3M Professional",
    category: "Cuidado & Detailing",
    price: "$38.00",
    desc: "Sellador cerámico con nanopartículas de SiO2 que ofrece protección repelente y brillo profundo.",
    longDesc: "Capa protectora contra rayos UV, salitre de la isla, lluvia ácida y polvo con efecto hidrofóbico.",
    img: "/assets/cat_cuidado_estetica.webp",
    badge: "Meguiar's Pro",
    specs: ["Fórmula avanzada SiO2", "Brillo profundo efecto cristalino", "Protección contra salitre costero"],
    compatibility: "Pinturas automotrices, vidrios y faros",
    partNumber: "MEG-CERAMIC-500",
    stock: 22,
    isImportedUSA: true
  },
  {
    id: 16,
    title: "Champú de Espuma Activa PH Neutro Snow Foam + Toallas Microfibra",
    category: "Cuidado & Detailing",
    price: "$25.00",
    desc: "Champú concentrado para espumadora que remueve contaminantes sin dañar el barniz ni ceras previas.",
    longDesc: "Lavado seguro y anti-rayas: encapsula partículas de suciedad facilitando el enjuague.",
    img: "/assets/cat_cuidado_estetica.webp",
    badge: "Pro Care",
    specs: ["PH neutro seguro para pinturas", "Espuma densa de alta adherencia", "Incluye 2 toallas de microfibra de alto gramaje"],
    compatibility: "Todo tipo de carrocerías y acabados mate o brillante",
    partNumber: "PRO-SNOW-FOAM-1L",
    stock: 28,
    isImportedUSA: true
  }
];

const CATEGORIES = [
  "Todos",
  "Frenos & Discos",
  "Suspensión & Amortiguadores",
  "Aceites & Lubricantes",
  "Baterías & Electricidad",
  "Filtros & Consumibles",
  "Fluidos & Climatización",
  "Inyección & Motor",
  "Cuidado & Detailing"
];

export const OEM_BRANDS = [
  { name: "Todas", label: "Todas las Marcas", badge: "Catálogo Completo" },
  { name: "Brembo", label: "Brembo", origin: "Italia · Frenos", color: "from-red-600 to-rose-700" },
  { name: "Mopar", label: "Mopar", origin: "USA · Original OEM", color: "from-blue-600 to-indigo-700" },
  { name: "Wagner", label: "Wagner", origin: "USA · Cerámica", color: "from-amber-600 to-yellow-700" },
  { name: "Monroe", label: "Monroe", origin: "USA · Amortiguadores", color: "from-yellow-600 to-amber-700" },
  { name: "KYB", label: "KYB", origin: "Japón · Suspensión", color: "from-red-500 to-orange-600" },
  { name: "Motul", label: "Motul", origin: "Francia · Lubricantes", color: "from-red-600 to-red-800" },
  { name: "Mobil 1", label: "Mobil 1", origin: "USA · Sintético", color: "from-blue-700 to-sky-700" },
  { name: "Duncan", label: "Duncan", origin: "Líder VE · Baterías", color: "from-emerald-600 to-teal-700" },
  { name: "ACDelco", label: "ACDelco", origin: "GM Original · Baterías", color: "from-blue-600 to-cyan-700" },
  { name: "Denso", label: "Denso", origin: "Japón · Alternadores", color: "from-red-700 to-rose-800" },
  { name: "Bosch", label: "Bosch", origin: "Alemania · Inyección", color: "from-blue-800 to-slate-800" },
  { name: "K&N", label: "K&N", origin: "USA · Filtros Flujo", color: "from-orange-600 to-red-700" },
  { name: "Chemours", label: "Chemours", origin: "USA · Gas R134a", color: "from-cyan-600 to-blue-700" },
  { name: "Prestone", label: "Prestone", origin: "USA · Coolant OAT", color: "from-yellow-500 to-amber-600" },
  { name: "Garrett", label: "Garrett", origin: "USA · Turbo OEM", color: "from-slate-700 to-slate-900" },
  { name: "Meguiar's", label: "Meguiar's", origin: "USA · Detailing", color: "from-purple-600 to-indigo-800" }
];

export const VEHICLE_MODELS = [
  { name: "Todos", label: "Todos los Vehículos" },
  { name: "Jeep", label: "Jeep (Wrangler / Cherokee)", icon: "🚙" },
  { name: "Toyota", label: "Toyota (Hilux / Fortuner)", icon: "🚗" },
  { name: "Ford", label: "Ford (Explorer / F-150)", icon: "🛻" },
  { name: "Chevrolet", label: "Chevrolet (Tahoe / Silverado)", icon: "🏎️" },
  { name: "Dodge", label: "Dodge / RAM", icon: "🚘" },
  { name: "Honda", label: "Honda", icon: "🚙" },
  { name: "Nissan", label: "Nissan", icon: "🚗" }
];

export interface CartItem {
  product: CatalogItem;
  quantity: number;
}

export default function Catalogo() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(DEFAULT_CATALOG);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedBrand, setSelectedBrand] = useState<string>("Todas");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("Todos");
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'stock' | 'usa'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [copiedPartId, setCopiedPartId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleCopyPart = (id: number, partNumber: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!partNumber) return;
    try {
      navigator.clipboard.writeText(partNumber);
      setCopiedPartId(id);
      setTimeout(() => setCopiedPartId(null), 2000);
    } catch (err) {}
  };

  const resetAllFilters = () => {
    setSelectedCategory("Todos");
    setSelectedBrand("Todas");
    setSelectedVehicle("Todos");
    setAvailabilityFilter("all");
    setSortBy("featured");
    setSearchQuery("");
  };

  // USA Import Order Form Modal State
  const [isUsaModalOpen, setIsUsaModalOpen] = useState(false);
  const [usaForm, setUsaForm] = useState({
    partNumber: '',
    productName: '',
    brand: '',
    model: '',
    year: '',
    engine: '',
    vin: '',
    clientName: '',
    phone: '',
    location: 'Porlamar, Isla de Margarita',
    shippingMode: 'Express Aéreo (7 a 15 días hábiles)',
    notes: ''
  });
  const [isSubmittingUsa, setIsSubmittingUsa] = useState(false);
  const [usaFormSubmitted, setUsaFormSubmitted] = useState(false);

  // Interactive Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mastertech_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartClient, setCartClient] = useState({
    name: '',
    phone: '',
    vehicle: '',
    location: '',
    notes: ''
  });
  const [isSubmittingCart, setIsSubmittingCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  // Perfected Cart Animations State
  interface FlyingItem {
    id: string;
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    img: string;
  }
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [cartBump, setCartBump] = useState(0);
  const [toastItem, setToastItem] = useState<CatalogItem | null>(null);

  useEffect(() => {
    if (!toastItem) return;
    const timer = setTimeout(() => {
      setToastItem(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toastItem]);

  useEffect(() => {
    try {
      localStorage.setItem('mastertech_cart_items', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const addToCart = (product: CatalogItem, qty: number = 1, event?: React.MouseEvent) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, quantity: qty }];
    });

    // Toast flotante elegante
    setToastItem(product);

    // Esfera / Miniatura fluida hacia el carrito
    const startX = event ? event.clientX : window.innerWidth / 2;
    const startY = event ? event.clientY : window.innerHeight / 2;
    const targetX = Math.max(window.innerWidth - 90, 80);
    const targetY = Math.max(window.innerHeight - 60, 80);
    const flyId = `fly-${Date.now()}-${Math.random()}`;

    setFlyingItems(prev => [...prev, {
      id: flyId,
      startX,
      startY,
      targetX,
      targetY,
      img: product.img || '/assets/cat_frenos_discos.webp'
    }]);

    // Justo al aterrizar en el carrito (550ms), rebota el carrito y emite la onda dorada
    setTimeout(() => {
      setFlyingItems(prev => prev.filter(f => f.id !== flyId));
      setCartBump(prev => prev + 1);
    }, 550);
  };

  const updateCartQty = (productId: number, delta: number) => {
    setCart((prev) => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (productId: number): number => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const match = String(priceStr).match(/(\d+(?:\.\d+)?)/);
    if (!match) return 0;
    const num = parseFloat(match[1]);
    return isNaN(num) ? 0 : num;
  };

  const cartTotalAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + (parsePrice(item.product.price) * item.quantity), 0);
  }, [cart]);

  const cartTotalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const handleSendCartOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmittingCart(true);

    const itemsText = cart.map((item, index) => {
      const subtotal = (parsePrice(item.product.price) * item.quantity).toFixed(2);
      const partStr = item.product.partNumber ? ` (N° OEM: #${item.product.partNumber})` : '';
      return `${index + 1}. *${item.product.title}*
   • Cantidad: _${item.quantity} unidades_ ${partStr}
   • Subtotal: _$${subtotal} USD_`;
    }).join('\n\n');

    const clientNameStr = cartClient.name || 'Cliente MasterTech';
    const clientPhoneStr = cartClient.phone || 'No indicado';
    const clientVehicleStr = cartClient.vehicle || 'Por especificar';

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: clientNameStr,
          telefono: clientPhoneStr,
          vehiculo: clientVehicleStr,
          servicio: `Pedido Carrito (${cartTotalItems} piezas - Total: $${cartTotalAmount.toFixed(2)})`,
          status: 'Pendiente',
          notes: `[SOLICITUD CARRITO DE REPUESTOS]\nUbicación: ${cartClient.location || 'Porlamar, Isla de Margarita'}\nNotas Cliente: ${cartClient.notes || 'Ninguna'}\nTotal: $${cartTotalAmount.toFixed(2)} USD\nItems:\n${cart.map(i => `- ${i.quantity}x ${i.product.title} (#${i.product.partNumber || 'N/A'})`).join('\n')}`
        })
      });
    } catch (err) {}

    const waMessage = `🛒 *SOLICITUD DE PEDIDO - CARRITO DE REPUESTOS*
_MasterTech Automotriz - Cotización Multielemento_

📌 *DETALLE DE REPUESTOS SOLICITADOS (${cartTotalItems} PIEZAS):*
-----------------------------------------
${itemsText}

-----------------------------------------
📊 *RESUMEN DEL PEDIDO:*
• Total de Piezas: _${cartTotalItems} unidades_
• *MONTO TOTAL ESTIMADO:* *$${cartTotalAmount.toFixed(2)} USD*

👤 *DATOS DEL CLIENTE:*
• *Nombre:* _${clientNameStr}_
• *Teléfono:* _${clientPhoneStr}_
• *Vehículo:* _${clientVehicleStr}_
• *Ubicación:* _${cartClient.location || 'Porlamar, Isla de Margarita'}_

💬 *NOTAS ADICIONALES:*
_${cartClient.notes || 'Ninguna.'}_

---
_Hola equipo Taller MasterTech 🛠️, quisiera procesar este pedido de repuestos de mi carrito. Quedo a la espera de la confirmación de disponibilidad en taller._`;

    const targetUrl = buildDirectWhatsAppUrl(config.PHONE_NUMBER, waMessage);
    setIsSubmittingCart(false);
    setCartSuccess(true);
    window.open(targetUrl, '_blank');
  };

  useEffect(() => {
    document.title = "Catálogo de Repuestos y Productos - Taller MasterTech";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Catálogo de repuestos originales, aceites sintéticos, baterías y componentes para tu vehículo en Taller MasterTech Porlamar.');
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('import') === 'usa' || window.location.hash.includes('solicitud-usa')) {
      setIsUsaModalOpen(true);
    }

    const loadLocalCatalog = () => {
      try {
        const stored = localStorage.getItem('mastertech_settings_store');
        if (stored) {
          const localData = JSON.parse(stored);
          if (localData) {
            setConfig((prev: any) => ({ ...prev, ...localData }));
            if (localData.CATALOG_PRODUCTS_JSON) {
              const parsed = typeof localData.CATALOG_PRODUCTS_JSON === 'string' 
                ? JSON.parse(localData.CATALOG_PRODUCTS_JSON) 
                : localData.CATALOG_PRODUCTS_JSON;
              if (Array.isArray(parsed) && parsed.length > 0) {
                setCatalogItems(parsed);
              }
            }
          }
        }
      } catch (e) {}
    };

    loadLocalCatalog();

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
          const catalogSource = data?.CATALOG_PRODUCTS_JSON || currentLocal?.CATALOG_PRODUCTS_JSON;
          if (catalogSource) {
            const parsed = typeof catalogSource === 'string' ? JSON.parse(catalogSource) : catalogSource;
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCatalogItems(parsed);
            }
          }
        }
      } catch (err) {}
    };

    fetchSettings();

    // Listen for live updates from Admin Panel
    const handleAdminSync = () => {
      loadLocalCatalog();
      fetchSettings(true);
    };

    window.addEventListener('mastertech_settings_updated', handleAdminSync);
    window.addEventListener('storage', handleAdminSync);

    return () => {
      window.removeEventListener('mastertech_settings_updated', handleAdminSync);
      window.removeEventListener('storage', handleAdminSync);
    };
  }, []);

  const getCleanPhoneDigits = (phoneStr?: string): string => {
    if (!phoneStr) return "584123565012";
    const digits = phoneStr.replace(/\D/g, '');
    return digits.length > 5 ? digits : "584123565012";
  };

  const buildDirectWhatsAppUrl = (phoneStr: string | undefined, textMessage: string): string => {
    const phone = getCleanPhoneDigits(phoneStr);
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(textMessage)}`;
  };

  const handleUsaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingUsa(true);

    const partText = usaForm.partNumber ? ` (N° Parte OEM: ${usaForm.partNumber})` : '';
    const vehicleText = `${usaForm.brand} ${usaForm.model} ${usaForm.year} ${usaForm.engine}`.trim();

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: usaForm.clientName || 'Cliente Importación EE.UU.',
          telefono: usaForm.phone || 'Sin número',
          vehiculo: vehicleText || 'Vehículo Especial USA',
          servicio: `Importación EE.UU.: ${usaForm.productName}${partText}`,
          status: 'Pendiente',
          notes: `[PEDIDO ESPECIAL EE.UU.] N° Parte: ${usaForm.partNumber || 'N/A'} | VIN: ${usaForm.vin || 'N/A'} | Envío: ${usaForm.shippingMode} | Ubicación: ${usaForm.location} | Notas: ${usaForm.notes}`
        })
      });
    } catch (err) {}

    const waMessage = `*SOLICITUD DE IMPORTACIÓN DIRECTA EE.UU.*
_MasterTech Automotriz - Pedido Especial OEM_

📌 *DATOS DEL REPUESTO*
• *Pieza / Repuesto:* _${usaForm.productName || 'Pieza Especial OEM'}_
• *N° OEM / Código:* _${usaForm.partNumber || 'Por verificar'}_

🚗 *DATOS DEL VEHÍCULO*
• *Vehículo:* _${vehicleText || 'No especificado'}_
• *Serial VIN (Chasis):* _${usaForm.vin || 'No indicado'}_

👤 *DATOS DEL CLIENTE*
• *Nombre:* _${usaForm.clientName || 'Cliente MasterTech'}_
• *Teléfono:* _${usaForm.phone || 'No indicado'}_
• *Ubicación:* _${usaForm.location || 'Porlamar, Margarita'}_
• *Logística:* _${usaForm.shippingMode}_

💬 *NOTAS ADICIONALES*
_${usaForm.notes || 'Sin observaciones adicionales.'}_

---
_Hola equipo Taller MasterTech 🛠️, he completado el formulario web. Quedo a la espera de la cotización formal en USD puesta en taller y tiempo exacto de entrega._`;

    const targetWaUrl = buildDirectWhatsAppUrl(config.PHONE_NUMBER, waMessage);

    setIsSubmittingUsa(false);
    setUsaFormSubmitted(true);
    window.open(targetWaUrl, '_blank');
  };

  const filteredItems = useMemo(() => {
    let result = catalogItems.filter(item => {
      // 1. Category filter
      const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;

      // 2. Brand filter
      const matchesBrand = selectedBrand === "Todas" || 
        (item.badge && item.badge.toLowerCase().includes(selectedBrand.toLowerCase())) ||
        item.title.toLowerCase().includes(selectedBrand.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(selectedBrand.toLowerCase()));

      // 3. Vehicle compatibility filter
      const matchesVehicle = selectedVehicle === "Todos" ||
        (item.compatibility && item.compatibility.toLowerCase().includes(selectedVehicle.toLowerCase()));

      // 4. Availability filter
      const matchesAvailability = availabilityFilter === 'all' ||
        (availabilityFilter === 'stock' && !item.isImportedUSA) ||
        (availabilityFilter === 'usa' && item.isImportedUSA);

      // 5. Search query
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q === "" || 
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        (item.partNumber || '').toLowerCase().includes(q) ||
        (item.badge || '').toLowerCase().includes(q) ||
        (item.compatibility || '').toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesBrand && matchesVehicle && matchesAvailability && matchesSearch;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return result;
  }, [catalogItems, selectedCategory, selectedBrand, selectedVehicle, availabilityFilter, sortBy, searchQuery]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "Todos") count++;
    if (selectedBrand !== "Todas") count++;
    if (selectedVehicle !== "Todos") count++;
    if (availabilityFilter !== "all") count++;
    if (searchQuery.trim() !== "") count++;
    return count;
  }, [selectedCategory, selectedBrand, selectedVehicle, availabilityFilter, searchQuery]);

  const getWhatsAppMessage = (productName: string, price: string, partNumber?: string, isImportedUSA?: boolean, stock?: number) => {
    const partInfo = partNumber ? ` (N° Parte OEM: ${partNumber})` : '';
    let text = '';
    if (stock === 0 || isImportedUSA) {
      text = `*CONSULTA DE REPUESTO IMPORTADO DESDE EE.UU.*\n\n📦 *Pieza:* _${productName}_${partInfo}\n💵 *Precio estimado:* _${price}_\n\n_Hola Taller MasterTech 🛠️, quisiera consultar tiempos de importación directa y costo total puesto en taller._`;
    } else {
      text = `📦 *CONSULTA DE REPUESTO EN STOCK*\n\n📦 *Pieza:* _${productName}_${partInfo}\n💵 *Precio publicado:* _${price}_\n\n_Hola Taller MasterTech 🛠️, me interesa comprar este repuesto. ¿Puedo coordinar el retiro o la instalación en taller?_`;
    }
    return buildDirectWhatsAppUrl(config.PHONE_NUMBER, text);
  };

  return (
    <div className="theme-root min-h-screen selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar activePage="catalogo" config={config} />

      {/* Main Container */}
      <main className="pt-24 pb-20 max-w-[1760px] mx-auto px-3 sm:px-6 space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SHOWCASE (DISEÑO PROFESIONAL MASTERTECH) */}
        {/* ========================================================================= */}
        <section className="relative rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-14 shadow-xl border bg-white dark:bg-gradient-to-b dark:from-[#161822] dark:via-[#11131a] dark:to-[#0D0D0D] border-slate-200 dark:border-slate-800 transition-colors duration-300">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="hero-tag inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-black text-xs uppercase tracking-widest bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400"
              >
                <ShieldCheck size={14} className="text-red-600 dark:text-red-400" />
                <span>Stock en Margarita · Importación Directa EE.UU.</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl xl:text-6xl font-display font-black tracking-tight uppercase leading-[1.08] text-slate-900 dark:text-white"
              >
                <span>Repuestos &</span> <br className="hidden sm:block" />
                <span className="text-red-600 dark:text-red-500 italic">Autopartes OEM</span> <span>Certificadas</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 text-slate-600 dark:text-slate-300"
              >
                Pastillas cerámicas, amortiguadores heavy duty, lubricantes 100% sintéticos y componentes genuinos. Disponibilidad inmediata en taller o importación express desde EE.UU. con código OEM o serial VIN.
              </motion.p>

              {/* Action CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
              >
                <a 
                  href="#catalogo-grid"
                  className="btn-primary !py-3.5 !px-8 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-red-600/20 hover:scale-105 transition-all cursor-pointer rounded-2xl"
                >
                  <ShoppingCart size={16} />
                  <span>Explorar Catálogo</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsUsaModalOpen(true)}
                  className="px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/25 hover:bg-slate-200 dark:hover:bg-white/20"
                >
                  <Plane size={16} className="text-blue-500 dark:text-sky-400" />
                  <span>Importación USA</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="px-5 py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <ShoppingBag size={16} />
                  <span>Carrito ({cartTotalItems})</span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Garantía en Taller
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Instalación Disponible
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Marcas OEM & Genuinas
                </span>
              </div>

              {/* Quick Search Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-3 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Búsquedas rápidas:</span>
                {[
                  "Brembo",
                  "Wagner",
                  "Motul 5W-30",
                  "KYB",
                  "Batería Duncan",
                  "Mopar"
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      const el = document.getElementById('catalogo-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer text-[11px] font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right 3D Auto Parts Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-6 flex items-center justify-center relative"
            >
              <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 p-2 shadow-xl group">
                <img 
                  src="/assets/autoparts_hero_showcase.webp" 
                  alt="Auto Parts Showcase MasterTech"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/90 dark:bg-black/75 backdrop-blur-md border border-slate-200 dark:border-white/15 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-600 dark:text-red-400 font-bold">
                      <Flame size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 dark:text-white">Frenos, Suspensión & Motor</div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-300">Rendimiento garantizado y compatibilidad exacta</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-0.5 rounded-lg border border-red-500/30">
                    OEM 100%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: POPULAR CATEGORIES (CATEGORÍAS POPULARES EN GRID) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-[11px] font-black uppercase text-red-600 dark:text-red-400 tracking-wider">Exploración por Sistema</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>Categorías</span> <span className="text-red-600 dark:text-red-400 italic">Principales</span>
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-sm">
              Selecciona una categoría para filtrar el inventario o cotizar piezas específicas para tu vehículo.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Frenos & Discos", label: "Frenos & Discos", icon: <Disc size={20} className="text-red-500" />, img: "/assets/cat_frenos_discos.webp", desc: "Pastillas cerámicas y discos ranurados" },
              { name: "Suspensión & Amortiguadores", label: "Suspensión & Amortiguadores", icon: <Layers size={20} className="text-red-500" />, img: "/assets/cat_suspension_amortiguadores.webp", desc: "Coilovers y amortiguadores de gas" },
              { name: "Aceites & Lubricantes", label: "Aceites & Lubricantes", icon: <Droplets size={20} className="text-red-500" />, img: "/assets/cat_aceites_lubricantes.webp", desc: "Sintéticos 5W-30 y fluidos ATF" },
              { name: "Baterías & Electricidad", label: "Baterías & Electricidad", icon: <Zap size={20} className="text-red-500" />, img: "/assets/cat_baterias_electricidad.webp", desc: "Baterías AGM y alternadores 140A" },
              { name: "Filtros & Consumibles", label: "Filtros & Consumibles", icon: <Package size={20} className="text-red-500" />, img: "/assets/cat_filtros_oem.webp", desc: "Filtros de aire, aceite y microfiltros" },
              { name: "Fluidos & Climatización", label: "Fluidos & Climatización A/A", icon: <Sparkles size={20} className="text-red-500" />, img: "/assets/cat_climatizacion.webp", desc: "Gas R134a, refrigerantes y A/A" },
              { name: "Inyección & Motor", label: "Inyección & Motor", icon: <Gauge size={20} className="text-red-500" />, img: "/assets/promo_turbo_charger.webp", desc: "Turbocargadores e inyectores" },
              { name: "Cuidado & Detailing", label: "Cuidado & Detailing", icon: <Car size={20} className="text-red-500" />, img: "/assets/cat_cuidado_estetica.webp", desc: "Ceras cerámicas, champú y microfibras" }
            ].map((catItem, idx) => {
              const count = catalogItems.filter(item => item.category === catItem.name).length;
              const isSelected = selectedCategory === catItem.name;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(catItem.name);
                    const el = document.getElementById('catalogo-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 group select-none shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'is-selected ring-2 ring-red-600 bg-red-50 dark:bg-red-950/20 border-red-500'
                      : 'bg-white dark:bg-[#12141a]/90 border-slate-200 dark:border-white/10 hover:border-red-500/40 hover:bg-slate-50 dark:hover:bg-[#161822]'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10 shrink-0 p-0.5 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    <img 
                      src={catItem.img} 
                      alt={catItem.label} 
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight truncate">
                      {catItem.label}
                    </h4>
                    <span className="category-count text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold block mt-0.5">
                      ({count} {count === 1 ? 'pieza' : 'piezas'})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: PROMO OFFER BANNERS (SERVICIOS Y REPUESTOS CLAVE) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Promo Card 1: Frenos */}
          <div className="p-6 rounded-3xl relative overflow-hidden shadow-sm hover:shadow-md flex items-center justify-between group transition-all bg-red-50/80 dark:bg-gradient-to-br dark:from-[#221010] dark:via-[#151114] dark:to-black border border-red-200 dark:border-red-500/40">
            <div className="space-y-2 relative z-10 max-w-[60%]">
              <span className="promo-tag text-[10px] font-black uppercase tracking-wider block text-red-600 dark:text-[#f87171]">Frenos & Seguridad</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight text-slate-900 dark:text-white">
                Frenado <span className="text-red-600 dark:text-[#f87171]">Cerámico</span>
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">Pastillas cerámicas libres de chirridos y discos ventilados.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("Frenos & Discos");
                  const el = document.getElementById('catalogo-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-black flex items-center gap-1 pt-1 group-hover:underline cursor-pointer bg-transparent border-0 p-0 text-red-600 dark:text-[#f87171]"
              >
                <span>Ver Frenos</span>
                <ArrowRight size={13} />
              </button>
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 bg-white/60 dark:bg-[#0c0e14]/60 p-1 flex items-center justify-center border border-red-100 dark:border-white/5">
              <img src="/assets/promo_brakes_caliper.webp" alt="Frenos Cerámicos" loading="lazy" decoding="async" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Promo Card 2: Suspensión */}
          <div className="p-6 rounded-3xl relative overflow-hidden shadow-sm hover:shadow-md flex items-center justify-between group transition-all bg-slate-50 dark:bg-gradient-to-br dark:from-[#1b1f28] dark:via-[#13171f] dark:to-black border border-slate-200 dark:border-slate-700/60">
            <div className="space-y-2 relative z-10 max-w-[60%]">
              <span className="promo-tag text-[10px] font-black uppercase tracking-wider block text-slate-700 dark:text-slate-300">Suspensión & Confort</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight text-slate-900 dark:text-white">
                Heavy <span className="text-red-600 dark:text-red-400">Duty</span>
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">Amortiguadores presurizados a gas y muelles reforzados.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("Suspensión & Amortiguadores");
                  const el = document.getElementById('catalogo-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-black flex items-center gap-1 pt-1 group-hover:underline cursor-pointer bg-transparent border-0 p-0 text-slate-900 dark:text-white"
              >
                <span>Ver Suspensión</span>
                <ArrowRight size={13} />
              </button>
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 bg-white/60 dark:bg-[#0c0e14]/60 p-1 flex items-center justify-center border border-slate-200 dark:border-white/5">
              <img src="/assets/promo_suspension_spring.webp" alt="Suspensión" loading="lazy" decoding="async" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Promo Card 3: Importación Especial */}
          <div className="p-6 rounded-3xl relative overflow-hidden shadow-sm hover:shadow-md flex items-center justify-between group transition-all bg-blue-50/80 dark:bg-gradient-to-br dark:from-[#0e1726] dark:via-[#10141c] dark:to-black border border-blue-200 dark:border-blue-500/40">
            <div className="space-y-2 relative z-10 max-w-[60%]">
              <span className="promo-tag text-[10px] font-black uppercase tracking-wider block text-blue-600 dark:text-[#60a5fa]">Pedidos Especiales</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight text-slate-900 dark:text-white">
                Importación <span className="text-blue-600 dark:text-[#60a5fa]">Directa USA</span>
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">Traemos tu repuesto OEM desde Miami en 7 a 15 días con código de parte o VIN.</p>
              <button
                type="button"
                onClick={() => setIsUsaModalOpen(true)}
                className="text-xs font-black flex items-center gap-1 pt-1 group-hover:underline cursor-pointer bg-transparent border-0 p-0 text-blue-600 dark:text-[#60a5fa]"
              >
                <span>Solicitar por Encargo</span>
                <ArrowRight size={13} />
              </button>
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 bg-white/60 dark:bg-[#0c0e14]/60 p-1 flex items-center justify-center border border-blue-100 dark:border-white/5">
              <img src="/assets/promo_turbo_charger.webp" alt="Importación USA" loading="lazy" decoding="async" className="w-full h-full object-contain" />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: PRODUCT CATALOG GRID (INVENTARIO DISPONIBLE) */}
        {/* ========================================================================= */}
        <section id="catalogo-grid" className="space-y-6 pt-4">
          
          {/* Header Title & Result Count */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-[11px] font-black uppercase text-red-600 dark:text-red-400 tracking-wider">Catálogo MasterTech 2026</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-zinc-900 dark:text-white section-heading-dark flex items-center gap-2">
                <span>Inventario de Repuestos</span> <span className="text-red-600 font-serif italic text-xl sm:text-2xl">/ En Taller & Encargo</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Mostrando <strong className="text-slate-900 dark:text-white font-mono">{filteredItems.length}</strong> de <strong className="text-slate-900 dark:text-white font-mono">{catalogItems.length}</strong> repuestos certificados con garantía y respaldo de instalación.
              </p>
            </div>

            {/* Availability Filter Segmented Control */}
            <div className="flex items-center bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10 self-start sm:self-end">
              <button
                type="button"
                onClick={() => setAvailabilityFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  availabilityFilter === 'all'
                    ? 'bg-white dark:bg-[#1a1d28] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todos ({catalogItems.length})
              </button>
              <button
                type="button"
                onClick={() => setAvailabilityFilter('stock')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  availabilityFilter === 'stock'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>En Taller ({catalogItems.filter(i => !i.isImportedUSA).length})</span>
              </button>
              <button
                type="button"
                onClick={() => setAvailabilityFilter('usa')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  availabilityFilter === 'usa'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Plane size={12} />
                <span>Express USA ({catalogItems.filter(i => i.isImportedUSA).length})</span>
              </button>
            </div>
          </div>

          {/* OEM BRANDS SELECTOR STRIP */}
          <div className="space-y-2.5 bg-slate-50/70 dark:bg-white/[0.02] p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-red-600" />
                <span className="font-black uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
                  Marcas OEM Certificadas
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                  (Selecciona para filtrar por fabricante)
                </span>
              </div>
              {selectedBrand !== 'Todas' && (
                <button
                  type="button"
                  onClick={() => setSelectedBrand('Todas')}
                  className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw size={11} />
                  <span>Ver todas las marcas</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-transparent">
              {OEM_BRANDS.map((brand) => {
                const isSelected = selectedBrand === brand.name;
                const count = brand.name === "Todas"
                  ? catalogItems.length
                  : catalogItems.filter(item => 
                      (item.badge && item.badge.toLowerCase().includes(brand.name.toLowerCase())) ||
                      item.title.toLowerCase().includes(brand.name.toLowerCase()) ||
                      (item.desc && item.desc.toLowerCase().includes(brand.name.toLowerCase()))
                    ).length;

                return (
                  <button
                    key={brand.name}
                    type="button"
                    onClick={() => setSelectedBrand(brand.name)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                        : 'bg-white dark:bg-[#12141a] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-red-500/50 hover:bg-slate-50 dark:hover:bg-[#181a24]'
                    }`}
                  >
                    <span>{brand.label}</span>
                    {brand.origin && (
                      <span className={`text-[9px] uppercase tracking-wider font-semibold opacity-75 hidden md:inline ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                        · {brand.origin.split('·')[0]}
                      </span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected 
                        ? 'bg-black/30 text-white' 
                        : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VEHICLE COMPATIBILITY BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70 dark:bg-white/[0.02] p-3 sm:p-3.5 rounded-2xl border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-2 shrink-0">
              <Car size={15} className="text-red-600" />
              <span className="font-black uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
                Compatibilidad:
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              {VEHICLE_MODELS.map((veh) => {
                const isSelected = selectedVehicle === veh.name;
                const count = veh.name === 'Todos'
                  ? catalogItems.length
                  : catalogItems.filter(item => item.compatibility && item.compatibility.toLowerCase().includes(veh.name.toLowerCase())).length;

                return (
                  <button
                    key={veh.name}
                    type="button"
                    onClick={() => setSelectedVehicle(veh.name)}
                    className={`shrink-0 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                        : 'bg-white dark:bg-[#12141a] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20'
                    }`}
                  >
                    {veh.icon && <span className="text-xs">{veh.icon}</span>}
                    <span>{veh.name}</span>
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-red-400 dark:text-red-600' : 'text-slate-400'}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECONDARY TOOLBAR: SEARCH & SORT CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
              <input 
                type="text"
                placeholder="Buscar por nombre, código OEM o modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#12141a] border border-zinc-200 dark:border-white/15 focus:border-red-500 rounded-xl py-2.5 pl-9 pr-7 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 shrink-0">
                <ArrowUpDown size={13} />
                <span className="hidden sm:inline">Ordenar:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-[#12141a] border border-slate-200 dark:border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer hover:border-red-500 transition-colors shadow-sm"
              >
                <option value="featured">Destacados MasterTech</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* ACTIVE FILTERS SUMMARY CHIPS */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-xs">
              <span className="font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                <SlidersHorizontal size={13} />
                <span>Filtros activos ({activeFiltersCount}):</span>
              </span>

              {selectedCategory !== "Todos" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#12141a] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 text-[11px] font-semibold">
                  Categoría: {selectedCategory}
                  <button onClick={() => setSelectedCategory("Todos")} className="hover:text-red-500 cursor-pointer ml-1">
                    <X size={11} />
                  </button>
                </span>
              )}

              {selectedBrand !== "Todas" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#12141a] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 text-[11px] font-semibold">
                  Marca: {selectedBrand}
                  <button onClick={() => setSelectedBrand("Todas")} className="hover:text-red-500 cursor-pointer ml-1">
                    <X size={11} />
                  </button>
                </span>
              )}

              {selectedVehicle !== "Todos" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#12141a] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 text-[11px] font-semibold">
                  Vehículo: {selectedVehicle}
                  <button onClick={() => setSelectedVehicle("Todos")} className="hover:text-red-500 cursor-pointer ml-1">
                    <X size={11} />
                  </button>
                </span>
              )}

              {availabilityFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#12141a] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 text-[11px] font-semibold">
                  Disponibilidad: {availabilityFilter === 'stock' ? 'En Taller' : 'Express USA'}
                  <button onClick={() => setAvailabilityFilter("all")} className="hover:text-red-500 cursor-pointer ml-1">
                    <X size={11} />
                  </button>
                </span>
              )}

              {searchQuery.trim() !== "" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#12141a] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 text-[11px] font-semibold">
                  Búsqueda: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-red-500 cursor-pointer ml-1">
                    <X size={11} />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={resetAllFilters}
                className="ml-auto text-red-600 dark:text-red-400 hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Restablecer filtros</span>
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-[#12141a] border border-zinc-200 dark:border-white/10 rounded-3xl max-w-md mx-auto shadow-sm">
              <Package size={44} className="text-zinc-400 mb-4 stroke-[1.5]" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No encontramos coincidencias</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm max-w-xs mb-6 leading-relaxed">
                Prueba ajustando los filtros de marca o categoría, o consúltanos directamente por WhatsApp con tu serial VIN o código de parte.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  type="button"
                  onClick={resetAllFilters}
                  className="btn-secondary inline-flex items-center justify-center !py-2.5 !px-5 text-xs font-bold rounded-xl"
                >
                  <RotateCcw size={13} className="mr-1.5" />
                  Restablecer Filtros
                </button>
                <button
                  type="button"
                  onClick={() => setIsUsaModalOpen(true)}
                  className="btn-primary inline-flex items-center justify-center !py-2.5 !px-5 text-xs font-bold rounded-xl"
                >
                  <Plane size={13} className="mr-1.5" />
                  Pedir por Encargo USA
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredItems.map((item, idx) => {
                const numericPrice = parsePrice(item.price);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="catalogo-product-card bg-white dark:bg-[#12141a] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-red-500/70 hover:shadow-2xl transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Product Top Image Box */}
                    <div 
                      className="relative aspect-square bg-gradient-to-b from-slate-50 to-slate-100/60 dark:from-[#151722] dark:to-[#0c0e14] p-5 flex items-center justify-center cursor-pointer overflow-hidden group/img select-none"
                      onClick={() => {
                        setSelectedProduct(item);
                        setActiveImageIndex(0);
                      }}
                    >
                      <img 
                        src={item.img || "/assets/cat_suspension_amortiguadores.webp"} 
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/assets/promo_brakes_caliper.webp'; }}
                        className="w-full h-full object-contain group-hover/img:scale-108 transition-transform duration-500 drop-shadow-md rounded-xl"
                      />

                      {/* Brand Badge Top-Left */}
                      {item.badge && (
                        <div className="absolute top-2.5 left-2.5 pointer-events-none">
                          <span className="font-black text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider leading-tight block max-w-[130px] truncate bg-black/85 text-white border border-white/20 backdrop-blur-md shadow-md">
                            {item.badge}
                          </span>
                        </div>
                      )}

                      {/* Availability Badge Top-Right */}
                      <div className="absolute top-2.5 right-2.5 pointer-events-none">
                        {item.isImportedUSA ? (
                          <span className="font-black text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider bg-blue-600/90 text-white border border-blue-400/50 backdrop-blur-md shadow-md flex items-center gap-1">
                            <Plane size={10} />
                            <span>USA Express</span>
                          </span>
                        ) : (
                          <span className="font-black text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider bg-emerald-600/90 text-white border border-emerald-400/50 backdrop-blur-md shadow-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>Stock Taller</span>
                          </span>
                        )}
                      </div>

                      {/* Quick View Floating Hint */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                          <Eye size={13} />
                          <span>Ficha Técnica</span>
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-t border-slate-100 dark:border-white/5" />

                    {/* Product Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-transparent">
                      <div className="space-y-2">
                        {/* Part Number & Vehicle Compatibility */}
                        <div className="flex items-center justify-between gap-1 text-[10px]">
                          {item.partNumber ? (
                            <button
                              type="button"
                              onClick={(e) => handleCopyPart(item.id, item.partNumber || '', e)}
                              className="inline-flex items-center gap-1 font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer group/part"
                              title="Copiar número de parte OEM al portapapeles"
                            >
                              {copiedPartId === item.id ? (
                                <>
                                  <CheckCheck size={11} className="text-emerald-500" />
                                  <span className="text-emerald-500 font-bold">¡Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={11} className="text-slate-400 group-hover/part:text-red-500" />
                                  <span className="truncate max-w-[110px]">{item.partNumber}</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-slate-400 font-mono text-[10px]">OEM Genuino</span>
                          )}

                          {item.compatibility && (
                            <span className="font-semibold text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px] text-right" title={item.compatibility}>
                              {item.compatibility.split(',')[0]}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={() => {
                            setSelectedProduct(item);
                            setActiveImageIndex(0);
                          }}
                          className="product-title text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer leading-snug line-clamp-2 min-h-[2.6em]"
                          title={item.title}
                        >
                          {item.title}
                        </h3>

                        {/* Micro-specs pills */}
                        {item.specs && item.specs.length > 0 && (
                          <div className="space-y-1 pt-0.5">
                            {item.specs.slice(0, 2).map((spec, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                                <span className="w-1 h-1 rounded-full bg-red-600 shrink-0" />
                                <span className="truncate">{spec}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Price Section */}
                        <div className="pt-1.5 flex items-baseline justify-between border-t border-slate-100 dark:border-white/5">
                          <div className="flex items-baseline gap-1">
                            <span className="product-price text-lg sm:text-xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                              {numericPrice > 0 ? `$${numericPrice.toFixed(2)}` : item.price}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                              USD
                            </span>
                          </div>

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                            {item.category.split('&')[0].trim()}
                          </span>
                        </div>

                        {/* Workshop Installation Hint */}
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 select-none pt-0.5">
                          <Wrench size={11} className="text-red-600 shrink-0" />
                          <span className="truncate">Instalación y garantía en Taller MasterTech</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-white/10">
                        {getItemQuantity(item.id) === 0 ? (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={(e) => addToCart(item, 1, e)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-600/20 active:scale-[0.95]"
                          >
                            <ShoppingCart size={13} />
                            <span>Añadir</span>
                          </motion.button>
                        ) : (
                          <motion.div 
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 450, damping: 25 }}
                            className="flex-1 flex items-center justify-between rounded-xl overflow-hidden border border-red-600 bg-red-600 shadow-md shadow-red-600/20" 
                            style={{ minHeight: '34px' }}
                          >
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-8 h-[34px] bg-red-700 hover:bg-red-800 text-white flex items-center justify-center font-black cursor-pointer transition-colors shrink-0 active:bg-red-900"
                              title="Restar"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="flex-1 text-center font-bold text-white text-xs tracking-wide select-none">
                              {getItemQuantity(item.id)} en carrito
                            </span>
                            <button
                              onClick={(e) => {
                                updateCartQty(item.id, 1);
                                setCartBump(prev => prev + 1);
                              }}
                              className="w-8 h-[34px] bg-red-700 hover:bg-red-800 text-white flex items-center justify-center font-black cursor-pointer transition-colors shrink-0 active:bg-red-900"
                              title="Sumar"
                            >
                              <Plus size={12} />
                            </button>
                          </motion.div>
                        )}

                        <button
                          onClick={() => {
                            setSelectedProduct(item);
                            setActiveImageIndex(0);
                          }}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-red-500 text-slate-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                          title="Ver Ficha Técnica"
                        >
                          <Eye size={14} />
                        </button>

                        <a
                          href={getWhatsAppMessage(item.title, item.price, item.partNumber, item.isImportedUSA, item.stock)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors cursor-pointer border border-[#25D366]/30 flex items-center justify-center"
                          title="Consultar por WhatsApp con N° OEM"
                        >
                          <WhatsAppIcon size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CUSTOM USA PART IMPORT BANNER */}
        {/* ========================================================================= */}
        <section 
          className="rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl border bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-100 dark:from-[#0d1527] dark:via-[#161f30] dark:to-[#10141d] border-blue-200 dark:border-blue-500/40 text-slate-900 dark:text-white transition-colors duration-300"
        >
          <div className="space-y-3 max-w-2xl relative z-10">
            <div 
              className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border bg-blue-100 dark:bg-blue-500/25 border-blue-300 dark:border-blue-400/50 text-blue-700 dark:text-blue-300"
            >
              <Plane size={13} className="text-blue-600 dark:text-blue-400" />
              <span>Importación Directa desde Miami / EE.UU.</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              ¿Buscas un repuesto o componente específico desde USA?
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Importamos repuestos originales OEM y alternativos certificados directamente desde EE.UU. para Jeep, Toyota, Honda, Nissan, Dodge, Chrysler, Ford y Lexus. Envíanos tu número de parte OEM o Serial VIN por WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsUsaModalOpen(true)}
            className="btn-primary py-4 px-8 rounded-2xl shrink-0 shadow-xl flex items-center gap-2 relative z-10 cursor-pointer font-black text-xs uppercase tracking-wider border-none"
          >
            <Plane size={18} className="animate-bounce" />
            <span>Formulario de Solicitud EE.UU.</span>
          </button>
        </section>
      </main>

        {/* ========================================================================= */}
        {/* MODAL DE SOLICITUD DE IMPORTACIÓN DIRECTA DE MERCANCÍA DESDE EE.UU. */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isUsaModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-[#12141a] border border-blue-500/50 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8 max-h-[92vh] flex flex-col usa-import-modal"
              >
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-white/10 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 flex items-center justify-between usa-import-header" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/60 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                      <Plane size={20} className="animate-pulse text-sky-400 usa-plane-icon" style={{ color: '#38bdf8', stroke: '#38bdf8' }} />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2 usa-import-title" style={{ color: '#ffffff' }}>
                        <span className="usa-import-title" style={{ color: '#ffffff' }}>Solicitud de Importación EE.UU.</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/40 px-2 py-0.5 rounded-full font-bold" style={{ color: '#93c5fd', backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>OEM Directo</span>
                      </h2>
                      <p className="text-zinc-300 text-xs mt-0.5 usa-import-desc" style={{ color: '#cbd5e1' }}>
                        Ingresa el N° de parte o datos del repuesto para cotización express desde EE.UU.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsUsaModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer hdr-btn"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                    title="Cerrar modal"
                  >
                    <X size={18} style={{ color: '#ffffff', stroke: '#ffffff' }} />
                  </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleUsaSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
                  {usaFormSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto text-2xl">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-white">¡Solicitud Generada Exitosamente!</h3>
                      <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                        Se ha abierto tu chat de WhatsApp con el resumen de la solicitud. Un especialista de MasterTech revisará la disponibilidad del número de parte OEM en EE.UU. y te enviará la cotización exacta en USD.
                      </p>
                      <button
                        type="button"
                        onClick={() => { setUsaFormSubmitted(false); setIsUsaModalOpen(false); }}
                        className="btn-primary !py-2.5 !px-6 text-xs border-none mx-auto"
                      >
                        Volver al Catálogo
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Part Number & Product Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="usa-part-number" className="block text-xs font-bold mb-1 flex items-center gap-1" style={{ color: '#93c5fd' }}>
                            <Tag size={12} className="text-blue-400" />
                            <span style={{ color: '#93c5fd' }}>Número de Parte OEM / Código (Recomendado)</span>
                          </label>
                          <input
                            id="usa-part-number"
                            name="usa-part-number"
                            type="text"
                            value={usaForm.partNumber}
                            onChange={(e) => setUsaForm({ ...usaForm, partNumber: e.target.value })}
                            placeholder="Ej. #52008899AD / Mopar / Denso"
                            className="w-full bg-[#0d0e12] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-blue-400 transition-colors font-mono"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>

                        <div>
                          <label htmlFor="usa-product-name" className="block text-xs font-bold mb-1 flex items-center gap-1" style={{ color: '#f1f5f9' }}>
                            <Package size={12} className="text-primary" />
                            <span style={{ color: '#f1f5f9' }}>Nombre o Descripción del Repuesto *</span>
                          </label>
                          <input
                            id="usa-product-name"
                            name="usa-product-name"
                            type="text"
                            required
                            value={usaForm.productName}
                            onChange={(e) => setUsaForm({ ...usaForm, productName: e.target.value })}
                            placeholder="Ej. Bomba de agua, Juego de inyectores, Sensor O2"
                            className="w-full bg-[#0d0e12] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary transition-colors"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>
                      </div>

                      {/* Vehicle Details: Brand, Model, Year, Engine */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <div>
                          <label htmlFor="usa-brand" className="block text-[11px] font-bold mb-1" style={{ color: '#e2e8f0' }}>Marca *</label>
                          <input
                            id="usa-brand"
                            name="usa-brand"
                            type="text"
                            required
                            value={usaForm.brand}
                            onChange={(e) => setUsaForm({ ...usaForm, brand: e.target.value })}
                            placeholder="Jeep / Toyota"
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>

                        <div>
                          <label htmlFor="usa-model" className="block text-[11px] font-bold mb-1" style={{ color: '#e2e8f0' }}>Modelo *</label>
                          <input
                            id="usa-model"
                            name="usa-model"
                            type="text"
                            required
                            value={usaForm.model}
                            onChange={(e) => setUsaForm({ ...usaForm, model: e.target.value })}
                            placeholder="Grand Cherokee"
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>

                        <div>
                          <label htmlFor="usa-year" className="block text-[11px] font-bold mb-1" style={{ color: '#e2e8f0' }}>Año *</label>
                          <input
                            id="usa-year"
                            name="usa-year"
                            type="text"
                            required
                            value={usaForm.year}
                            onChange={(e) => setUsaForm({ ...usaForm, year: e.target.value })}
                            placeholder="2018"
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>

                        <div>
                          <label htmlFor="usa-engine" className="block text-[11px] font-bold mb-1" style={{ color: '#e2e8f0' }}>Motor</label>
                          <input
                            id="usa-engine"
                            name="usa-engine"
                            type="text"
                            value={usaForm.engine}
                            onChange={(e) => setUsaForm({ ...usaForm, engine: e.target.value })}
                            placeholder="3.6L V6"
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>
                      </div>

                      {/* Serial VIN & Shipping Method */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="usa-vin" className="block text-xs font-bold mb-1 flex items-center gap-1" style={{ color: '#f1f5f9' }}>
                            <ShieldCheck size={12} className="text-green-400" />
                            <span style={{ color: '#f1f5f9' }}>Número de Chasis / Serial VIN (17 dígitos)</span>
                          </label>
                          <input
                            id="usa-vin"
                            name="usa-vin"
                            type="text"
                            value={usaForm.vin}
                            onChange={(e) => setUsaForm({ ...usaForm, vin: e.target.value.toUpperCase() })}
                            placeholder="Ej. 1C4RJFAG8JC123456 (Opcional)"
                            className="w-full bg-[#0d0e12] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary transition-colors font-mono uppercase"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>

                        <div>
                          <label htmlFor="usa-shipping" className="block text-xs font-bold mb-1 flex items-center gap-1" style={{ color: '#93c5fd' }}>
                            <Plane size={12} className="text-blue-400" />
                            <span style={{ color: '#93c5fd' }}>Modalidad de Logística Preferida</span>
                          </label>
                          <select
                            id="usa-shipping"
                            name="usa-shipping"
                            value={usaForm.shippingMode}
                            onChange={(e) => setUsaForm({ ...usaForm, shippingMode: e.target.value })}
                            className="w-full bg-[#0d0e12] border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-blue-400 transition-colors font-medium"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          >
                            <option value="Express Aéreo (7 a 15 días hábiles)">✈️ Express Aéreo (7 a 15 días hábiles - Urgente)</option>
                            <option value="Marítimo Estándar (21 a 40 días hábiles)">🚢 Marítimo Estándar (21 a 40 días hábiles - Económico)</option>
                          </select>
                        </div>
                      </div>

                      {/* Client Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="usa-client-name" className="block text-xs font-bold mb-1" style={{ color: '#f1f5f9' }}>Nombre y Apellido *</label>
                          <input
                            id="usa-client-name"
                            name="usa-client-name"
                            type="text"
                            required
                            value={usaForm.clientName}
                            onChange={(e) => setUsaForm({ ...usaForm, clientName: e.target.value })}
                            placeholder="Tu nombre completo"
                            className="w-full bg-[#0d0e12] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary transition-colors"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>

                        <div>
                          <label htmlFor="usa-phone" className="block text-xs font-bold mb-1" style={{ color: '#f1f5f9' }}>Teléfono WhatsApp *</label>
                          <input
                            id="usa-phone"
                            name="usa-phone"
                            type="tel"
                            required
                            value={usaForm.phone}
                            onChange={(e) => setUsaForm({ ...usaForm, phone: e.target.value })}
                            placeholder="+58 412 1234567"
                            className="w-full bg-[#0d0e12] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary transition-colors"
                            style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                          />
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label htmlFor="usa-notes" className="block text-xs font-bold mb-1" style={{ color: '#f1f5f9' }}>Notas Adicionales o Detalles del Repuesto</label>
                        <textarea
                          id="usa-notes"
                          name="usa-notes"
                          rows={2}
                          value={usaForm.notes}
                          onChange={(e) => setUsaForm({ ...usaForm, notes: e.target.value })}
                          placeholder="Especifica lado (derecho/izquierdo), si requieres kit completo o consultas extra..."
                          className="w-full bg-[#0d0e12] border border-white/20 rounded-xl p-3 text-xs text-white placeholder-zinc-400 outline-none focus:border-primary transition-colors resize-none"
                          style={{ backgroundColor: '#0d0e12', color: '#ffffff' }}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmittingUsa}
                          className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black uppercase text-xs tracking-wider py-3.5 px-6 rounded-2xl transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer border border-blue-400/40"
                        >
                          <Plane size={16} className="animate-bounce" />
                          <span>{isSubmittingUsa ? 'Procesando...' : 'Enviar Solicitud e Iniciar Cotización por WhatsApp'}</span>
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="catalogo-product-modal bg-[#12141a] border border-white/20 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/60">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-red-500" />
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{selectedProduct.category}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              {(() => {
                const allPhotos = [selectedProduct.img, ...(selectedProduct.images || [])].filter(Boolean);
                const currentImg = (allPhotos && allPhotos[activeImageIndex]) || selectedProduct.img || '/assets/cat_frenos_discos.webp';

                return (
                  <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 max-h-[calc(90vh-135px)] pb-10 scrollbar-thin">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                      {/* Gallery Viewer */}
                      <div className="space-y-3">
                        <div 
                          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-xl group cursor-zoom-in"
                          onClick={() => setLightboxImage(currentImg)}
                          title="Haz clic o toca para ver la imagen en pantalla completa"
                        >
                          <img 
                            src={currentImg} 
                            alt={selectedProduct.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                            loading="lazy"
                            decoding="async"
                          />
                          {selectedProduct.badge && (
                            <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg z-10">
                              {selectedProduct.badge}
                            </span>
                          )}
                          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity border border-white/20 shadow-lg">
                            <ZoomIn size={14} className="text-red-500" />
                            <span>Tocar para Ampliar</span>
                          </div>
                        </div>

                        {/* Thumbnails list if extra images exist */}
                        {allPhotos.length > 1 && (
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {allPhotos.map((photo, pIdx) => {
                              const isActive = (activeImageIndex || 0) === pIdx;
                              return (
                                <button
                                  key={pIdx}
                                  type="button"
                                  onClick={() => setActiveImageIndex(pIdx)}
                                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                    isActive ? 'border-red-500 scale-105 shadow-md shadow-red-500/30' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                                  }`}
                                >
                                  <img src={photo} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {selectedProduct.partNumber && (
                            <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/25 px-3 py-1 rounded-full inline-block">
                              N° OEM: {selectedProduct.partNumber}
                            </span>
                          )}

                          <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
                            (selectedProduct.stock ?? 10) > 0 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {selectedProduct.isImportedUSA ? '✈ Pedido USA (7 a 15 días)' : `● ${selectedProduct.stock ?? 10} en Stock Taller`}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold leading-snug text-white">{selectedProduct.title}</h3>
                        
                        <div className="pt-1 flex items-baseline gap-2">
                          <span className="text-3xl font-black font-display text-white">
                            {parsePrice(selectedProduct.price) > 0 ? `$${parsePrice(selectedProduct.price).toFixed(2)}` : selectedProduct.price}
                          </span>
                          <span className="text-xs font-bold text-zinc-400">USD</span>
                          {selectedProduct.isImportedUSA && (
                            <span className="text-[11px] text-blue-400 font-semibold ml-2 bg-blue-950/60 border border-blue-500/30 px-2 py-0.5 rounded-full">
                              Importación Express
                            </span>
                          )}
                        </div>

                        <p className="text-xs leading-relaxed mt-1 text-slate-300">{selectedProduct.desc}</p>

                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 flex items-center gap-2.5">
                          <Wrench size={16} className="text-red-500 shrink-0" />
                          <span><strong>Servicio de Taller:</strong> Podemos realizar la instalación, diagnóstico y calibración de esta pieza en nuestras instalaciones en Porlamar.</span>
                        </div>
                      </div>
                    </div>

                    {selectedProduct.isImportedUSA && (
                      <div className="p-4 bg-blue-950/60 border border-blue-500/40 rounded-2xl text-xs text-blue-200 flex items-center gap-3 shadow-md">
                        <div>
                          <strong className="block font-bold text-white">Repuesto Importado Directamente desde EE.UU.</strong>
                          <p className="text-[11px] mt-0.5 text-blue-200">Producto con especificaciones originales OEM importado desde EE.UU. Garantía de durabilidad y ajuste perfecto en taller.</p>
                        </div>
                      </div>
                    )}

                    {selectedProduct.longDesc && (
                      <div className="space-y-2 rounded-2xl border p-4 bg-black/40 border-white/10">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Ficha Técnica &amp; Detalles de Calidad</h4>
                        <p className="text-xs leading-relaxed text-slate-300">{selectedProduct.longDesc}</p>
                      </div>
                    )}

                    {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Especificaciones Técnicas:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedProduct.specs.map((spec, i) => (
                            <li key={i} className="text-xs flex items-center gap-2 text-slate-300">
                              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProduct.compatibility && (
                      <div className="p-3.5 bg-red-950/20 border border-red-500/25 rounded-2xl text-xs text-zinc-200 flex items-center gap-3 shadow-md mb-2">
                        <ShieldCheck size={18} className="text-red-500 shrink-0" />
                        <span><strong className="text-white">Compatibilidad de Vehículos:</strong> {selectedProduct.compatibility}</span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Modal Footer CTA */}
              <div className="p-4 sm:p-6 border-t border-white/10 bg-black/70 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-zinc-400">Total:</span>
                  <span className="text-2xl font-black text-white font-mono">
                    {parsePrice(selectedProduct.price) > 0 ? `$${parsePrice(selectedProduct.price).toFixed(2)} USD` : selectedProduct.price}
                  </span>
                  {selectedProduct.isImportedUSA && (
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">Envío Directo</span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={getWhatsAppMessage(selectedProduct.title, selectedProduct.price, selectedProduct.partNumber, selectedProduct.isImportedUSA, selectedProduct.stock)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white/10 hover:bg-[#25D366] text-zinc-300 hover:text-black transition-all flex items-center justify-center cursor-pointer border border-white/15"
                    title="Consultar por WhatsApp"
                  >
                    <WhatsAppIcon size={18} />
                  </a>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      addToCart(selectedProduct, 1);
                      setIsCartOpen(true);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider py-3.5 px-7 rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-red-600/25 cursor-pointer"
                  >
                    <ShoppingCart size={17} className="text-white" />
                    <span>Añadir al Carrito</span>
                  </motion.button>
                </div>
              </div>
                    <span>Añadir al Carrito</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE LIGHTBOX */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 cursor-pointer shadow-2xl z-20"
              title="Cerrar imagen grande"
            >
              <X size={26} />
            </button>

            {/* High Resolution Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-4xl max-h-[82vh] w-full h-full flex items-center justify-center relative select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Repuesto en Alta Definición"
                className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-white/10"
                decoding="async"
              />
            </motion.div>
            <span className="text-xs text-zinc-400 mt-4 font-medium tracking-wide">
              Toca o haz clic en cualquier lugar para cerrar
            </span>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Toast Notificación flotante de repuesto agregado */}
        <AnimatePresence>
          {toastItem && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 bg-[#12141c]/95 backdrop-blur-xl border border-red-500/50 text-white py-2 px-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-[92vw] pointer-events-auto"
              style={{ boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(220, 38, 38, 0.25)' }}
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-black border border-red-500/40 shrink-0 shadow-sm">
                <img src={toastItem.img} alt={toastItem.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-black text-white uppercase tracking-wide">¡Añadido al Carrito!</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-medium truncate max-w-[170px] sm:max-w-[260px]">
                  {toastItem.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(true);
                  setToastItem(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl transition-all shadow-md shrink-0 cursor-pointer hover:scale-105 active:scale-95"
              >
                Ver Carrito
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flying Orb to Cart Animation */}
        <AnimatePresence>
          {flyingItems.map(item => (
            <motion.div
              key={item.id}
              initial={{
                position: 'fixed',
                left: item.startX - 22,
                top: item.startY - 22,
                scale: 1,
                opacity: 1,
                zIndex: 9999,
                pointerEvents: 'none'
              }}
              animate={{
                left: item.targetX,
                top: [item.startY - 22, Math.min(item.startY, item.targetY) - 50, item.targetY],
                scale: [1, 1.2, 0.45],
                opacity: [1, 1, 0.9, 0],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.25, 1, 0.5, 1]
              }}
              className="w-11 h-11 rounded-full overflow-hidden border-2 border-red-500 bg-black flex items-center justify-center pointer-events-none ring-4 ring-red-500/20"
              style={{ 
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.85), 0 8px 16px rgba(0,0,0,0.5)' 
              }}
            >
              <img src={item.img} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Floating Cart Button */}
        <AnimatePresence>
          {cartTotalItems > 0 && (
            <motion.button
              key={`cart-btn-${cartBump}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: cartBump > 0 ? [1, 1.18, 0.94, 1.05, 1] : 1,
                rotate: cartBump > 0 ? [0, -3, 3, -1, 0] : 0,
                y: 0 
              }}
              transition={{ 
                duration: cartBump > 0 ? 0.4 : 0.25,
                type: "spring",
                stiffness: 400,
                damping: 18
              }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={() => setIsCartOpen(true)}
              className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-full shadow-2xl shadow-red-600/40 border border-red-400 flex items-center gap-3.5 hover:scale-[1.03] transition-transform cursor-pointer ring-4 ring-black/50"
            >
              {cartBump > 0 && (
                <motion.span
                  key={`glow-${cartBump}`}
                  initial={{ scale: 0.9, opacity: 0.8 }}
                  animate={{ scale: 1.65, opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-red-400 pointer-events-none"
                />
              )}
              <div className="relative">
                <ShoppingCart size={20} className="text-white" />
                <motion.span 
                  key={`badge-${cartTotalItems}`}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 600, damping: 15 }}
                  className="absolute -top-2.5 -right-2.5 bg-black text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-red-500"
                >
                  {cartTotalItems}
                </motion.span>
              </div>
              <div className="flex flex-col items-start leading-none text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">Mi Carrito</span>
                <span className="text-sm font-black text-white">${cartTotalAmount.toFixed(2)} USD</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* MODAL / SLIDE-OVER DE MI CARRITO DE REPUESTOS */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isCartOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="carrito-modal rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-6 max-h-[92vh] flex flex-col bg-[#12141a] border border-red-500/40"
              >
                {/* Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-red-950/60 via-slate-900 to-red-950/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shrink-0 bg-red-500/20 border border-red-500/40 text-red-500">
                      <ShoppingCart size={20} />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black uppercase tracking-tight flex items-center gap-2 text-white">
                        <span>Mi Carrito de Repuestos</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                          {cartTotalItems} {cartTotalItems === 1 ? 'pieza' : 'piezas'}
                        </span>
                      </h2>
                      <p className="text-xs mt-0.5 text-slate-300">
                        Selecciona cantidades y envía el pedido completo a nuestros asesores por WhatsApp.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full transition-colors cursor-pointer bg-white/10 text-white hover:bg-white/20"
                    title="Cerrar carrito"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
                  {cartSuccess ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '2px solid #22c55e', color: '#4ade80' }}>
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: '#ffffff' }}>¡Pedido Enviado a WhatsApp!</h3>
                      <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed" style={{ color: '#e2e8f0' }}>
                        Se ha generado el desglose de tu pedido multielemento. El equipo de MasterTech revisará el stock y te confirmará disponibilidad inmediata.
                      </p>
                      <div className="flex gap-3 justify-center pt-3">
                        <button
                          type="button"
                          onClick={() => { clearCart(); setCartSuccess(false); setIsCartOpen(false); }}
                          className="btn-primary !py-3 !px-8 text-xs font-black uppercase tracking-wider border-none shadow-xl cursor-pointer hover:scale-105 transition-transform bg-red-600 text-white"
                        >
                          Vaciar Carrito y Continuar
                        </button>
                      </div>
                    </div>
                  ) : cart.length === 0 ? (
                    <div
                      className="text-center py-12 space-y-4 flex flex-col items-center justify-center text-white"
                    >
                      <ShoppingBag size={48} className="mx-auto mb-1 text-slate-400" />
                      <h3 className="text-lg font-black text-white">
                        Tu carrito está vacío
                      </h3>
                      <p className="text-xs max-w-xs mx-auto leading-relaxed text-slate-300">
                        Navega por nuestro catálogo y presiona "+ Añadir" en las piezas que necesites para tu vehículo.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="!py-3 !px-8 text-xs font-black uppercase tracking-wider border-none mt-3 mx-auto inline-flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 transition-transform rounded-full bg-red-600 text-white"
                      >
                        Explorar Catálogo
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendCartOrder} className="space-y-4">
                      {/* Itemized List */}
                      <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-1">
                        {cart.map((item) => {
                          const itemPriceNum = parsePrice(item.product.price);
                          const itemSubtotal = (itemPriceNum * item.quantity).toFixed(2);
                          return (
                            <div key={item.product.id} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                              <img src={item.product.img} alt={item.product.title} className="w-14 h-14 object-cover rounded-xl shrink-0 border border-white/10 bg-black" />
                              
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold truncate text-slate-100">{item.product.title}</h4>
                                {item.product.partNumber && (
                                  <span className="text-[10px] font-mono block mt-0.5 text-slate-400">#{item.product.partNumber}</span>
                                )}
                                <span className="text-xs font-black block mt-0.5 text-white">{item.product.price} <span className="text-[10px] font-normal text-slate-400">/ c/u</span></span>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-1.5 rounded-xl p-1 bg-black/60 border border-white/15">
                                <button
                                  type="button"
                                  onClick={() => updateCartQty(item.product.id, -1)}
                                  className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer transition-colors bg-white/10 hover:bg-red-600 text-white"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-bold text-xs px-2 min-w-[1.5rem] text-center text-white">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateCartQty(item.product.id, 1)}
                                  className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer transition-colors bg-white/10 hover:bg-red-600 text-white"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              {/* Subtotal & Trash */}
                              <div className="text-right shrink-0 min-w-[70px]">
                                <span className="text-xs font-black block text-white">${itemSubtotal}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-[10px] mt-1 flex items-center gap-0.5 justify-end ml-auto cursor-pointer text-slate-400 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Order Calculation Summary Box */}
                      <div className="p-4 rounded-2xl space-y-2 bg-gradient-to-r from-red-950/30 via-slate-900 to-red-950/30 border border-red-500/30">
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Cantidad Total de Repuestos:</span>
                          <span className="font-bold text-white">{cartTotalItems} unidades</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 text-sm font-black border-t border-white/10">
                          <span className="uppercase tracking-wider text-white">Monto Total Estimado:</span>
                          <span className="text-xl font-display text-white font-mono">${cartTotalAmount.toFixed(2)} USD</span>
                        </div>
                      </div>

                      {/* Customer Inputs */}
                      <div className="space-y-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-white">
                          <User size={13} className="text-red-500" />
                          <span>Datos del Solicitante (Para Enviar Presupuesto)</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <input
                            type="text"
                            required
                            placeholder="Tu Nombre *"
                            value={cartClient.name}
                            onChange={(e) => setCartClient({ ...cartClient, name: e.target.value })}
                            className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                            style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Teléfono / WhatsApp *"
                            value={cartClient.phone}
                            onChange={(e) => setCartClient({ ...cartClient, phone: e.target.value })}
                            className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                            style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
                          />
                          <input
                            type="text"
                            placeholder="Vehículo (Ej. Jeep 2018)"
                            value={cartClient.vehicle}
                            onChange={(e) => setCartClient({ ...cartClient, vehicle: e.target.value })}
                            className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                            style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          <input
                            type="text"
                            placeholder="Ubicación (Ej. Porlamar, Margarita)"
                            value={cartClient.location}
                            onChange={(e) => setCartClient({ ...cartClient, location: e.target.value })}
                            className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                            style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
                          />
                          <input
                            type="text"
                            placeholder="Notas o detalles adicionales (Opcional)"
                            value={cartClient.notes}
                            onChange={(e) => setCartClient({ ...cartClient, notes: e.target.value })}
                            className="w-full rounded-xl px-3 py-2 text-xs outline-none"
                            style={{ backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={clearCart}
                          className="px-4 py-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer hover:bg-white/10"
                          style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: '#f1f5f9' }}
                        >
                          Vaciar
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmittingCart}
                          className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-black font-black uppercase text-xs tracking-wider py-3.5 px-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                          style={{ color: '#000000' }}
                        >
                          <WhatsAppIcon size={18} />
                          <span>{isSubmittingCart ? 'Procesando...' : `Enviar Pedido (${cartTotalItems} piezas - $${cartTotalAmount.toFixed(2)})`}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#08090b] border-t border-white/10 py-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <img src={config.LOGO_URL || "/logo.png"} alt="MasterTech" className="h-8 mx-auto opacity-80 logo-gold object-contain" />
          <p>© {new Date().getFullYear()} Taller MasterTech. Todos los derechos reservados. Repuestos y Tecnología Automotriz.</p>
        </div>
      </footer>

      {/* Floating Hideable Bubble Widget: Live Exchange Rates & Budget Calculator */}
      <BrechaCambiariaPanel />
    </div>
  );
}
