import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Gauge, 
  FileText, 
  X, 
  MessageCircle, 
  Sparkles, 
  AlertTriangle, 
  PackageCheck, 
  PackageX, 
  Clock, 
  Cpu, 
  CreditCard, 
  Lock, 
  Car, 
  Camera, 
  Truck,
  ArrowRight,
  Search,
  Check,
  ExternalLink,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GarantiaMasterTechProps {
  onOpenBooking?: () => void;
}

interface FaqItem {
  icon: React.ElementType;
  title: string;
  category: 'garantia' | 'repuestos' | 'diagnostico' | 'pagos' | 'seguridad';
  tag: string;
  desc: string;
  highlight: string;
  tagStyle: string;
  iconStyle: string;
  footerStyle: string;
  isNoWarranty?: boolean;
}

export default function GarantiaMasterTech({ onOpenBooking }: GarantiaMasterTechProps) {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<string>('todos');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');

  const faqItems: FaqItem[] = [
    {
      icon: Wrench,
      title: "Garantía por Mano de Obra",
      category: "garantia",
      tag: "Sujeto al Servicio",
      desc: "Cobertura formal estipulada en tu orden de servicio digital según el tipo de reparación realizada (motor, frenos, tren delantero, transmisión o mantenimiento preventivo).",
      highlight: "Período fijado según la labor técnica",
      tagStyle: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
      iconStyle: "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: PackageCheck,
      title: "Repuestos Provistos por MasterTech",
      category: "repuestos",
      tag: "Garantía Total",
      desc: "Las piezas suministradas por el taller cuentan con garantía total: respaldamos tanto el repuesto original certificado como la mano de obra de instalación.",
      highlight: "Respaldo integral en pieza e instalación",
      tagStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      iconStyle: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: PackageX,
      title: "Repuestos Traídos por el Cliente",
      category: "repuestos",
      tag: "Garantía de Montaje",
      desc: "Puedes traer tus propios repuestos y garantizamos nuestra mano de obra de montaje. No asumimos garantía sobre piezas externas ni fallas derivadas de las mismas.",
      highlight: "Sin cobertura sobre repuestos externos",
      tagStyle: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      iconStyle: "bg-red-500/10 border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white",
      footerStyle: "text-amber-600 dark:text-amber-400",
      isNoWarranty: true
    },
    {
      icon: Gauge,
      title: "Torque y Ajustes de Manual",
      category: "garantia",
      tag: "Cero Improvisación",
      desc: "Todo ensamble se ejecuta con torquímetro y tolerancias oficiales de fábrica, evitando roturas mecánicas prematuras y garantizando la vida útil de cada componente.",
      highlight: "Normas y tolerancias de fabricante",
      tagStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      iconStyle: "bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Car,
      title: "Atención a Todas las Marcas",
      category: "garantia",
      tag: "Multimarca",
      desc: "Atendemos mecánica general, frenos, suspensión y mantenimiento para cualquier vehículo, con especialización técnica profunda en Jeep y Toyota.",
      highlight: "Mecánica general multimarca garantizada",
      tagStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      iconStyle: "bg-purple-500/10 border-purple-500/20 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Cpu,
      title: "Diagnóstico Electrónico OEM",
      category: "diagnostico",
      tag: "Escáner Avanzado",
      desc: "Escaneo de nivel concesionario para detectar la falla exacta de motor, transmisión o sensores, sin adivinanzas ni cambios innecesarios de piezas.",
      highlight: "Detección certera sin adivinanzas",
      tagStyle: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      iconStyle: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Camera,
      title: "Transparencia y Cero Sorpresas",
      category: "garantia",
      tag: "Aprobación Previa",
      desc: "Nada se repara sin tu visto bueno. Te enviamos reporte fotográfico, video de la falla y presupuesto detallado vía WhatsApp antes de proceder con el trabajo.",
      highlight: "Aprobación con fotos y videos por WhatsApp",
      tagStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      iconStyle: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Clock,
      title: "Mantenimiento Express en Rampa",
      category: "garantia",
      tag: "Tiempo Estimado",
      desc: "Servicios preventivos listos en 45 a 90 minutos con cita previa. Puedes esperar cómodamente en nuestra sala climatizada con Wi-Fi.",
      highlight: "Entrega puntual con turno agendado",
      tagStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      iconStyle: "bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Truck,
      title: "Recepción de Grúas y Emergencias",
      category: "seguridad",
      tag: "Auxilio Vial",
      desc: "Si tu vehículo llega accidentado o en plataforma de grúa, lo recibimos en patio de inmediato con turno de diagnóstico prioritario y resguardo seguro.",
      highlight: "Recepción inmediata de autos en grúa",
      tagStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      iconStyle: "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: CreditCard,
      title: "Precios Claros y Tasa Oficial BCV",
      category: "pagos",
      tag: "Tasa Oficial BCV",
      desc: "Cobro exacto en Bolívares a tasa oficial BCV del día sin recargos. Aceptamos Pago Móvil, transferencias, efectivo USD/EUR, Zelle y USDT.",
      highlight: "Sin sobreprecios, tasa oficial BCV",
      tagStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      iconStyle: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Lock,
      title: "Seguridad y Custodia del Vehículo",
      category: "seguridad",
      tag: "Vigilancia 24/7",
      desc: "Estacionamiento techado cerrado, circuito cerrado de cámaras CCTV en alta definición y vigilancia privada nocturna mientras tu auto esté en el taller.",
      highlight: "Instalaciones techadas y vigiladas 24/7",
      tagStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      iconStyle: "bg-purple-500/10 border-purple-500/20 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: PackageCheck,
      title: "Repuestos en Stock e Importación",
      category: "repuestos",
      tag: "Piezas OEM",
      desc: "Inventario en taller de filtros, lubricantes y repuestos certificados, más servicio de importación express directa desde EE.UU. para partes difíciles.",
      highlight: "Stock en taller e importación express",
      tagStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      iconStyle: "bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    }
  ];

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent("Hola Taller MasterTech, deseo consultar la garantía aplicable a un trabajo y repuestos para mi vehículo.");
    window.open(`https://wa.me/584123565012?text=${text}`, '_blank');
  };

  const filteredFaqItems = useMemo(() => {
    return faqItems.filter(item => {
      const matchesCategory = faqCategoryFilter === 'todos' || item.category === faqCategoryFilter;
      const q = faqSearchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q) || 
        item.tag.toLowerCase().includes(q) ||
        item.highlight.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [faqCategoryFilter, faqSearchQuery]);

  return (
    <section id="garantia" className="py-12 md:py-20 relative overflow-hidden bg-slate-50 dark:bg-[#090b10] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-red-500/10 via-rose-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER: AUTORIDAD Y RESPALDO TÉCNICO                           */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 dark:bg-red-500/15 border border-red-600/25 dark:border-red-500/30 text-red-600 dark:text-red-400 text-xs font-black tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Política de Garantía Oficial &amp; Respaldo Técnico</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Tu Vehículo en Manos Expertas,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-red-600">
              Garantizado por Escrito
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Cero letra chica y cero improvisaciones. Toda intervención mecánica, eléctrica y repuesto suministrado en Taller MasterTech queda respaldado formalmente en tu orden digital de servicio.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. MASTER GUARANTEE CERTIFICATE VAULT (EL CERTIFICADO REDISEÑADO)         */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0e121a] via-[#121622] to-[#090b10] border border-white/15 shadow-2xl text-white overflow-hidden group">
          
          {/* Geometric tech grid & radial spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Top Decorative Certificate Header Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                <ShieldCheck size={16} />
              </div>
              <span className="font-mono font-bold tracking-wider uppercase text-zinc-300">
                Certificado Oficial de Respaldo Técnico
              </span>
              <span className="hidden sm:inline-block text-zinc-600">•</span>
              <span className="hidden sm:inline-block font-mono text-zinc-400">
                Taller MasterTech · Porlamar, Isla de Margarita
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                Estado: Activo &amp; Vinculado a Orden Digital
              </span>
            </div>
          </div>

          {/* Main Certificate Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
            
            {/* Left Side: Escudo / Sello Holográfico de Confianza */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-xl relative overflow-hidden">
              
              {/* Outer Glow Ring */}
              <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 mb-6">
                <div 
                  className="absolute inset-0 rounded-full p-[3px] animate-spin" 
                  style={{ animationDuration: '14s', background: 'conic-gradient(from 0deg, #ef4444, #f59e0b, #ef4444, transparent, transparent)' }}
                >
                  <div className="w-full h-full rounded-full bg-[#0d1017]" />
                </div>
                
                <div className="absolute inset-3 rounded-full border border-red-500/25" />
                <div className="absolute inset-6 rounded-full bg-red-600/15 blur-lg animate-pulse" style={{ animationDuration: '3s' }} />

                {/* MasterTech Emblem */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Logo MasterTech"
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_0_24px_rgba(239,68,68,0.85)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Title & Seal Details */}
              <div className="space-y-1 mb-5">
                <div className="font-display font-black text-2xl tracking-[0.15em] uppercase text-white">
                  MASTER<span className="text-red-500 italic">TECH</span>
                </div>
                <div className="text-[11px] font-black tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-400">
                  Sello Oficial de Calidad y Respaldo
                </div>
                <p className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  REGISTRO: MT-CERT-2026-OFICIAL
                </p>
              </div>

              {/* 3 Metric Capsules */}
              <div className="grid grid-cols-3 gap-2 w-full pt-4 border-t border-white/10 text-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-base sm:text-lg font-black text-red-400">3–6</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Meses</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-base sm:text-lg font-black text-emerald-400">OEM</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Piezas</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-base sm:text-lg font-black text-amber-400">100%</div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Escrita</div>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="mt-4 pt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold text-zinc-300">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                <span>Estipulada formalmente en tu orden digital</span>
              </div>
            </div>

            {/* Right Side: Declaración Ejecutiva & Acciones */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-black tracking-wider uppercase text-red-400 bg-red-600/15 border border-red-500/30 px-3.5 py-1 rounded-full">
                  <Sparkles size={14} className="text-red-400" />
                  <span>Compromiso de Blindaje y Transparencia</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight leading-tight">
                  Garantía Directa en Mano de Obra y Repuestos Suministrados
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Cada reparación ejecutada en nuestras instalaciones cuenta con respaldo técnico formal estipulado en tu orden de servicio digital. Si suministramos el repuesto, la garantía es total (pieza + mano de obra). Si traes tu pieza, garantizamos el ensamble técnico con torquímetro y especificación de fábrica.
                </p>
              </div>

              {/* 4 Feature Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Trazabilidad por WhatsApp</span>
                    <span className="text-[11px] text-zinc-400">Fotos y videos de la falla antes de iniciar.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Aprobación Previa Obligatoria</span>
                    <span className="text-[11px] text-zinc-400">Presupuesto detallado sin costos sorpresa.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Torque de Manual Oficial</span>
                    <span className="text-[11px] text-zinc-400">Ajuste con torquímetro según fabricante.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Tasa Oficial BCV del Día</span>
                    <span className="text-[11px] text-zinc-400">Cobro exacto en Bs sin recargos.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={16} />
                  <span>Ver Términos &amp; Condiciones</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>Consultar por WhatsApp</span>
                </button>

                <a
                  href="#faq-grid"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10 flex items-center gap-2"
                >
                  <span>Preguntas Frecuentes</span>
                  <ArrowRight size={14} />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TRES PILARES DE TRANSPARENCIA: COMPARATIVA CLARA DE COBERTURA          */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300">
              Políticas Claras y Transparentes de Cobertura
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Tarjeta 1: Repuestos MasterTech */}
            <div className="rounded-2xl p-6 bg-white dark:bg-[#11141c] border border-emerald-500/30 dark:border-emerald-500/30 shadow-md hover:shadow-xl transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 flex items-center justify-center">
                  <PackageCheck size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  Garantía Total 100%
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Repuestos Provistos por MasterTech
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Las piezas suministradas por el taller cuentan con respaldo integral: garantizamos tanto el componente original como la mano de obra calificada de instalación. Si el repuesto presenta defectos, nosotros respondemos.
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={14} />
                <span>Cobertura completa: pieza + instalación</span>
              </div>
            </div>

            {/* Tarjeta 2: Repuestos del Cliente */}
            <div className="rounded-2xl p-6 bg-white dark:bg-[#11141c] border border-amber-500/30 dark:border-amber-500/30 shadow-md hover:shadow-xl transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex items-center justify-center">
                  <Wrench size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  Garantía de Ensamble
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Repuestos Traídos por el Cliente
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Eres libre de traer tus propios repuestos y garantizamos al 100% el montaje profesional con torquímetro. La garantía de la pieza corre por cuenta de tu vendedor externo; cero letra chica ni confusiones.
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                <AlertTriangle size={14} />
                <span>Garantizamos el ensamble; pieza por tu proveedor</span>
              </div>
            </div>

            {/* Tarjeta 3: Mano de Obra y Torques */}
            <div className="rounded-2xl p-6 bg-white dark:bg-[#11141c] border border-red-500/30 dark:border-red-500/30 shadow-md hover:shadow-xl transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25 flex items-center justify-center">
                  <Gauge size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30">
                  Tolerancias de Fábrica
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Mano de Obra y Especificación
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                El tiempo y alcance de garantía de mano de obra se fijan según el servicio realizado (motor, transmisión, frenos, tren delantero o afinación) y quedan formalmente registrados en tu orden digital.
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-bold text-red-600 dark:text-red-400">
                <CheckCircle2 size={14} />
                <span>Estipulada y firmada en tu orden de trabajo</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. PREGUNTAS FRECUENTES Y BASE DE CONOCIMIENTO (12 TARJETAS)              */}
        {/* ========================================================================= */}
        <div id="faq-grid" className="space-y-6 pt-4 scroll-mt-24">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[11px] font-black uppercase text-red-600 dark:text-red-400 tracking-wider">
                  Base de Conocimiento MasterTech
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                Preguntas Frecuentes sobre el Servicio
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Respuestas claras a las dudas más comunes sobre tiempos de espera, repuestos, garantía, pagos y seguridad.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar duda (ej. BCV, repuesto, tiempo)..."
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#11141c] border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-9 pr-8 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-red-500 shadow-sm"
              />
              {faqSearchQuery && (
                <button
                  type="button"
                  onClick={() => setFaqSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'todos', label: `Todas (${faqItems.length})` },
              { id: 'garantia', label: 'Garantía & Servicio' },
              { id: 'repuestos', label: 'Repuestos & Piezas' },
              { id: 'diagnostico', label: 'Diagnóstico & Escáner' },
              { id: 'pagos', label: 'Tasa BCV & Pagos' },
              { id: 'seguridad', label: 'Seguridad & Custodia' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFaqCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  faqCategoryFilter === cat.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white dark:bg-[#11141c] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredFaqItems.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isNoWarranty = pillar.isNoWarranty;
              return (
                <div 
                  key={idx}
                  className={`group relative rounded-2xl p-5 bg-white dark:bg-[#11141c] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                    isNoWarranty 
                      ? 'border-red-500/30 dark:border-red-500/25 hover:border-red-500/60' 
                      : 'border-slate-200 dark:border-white/10 hover:border-red-500/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${pillar.iconStyle}`}>
                        <Icon size={20} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${pillar.tagStyle}`}>
                        {pillar.tag}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className={`mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-semibold ${pillar.footerStyle}`}>
                    {isNoWarranty ? <AlertTriangle size={13} className="shrink-0" /> : <CheckCircle2 size={13} className="shrink-0 text-emerald-500" />}
                    <span>{pillar.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredFaqItems.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#11141c] border border-slate-200 dark:border-white/10 space-y-2">
              <HelpCircle size={28} className="mx-auto text-slate-400" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No se encontraron preguntas que coincidan con tu búsqueda.
              </p>
              <button
                type="button"
                onClick={() => { setFaqCategoryFilter('todos'); setFaqSearchQuery(''); }}
                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
              >
                Limpiar filtros de búsqueda
              </button>
            </div>
          )}

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL DE TÉRMINOS & CONDICIONES OFICIALES DE GARANTÍA                   */}
      {/* ========================================================================= */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isTermsModalOpen && (
            <div 
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setIsTermsModalOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#11141c] border border-slate-200 dark:border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 dark:text-white relative"
              >
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">
                        Condiciones Oficiales de Garantía
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Taller MasterTech C.A. — Porlamar, Isla de Margarita
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsTermsModalOpen(false)} 
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-slate-800 dark:text-slate-200">
                    <p className="font-bold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                      <ShieldCheck size={16} />
                      <span>Alcance según Trabajo Realizado</span>
                    </p>
                    <p className="text-xs leading-normal">
                      El tiempo y cobertura de garantía aplican de forma diferenciada según la naturaleza de la mano de obra realizada en el vehículo. Cada orden de servicio especifica los términos del trabajo acordado.
                    </p>
                  </div>

                  {/* Diferenciación Clara de Repuestos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1.5 font-black text-emerald-700 dark:text-emerald-400 text-xs mb-1">
                        <PackageCheck size={16} />
                        <span>Repuesto Provisto por MasterTech</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                        Cuenta con garantía formal sobre el componente y la mano de obra de montaje, respaldado por la calidad OEM de nuestras piezas importadas.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1.5 font-black text-red-600 dark:text-red-400 text-xs mb-1">
                        <PackageX size={16} />
                        <span>Repuesto Traído por el Cliente</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                        Garantizamos el ensamble técnico. NO corre garantía sobre la pieza externa ni fallas o daños colaterales que la pieza suministrada externamente pudiera generar.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">
                      1. Determinación de la Garantía por Mano de Obra
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>La garantía cubre exclusivamente defectos de armado, ajuste o calibración imputables a la mano de obra realizada en nuestros puestos de trabajo.</li>
                      <li>El plazo exacto depende de la complejidad técnica del servicio (reparación mayor de motor, cajas, tren delantero, frenos o servicio preventivo) y queda registrado en tu orden o factura.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">
                      2. Exclusiones de la Garantía
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <li>Repuestos suministrados externamente por el cliente o piezas de segunda mano aportadas sin certificación previa.</li>
                      <li>Intervenciones posteriores, desarmados o modificaciones realizadas por talleres o mecánicos terceros ajenos a MasterTech.</li>
                      <li>Vehículos que sufran recalentamiento por fuga de agua ajena a la reparación, falta de aceite o negligencia del usuario.</li>
                      <li>Uso indebido del vehículo en condiciones extremas, siniestros o inmersión en agua salina.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">
                      3. Proceso para Revisión
                    </h4>
                    <p className="text-xs">
                      Para cualquier revisión técnica bajo garantía, presenta tu número de placa o comprobante de servicio digital para una inspección prioritaria en nuestras instalaciones de Porlamar.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>Consultar con el Jefe de Taller</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTermsModalOpen(false)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
