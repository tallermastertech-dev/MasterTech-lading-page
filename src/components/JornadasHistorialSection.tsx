import React from 'react';
import { Award, Car, History, CheckCircle2, ShieldCheck, Flame, Calendar, Sparkles } from 'lucide-react';

interface JornadaHistorialItem {
  id: string;
  title: string;
  subtitle?: string;
  season?: string;
  targetMonth?: string;
  vehiculosAtendidos?: number | string;
  fechaRealizacion?: string;
  badge?: string;
  img?: string;
  promoPrice?: string;
  regularPrice?: string;
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

  const getValidImage = (item: JornadaHistorialItem) => {
    if (item.img && !item.img.includes('servicio-mecanica.webp')) {
      return item.img;
    }
    return '/assets/servicio-inyeccion.webp';
  };

  const isSingle = completedJornadas.length === 1;

  return (
    <section className="pt-2 pb-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Header del Récord Histórico */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] font-black tracking-widest uppercase mb-1.5">
            <History size={13} />
            <span>Récord & Trayectoria del Taller</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Historial de Jornadas & Temporadas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-2xl mt-0.5">
            Cada edición es un hito de satisfacción automotriz. Conoce las jornadas anteriores realizadas con éxito en nuestras instalaciones de Porlamar.
          </p>
        </div>

        {/* Métricas Resumen */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#12141a] border border-slate-200 dark:border-white/10 shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block uppercase">Jornadas</span>
            <span className="text-lg sm:text-xl font-black text-primary font-mono block leading-none mt-0.5">
              {completedJornadas.length}
            </span>
          </div>
          {totalAutos > 0 && (
            <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#12141a] border border-amber-500/30 shadow-sm text-center">
              <span className="text-[10px] font-bold text-amber-500 block uppercase">Vehículos</span>
              <span className="text-lg sm:text-xl font-black text-amber-400 font-mono block leading-none mt-0.5">
                {totalAutos}+
              </span>
            </div>
          )}
          <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#12141a] border border-emerald-500/30 shadow-sm text-center">
            <span className="text-[10px] font-bold text-emerald-500 block uppercase">Garantía</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono block leading-none mt-0.5">
              100%
            </span>
          </div>
        </div>
      </div>

      {/* Renderizado de Jornadas */}
      {isSingle ? (
        /* Tarjeta Destacada de Ancho Completo (Para 1 Sola Edición) */
        <div className="bg-white dark:bg-[#0f1117] border border-slate-200 dark:border-amber-500/30 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Imagen Nítida y Amplia */}
            <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] overflow-hidden bg-black group">
              <img
                src={getValidImage(completedJornadas[0])}
                alt={completedJornadas[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Badge Superior */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>Edición Concluida</span>
                </span>
              </div>

              {/* Badge Inferior */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[11px] font-bold text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 flex items-center gap-1.5">
                  <Car size={13} className="text-amber-400" />
                  <span>{completedJornadas[0].vehiculosAtendidos || 'Cupos Completados'}</span>
                </span>
              </div>
            </div>

            {/* Contenido Detallado y Legible */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                    {completedJornadas[0].season || 'Temporada Oficial'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                    <Calendar size={13} className="text-amber-500" />
                    <span>{completedJornadas[0].fechaRealizacion || completedJornadas[0].targetMonth || 'Finalizada'}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
                  {completedJornadas[0].title}
                </h3>

                {completedJornadas[0].subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {completedJornadas[0].subtitle}
                  </p>
                )}

                {/* Sello y Características */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-2.5">
                    <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      Garantía Técnica 60 Días
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-2.5">
                    <Award size={16} className="text-amber-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      Certificación Oficial MasterTech
                    </span>
                  </div>
                </div>
              </div>

              {/* Pie de Tarjeta */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Edición de Alto Rendimiento Realizada</span>
                </span>
                {completedJornadas[0].promoPrice && (
                  <span className="text-xs font-mono font-black text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                    Tarifa Concluida: {completedJornadas[0].promoPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid para Múltiples Ediciones */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedJornadas.map((item) => {
            const vehiculosText = item.vehiculosAtendidos 
              ? `${item.vehiculosAtendidos}`
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

                {/* Imagen Nítida y Título */}
                <div className="space-y-3">
                  <div className="relative h-52 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-black/40">
                    <img
                      src={getValidImage(item)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-105"
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
      )}
    </section>
  );
}
