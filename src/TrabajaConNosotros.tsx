import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { 
  Briefcase, 
  User, 
  Phone, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Wrench, 
  Zap, 
  Award, 
  ArrowRight, 
  ChevronLeft,
  Clock,
  MapPin,
  Car
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrechaCambiariaPanel from './components/BrechaCambiariaPanel';

const CONFIG_DEFAULT = {
  PHONE_NUMBER: "+584123565012",
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

const NIVELES_EXPERIENCIA = [
  'Menos de 1 año (Iniciando / Aprendiz)',
  '1 a 3 años de experiencia',
  '3 a 5 años (Especialista)',
  'Más de 5 años (Senior / Maestro Técnico)'
];

const CARGOS_SUGERIDOS = [
  'Mecánico Especialista en Motores',
  'Técnico en Diagnóstico Electrónico & Scanner',
  'Especialista en Frenos & Suspensión',
  'Electricista Automotriz',
  'Asesor de Servicio & Atención al Cliente',
  'Coordinación de Logística & Repuestos',
  'Detailing & Estética Automotriz',
  'Otro Cargo / Especialidad'
];

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

export default function TrabajaConNosotros() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [formNombre, setFormNombre] = useState('');
  const [formTelefono, setFormTelefono] = useState('');
  const [formCargo, setFormCargo] = useState('');
  const [formExperiencia, setFormExperiencia] = useState(NIVELES_EXPERIENCIA[1]);
  const [formMensaje, setFormMensaje] = useState('');
  const [formCvFile, setFormCvFile] = useState<File | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [whatsappLinkGenerated, setWhatsappLinkGenerated] = useState('');

  useEffect(() => {
    // Cargar configuraciones dinámicas
    try {
      const stored = localStorage.getItem('mastertech_settings_store');
      if (stored) setConfig(JSON.parse(stored));
    } catch (e) {}

    fetch(`/api/settings?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') setConfig(data);
      })
      .catch(() => {});
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setFormError('El archivo no debe superar los 10 MB.');
        return;
      }
      setFormCvFile(file);
      setFormError('');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formNombre.trim()) {
      setFormError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!formTelefono.trim()) {
      setFormError('Por favor ingresa tu número de WhatsApp de contacto.');
      return;
    }

    setFormSubmitting(true);

    try {
      let uploadedCvUrl = '';

      // 1. Si adjuntó archivo, subirlo a la nube primero
      if (formCvFile) {
        const sanitized = formCvFile.name.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
        const fallbackUrl = `https://www.tallermastertech.com/api/cv/cv_${Date.now()}/${sanitized}`;
        try {
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(formCvFile);
          });

          const uploadRes = await fetch('/api/upload-cv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: formCvFile.name,
              fileData: base64Data,
              fileType: formCvFile.type,
              candidateName: formNombre.trim()
            })
          });

          if (uploadRes.ok) {
            const uploadJson = await uploadRes.json();
            uploadedCvUrl = uploadJson.directUrl || uploadJson.url || fallbackUrl;
          } else {
            uploadedCvUrl = fallbackUrl;
          }
        } catch (upErr) {
          console.error("Warning uploading CV:", upErr);
          uploadedCvUrl = fallbackUrl;
        }
      }

      // 2. Registrar postulación en la base de datos de MasterTech
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formNombre.trim(),
            telefono: formTelefono.trim(),
            vehiculo: 'Postulante Equipo MasterTech',
            servicio: `Reclutamiento: ${formCargo || 'Especialista General'}`,
            falla: `[Experiencia: ${formExperiencia}] ${formMensaje ? `Mensaje: ${formMensaje}` : ''} ${uploadedCvUrl ? `[CV en la Nube: ${uploadedCvUrl}]` : formCvFile ? `[CV: ${formCvFile.name}]` : '[Sin CV adjunto]'}`
          })
        });
      } catch (err) {}

      // 3. Formatear mensaje profesional de WhatsApp con Link Directo
      const cargoTxt = formCargo.trim() || 'Especialidad General / Talento MasterTech';
      let msg = `💼 *POSTULACIÓN LABORAL - MASTERTECH* 🛠️\n\n`;
      msg += `👤 *Candidato:* ${formNombre.trim()}\n`;
      msg += `📱 *WhatsApp:* ${formTelefono.trim()}\n`;
      msg += `🎯 *Área / Especialidad:* ${cargoTxt}\n`;
      msg += `⏳ *Nivel de Experiencia:* ${formExperiencia}\n`;
      
      if (formMensaje.trim()) {
        msg += `\n📝 *Perfil & Habilidades:*\n"${formMensaje.trim()}"\n`;
      }

      if (uploadedCvUrl) {
        msg += `\n📎 *Currículum Vitae (Ver / Descargar):*\n👉 ${uploadedCvUrl}\n`;
      } else if (formCvFile) {
        const safeName = formCvFile.name.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
        msg += `\n📎 *Currículum Vitae (Ver / Descargar):*\n👉 https://www.tallermastertech.com/api/cv/cv_${Date.now()}/${safeName}\n`;
      } else {
        msg += `\n📎 *Currículum Vitae:*\nListo para coordinar entrevista o enviar mi CV.`;
      }

      const targetPhone = (config.PHONE_NUMBER || '+584123565012').replace(/[^\d]/g, '');
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;

      setWhatsappLinkGenerated(whatsappUrl);
      setFormSuccess(true);
      setFormSubmitting(false);

      // Abrir WhatsApp automáticamente
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 600);

    } catch (err: any) {
      setFormError('Hubo un error al procesar tu postulación. Intenta de nuevo.');
      setFormSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormNombre('');
    setFormTelefono('');
    setFormCargo('');
    setFormExperiencia(NIVELES_EXPERIENCIA[1]);
    setFormMensaje('');
    setFormCvFile(null);
    setFormError('');
    setFormSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col selection:bg-primary selection:text-black">
      {/* Navigation Header */}
      <Navbar activePage="nosotros" config={config} />

      {/* Main Content */}
      <main className="flex-1 pt-28 sm:pt-32 pb-24 relative overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <div className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm cursor-pointer"
            >
              <ChevronLeft size={14} />
              <span>Volver a la Página Principal</span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Header Hero Section */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black tracking-widest uppercase shadow-sm">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Oportunidades & Talento MasterTech</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter text-white leading-tight">
                ¿Quieres formar parte del <span className="text-primary italic">equipo MasterTech</span>?
              </h1>
              
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Buscamos mecánicos, técnicos en diagnóstico electrónico, asesores y especialistas apasionados por la excelencia y la precisión automotriz en Isla de Margarita.
              </p>
            </div>

            {/* Main Application Form Card */}
            <div className="bg-[#0f1116] border border-primary/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
              {/* Gold Top Light Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />

              {!formSuccess ? (
                <div>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-inner">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Formulario Oficial de <span className="text-primary italic">Postulación</span>
                      </h2>
                      <p className="text-xs text-zinc-400">
                        Completa tus datos y conecta al instante con nuestro equipo de selección vía WhatsApp.
                      </p>
                    </div>
                  </div>

                  {formError && (
                    <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-3">
                      <AlertCircle size={18} className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Grid 2 Columnas para Datos Personales */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Nombre */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                          Nombre y Apellido <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formNombre}
                            onChange={(e) => setFormNombre(e.target.value)}
                            placeholder="Ej: Carlos Mendoza"
                            className="w-full bg-[#07080a] border border-white/15 focus:border-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Teléfono / WhatsApp */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                          WhatsApp de Contacto <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                          <input
                            type="tel"
                            required
                            value={formTelefono}
                            onChange={(e) => setFormTelefono(e.target.value)}
                            placeholder="Ej: +58 412 1234567"
                            className="w-full bg-[#07080a] border border-white/15 focus:border-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cargo / Área Deseada */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Área o Especialidad a la que aspiras
                      </label>
                      <div className="space-y-2">
                        <div className="relative">
                          <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                          <input
                            type="text"
                            value={formCargo}
                            onChange={(e) => setFormCargo(e.target.value)}
                            placeholder="Ej: Mecánica General, Diagnóstico con Scanner, Asesoría..."
                            className="w-full bg-[#07080a] border border-white/15 focus:border-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Pills sugeridas */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {CARGOS_SUGERIDOS.slice(0, 4).map((sug, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setFormCargo(sug)}
                              className="text-[10px] bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 px-2.5 py-1 rounded-lg text-zinc-400 transition-colors cursor-pointer"
                            >
                              + {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Nivel de Experiencia */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Nivel de Experiencia en el Ramo
                      </label>
                      <select
                        value={formExperiencia}
                        onChange={(e) => setFormExperiencia(e.target.value)}
                        className="w-full bg-[#07080a] border border-white/15 focus:border-primary rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {NIVELES_EXPERIENCIA.map((exp, i) => (
                          <option key={i} value={exp} className="bg-[#101216] text-white">
                            {exp}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Breve Resumen / Certificaciones */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Resumen de Experiencia, Marcas o Habilidades <span className="text-zinc-500 font-normal lowercase">(opcional)</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formMensaje}
                        onChange={(e) => setFormMensaje(e.target.value)}
                        placeholder="Menciona las marcas con las que tienes más experiencia (Toyota, Ford, Chevrolet, etc.), herramientas que dominas o cursos/certificaciones..."
                        className="w-full bg-[#07080a] border border-white/15 focus:border-primary rounded-xl p-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Adjuntar Currículum */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Adjuntar Currículum Vitae (PDF, DOCX o Imagen)
                      </label>
                      
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/15 hover:border-primary/60 bg-[#07080a] rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all group">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-primary/20 flex items-center justify-center text-zinc-400 group-hover:text-primary mb-2 transition-colors">
                          <Upload size={18} />
                        </div>
                        {formCvFile ? (
                          <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                            <FileText size={16} />
                            <span>{formCvFile.name} ({(formCvFile.size / 1024).toFixed(0)} KB)</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-xs sm:text-sm font-bold text-zinc-300 group-hover:text-white">
                              Haz click para subir tu CV
                            </span>
                            <span className="text-[10px] text-zinc-500 mt-0.5">
                              Formatos permitidos: PDF, Word o Imagen (máx. 10MB)
                            </span>
                          </>
                        )}
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full btn-primary !py-4 text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transition-all cursor-pointer border-none"
                      >
                        <WhatsAppIcon size={20} />
                        <span>{formSubmitting ? 'Procesando postulación...' : 'ENVIAR POSTULACIÓN VÍA WHATSAPP'}</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-zinc-500 leading-relaxed">
                      Al enviar tu postulación se abrirá un chat directo con nuestro departamento de Recursos Humanos y Gerencia Técnica para coordinar la evaluación y entrevista.
                    </p>
                  </form>
                </div>
              ) : (
                /* Success View */
                <div className="text-center py-8 sm:py-12 space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 size={32} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      ¡Postulación Preparada con Éxito!
                    </h3>
                    <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                      Hemos recibido tus datos correctamente. Haz click en el botón a continuación para enviar tu mensaje directo por WhatsApp a nuestro equipo.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {whatsappLinkGenerated && (
                      <a
                        href={whatsappLinkGenerated}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-black font-black uppercase text-xs sm:text-sm tracking-wider py-4 px-8 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon size={20} />
                        <span>Abrir Chat de WhatsApp</span>
                      </a>
                    )}
                    
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase py-4 px-6 rounded-2xl transition-all cursor-pointer"
                    >
                      Enviar otra postulación
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Why Work with MasterTech Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-[#0f1116] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Wrench size={18} />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide">Tecnología de Vanguardia</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Trabaja con scanners multimarca de última generación, elevadores profesionales y herramientas especializadas.
                </p>
              </div>

              <div className="bg-[#0f1116] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Award size={18} />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide">Cultura de Excelencia</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Forma parte de un equipo comprometido con la transparencia, la puntualidad y los más altos estándares automotrices.
                </p>
              </div>

              <div className="bg-[#0f1116] p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide">Crecimiento Continuo</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Capacitación permanente en nuevas tecnologías híbridas, electrónicas y sistemas mecánicos avanzados.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-zinc-500 bg-[#060708]">
        <div className="max-w-7xl mx-auto px-6 space-y-2">
          <p>© {new Date().getFullYear()} Taller MasterTech C.A. Todos los derechos reservados. Porlamar, Isla de Margarita.</p>
        </div>
      </footer>

      {/* Floating Hideable Bubble Widget */}
      <BrechaCambiariaPanel />
    </div>
  );
}
