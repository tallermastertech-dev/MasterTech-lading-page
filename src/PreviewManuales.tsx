import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  ExternalLink, 
  Download, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Sparkles, 
  Car, 
  MessageCircle, 
  X, 
  Search, 
  Check,
  ChevronRight,
  BookOpen,
  SlidersHorizontal,
  Flame,
  Droplets,
  Clock,
  Layers,
  Cpu,
  Fuel,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type CategoryFilter = 'all' | 'diesel' | 'gasolina_turbo' | 'gasolina_v6_v8' | 'gasolina_aspirado';

export interface EngineSpec {
  id: string;
  name: string;
  code: string;
  type: 'diesel' | 'gasolina_turbo' | 'gasolina_v6_v8' | 'gasolina_aspirado';
  models: string;
  oilViscosity: string;
  severeInterval: string;
  severeTip: string;
}

export interface ManualCard {
  id: string;
  brand: string;
  category: 'japones' | 'americano';
  status: 'disponible' | 'en_edicion';
  badge: string;
  badgeColor: string;
  statusBadge: string;
  statusBadgeColor: string;
  years: string;
  subtitle: string;
  models: string[];
  intervalsCount: string;
  htmlPath?: string;
  whatsappMessage: string;
  enginesList: EngineSpec[];
}

const MANUALES: ManualCard[] = [
  {
    id: 'toyota',
    brand: 'TOYOTA',
    category: 'japones',
    status: 'disponible',
    badge: 'Protocolo Condiciones Severas',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/30',
    statusBadge: 'Disponible PDF & Online',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Hilux, Fortuner, 4Runner, Prado, Land Cruiser, Corolla, Yaris, RAV4',
    models: ['Hilux (1GD / 2GD / 2TR)', 'Fortuner 4.0L & 2.8L', '4Runner 4.0L V6', 'Prado', 'Land Cruiser 70/200/300', 'Corolla (M20A / 2ZR)', 'Yaris', 'RAV4'],
    intervalsCount: '6 Intervalos Severos (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-toyota.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento en condiciones severas para mi Toyota.',
    enginesList: [
      {
        id: '1gd',
        name: '2.8L & 2.4L Turbo Diésel D-4D',
        code: '1GD-FTV / 2GD-FTV',
        type: 'diesel',
        models: 'Hilux, Fortuner, Prado',
        oilViscosity: '5W-30 Full Sintético API CK-4 / ACEA C2-C3',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'Doble purga del sedimentador de diésel cada 2.500 km por humedad costera y azufre nacional. Filtro combustible OEM cada 10.000 km. Engrase de crucetas cada 5.000 km.'
      },
      {
        id: '1gr',
        name: '4.0L V6 Gasolina Dual VVT-i',
        code: '1GR-FE',
        type: 'gasolina_v6_v8',
        models: '4Runner, Fortuner 4.0L, Land Cruiser 70/200, Prado',
        oilViscosity: '5W-30 / 0W-20 Full Sintético API SP / ILSAC GF-6 (6.1L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Sustitución de termostato y refrigerante rosa Toyota Super Long Life a los 40.000 km para prevenir sobrecalentamiento en colas bajo calor costero. Bujías cada 40.000 km.'
      },
      {
        id: '2tr',
        name: '2.7L 4 Cilindros Dual VVT-i',
        code: '2TR-FE',
        type: 'gasolina_aspirado',
        models: 'Hilux Gasolina, Fortuner 2.7L',
        oilViscosity: '5W-30 / 0W-20 API SP / ILSAC GF-6 (5.3L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Descarbonización de cuerpo de aceleración y sensor MAF cada 15.000 km por gasolina con sedimentos. Inspección de mangueras de recirculación PCV.'
      },
      {
        id: 'm20a',
        name: '2.0L / 1.8L Dynamic Force D-4S',
        code: 'M20A-FKS / 2ZR-FE',
        type: 'gasolina_aspirado',
        models: 'Corolla, Corolla Cross, Yaris, RAV4',
        oilViscosity: '0W-16 / 0W-20 Full Sintético API SP',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Bomba de aceite de caudal variable controlada por ECU: prohibido aceite grueso. Cambio de fluido caja CVT Direct Shift cada 30.000 km por fricción térmica en Margarita.'
      }
    ]
  },
  {
    id: 'honda',
    brand: 'HONDA',
    category: 'japones',
    status: 'disponible',
    badge: 'Protocolo Condiciones Severas',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    statusBadge: 'Disponible PDF & Online',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Civic, CR-V, Accord, Pilot, HR-V, Fit / Jazz, Ridgeline',
    models: ['Civic (1.5L Turbo / 2.0L)', 'CR-V (1.5T / 2.4L i-VTEC)', 'Accord 1.5T / 2.0T', 'Pilot 3.5L V6', 'HR-V 1.8L / 2.0L', 'Fit / Jazz 1.5L', 'Ridgeline 3.5L'],
    intervalsCount: '6 Intervalos Severos (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-honda.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento en condiciones severas para mi Honda.',
    enginesList: [
      {
        id: 'l15',
        name: '1.5L Turbo Earth Dreams Inyección Directa',
        code: 'L15B7 / L15BA',
        type: 'gasolina_turbo',
        models: 'Civic Turbo, CR-V Turbo, Accord 1.5T',
        oilViscosity: '0W-20 Full Sintético API SP / ILSAC GF-6',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'Aceite API SP obligatorio para mitigar preignición a baja velocidad (LSPI). Descarbonización química de válvulas de admisión cada 25.000 km por inyección directa sin lavado de toberas.'
      },
      {
        id: 'k24',
        name: '2.4L / 2.0L i-VTEC Aspirado',
        code: 'K24W / R20A',
        type: 'gasolina_aspirado',
        models: 'CR-V Aspirada, Civic 2.0L, Accord 2.4L, HR-V',
        oilViscosity: '0W-20 / 5W-20 API SP / ILSAC GF-6 (4.2L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Calibración con galgas de holgura de válvulas cada 40.000 km. Reemplazo de fluido genuino Honda HCF-2 en transmisiones CVT cada 25.000 km.'
      },
      {
        id: 'j35',
        name: '3.5L V6 i-VTEC con VCM (Desconexión Cilindros)',
        code: 'J35Y / J35Z',
        type: 'gasolina_v6_v8',
        models: 'Pilot, Accord V6, Ridgeline, Odyssey',
        oilViscosity: '0W-20 / 5W-20 API SP (4.8L a 5.4L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Correa de distribución dentada y tensor hidráulico: cambio a 60.000 km o 4 años. El sistema VCM exige revisión periódica de soportes hidráulicos de motor.'
      }
    ]
  },
  {
    id: 'nissan',
    brand: 'NISSAN',
    category: 'japones',
    status: 'disponible',
    badge: 'Protocolo Condiciones Severas',
    badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    statusBadge: 'Disponible PDF & Online',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Sentra, Versa, Kicks, Frontier / Navara, X-Trail, Altima, Pathfinder, Patrol',
    models: ['Sentra (2.0L MR20DD)', 'Frontier / Navara (YD25 / QR25)', 'X-Trail (QR25 / 1.5T VC)', 'Versa (HR16DE)', 'Kicks (1.6L)', 'Altima', 'Pathfinder', 'Patrol Y61/Y62'],
    intervalsCount: '6 Intervalos Severos (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-nissan.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento en condiciones severas para mi Nissan.',
    enginesList: [
      {
        id: 'mr20',
        name: '2.0L 4 Cilindros Inyección Directa (DIG)',
        code: 'MR20DD',
        type: 'gasolina_aspirado',
        models: 'Sentra B17/B18, X-Trail 2.0L, Qashqai',
        oilViscosity: '0W-20 Full Sintético API SP / ILSAC GF-6',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Resguardo térmico estricto de caja CVT Jatco: cambio de fluido Genuine Nissan NS-3 y filtro de cartucho enfriador cada 25.000 km por sobrecalentamiento costero.'
      },
      {
        id: 'hr16',
        name: '1.6L 4 Cilindros Inyección Secuencial',
        code: 'HR16DE',
        type: 'gasolina_aspirado',
        models: 'Versa, Kicks, Note, March',
        oilViscosity: '0W-20 / 5W-30 API SP (3.5L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Bujías de platino de cuello largo: reemplazo cada 30.000 km con gasolina local. Limpieza de toberas de inyección por ultrasonido cada 20.000 km.'
      },
      {
        id: 'yd25_qr25',
        name: '2.5L Turbo Diésel (YD25) & 2.5L Gasolina (QR25)',
        code: 'YD25DDTi / QR25DE',
        type: 'diesel',
        models: 'Frontier / Navara, X-Trail 2.5L, Altima',
        oilViscosity: '5W-30 / 15W-40 API CI-4 (Diésel) · 5W-30 API SP (Gasolina)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'En YD25 Diésel: purga del sensor de agua en filtro cada 2.500 km. Inspección de holgura en cadena primaria y limpieza de válvula EGR.'
      }
    ]
  },
  {
    id: 'jeep',
    brand: 'JEEP / MOPAR',
    category: 'americano',
    status: 'en_edicion',
    badge: 'Protocolo Condiciones Severas',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    statusBadge: 'Pauta Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2015 – 2027',
    subtitle: 'Grand Cherokee, Wrangler, Cherokee, Compass, Renegade, Gladiator',
    models: ['Grand Cherokee (WK2 / WL 3.6L & 5.7L)', 'Wrangler (JK / JL 3.6L Pentastar)', 'Cherokee (KL 2.4L / 3.2L)', 'Compass', 'Gladiator JT', 'Commander'],
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento en condiciones severas para mi Jeep.',
    enginesList: [
      {
        id: 'pentastar',
        name: '3.6L Pentastar V6 24V VVT',
        code: 'Pentastar V6',
        type: 'gasolina_v6_v8',
        models: 'Grand Cherokee WK2/WL, Wrangler JK/JL, Gladiator JT',
        oilViscosity: '0W-20 / 5W-20 Mopar MS-6395 (5.7L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Falla crítica por calor: la base plástica del enfriador de aceite en la "V" del motor se fisura. Recomendamos enfriador de aluminio Dorman/Mopar. Inspección de balancines por desgaste de levas.'
      },
      {
        id: 'hemi',
        name: '5.7L HEMI V8 MDS VVT',
        code: 'HEMI 5.7L',
        type: 'gasolina_v6_v8',
        models: 'Grand Cherokee 5.7L, RAM 1500',
        oilViscosity: '5W-20 Estricto Mopar MS-6395 (6.6L)',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'Prohibido usar aceite grueso (20W-50): traba los botadores MDS causando daño al árbol de levas. 16 bujías (2 por cilindro) cambiadas cada 30.000 km con gasolina nacional.'
      },
      {
        id: 'hurricane_jeep',
        name: '2.0L Turbo Hurricane GME T4',
        code: 'GME-T4 Hurricane',
        type: 'gasolina_turbo',
        models: 'Wrangler JL 2.0T, Cherokee KL',
        oilViscosity: '5W-30 Full Sintético API SP / MS-13340',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Circuito independiente de refrigeración para el intercooler aire-agua. Purgado con vacío. Monitoreo de bujías cada 25.000 km.'
      }
    ]
  },
  {
    id: 'ford',
    brand: 'FORD / MOTORCRAFT',
    category: 'americano',
    status: 'en_edicion',
    badge: 'Protocolo Condiciones Severas',
    badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
    statusBadge: 'Pauta Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2016 – 2027',
    subtitle: 'Explorer, F-150, Ranger, EcoSport, Edge, Expedition, Fiesta',
    models: ['Explorer (EcoBoost 2.3L / 3.5L Cyclone)', 'F-150 (5.0L Coyote / 3.5L EcoBoost)', 'Ranger (2.5L / 3.2L Diésel)', 'EcoSport', 'Edge', 'Expedition 3.5L'],
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento en condiciones severas para mi Ford.',
    enginesList: [
      {
        id: 'ecoboost_v6',
        name: '3.5L / 2.7L V6 EcoBoost Twin-Turbo Inyección Directa',
        code: 'EcoBoost V6 DIT',
        type: 'gasolina_turbo',
        models: 'F-150 EcoBoost, Explorer Sport, Expedition',
        oilViscosity: 'Motorcraft Full Synthetic 5W-30 API SP (WSS-M2C961-A1)',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'En Explorer 3.5L: bomba de agua interna accionada por la cadena de tiempo. Monitoreo preventivo del orificio testigo y refrigerante amarillo OAT para evitar fuga de agua al cárter.'
      },
      {
        id: 'coyote',
        name: '5.0L Coyote V8 Ti-VCT',
        code: 'Coyote 5.0L',
        type: 'gasolina_v6_v8',
        models: 'F-150 V8 5.0L, Mustang GT',
        oilViscosity: 'Motorcraft 5W-20 / 5W-30 Synthetic Blend (7.3L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Mantenimiento de solenoides Ti-VCT. En la transmisión 10R80 (10 vel), sustitución de fluido Mercon ULV y filtro a los 40.000 km por sobrecalentamiento térmico.'
      },
      {
        id: 'duratorq',
        name: '3.2L 5 Cilindros & 2.2L Duratorq TDCi Diésel',
        code: 'Duratorq Puma',
        type: 'diesel',
        models: 'Ranger Diésel 3.2L / 2.2L',
        oilViscosity: '5W-30 Low SAPS ACEA C1/C2 WSS-M2C913-D (9.8L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Bomba de aceite de paletas variables: nunca dejar escurrir el cárter más de 10 min durante el servicio para no descebar la bomba. Doble trampa de combustible para diésel nacional.'
      }
    ]
  },
  {
    id: 'chevrolet',
    brand: 'CHEVROLET / GM',
    category: 'americano',
    status: 'en_edicion',
    badge: 'Protocolo Condiciones Severas',
    badgeColor: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    statusBadge: 'Pauta Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2015 – 2027',
    subtitle: 'Tahoe, Silverado, Suburban, Trailblazer, Cruze, Aveo, Captiva',
    models: ['Tahoe / Suburban (5.3L / 6.2L EcoTec3)', 'Silverado 1500 V8', 'Trailblazer', 'Cruze 1.4L Turbo', 'Aveo', 'Captiva 1.5T'],
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento en condiciones severas para mi Chevrolet.',
    enginesList: [
      {
        id: 'ecotec3_v8',
        name: '5.3L / 6.2L EcoTec3 V8 con AFM / DFM (Desconexión Cilindros)',
        code: 'L83 / L84 / L87',
        type: 'gasolina_v6_v8',
        models: 'Tahoe, Suburban, Silverado 1500, Yukon',
        oilViscosity: '0W-20 con certificación Dexos 1 Gen 3 (7.6L a 8.0L)',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'Los botadores hidráulicos AFM/DFM colapsan si el aceite acumula carbón o se usa viscosidad errada. Malla filtrante del sensor VLOM debe limpiarse en cada servicio mayor.'
      },
      {
        id: 'ecotec_turbo',
        name: '1.4T / 1.5T Turbo Ecotec Inyección Directa',
        code: 'Ecotec Turbo',
        type: 'gasolina_turbo',
        models: 'Cruze Turbo, Captiva Turbo, Tracker',
        oilViscosity: '5W-30 con certificación estricta Dexos 1 Gen 3',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Protección contra LSPI: formulación Dexos 1 Gen 3 obligatoria. Revisión de válvula check de diafragma PCV en la tapa de válvulas (se rompe por vapores calientes y genera humo azul).'
      },
      {
        id: 'ecotec3_v6',
        name: '4.3L EcoTec3 V6 LV3 Inyección Directa',
        code: 'LV3 4.3L',
        type: 'gasolina_v6_v8',
        models: 'Silverado 1500 V6',
        oilViscosity: '5W-30 Dexos 1 Gen 3 (5.7L)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Inyección directa y sistema AFM: bujías de iridio cada 40.000 km con gasolina nacional. Inspección de termostato y mangueras plásticas del radiador por fragilidad térmica.'
      }
    ]
  }
];

