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
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type CategoryFilter = 'all' | 'disponibles' | 'japoneses' | 'americanos';

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
  engines: string;
  fluids: string;
  keyHighlight: string;
  intervalsCount: string;
  htmlPath?: string;
  whatsappMessage: string;
}

const MANUALES: ManualCard[] = [
  {
    id: 'toyota',
    brand: 'TOYOTA',
    category: 'japones',
    status: 'disponible',
    badge: 'Edición Oficial MasterTech',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/30',
    statusBadge: 'Disponible PDF & Online',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Hilux, Fortuner, 4Runner, Corolla, Yaris, Land Cruiser, Prado, RAV4',
    models: ['Hilux (1GD / 2GD / 2TR)', 'Fortuner 4.0L & 2.8L', '4Runner 4.0L V6', 'Corolla (1.8L / 2.0L)', 'Yaris', 'Land Cruiser 70/200/300', 'Prado', 'RAV4'],
    engines: 'Gasolina VVT-i / Dual VVT-i · Diésel D-4D 1GD-FTV / 2GD-FTV / 1KD',
    fluids: 'Aceite 0W-20 / 5W-30 API SP · Valvulina 75W-90 / 85W-140 GL-5 · Fluido Toyota WS',
    keyHighlight: 'Engrase de crucetas y flechas cardánicas cada 5.000 km obligatorio para clima costero.',
    intervalsCount: '6 Intervalos (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-toyota.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento para mi Toyota según la pauta de su Manual Técnico.'
  },
  {
    id: 'honda',
    brand: 'HONDA',
    category: 'japones',
    status: 'disponible',
    badge: 'Edición Oficial MasterTech',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    statusBadge: 'Disponible PDF & Online',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Civic, CR-V, Accord, Pilot, HR-V, Fit / Jazz, Ridgeline',
    models: ['Civic (1.5L Turbo / 2.0L)', 'CR-V (1.5T / 2.4L i-VTEC)', 'Accord 1.5T / 2.0T', 'Pilot 3.5L V6', 'HR-V 1.8L / 2.0L', 'Fit / Jazz 1.5L', 'Ridgeline 3.5L'],
    engines: 'Motores i-VTEC Aspirados & Motores Turbo Earth Dreams con inyección directa',
    fluids: 'Aceite 0W-20 Full Sintético API SP / ILSAC GF-6 · Fluido Honda HCF-2 para CVT',
    keyHighlight: 'Calibración de holgura de válvulas cada 40.000 km y descarbonización de admisión.',
    intervalsCount: '6 Intervalos (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-honda.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento para mi Honda según la pauta de su Manual Técnico.'
  },
  {
    id: 'nissan',
    brand: 'NISSAN',
    category: 'japones',
    status: 'disponible',
    badge: 'Edición Oficial MasterTech',
    badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    statusBadge: 'Disponible PDF & Online',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Versa, Sentra, Kicks, Frontier / Navara, X-Trail, Altima, Pathfinder, Patrol',
    models: ['Sentra (2.0L MR20DD)', 'Frontier / Navara (YD25 / QR25)', 'X-Trail (QR25 / 1.5T VC)', 'Versa (HR16DE)', 'Kicks (1.6L)', 'Altima', 'Pathfinder', 'Patrol Y61/Y62'],
    engines: 'Gasolina HR / MR / QR / VC-Turbo · Diésel YD25DDTi Common Rail',
    fluids: 'Aceite sintético 0W-20 / 5W-30 API SP · Fluido exclusivo Genuine Nissan NS-3 para CVT',
    keyHighlight: 'Conteo de deterioro de fluido CVT por escáner y resguardo térmico de poleas Jatco.',
    intervalsCount: '6 Intervalos (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-nissan.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento para mi Nissan según la pauta de su Manual Técnico.'
  },
  {
    id: 'jeep',
    brand: 'JEEP / MOPAR',
    category: 'americano',
    status: 'en_edicion',
    badge: 'En Redacción Técnica',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    statusBadge: 'Pauta Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2015 – 2027',
    subtitle: 'Grand Cherokee, Wrangler, Cherokee, Compass, Renegade, Gladiator',
    models: ['Grand Cherokee (WK2 / WL 3.6L & 5.7L)', 'Wrangler (JK / JL 3.6L Pentastar)', 'Cherokee (KL 2.4L / 3.2L)', 'Compass', 'Gladiator JT', 'Commander'],
    engines: 'Pentastar 3.6L V6 · 5.7L HEMI V8 · 2.0L Turbo GME Hurricane · EcoDiesel 3.0L',
    fluids: 'Aceite Mopar MS-6395 (0W-20 / 5W-20 / 5W-30) · Fluido Mopar ZF 8-Speed / ATF+4 · OAT Antifreeze',
    keyHighlight: 'Prevención de fuga en base de filtro de aceite de aluminio, inspección de amortiguador de dirección y rótulas (Death Wobble).',
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento y especificaciones oficiales para mi Jeep.'
  },
  {
    id: 'ford',
    brand: 'FORD / MOTORCRAFT',
    category: 'americano',
    status: 'en_edicion',
    badge: 'En Redacción Técnica',
    badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
    statusBadge: 'Pauta Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2016 – 2027',
    subtitle: 'Explorer, F-150, Ranger, EcoSport, Edge, Expedition, Fiesta',
    models: ['Explorer (EcoBoost 2.3L / 3.5L Cyclone)', 'F-150 (5.0L Coyote / 3.5L EcoBoost)', 'Ranger (2.5L / 3.2L Diésel)', 'EcoSport', 'Edge', 'Expedition 3.5L'],
    engines: 'EcoBoost Turbo Direct Injection · 5.0L Coyote V8 · Duratec 2.0L / 2.5L',
    fluids: 'Motorcraft Full Synthetic SAE 5W-20 / 5W-30 API SP · Fluido Mercon LV / Mercon ULV',
    keyHighlight: 'Monitoreo de bomba de agua interna en motores 3.5L V6 y sustitución de refrigerante amarillo OAT para evitar corrosión interna.',
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento y especificaciones oficiales para mi Ford.'
  },
  {
    id: 'chevrolet',
    brand: 'CHEVROLET / GM',
    category: 'americano',
    status: 'en_edicion',
    badge: 'En Redacción Técnica',
    badgeColor: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    statusBadge: 'Pauta Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2015 – 2027',
    subtitle: 'Tahoe, Silverado, Suburban, Trailblazer, Cruze, Aveo, Captiva',
    models: ['Tahoe / Suburban (5.3L / 6.2L EcoTec3)', 'Silverado 1500 V8', 'Trailblazer', 'Cruze 1.4L Turbo', 'Aveo', 'Captiva 1.5T'],
    engines: 'EcoTec3 V8 con Desactivación de Cilindros (AFM/DFM) · Ecotec 1.4T / 1.8L',
    fluids: 'Certificación Dexos 1 Gen 3 (0W-20 / 5W-30) · Fluido Dexron VI para transmisiones Hydra-Matic',
    keyHighlight: 'Lubricación crítica de botadores hidráulicos AFM/DFM y descarbonización preventiva de válvulas de admisión directa.',
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento y especificaciones oficiales para mi Chevrolet.'
  }
];

