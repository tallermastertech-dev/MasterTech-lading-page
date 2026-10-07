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
  Check,
  FileText,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  Package,
  ChevronDown,
  ChevronUp,
  X
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

export const BinanceIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <div style={{ width: size, height: size }} className={`shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-black ${className}`}>
    <img src="/assets/logo_binance.png" alt="Binance Pay" className="w-full h-full object-cover select-none pointer-events-none" />
  </div>
);

export const ZelleIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <div style={{ width: size, height: size }} className={`shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-[#7414CA] ${className}`}>
    <img src="/assets/logo_zelle.png" alt="Zelle" className="w-full h-full object-cover select-none pointer-events-none" />
  </div>
);

export const BanescoPanamaIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <rect width="40" height="40" rx="9" fill="#007A33" />
    {/* Banesco ribbon wave in white and golden-yellow */}
    <path 
      d="M10 23.5C10 23.5 13 13.5 21.5 13.5C26.5 13.5 28.5 16.5 28.5 19.5C28.5 23 25 25.8 19 25.8C15 25.8 12 24.8 12 24.8" 
      stroke="white" 
      strokeWidth="3.2" 
      strokeLinecap="round" 
    />
    <path 
      d="M14 27.8C17.5 29.5 23.5 29.2 27.5 26.8" 
      stroke="#FFC72C" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    {/* PA badge */}
    <rect x="23" y="6" width="13" height="8" rx="2" fill="#004D20" stroke="white" strokeWidth="0.8" />
    <text x="29.5" y="12.2" fill="white" fontSize="5.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">PA</text>
  </svg>
);

export const CashUsdIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <rect width="40" height="40" rx="9" fill="#059669"/>
    <rect x="7" y="11" width="26" height="18" rx="3" stroke="white" strokeWidth="2.2"/>
    <circle cx="20" cy="20" r="4.5" stroke="white" strokeWidth="2"/>
    <text x="20" y="23.5" fill="white" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">$</text>
  </svg>
);

export const MetodosPagoJornada = ({ compact = false }: { compact?: boolean }) => {
  return (
    <div className={`grid ${compact ? 'grid-cols-2 sm:grid-cols-4 gap-2' : 'grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3'}`}>
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 shadow-sm">
        <CashUsdIcon size={compact ? 26 : 32} className="shrink-0 rounded-lg shadow-sm" />
        <div className="min-w-0">
          <span className="text-xs font-black text-slate-900 dark:text-white block truncate">Efectivo ($ USD)</span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 block truncate">Billetes en buen estado</span>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 shadow-sm">
        <ZelleIcon size={compact ? 26 : 32} className="shadow-sm" />
        <div className="min-w-0">
          <span className="text-xs font-black text-slate-900 dark:text-white block truncate">Zelle</span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 block truncate">Directo USD</span>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 shadow-sm">
        <BinanceIcon size={compact ? 26 : 32} className="shadow-sm" />
        <div className="min-w-0">
          <span className="text-xs font-black text-slate-900 dark:text-white block truncate">Binance Pay</span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 block truncate">USDT sin comisión</span>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 shadow-sm">
        <BanescoPanamaIcon size={compact ? 26 : 32} className="shrink-0 rounded-lg shadow-sm" />
        <div className="min-w-0">
          <span className="text-xs font-black text-slate-900 dark:text-white block truncate">Banesco PA</span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 block truncate">Transferencia USD</span>
        </div>
      </div>
    </div>
  );
};

const CONFIG_DEFAULT = {
  PHONE_NUMBER: "+584123565012",
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

export interface JornadaPackage {
  id: string;
  name: string;
  subtitle?: string;
  regularPrice?: string;
  promoPrice: string;
  discountBadge?: string;
}

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
  packages?: JornadaPackage[];
}

