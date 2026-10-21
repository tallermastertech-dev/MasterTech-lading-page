import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  Wrench, 
  GraduationCap, 
  CheckCircle2, 
  Phone, 
  Instagram, 
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function ReclutamientoKitSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'artes' | 'diagnostico' | 'copy'>('artes');
  const [isGeneratingPng, setIsGeneratingPng] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const downloadTextGuide = () => {
    const textContent = `===============================================================
MASTERTECH - RECOMENDACIONES Y ANALISIS CRITICO DE LA IA
GUIA DE RECLUTAMIENTO Y DISENO GRAFICO AUTOMOTRIZ
===============================================================

1. DIAGNOSTICO DE DISENO GRAFICO Y RECLUTAMIENTO DE LA IMAGEN
---------------------------------------------------------------
Puntos evaluados sobre la pieza grafica de captacion:

A. Jerarquia Visual y Mensaje Principal:
El titulo original engloba "Mecanico Automotriz" y "Ayudante de mecanica" en un mismo bloque. Para atraer a un Tecnico de Alto Nivel (capaz de interpretar diagramas electricos, topologia de red CAN/LIN y datos en vivo con scanner), el aviso generalista dispersa la atencion.

B. Requisitos Generales vs. Requisitos Tecnicos:
Terminos como "ordenado", "colaborador" o "positivo" corresponden a habilidades blandas. Para filtrar de forma efectiva desde la imagen, se deben destacar requisitos tecnicos claros (Diagnostico Computarizado, Scanner OBD2, Osciloscopio, Electronica Automotriz, Redes de Comunicacion).

C. Distribucion y Espacio Blanco:
La zona inferior suele saturarse si se agrupan requisitos, contactos y redes sin separacion por bloques. Darle protagonismo al cargo especifico y a un Llamado a la Accion (CTA) directo optimiza la tasa de postulacion calificada.

---------------------------------------------------------------
2. PROPUESTA DE REDISENO ESTRUCTURADO (GUIA DE ARTE MASTERTECH)
---------------------------------------------------------------
Colores Corporativos:
- Rojo MasterTech: #B30000 / #DC2626
- Negro Carbon: #0B0C10 / #12141A
- Dorado Acento: #D4AF37
- Blanco Puro: #FFFFFF

Estructura para diseno en Canva, Photoshop o Illustrator:
1. Encabezado Impactante:
   - Texto Superior: UNETE A NUESTRO EQUIPO TECNICO
   - Cargo Destacado (Negrita, Gran Tamano): TECNICO MECANICO AUTOMOTRIZ
   - Subtitulo: Especialista en Diagnostico y Sistemas Modernos

2. Imagen Principal (Hero Image):
   - Fotografia real del taller con camioneta o tecnico manipulando scanner/osciloscopio.
   - Refuerza que es un taller de tecnologia avanzada y no una mecanica convencional.

3. Requisitos Clave (Bloque Central con Iconos):
   - Experiencia comprobable en mecanica general y diagnostico.
   - Manejo de Scanner y lectura de datos en vivo (vehiculos 2017+).
   - Lectura e interpretacion de diagramas electricos y topologia de red.
   - Residencia en Isla de Margarita (Porlamar).
   - Disponibilidad inmediata.

4. Llamado a la Accion (Call To Action - CTA):
   - Caja destacada en Rojo/Blanco:
     CUMPLES CON EL PERFIL? ENVIANOS TU CV
   - Lineas directas WhatsApp: 0412-356.50.12 / 0424-814.38.43
   - Ubicacion: Porlamar, Isla de Margarita | Instagram: @tallermastertech

---------------------------------------------------------------
3. COPYS SUGERIDOS PARA REDES SOCIALES (FEED E HISTORIAS)
---------------------------------------------------------------
OPCION A: FEED INSTAGRAM / FACEBOOK (TECNICO ESPECIALISTA)
Eres experto en diagnostico automotriz y te apasiona la tecnologia en vehiculos modernos?

En Taller MasterTech estamos buscando un Tecnico Mecanico especializado para incorporarse a nuestro equipo en Porlamar, Isla de Margarita.

Requisitos del perfil:
- Dominio en diagnostico automotriz y lectura de parametros en vivo (Vehiculos 2017+).
- Interpretacion de diagramas electricos y redes de comunicacion CAN/LIN.
- Manejo de herramientas de escaneo y diagnostico computarizado.
- Residencia en la Isla de Margarita.
- Disponibilidad inmediata.

Que ofrecemos?
- Equipamiento de diagnostico de ultima generacion y herramientas especializadas.
- Excelente ambiente de trabajo profesional y remuneracion competitiva.
- Estabilidad laboral en un equipo tecnico de alto rendimiento.

Postulate enviando tu curriculum al WhatsApp:
0412-356.50.12 / 0424-814.38.43
Ubicacion: Porlamar, Isla de Margarita.
Instagram: @tallermastertech

---------------------------------------------------------------
4. CONSEJO ESTRATEGICO: SEPARACION DE ARTES
---------------------------------------------------------------
Si la empresa necesita tanto Tecnico Calificado como Ayudante de Taller, es fundamental publicar 2 piezas graficas independientes:

- Arte 1 (Tecnico Diagnostico): Enfocado en tecnologia, escanner, diagramas y dominio de fallas complejas.
- Arte 2 (Ayudante de Taller): Enfocado en disposicion para aprender, mantenimiento preventivo y soporte de taller.

Mezclar ambos en una misma imagen genera percepcion de bajo nivel al tecnico calificado y puede intimidar al ayudante.
===============================================================
Documento generado por Taller MasterTech C.A. - Porlamar, Isla de Margarita.`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MasterTech_Guia_Analisis_Reclutamiento.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateAndDownloadPng = (tipo: 'tecnico' | 'ayudante') => {
    setIsGeneratingPng(tipo);

    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsGeneratingPng(null);
      return;
    }

    // 1. Fondo oscuro corporativo MasterTech
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0c0e14');
    bgGrad.addColorStop(0.5, '#12141c');
    bgGrad.addColorStop(1, '#07080b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Acentos decorativos de marca
    const redGlow = ctx.createRadialGradient(width * 0.8, height * 0.15, 50, width * 0.8, height * 0.15, 600);
    redGlow.addColorStop(0, 'rgba(179, 0, 0, 0.45)');
    redGlow.addColorStop(1, 'rgba(179, 0, 0, 0)');
    ctx.fillStyle = redGlow;
    ctx.fillRect(0, 0, width, height);

    const goldGlow = ctx.createRadialGradient(width * 0.2, height * 0.85, 50, width * 0.2, height * 0.85, 500);
    goldGlow.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
    goldGlow.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = goldGlow;
    ctx.fillRect(0, 0, width, height);

    // 3. Cargar imagen real del taller para el hero
    const imgUrl = tipo === 'tecnico' 
      ? '/assets/servicio-mecanica.webp' 
      : '/assets/instalaciones.webp';

    const heroImg = new Image();
    heroImg.crossOrigin = 'anonymous';

    const renderRemainingContent = () => {
      // Franja superior roja con texto
      ctx.fillStyle = '#B30000';
      ctx.fillRect(0, 0, width, 18);

      // Header Tag
      ctx.fillStyle = 'rgba(179, 0, 0, 0.25)';
      ctx.strokeStyle = '#B30000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, 55, 520, 48, [24]);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 19px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(tipo === 'tecnico' ? 'CONVOCATORIA TECNICA OFICIAL' : 'OPORTUNIDAD DE APRENDIZAJE', 110, 86);

      // Marca en esquina superior derecha
      ctx.fillStyle = '#D4AF37';
      ctx.font = '900 24px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('MASTERTECH', width - 80, 88);

      // Titulo Principal
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 62px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'left';
      const mainTitle = tipo === 'tecnico' ? 'TECNICO MECANICO' : 'AYUDANTE TECNICO';
      ctx.fillText(mainTitle, 80, 185);

      ctx.fillStyle = '#B30000';
      const subTitle = tipo === 'tecnico' ? 'AUTOMOTRIZ & DIAGNOSTICO' : 'DE MECANICA AUTOMOTRIZ';
      ctx.fillText(subTitle, 80, 248);

      // Subtitulo especifico
      ctx.fillStyle = '#D4AF37';
      ctx.font = '700 24px system-ui, -apple-system, sans-serif';
      const specLine = tipo === 'tecnico' 
        ? 'Especialista en Scanner, Redes CAN/LIN y Motores Modernos' 
        : 'Soporte de Taller, Mantenimiento Preventivo y Aprendizaje';
      ctx.fillText(specLine, 80, 292);

      // Contenedor de Requisitos Clave
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, 740, width - 160, 360, [24]);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 24px system-ui, -apple-system, sans-serif';
      ctx.fillText('REQUISITOS DEL PERFIL', 120, 785);

      ctx.strokeStyle = '#B30000';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(120, 800);
      ctx.lineTo(240, 800);
      ctx.stroke();

      const bulletsTecnico = [
        'Experiencia comprobable en mecanica automotriz y motores modernos.',
        'Diagnostico avanzado con scanner automotriz y lectura de datos en vivo (2017+).',
        'Interpretacion tecnica de diagramas electricos y topologia de red CAN/LIN.',
        'Residencia fija en Porlamar / Isla de Margarita con disponibilidad inmediata.'
      ];

      const bulletsAyudante = [
        'Conocimientos basicos de herramientas y mecanica preventiva.',
        'Excelente actitud, alto sentido de orden, limpieza y disciplina laboral.',
        'Disposicion para aprender diagnostico avanzado y tecnologia moderna.',
        'Residencia en Isla de Margarita (Porlamar o zonas cercanas).'
      ];

      const activeBullets = tipo === 'tecnico' ? bulletsTecnico : bulletsAyudante;

      ctx.font = '600 21px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#E5E7EB';

      activeBullets.forEach((bullet, bIdx) => {
        const yPos = 845 + bIdx * 60;
        ctx.fillStyle = '#B30000';
        ctx.beginPath();
        ctx.arc(130, yPos - 6, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#E5E7EB';
        ctx.fillText(bullet, 155, yPos);
      });

      // Banner CTA Inferior
      ctx.fillStyle = '#B30000';
      ctx.beginPath();
      ctx.roundRect(80, 1130, width - 160, 140, [24]);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 24px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CUMPLES CON EL PERFIL? POSTULATE VIA WHATSAPP', width / 2, 1175);

      ctx.font = '800 30px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#FFDD55';
      ctx.fillText('0412-356.50.12  /  0424-814.38.43', width / 2, 1218);

      ctx.font = '600 18px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('Porlamar, Isla de Margarita  |  Instagram: @tallermastertech', width / 2, 1250);

      // Exportar y descargar
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = tipo === 'tecnico' 
          ? 'MasterTech_Arte_Tecnico_Mecanico.png' 
          : 'MasterTech_Arte_Ayudante_Taller.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Error al generar imagen PNG:', err);
      } finally {
        setIsGeneratingPng(null);
      }
    };

    heroImg.onload = () => {
      // Dibujar imagen con marco recortado
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(80, 320, width - 160, 390, [24]);
      ctx.clip();
      ctx.drawImage(heroImg, 80, 320, width - 160, 390);

      // Gradiente oscuro sobre la imagen para acentuar contraste
      const overlayGrad = ctx.createLinearGradient(80, 320, 80, 710);
      overlayGrad.addColorStop(0, 'rgba(0,0,0,0.1)');
      overlayGrad.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(80, 320, width - 160, 390);

      ctx.restore();

      // Borde del marco de la foto
      ctx.strokeStyle = '#B30000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(80, 320, width - 160, 390, [24]);
      ctx.stroke();

      renderRemainingContent();
    };

    heroImg.onerror = () => {
      // Si la imagen falla en cargar, dibujar contenedor de reemplazo solido
      ctx.fillStyle = '#181b24';
      ctx.beginPath();
      ctx.roundRect(80, 320, width - 160, 390, [24]);
      ctx.fill();
      ctx.strokeStyle = '#B30000';
      ctx.lineWidth = 3;
      ctx.stroke();
      renderRemainingContent();
    };

    heroImg.src = imgUrl;
  };

  const copyTextTecnico = `¿Eres experto en diagnostico automotriz y te apasiona la tecnologia en vehiculos modernos?

En Taller MasterTech estamos buscando un Tecnico Mecanico especializado para incorporarse a nuestro equipo en Porlamar, Isla de Margarita.

Requisitos del perfil:
- Dominio en diagnostico automotriz y lectura de parametros en vivo (Vehiculos 2017+).
- Interpretacion de diagramas electricos y topologia de red CAN/LIN.
- Manejo de herramientas de escaneo y diagnostico computarizado.
- Residencia en la Isla de Margarita.
- Disponibilidad inmediata.

Que ofrecemos?
- Equipamiento de diagnostico de ultima generacion y herramientas especializadas.
- Excelente ambiente de trabajo profesional y remuneracion competitiva.
- Estabilidad laboral en un equipo tecnico de alto rendimiento.

Postulate enviando tu curriculum al WhatsApp:
0412-356.50.12 / 0424-814.38.43
Ubicacion: Porlamar, Isla de Margarita.
Instagram: @tallermastertech`;

  const copyTextAyudante = `¿Tienes pasion por la mecanica automotriz y deseas formarte en un taller con estandares de excelencia?

En Taller MasterTech buscamos un Ayudante de Mecanica con deseos de aprender, superarse y construir carrera tecnica en Porlamar.

Requisitos del perfil:
- Conocimientos basicos de mecanica automotriz y herramientas.
- Excelente actitud, disciplina, puntualidad y ganas de aprender.
- Disposicion para soporte general de taller y mantenimiento preventivo.
- Residencia en Isla de Margarita.

Que ofrecemos?
- Capacitacion continua en nuevas tecnologias automotrices.
- Acompanamiento por parte de tecnicos especialistas senior.
- Ambiente de trabajo seguro, ordenado y con tecnologia moderna.

Postulate enviando tu curriculum al WhatsApp:
0412-356.50.12 / 0424-814.38.43
Ubicacion: Porlamar, Isla de Margarita.
Instagram: @tallermastertech`;

  return (
    <section className="mt-14 pt-10 border-t border-slate-200 dark:border-white/10 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 dark:bg-primary/10 border border-red-500/30 dark:border-primary/30 text-red-600 dark:text-primary text-[11px] font-black tracking-widest uppercase mb-2">
            <Sparkles size={13} />
            <span>Kit de Reclutamiento & Guia Creativa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Recomendaciones y Analisis Critico de la IA
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-2xl mt-1">
            Diagnostico de diseno, copys para redes sociales y plantillas graficas descargables listas para publicar en Instagram y WhatsApp con la identidad visual oficial de MasterTech.
          </p>
        </div>

        {/* Global Download Button */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="/MasterTech_Convocatoria_Tecnico_1920x1080.pdf"
            download="MasterTech_Convocatoria_Tecnico_1920x1080.pdf"
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-red-600/30 cursor-pointer"
            title="Descargar infografia oficial en PDF 1920x1080"
          >
            <Download size={15} />
            <span>Descargar PDF (1920x1080)</span>
          </a>

          <button
            type="button"
            onClick={downloadTextGuide}
            className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-red-700 dark:hover:bg-red-500 dark:hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
            title="Descargar analisis y recomendaciones en formato texto"
          >
            <Download size={14} />
            <span>Guia (.TXT)</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('artes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'artes'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'bg-white dark:bg-white/5 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
          }`}
        >
          <ImageIcon size={14} />
          <span>Artes Graficos Descargables</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('diagnostico')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'diagnostico'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'bg-white dark:bg-white/5 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
          }`}
        >
          <FileText size={14} />
          <span>Diagnostico y Guia de Arte</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('copy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'copy'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'bg-white dark:bg-white/5 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
          }`}
        >
          <Copy size={14} />
          <span>Copys para Redes</span>
        </button>
      </div>

      {/* Tab 1: Artes Graficos Listos para Descargar */}
      {activeTab === 'artes' && (
        <div className="space-y-6">
          {/* Banner Infografia Landscape 1920x1080 */}
          <div className="bg-gradient-to-r from-red-950/40 via-black/80 to-slate-900 border border-red-500/40 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-wider">
                <span>Formato Horizontal Presentacion & PDF</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Infografia Oficial de Reclutamiento (1920x1080)
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">
                Documento en alta resolucion con encabezado, hero de taller, requisitos tecnicos filtrados (Scanner, Redes CAN/LIN, Diagramas), caja CTA con WhatsApp y copy de redes.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="/MasterTech_Convocatoria_Tecnico_1920x1080.pdf"
                download="MasterTech_Convocatoria_Tecnico_1920x1080.pdf"
                className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <Download size={16} />
                <span>Descargar PDF (1920x1080)</span>
              </a>

              <a
                href="/MasterTech_Reclutamiento_Tecnico_1920x1080.jpg"
                download="MasterTech_Reclutamiento_Tecnico_1920x1080.jpg"
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
              >
                <Download size={15} />
                <span>Descargar JPG (1920x1080)</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arte 1: Tecnico Mecanico Automotriz */}
            <div className="bg-white dark:bg-[#0f1116] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-lg space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-500/10 dark:bg-red-950/40 px-2.5 py-1 rounded-lg border border-red-500/20">
                    Propuesta 1 - Perfil Senior
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">1080 x 1350 px</span>
                </div>

                {/* Vista previa simulada de la pieza */}
                <div className="mt-4 rounded-2xl overflow-hidden border border-red-600/40 bg-gradient-to-b from-[#14161f] to-[#0a0c10] text-white p-4 relative space-y-3">
                  <div className="h-1 bg-red-600 -mx-4 -mt-4 mb-3" />
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-bold">UNETE AL EQUIPO</span>
                    <span className="font-mono text-yellow-500 font-black">MASTERTECH</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase text-white leading-tight">TECNICO MECANICO</h3>
                    <h4 className="text-sm font-black text-red-500 uppercase">AUTOMOTRIZ & DIAGNOSTICO</h4>
                    <p className="text-[10px] text-yellow-400 font-semibold mt-0.5">Especialista en Scanner, Redes CAN y Motores Modernos</p>
                  </div>

                  {/* Foto real taller */}
                  <div className="relative h-48 rounded-xl overflow-hidden border border-red-600/30">
                    <img 
                      src="/assets/taller_camioneta_hero.png" 
                      alt="Taller MasterTech Diagnostico" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[9px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        Tecnologia de Punta & Scanners OEM
                      </span>
                    </div>
                  </div>

                  {/* Requisitos clave */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1.5 text-[10px]">
                    <span className="font-black text-white block uppercase tracking-wider text-[9px] text-red-400">Requisitos Clave</span>
                    <p className="text-zinc-300">• Experiencia en diagnostico y lectura de datos en vivo (2017+).</p>
                    <p className="text-zinc-300">• Interpretacion de diagramas electricos y redes automotrices.</p>
                    <p className="text-zinc-300">• Residencia fija en Porlamar, Isla de Margarita.</p>
                  </div>

                  {/* CTA Banner */}
                  <div className="bg-red-600 text-white p-2.5 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] font-black uppercase block">POSTULATE VIA WHATSAPP</span>
                    <span className="text-xs font-mono font-black text-yellow-300 block">0412-356.50.12 / 0424-814.38.43</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 dark:text-zinc-400">Formato Feed / WhatsApp</span>
                <a
                  href="/MasterTech_Arte_Tecnico_Feed_1080x1350.png"
                  download="MasterTech_Arte_Tecnico_Feed_1080x1350.png"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-red-600/25 transition-all cursor-pointer"
                >
                  <Download size={14} />
                  <span>Descargar Arte (PNG)</span>
                </a>
              </div>
            </div>

            {/* Arte 2: Ayudante de Mecanica */}
            <div className="bg-white dark:bg-[#0f1116] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-lg space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    Propuesta 2 - Perfil Aprendizaje
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">1080 x 1350 px</span>
                </div>

                {/* Vista previa simulada de la pieza */}
                <div className="mt-4 rounded-2xl overflow-hidden border border-emerald-600/40 bg-gradient-to-b from-[#14161f] to-[#0a0c10] text-white p-4 relative space-y-3">
                  <div className="h-1 bg-emerald-600 -mx-4 -mt-4 mb-3" />
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">OPORTUNIDAD DE EMPLEO</span>
                    <span className="font-mono text-yellow-500 font-black">MASTERTECH</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase text-white leading-tight">AYUDANTE TECNICO</h3>
                    <h4 className="text-sm font-black text-emerald-400 uppercase">DE MECANICA AUTOMOTRIZ</h4>
                    <p className="text-[10px] text-yellow-400 font-semibold mt-0.5">Soporte de Taller, Mantenimiento Preventivo y Aprendizaje</p>
                  </div>

                  {/* Foto real taller */}
                  <div className="relative h-44 rounded-xl overflow-hidden border border-emerald-600/30">
                    <img 
                      src="/assets/instalaciones.webp" 
                      alt="Instalaciones MasterTech" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[9px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        Capacitacion Continua & Ambiente Profesional
                      </span>
                    </div>
                  </div>

                  {/* Requisitos clave */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1.5 text-[10px]">
                    <span className="font-black text-white block uppercase tracking-wider text-[9px] text-emerald-400">Requisitos Clave</span>
                    <p className="text-zinc-300">• Conocimientos basicos de mecanica automotriz y herramientas.</p>
                    <p className="text-zinc-300">• Actitud proactiva, orden, puntualidad y ganas de formarse.</p>
                    <p className="text-zinc-300">• Residencia en Porlamar / Isla de Margarita.</p>
                  </div>

                  {/* CTA Banner */}
                  <div className="bg-emerald-600 text-white p-2.5 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] font-black uppercase block">POSTULATE VIA WHATSAPP</span>
                    <span className="text-xs font-mono font-black text-yellow-300 block">0412-356.50.12 / 0424-814.38.43</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 dark:text-zinc-400">Formato Feed / WhatsApp</span>
                <button
                  type="button"
                  disabled={isGeneratingPng === 'ayudante'}
                  onClick={() => generateAndDownloadPng('ayudante')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Download size={14} />
                  <span>{isGeneratingPng === 'ayudante' ? 'Generando PNG...' : 'Descargar Arte (PNG)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Diagnostico & Guia de Arte */}
      {activeTab === 'diagnostico' && (
        <div className="bg-white dark:bg-[#0f1116] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <FileText className="text-red-600 dark:text-primary" size={18} />
              <span>Diagnostico de Diseno Grafico y Reclutamiento</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
              Existen puntos fuertes en la pieza actual (buen contraste oscuro, uso del rojo de marca y fotos reales de taller), pero tambien oportunidades criticas de mejora tanto en estructura visual como en la atraccion del perfil tecnico idoneo:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-2">
              <h4 className="text-xs font-black uppercase text-red-600 dark:text-primary">1. Jerarquia Visual y Mensaje</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                El aviso original agrupaba &quot;Mecanico Automotriz&quot; y &quot;Ayudante de mecanica&quot;. Para captar a un especialista calificado (diagnostico, diagramas y scanner), el anuncio se percibe demasiado generalista.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-2">
              <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">2. Requisitos Blandos vs Tecnicos</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Requisitos como &quot;ordenado&quot; o &quot;positivo&quot; son generales. Para filtrar desde la imagen se deben explicitar competencias duras: Scanner OBD2, Electronica Automotriz, Osciloscopio y Redes CAN/LIN.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-2">
              <h4 className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">3. Distribucion y Espacio Blanco</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                La informacion de contacto y requisitos estaba apretada en la zona inferior. Priorizar la especialidad y un llamado a la accion (CTA) limpio y visible multiplica las postulaciones de valor.
              </p>
            </div>
          </div>

          {/* Guia de Arte */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Guia de Arte MasterTech (Paleta y Elementos)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10">
                <span className="w-4 h-4 rounded-full bg-[#B30000] inline-block mb-1 shadow-sm" />
                <span className="block font-black text-slate-900 dark:text-white">Rojo MasterTech</span>
                <span className="text-[10px] font-mono text-slate-500">#B30000</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10">
                <span className="w-4 h-4 rounded-full bg-[#0B0C10] inline-block mb-1 border border-white/20 shadow-sm" />
                <span className="block font-black text-slate-900 dark:text-white">Negro Carbon</span>
                <span className="text-[10px] font-mono text-slate-500">#0B0C10</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10">
                <span className="w-4 h-4 rounded-full bg-[#D4AF37] inline-block mb-1 shadow-sm" />
                <span className="block font-black text-slate-900 dark:text-white">Dorado Acento</span>
                <span className="text-[10px] font-mono text-slate-500">#D4AF37</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10">
                <span className="w-4 h-4 rounded-full bg-[#FFFFFF] inline-block mb-1 border border-slate-300 shadow-sm" />
                <span className="block font-black text-slate-900 dark:text-white">Blanco Texto</span>
                <span className="text-[10px] font-mono text-slate-500">#FFFFFF</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-400">
              Consejo Pro de Seleccion: Publicar artes separados permite que el tecnico especialista perciba el alto nivel tecnologico de MasterTech y no descarte la vacante, a la vez que el aspirante a ayudante se postula con total confianza.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Copys para Redes Sociales */}
      {activeTab === 'copy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Copy 1: Tecnico */}
          <div className="bg-white dark:bg-[#0f1116] border border-slate-200 dark:border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div>
                <span className="text-[10px] font-black uppercase text-red-600 dark:text-red-400">Copy Publicitario 1</span>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">Para Tecnico en Diagnostico</h4>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(copyTextTecnico, 'tecnico')}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey === 'tecnico' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedKey === 'tecnico' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <pre className="text-xs font-sans text-slate-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed bg-slate-50 dark:bg-black/40 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
              {copyTextTecnico}
            </pre>
          </div>

          {/* Copy 2: Ayudante */}
          <div className="bg-white dark:bg-[#0f1116] border border-slate-200 dark:border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Copy Publicitario 2</span>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">Para Ayudante de Mecanica</h4>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(copyTextAyudante, 'ayudante')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey === 'ayudante' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedKey === 'ayudante' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <pre className="text-xs font-sans text-slate-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed bg-slate-50 dark:bg-black/40 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
              {copyTextAyudante}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
