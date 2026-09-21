import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  MessageCircle,
  FileText,
  X,
  Sparkles,
  PackageCheck,
  PackageX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  q: string;
  a: string;
  badge?: string;
  isWarrantySpecial?: boolean;
}

const FAQ_LIST: FaqItem[] = [
  {
    q: '¿Tienen garantía los trabajos que realizan?',
    a: '', // Desplegado de forma gráfica enriquecida con el sello y condiciones
    badge: 'POLÍTICA OFICIAL',
    isWarrantySpecial: true
  },
  {
    q: '¿Puedo llevar mis propios repuestos al taller o deben ser comprados en MasterTech?',
    a: 'Sí, puedes traer tus propios repuestos si lo deseas. Sin embargo, ten en cuenta que el taller únicamente se responsabiliza por la mano de obra de montaje profesional, no otorgando garantía sobre el componente externo ni sobre fallas o roturas derivadas de piezas genéricas o de procedencia desconocida. Para disfrutar de garantía total (pieza + mano de obra), recomendamos adquirir los repuestos originales directamente con nosotros.',
    badge: 'REPUESTOS'
  },
  {
    q: '¿Cuánto tiempo toma un mantenimiento preventivo básico?',
    a: 'Un mantenimiento preventivo con cita previa toma entre 45 minutos y 1.5 horas, dependiendo del paquete requerido (cambio de aceite sintético, filtros OEM, revisión de niveles e inspección de seguridad en rampa). Contamos con sala de espera climatizada y Wi-Fi mientras esperas.',
  },
  {
    q: '¿Cómo agendo una cita para mi vehículo?',
    a: 'Puedes agendar directamente por WhatsApp al +58 412 356 5012, a través del formulario web o seleccionando tu horario en la línea de inspección. Nuestro equipo te confirma el turno de inmediato.',
  },
  {
    q: '¿Cuáles son los métodos de pago aceptados?',
    a: 'Aceptamos transferencias bancarias, Pago Móvil (a tasa oficial BCV), efectivo en USD y EUR, Zelle y tarjetas de débito/crédito. Todos los presupuestos se aprueban por escrito antes de iniciar cualquier trabajo.',
  },
  {
    q: '¿Qué tipo de herramientas o tecnología utilizan para el diagnóstico?',
    a: 'Disponemos de escáneres multimarca y específicos de nivel OEM (Launch X431, Autel MaxiSys y software de diagnóstico para Chrysler/Jeep/Dodge/RAM y Toyota), osciloscopios automotrices y herramientas de calibración de sensores TPMS.',
  },
  {
    q: '¿Puedo dejar mi vehículo en el taller si la reparación toma varios días?',
    a: 'Totalmente. Nuestras instalaciones cuentan con cerco perimetral, sistema de cámaras de seguridad en circuito cerrado (CCTV) 24/7 y resguardo techado para tu total tranquilidad.',
  },
  {
    q: '¿Me informan antes de realizar algún trabajo adicional en mi vehículo?',
    a: 'Absolutamente siempre. Si durante la inspección encontramos alguna anomalía o pieza con desgaste no prevista, te enviamos fotos, videos y el presupuesto detallado por WhatsApp para que tú decidas si apruebas o no el trabajo adicional. Cero sorpresas en tu factura.',
  },
];

