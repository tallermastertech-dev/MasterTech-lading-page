import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Cpu, 
  Gauge, 
  FileText, 
  X, 
  MessageCircle, 
  Sparkles,
  AlertTriangle,
  PackageCheck,
  PackageX
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
      title: "Garantía según Mano de Obra Realizada",
      tag: "Sujeto al Servicio",
      desc: "El tiempo y alcance de la garantía dependen directamente del tipo de trabajo y mano de obra efectuada en el vehículo (motor, tren delantero, frenos, transmisión o mantenimiento). Se estipula formalmente en tu orden de servicio.",
      highlight: "Período fijado según la labor técnica realizada"
    },
    {
      icon: PackageCheck,
      title: "Repuesto Suministrado por MasterTech",
      tag: "Con Garantía",
      desc: "Si el repuesto es provisto directamente por nuestro taller, cuenta con garantía y respaldo tanto en la pieza OEM de primer equipo como en su correcta instalación.",
      highlight: "Respaldo total en pieza e instalación"
    },
    {
      icon: PackageX,
      title: "Repuesto Traído por el Cliente",
      tag: "Sin Garantía",
      desc: "Si el cliente decide traer su propio repuesto, el taller no puede certificar su procedencia, calidad ni autenticidad, por lo que el trabajo NO corre con garantía sobre la pieza ni fallas derivadas de la misma.",
      highlight: "Sin cobertura sobre repuestos externos"
    },
    {
      icon: Gauge,
      title: "Torque y Procedimiento de Manual",
      tag: "Cero Improvisación",
      desc: "Todo ensamble se ejecuta bajo especificaciones y aprietes milimétricos del fabricante automotriz, previniendo daños mecánicos y garantizando el correcto funcionamiento del sistema.",
      highlight: "Normas y tolerancias de fábrica"
    }
  ];

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent("Hola Taller MasterTech, deseo consultar la garantía aplicable a un trabajo y repuestos para mi vehículo.");
    window.open(`https://wa.me/584248888000?text=${text}`, '_blank');
  };

  return (
    <section id="garantia" className="py-16 md:py-24 relative overflow-hidden bg-slate-100 dark:bg-[#0b0d13] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black tracking-wider uppercase mb-4 shadow-sm">
            <ShieldCheck size={16} className="text-amber-500" />
            <span>Condiciones Claras y Respaldo Técnico</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Sello y Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600">Garantía MasterTech</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Transparencia ante todo: la garantía depende de la mano de obra realizada en el vehículo. Los repuestos suministrados por el taller cuentan con respaldo formal, mientras que las piezas externas aportadas por el cliente no tienen garantía.
          </p>
        </div>

        {/* Central Trust Banner */}
        <div className="relative rounded-3xl p-6 sm:p-10 mb-12 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-amber-500/30 dark:border-amber-500/20 shadow-2xl shadow-amber-500/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sello Shield Badge Graphic */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-4">
                <div className="absolute inset-0 rounded-full bg-amber-500/20 dark:bg-amber-400/20 blur-xl animate-pulse" />
                <div className="relative w-full h-full rounded-full border-2 border-dashed border-amber-400/60 flex items-center justify-center p-3">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex flex-col items-center justify-center text-black font-black shadow-lg">
                    <ShieldCheck size={36} className="text-slate-950 mb-0.5" />
                    <span className="text-[9px] tracking-widest uppercase text-center font-bold leading-tight">GARANTÍA MASTERTECH</span>
                    <span className="text-[11px] font-black text-center mt-0.5">SEGÚN SERVICIO</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
                POLÍTICA DE SERVICIO
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                Respaldo en Mano de Obra
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Sujeto al trabajo realizado y repuestos provistos por el taller
              </p>
            </div>

            {/* Banner Value Proposition */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full w-fit">
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
                  <span>Ver Términos y Alcance de la Garantía</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Consultar por WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isNoWarranty = pillar.tag === "Sin Garantía";
            return (
              <div 
                key={idx}
                className={`group relative rounded-2xl p-6 bg-white dark:bg-slate-900/50 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  isNoWarranty 
                    ? 'border-amber-500/30 dark:border-amber-500/20 hover:border-amber-500/60' 
                    : 'border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isNoWarranty
                        ? 'bg-red-500/10 border border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white'
                        : 'bg-amber-500/10 border border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black'
                    }`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                      isNoWarranty
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}>
                      {pillar.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold ${
                  isNoWarranty ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {isNoWarranty ? <AlertTriangle size={13} className="shrink-0" /> : <CheckCircle2 size={13} className="shrink-0" />}
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
