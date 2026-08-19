import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { ChevronLeft, Wrench, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import BrechaCambiariaPanel from './components/BrechaCambiariaPanel';

const CONFIG_DEFAULT = {
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

export default function Servicios() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const parseServices = (dataObj: any) => {
      if (dataObj?.SERVICES_JSON) {
        try {
          const parsed = JSON.parse(dataObj.SERVICES_JSON);
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
          setServices(parseServices(localData));
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
            setServices(parseServices(data));
          }
        }
      } catch (err) {
        console.error("Error cargando servicios desde Supabase:", err);
      }
    };
    fetchSettings();

    const handleSettingsUpdated = (e: any) => {
      const updated = e.detail || e;
      if (updated && typeof updated === 'object') {
        setConfig((prev: any) => ({ ...prev, ...updated }));
        setServices(parseServices(updated));
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
      <Navbar activePage="servicios" config={config} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Title Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Catálogo de Servicios
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-black tracking-tighter mb-6">
                NUESTROS <span className="text-primary italic">SERVICIOS</span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Soluciones integrales para tu vehículo con tecnología de punta y personal altamente capacitado.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {services.map((s, i) => (
                <div key={s.id || i} className="glass-card overflow-hidden hover:border-primary/50 transition-all group flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                    <img src={s.img || "/assets/instalaciones.jpg"} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-colors">
                      <Wrench className="w-6 h-6 text-primary icon-glow" />
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-black mb-3">{s.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-6">{s.desc}</p>
                    <a 
                      href={config.WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 text-white py-3 px-4 rounded-xl font-bold transition-all group/btn"
                    >
                      Agendar ya <WhatsAppIcon size={18} className="text-primary group-hover/btn:text-white transition-colors fill-current" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center max-w-xl mx-auto">
              <h3 className="text-3xl font-black mb-3">¿Necesitas una revisión personalizada?</h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Contáctanos por WhatsApp para consultar sobre fallas específicas o agendar tu cita de inmediato.</p>
              <a
                href={config.WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 !py-4 !px-8 text-base border-none mx-auto"
              >
                CONSULTAR VÍA WHATSAPP <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-zinc-600 text-xs border-t border-white/5 relative z-10 bg-black/40">
        © 2026 MASTERTECH AUTOMOTRIZ. Todos los derechos reservados.
      </footer>

      {/* Floating Hideable Bubble Widget: Live Exchange Rates & Budget Calculator */}
      <BrechaCambiariaPanel />
    </div>
  );
}
