import React from 'react';
import { 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  Car, 
  MapPin
} from 'lucide-react';

interface ReviewItem {
  id: string | number;
  author: string;
  rating: number;
  date: string;
  vehicle: string;
  text: string;
  serviceDetail?: string;
}

const HIGHLIGHTED_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    author: "Carlos E. Mendoza",
    rating: 5,
    date: "Hace 1 semana",
    vehicle: "Jeep Wrangler JL",
    serviceDetail: "Ajuste de tren delantero y terminal Mopar",
    text: "Excelente servicio en Margarita. Diagnosticaron la falla exacta de vibración, ajustaron con torquímetro y el Jeep quedó como de fábrica. 100% recomendados."
  },
  {
    id: 2,
    author: "Alejandro Rodríguez",
    rating: 5,
    date: "Hace 2 semanas",
    vehicle: "Toyota Fortuner 4.0L",
    serviceDetail: "Mantenimiento preventivo mayor",
    text: "Atención transparente, te muestran los repuestos sustituidos y te entregan el vehículo impecable. Tienen escáner de nivel de agencia y personal capacitado."
  },
  {
    id: 3,
    author: "Mariana Villalba",
    rating: 5,
    date: "Hace 3 semanas",
    vehicle: "Jeep Grand Cherokee",
    serviceDetail: "Repuesto OEM Mopar certificado",
    text: "Me consiguieron el repuesto original Mopar en tiempo récord y lo instalaron con garantía formal. Cero fugas y temperatura perfecta en autopista."
  }
];

const GoogleIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.36 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.05 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

interface GoogleReviewsWidgetProps {
  googleBusinessUrl?: string;
}

export default function GoogleReviewsWidget({
  googleBusinessUrl = "https://maps.app.goo.gl/taller-mastertech-porlamar"
}: GoogleReviewsWidgetProps) {
  return (
    <section id="opiniones" className="py-5 md:py-7 relative overflow-hidden bg-slate-50/70 dark:bg-[#090b10] text-slate-900 dark:text-white transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact, Discreet Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
              <GoogleIcon size={20} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900 dark:text-white leading-none">5.0</span>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  · Reseñas en Google Business
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-red-500" />
                <span>Taller MasterTech — Porlamar, Isla de Margarita</span>
              </p>
            </div>
          </div>

          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-all shadow-sm shrink-0"
          >
            <span>Ver perfil en Google Maps</span>
            <ExternalLink size={12} className="text-slate-400" />
          </a>
        </div>

        {/* 3 Compact Single-Row Review Cards */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {HIGHLIGHTED_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-xl p-4 sm:p-5 bg-white dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: User initial + Name + Date */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-xs flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {review.author}
                      </h4>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  <GoogleIcon size={14} />
                </div>

                {/* Rating + Vehicle Pill */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[10px] font-medium">
                    <Car size={10} className="text-blue-500" />
                    <span>{review.vehicle}</span>
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  "{review.text}"
                </p>
              </div>

              {/* Discreet Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 size={11} />
                  <span>Reseña verificada</span>
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">Google Reviews</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
