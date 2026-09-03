import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './Navbar';
import { ChevronLeft, Search, Tag, Filter, CheckCircle2, Check, ShieldCheck, ArrowRight, ExternalLink, Package, X, Wrench, Plane, Send, Car, User, MapPin, ShoppingCart, Plus, Minus, Trash2, ShoppingBag, ZoomIn, Disc, Zap, Droplets, Sparkles, Layers, Flame, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrechaCambiariaPanel from './components/BrechaCambiariaPanel';

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
    title: "Conjunto de Disco Perforado & Cáliper Brembo MasterTech",
    category: "Frenos & Discos",
    price: "$185.00",
    desc: "Módulo integral MasterTech con disco ranurado ventilado y cáliper Brembo de 4 pistones.",
    longDesc: "Ensamble MasterTech Performance: disco ranurado perforado con disipación térmica y pinza de 4 pistones para frenadas precisas.",
    img: "/assets/cat_frenos_discos.jpg",
    badge: "MasterTech Brembo",
    specs: ["Cáliper 4 pistones alto torque", "Disco ranurado térmico MasterTech", "Ensamble directo Plug & Play"],
    compatibility: "Vehículos deportivos y SUVs seleccionadas",
    partNumber: "MT-STR-BRK-4P",
    stock: 4,
    isImportedUSA: true
  },
  {
    id: 2,
    title: "Pastillas de Freno Cerámicas Premium MasterTech (Juego Delantero)",
    category: "Frenos & Discos",
    price: "$55.00",
    desc: "Pastillas cerámicas MasterTech de baja emisión de polvo, frenado silencioso y máxima adherencia térmica.",
    longDesc: "Fórmula de fricción MasterTech: previene chirridos metálicos y disminuye el desgaste de los discos de freno.",
    img: "/assets/promo_brakes_caliper.jpg",
    badge: "MasterTech Brakes",
    specs: ["Compuesto 100% cerámico MasterTech", "Libre de polvo metálico", "Resistencia superior a 600°C"],
    compatibility: "Vehículos Japoneses, Americanos y Coreanos",
    partNumber: "MT-BP-CER-8842",
    stock: 12,
    isImportedUSA: true
  },

  // 2. Suspensión & Amortiguadores
  {
    id: 3,
    title: "Juego de Coilovers & Amortiguadores MasterTech Pro (Par)",
    category: "Suspensión & Amortiguadores",
    price: "$120.00",
    desc: "Amortiguadores dobles MasterTech presurizados con nitrógeno y resortes reforzados para máxima estabilidad.",
    longDesc: "Línea oficial MasterTech Racing: resortes progresivos de aleación con recubrimiento electrostático y vástagos cromados de alta fricción.",
    img: "/assets/cat_suspension_amortiguadores.jpg",
    badge: "MasterTech Pro",
    specs: ["Doble tubo a gas nitrógeno", "Certificación MasterTech OEM", "Ajuste de precarga y altura"],
    compatibility: "Jeep, Toyota, Ford, Chevrolet, Dodge",
    partNumber: "MT-COIL-PRO-2024",
    stock: 8,
    isImportedUSA: true
  },
  {
    id: 4,
    title: "Coilover Deportivo MasterTech Pro con Muelle Helicoidal",
    category: "Suspensión & Amortiguadores",
    price: "$95.00",
    desc: "Amortiguador deportivo con muelle helicoidal y válvula de control de rebote para pista o calle.",
    longDesc: "Ingeniería MasterTech Suspension: respuesta inmediata de estabilidad con mínima oscilación en curvas.",
    img: "/assets/promo_suspension_spring.jpg",
    badge: "MasterTech Pro",
    specs: ["Muelle helicoidal reforzado", "Vástago cromado de baja fricción", "Ajuste milimétrico"],
    compatibility: "Vehículos livianos y sedanes",
    partNumber: "MT-SUSP-SP-90",
    stock: 6,
    isImportedUSA: true
  },

  // 3. Aceites & Lubricantes
  {
    id: 5,
    title: "Kit Aceite MasterTech 100% Sintético 5W-30 + Filtro OEM",
    category: "Aceites & Lubricantes",
    price: "$45.00",
    desc: "Aceite 100% sintético MasterTech con aditivos antifricción de última generación y filtro OEM.",
    longDesc: "Fórmula exclusiva MasterTech Lubricants: reduce el rozamiento térmico en motores modernos y protege en frío.",
    img: "/assets/cat_aceites_lubricantes.jpg",
    badge: "MasterTech Oil",
    specs: ["Sintético API SP / ILSAC GF-6A", "Incluye filtro de aceite MasterTech", "Soporta altas temperaturas"],
    compatibility: "Jeep, Toyota, Honda, Nissan, Dodge, Lexus, Hyundai",
    partNumber: "MT-SYN-5W30-OEM",
    stock: 20,
    isImportedUSA: true
  },
  {
    id: 6,
    title: "Fluido Sintético de Transmisión Automática ATF MasterTech (Galón)",
    category: "Aceites & Lubricantes",
    price: "$38.00",
    desc: "Fluido de transmisión de alto desempeño para cajas automáticas secuenciales y CVT.",
    longDesc: "Protección térmica contra fricción y deslizamiento en cambios de marcha continuos bajo climas cálidos.",
    img: "/assets/cat_aceites_lubricantes.jpg",
    badge: "MasterTech Fluid",
    specs: ["Compatible Dexron VI / Mercon LV", "Protección antidesgaste", "Alta estabilidad térmica"],
    compatibility: "Transmisiones automáticas multimarca",
    partNumber: "MT-ATF-SYN-4L",
    stock: 14,
    isImportedUSA: true
  },

  // 4. Baterías & Electricidad
  {
    id: 7,
    title: "Batería MasterTech AGM Alta Potencia 600A / 700A",
    category: "Baterías & Electricidad",
    price: "$85.00",
    desc: "Batería sellada MasterTech de aleación plata-calcio de alta resistencia para arranques inmediatos.",
    longDesc: "Energía de precisión MasterTech: bornes de bronce y carcasa de carbono para climas exigentes.",
    img: "/assets/cat_baterias_electricidad.jpg",
    badge: "MasterTech Power",
    specs: ["Sellada libre de mantenimiento", "Garantía MasterTech 12 Meses", "Placas reforzadas"],
    compatibility: "Universal 12V vehículos livianos y camionetas",
    partNumber: "MT-BAT-AGM-700",
    stock: 15,
    isImportedUSA: false
  },
  {
    id: 8,
    title: "Alternador de Alto Rendimiento 140A MasterTech Heavy Duty",
    category: "Baterías & Electricidad",
    price: "$165.00",
    desc: "Alternador reforzado de 140 amperios con regulador interno de voltaje para alta demanda eléctrica.",
    longDesc: "Componente MasterTech Electrical: garantiza alimentación estable para sistemas de audio, iluminación LED y aire acondicionado.",
    img: "/assets/cat_baterias_electricidad.jpg",
    badge: "MasterTech Heavy Duty",
    specs: ["Salida 140 Amperios 12V", "Bobinado de cobre de alta pureza", "Regulador electrónico integrado"],
    compatibility: "Camionetas, SUVs y sistemas con accesorios",
    partNumber: "MT-ALT-140A-HD",
    stock: 5,
    isImportedUSA: true
  },

  // 5. Filtros & Consumibles
  {
    id: 9,
    title: "Filtro de Aire Cónico de Alto Flujo MasterTech Performance",
    category: "Filtros & Consumibles",
    price: "$42.00",
    desc: "Filtro de aire cónico de algodón plisado lavable y reutilizable para mayor entrada de flujo de aire.",
    longDesc: "Línea MasterTech AirFlow: maximiza la respuesta de aceleración y protege el motor contra partículas finas.",
    img: "/assets/cat_filtros_oem.jpg",
    badge: "MasterTech High Flow",
    specs: ["Malla de algodón lavable", "Cuello de 3 pulgadas adaptable", "Incremento de flujo de aire hasta +25%"],
    compatibility: "Sistemas de inducción directa y tomas universales",
    partNumber: "MT-AF-CONE-RED",
    stock: 18,
    isImportedUSA: true
  },
  {
    id: 10,
    title: "Kit de Diagnóstico & Microfiltros de Inyección MasterTech",
    category: "Filtros & Consumibles",
    price: "$35.00",
    desc: "Kit de microfiltros, sellos vitón y componentes OEM para mantenimiento de inyección electrónica.",
    longDesc: "Componentes MasterTech OEM: previene fugas de combustible y asegura pulverización uniforme en inyectores.",
    img: "/assets/cat_filtros_oem.jpg",
    badge: "MasterTech OEM",
    specs: ["Sellos Vitón de alta presión", "Microfiltros de precisión", "Garantía de estanqueidad"],
    compatibility: "Inyectores Bosch, Denso, Delphi, Magneti Marelli",
    partNumber: "MT-INJ-KIT-OEM",
    stock: 25,
    isImportedUSA: true
  },

  // 6. Fluidos & Climatización
  {
    id: 11,
    title: "Kit de Servicio A/A Gas Refrigerante R134a + Aceite PAG MasterTech",
    category: "Fluidos & Climatización",
    price: "$48.00",
    desc: "Garrafa de gas ecológico R134a MasterTech con lubricante sintético PAG para compresores de A/A.",
    longDesc: "Enfriamiento instantáneo MasterTech: restaura la presión óptima y la temperatura del sistema de climatización.",
    img: "/assets/cat_climatizacion.jpg",
    badge: "MasterTech A/C",
    specs: ["Gas refrigerante puro R134a", "Aceite sintético PAG ISO 46/100", "Detector UV antifugas incluido"],
    compatibility: "Sistemas de aire acondicionado automotriz R134a",
    partNumber: "MT-AC-R134A-KIT",
    stock: 16,
    isImportedUSA: true
  },
  {
    id: 12,
    title: "Refrigerante / Anticongelante 50/50 MasterTech Long Life (Galón)",
    category: "Fluidos & Climatización",
    price: "$22.00",
    desc: "Coolant prediluido con tecnología OAT para protección del radiador, bomba de agua y bloque de motor.",
    longDesc: "Protección térmica contra sobrecalentamiento y corrosión galvánica en motores de aluminio.",
    img: "/assets/cat_climatizacion.jpg",
    badge: "MasterTech Coolant",
    specs: ["Fórmula 50/50 lista para usar", "Protección anticorrosiva OAT", "Punto de ebullición hasta 129°C"],
    compatibility: "Todos los radiadores y motores gasolina/diésel",
    partNumber: "MT-COOL-5050-GL",
    stock: 30,
    isImportedUSA: true
  },

  // 7. Inyección & Motor
  {
    id: 13,
    title: "Turbocargador MasterTech Garrett Twin Scroll con Líneas de Acero",
    category: "Inyección & Motor",
    price: "$340.00",
    desc: "Turbo MasterTech de geometría avanzada con carcasa pulida, rodamientos cerámicos y líneas malladas.",
    longDesc: "Línea MasterTech Motorsport: balanceado dinámico de fábrica para soportar altas revoluciones y presiones de turbo.",
    img: "/assets/promo_turbo_charger.jpg",
    badge: "MasterTech Turbo",
    specs: ["Carcasa Twin Scroll MasterTech", "Rodamientos cerámicos de alta velocidad", "Líneas de acero inoxidable AN-4"],
    compatibility: "Motores gasolina y diésel turboalimentados",
    partNumber: "MT-TURB-TWIN-SC",
    stock: 3,
    isImportedUSA: true
  },
  {
    id: 14,
    title: "Juego de Inyectores de Alta Precisión Multi-Punto MasterTech (Set x4)",
    category: "Inyección & Motor",
    price: "$90.00",
    desc: "Inyectores de combustible de respuesta ultrarrápida calibrados para pulverización perfecta.",
    longDesc: "Máxima eficiencia de combustión MasterTech: reduce el consumo y optimiza la potencia en aceleración.",
    img: "/assets/promo_turbo_charger.jpg",
    badge: "MasterTech Inyección",
    specs: ["Pulverización multi-orificio de 12 puntos", "Caudal balanceado ±1%", "Conectores estándar OEM"],
    compatibility: "Motores 4 y 6 cilindros",
    partNumber: "MT-INJ-FLOW-4X",
    stock: 9,
    isImportedUSA: true
  },

  // 8. Cuidado & Detailing
  {
    id: 15,
    title: "Kit de Detailing & Cera Cerámica Hidrofóbica MasterTech Gold",
    category: "Cuidado & Detailing",
    price: "$38.00",
    desc: "Sellador cerámico SiO2 con efecto hidrofóbico repelente al agua, polvo y rayos UV.",
    longDesc: "Estética automotriz MasterTech: brillo efecto espejo con protección duradera por hasta 6 meses.",
    img: "/assets/cat_cuidado_estetica.jpg",
    badge: "MasterTech Detailing",
    specs: ["Fórmula SiO2 hidrofóbica", "Brillo profundo efecto cristal", "Incluye aplicador de microfibra"],
    compatibility: "Pinturas automotrices, vidrios y faros",
    partNumber: "MT-CERAMIC-WAX-500",
    stock: 22,
    isImportedUSA: true
  },
  {
    id: 16,
    title: "Champú de Espuma Activa PH Neutro & Toallas Microfibra MasterTech",
    category: "Cuidado & Detailing",
    price: "$25.00",
    desc: "Champú concentrado para cañón de espuma Snow Foam que encapsula la suciedad sin rayar la pintura.",
    longDesc: "Limpieza profesional de carrocería MasterTech: respeta tratamientos cerámicos y ceras preexistentes.",
    img: "/assets/cat_cuidado_estetica.jpg",
    badge: "MasterTech Care",
    specs: ["PH Neutro 100% seguro", "Alta densidad de espuma", "Incluye 2 toallas de 600 GSM"],
    compatibility: "Todo tipo de carrocerías y acabados mate o brillante",
    partNumber: "MT-SNOW-FOAM-1L",
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

export interface CartItem {
  product: CatalogItem;
  quantity: number;
}

export default function Catalogo() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(DEFAULT_CATALOG);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

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
    location: 'Porlamar, Isla de Margarita',
    notes: ''
  });
  const [isSubmittingCart, setIsSubmittingCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  // Subtle & Elegant Cart Animations State
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null);
  const [floatingPlusOne, setFloatingPlusOne] = useState<{ id: number; key: number } | null>(null);
  const [cartBump, setCartBump] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('mastertech_cart_items', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const addToCart = (product: CatalogItem, qty: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { product, quantity: qty }];
    });

    // Feedback sutil: botón muestra "¡Agregado!" brevemente
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(prev => (prev === product.id ? null : prev));
    }, 750);

    // Sutil indicador +1 flotante
    setFloatingPlusOne({ id: product.id, key: Date.now() });
    setTimeout(() => {
      setFloatingPlusOne(prev => (prev?.id === product.id ? null : prev));
    }, 800);

    // Respiración sutil en el carrito flotante
    setCartBump(prev => prev + 1);
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
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
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
          notes: `[SOLICITUD CARRITO DE REPUESTOS]\nTotal: $${cartTotalAmount.toFixed(2)} USD\nItems:\n${cart.map(i => `- ${i.quantity}x ${i.product.title} (#${i.product.partNumber || 'N/A'})`).join('\n')}`
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
• *Ubicación:* _${cartClient.location}_

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

    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          let currentLocal: any = null;
          try {
            const stored = localStorage.getItem('mastertech_settings_store');
            if (stored) currentLocal = JSON.parse(stored);
          } catch (e) {}

          // Merge server data with local cache (server data authoritative for catalog if valid)
          const merged = { ...(currentLocal || {}), ...(data || {}) };
          setConfig((prev: any) => ({ ...prev, ...merged }));
          try {
            localStorage.setItem('mastertech_settings_store', JSON.stringify(merged));
            const catalogSource = data?.CATALOG_PRODUCTS_JSON || currentLocal?.CATALOG_PRODUCTS_JSON;
            if (catalogSource) {
              const parsed = typeof catalogSource === 'string' ? JSON.parse(catalogSource) : catalogSource;
              if (Array.isArray(parsed) && parsed.length > 0) {
                setCatalogItems(parsed);
              }
            }
          } catch (e) {}
        }
      } catch (err) {}
    };

    fetchSettings();

    // Listen for live updates from Admin Panel
    const handleAdminSync = () => {
      loadLocalCatalog();
      fetchSettings();
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
    return catalogItems.filter(item => {
      const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.partNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [catalogItems, selectedCategory, searchQuery]);

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
    <div className="min-h-screen bg-[#0D0D0D] text-[#E2E8F0] selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar activePage="catalogo" config={config} />

      {/* Main Container */}
      <main className="pt-24 pb-20 max-w-[1760px] mx-auto px-3 sm:px-6 space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SHOWCASE (INSPIRADO EN EL DISEÑO DE REFERENCIA) */}
        {/* ========================================================================= */}
        <section className="catalogo-hero-card relative rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-14 shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="hero-tag inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-black text-xs uppercase tracking-widest"
              >
                <ShieldCheck size={14} className="text-amber-400" />
                <span>Calidad & Certificación OEM Internacional</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl xl:text-6xl font-display font-black tracking-tight uppercase leading-[1.08] !text-white"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ffffff' }}>Repuestos &</span> <br className="hidden sm:block" />
                <span style={{ color: '#fbbf24', fontStyle: 'italic' }}>Autopartes</span> <span style={{ color: '#ffffff' }}>de Alta Calidad</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0"
                style={{ color: '#cbd5e1' }}
              >
                Frenos cerámicos, suspensión presurizada, lubricantes 100% sintéticos y componentes OEM con stock inmediato en Margarita y despacho express directo desde EE.UU.
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
                  className="btn-primary !py-3.5 !px-8 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer rounded-2xl"
                  style={{ backgroundColor: '#C2A472', color: '#000000', border: 'none' }}
                >
                  <ShoppingCart size={16} style={{ color: '#000000' }} />
                  <span style={{ color: '#000000', fontWeight: 900 }}>Explorar Catálogo</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsUsaModalOpen(true)}
                  className="hero-btn-usa px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                >
                  <Plane size={16} className="text-sky-400" style={{ color: '#38bdf8' }} />
                  <span style={{ color: '#ffffff' }}>Importación USA</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="hero-btn-cart px-5 py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.35)' }}
                >
                  <ShoppingBag size={16} style={{ color: '#fbbf24' }} />
                  <span style={{ color: '#fbbf24' }}>Carrito ({cartTotalItems})</span>
                </button>
              </motion.div>

              {/* Pagination Dots Simulator */}
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-4">
                <span className="w-6 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400/40"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
              </div>
            </div>

            {/* Right 3D Auto Parts Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-6 flex items-center justify-center relative"
            >
              <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden bg-black/50 border border-white/10 p-2 shadow-2xl group">
                <img 
                  src="/assets/autoparts_hero_showcase.jpg" 
                  alt="Auto Parts Showcase MasterTech"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                      <Flame size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-black" style={{ color: '#ffffff' }}>Discos & Suspensión Heavy Duty</div>
                      <div className="text-[10px]" style={{ color: '#cbd5e1' }}>Rendimiento garantizado en pista y carretera</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/30">
                    OEM 100%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: POPULAR CATEGORIES (CATEGORÍAS POPULARES EN GRID COMO REFERENCIA) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">Exploración Rápida</span>
              </div>
              <h2 className="section-heading-dark text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                <span>Categorías</span> <span className="text-amber-400 italic">Populares</span>
              </h2>
            </div>
            <p className="section-subheading-dark text-xs text-zinc-400 max-w-sm">
              Haz clic en cualquier categoría para filtrar automáticamente el inventario en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Frenos & Discos", label: "Frenos & Discos", icon: <Disc size={20} className="text-amber-400" />, img: "/assets/cat_frenos_discos.jpg", desc: "Pastillas cerámicas y discos ranurados" },
              { name: "Suspensión & Amortiguadores", label: "Suspensión & Amortiguadores", icon: <Layers size={20} className="text-amber-400" />, img: "/assets/cat_suspension_amortiguadores.jpg", desc: "Coilovers y amortiguadores de gas" },
              { name: "Aceites & Lubricantes", label: "Aceites & Lubricantes", icon: <Droplets size={20} className="text-amber-400" />, img: "/assets/cat_aceites_lubricantes.jpg", desc: "Sintéticos 5W-30 y fluidos ATF" },
              { name: "Baterías & Electricidad", label: "Baterías & Electricidad", icon: <Zap size={20} className="text-amber-400" />, img: "/assets/cat_baterias_electricidad.jpg", desc: "Baterías AGM y alternadores 140A" },
              { name: "Filtros & Consumibles", label: "Filtros & Consumibles", icon: <Package size={20} className="text-amber-400" />, img: "/assets/cat_filtros_oem.jpg", desc: "Filtros de aire, aceite y microfiltros" },
              { name: "Fluidos & Climatización", label: "Fluidos & Climatización A/A", icon: <Sparkles size={20} className="text-amber-400" />, img: "/assets/cat_climatizacion.jpg", desc: "Gas R134a, refrigerantes y A/A" },
              { name: "Inyección & Motor", label: "Inyección & Motor", icon: <Gauge size={20} className="text-amber-400" />, img: "/assets/promo_turbo_charger.jpg", desc: "Turbocargadores e inyectores" },
              { name: "Cuidado & Detailing", label: "Cuidado & Detailing", icon: <Car size={20} className="text-amber-400" />, img: "/assets/cat_cuidado_estetica.jpg", desc: "Ceras cerámicas, champú y microfibras" }
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
                  className={`catalogo-category-card p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 group select-none shadow-md ${
                    isSelected
                      ? 'is-selected ring-2 ring-amber-400 bg-amber-500/15 border-amber-400'
                      : 'bg-[#12141a]/90 border-white/10 hover:border-amber-400/40 hover:bg-[#161822]'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-[#0c0e14] border border-white/10 shrink-0 p-0.5 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    <img 
                      src={catItem.img} 
                      alt={catItem.label} 
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-400 transition-colors leading-tight truncate">
                      {catItem.label}
                    </h4>
                    <span className="category-count text-[10px] font-mono text-amber-400/90 font-bold block mt-0.5">
                      ({count} {count === 1 ? 'producto' : 'productos'})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: PROMO OFFER BANNERS (3 TARJETAS COMO EN LA REFERENCIA) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Promo Card 1: Frenos */}
          <div className="catalogo-promo-card promo-card-frenos p-6 rounded-3xl relative overflow-hidden shadow-xl flex items-center justify-between group hover:border-red-500/50 transition-all">
            <div className="space-y-2 relative z-10 max-w-[60%]">
              <span className="promo-tag text-[10px] font-black uppercase tracking-wider block" style={{ color: '#f87171' }}>Frenos Cerámicos</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight !text-white" style={{ color: '#ffffff' }}>
                Hasta <span style={{ color: '#f87171' }}>30% Off</span>
              </h3>
              <p className="text-[11px]" style={{ color: '#cbd5e1' }}>Pastillas y discos de alta disipación térmica.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("Frenos & Discos");
                  const el = document.getElementById('catalogo-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-black flex items-center gap-1 pt-1 group-hover:underline cursor-pointer !bg-transparent !border-0 !p-0 !shadow-none"
                style={{ background: 'transparent', border: 'none', color: '#f87171', padding: 0 }}
              >
                <span style={{ color: '#f87171' }}>Ver Frenos</span>
                <ArrowRight size={13} style={{ color: '#f87171' }} />
              </button>
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 bg-[#0c0e14]/60 p-1 flex items-center justify-center">
              <img src="/assets/promo_brakes_caliper.jpg" alt="Frenos Cerámicos" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Promo Card 2: Suspensión */}
          <div className="catalogo-promo-card promo-card-suspension p-6 rounded-3xl relative overflow-hidden shadow-xl flex items-center justify-between group hover:border-amber-500/50 transition-all">
            <div className="space-y-2 relative z-10 max-w-[60%]">
              <span className="promo-tag text-[10px] font-black uppercase tracking-wider block" style={{ color: '#fbbf24' }}>Suspensión Pro</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight !text-white" style={{ color: '#ffffff' }}>
                Importación <span style={{ color: '#fbbf24' }}>USA</span>
              </h3>
              <p className="text-[11px]" style={{ color: '#cbd5e1' }}>Amortiguadores presurizados y coilovers.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("Suspensión & Amortiguadores");
                  const el = document.getElementById('catalogo-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-black flex items-center gap-1 pt-1 group-hover:underline cursor-pointer !bg-transparent !border-0 !p-0 !shadow-none"
                style={{ background: 'transparent', border: 'none', color: '#fbbf24', padding: 0 }}
              >
                <span style={{ color: '#fbbf24' }}>Ver Suspensión</span>
                <ArrowRight size={13} style={{ color: '#fbbf24' }} />
              </button>
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 bg-[#0c0e14]/60 p-1 flex items-center justify-center">
              <img src="/assets/promo_suspension_spring.jpg" alt="Suspensión" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Promo Card 3: Inyección y Motores */}
          <div className="catalogo-promo-card promo-card-motor p-6 rounded-3xl relative overflow-hidden shadow-xl flex items-center justify-between group hover:border-blue-500/50 transition-all">
            <div className="space-y-2 relative z-10 max-w-[60%]">
              <span className="promo-tag text-[10px] font-black uppercase tracking-wider block" style={{ color: '#60a5fa' }}>Inyección & Motor</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase leading-tight !text-white" style={{ color: '#ffffff' }}>
                Alto <span style={{ color: '#60a5fa' }}>Rendimiento</span>
              </h3>
              <p className="text-[11px]" style={{ color: '#cbd5e1' }}>Turbos, microfiltros y bombas OEM.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("Inyección & Motor");
                  const el = document.getElementById('catalogo-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-black flex items-center gap-1 pt-1 group-hover:underline cursor-pointer !bg-transparent !border-0 !p-0 !shadow-none"
                style={{ background: 'transparent', border: 'none', color: '#60a5fa', padding: 0 }}
              >
                <span style={{ color: '#60a5fa' }}>Ver Inyección</span>
                <ArrowRight size={13} style={{ color: '#60a5fa' }} />
              </button>
            </div>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 bg-[#0c0e14]/60 p-1 flex items-center justify-center">
              <img src="/assets/promo_turbo_charger.jpg" alt="Turbo e Inyección" className="w-full h-full object-contain" />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: PRODUCT CATALOG & NEW ARRIVALS (NUEVOS INGRESOS / CATÁLOGO) */}
        {/* ========================================================================= */}
        <section id="catalogo-grid" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-zinc-900 dark:text-white section-heading-dark flex items-center gap-2">
                <span>New Arrivals</span> <span className="text-amber-500 font-serif italic text-xl sm:text-2xl">/ Catálogo</span>
              </h2>
              <div className="w-16 h-0.5 bg-amber-500 mt-2 rounded-full" />
            </div>

            {/* Search Box Only */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
              <input 
                type="text"
                placeholder="Buscar repuesto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#12141a] border border-zinc-200 dark:border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-9 pr-7 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none transition-all shadow-sm"
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
          </div>

          {/* Products Grid */}
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-[#12141a] border border-zinc-200 dark:border-white/10 rounded-3xl max-w-md mx-auto shadow-sm">
              <Package size={44} className="text-zinc-400 mb-4 stroke-[1.5]" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No encontramos coincidencias</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm max-w-xs mb-6 leading-relaxed">
                Prueba seleccionando otra categoría de repuesto o busca un término más general.
              </p>
              <button 
                type="button"
                onClick={() => { setSelectedCategory("Todos"); setSearchQuery(""); }}
                className="btn-primary inline-flex items-center justify-center !py-2.5 !px-6 text-xs sm:text-sm font-bold border-none rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer mx-auto"
              >
                Ver Todo el Catálogo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredItems.map((item, idx) => {
                const numericPrice = parsePrice(item.price);
                const oldPrice = (numericPrice * 1.35).toFixed(2);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="catalogo-product-card bg-white dark:bg-[#12141a] border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/80 hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Product Top Image Box: Isolated Display without stark white clashes */}
                    <div 
                      className="relative aspect-square bg-slate-50 dark:bg-[#0c0e14] p-4 sm:p-6 flex items-center justify-center cursor-pointer overflow-hidden group/img"
                      onClick={() => setSelectedProduct(item)}
                    >
                      <img 
                        src={item.img || "/assets/cat_suspension_amortiguadores.jpg"} 
                        alt={item.title}
                        onError={(e) => { (e.target as HTMLImageElement).src = '/assets/promo_brakes_caliper.jpg'; }}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md rounded-xl"
                      />

                      {/* Badge top-left */}
                      {item.badge && (
                        <div className="absolute top-2.5 left-2.5 pointer-events-none">
                          <span className="font-black text-[9px] px-2 py-0.5 rounded-md shadow-lg uppercase tracking-wide leading-tight block max-w-[110px] truncate" style={{ backgroundColor: '#f59e0b', color: '#000000' }}>
                            {item.badge}
                          </span>
                        </div>
                      )}

                      {/* USA chip top-right */}
                      {item.isImportedUSA && (
                        <div className="absolute top-2.5 right-2.5 pointer-events-none">
                          <span className="font-black text-[9px] px-2 py-0.5 rounded-md shadow-lg uppercase tracking-wider" style={{ backgroundColor: '#2563eb', color: '#ffffff', border: '1px solid rgba(147,197,253,0.5)' }}>
                            ✈ USA
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Subtle Thin Divider */}
                    <div className="w-full border-t border-zinc-100 dark:border-white/5" />

                    {/* Product Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-transparent">
                      <div className="space-y-1.5">
                        <h3 
                          onClick={() => setSelectedProduct(item)}
                          className="product-title text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer leading-relaxed line-clamp-2 min-h-[2.7em]"
                          title={item.title}
                        >
                          {item.title}
                        </h3>

                        {/* Price Section (Strikethrough Comparison + Actual Price) */}
                        <div className="flex items-baseline gap-2 pt-0.5">
                          {numericPrice > 0 && (
                            <span className="text-xs text-zinc-400 line-through font-mono">
                              ${oldPrice}
                            </span>
                          )}
                          <span className="product-price text-sm sm:text-base font-black text-amber-400">
                            {item.price}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 flex items-center gap-2 border-t border-white/10">
                        {getItemQuantity(item.id) === 0 || recentlyAddedId === item.id ? (
                          <div className="relative flex-1">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => addToCart(item, 1)}
                              className={`w-full font-black text-xs py-2.5 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                                recentlyAddedId === item.id 
                                  ? 'bg-emerald-500 text-black shadow-emerald-500/25' 
                                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
                              }`}
                            >
                              {recentlyAddedId === item.id ? (
                                <motion.div 
                                  initial={{ scale: 0.8, opacity: 0 }} 
                                  animate={{ scale: 1, opacity: 1 }} 
                                  className="flex items-center gap-1 font-black"
                                >
                                  <Check size={13} strokeWidth={3} />
                                  <span>¡Agregado!</span>
                                </motion.div>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <ShoppingCart size={13} />
                                  <span>Añadir</span>
                                </div>
                              )}
                            </motion.button>

                            {/* Sutil micro +1 flotante que se desvanece suavemente */}
                            <AnimatePresence>
                              {floatingPlusOne?.id === item.id && (
                                <motion.span
                                  key={floatingPlusOne.key}
                                  initial={{ opacity: 1, y: 0, scale: 0.85 }}
                                  animate={{ opacity: 0, y: -22, scale: 1.1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                                  className="absolute -top-1 left-1/2 -translate-x-1/2 font-black text-xs text-amber-300 pointer-events-none drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]"
                                >
                                  +1
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 450, damping: 25 }}
                            className="flex-1 flex items-center justify-between rounded-lg overflow-hidden border border-amber-400 bg-amber-500" 
                            style={{ minHeight: '34px' }}
                          >
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-8 h-[34px] bg-amber-600 hover:bg-amber-700 text-black flex items-center justify-center font-black cursor-pointer transition-colors shrink-0 active:bg-amber-800"
                              title="Restar"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="flex-1 text-center font-black text-black text-xs tracking-wide select-none" style={{ color: '#000000' }}>
                              {getItemQuantity(item.id)} en carrito
                            </span>
                            <button
                              onClick={() => {
                                updateCartQty(item.id, 1);
                                setCartBump(prev => prev + 1);
                                setFloatingPlusOne({ id: item.id, key: Date.now() });
                              }}
                              className="w-8 h-[34px] bg-amber-600 hover:bg-amber-700 text-black flex items-center justify-center font-black cursor-pointer transition-colors shrink-0 active:bg-amber-800"
                              title="Sumar"
                            >
                              <Plus size={12} />
                            </button>
                          </motion.div>
                        )}

                        <a
                          href={getWhatsAppMessage(item.title, item.price, item.partNumber, item.isImportedUSA, item.stock)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black transition-colors cursor-pointer border border-[#25D366]/40"
                          title="Consultar por WhatsApp"
                        >
                          <WhatsAppIcon size={14} />
                        </a>

                        <button
                          onClick={() => {
                            setSelectedProduct(item);
                            setActiveImageIndex(0);
                          }}
                          className="p-2.5 rounded-lg border border-white/10 hover:border-amber-400 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title="Ver Ficha Técnica"
                        >
                          <ZoomIn size={14} />
                        </button>
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
          className="catalogo-usa-banner rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #0d1527 0%, #161f30 50%, #10141d 100%)', borderColor: 'rgba(251, 191, 36, 0.4)', color: '#ffffff' }}
        >
          <div className="space-y-3 max-w-2xl relative z-10">
            <div 
              className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.25)', borderColor: 'rgba(96, 165, 250, 0.5)', color: '#93c5fd' }}
            >
              <Plane size={13} style={{ color: '#60a5fa' }} />
              <span style={{ color: '#93c5fd' }}>Importación Directa desde Miami / EE.UU.</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight !text-white" style={{ color: '#ffffff' }}>
              ¿Buscas un repuesto o componente específico desde USA?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>
              Importamos repuestos originales OEM y alternativos certificados directamente desde EE.UU. para Jeep, Toyota, Honda, Nissan, Dodge, Chrysler, Ford y Lexus. Envíanos tu número de parte OEM o Serial VIN por WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsUsaModalOpen(true)}
            className="usa-banner-btn py-4 px-8 rounded-2xl shrink-0 shadow-2xl flex items-center gap-2 relative z-10 cursor-pointer font-black text-xs uppercase tracking-wider"
            style={{ backgroundColor: '#C2A472', color: '#000000', border: 'none' }}
          >
            <Plane size={18} className="animate-bounce" style={{ color: '#000000' }} />
            <span style={{ color: '#000000', fontWeight: 900 }}>Formulario de Solicitud EE.UU.</span>
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
                  <Tag size={16} className="text-[#C2A472]" />
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
                const currentImg = (allPhotos && allPhotos[activeImageIndex]) || selectedProduct.img || '/assets/servicio-mecanica.jpg';

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
                          />
                          {selectedProduct.badge && (
                            <span className="absolute top-3 left-3 bg-[#C2A472] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg z-10">
                              {selectedProduct.badge}
                            </span>
                          )}
                          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity border border-white/20 shadow-lg">
                            <ZoomIn size={14} className="text-[#C2A472]" />
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
                                    isActive ? 'border-[#C2A472] scale-105 shadow-md shadow-[#C2A472]/30' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                                  }`}
                                >
                                  <img src={photo} alt="" className="w-full h-full object-cover" />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {selectedProduct.partNumber && (
                            <span className="text-xs font-mono font-bold text-[#C2A472] bg-[#C2A472]/15 border border-[#C2A472]/30 px-3 py-1 rounded-full inline-block">
                              N° OEM: {selectedProduct.partNumber}
                            </span>
                          )}

                          <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
                            (selectedProduct.stock ?? 10) > 0 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {(selectedProduct.stock ?? 10) > 0 ? `🟢 ${selectedProduct.stock ?? 10} en Stock` : '🔴 Agotado / Importación USA'}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold leading-snug" style={{ color: '#ffffff' }}>{selectedProduct.title}</h3>
                        <div className="text-2xl font-black font-mono" style={{ color: '#C2A472' }}>{selectedProduct.price}</div>
                        <p className="text-xs leading-relaxed" style={{ color: '#cbd5e1' }}>{selectedProduct.desc}</p>
                      </div>
                    </div>

                    {selectedProduct.isImportedUSA && (
                      <div className="p-4 bg-blue-950/60 border border-blue-500/40 rounded-2xl text-xs text-blue-200 flex items-center gap-3 shadow-md">
                        <div>
                          <strong className="block font-bold" style={{ color: '#ffffff' }}>Repuesto Importado Directamente desde EE.UU.</strong>
                          <p className="text-[11px] mt-0.5" style={{ color: '#93c5fd' }}>Producto con especificaciones originales OEM importado desde EE.UU. Garantía de durabilidad y ajuste perfecto en taller.</p>
                        </div>
                      </div>
                    )}

                    {selectedProduct.longDesc && (
                      <div className="space-y-2 rounded-2xl border p-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.1)' }}>
                        <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: '#e2e8f0' }}>Ficha Técnica &amp; Detalles de Calidad</h4>
                        <p className="text-xs leading-relaxed" style={{ color: '#cbd5e1' }}>{selectedProduct.longDesc}</p>
                      </div>
                    )}

                    {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: '#e2e8f0' }}>Especificaciones Técnicas:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedProduct.specs.map((spec, i) => (
                            <li key={i} className="text-xs flex items-center gap-2" style={{ color: '#cbd5e1' }}>
                              <CheckCircle2 size={14} className="text-[#C2A472] shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProduct.compatibility && (
                      <div className="p-3.5 bg-[#C2A472]/10 border border-[#C2A472]/25 rounded-2xl text-xs text-zinc-200 flex items-center gap-3 shadow-md mb-2">
                        <ShieldCheck size={18} className="text-[#C2A472] shrink-0" />
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
                  <span className="text-2xl font-black text-amber-400 font-mono">{selectedProduct.price}</span>
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
                    className="flex-1 sm:flex-none bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-black uppercase tracking-wider py-3.5 px-7 rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 cursor-pointer"
                  >
                    <ShoppingCart size={17} className="text-black" />
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
              />
            </motion.div>
            <span className="text-xs text-zinc-400 mt-4 font-medium tracking-wide">
              Toca o haz clic en cualquier lugar para cerrar
            </span>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Floating Cart Button - Sutil y elegante */}
        <AnimatePresence>
          {cartTotalItems > 0 && (
            <motion.button
              key="floating-cart-btn"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ 
                opacity: 1, 
                scale: cartBump > 0 ? [1, 1.07, 1] : 1,
                y: 0 
              }}
              transition={{ 
                duration: 0.35,
                ease: [0.25, 1, 0.5, 1]
              }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              onClick={() => setIsCartOpen(true)}
              className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-500 via-amber-400 to-primary text-black font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-full shadow-2xl shadow-amber-500/30 border border-amber-300 flex items-center gap-3.5 hover:scale-[1.03] transition-transform cursor-pointer ring-4 ring-black/50"
            >
              {/* Sutil pulso de luz ambiental cuando se añade */}
              {cartBump > 0 && (
                <motion.span
                  key={`pulse-${cartBump}`}
                  initial={{ scale: 0.95, opacity: 0.7 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-amber-300 pointer-events-none"
                />
              )}
              <div className="relative">
                <ShoppingCart size={20} className="text-black" />
                <motion.span 
                  key={`badge-${cartTotalItems}`}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -top-2.5 -right-2.5 bg-black text-amber-300 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-amber-400"
                >
                  {cartTotalItems}
                </motion.span>
              </div>
              <div className="flex flex-col items-start leading-none text-black">
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/85">Mi Carrito</span>
                <span className="text-sm font-black text-black">${cartTotalAmount.toFixed(2)} USD</span>
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
                className="carrito-modal rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-6 max-h-[92vh] flex flex-col"
                style={{ backgroundColor: '#12141a', border: '1px solid rgba(245,158,11,0.4)' }}
              >
                {/* Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(to right, #1c1810, #12141a, #1c1810)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shrink-0" style={{ backgroundColor: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', color: '#fbbf24' }}>
                      <ShoppingCart size={20} />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black uppercase tracking-tight flex items-center gap-2" style={{ color: '#ffffff' }}>
                        <span>Mi Carrito de Repuestos</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(245,158,11,0.2)', color: '#fcd34d', border: '1px solid rgba(245,158,11,0.4)' }}>
                          {cartTotalItems} {cartTotalItems === 1 ? 'pieza' : 'piezas'}
                        </span>
                      </h2>
                      <p className="text-xs mt-0.5" style={{ color: '#71717a' }}>
                        Selecciona cantidades y envía el pedido completo a nuestros asesores por WhatsApp.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full transition-colors cursor-pointer"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#71717a' }}
                    title="Cerrar carrito"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
                  {cartSuccess ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto text-2xl">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-white">¡Pedido Enviado a WhatsApp!</h3>
                      <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                        Se ha generado el desglose de tu pedido multielemento. El equipo de MasterTech revisará el stock y te confirmará disponibilidad inmediata.
                      </p>
                      <div className="flex gap-3 justify-center pt-2">
                        <button
                          type="button"
                          onClick={() => { clearCart(); setCartSuccess(false); setIsCartOpen(false); }}
                          className="btn-primary !py-2.5 !px-6 text-xs border-none"
                        >
                          Vaciar Carrito y Continuar
                        </button>
                      </div>
                    </div>
                  ) : cart.length === 0 ? (
                    <div className="text-center py-12 space-y-4 flex flex-col items-center justify-center">
                      <ShoppingBag size={48} className="mx-auto text-zinc-500 mb-1" />
                      <h3 className="text-lg font-black text-white">Tu carrito está vacío</h3>
                      <p className="text-zinc-400 text-xs max-w-xs mx-auto leading-relaxed">
                        Navega por nuestro catálogo y presiona "+ Agregar al Carrito" en las piezas que necesites.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="btn-primary !py-3 !px-8 text-xs font-black uppercase tracking-wider border-none mt-3 mx-auto inline-flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 transition-transform"
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
                            <div key={item.product.id} className="flex items-center justify-between gap-3 p-3 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                              <img src={item.product.img} alt={item.product.title} className="w-14 h-14 object-cover rounded-xl shrink-0" style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#000' }} />
                              
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold truncate" style={{ color: '#f1f5f9' }}>{item.product.title}</h4>
                                {item.product.partNumber && (
                                  <span className="text-[10px] font-mono block mt-0.5" style={{ color: '#71717a' }}>#{item.product.partNumber}</span>
                                )}
                                <span className="text-xs font-black block mt-0.5" style={{ color: '#fbbf24' }}>{item.product.price} <span className="text-[10px] font-normal" style={{ color: '#71717a' }}>/ c/u</span></span>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-1.5 rounded-xl p-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                <button
                                  type="button"
                                  onClick={() => updateCartQty(item.product.id, -1)}
                                  className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer transition-colors hover:bg-amber-500"
                                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-bold text-xs px-2 min-w-[1.5rem] text-center" style={{ color: '#ffffff' }}>{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateCartQty(item.product.id, 1)}
                                  className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer transition-colors hover:bg-amber-500"
                                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                                >
                                  <Plus size={12} />
                                </button>
                              </div>

                              {/* Subtotal & Trash */}
                              <div className="text-right shrink-0 min-w-[70px]">
                                <span className="text-xs font-black block" style={{ color: '#ffffff' }}>${itemSubtotal}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-[10px] mt-1 flex items-center gap-0.5 justify-end ml-auto cursor-pointer hover:text-red-400 transition-colors"
                                  style={{ color: '#71717a' }}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Order Calculation Summary Box */}
                      <div className="p-4 rounded-2xl space-y-2" style={{ background: 'linear-gradient(to right, rgba(245,158,11,0.1), rgba(22,24,34,1), rgba(245,158,11,0.1))', border: '1px solid rgba(245,158,11,0.3)' }}>
                        <div className="flex justify-between items-center text-xs" style={{ color: '#71717a' }}>
                          <span>Cantidad Total de Repuestos:</span>
                          <span className="font-bold" style={{ color: '#ffffff' }}>{cartTotalItems} unidades</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 text-sm font-black" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <span className="uppercase tracking-wider" style={{ color: '#ffffff' }}>Monto Total Estimado:</span>
                          <span className="text-xl font-display" style={{ color: '#fbbf24' }}>${cartTotalAmount.toFixed(2)} USD</span>
                        </div>
                      </div>

                      {/* Customer Inputs */}
                      <div className="space-y-3 p-3.5 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#ffffff' }}>
                          <User size={13} style={{ color: '#fbbf24' }} />
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
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={clearCart}
                          className="px-3 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                        >
                          Vaciar
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmittingCart}
                          className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-black font-black uppercase text-xs tracking-wider py-3.5 px-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
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
