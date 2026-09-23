import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import GarantiaMasterTech from './components/GarantiaMasterTech';
import { fetchSettingsWithTTL, getCachedSettings } from './utils/settingsCache';

const CONFIG_DEFAULT = {
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

export default function Faq() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);

  useEffect(() => {
    // SEO — meta tags
    document.title = 'Garantía Oficial y Respaldo Técnico | Taller MasterTech Porlamar';
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
    setMeta('description', 'Conoce nuestra política oficial de garantía, respaldo técnico en mano de obra y repuestos, y condiciones de servicio en Taller MasterTech, Porlamar, Isla de Margarita.');
    setMeta('og:title', 'Garantía Oficial y Respaldo Técnico | Taller MasterTech Porlamar', true);
    setMeta('og:description', 'Respaldo técnico por escrito, repuestos certificados y condiciones transparentes en Taller MasterTech.', true);

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', 'https://www.tallermastertech.com/faq');

    const cached = getCachedSettings();
    if (cached.data) {
      setConfig((prev: any) => ({ ...prev, ...cached.data }));
    }

    const loadSettings = async (force = false) => {
      try {
        const data = await fetchSettingsWithTTL({ force });
        if (data && typeof data === 'object') {
          setConfig((prev: any) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Error cargando configuración:", err);
      }
    };
    loadSettings();

    const handleSettingsUpdated = (e: any) => {
      const updated = e?.detail || e;
      if (updated && typeof updated === 'object') {
        setConfig((prev: any) => ({ ...prev, ...updated }));
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
    <div className="theme-root min-h-screen selection:bg-primary selection:text-black flex flex-col overflow-x-hidden w-full max-w-full">
      {/* Header with Dropdown Menus */}
      <Navbar activePage="faq" config={config} />

      {/* Main Content: Sello y Política de Garantía MasterTech sustituyendo el FAQ antiguo */}
      <main className="flex-1 pt-14">
        <GarantiaMasterTech />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-500 dark:text-zinc-500 text-xs border-t border-slate-200 dark:border-white/5 relative z-10 bg-slate-100 dark:bg-black/40">
        © 2026 SOLUCIONES MASTERTECH C.A. Porlamar, Isla de Margarita, Venezuela. Todos los derechos reservados.
      </footer>
    </div>
  );
}