const JORNADAS_DATA: JornadaItem[] = [
  {
    id: "reprogramacion",
    badge: "Jornada de Protección & Potenciación",
    title: "Protección TNGA, Descarbonización, Entonación & Reprogramación",
    subtitle: "Descarbonización de válvulas de admisión, entonación de inyección directa y de puerto, sensores aire/combustible, ignición y reprogramación de ECU para optimización y tropicalización.",
    icon: <Zap className="w-6 h-6 text-primary" />,
    img: "/assets/servicio-mecanica.webp",
    regularPrice: "Desde $1,075 USD",
    promoPrice: "Desde $698 USD",
    discountBadge: "HASTA 35% OFF",
    duration: "3 a 5 horas",
    benefits: [
      "Descarbonización profunda de válvulas de admisión y cámaras",
      "Entonación y calibración de inyección directa D4-S y de puerto",
      "Servicio de sensores de oxígeno / relación aire-combustible e ignición",
      "Reprogramación y optimización de ECU con tropicalización y calibración de fábrica",
      "Garantía técnica oficial de 60 días por escrito"
    ],
    specs: [
      { label: "Garantía", val: "60 Días Escrito" },
      { label: "Diagnóstico", val: "Banco y Escáner OEM" },
      { label: "Inyección", val: "Directa + Puerto" },
      { label: "Validación", val: "Ruta y En Vivo" }
    ],
    compatibleModels: "Modelos Toyota TNGA motorización M20A, A25A, T24A-FTS y V35A-FTS sin hibridación eléctrica.",
    popularAddon: "3 paquetes especializados según cilindrada y motorización de tu unidad.",
    packages: [
      {
        id: "pkg_m20_a25",
        name: "Corolla, RAV4, Camry, Levin",
        subtitle: "Motor 2.0L / 2.5L (M20A-FKS / A25A-FKS)",
        regularPrice: "$1,075 USD",
        promoPrice: "$698 USD",
        discountBadge: "35% OFF"
      },
      {
        id: "pkg_t24a_fts",
        name: "Tacoma, Highlander, Lexus RX / TX",
        subtitle: "Motor Turbo 2.4L (T24A-FTS no híbrido)",
        regularPrice: "$1,944 USD",
        promoPrice: "$1,299 USD",
        discountBadge: "33% OFF"
      },
      {
        id: "pkg_v35a_fts",
        name: "Tundra, Land Cruiser 300, Sequoia, Lexus LX",
        subtitle: "Motor Twin-Turbo 3.5L (V35A-FTS no híbrido)",
        regularPrice: "$2,200 USD",
        promoPrice: "$1,499 USD",
        discountBadge: "31% OFF"
      }
    ]
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

export const JORNADA_POLICIES = [
  {
    number: "01",
    title: "Vigencia y Disponibilidad",
    items: [
      { subtitle: "Vigencia de Jornada", text: "Cada jornada especial mantiene vigencia según las fechas y calendarios activos publicados periódicamente en la plataforma oficial del taller." },
      { subtitle: "Días de Atención", text: "Los trabajos se programan y ejecutan en los días habilitados en el cronograma oficial de cada jornada especial (según la fecha seleccionada en su reserva)." },
      { subtitle: "Disponibilidad de Cupos", text: "Cupos estrictamente limitados por jornada (generalmente 3 cupos diarios por fecha operativa), garantizando máxima calidad, exclusividad y atención técnica personalizada para cada vehículo." }
    ]
  },
  {
    number: "02",
    title: "Horario de Cita, Recepción y Puntualidad",
    items: [
      { subtitle: "Horario de Recepción", text: "La recepción de los vehículos se realiza puntualmente en el turno y rango horario asignado en la reserva (turnos matutinos pautados entre 8:30 a.m. y 10:00 a.m., o el horario específico confirmado para su cita)." },
      { subtitle: "Cláusula de Retrasos", text: "Al tratarse de jornadas con cupos limitados por día, la puntualidad es obligatoria para no alterar el cronograma del taller. En caso de llegar después de la ventana de recepción pautada sin previo aviso, el cupo podrá ser reasignado o reprogramado para la siguiente fecha disponible, sin garantía de entrega en el tiempo estándar." },
      { subtitle: "Permanencia en el Taller", text: "Por normativas de seguridad industrial y operativa, los clientes no deben permanecer dentro de las bahías de trabajo durante los procesos técnicos." }
    ]
  },
  {
    number: "03",
    title: "Tiempos de Trabajo y Pruebas de Calidad",
    items: [
      { subtitle: "Tiempo Estimado", text: "El tiempo de ejecución varía según la naturaleza técnica de la jornada contratada (desde 1 a 3 horas en servicios rápidos o de calibración electrónica, hasta 1 o 2 días hábiles en trabajos de alta envergadura o desmontaje profundo)." },
      { subtitle: "Pruebas en Carretera y Banco", text: "El proceso comprende procedimientos técnicos estáticos (diagnóstico computarizado, banqueo, calibración, descarbonización o reprogramación según la jornada contratada) y se complementa con rigurosas pruebas de validación. Ningún vehículo es entregado sin antes validar su correcto funcionamiento en banco o carretera." }
    ]
  },
  {
    number: "04",
    title: "Paquetes y Evaluación del Motor",
    items: [
      { subtitle: "Paquete Estándar / Preventivo", text: "Diseñado para vehículos en condiciones regulares, de bajo kilometraje o mantenimientos programados de acuerdo con la jornada seleccionada." },
      { subtitle: "Paquete Crítico / Avanzado", text: "Si durante la evaluación técnica inicial se detectan desgastes severos, fallas asociadas o requerimientos que excedan el alcance base de la jornada, se acuerda el alcance técnico y presupuesto directamente con el cliente antes de proceder." }
    ]
  },
  {
    number: "05",
    title: "Cláusula ante Contratiempos Operativos o Técnicos",
    items: [
      { subtitle: "Hallazgos Ocultos", text: "Si durante el proceso de desmontaje, banqueo, reprogramación o pruebas en carretera se detecta un contratiempo imprevisto (fallas ocultas en sensores periféricos o desgaste severo preexistente), se le notificará de inmediato al cliente." },
      { subtitle: "Extensión de Plazos", text: "Si esto requiere un tiempo superior al establecido, se coordinará la extensión de la entrega para priorizar la seguridad y el óptimo funcionamiento del motor." }
    ]
  },
  {
    number: "06",
    title: "Registro Audiovisual, Inspección Inicial y Levantamiento de Estado",
    items: [
      { subtitle: "Evidencia de Recepción", text: "Todo vehículo que ingresa es sometido a un registro fotográfico y en video de su carrocería, componentes estéticos, tablero (kilometraje y testigos) y compartimento del motor al momento de la recepción como acta digital de estado inicial." },
      { subtitle: "Registro de Proceso", text: "Se documenta en video y fotografía el avance técnico en el taller, garantizando al cliente la trazabilidad y veracidad de los trabajos ejecutados." },
      { subtitle: "Uso de Contenido", text: "El material audiovisual obtenido podrá ser utilizado por el taller con fines de control de calidad, auditoría técnica y difusión en plataformas digitales (redes sociales), resguardando en todo momento la privacidad de las placas o datos de identificación." }
    ]
  },
  {
    number: "07",
    title: "Responsabilidad sobre Objetos Personales y Vehículos",
    items: [
      { subtitle: "Objetos de Valor", text: "El taller no se hace responsable por objetos de valor, dispositivos electrónicos, herramientas o accesorios personales dejados en el interior del vehículo. Se solicita retirarlos antes de la entrega de llaves." },
      { subtitle: "Accesorios Externos", text: "Daños en alerones aftermarket o rines con rayones previos deben ser notificados y asentados en el acta de recepción." }
    ]
  },
  {
    number: "08",
    title: "Política de Retiro y Almacenaje Posterior a la Entrega",
    items: [
      { subtitle: "Plazo de Retiro", text: "Una vez que el vehículo esté listo y notificado, el cliente dispondrá de un plazo máximo de 48 horas para realizar el retiro de la unidad de las instalaciones del taller." },
      { subtitle: "Cargos por Custodia", text: "Pasado este lapso sin un acuerdo previo, el taller se reserva el derecho de aplicar cargos diarios por concepto de estacionamiento y resguardo logístico." }
    ]
  },
  {
    number: "09",
    title: "Garantía y Políticas de Cobertura",
    items: [
      { subtitle: "Garantía Oficial", text: "Se otorga garantía directa por escrito sobre los trabajos realizados en la jornada (garantía estándar de 2 meses en mano de obra y ajustes mecánicos, o hasta 1 año según el servicio o software específico contratado)." },
      { subtitle: "Exclusiones", text: "La garantía quedará nula si el vehículo es intervenido por terceros ajenos al taller, presenta negligencia operativa o fallas derivadas de combustible contaminado." }
    ]
  },
  {
    number: "10",
    title: "Política Financiera: Pago en Divisas y Cero Posibilidad de Descuento",
    items: [
      { 
        subtitle: "Cero Posibilidad de Descuento Adicional", 
        text: "Cada tarifa de Jornada Especial ya incluye el beneficio promocional máximo otorgado por el taller (descuentos de hasta un 40% sobre el precio de lista). Por normativa institucional estricta, existe CERO posibilidad de descuentos adicionales, convenios, rebajas o regateos. Las tarifas son netas, fijas y no negociables." 
      },
      { 
        subtitle: "Modalidad Solo Pago en Divisas", 
        text: "Las Jornadas Especiales se ejecutan y liquidan de manera exclusiva bajo la modalidad de PAGO EN DIVISAS ($ USD) o sus canales digitales autorizados por la administración." 
      },
      { 
        subtitle: "Métodos de Pago Aceptados", 
        text: "Aceptamos exclusivamente métodos en divisas ($ USD): 1) Dólares en Efectivo ($ USD en billetes en buen estado sin tachaduras ni roturas), 2) Zelle (transferencias electrónicas directas en USD), 3) Binance Pay (criptoactivos estables USDT sin comisiones), y 4) Banesco Panamá (transferencias directas en dólares USD)." 
      },
      { 
        subtitle: "Liquidación Inmediata de Unidad", 
        text: "El monto total acordado debe ser cancelado íntegramente al momento de la entrega del vehículo, previa conformidad y prueba del servicio. No se entregan vehículos con saldo pendiente ni se otorga financiamiento a crédito." 
      }
    ]
  }
];

export default function Jornadas() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [activeJornadaId, setActiveJornadaId] = useState<string>("reprogramacion");
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isSlotValid, setIsSlotValid] = useState<boolean>(false);
  const [showPoliciesModal, setShowPoliciesModal] = useState<boolean>(false);
  const [isPoliciesExpanded, setIsPoliciesExpanded] = useState<boolean>(false);

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
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [slotRefreshCounter, setSlotRefreshCounter] = useState(0);
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);

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
      images: Array.isArray(rawJornada?.images) ? rawJornada.images : [],
      packages: Array.isArray(rawJornada?.packages) && rawJornada.packages.length > 0
        ? rawJornada.packages
        : (fallback.id === rawJornada?.id && fallback.packages ? fallback.packages : [])
    };
  }, [rawJornada]);

  const [selectedPackageId, setSelectedPackageId] = useState<string>('');

  // Sincronizar paquete activo al cambiar de jornada
  useEffect(() => {
    if (currentJornada.packages && currentJornada.packages.length > 0) {
      if (!selectedPackageId || !currentJornada.packages.some(p => p.id === selectedPackageId)) {
        setSelectedPackageId(currentJornada.packages[0].id);
      }
    } else {
      setSelectedPackageId('');
    }
  }, [currentJornada.id, currentJornada.packages]);

  const activePackage = React.useMemo(() => {
    if (!currentJornada.packages || currentJornada.packages.length === 0) return null;
    return currentJornada.packages.find(p => p.id === selectedPackageId) || currentJornada.packages[0];
  }, [currentJornada.packages, selectedPackageId]);

  const effectiveRegularPrice = activePackage?.regularPrice || currentJornada.regularPrice;
  const effectivePromoPrice = activePackage?.promoPrice || currentJornada.promoPrice;
  const effectiveDiscountBadge = activePackage?.discountBadge || currentJornada.discountBadge;

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
      } else {
        turnos = ["08:30 AM", "09:00 AM", "09:30 AM"];
      }
    }

    return { jornadaDaysOfWeek: days, jornadaDateLabel: label, jornadaTurnos: turnos };
  }, [currentJornada]);

  const handleWhatsAppBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBookingSubmitting) return;
    if (!acceptedPolicies) {
      alert("Debes marcar la casilla para aceptar las Políticas, Condiciones y Cláusulas Oficiales de la Jornada.");
      return;
    }
    setIsBookingSubmitting(true);

    const nameStr = clientName.trim() || "Cliente MasterTech";
    const vehicleStr = clientVehicle ? `${clientVehicle} ${clientYear}`.trim() : "Vehículo no indicado";
    const cleanSlotForWa = selectedSlot 
      ? selectedSlot.replace(/^Cita (?:Inspección|Jornada VIP):\s*/i, '').trim()
      : "lo antes posible";
    const slotStr = selectedSlot ? `para el *${cleanSlotForWa}*` : "lo antes posible";

    // 1. Guardar la cita / cupo de jornada en la base de datos de MasterTech para el calendario y gestor de citas del Admin
    const leadPayload = {
      nombre: nameStr,
      telefono: clientPhone.trim() || "No indicado",
      vehiculo: vehicleStr,
      servicio: activePackage ? `Jornada VIP: ${currentJornada.title} - ${activePackage.name}` : `Jornada VIP: ${currentJornada.title}`,
      status: 'Confirmado',
      fecha_hora: selectedSlot || '',
      falla: `[Jornada VIP: ${currentJornada.title}${activePackage ? ` | Paquete: ${activePackage.name}` : ''}] Precio: ${effectivePromoPrice && effectivePromoPrice !== '---' ? effectivePromoPrice : 'Promocional'}. ${notes ? `Notas: ${notes}` : ''}`.trim()
    };

    // Almacenamiento local preventivo inmediato en browser para el panel administrativo y selector de cupos
    try {
      const localObj = {
        id: Date.now(),
        ...leadPayload,
        created_at: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('mastertech_leads_store') || '[]');
      existing.unshift(localObj);
      localStorage.setItem('mastertech_leads_store', JSON.stringify(existing.slice(0, 100)));
    } catch (_) {}

    // Notificar inmediatamente al selector de cupos para marcar como OCUPADO en vivo
    setSlotRefreshCounter(prev => prev + 1);
    try {
      window.dispatchEvent(new CustomEvent('mastertech_slots_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (_) {}

    // Envío a la API del servidor (persiste en tabla leads de Supabase, en SAVED_LEADS de settings y marca cupo en calendario)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      }).catch((err) => console.warn('Sync lead to server warning:', err));
    } catch (_) {}

    // Segunda sincronización para asegurar el refresco de cupos desde el servidor
    setSlotRefreshCounter(prev => prev + 1);
    try {
      window.dispatchEvent(new CustomEvent('mastertech_slots_updated'));
    } catch (_) {}

    // 2. Construir y abrir mensaje de WhatsApp preformateado
    const promoPriceDisplay = (effectivePromoPrice && effectivePromoPrice !== '---' && effectivePromoPrice.trim().length > 0)
      ? effectivePromoPrice
      : '';

    const messageLines = [
      `👋 *¡HOLA MASTERTECH! DESEO APARTAR MI CUPO DE JORNADA* 🛠️`,
      ``,
      `🎯 *Jornada Seleccionada:* ${currentJornada.title}`,
      activePackage ? `🚘 *Modelo(s):* ${activePackage.name}` : '',
      activePackage?.subtitle ? `⚙️ *Motorización:* ${activePackage.subtitle}` : '',
      promoPriceDisplay 
        ? `🏷️ *Precio Promocional de Jornada:* ${promoPriceDisplay} ${effectiveDiscountBadge ? `_(${effectiveDiscountBadge})_` : ''}`
        : '',
      `👤 *Nombre:* ${nameStr}`,
      `🚗 *Vehículo:* ${vehicleStr}`,
      `📞 *Teléfono:* ${clientPhone || "No indicado"}`,
      `📅 *Turno Solicitado:* ${slotStr}`,
      notes ? `📝 *Detalles/Notas:* ${notes}` : '',
      `📋 *Términos:* He leído y acepto las Políticas y Cláusulas Oficiales de la Jornada`,
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
    setIsBookingSubmitting(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 8000);
  };

  return (
    <div className="theme-root min-h-screen bg-slate-50 dark:bg-[#0a0b0f] text-slate-900 dark:text-white selection:bg-primary selection:text-white font-sans transition-colors duration-300">
      <Navbar activePage="jornadas" />

      {/* Hero Banner with Countdown Timer */}
      <section className="relative pt-32 pb-8 sm:pb-10 px-6 overflow-hidden border-b border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-primary/20 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm dark:shadow-lg dark:shadow-amber-500/10"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />
            <span>EDICIÓN 2026 · CUPOS LIMITADOS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-tight mb-3 max-w-3xl mx-auto text-slate-900 dark:text-white"
          >
            <span>JORNADAS</span>{' '}
            <span className="text-amber-500 dark:text-amber-400 font-black">
              ESPECIALES
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-6 font-medium"
          >
            Servicios técnicos de alto nivel a precio promocional exclusivo. Reserva tu cupo antes del cierre de agenda.
          </motion.p>

          {/* Live Countdown Timer Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-[#12141a]/95 backdrop-blur-xl border border-amber-500/40 p-4 md:p-5 rounded-3xl shadow-xl dark:shadow-2xl mb-2"
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest sm:pr-4 sm:border-r border-slate-200 dark:border-white/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5 animate-spin text-amber-500 dark:text-amber-400" style={{ animationDuration: '6s' }} />
              <span>{config.JORNADA_COUNTDOWN_TITLE || 'CIERRE DE CUPOS JORNADA:'}</span>
            </div>

            <div className="flex items-center gap-3">
              {[
                { val: timeLeft.days, unit: "Días" },
                { val: timeLeft.hours, unit: "Horas" },
                { val: timeLeft.mins, unit: "Min" },
                { val: timeLeft.secs, unit: "Seg" }
              ].map((t, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-slate-100 dark:bg-black/70 border border-slate-200 dark:border-white/15 rounded-2xl px-3.5 py-2 min-w-[65px] text-center shadow-sm">
                    <span className="text-2xl md:text-3xl font-display font-black block leading-none text-slate-900 dark:text-amber-400">
                      {String(t.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest mt-1 block text-slate-500 dark:text-zinc-400">
                      {t.unit}
                    </span>
                  </div>
                  {idx < 3 && <span className="text-xl font-bold text-amber-500/60 dark:text-amber-400/60">:</span>}
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
          <section className="pt-4 pb-6 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-slate-900 dark:text-white mb-1.5">
                {currentJornadasList.length === 1 
                  ? "JORNADA ACTIVA PARA TU VEHÍCULO" 
                  : "SELECCIONA LA JORNADA PARA TU VEHÍCULO"}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400">
                {currentJornadasList.length === 1
                  ? "Atención técnica especializada y cupos estrictamente limitados por fecha"
                  : "Desliza o selecciona para explorar todas las jornadas disponibles"}
              </p>
            </div>

            {currentJornadasList.length === 1 ? (
              /* Cuando es una sola jornada: ocupa todo el ancho y se presenta de forma destacada sin flechas */
              <div className="w-full">
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-5 md:p-6 rounded-3xl bg-white dark:bg-[#12141a] dark:bg-gradient-to-r dark:from-amber-950/30 dark:via-[#12141a] dark:to-red-950/20 border-2 border-amber-500/30 dark:border-amber-500/40 shadow-md dark:shadow-2xl text-slate-900 dark:text-white backdrop-blur-xl">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                      {currentJornada.icon || <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-black tracking-wider shadow-sm">
                          {currentJornada.badge || 'JORNADA ESPECIAL'}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-zinc-300 font-semibold">
                          Duración estimada: {currentJornada.duration}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        {currentJornada.title}
                      </h3>
                    </div>
                  </div>

                  {effectivePromoPrice && effectivePromoPrice !== '---' && (
                    <div className="text-center sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-white/10 w-full sm:w-auto">
                      {effectiveRegularPrice && effectiveRegularPrice !== '---' && (
                        <span className="text-xs text-slate-400 dark:text-zinc-400 line-through block">
                          {effectiveRegularPrice}
                        </span>
                      )}
                      <span className="text-xl sm:text-2xl font-black text-red-600 dark:text-amber-400 font-mono">
                        {effectivePromoPrice}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative flex items-center group/slider">
                {/* Left Slide Arrow - sólo si hay más de 3 jornadas */}
                {currentJornadasList.length > 3 && (
                  <button
                    type="button"
                    onClick={() => scrollTabs('left')}
                    className="hidden md:flex absolute -left-4 z-20 w-11 h-11 rounded-full bg-white dark:bg-black/90 hover:bg-amber-500 text-slate-800 dark:text-amber-400 hover:text-black border border-slate-200 dark:border-amber-500/40 items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                    title="Deslizar hacia la izquierda"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Scrollable Container */}
                <div
                  ref={tabsRef}
                  className={`flex items-center gap-3 overflow-x-auto pb-4 pt-2 px-2 scroll-smooth scrollbar-none snap-x w-full ${
                    currentJornadasList.length <= 3 ? 'justify-center' : ''
                  }`}
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
                            ? 'bg-amber-500/15 dark:bg-[#181a22] dark:bg-gradient-to-r dark:from-amber-950/50 dark:to-red-950/40 border-amber-500 dark:border-amber-500/60 text-slate-900 dark:text-white shadow-md scale-105 z-10' 
                            : 'bg-white dark:bg-[#12141a] border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:border-amber-500/40'
                        }`}
                      >
                        {j.icon || <Zap className="w-6 h-6 text-amber-500 dark:text-amber-400 shrink-0" />}
                        <div className="text-left">
                          <span className="block text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">{j.badge}</span>
                          <span className="font-bold text-xs whitespace-nowrap">{j.title ? j.title.split('(')[0] : 'Jornada'}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Slide Arrow - sólo si hay más de 3 jornadas */}
                {currentJornadasList.length > 3 && (
                  <button
                    type="button"
                    onClick={() => scrollTabs('right')}
                    className="hidden md:flex absolute -right-4 z-20 w-11 h-11 rounded-full bg-white dark:bg-black/90 hover:bg-amber-500 text-slate-800 dark:text-amber-400 hover:text-black border border-slate-200 dark:border-amber-500/40 items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                    title="Deslizar hacia la derecha"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>
            )}
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
                className="space-y-8 text-slate-900 dark:text-white"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Content (7 cols) */}
                  <div className="lg:col-span-7 bg-white dark:bg-[#12141a]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-lg dark:shadow-2xl space-y-6 relative overflow-hidden">
                    {/* Background Ambient Glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[90px] rounded-full pointer-events-none" />
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

                  <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight uppercase text-slate-900 dark:text-white leading-tight">
                    {currentJornada.title}
                  </h2>

                  <p className="text-slate-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
                    {currentJornada.subtitle}
                  </p>
                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {(currentJornada.specs || []).map((s, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-2xl p-3 text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500 block mb-1">{s.label}</span>
                        <span className="text-xs md:text-sm font-bold text-red-600 dark:text-primary block truncate">{s.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benefits Checklist */}
                  <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
                    <h3 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">BENEFICIOS INCLUIDOS EN LA JORNADA:</h3>
                    <div className="space-y-2.5">
                      {(currentJornada.benefits || []).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30 dark:border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-xs md:text-sm text-slate-700 dark:text-zinc-300 font-medium leading-normal">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Compatibility Banner */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-start gap-3">
                    <Car className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400 block mb-1">VEHÍCULOS Y MARCAS COMPATIBLES:</span>
                      <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">{currentJornada.compatibleModels}</p>
                    </div>
                  </div>

                </div>

                {/* Right Column (5 cols) - Tarjeta de Reserva Directa */}
                <div className="lg:col-span-5 bg-white dark:bg-[#12141a]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-2xl space-y-5 lg:sticky lg:top-24 relative overflow-hidden flex flex-col">
                  {/* Background Ambient Glow */}
                  <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
                  <div className="space-y-4">
                      {/* Selector Interactivo de Paquetes / Motorizaciones (cuando existen 2 o más opciones) */}
                      {currentJornada.packages && currentJornada.packages.length > 0 && (
                        <div className="space-y-2 pb-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                              <Package size={14} />
                              <span>Paquete / Motorización ({currentJornada.packages.length} Opciones):</span>
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-semibold">
                              Elige tu versión
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            {currentJornada.packages.map((pkg) => {
                              const isSelected = (activePackage?.id || currentJornada.packages![0].id) === pkg.id;
                              return (
                                <button
                                  key={pkg.id}
                                  type="button"
                                  onClick={() => setSelectedPackageId(pkg.id)}
                                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                    isSelected
                                      ? 'bg-amber-500/15 dark:bg-amber-950/40 border-amber-500 shadow-sm ring-1 ring-amber-500/50'
                                      : 'bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 hover:border-amber-500/40'
                                  }`}
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                                      isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-300 dark:border-zinc-600'
                                    }`}>
                                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                                    </div>
                                    <div className="min-w-0">
                                      <span className={`text-xs font-black block leading-tight truncate ${
                                        isSelected ? 'text-amber-950 dark:text-amber-300' : 'text-slate-900 dark:text-white'
                                      }`}>
                                        {pkg.name}
                                      </span>
                                      {pkg.subtitle && (
                                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-tight line-clamp-1 mt-0.5">
                                          {pkg.subtitle}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black tracking-tight whitespace-nowrap shadow-xs transition-all ${
                                      isSelected
                                        ? 'bg-red-600 text-white shadow-red-500/20'
                                        : 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30'
                                    }`}>
                                      {pkg.discountBadge || pkg.promoPrice}
                                    </span>
                                    <span className="text-[9px] text-slate-400 dark:text-zinc-500 uppercase font-black block mt-0.5 text-right whitespace-nowrap">
                                      Descuento
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
                        <div className="min-w-0 pr-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-zinc-500 block leading-tight">
                            {activePackage ? `PRECIO REGULAR (${activePackage.name.split(/[,(]/)[0].trim()})` : 'PRECIO REGULAR'}
                          </span>
                          <span className="text-sm sm:text-base text-slate-400 dark:text-zinc-400 line-through font-bold whitespace-nowrap block mt-0.5">
                            {effectiveRegularPrice && effectiveRegularPrice !== '---' ? effectiveRegularPrice : 'Consultar'}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block whitespace-nowrap">
                            PRECIO JORNADA
                          </span>
                          <span className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-red-600 dark:text-primary whitespace-nowrap block tracking-tight">
                            {effectivePromoPrice && effectivePromoPrice !== '---' ? effectivePromoPrice : 'Cupo Promocional'}
                          </span>
                        </div>
                      </div>

                      {effectiveDiscountBadge && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 text-center">
                          <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-300 flex items-center justify-center gap-1.5">
                            <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                            AHORRAS {effectiveDiscountBadge} ({activePackage ? activePackage.name.split(/[,(]/)[0].trim() : 'Jornada'})
                          </span>
                        </div>
                      )}

                      {currentJornada.popularAddon && (
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic text-center">
                          {currentJornada.popularAddon}
                        </p>
                      )}
                    </div>

                    {/* Interactive Booking Form */}
                    <form onSubmit={handleWhatsAppBooking} className="space-y-4 pt-2 border-t border-slate-200 dark:border-white/10">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>APARTAR MI CUPO EN LA JORNADA</span>
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 block mb-1">Nombre Completo</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Carlos Pérez"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full bg-white dark:bg-black/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-primary"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 block mb-1">Teléfono</label>
                            <input
                              type="tel"
                              required
                              placeholder="Ej. 04123565012"
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              className="w-full bg-white dark:bg-black/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 block mb-1">Vehículo / Modelo</label>
                            <input
                              type="text"
                              required
                              placeholder="Ej. Toyota Hilux 2020"
                              value={clientVehicle}
                              onChange={(e) => setClientVehicle(e.target.value)}
                              className="w-full bg-white dark:bg-black/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        {/* Slot Picker Integration */}
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                            Seleccionar Turno y {jornadaDateLabel}
                          </label>
                          <InspectionSlotPicker
                            isJornada={true}
                            allowedDaysOfWeek={jornadaDaysOfWeek}
                            dateLabel={jornadaDateLabel}
                            customSlots={jornadaTurnos && jornadaTurnos.length > 0 ? jornadaTurnos : ["08:30 AM", "09:00 AM", "09:30 AM"]}
                            refreshTrigger={slotRefreshCounter}
                            onSelectSlot={(slotStr, isValid) => {
                              setSelectedSlot(slotStr);
                              setIsSlotValid(isValid);
                            }}
                          />
                        </div>
                      </div>

                      {/* Checkbox Obligatorio de Aceptación de Políticas */}
                      <div className="pt-1">
                        <label 
                          className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                            acceptedPolicies 
                              ? 'bg-amber-100/60 dark:bg-amber-500/10 border-amber-500/40 text-slate-900 dark:text-white' 
                              : 'bg-white dark:bg-black/60 border-slate-200 dark:border-white/10 hover:border-amber-500/30 text-slate-700 dark:text-zinc-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            required
                            checked={acceptedPolicies}
                            onChange={(e) => setAcceptedPolicies(e.target.checked)}
                            className="w-4 h-4 rounded border-amber-500/50 text-amber-500 focus:ring-amber-500/30 bg-white dark:bg-black/80 cursor-pointer accent-amber-500 shrink-0"
                          />
                          <span className="text-xs leading-snug">
                            Acepto las{' '}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowPoliciesModal(true);
                              }}
                              className="text-amber-600 dark:text-amber-400 font-bold underline underline-offset-2 hover:text-amber-500 inline cursor-pointer"
                            >
                              Políticas y Condiciones de la Jornada
                            </button>
                            . <span className="text-amber-600 dark:text-amber-400 font-black">*</span>
                          </span>
                        </label>
                      </div>

                      {/* Aviso Independiente: Modalidad Divisas y Cero Descuento */}
                      <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <ShieldAlert size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
                          <div className="min-w-0">
                            <span className="font-black text-slate-900 dark:text-white block text-[11px] uppercase tracking-wide">
                              Solo Pago en Divisas · Cero Descuento
                            </span>
                            <span className="text-[10px] text-slate-600 dark:text-zinc-400 block truncate">
                              Efectivo $, Zelle, Binance Pay y Banesco Panamá
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <CashUsdIcon size={16} />
                          <ZelleIcon size={16} />
                          <BinanceIcon size={16} />
                          <BanescoPanamaIcon size={16} />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isBookingSubmitting || !acceptedPolicies}
                        className="w-full btn-primary !py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 border-none shadow-md hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                      >
                        <WhatsAppIcon size={18} />
                        <span>
                          {isBookingSubmitting
                            ? 'REGISTRANDO Y CONECTANDO...'
                            : `RESERVAR CUPO VÍA WHATSAPP${effectivePromoPrice && effectivePromoPrice !== '---' && effectivePromoPrice.trim().length > 0 ? ` (${effectivePromoPrice})` : ''}`
                          }
                        </span>
                      </button>

                      {!acceptedPolicies && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400/90 text-center font-semibold">
                          * Marca la casilla obligatoria para habilitar el agendamiento de tu cita.
                        </p>
                      )}

                      {bookingSuccess && (
                        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-center text-xs text-emerald-700 dark:text-emerald-300 font-bold animate-fade-in">
                          Cita y cupo registrados en el sistema de MasterTech. Se abrió WhatsApp para tu confirmación directa.
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-200 dark:border-white/10 text-center space-y-1.5">
                        <p className="text-[10px] text-slate-500 dark:text-zinc-500">
                          Cupos Limitados por Jornada · Recepción puntual en turnos asignados · Garantía Oficial MasterTech.
                        </p>
                      </div>
                    </form>
                </div>
              </div>

              {/* Fila de Garantía Oficial y Protocolo Técnico a Ancho Completo */}
              <div className="bg-white dark:bg-[#12141a]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-lg dark:shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">Garantía Oficial y Protocolo Técnico</h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400">Tranquilidad absoluta y respaldo documentado para tu inversión automotriz</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${(config.PHONE_NUMBER || "+584123565012").replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-bold text-xs shrink-0 transition-colors"
                  >
                    <Phone size={13} />
                    <span>Llamar al Taller</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
                      <Award className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {(() => {
                          const rawG = currentJornada.specs?.find((s: any) => s && s.label && s.label.toLowerCase().includes('garant'))?.val || '2 Meses';
                          return rawG.toLowerCase().includes('garant') ? rawG : `${rawG} de Garantía Escrita`;
                        })()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                      Cobertura técnica total sobre la mano de obra, procedimientos de descarbonización y calibraciones electrónicas.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Activity className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Validación en Banco y Carretera</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                      Ningún vehículo se entrega sin chequeo exhaustivo en banco, prueba dinámica en vía y monitoreo en vivo de sensores OEM.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                      <FileCheck className="w-5 h-5 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Acta Digital y Resguardo Seguro</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                      Registro audiovisual con reporte de recepción al ingresar tu vehículo bajo monitoreo de seguridad cerrado.
                    </p>
                  </div>
                </div>

                {/* Resumen Financiero y Canales de Pago */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-bold text-slate-900 dark:text-white text-[11px] uppercase tracking-wide">
                      Jornada: Solo Pago en Divisas · Cero Descuento Adicional
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <CashUsdIcon size={20} />
                    <ZelleIcon size={20} />
                    <BinanceIcon size={20} />
                    <BanescoPanamaIcon size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
            </AnimatePresence>
          </section>
        </main>
      )}

      {/* =========================================================================
          POLÍTICAS, CONDICIONES Y CLÁUSULAS OFICIALES DE LA JORNADA VIP (FORMATO COMPACTO)
          ========================================================================= */}
      <section id="politicas-jornada" className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
        <div className="bg-white dark:bg-[#12141a]/95 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg dark:shadow-2xl relative overflow-hidden text-slate-900 dark:text-white">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
                <FileText size={13} />
                <span>Marco Operativo Oficial</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                Políticas y Condiciones de la Jornada
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                Para asegurar máxima calidad técnica, puntualidad y transparencia, todas las jornadas se rigen bajo normativa de cumplimiento estricto.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowPoliciesModal(true)}
                className="btn-primary !px-5 !py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <FileText size={15} />
                <span>Leer las 10 Cláusulas Completas</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPoliciesExpanded(!isPoliciesExpanded)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{isPoliciesExpanded ? 'Ocultar desglose en pantalla' : 'Ver desglose en pantalla'}</span>
                {isPoliciesExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>
          </div>

          {/* 3 Executive Pillars Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock size={16} />
              </div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                1. Puntualidad y Turnos Asignados
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                Recepción por cita previa programada para dedicar atención técnica exclusiva y cumplir con exactitud los tiempos de entrega.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                2. Garantía Técnica por Escrito
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                Respaldo técnico directo de satisfacción (hasta 60 días o 1 año según el servicio), validado con banco de prueba y escáner OEM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
                <ShieldAlert size={16} />
              </div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                3. Solo Divisas · Cero Descuento
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                El precio de jornada ya incluye la tarifa promocional preferencial definitiva. Modalidad exclusiva en divisas autorizadas.
              </p>
            </div>
          </div>

          {/* Métodos de Pago Autorizados Strip */}
          <div className="mt-5 p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-700 dark:text-zinc-300 text-[11px] uppercase tracking-wide">
              Canales de Pago Autorizados para Jornadas:
            </span>
            <div className="w-full sm:w-auto">
              <MetodosPagoJornada compact={true} />
            </div>
          </div>

          {/* Desglose Completo Expandible (Sólo si el usuario pulsa 'Ver desglose en pantalla') */}
          <AnimatePresence>
            {isPoliciesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-6 mt-6 border-t border-slate-200 dark:border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {JORNADA_POLICIES.map((policy) => (
                    <div 
                      key={policy.number}
                      className={`bg-slate-50 dark:bg-black/50 border rounded-2xl p-4 space-y-2.5 ${
                        policy.number === '10' 
                          ? 'md:col-span-2 border-amber-500/50 bg-gradient-to-br from-amber-500/5 via-slate-50 dark:via-black/50 to-transparent' 
                          : 'border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 px-2 py-0.5 rounded">
                            {policy.number}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">{policy.title}</h4>
                        </div>
                        {policy.number === '10' && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-red-600 text-white shrink-0">
                            TARIFA FIJA
                          </span>
                        )}
                      </div>
                      <div className={policy.number === '10' ? "grid grid-cols-1 md:grid-cols-2 gap-3 text-xs" : "space-y-2 text-xs"}>
                        {policy.items.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1 shrink-0" />
                            <div>
                              <strong className="text-slate-800 dark:text-white font-semibold">{sub.subtitle}: </strong>
                              <span className="text-slate-600 dark:text-zinc-400">{sub.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Confirmation */}
        <div className="mt-10 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-slate-900 dark:text-white font-extrabold text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="text-emerald-500 dark:text-emerald-400" size={18} />
              <span>Garantía de Calidad y Transparencia Técnica</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-2xl">
              Cupos limitados por jornada con atención personalizada para cada vehículo, recepción puntual en turnos asignados, rigurosas pruebas técnicas y garantía oficial por escrito.
            </p>
          </div>

          <a 
            href={config.WHATSAPP_LINK || "https://wa.me/584123565012"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-6 !py-3 text-xs font-bold whitespace-nowrap shadow-xl"
          >
            <span>CONSULTAR DISPONIBILIDAD</span>
          </a>
        </div>
      </section>

      {/* Guarantees & Why MasterTech */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#12141a] p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-start gap-4 shadow-sm dark:shadow-none">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Garantía Total MasterTech</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Todos nuestros trabajos de reprogramación, electrónica y climatización incluyen respaldo directo por escrito y garantía de satisfacción.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#12141a] p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-start gap-4 shadow-sm dark:shadow-none">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 text-primary">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Equipos Importados OEM</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Utilizamos escáneres multimarca y programadores de última generación para garantizar lecturas quirúrgicas sin riesgos en tu vehículo.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#12141a] p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-start gap-4 shadow-sm dark:shadow-none">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Atención VIP & Lounge</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Espera cómodamente en nuestra área climatizada VIP con Wi-Fi de alta velocidad, café de cortesía y atención personalizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-white/10 text-center text-xs text-slate-500 dark:text-zinc-500 bg-slate-100 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <img src={config.LOGO_URL || "/logo.png"} alt="MasterTech" className="h-6 object-contain" />
            <span className="font-display font-black tracking-widest text-slate-900 dark:text-white text-sm">MASTERTECH</span>
          </div>
          <p>© 2026 SOLUCIONES MASTERTECH C.A. Todos los derechos reservados.</p>
          <p className="text-[11px] text-slate-400 dark:text-zinc-600">Porlamar, Isla de Margarita — Venezuela.</p>
        </div>
      </footer>

      {/* Modal de Políticas, Condiciones y Cláusulas */}
      <AnimatePresence>
        {showPoliciesModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPoliciesModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#12141a] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] text-slate-900 dark:text-white"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-red-500/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 block">Documento Oficial</span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Políticas, Condiciones y Cláusulas</h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">Jornada Especial de Mantenimiento y Servicios Técnicos</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPoliciesModal(false)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-zinc-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {JORNADA_POLICIES.map((policy) => (
                    <div 
                      key={policy.number} 
                      className={`bg-slate-50 dark:bg-black/50 border rounded-2xl p-4 space-y-2.5 ${
                        policy.number === '10' 
                          ? 'md:col-span-2 border-amber-500/50 bg-gradient-to-br from-amber-500/5 via-slate-50 dark:via-black/50 to-transparent' 
                          : 'border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 px-2 py-0.5 rounded">
                            {policy.number}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">{policy.title}</h4>
                        </div>
                        {policy.number === '10' && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-red-600 text-white shrink-0">
                            TARIFA FIJA
                          </span>
                        )}
                      </div>
                      <div className={policy.number === '10' ? "grid grid-cols-1 md:grid-cols-2 gap-3 text-xs" : "space-y-2 text-xs"}>
                        {policy.items.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1 shrink-0" />
                            <div>
                              <strong className="text-slate-800 dark:text-white font-semibold">{sub.subtitle}: </strong>
                              <span className="text-slate-600 dark:text-zinc-400">{sub.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {policy.number === '10' && (
                        <div className="pt-2.5 mt-2 border-t border-slate-200 dark:border-white/10 space-y-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                            Canales de Pago Autorizados:
                          </span>
                          <MetodosPagoJornada compact={true} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/60 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-zinc-500">MasterTech Isla de Margarita · Políticas Oficiales de Jornadas Especiales</span>
                <button
                  type="button"
                  onClick={() => setShowPoliciesModal(false)}
                  className="btn-primary !px-5 !py-2 text-xs font-bold cursor-pointer"
                >
                  Entendido y Conforme
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Hideable Bubble Widget: Live Exchange Rates & Budget Calculator */}
      <BrechaCambiariaPanel />
    </div>
  );
}