export default function PreviewManuales() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalManual, setActiveModalManual] = useState<ManualCard | null>(null);
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
    if (selectedCategory === 'disponibles') matchesCategory = m.status === 'disponible';
    if (selectedCategory === 'japoneses') matchesCategory = m.category === 'japones';
    if (selectedCategory === 'americanos') matchesCategory = m.category === 'americano';

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      m.brand.toLowerCase().includes(query) ||
      m.subtitle.toLowerCase().includes(query) ||
      m.models.some(model => model.toLowerCase().includes(query));

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
                Biblioteca Escalable de Manuales Técnicos · Ruta aislada: <code className="text-red-500 font-mono">/preview-manuales</code>
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
            <BookOpen size={15} />
            <span>Biblioteca y Centro de Pautas Técnicas MasterTech</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Manuales Oficiales de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
              Mantenimiento Preventivo
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Nuestra colección de manuales técnicos para clientes en la Isla de Margarita. Consulta las especificaciones de fábrica, tolerancias de apriete, lubricantes certificados y procedimientos para mantener tu motor protegido del clima costero.
          </p>

          {/* Badges bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <Layers size={14} className="text-red-500" />
              <span>Librería Multimarca en Expansión</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Descargas Libres en PDF</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <ShieldCheck size={14} className="text-blue-500" />
              <span>Torques y Tolerancias OEM</span>
            </span>
          </div>

        </div>
      </section>

      {/* Filter, Search & View Switcher Bar */}
      <section className="py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/60 backdrop-blur-md sticky top-[57px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'disponibles', label: 'Disponibles PDF' },
              { id: 'japoneses', label: 'Japoneses' },
              { id: 'americanos', label: 'Americanos' }
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
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar modelo o marca..."
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
            Mostrando <strong className="text-slate-900 dark:text-white">{filteredManuales.length}</strong> manuales técnicos
          </span>
          <span className="text-[11px] hidden sm:inline">
            Haga clic en <strong className="text-slate-700 dark:text-slate-200">Ver Online</strong> para desplegar la ficha técnica completa con torques y fluidos.
          </span>
        </div>

        {/* VIEW MODE: COMPACT GRID (3-4 cols) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredManuales.map((manual) => {
              const isAvailable = manual.status === 'disponible';
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
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-black font-display tracking-tight text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {manual.brand}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                          Manual Técnico de Mantenimiento Preventivo
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shrink-0 text-red-500">
                        <FileText size={18} />
                      </div>
                    </div>

                    {/* Compact Model Coverage */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      <strong className="text-slate-900 dark:text-white font-semibold">Modelos: </strong>
                      {manual.subtitle}
                    </p>

                    {/* Quick Specs Pill Row */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[10px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-medium">
                        {manual.intervalsCount}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-medium truncate max-w-[190px]" title={manual.engines}>
                        {manual.category === 'japones' ? 'Gasolina / Diésel' : 'V6 / V8 / EcoBoost'}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    {isAvailable ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveModalManual(manual)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <BookOpen size={13} />
                          <span>Ver Online</span>
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
                          onClick={() => handleWhatsApp(manual.whatsappMessage)}
                          className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer"
                          title={`Consultar por WhatsApp mantenimiento ${manual.brand}`}
                        >
                          <MessageCircle size={15} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleWhatsApp(manual.whatsappMessage)}
                        className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle size={14} />
                        <span>Consultar Pauta vía WhatsApp</span>
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
                      
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        <strong className="text-slate-700 dark:text-slate-300">Modelos:</strong> {manual.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Actions on row */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {isAvailable ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveModalManual(manual)}
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
                          onClick={() => handleWhatsApp(manual.whatsappMessage)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer"
                          title="WhatsApp"
                        >
                          <MessageCircle size={15} />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleWhatsApp(manual.whatsappMessage)}
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
                  En MasterTech disponemos de software de taller con manuales de fábrica para Dodge, RAM, Hyundai, Kia, Mazda, Mitsubishi y marcas europeas. Solicita la pauta de tu vehículo sin costo.
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
                      Manual Técnico {activeModalManual.brand} ({activeModalManual.years})
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Pauta Oficial de Mantenimiento Preventivo MasterTech
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

              {/* Iframe Viewport */}
              <div className="flex-1 bg-white relative">
                {isLoadingHtml && !modalHtml && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 z-10">
                    <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Cargando especificaciones técnicas oficiales...
                    </p>
                  </div>
                )}
                <iframe
                  src={modalHtml ? undefined : activeModalManual.htmlPath}
                  srcDoc={modalHtml || undefined}
                  title={`Manual Técnico ${activeModalManual.brand}`}
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts allow-modals allow-popups allow-forms"
                />
              </div>

              {/* Modal Bottom Bar */}
              <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 shrink-0 text-xs">
                <span className="text-[11px] text-slate-500">
                  © 2026 Taller MasterTech · Porlamar, Isla de Margarita
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(activeModalManual.whatsappMessage)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <MessageCircle size={14} />
                    <span>Agendar este Servicio vía WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