export default function FaqGarantiaPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Abierto por defecto en la garantía
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWhatsAppGeneral = () => {
    const text = encodeURIComponent("Hola Taller MasterTech, deseo consultar una duda sobre el servicio de mi vehículo.");
    window.open(`https://wa.me/584123565012?text=${text}`, '_blank');
  };

  const handleWhatsAppWarranty = () => {
    const text = encodeURIComponent("Hola Taller MasterTech, deseo consultar la garantía aplicable a la mano de obra y repuestos de mi vehículo.");
    window.open(`https://wa.me/584123565012?text=${text}`, '_blank');
  };

  return (
    <section id="faq-preview" className="py-16 md:py-24 relative overflow-hidden bg-white dark:bg-[#090b10] text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
            <HelpCircle size={15} />
            <span>Transparencia y Dudas Frecuentes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600">Frecuentes</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Resolvemos tus dudas más comunes de forma clara, directa y transparente sobre nuestros servicios, repuestos y políticas de garantía.
          </p>
        </div>

        {/* 2-Column Grid Layout matching screenshot */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: FAQ Accordion List */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_LIST.map((faq, index) => {
              const isOpen = openIndex === index;
              const isSpecial = !!faq.isWarrantySpecial;

              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen 
                      ? isSpecial
                        ? 'border-amber-500/50 bg-amber-500/5 dark:bg-amber-500/5 shadow-lg shadow-amber-500/5'
                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 shadow-sm'
                      : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {isSpecial && (
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
                          <ShieldCheck size={18} />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`text-sm sm:text-base font-bold ${
                            isOpen ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'
                          }`}>
                            {faq.q}
                          </h3>
                          {faq.badge && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              {faq.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen 
                        ? 'bg-amber-500 text-black rotate-180' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/80">
                          {isSpecial ? (
                            /* FULL MASTERTECH CERTIFIED WARRANTY PRESENTATION */
                            <div className="space-y-4 pt-3">
                              
                              {/* Sello + Reglas Claras Card */}
                              <div className="rounded-2xl p-4 sm:p-6 bg-slate-900/60 dark:bg-black/40 border border-amber-500/30 shadow-inner">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                                  
                                  {/* Medallion Badge */}
                                  <div className="flex flex-col items-center justify-center text-center shrink-0 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 via-slate-950/80 to-slate-950 border border-amber-500/30 shadow-lg shadow-black/40 w-full sm:w-auto">
                                    <svg className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-2xl" viewBox="0 0 160 160" fill="none">
                                      <defs>
                                        <linearGradient id="faqGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                                          <stop offset="0%" stopColor="#FDE68A" />
                                          <stop offset="25%" stopColor="#F59E0B" />
                                          <stop offset="50%" stopColor="#D97706" />
                                          <stop offset="75%" stopColor="#FBBF24" />
                                          <stop offset="100%" stopColor="#B45309" />
                                        </linearGradient>
                                        <radialGradient id="faqGoldCenter" cx="50%" cy="50%" r="50%">
                                          <stop offset="0%" stopColor="#FEF08A" />
                                          <stop offset="35%" stopColor="#F59E0B" />
                                          <stop offset="75%" stopColor="#D97706" />
                                          <stop offset="100%" stopColor="#92400E" />
                                        </radialGradient>
                                      </defs>
                                      <circle cx="80" cy="80" r="76" stroke="url(#faqGoldRim)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.75" />
                                      <circle cx="80" cy="80" r="70" stroke="url(#faqGoldRim)" strokeWidth="2" opacity="0.9" />
                                      <circle cx="80" cy="80" r="63" fill="url(#faqGoldCenter)" stroke="url(#faqGoldRim)" strokeWidth="2.5" />
                                      <circle cx="80" cy="80" r="55" stroke="#FEF3C7" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
                                      
                                      {/* 3 Stars at Top */}
                                      <g fill="#0F172A" opacity="0.9">
                                        <path d="M80 34 L81.5 38.5 L86 38.5 L82.5 41 L83.8 45.5 L80 42.8 L76.2 45.5 L77.5 41 L74 38.5 L78.5 38.5 Z" />
                                        <path d="M64 38 L65 41.5 L68.5 41.5 L65.7 43.5 L66.8 47 L64 44.8 L61.2 47 L62.3 43.5 L59.5 41.5 L63 41.5 Z" transform="scale(0.85) translate(14, 5)" />
                                        <path d="M96 38 L97 41.5 L100.5 41.5 L97.7 43.5 L98.8 47 L96 44.8 L93.2 47 L94.3 41.5 L91.5 41.5 L95 41.5 Z" transform="scale(0.85) translate(16, 5)" />
                                      </g>

                                      {/* Center Shield */}
                                      <path d="M80 49 L98 56 C98 76 80 93 80 93 C80 93 62 76 62 56 L80 49 Z" fill="#0F172A" stroke="#FEF3C7" strokeWidth="1.5" />
                                      <path d="M72 69 L77 75 L88 62" fill="none" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                      
                                      {/* Crisp Typography */}
                                      <text x="80" y="106" textAnchor="middle" fill="#0F172A" fontSize="8" fontWeight="900" letterSpacing="1.8" fontFamily="sans-serif">MASTERTECH</text>
                                      <text x="80" y="116" textAnchor="middle" fill="#78350F" fontSize="6.5" fontWeight="800" letterSpacing="1.5" fontFamily="sans-serif">CERTIFICADO</text>
                                    </svg>

                                    {/* Upgraded Luxury Pill Badge */}
                                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border border-amber-400/50 text-amber-300 font-extrabold text-[10px] tracking-wider uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                      <ShieldCheck size={13} className="text-amber-400 shrink-0" />
                                      <span>RESPALDO TÉCNICO OFICIAL</span>
                                    </div>

                                    <span className="text-sm font-black text-white mt-1.5 tracking-tight">
                                      Garantía según Mano de Obra
                                    </span>
                                    <span className="text-[10px] text-slate-400 mt-0.5">
                                      Estipulada en tu orden de servicio
                                    </span>
                                  </div>

                                  {/* Proposition Info */}
                                  <div className="flex-1 space-y-2.5 text-center sm:text-left">
                                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                                      <Sparkles size={12} />
                                      <span>Criterio Técnico y Transparencia</span>
                                    </div>

                                    <h4 className="text-base sm:text-lg font-black text-white">
                                      Reglas claras para proteger tu inversión
                                    </h4>

                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                      Cada trabajo en MasterTech es documentado en tu orden de servicio. La duración de la garantía se determina en función de la mano de obra específica requerida. Cuando adquieres los repuestos a través de nosotros, garantizamos el resultado integral; si tú traes el repuesto, la garantía de la pieza no aplica.
                                    </p>

                                    <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                                      <button
                                        type="button"
                                        onClick={() => setIsTermsModalOpen(true)}
                                        className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <FileText size={14} />
                                        <span>Ver Términos de la Garantía</span>
                                      </button>

                                      <button
                                        type="button"
                                        onClick={handleWhatsAppWarranty}
                                        className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <MessageCircle size={14} />
                                        <span>Consultar por WhatsApp</span>
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              </div>

                              {/* Dos Escenarios de Repuestos */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 text-xs mb-1">
                                    <CheckCircle2 size={16} />
                                    <span>Repuestos provistos por MasterTech</span>
                                  </div>
                                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                                    Cuentan con garantía formal tanto en la pieza OEM de primer equipo como en la mano de obra de instalación.
                                  </p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200">
                                  <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">
                                    <AlertTriangle size={16} />
                                    <span>Repuestos traídos por el cliente</span>
                                  </div>
                                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                                    El cliente puede suministrar sus piezas, pero el taller NO otorga garantía sobre el repuesto externo ni fallas derivadas de su procedencia.
                                  </p>
                                </div>
                              </div>

                            </div>
                          ) : (
                            <p className="pt-2">{faq.a}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: "¿Tienes otra pregunta?" CTA Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white dark:bg-[#12141a] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 text-center shadow-xl relative overflow-hidden">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mx-auto mb-5 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 -rotate-45" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-white">
                ¿Tienes otra pregunta?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                Nuestro equipo de asesores de servicio está disponible en WhatsApp para responder cualquier duda sobre tu vehículo al instante.
              </p>
              <button
                type="button"
                onClick={handleWhatsAppGeneral}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Hablar con un Asesor</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Modal de Términos Oficiales de Garantía */}
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
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
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
                  onClick={handleWhatsAppWarranty}
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
