import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Wrench, Zap, ShieldCheck, ArrowRight, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import BrechaCambiariaPanel from "./components/BrechaCambiariaPanel";
import { fetchSettingsWithTTL, getCachedSettings } from "./utils/settingsCache";

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

const TOYOTA_SERVICES = [
  {
    icon: Zap,
    title: "Diagnóstico Electrónico Toyota",
    desc: "Escáner computarizado OEM compatible con toda la gama Toyota: Hilux, Land Cruiser, Prado, Fortuner, RAV4, Corolla y más. Lectura DTC, sensores en vivo y calibración de sistemas.",
  },
  {
    icon: Wrench,
    title: "Mecánica & Mantenimiento Toyota",
    desc: "Mantenimiento preventivo y correctivo: cambio de aceite 5W-30/0W-20 Toyota spec, filtros OEM, bomba de agua, cadena de distribución y afinación completa del motor.",
  },
  {
    icon: ShieldCheck,
    title: "Frenos & Suspensión Toyota",
    desc: "Sistema de frenos de alta performance: pastillas cerámicas OEM, discos ventilados, amortiguadores Bilstein/KYB, terminales de dirección y alineación computarizada.",
  },
  {
    icon: Zap,
    title: "Electricidad & Electrónica Toyota",
    desc: "Diagnóstico y reparación eléctrica Toyota: ECU, módulos, sensores MAF/O2/TPMS, sistema de encendido, alternadores, baterías y electricidad general.",
  },
  {
    icon: Wrench,
    title: "Climatización A/C Toyota",
    desc: "Servicio integral de aire acondicionado Toyota: carga de gas R134a, lubricación del compresor, detección de fugas por trazador UV y mantenimiento del evaporador.",
  },
  {
    icon: ShieldCheck,
    title: "Inyectores & Sistema de Combustible Toyota",
    desc: "Limpieza y calibración de inyectores por ultrasonido para motores Toyota 1GR, 2TR, 1KD, 2KD y más. Medición de caudal y reemplazo de sellos O-ring.",
  },
];

const TOYOTA_MODELS = [
  "Toyota Hilux", "Toyota Land Cruiser", "Toyota Land Cruiser Prado",
  "Toyota Fortuner", "Toyota RAV4", "Toyota Corolla",
  "Toyota Camry", "Toyota Yaris", "Toyota 4Runner",
  "Toyota Sequoia", "Toyota Tundra",
];

const CONFIG_DEFAULT = {
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  PHONE_NUMBER: "+584123565012",
  LOGO_URL: "/logo.png",
};

