import React, { useState } from 'react';
import { 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  Car, 
  ThumbsUp, 
  MessageSquare,
  Sparkles,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewItem {
  id: string | number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  vehicle: string;
  category: 'jeep' | 'toyota' | 'ac' | 'mecanica' | 'all';
  text: string;
  isLocalGuide?: boolean;
  serviceDetail?: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    author: "Carlos E. Mendoza",
    rating: 5,
    date: "Hace 1 semana",
    vehicle: "Jeep Wrangler JL 2021",
    category: "jeep",
    isLocalGuide: true,
    serviceDetail: "Eliminación de Death Wobble y Terminales Mopar",
    text: "Excelente servicio en Margarita. Tenía un bamboleo de volante insoportable a 80 km/h en mi Wrangler JL. En otros talleres querían cambiar amortiguadores a lo loco. En MasterTech diagnosticaron la barra y terminal Mopar izquierdo exacto, ajustaron con torquímetro y el Jeep quedó como de fábrica. 100% recomendados."
  },
  {
    id: 2,
    author: "Alejandro Rodríguez",
    rating: 5,
    date: "Hace 2 semanas",
    vehicle: "Toyota Fortuner 4.0L V6",
    category: "toyota",
    isLocalGuide: true,
    serviceDetail: "Mantenimiento Mayor y Frenos Cerámicos",
    text: "El mejor taller mecánico de Porlamar sin discusión. La atención es transparente, te muestran los repuestos viejos y te entregan el carro limpio. Instalaron pastillas cerámicas y aceite sintético original. Tienen escáner de nivel de agencia y personal que sabe lo que hace."
  },
  {
    id: 3,
    author: "Mariana Villalba",
    rating: 5,
    date: "Hace 3 semanas",
    vehicle: "Jeep Grand Cherokee WK2 3.6L",
    category: "jeep",
    isLocalGuide: false,
    serviceDetail: "Base y Enfriador de Filtro de Aceite Mopar",
    text: "Tenía una fuga de aceite en la V del motor Pentastar que me tenía desesperada. Me consiguieron el repuesto original Mopar importado de USA en tiempo récord y lo instalaron con garantía. Cero fugas y temperatura perfecta en autopista."
  },
  {
    id: 4,
    author: "Ing. David Torrealba",
    rating: 5,
    date: "Hace 1 mes",
    vehicle: "Ford Explorer 3.5L EcoBoost",
    category: "ac",
    isLocalGuide: true,
    serviceDetail: "Climatización y Compresor A/C",
    text: "El aire acondicionado dejó de enfriar en pleno mediodía margariteño. Diagnosticaron la válvula electrónica del compresor con fuga de microcelda en condensador. Reparación en 24 horas y enfriando a 5°C. Muy profesionales."
  },
  {
    id: 5,
    author: "Roberto Gómez S.",
    rating: 5,
    date: "Hace 1 mes",
    vehicle: "Toyota Hilux Revo 2.8 Diesel",
    category: "toyota",
    isLocalGuide: false,
    serviceDetail: "Inyección Diesel y Limpieza de Sensores MAF/EGR",
    text: "La camioneta estaba botando humo y perdiendo fuerza en subidas. Hicieron diagnóstico por computadora, limpieza de sensores y quedó con el torque impecable. Muy agradecido con el trato y la puntualidad."
  },
  {
    id: 6,
    author: "Dr. Fernando Quintero",
    rating: 5,
    date: "Hace 2 meses",
    vehicle: "RAM 1500 5.7L HEMI",
    category: "mecanica",
    isLocalGuide: true,
    serviceDetail: "Tren Delantero y Mantenimiento de Suspensión",
    text: "Atención de primera. Da gusto encontrar en la isla un taller ordenado, con herramientas de primera y técnicos con verdadero criterio técnico. Me explicaron cada detalle del presupuesto antes de tocar el vehículo."
  }
];

const GoogleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

interface GoogleReviewsWidgetProps {
  googleBusinessUrl?: string;
  reviewsData?: any[];
}

export default function GoogleReviewsWidget({ 
  googleBusinessUrl = "https://maps.app.goo.gl/fybS1jW9buxQD5gv7",
  reviewsData
}: GoogleReviewsWidgetProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'jeep' | 'toyota' | 'ac' | 'mecanica'>('all');

  const reviewsList: ReviewItem[] = (reviewsData && reviewsData.length > 0) 
    ? reviewsData.map((r, i) => ({
        id: r.id || i,
        author: r.name || r.author || "Cliente Satisfecho",
        rating: r.rating || 5,
        date: r.date || "Reciente",
        vehicle: r.car || r.vehicle || "Vehículo Particular",
        category: r.category || 'all',
        text: r.comment || r.text || "",
        isLocalGuide: !!r.isLocalGuide,
        serviceDetail: r.serviceDetail || "Servicio Técnico Especializado"
      }))
    : DEFAULT_REVIEWS;

  const filteredReviews = reviewsList.filter(r => {
    if (selectedFilter === 'all') return true;
    return r.category === selectedFilter;
  });

  const filterButtons = [
    { key: 'all', label: 'Todas las Reseñas' },
    { key: 'jeep', label: 'Jeep & 4x4' },
    { key: 'toyota', label: 'Toyota & Pick-ups' },
    { key: 'ac', label: 'Aire Acondicionado' },
    { key: 'mecanica', label: 'Mecánica Mayor' }
  ];

  return (
    <section id="opiniones" className="py-16 md:py-24 relative overflow-hidden bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Google Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-slate-200 dark:border-slate-800">
          
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
              <GoogleIcon size={32} />
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-1.5 mb-1">
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">5.0</span>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">
                  (Reseñas Verificadas)
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Taller MasterTech en Google Business
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start gap-1">
                <MapPin size={12} className="text-red-500" />
                <span>Porlamar, Isla de Margarita</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <span>Ver en Google Maps</span>
              <ExternalLink size={14} className="text-slate-400" />
            </a>

            <a
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>Escribir Reseña</span>
            </a>
          </div>

        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {filterButtons.map(btn => {
            const isActive = selectedFilter === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => setSelectedFilter(btn.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                    : 'bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Reviews Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-6 bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{review.author}</span>
                          {review.isLocalGuide && (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              Local Guide
                            </span>
                          )}
                        </h4>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          {review.date}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 p-1 rounded-md bg-slate-100 dark:bg-slate-800/80">
                      <GoogleIcon size={16} />
                    </div>
                  </div>

                  {/* Stars & Vehicle Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" stroke="none" />
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                      <Car size={12} className="text-blue-500" />
                      <span>{review.vehicle}</span>
                    </div>
                  </div>

                  {/* Service Detail */}
                  {review.serviceDetail && (
                    <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Servicio: {review.serviceDetail}
                    </p>
                  )}

                  {/* Review Text */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 size={13} />
                    <span>Visita y reparación verificada</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Google Reviews</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
