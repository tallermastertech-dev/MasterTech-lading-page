import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Plus, Minus, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CONFIG_DEFAULT = {
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const parseFaqs = (dataObj: any) => {
      if (dataObj?.FAQS_JSON) {
        try {
          const parsed = JSON.parse(dataObj.FAQS_JSON);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
      }
      return [];
    };

    // 1. Initial load from local store
    try {
      const stored = localStorage.getItem('mastertech_settings_store');
      if (stored) {
        const localData = JSON.parse(stored);
        if (localData) {
          setConfig((prev: any) => ({ ...prev, ...localData }));
          setFaqs(parseFaqs(localData));
        }
      }
    } catch (e) {}

    // 2. Fetch authoritative fresh data from Supabase backend
    const fetchSettings = async () => {
      try {
        const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object') {
            setConfig((prev: any) => ({ ...prev, ...data }));
            try { localStorage.setItem('mastertech_settings_store', JSON.stringify(data)); } catch (e) {}
            setFaqs(parseFaqs(data));
          }
        }
      } catch (err) {
        console.error("Error cargando FAQs desde Supabase:", err);
      }
    };
    fetchSettings();

    const handleSettingsUpdated = (e: any) => {
      const updated = e.detail || e;
      if (updated && typeof updated === 'object') {
        setConfig((prev: any) => ({ ...prev, ...updated }));
        setFaqs(parseFaqs(updated));
      }
    };
    window.addEventListener('mastertech_settings_updated', handleSettingsUpdated);

    return () => {
      window.removeEventListener('mastertech_settings_updated', handleSettingsUpdated);
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
        © 2026 MASTERTECH AUTOMOTRIZ. Todos los derechos reservados.
      </footer>
    </div>
  );
}