export default function PreviewManuales() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalManual, setActiveModalManual] = useState<ManualCard | null>(null);
  const [activeModalEngineId, setActiveModalEngineId] = useState<string | null>(null);
  const [selectedEnginesByBrand, setSelectedEnginesByBrand] = useState<Record<string, string>>({});
  const [modalHtml, setModalHtml] = useState<string | null>(null);
  const [isLoadingHtml, setIsLoadingHtml] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (activeModalManual?.htmlPath) {
      setIsLoadingHtml(true);
      fetch(activeModalManual.htmlPath)
        .then((res) => {
          if (!res.ok) throw new Error('Error al cargar manual');
          return res.text();
        })
        .then((html) => {
          setModalHtml(html);
          setIsLoadingHtml(false);
        })
        .catch(() => {
          setModalHtml(null);
          setIsLoadingHtml(false);
        });
    } else {
      setModalHtml(null);
      setIsLoadingHtml(false);
    }
  }, [activeModalManual]);

  useEffect(() => {
    const isLight = document.documentElement.classList.contains('theme-light') || document.documentElement.classList.contains('light');
    setIsDark(!isLight);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('theme-light', 'light');
      document.body.classList.add('theme-light', 'light');
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      setIsDark(false);
      try { localStorage.setItem('mastertech_public_theme', 'light'); } catch (e) {}
    } else {
      document.documentElement.classList.remove('theme-light', 'light');
      document.body.classList.remove('theme-light', 'light');
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      setIsDark(true);
      try { localStorage.setItem('mastertech_public_theme', 'dark'); } catch (e) {}
    }
  };

  const filteredManuales = MANUALES.filter(m => {
    let matchesCategory = true;
    if (selectedCategory === 'diesel') {
      matchesCategory = m.enginesList.some(e => e.type === 'diesel');
    } else if (selectedCategory === 'gasolina_turbo') {
      matchesCategory = m.enginesList.some(e => e.type === 'gasolina_turbo');
    } else if (selectedCategory === 'gasolina_v6_v8') {
      matchesCategory = m.enginesList.some(e => e.type === 'gasolina_v6_v8');
    } else if (selectedCategory === 'gasolina_aspirado') {
      matchesCategory = m.enginesList.some(e => e.type === 'gasolina_aspirado');
    }

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      m.brand.toLowerCase().includes(query) ||
      m.subtitle.toLowerCase().includes(query) ||
      m.models.some(model => model.toLowerCase().includes(query)) ||
      m.enginesList.some(e => 
        e.name.toLowerCase().includes(query) || 
        e.code.toLowerCase().includes(query) || 
        e.models.toLowerCase().includes(query)
      );

    return matchesCategory && matchesSearch;
  });

  const handlePrint = (htmlPath?: string) => {
    if (!htmlPath) return;
    const printWindow = window.open(htmlPath, '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    }
  };

  const handleWhatsApp = (msg: string) => {
    const url = `https://wa.me/584123565012?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#07090e] text-slate-900 dark:text-white transition-colors duration-300 font-sans selection:bg-red-500 selection:text-white">
      
      {/* Top Floating Control Bar (Private Preview Notice) */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <a 
              href="/"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Volver a la web principal"
            >
              <ArrowLeft size={18} />
            </a>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-xs font-black tracking-wider uppercase text-amber-600 dark:text-amber-400">
                  VISTA PREVIA PRIVADA DE CALIBRACIÓN
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold uppercase">
                  MODO PRIVADO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Centro de Recomendaciones de Mantenimiento · Ruta aislada: <code className="text-red-500 font-mono">/preview-manuales</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-blue-500" />}
              <span>{isDark ? 'Probar Modo Claro' : 'Probar Modo Oscuro'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-14 md:py-20 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-500/8 dark:bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-black tracking-wider uppercase mb-5 shadow-sm">
            <ShieldCheck size={15} />
            <span>Protocolo MasterTech · Condiciones Severas Venezuela</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Recomendaciones de Mantenimiento <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
              Condiciones Severas Venezuela
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Pautas de mantenimiento preventivo calibradas por motorización para el clima costero de Margarita (alta salinidad, calor térmico y humedad) y las características del combustible nacional. Selecciona el motor de tu vehículo para conocer sus lubricantes certificados, intervalos reales y puntos críticos.
          </p>

          {/* Badges bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <Cpu size={14} className="text-red-500" />
              <span>Desglosado por Motorización</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <AlertTriangle size={14} className="text-amber-500" />
              <span>Protección Clima Costero & Salitre</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Intervalos Reales Cada 5.000 km</span>
            </span>
          </div>

        </div>
      </section>

      {/* Filter, Search & View Switcher Bar */}
      <section className="py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/60 backdrop-blur-md sticky top-[57px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Category Tabs: By Engine Family */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Todos los Motores' },
              { id: 'diesel', label: 'Turbo Diésel' },
              { id: 'gasolina_turbo', label: 'Turbo Gasolina (GDI)' },
              { id: 'gasolina_v6_v8', label: 'Motores V6 / V8' },
              { id: 'gasolina_aspirado', label: 'Aspirados' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar & View Mode Toggle */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por motor (1GD, Pentastar, EcoBoost, 1GR)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* View Switcher: Grid vs List */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Vista en Tarjetas Compactas"
              >
                <Layers size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Vista en Lista Compacta"
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Manuals Catalog (Scalable & Compact) */}
      <section className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results counter */}
        <div className="mb-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Mostrando <strong className="text-slate-900 dark:text-white">{filteredManuales.length}</strong> marcas con protocolo de condiciones severas
          </span>
          <span className="text-[11px] hidden sm:inline">
            Selecciona el <strong className="text-slate-700 dark:text-slate-200">código de motor</strong> en la tarjeta para ver las tolerancias exactas.
          </span>
        </div>

        {/* VIEW MODE: COMPACT GRID (3-4 cols) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredManuales.map((manual) => {
              const isAvailable = manual.status === 'disponible';
              const activeEngineId = selectedEnginesByBrand[manual.id] || manual.enginesList[0].id;
              const activeEngine = manual.enginesList.find(e => e.id === activeEngineId) || manual.enginesList[0];
              const whatsappEngineMsg = `Hola MasterTech, deseo agendar el servicio de mantenimiento en condiciones severas para mi ${manual.brand} con motor ${activeEngine.name}.`;

              return (
                <div
                  key={manual.id}
                  className="rounded-2xl bg-white dark:bg-[#0e1219] border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between group"
                >
                  {/* Top Bar: Brand, Badge & Status */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {manual.category === 'japones' ? 'Línea Japonesa' : 'Línea Americana'} · {manual.years}
                      </span>
                      
                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                          <CheckCircle2 size={11} className="shrink-0" />
                          <span>PDF & Online</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                          <Clock size={11} className="shrink-0" />
                          <span>En Taller</span>
                        </span>
                      )}
                    </div>

                    {/* Brand Name & Subtitle */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-black font-display tracking-tight text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {manual.brand}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                          Condiciones Severas Venezuela
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shrink-0 text-red-500">
                        <FileText size={18} />
                      </div>
                    </div>

                    {/* Motor Selector Section */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5 text-[10px]">
                        <span className="font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Seleccionar Motor:
                        </span>
                        <span className="font-mono text-red-500 font-bold">
                          {manual.enginesList.length} motorizaciones
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {manual.enginesList.map(eng => {
                          const isSelected = eng.id === activeEngine.id;
                          return (
                            <button
                              key={eng.id}
                              type="button"
                              onClick={() => setSelectedEnginesByBrand(prev => ({ ...prev, [manual.id]: eng.id }))}
                              className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-red-600 text-white shadow-xs scale-105'
                                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                            >
                              {eng.code}
                            </button>
                          );
                        })}
                      </div>

                      {/* Selected Motor Specifications Box */}
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                        <div>
                          <span className="font-black text-slate-900 dark:text-white text-xs block leading-tight">
                            {activeEngine.name}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                            Modelos: {activeEngine.models}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] gap-2">
                          <div className="truncate">
                            <span className="text-slate-400 text-[10px] block">Aceite Recomendado:</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate block">{activeEngine.oilViscosity}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-[10px] font-black shrink-0">
                            {activeEngine.severeInterval}
                          </span>
                        </div>

                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                          <div className="flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 text-[10px] mb-0.5">
                            <AlertTriangle size={12} className="shrink-0" />
                            <span>Pauta Crítica en Venezuela:</span>
                          </div>
                          <p className="text-[10px] leading-relaxed text-slate-600 dark:text-slate-300">
                            {activeEngine.severeTip}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    {isAvailable ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModalEngineId(activeEngine.id);
                            setActiveModalManual(manual);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <BookOpen size={13} />
                          <span>Ver Pauta {activeEngine.code}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePrint(manual.htmlPath)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                          title="Imprimir o Descargar PDF"
                        >
                          <Printer size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleWhatsApp(whatsappEngineMsg)}
                          className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer"
                          title={`Consultar por WhatsApp mantenimiento ${manual.brand} (${activeEngine.code})`}
                        >
                          <MessageCircle size={15} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleWhatsApp(whatsappEngineMsg)}
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle size={14} />
                        <span>Consultar Pauta {activeEngine.code} vía WhatsApp</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* VIEW MODE: COMPACT LIST / TABLE */}
        {viewMode === 'list' && (
          <div className="bg-white dark:bg-[#0e1219] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
            {filteredManuales.map((manual) => {
              const isAvailable = manual.status === 'disponible';
              const activeEngineId = selectedEnginesByBrand[manual.id] || manual.enginesList[0].id;
              const activeEngine = manual.enginesList.find(e => e.id === activeEngineId) || manual.enginesList[0];
              const whatsappEngineMsg = `Hola MasterTech, deseo agendar el servicio de mantenimiento en condiciones severas para mi ${manual.brand} con motor ${activeEngine.name}.`;

              return (
                <div 
                  key={manual.id}
                  className="p-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-red-500">
                      <FileText size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-black text-slate-900 dark:text-white">
                          {manual.brand}
                        </h4>
                        <span className="text-xs font-mono text-slate-400">
                          ({manual.years})
                        </span>
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                            <CheckCircle2 size={11} className="shrink-0" />
                            <span>PDF Disponible</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                            <Clock size={11} className="shrink-0" />
                            <span>En Taller</span>
                          </span>
                        )}
                      </div>
                      
                      {/* Engine list pills in table row */}
                      <div className="flex items-center gap-1.5 flex-wrap mt-1">
                        <strong className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">Motores:</strong>
                        {manual.enginesList.map(eng => (
                          <span key={eng.id} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {eng.code}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions on row */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {isAvailable ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModalEngineId(activeEngine.id);
                            setActiveModalManual(manual);
                          }}
                          className="py-1.5 px-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen size={13} />
                          <span>Ver Online</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePrint(manual.htmlPath)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                          title="Descargar / Imprimir PDF"
                        >
                          <Printer size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhatsApp(whatsappEngineMsg)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer"
                          title="WhatsApp"
                        >
                          <MessageCircle size={15} />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleWhatsApp(whatsappEngineMsg)}
                        className="py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle size={14} />
                        <span>Solicitar Pauta</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Global Request Box */}
        <div className="mt-12 rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-amber-500/10 via-red-500/5 to-slate-100 dark:from-amber-500/5 dark:via-red-500/5 dark:to-[#0e1219] border border-amber-500/30 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center shrink-0">
                <Wrench size={30} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  ¿Tienes otra marca o modelo específico?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Pautas Técnicas y Tolerancias a Medida
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                  En MasterTech disponemos de software de taller con especificaciones y pautas de fábrica para Dodge, RAM, Hyundai, Kia, Mazda, Mitsubishi y marcas europeas. Solicita la pauta de tu vehículo sin costo.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleWhatsApp('Hola MasterTech, deseo consultar la pauta de mantenimiento oficial para mi vehículo.')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer hover:scale-105"
            >
              <MessageCircle size={17} />
              <span>Consultar con el Jefe de Taller</span>
            </button>

          </div>
        </div>

      </section>

      {/* Interactive Modal Viewer */}
      <AnimatePresence>
        {activeModalManual && activeModalManual.htmlPath && (
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalManual(null)}
          >
            {(() => {
              const modalActiveEngine = activeModalManual.enginesList?.find(e => e.id === activeModalEngineId) || activeModalManual.enginesList?.[0];
              const modalWhatsappMsg = modalActiveEngine
                ? `Hola MasterTech, deseo agendar el servicio de mantenimiento en condiciones severas para mi ${activeModalManual.brand} con motor ${modalActiveEngine.name} (${modalActiveEngine.code}).`
                : activeModalManual.whatsappMessage;

              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 20 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-[#0c0f15] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
                >
                  {/* Modal Header */}
                  <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white">
                          Recomendaciones Técnicas {activeModalManual.brand} ({activeModalManual.years})
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Pauta Oficial de Mantenimiento Preventivo · Condiciones Severas Venezuela
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePrint(activeModalManual.htmlPath)}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Imprimir o Guardar como PDF"
                      >
                        <Printer size={14} />
                        <span className="hidden sm:inline">Imprimir / PDF</span>
                      </button>

                      <a
                        href={activeModalManual.htmlPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                        title="Abrir en pestaña nueva"
                      >
                        <ExternalLink size={16} />
                      </a>

                      <button
                        type="button"
                        onClick={() => setActiveModalManual(null)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Engine Selector Subbar */}
                  {activeModalManual.enginesList && activeModalManual.enginesList.length > 0 && (
                    <div className="px-5 py-2.5 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
                      <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 flex items-center gap-1">
                          <Fuel size={12} className="text-red-500" />
                          Motor:
                        </span>
                        <div className="flex items-center gap-1.5 flex-nowrap">
                          {activeModalManual.enginesList.map((eng) => {
                            const isSelected = (modalActiveEngine?.id === eng.id);
                            return (
                              <button
                                key={eng.id}
                                type="button"
                                onClick={() => setActiveModalEngineId(eng.id)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                                  isSelected
                                    ? 'bg-red-600 text-white shadow-sm'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 border border-slate-200/80 dark:border-slate-700'
                                }`}
                              >
                                <span>{eng.code}</span>
                                {isSelected && <span className="text-[9px] opacity-80">({eng.severeInterval})</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {modalActiveEngine && (
                        <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400">
                          <span><strong className="text-slate-800 dark:text-slate-200">Aceite:</strong> {modalActiveEngine.oilViscosity}</span>
                          <span className="text-red-500 font-bold">·</span>
                          <span className="text-red-600 dark:text-red-400 font-bold">{modalActiveEngine.severeInterval}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Iframe Viewport */}
                  <div className="flex-1 bg-white relative">
                    {isLoadingHtml && !modalHtml && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 z-10">
                        <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin mb-3" />
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Cargando recomendaciones oficiales...
                        </p>
                      </div>
                    )}
                    <iframe
                      src={modalHtml ? undefined : activeModalManual.htmlPath}
                      srcDoc={modalHtml || undefined}
                      title={`Recomendaciones de Mantenimiento ${activeModalManual.brand}`}
                      className="w-full h-full border-0"
                      sandbox="allow-same-origin allow-scripts allow-modals allow-popups allow-forms"
                    />
                  </div>

                  {/* Modal Bottom Bar */}
                  <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 shrink-0 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">
                        © 2026 Taller MasterTech · Porlamar, Isla de Margarita
                      </span>
                      {modalActiveEngine && (
                        <span className="text-[11px] text-red-600 dark:text-red-400 font-bold">
                          · {modalActiveEngine.name}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleWhatsApp(modalWhatsappMsg)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <MessageCircle size={14} />
                        <span>Agendar Servicio {modalActiveEngine ? `(${modalActiveEngine.code})` : ''} vía WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