export default function Toyota() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);

  useEffect(() => {
    // SEO — meta tags de la página Toyota
    document.title = "Especialista en Toyota en Margarita | Taller MasterTech Porlamar";
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(prop ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", "Taller especialista en Toyota en Porlamar, Isla de Margarita. Diagnóstico computarizado, mecánica, frenos, electricidad y mantenimiento para Toyota Hilux, Land Cruiser, RAV4, Fortuner y más. WhatsApp +58 412 356 5012.");
    setMeta("og:title", "Especialista Toyota Margarita | Taller MasterTech", true);
    setMeta("og:description", "Servicio especializado para Toyota en Porlamar, Margarita. Diagnóstico, mecánica, frenos y electricidad. Hilux, Land Cruiser, Fortuner y todos los modelos.", true);

    let linkCanonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", "https://www.tallermastertech.com/toyota");

    // Schema.org para página de servicio Toyota
    const existingSchema = document.getElementById("toyota-schema");
    if (!existingSchema) {
      const script = document.createElement("script");
      script.id = "toyota-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://www.tallermastertech.com/toyota#service",
        "name": "Servicio Especializado para Toyota en Margarita",
        "description": "Taller mecánico especialista en Toyota en Porlamar, Isla de Margarita. Diagnóstico computarizado, mecánica, frenos, electricidad y mantenimiento para todos los modelos Toyota.",
        "provider": {
          "@id": "https://www.tallermastertech.com/#autorepair"
        },
        "areaServed": {
          "@type": "City",
          "name": "Porlamar, Isla de Margarita"
        },
        "serviceType": "Reparación y mantenimiento automotriz Toyota",
        "url": "https://www.tallermastertech.com/toyota",
      });
      document.head.appendChild(script);
    }

    // Load config
    const cached = getCachedSettings();
    if (cached.data) setConfig((prev: any) => ({ ...prev, ...cached.data }));
    fetchSettingsWithTTL().then(data => {
      if (data && typeof data === "object") setConfig((prev: any) => ({ ...prev, ...data }));
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E2E8F0] selection:bg-primary selection:text-black flex flex-col overflow-x-hidden w-full max-w-full">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <Navbar activePage="servicios" config={config} />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 text-primary font-bold text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Especialistas en Toyota · Porlamar, Margarita
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tighter mb-6 uppercase leading-tight">
                  TALLER ESPECIALISTA<br />
                  <span className="text-primary italic">EN TOYOTA</span><br />
                  <span className="text-2xl sm:text-3xl lg:text-4xl text-zinc-400 font-bold not-italic">Porlamar, Isla de Margarita</span>
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                  En Taller MasterTech somos especialistas en Toyota. Diagnóstico computarizado, mecánica, electricidad y mantenimiento preventivo para toda la gama Toyota disponible en Venezuela. Servicio con garantía en Margarita.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <a
                    href={config.WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-3 !py-4 !px-8 text-base border-none shadow-[0_10px_30px_rgba(194,164,114,0.35)]"
                  >
                    AGENDAR CITA TOYOTA <WhatsAppIcon size={20} />
                  </a>
                  <a
                    href="/servicios"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white hover:bg-white/5 transition-colors font-bold"
                  >
                    Ver Todos los Servicios <ArrowRight size={18} />
                  </a>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {TOYOTA_SERVICES.map((s, i) => (
                  <div key={i} className="glass-card p-7 hover:border-primary/50 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-lg font-black mb-3">{s.title}</h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Models Section */}
              <div className="glass-card p-10 mb-16">
                <h2 className="text-3xl font-display font-black tracking-tighter mb-2 text-center">
                  MODELOS <span className="text-primary italic">TOYOTA</span> QUE ATENDEMOS
                </h2>
                <p className="text-zinc-400 text-center mb-8">Servicio especializado para toda la gama Toyota en Venezuela</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {TOYOTA_MODELS.map((model, i) => (
                    <div
                      key={i}
                      className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 font-bold text-sm hover:border-primary hover:text-primary transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 inline-block mr-2 text-primary" />
                      {model}
                    </div>
                  ))}
                </div>
              </div>

              {/* NAP + CTA */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="glass-card p-8">
                  <h3 className="text-xl font-black mb-5">¿Dónde estamos?</h3>
                  <div className="space-y-4">
                    <a
                      href="https://maps.app.goo.gl/fybS1jW9buxQD5gv7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-zinc-300 hover:text-primary transition-colors"
                    >
                      <MapPin className="text-primary shrink-0" size={20} />
                      <span className="font-medium">Porlamar, Isla de Margarita, Nueva Esparta, Venezuela</span>
                    </a>
                    <a
                      href={config.WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-zinc-300 hover:text-primary transition-colors"
                    >
                      <Phone className="text-primary shrink-0" size={20} />
                      <span className="font-bold">{config.PHONE_NUMBER}</span>
                    </a>
                  </div>
                </div>
                <div className="glass-card p-8 text-center flex flex-col justify-center">
                  <h3 className="text-xl font-black mb-3">¿Tu Toyota tiene una falla?</h3>
                  <p className="text-zinc-400 text-sm mb-5">Escríbenos por WhatsApp y te damos diagnóstico inicial sin costo.</p>
                  <a
                    href={config.WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-4 text-sm font-black tracking-wider border-none"
                  >
                    CONSULTAR AHORA <ArrowRight className="w-5 h-5 inline-block ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-5 text-center text-zinc-600 text-xs border-t border-white/5 relative z-10 bg-black/40">
        © 2026 SOLUCIONES MASTERTECH C.A. Porlamar, Isla de Margarita, Venezuela. Todos los derechos reservados.
      </footer>

      <BrechaCambiariaPanel />
    </div>
  );
}
