import React, { useState } from 'react';
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
  Clock,
  Cpu,
  CreditCard,
  Lock,
  Car,
  Camera,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GarantiaMasterTechProps {
  onOpenBooking?: () => void;
}

export default function GarantiaMasterTech({ onOpenBooking }: GarantiaMasterTechProps) {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const pillars = [
    {
      icon: Wrench,
      title: "Garantía por Mano de Obra",
      tag: "Sujeto al Servicio",
      desc: "Cobertura formal estipulada en tu orden de servicio digital según el tipo de reparación realizada (motor, frenos, tren delantero o mantenimiento).",
      highlight: "Período fijado según la labor técnica",
      tagStyle: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700",
      iconStyle: "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: PackageCheck,
      title: "Repuestos Provistos por MasterTech",
      tag: "Con Garantía",
      desc: "Las piezas suministradas por el taller cuentan con garantía total: respaldamos tanto el repuesto original como la instalación técnica.",
      highlight: "Respaldo total en pieza e instalación",
      tagStyle: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700",
      iconStyle: "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: PackageX,
      title: "Repuestos Traídos por el Cliente",
      tag: "Sin Garantía",
      desc: "Puedes traer tus propios repuestos y garantizamos la mano de obra. No asumimos garantía sobre piezas externas ni fallas derivadas de las mismas.",
      highlight: "Sin cobertura sobre repuestos externos",
      tagStyle: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      iconStyle: "bg-red-500/10 border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white",
      footerStyle: "text-amber-600 dark:text-amber-400",
      isNoWarranty: true
    },
    {
      icon: Gauge,
      title: "Torque y Ajustes de Manual",
      tag: "Cero Improvisación",
      desc: "Todo ensamble se ejecuta con torquímetro y tolerancias de fábrica, evitando roturas mecánicas y garantizando la vida útil de cada componente.",
      highlight: "Normas y tolerancias de fábrica",
      tagStyle: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700",
      iconStyle: "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Car,
      title: "Atención a Todas las Marcas",
      tag: "Multimarca",
      desc: "Atendemos mecánica general, frenos, suspensión y mantenimiento para cualquier vehículo, con especialización técnica profunda en Jeep y Toyota.",
      highlight: "Mecánica general multimarca garantizada",
      tagStyle: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      iconStyle: "bg-red-500/10 border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Cpu,
      title: "Diagnóstico Electrónico OEM",
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
      tag: "Aprobación Previa",
      desc: "Nada se repara sin tu visto bueno. Te enviamos reporte fotográfico, video de la falla y presupuesto detallado vía WhatsApp antes de proceder.",
      highlight: "Aprobación con fotos y videos por WhatsApp",
      tagStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      iconStyle: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: Clock,
      title: "Mantenimiento Express en Rampa",
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
      tag: "Auxilio Vial",
      desc: "Si tu vehículo llega accidentado o en grúa, lo recibimos en patio de inmediato con turno de diagnóstico prioritario y resguardo seguro.",
      highlight: "Recepción inmediata de autos en grúa",
      tagStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      iconStyle: "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: CreditCard,
      title: "Precios Claros y Tasa Oficial BCV",
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
      tag: "Vigilancia 24/7",
      desc: "Estacionamiento techado cerrado, circuito de cámaras CCTV en alta definición y vigilancia privada nocturna mientras tu auto esté en el taller.",
      highlight: "Instalaciones techadas y vigiladas 24/7",
      tagStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      iconStyle: "bg-purple-500/10 border-purple-500/20 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
      footerStyle: "text-emerald-600 dark:text-emerald-400",
      isNoWarranty: false
    },
    {
      icon: PackageCheck,
      title: "Repuestos en Stock e Importación",
      tag: "Piezas OEM",
      desc: "Inventario en taller de filtros y lubricantes sintéticos certificados, más importación express directa desde EE.UU. para partes difíciles.",
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

  return (
    <section id="garantia" className="py-16 md:py-24 relative overflow-hidden bg-slate-100 dark:bg-[#0b0d13] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-500/10 dark:bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-black tracking-wider uppercase mb-4 shadow-sm">
            <ShieldCheck size={16} className="text-red-500" />
            <span>Condiciones Claras y Respaldo Técnico</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Sello y Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">Garantía MasterTech</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Transparencia ante todo: la garantía depende de la mano de obra realizada en el vehículo. Los repuestos suministrados por el taller cuentan con respaldo formal, mientras que las piezas externas aportadas por el cliente no tienen garantía.
          </p>
        </div>

        {/* Central Trust Banner */}
        <div className="relative rounded-3xl p-6 sm:p-10 mb-12 bg-white/90 dark:bg-[#0e1219]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-red-500/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sello Shield Badge Graphic - Brand Aligned MasterTech Engineering Seal */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 via-[#0e1219] to-[#080a0e] border border-red-500/30 dark:border-red-500/40 shadow-2xl shadow-red-500/10 relative overflow-hidden group">
              {/* High-tech radial background and red laser accent */}
              <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:14px_14px] opacity-15 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-red-600/15 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

              {/* Engineering Seal Content */}
              <div className="relative z-10 flex flex-col items-center w-full">
                
                {/* Top Technical Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-mono text-[9px] tracking-widest uppercase mb-4 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>CERTIFICACIÓN TÉCNICA</span>
                </div>

                {/* Center Emblem Plaque with Official Logo */}
                <div className="relative my-2 flex items-center justify-center">
                  {/* Pulsing red halo */}
                  <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-2xl scale-110" />
                  
                  {/* Recessed carbon/slate badge housing */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-b from-[#161a24] to-[#0b0d13] border border-slate-700/80 p-4 flex flex-col items-center justify-center shadow-2xl group-hover:border-red-500/60 transition-all duration-300">
                    <img 
                      src="/logo.png" 
                      alt="Logo MasterTech" 
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_4px_16px_rgba(239,68,68,0.55)] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Brand & Guarantee Typography */}
                <div className="mt-4 space-y-1">
                  <div className="font-display font-black text-lg sm:text-xl tracking-wider uppercase text-white flex items-center justify-center gap-1">
                    MASTER<span className="text-red-500 italic">TECH</span>
                  </div>
                  <div className="text-[11px] font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-red-500">
                    SELLO DE GARANTÍA OFICIAL
                  </div>
                </div>

                {/* Fine divider */}
                <div className="w-4/5 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent my-3.5" />

                {/* Scope Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-slate-200 text-[10px] font-bold">
                  <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
                  <span>Según Mano de Obra Realizada</span>
                </div>

                <p className="text-[10px] text-slate-400 mt-2 font-medium">
                  Estipulada formalmente en tu orden de servicio
                </p>
              </div>
            </div>

            {/* Banner Value Proposition */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full w-fit">
                <Sparkles size={14} />
                <span>Criterio Técnico y Transparencia</span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Reglas claras para proteger tu inversión
              </h4>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Cada trabajo en MasterTech es documentado en tu orden de servicio. La duración de la garantía se determina en función de la mano de obra específica requerida. Cuando adquieres los repuestos a través de nosotros, garantizamos el resultado integral; si tú traes el repuesto, la garantía de la pieza no aplica.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={15} />
                  <span>Ver Términos de la Garantía</span>
                </button>

                <a
                  href="#faq-cards"
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs transition-all flex items-center gap-2"
                >
                  <span>Ver Preguntas Frecuentes</span>
                </a>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Consultar por WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 12 Tarjetas FAQ y Respaldo Técnico (Grid de 4 Columnas) */}
        <div id="faq-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-mt-24">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isNoWarranty = pillar.isNoWarranty;
            return (
              <div 
                key={idx}
                className={`group relative rounded-2xl p-6 bg-white dark:bg-slate-900/50 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  isNoWarranty 
                    ? 'border-red-500/30 dark:border-red-500/20 hover:border-red-500/60' 
                    : 'border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${pillar.iconStyle}`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${pillar.tagStyle}`}>
                      {pillar.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold ${pillar.footerStyle}`}>
                  {isNoWarranty ? <AlertTriangle size={13} className="shrink-0" /> : <CheckCircle2 size={13} className="shrink-0 text-emerald-500" />}
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal de Términos de Garantía */}
      <AnimatePresence>
        {isTermsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#11141c] border border-slate-200 dark:border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 dark:text-white"
            >
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">
                      Condiciones Oficiales de Garantía
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Taller MasterTech — Porlamar, Isla de Margarita
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsTermsModalOpen(false)} 
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-700 dark:text-slate-200">
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
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-1.5 font-black text-emerald-700 dark:text-emerald-400 text-xs mb-1">
                      <PackageCheck size={16} />
                      <span>Repuesto Provisto por MasterTech</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                      Cuenta con garantía formal sobre el componente y la mano de obra de montaje, respaldado por la calidad OEM de nuestras piezas importadas.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-1.5 font-black text-red-600 dark:text-red-400 text-xs mb-1">
                      <PackageX size={16} />
                      <span>Repuesto Traído por el Cliente</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                      NO corre con garantía sobre el repuesto ni fallas o daños colaterales que la pieza suministrada externamente pudiera generar en el vehículo.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">
                    1. Determinación de la Garantía por Mano de Obra
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>La garantía cubre exclusivamente defectos de armado, ajuste o calibración imputables a la mano de obra realizada en nuestras bahías.</li>
                    <li>El plazo exacto depende de la complejidad técnica del servicio (reparación mayor de motor, cajas, tren delantero, frenos o servicio preventivo) y queda registrado en tu orden o factura.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">
                    2. Exclusiones de la Garantía
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <li>Repuestos suministrados externamente por el cliente o piezas de segunda mano aportadas sin certificación.</li>
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
                    Para cualquier revisión técnica bajo garantía, presenta tu número de placa o comprobante de servicio digital para una inspección prioritaria en nuestras instalaciones.
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
      </AnimatePresence>
    </section>
  );
}
