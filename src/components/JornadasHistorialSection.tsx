import React from 'react';
import { Award, Car, History, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

interface JornadaHistorialItem {
  id: string;
  title: string;
  season?: string;
  targetMonth?: string;
  vehiculosAtendidos?: number | string;
  fechaRealizacion?: string;
  badge?: string;
  img?: string;
  promoPrice?: string;
}

interface JornadasHistorialSectionProps {
  completedJornadas: JornadaHistorialItem[];
}

export default function JornadasHistorialSection({ completedJornadas }: JornadasHistorialSectionProps) {
  if (!completedJornadas || completedJornadas.length === 0) return null;

  // Total acumulado de autos atendidos
  const totalAutos = completedJornadas.reduce((acc, curr) => {
    const num = parseInt(String(curr.vehiculosAtendidos || 0).replace(/\D/g, ''), 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 border-t border-slate-200 dark:border-white/10 mt-12">
      {/* Header del Récord Histórico */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] font-black tracking-widest uppercase mb-2">
            <History size={13} />
            <span>Récord & Trayectoria del Taller</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Historial de Jornadas & Temporadas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-2xl mt-1">
            Cada edición es un hito de satisfacción automotriz. Conoce las jornadas anteriores realizadas exitosamente en nuestras instalaciones de Porlamar.
          </p>
        </div>

        {/* Métricas Resumen */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-[#12141a] border border-slate-200 dark:border-white/10 shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block uppercase">Jornadas</span>
            <span className="text-xl sm:text-2xl font-black text-primary font-mono block leading-none mt-0.5">
              {completedJornadas.length}
            </span>
          </div>
          {totalAutos > 0 && (
            <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-[#12141a] border border-amber-500/30 shadow-sm text-center">
              <span className="text-[10px] font-bold text-amber-500 block uppercase">Vehículos</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block leading-none mt-0.5">
                {totalAutos}+
              </span>
            </div>
          )}
          <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-[#12141a] border border-emerald-500/30 shadow-sm text-center hidden sm:block">
            <span className="text-[10px] font-bold text-emerald-500 block uppercase">Garantía</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block leading-none mt-0.5">
              100%
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Jornadas Finalizadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {completedJornadas.map((item) => {
          const vehiculosText = item.vehiculosAtendidos 
            ? `${item.vehiculosAtendidos} vehículos atendidos`
            : 'Jornada completada';

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0f1116] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-lg space-y-4 relative overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all group"
            >
              {/* Badge de Temporada */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {item.season || 'Temporada Oficial'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase font-mono">
                  {item.fechaRealizacion || item.targetMonth || 'Finalizada'}
                </span>
              </div>

              {/* Imagen y Título */}
              <div className="space-y-3">
                <div className="relative h-40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-black/40">
                  <img
                    src={item.img || '/assets/servicio-mecanica.webp'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-black text-white bg-emerald-600/90 px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-xs">
                      <CheckCircle2 size={12} />
                      <span>{vehiculosText}</span>
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold block mt-1">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer con sello de garantía */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-semibold">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>Certificación MasterTech</span>
                </span>
                {item.promoPrice && (
                  <span className="text-xs font-mono font-black text-primary">
                    Tarifa {item.promoPrice}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
