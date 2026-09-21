import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, MessageCircle } from 'lucide-react';
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
    a: '', // Handled specially below with structured layout
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
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open warranty question by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hola Taller MasterTech, deseo consultar una duda sobre el servicio y garantía de mi vehículo.");
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
                        ? 'border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/5 shadow-md shadow-amber-500/5'
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
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm sm:text-base font-bold ${
                            isOpen ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'
                          }`}>
                            {faq.q}
                          </h3>
                          {faq.badge && (
                            <span className="hidden sm:inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
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
                            <div className="space-y-3 pt-2">
                              <p>
                                <strong>Sí.</strong> La garantía se establece <strong>en función de la mano de obra y el tipo de trabajo realizado</strong> en el vehículo (reparaciones mayores de motor, tren delantero, transmisión, frenos o servicio preventivo), quedando formalmente registrada en tu orden de servicio.
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200">
                                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 text-xs mb-1">
                                    <CheckCircle2 size={16} />
                                    <span>Repuestos provistos por MasterTech</span>
                                  </div>
                                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                                    Cuentan con garantía y respaldo formal tanto en la pieza OEM de primer equipo como en la mano de obra de instalación.
                                  </p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200">
                                  <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">
                                    <AlertTriangle size={16} />
                                    <span>Repuestos traídos por el cliente</span>
                                  </div>
                                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                                    El cliente puede suministrar sus piezas, pero el taller NO otorga garantía sobre el repuesto externo ni fallas derivadas de su calidad o procedencia.
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
                onClick={handleWhatsApp}
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
    </section>
  );
}
