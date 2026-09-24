import React from 'react';
import { 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  PackageCheck, 
  Clock, 
  Cpu, 
  CreditCard, 
  Lock, 
  FileCheck2, 
  Calendar, 
  MessageCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FaqCard {
  icon: React.ElementType;
  title: string;
  tag: string;
  desc: string;
  highlight: string;
  badgeStyle?: string;
  iconStyle?: string;
}

const FAQ_CARDS: FaqCard[] = [
  {
    icon: ShieldCheck,
    title: "¿Tienen garantía los trabajos que realizan?",
    tag: "Garantía Técnica",
    desc: "Sí. La garantía se fija según la mano de obra y la complejidad del servicio realizado (motor, tren delantero, frenos, transmisión o mantenimiento). Queda formalmente registrada en tu orden de servicio.",
    highlight: "Cobertura fijada según la labor técnica",
    badgeStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    iconStyle: "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black"
  },
  {
    icon: PackageCheck,
    title: "¿Puedo llevar mis propios repuestos?",
    tag: "Política de Piezas",
    desc: "Puedes traer tus repuestos y garantizamos la mano de obra de montaje. Sin embargo, para disfrutar de garantía integral (pieza + instalación), recomendamos componentes originales OEM suministrados por el taller.",
    highlight: "Garantía total con repuestos MasterTech",
    badgeStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    iconStyle: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
  },
  {
    icon: Clock,
    title: "¿Cuánto toma un servicio preventivo básico?",
    tag: "Tiempo Estimado",
    desc: "Con cita previa toma entre 45 minutos y 1.5 horas (aceite sintético, filtros OEM, niveles y revisión en rampa). Puedes esperar cómodamente en nuestra sala climatizada con Wi-Fi.",
    highlight: "Entrega rápida con turno agendado",
    badgeStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    iconStyle: "bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
  },
  {
    icon: Cpu,
    title: "¿Qué tecnología usan para diagnóstico?",
    tag: "Jeep & Toyota OEM",
    desc: "Disponemos de escáneres multimarca y dedicados de nivel concesionario (Launch X431, Autel MaxiSys y software oficial para Chrysler/Jeep/RAM y Toyota), osciloscopio y calibración de sensores.",
    highlight: "Diagnóstico computarizado de precisión",
    badgeStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    iconStyle: "bg-purple-500/10 border-purple-500/20 text-purple-500 group-hover:bg-purple-500 group-hover:text-white"
  },
  {
    icon: CreditCard,
    title: "¿Cuáles son los métodos de pago aceptados?",
    tag: "Tasa Oficial BCV",
    desc: "Aceptamos transferencias bancarias, Pago Móvil a tasa oficial del BCV, efectivo en USD y EUR, Zelle y tarjetas de débito/crédito. Todos los presupuestos se aprueban por escrito antes de iniciar.",
    highlight: "Presupuestos transparentes sin sorpresas",
    badgeStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    iconStyle: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
  },
  {
    icon: Lock,
    title: "¿Puedo dejar mi vehículo varios días?",
    tag: "Seguridad 24/7",
    desc: "Totalmente. Nuestras instalaciones cuentan con estacionamiento techado, cerco perimetral de seguridad y monitoreo por circuito cerrado de cámaras (CCTV) 24/7 para tu total resguardo.",
    highlight: "Instalaciones techadas y vigiladas 24/7",
    badgeStyle: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    iconStyle: "bg-cyan-500/10 border-cyan-500/20 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black"
  },
  {
    icon: FileCheck2,
    title: "¿Me informan antes de trabajos adicionales?",
    tag: "Cero Sorpresas",
    desc: "Siempre. Si durante la inspección encontramos alguna anomalía o pieza desgastada, te enviamos fotos, videos y el presupuesto detallado por WhatsApp. Nada se ejecuta sin tu aprobación.",
    highlight: "Evidencia fotográfica y en video por WhatsApp",
    badgeStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    iconStyle: "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black"
  },
  {
    icon: Calendar,
    title: "¿Cómo agendo una cita para mi vehículo?",
    tag: "Atención Rápida",
    desc: "Puedes agendar directamente por WhatsApp al +58 412 356 5012 o mediante nuestro formulario web. Nuestro equipo te confirma el turno y el puesto asignado de inmediato.",
    highlight: "Confirmación inmediata vía WhatsApp",
    badgeStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    iconStyle: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
  }
];

export default function FaqGarantiaPreview() {
  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hola Taller MasterTech, deseo consultar una duda sobre el servicio de mi vehículo.");
    window.open(`https://wa.me/584123565012?text=${text}`, '_blank');
  };

  return (
    <section id="faq-preview" className="py-16 md:py-24 relative overflow-hidden bg-slate-100 dark:bg-[#07090e] text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black tracking-wider uppercase mb-4 shadow-sm">
            <HelpCircle size={16} className="text-amber-500" />
            <span>Transparencia y Respuestas Claras</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600">Frecuentes</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Resolvemos tus dudas más comunes sobre garantías, repuestos, tiempos de entrega y métodos de pago con total claridad técnica.
          </p>
        </div>

        {/* 4-Columns Cards Grid matching exact Garantia format */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FAQ_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="group relative rounded-2xl p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border ${card.iconStyle || 'bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black'}`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${card.badgeStyle || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>
                      {card.tag}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors leading-snug">
                    {card.title}
                  </h3>

                  {/* Answer Text */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Footer Highlight */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={13} className="shrink-0" />
                  <span>{card.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Contact Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              ¿Tienes una consulta específica sobre tu vehículo?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Nuestro equipo de asesores técnicos está listo para ayudarte en WhatsApp de inmediato.
            </p>
          </div>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <MessageCircle size={16} />
            <span>Consultar por WhatsApp</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
