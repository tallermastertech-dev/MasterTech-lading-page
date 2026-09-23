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
  Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ManualCard {
  id: string;
  brand: string;
  badge: string;
  badgeColor: string;
  logoUrl?: string;
  years: string;
  subtitle: string;
  models: string[];
  engines: string;
  fluids: string;
  keyHighlight: string;
  intervalsCount: string;
  htmlPath: string;
  whatsappMessage: string;
}

const MANUALES: ManualCard[] = [
  {
    id: 'toyota',
    brand: 'TOYOTA',
    badge: 'Edición Oficial MasterTech',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/30',
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
    badge: 'Edición Oficial MasterTech',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
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
    badge: 'Edición Oficial MasterTech',
    badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    years: '2021 – 2027',
    subtitle: 'Versa, Sentra, Kicks, Frontier / Navara, X-Trail, Altima, Pathfinder, Patrol',
    models: ['Sentra (2.0L MR20DD)', 'Frontier / Navara (YD25 / QR25)', 'X-Trail (QR25 / 1.5T VC)', 'Versa (HR16DE)', 'Kicks (1.6L)', 'Altima', 'Pathfinder', 'Patrol Y61/Y62'],
    engines: 'Gasolina HR / MR / QR / VC-Turbo · Diésel YD25DDTi Common Rail',
    fluids: 'Aceite sintético 0W-20 / 5W-30 API SP · Fluido exclusivo Genuine Nissan NS-3 para CVT',
    keyHighlight: 'Conteo de deterioro de fluido CVT por escáner y resguardo térmico de poleas Jatco.',
    intervalsCount: '6 Intervalos (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-nissan.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento para mi Nissan según la pauta de su Manual Técnico.'
  }
];

export default function PreviewManuales() {
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'toyota' | 'honda' | 'nissan'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalManual, setActiveModalManual] = useState<ManualCard | null>(null);
  const [isDark, setIsDark] = useState(true);

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
    const matchesBrand = selectedBrand === 'all' || m.id === selectedBrand;
    const matchesSearch = searchQuery === '' || 
      m.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.models.some(model => model.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBrand && matchesSearch;
  });

  const handlePrint = (htmlPath: string) => {
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
                Centro de Manuales Técnicos MasterTech · Ruta aislada: <code className="text-red-500 font-mono">/preview-manuales</code>
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
            <span>Documentación y Pautas Oficiales de Servicio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Manuales Técnicos de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
              Mantenimiento Preventivo
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            En MasterTech no trabajamos por intuición. Ponemos a disposición de nuestros clientes las pautas oficiales de fábrica con especificaciones de torque, viscosidades y servicios críticos adaptados a las exigencias térmicas y costeras de la Isla de Margarita.
          </p>

          {/* Badges bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>100% Gratuitos y Descargables</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <ShieldCheck size={14} className="text-blue-500" />
              <span>Tolerancias y Torques de Manual</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              <Printer size={14} className="text-amber-500" />
              <span>Optimizado para Impresión en PDF</span>
            </span>
          </div>

        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/40 backdrop-blur-sm sticky top-[57px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Todas las Marcas' },
              { id: 'toyota', label: 'Toyota' },
              { id: 'honda', label: 'Honda' },
              { id: 'nissan', label: 'Nissan' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedBrand(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedBrand === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar modelo (ej. Hilux, CR-V, Sentra)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

        </div>
      </section>

      {/* Manuals Cards Grid */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredManuales.map((manual) => (
            <div
              key={manual.id}
              className="rounded-3xl bg-white dark:bg-[#0e1219] border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Card Header Top */}
              <div className="p-6 sm:p-7 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-black uppercase border tracking-wider ${manual.badgeColor}`}>
                    <Sparkles size={11} />
                    <span>{manual.badge}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    {manual.years}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                      {manual.brand}
                    </h3>
                    <p className="text-xs font-bold text-red-600 dark:text-red-400 mt-0.5">
                      Manual Técnico de Mantenimiento Preventivo
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <FileText size={22} className="text-red-500" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1">
                
                {/* Models tags */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Modelos Cubiertos
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {manual.models.map((mod, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specs Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                      ⚙️ Motores Analizados:
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {manual.engines}
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                      🛢️ Fluidos & Viscosidades Recomendadas:
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {manual.fluids}
                    </span>
                  </div>
                </div>

                {/* Key Insight */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 text-xs">
                  <div className="font-black text-amber-700 dark:text-amber-400 text-[11px] mb-0.5 flex items-center gap-1">
                    <ShieldCheck size={13} />
                    <span>Punto Crítico en Margarita:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {manual.keyHighlight}
                  </p>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="p-6 sm:p-7 pt-0 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalManual(manual)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <BookOpen size={14} />
                    <span>Ver Online</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrint(manual.htmlPath)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Descargar PDF</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsApp(manual.whatsappMessage)}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle size={14} />
                  <span>Agendar Mantenimiento {manual.brand}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Jeep & Ford Special Request Card */}
        <div className="mt-10 rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-amber-500/10 via-red-500/5 to-slate-100 dark:from-amber-500/5 dark:via-red-500/5 dark:to-[#0e1219] border border-amber-500/30 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center shrink-0">
                <Wrench size={30} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  ¿Tu marca no está en la lista?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Pautas de Mantenimiento para Jeep, Ford, Chevrolet o RAM
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                  Disponemos de la base de datos de tolerancias de concesionario para motores Pentastar 3.6L, EcoBoost, HEMI y Vortec. Solicita la pauta de mantenimiento oficial para tu modelo exacto con nuestros ingenieros.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleWhatsApp('Hola MasterTech, deseo consultar la pauta de mantenimiento oficial para mi vehículo (Jeep/Ford/Otro).')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer hover:scale-105"
            >
              <MessageCircle size={17} />
              <span>Solicitar Pauta vía WhatsApp</span>
            </button>

          </div>
        </div>

      </section>

      {/* Why MasterTech Works With Technical Manuals */}
      <section className="py-14 bg-white dark:bg-[#0c0f15] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ¿Por qué MasterTech publica sus pautas técnicas?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Elevando el estándar del servicio automotriz en la Isla de Margarita con base científica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Torque Exacto con Torquímetro Calibrado
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cada perno de biela, culata, mordaza de freno y tapón de cárter se aprieta según el manual de fábrica, evitando roscas barridas y deformaciones en caliente.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Viscosidades Certificadas para Clima Costero
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El calor y el salitre de Margarita degradan los lubricantes más rápido. Especificamos la norma API SP exacta para proteger bombas de aceite y cadenas de tiempo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Trazabilidad Total en tu Orden de Servicio
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Todo lo que estipula el manual queda registrado en tu orden digital, permitiéndote comprobar el historial y valor de reventa de tu vehículo.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Modal Viewer */}
      <AnimatePresence>
        {activeModalManual && (
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
                <iframe
                  src={activeModalManual.htmlPath}
                  title={`Manual Técnico ${activeModalManual.brand}`}
                  className="w-full h-full border-0"
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
