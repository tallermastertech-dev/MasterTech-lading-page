import React, { useState } from 'react';
import { CheckCircle2, Phone, ShieldCheck, ArrowRight, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InspectionSlotPicker from './InspectionSlotPicker';

const CONFIG = {
  PHONE_NUMBER: "+584123565012", 
  LOGO_URL: "/logo.png", 
};

export default function Inspeccion() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Línea de inspección gratuita');
  const [inspectionSlotStr, setInspectionSlotStr] = useState<string>('');
  const [isInspectionSlotValid, setIsInspectionSlotValid] = useState<boolean>(false);

  const scrollToPaidPackages = () => {
    const el = document.getElementById('paquetes-pago');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.servicio = selectedService || "Línea de inspección gratuita"; 
    if (inspectionSlotStr) {
      data.fecha_hora = inspectionSlotStr;
    }
    data.vehiculo = data.vehiculo || "No especificado (Landing Inspección)";

    // Create local lead object immediately for client-side storage
    const localLead = {
      id: Date.now(),
      nombre: String(data.nombre || ''),
      telefono: String(data.telefono || ''),
      vehiculo: String(data.vehiculo || ''),
      servicio: String(data.servicio || 'Línea de inspección gratuita'),
      status: 'Pendiente',
      falla: String(data.falla || ''),
      fecha_hora: String(data.fecha_hora || ''),
      created_at: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mastertech_leads_store') || '[]');
      existing.unshift(localLead);
      localStorage.setItem('mastertech_leads_store', JSON.stringify(existing.slice(0, 100)));
    } catch (e) {}

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.lead) {
          try {
            const existing = JSON.parse(localStorage.getItem('mastertech_leads_store') || '[]');
            const filtered = existing.filter((l: any) => l.id !== localLead.id);
            filtered.unshift(json.lead);
            localStorage.setItem('mastertech_leads_store', JSON.stringify(filtered.slice(0, 100)));
          } catch (e) {}
        }
        setFormStatus('success');
      } else {
        if (res.status === 409) {
          const json = await res.json();
          alert(json.error || "El turno seleccionado ya fue reservado por otro usuario. Por favor selecciona otro turno libre.");
          setFormStatus('idle');
          return;
        }
        setFormStatus('success');
      }
    } catch (error) {
      console.warn("Fetch completed with local storage sync:", error);
      setFormStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-primary selection:text-white overflow-x-hidden w-full max-w-full">
      <header className="py-6 px-6 flex justify-center border-b border-white/5 bg-[#0d0e12]/90 backdrop-blur-xl">
        <a href="/" className="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <img src={CONFIG.LOGO_URL || "/logo.png"} alt="MasterTech" className="h-9 w-auto object-contain shrink-0 logo-gold" />
          <span className="font-display font-black text-xl tracking-tighter uppercase text-white">
            MASTER<span className="text-primary italic">TECH</span>
          </span>
        </a>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 text-primary font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              Diagnóstico de Alta Precisión
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 leading-[1.1]">
              REGÍSTRATE PARA SABER EXACTAMENTE <br className="hidden md:block"/> 
              <span className="text-primary font-black">
                QUÉ NECESITA TU CARRO
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              No dejes tu seguridad al azar. Nuestra línea de inspección evalúa más de 100pts críticos de tu vehículo con tecnología de vanguardia para que tomes decisiones informadas.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 mb-10 text-left max-w-3xl mx-auto backdrop-blur-md">
              <h3 className="text-2xl font-black mb-6 text-center">¿Qué incluye la inspección y por qué la hacemos?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Diagnóstico Computarizado</h4>
                    <p className="text-sm text-zinc-400">Escaneo de todos los módulos electrónicos para detectar fallas ocultas antes de que sean problemas costosos.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Revisión de Tren Delantero</h4>
                    <p className="text-sm text-zinc-400">Evaluación de amortiguadores, bujes y terminales para garantizar estabilidad en la vía.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Inspección de Frenos</h4>
                    <p className="text-sm text-zinc-400">Medición del desgaste de pastillas y discos. Tu seguridad y la de tu familia es nuestra prioridad.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Estado de Fluidos</h4>
                    <p className="text-sm text-zinc-400">Chequeo de niveles y calidad de aceite de motor, transmisión, liga de frenos y refrigerante.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-16">
              <button 
                onClick={() => { setSelectedService('Línea de inspección gratuita'); setIsModalOpen(true); }}
                className="btn-primary font-black text-lg md:text-xl py-5 px-8 rounded-2xl shadow-[0_20px_50px_rgba(194,164,114,0.35)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                RESERVAR MI CUPO GRATIS <ArrowRight className="w-6 h-6" />
              </button>

              <button 
                onClick={scrollToPaidPackages}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-lg md:text-xl py-5 px-8 rounded-2xl backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto hover:border-primary/50"
              >
                RESERVAR CUPO DE REVISIÓN <ChevronDown className="w-6 h-6 text-primary" />
              </button>
            </div>
          </motion.div>

          {/* Section: Paquetes de Pago de Revisiones */}
          <div id="paquetes-pago" className="pt-12 border-t border-white/10 text-left max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 text-primary font-bold text-xs uppercase tracking-widest">
                Diagnósticos Avanzados
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-4">
                PAQUETES DE <span className="text-primary italic">PAGO DE REVISIONES</span>
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
                Selecciona la inspección especializada que tu vehículo requiere para obtener un peritaje completo y reporte profesional.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1: Línea de Inspección Paga */}
              <div className="bg-gradient-to-b from-white/10 to-white/5 border border-primary/40 hover:border-primary rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 bg-primary/20 border-b border-l border-primary/30 px-4 py-1.5 rounded-bl-2xl text-[11px] font-black text-primary uppercase tracking-wider">
                  Recomendado
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Línea de Inspección Paga</h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                    Evaluación técnica profunda e integral de más de 100pts con scanner profesional y entrega de informe técnico.
                  </p>
                  <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Escaneo especializado de todos los módulos</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Prueba de compresión y ruta especializada</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Revisión exhaustiva de tren motriz y suspensión</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Reporte técnico impreso y digital</span>
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setSelectedService("Línea de inspección paga"); setIsModalOpen(true); }}
                  className="btn-primary font-black py-4 px-6 rounded-2xl w-full text-center flex items-center justify-center gap-2 text-base shadow-lg"
                >
                  RESERVAR INSPECCIÓN PAGA <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Card 2: Inspección Compra Venta */}
              <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-primary/60 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-xl">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Inspección Compra Venta</h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                    Peritaje pre-compra y pre-venta completo para verificar el estado real del vehículo antes de cerrar el negocio.
                  </p>
                  <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Peritaje de estructura, carrocería y latonería</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Verificación de fugas y salud de motor/caja</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Detección de kilometraje alterado y fallas ocultas</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Aval técnico oficial MasterTech para negociación</span>
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setSelectedService("Inspección Compra Venta"); setIsModalOpen(true); }}
                  className="bg-white/10 hover:bg-primary hover:text-black border border-white/20 hover:border-primary text-white font-black py-4 px-6 rounded-2xl w-full text-center transition-all duration-300 flex items-center justify-center gap-2 text-base"
                >
                  RESERVAR COMPRA VENTA <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal / Formulario */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#12141a] border border-white/10 rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">¡CUPO RESERVADO!</h3>
                  <p className="text-zinc-400 mb-6">Tu reserva para <strong>{selectedService}</strong> ha sido recibida. Un asesor de servicio te contactará de inmediato por WhatsApp para confirmar los detalles.</p>
                  <button onClick={() => { setFormStatus('idle'); setIsModalOpen(false); }} className="text-primary font-bold uppercase tracking-widest text-xs hover:underline">Cerrar</button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black mb-2">Reserva tu Cupo</h3>
                    <p className="text-sm text-primary font-bold">{selectedService}</p>
                    <p className="text-xs text-zinc-400 mt-1">Completa estos 3 datos y confirma tu atención personalizada.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="inspeccion-nombre" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Nombre Completo</label>
                      <input id="inspeccion-nombre" required name="nombre" type="text" placeholder="Tu Nombre" className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary outline-none transition-all placeholder:text-zinc-700 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="inspeccion-telefono" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Teléfono (WhatsApp)</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                        <input id="inspeccion-telefono" required name="telefono" type="tel" placeholder="0412 000 0000" className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:border-primary outline-none transition-all placeholder:text-zinc-700 text-white" />
                      </div>
                    </div>

                    <InspectionSlotPicker 
                      onSelectSlot={(slotStr, isValid) => {
                        setInspectionSlotStr(slotStr);
                        setIsInspectionSlotValid(isValid);
                      }} 
                    />

                    <button disabled={formStatus === 'loading'} type="submit" className="btn-primary font-black text-lg py-5 px-6 rounded-2xl w-full shadow-[0_10px_30px_rgba(194,164,114,0.3)] transition-all mt-4">
                      {formStatus === 'loading' ? 'Procesando...' : 'RESERVAR AHORA'}
                    </button>
                    
                    <p className="text-xs text-center text-zinc-500 font-medium pt-2">
                      Una vez enviado, te contactaremos de inmediato por WhatsApp para confirmar. ¡Te esperamos en nuestro taller!
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-6 text-center text-zinc-600 text-xs border-t border-white/5 relative z-10 bg-black/40">
        © 2026 SOLUCIONES MASTERTECH C.A. Todos los derechos reservados.
      </footer>
    </div>
  );
}

