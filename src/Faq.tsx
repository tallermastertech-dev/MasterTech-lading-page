import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Plus, Minus, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchSettingsWithTTL, getCachedSettings } from './utils/settingsCache';

const CONFIG_DEFAULT = {
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

// FAQs hardcodeadas de respaldo — SEO indexables siempre (Googlebot las ve sin JS)
const FAQS_FALLBACK = [
  {
    q: '¿En qué marcas de vehículos se especializan en MasterTech?',
    a: 'Somos especialistas en Jeep y Toyota, aunque atendemos todas las marcas: Honda, Dodge, Nissan, Chrysler, Lexus y más. Contamos con escáner multimarca de nivel OEM para diagnóstico computarizado en cualquier vehículo.',
  },
  {
    q: '¿Dónde está ubicado el Taller MasterTech?',
    a: 'Estamos en Porlamar, Isla de Margarita, Nueva Esparta, Venezuela. Puedes contactarnos por WhatsApp al +58 412 356 5012 para confirmar cómo llegar o agendar tu cita.',
  },
  {
    q: '¿Cuánto tiempo toma un servicio de mantenimiento preventivo?',
    a: 'Un mantenimiento preventivo con cita previa toma entre 45 minutos y 1.5 horas, dependiendo del paquete. Contamos con sala de espera climatizada y Wi-Fi mientras esperás.',
  },
  {
    q: '¿Qué incluye la línea de inspección gratuita?',
    a: 'La inspección preventiva gratuita incluye revisión visual y computarizada de fluidos, estado del tren delantero y suspensión, frenos, sistema eléctrico y diagnóstico general del vehículo. Sin costo, con cita previa.',
  },
  {
    q: '¿Cuáles son los métodos de pago aceptados?',
    a: 'Aceptamos efectivo en USD y EUR, transferencias bancarias, Zelle, Pago Móvil y tarjeta de débito/crédito. Manejamos presupuestos transparentes antes de iniciar cualquier trabajo.',
  },
  {
    q: '¿Tienen garantía los repuestos y la mano de obra?',
    a: 'Sí. Todos los repuestos instalados y la mano de obra cuentan con garantía MasterTech. Te entregamos una orden de trabajo detallada con cada servicio realizado.',
  },
  {
    q: '¿Hacen diagnóstico computarizado y escáner para Jeep y Toyota?',
    a: 'Sí, somos especialistas en diagnóstico electrónico para Jeep y Toyota. Usamos equipos de escáner de nivel OEM para lectura de códigos DTC, monitoreo de sensores en vivo y calibración de sistemas.',
  },
  {
    q: '¿Cómo agendo una cita en el taller?',
    a: 'Puedes agendar tu cita directamente por WhatsApp al +58 412 356 5012, a través del formulario en esta página o usando la línea de inspección gratuita. Te confirmamos disponibilidad de inmediato.',
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [faqs, setFaqs] = useState<any[]>(FAQS_FALLBACK);

  useEffect(() => {
    // SEO — meta tags de la página FAQ
    document.title = 'Preguntas Frecuentes | Taller MasterTech Porlamar';
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(prop ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('description', 'Preguntas frecuentes sobre Taller MasterTech en Porlamar, Margarita: especialistas en Jeep y Toyota, métodos de pago, garantías, cómo agendar cita, diagnóstico computarizado y más.');
    setMeta('og:title', 'Preguntas Frecuentes | Taller MasterTech Porlamar', true);
    setMeta('og:description', 'Resolvemos tus dudas sobre servicios, pagos, garantías y cómo agendar en Taller MasterTech, Porlamar, Isla de Margarita.', true);

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', 'https://www.tallermastertech.com/faq');

    const parseFaqs = (dataObj: any) => {
      if (dataObj?.FAQS_JSON) {
        try {
          const parsed = JSON.parse(dataObj.FAQS_JSON);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
      return null;
    };

    // 1. Initial load from local store via TTL cache
    const cached = getCachedSettings();
    if (cached.data) {
      setConfig((prev: any) => ({ ...prev, ...cached.data }));
      const parsed = parseFaqs(cached.data);
      if (parsed) setFaqs(parsed);
    }

    // 2. Fetch authoritative fresh data respecting TTL
    const loadSettings = async (force = false) => {
      try {
        const data = await fetchSettingsWithTTL({ force });
        if (data && typeof data === 'object') {
          setConfig((prev: any) => ({ ...prev, ...data }));
          const parsed = parseFaqs(data);
          if (parsed) setFaqs(parsed);
        }
      } catch (err) {
        console.error("Error cargando FAQs:", err);
      }
    };
    loadSettings();

    const handleSettingsUpdated = (e: any) => {
      const updated = e?.detail || e;
      if (updated && typeof updated === 'object') {
        setConfig((prev: any) => ({ ...prev, ...updated }));
        const parsed = parseFaqs(updated);
        if (parsed) setFaqs(parsed);
      } else {
        loadSettings(true);
      }
    };
    window.addEventListener('mastertech_settings_updated', handleSettingsUpdated);
    window.addEventListener('storage', () => loadSettings(true));

    return () => {
      window.removeEventListener('mastertech_settings_updated', handleSettingsUpdated);
      window.removeEventListener('storage', () => loadSettings(true));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E2E8F0] selection:bg-primary selection:text-black flex flex-col overflow-x-hidden w-full max-w-full">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Header with Dropdown Menus */}
      <Navbar activePage="faq" config={config} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 lg:py-16 relative z-10">
        <div className="w-full max-w-6xl lg:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Title */}
            <div className="text-center mb-10 lg:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Centro de ayuda
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-3">
                PREGUNTAS <span className="text-primary italic">FRECUENTES</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto font-medium">
                Resolvemos tus dudas más comunes de forma transparente.
              </p>
            </div>

            {/* 2-Column Grid Layout matching screenshot */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: FAQ Accordion List (Green Box) */}
              <div className="lg:col-span-7 space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="glass-card overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left p-5 sm:p-6 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-base sm:text-lg pr-4 text-white leading-snug">{faq.q}</span>
                      {openFaq === i ? <Minus className="w-5 h-5 text-primary shrink-0" /> : <Plus className="w-5 h-5 text-primary shrink-0" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <div className="p-5 sm:p-6 pt-0 text-zinc-400 leading-relaxed border-t border-white/5 mt-1 text-sm sm:text-base">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Right Column: "¿Tienes otra pregunta?" CTA Card */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="glass-card p-8 text-center border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-[0_0_20px_rgba(194,164,114,0.2)]">
                    <ArrowRight className="w-8 h-8 -rotate-45" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight mb-3">
                    ¿Tienes otra pregunta?
                  </h3>
                  <p className="text-zinc-400 text-sm sm:text-base mb-8 leading-relaxed">
                    Nuestro equipo de asesores está disponible en WhatsApp para ayudarte al instante.
                  </p>
                  <a
                    href={config.WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full !py-4 text-sm sm:text-base font-black uppercase tracking-widest border-none shadow-[0_10px_30px_rgba(194,164,114,0.35)] hover:scale-[1.02] transition-transform"
                  >
                    HABLAR CON UN ASESOR <ArrowRight className="w-5 h-5 ml-1" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-zinc-600 text-xs border-t border-white/5 relative z-10 bg-black/40">
        © 2026 SOLUCIONES MASTERTECH C.A. Porlamar, Isla de Margarita, Venezuela. Todos los derechos reservados.
      </footer>
    </div>
  );
}
