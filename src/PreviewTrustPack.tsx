import React, { useState, useEffect } from 'react';
import GarantiaMasterTech from './components/GarantiaMasterTech';
import GoogleReviewsWidget from './components/GoogleReviewsWidget';
import FaqGarantiaPreview from './components/FaqGarantiaPreview';
import { 
  ShieldCheck, 
  Star, 
  HelpCircle,
  Sun, 
  Moon, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

export default function PreviewTrustPack() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check current theme
    const isLight = document.documentElement.classList.contains('theme-light') || document.documentElement.classList.contains('light');
    setIsDark(!isLight);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      // Switch to Light
      document.documentElement.classList.add('theme-light', 'light');
      document.body.classList.add('theme-light', 'light');
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      setIsDark(false);
      try { localStorage.setItem('mastertech_public_theme', 'light'); } catch (e) {}
    } else {
      // Switch to Dark
      document.documentElement.classList.remove('theme-light', 'light');
      document.body.classList.remove('theme-light', 'light');
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      setIsDark(true);
      try { localStorage.setItem('mastertech_public_theme', 'dark'); } catch (e) {}
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#07090e] text-slate-900 dark:text-white transition-colors duration-300 font-sans">
      
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <a 
              href="/"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Volver a la web principal"
            >
              <ArrowLeft size={18} />
            </a>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white uppercase">
                  Vista Previa Privada de Componentes
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  Modo Privado / Aislado
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Prueba interactiva del Sello y Tarjetas de Garantía, Reseñas de Google Maps y Preguntas Frecuentes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick jump links */}
            <a 
              href="#garantia" 
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden md:flex items-center gap-1.5"
            >
              <ShieldCheck size={14} className="text-amber-500" />
              <span>Garantía</span>
            </a>

            <a 
              href="#opiniones" 
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden md:flex items-center gap-1.5"
            >
              <Star size={14} className="text-blue-500" />
              <span>Reseñas Google</span>
            </a>

            <a 
              href="#faq-preview" 
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden md:flex items-center gap-1.5"
            >
              <HelpCircle size={14} className="text-amber-500" />
              <span>Preguntas Frecuentes</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-blue-400" />}
              <span>{isDark ? 'Probar Modo Claro' : 'Probar Modo Oscuro'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 shrink-0 mt-0.5 sm:mt-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Entorno de Calibración Aislado
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Estos componentes son privados y no modifican la web principal hasta que des la orden. Incluye el <strong>Sello y las 4 Tarjetas de Garantía</strong>, el <strong>Widget de Google Maps</strong> y las <strong>Preguntas Frecuentes</strong>.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-500 shrink-0">
            Ruta: <span className="font-bold text-amber-600 dark:text-amber-400">/preview-confianza</span>
          </div>
        </div>
      </div>

      {/* Component 1: Sello y Política de Garantía MasterTech (Banner + 4 Tarjetas) */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <GarantiaMasterTech />
      </div>

      {/* Component 2: Widget Dinámico de Reseñas de Google Maps */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <GoogleReviewsWidget />
      </div>

      {/* Component 3: Preguntas Frecuentes con Política de Garantía y Repuestos */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <FaqGarantiaPreview />
      </div>

      {/* Bottom Integration Proposal */}
      <footer className="py-12 bg-white dark:bg-slate-950 text-center px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <CheckCircle2 size={14} />
            <span>Listo para Integración Directa</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            ¿Cómo se verá en la Página Principal?
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Cuando des la orden, estos dos bloques se insertarán en la página de inicio justo debajo de la sección de <strong>Servicios Especializados y Catálogo de Repuestos</strong>, brindando máxima autoridad antes de que el cliente complete su formulario de agendamiento de cita.
          </p>

          <div className="pt-2">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
            >
              <span>Volver a la Página Principal</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
