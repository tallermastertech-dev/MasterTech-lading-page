import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Cpu, 
  Gauge, 
  FileText, 
  HelpCircle, 
  X, 
  MessageCircle, 
  Sparkles,
  ArrowRight,
  ShieldAlert
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
      title: "Mano de Obra Garantizada",
      tag: "6 Meses o 10.000 KM",
      desc: "Todas las reparaciones mayores de motor, tren delantero, suspensión, frenos y cajas cuentan con respaldo por escrito ante cualquier defecto de instalación o ajuste.",
      highlight: "Cobertura total en correcciones técnicas"
    },
    {
      icon: CheckCircle2,
      title: "Repuestos 100% Genuinos OEM",
      tag: "Trazabilidad USA",
      desc: "Instalamos exclusivamente componentes originales de primer equipo (Mopar, Denso, Bosch, Motorcraft, Aisin). Cero repuestos genéricos o copias dudosas.",
      highlight: "Garantía de fábrica del fabricante"
    },
    {
      icon: Cpu,
      title: "Diagnóstico Certero de Cero Errores",
      tag: "Protocolo Digital",
      desc: "Escaneo computarizado previo y posterior con equipos profesionales LAUNCH. Si una reparación recomendada no soluciona la falla, no facturamos mano de obra adicional.",
      highlight: "Reporte de escaneo entregado al cliente"
    },
    {
      icon: Gauge,
      title: "Torque y Fluidos según Manual Oficial",
      tag: "Especificación de Fábrica",
      desc: "Ajuste milimétrico con torquímetro y lubricantes con la norma exacta requerida (Chrysler MS-6395, WS Toyota, Mercon LV). Prevenimos desgastes prematuros.",
      highlight: "Cero improvisación técnica"
    }
  ];

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent("Hola Taller MasterTech, deseo información sobre la Garantía de Servicio y repuestos para mi vehículo.");
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
            <ShieldCheck size={16} className="text-amber-500 animate-pulse" />
            <span>Respaldo Institucional por Escrito</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Sello y Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600">Garantía MasterTech</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            En un mercado con repuestos genéricos y diagnósticos improvisados, en MasterTech garantizamos cada trabajo por escrito. Tu tranquilidad y la longevidad de tu vehículo son innegociables.
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
                    <ShieldCheck size={38} className="text-slate-950 mb-0.5" />
                    <span className="text-[10px] tracking-widest uppercase">CERTIFICADO</span>
                    <span className="text-xs font-black">6 MESES</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
                SELLO OFICIAL MASTERTECH
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                6 Meses o 10.000 KM
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Válido en Porlamar e Isla de Margarita
              </p>
            </div>

            {/* Banner Value Proposition */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                <Sparkles size={14} />
                <span>Protocolo de Calidad Tipo Concesionario Oficial</span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                ¿Por qué nuestra garantía marca la diferencia?
              </h4>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Cada intervención mecánica que ingresa a nuestras bahías de servicio es documentada digitalmente. Entregamos el reporte del escáner antes y después, comprobante de torque y la caja original de los repuestos reemplazados para total verificación.
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
            return (
              <div 
                key={idx}
                className="group relative rounded-2xl p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
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

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={13} className="shrink-0" />
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
                      Política Oficial de Garantía
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Taller MasterTech — C.A. Porlamar, Isla de Margarita
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
                    <span>Compromiso de Excelencia Técnica</span>
                  </p>
                  <p className="text-xs leading-normal">
                    Nuestra garantía respalda la mano de obra profesional y la calidad de los repuestos suministrados por Taller MasterTech durante el período estipulado en la orden de servicio.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">
                    1. ¿Qué cubre la garantía?
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li><strong>Mano de obra (6 meses o 10.000 km):</strong> Reajuste, corrección o reemplazo sin costo ante fallas imputables al montaje mecánico o calibración.</li>
                    <li><strong>Repuestos OEM suministrados:</strong> Reemplazo directo en caso de defecto de fabricación del fabricante (Mopar, Denso, Bosch, etc.).</li>
                    <li><strong>Garantía de Diagnóstico:</strong> Si el vehículo presenta el mismo código de falla escaneado tras la reparación, se revisa sin cobro de mano de obra de diagnóstico.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">
                    2. Exclusiones y Condiciones
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <li>Repuestos suministrados externamente por el cliente (la garantía aplica solo a la mano de obra de montaje, no al componente).</li>
                    <li>Manipulación o desmontaje posterior por talleres o personas no autorizadas por MasterTech.</li>
                    <li>Daños derivados de accidentes, inmersión en agua marina/salina extrema o falta de lubricantes por negligencia del usuario.</li>
                    <li>Piezas sujetas a desgaste natural (pastillas de freno por kilometraje agresivo, bombillos o gomas limpiaparabrisas).</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2">
                    3. Procedimiento para hacer valer tu garantía
                  </h4>
                  <p className="text-xs">
                    Basta con presentar tu número de placa o factura de servicio digital. Nuestro jefe de taller realizará la inspección inmediata en rampa sin esperas innecesarias.
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
