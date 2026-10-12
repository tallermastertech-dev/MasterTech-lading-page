import React, { useState, useCallback, useId, useRef } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg, { getOptimizedFullImg } from '../cropImage';
import { Upload, X, Check, Image as ImageIcon, Crop, Trash2, Camera, Maximize2, RotateCcw } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (base64OrUrl: string) => void;
  aspectRatio?: number;
  placeholder?: string;
  folder?: string;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  aspectRatio = 4 / 3,
  placeholder,
  folder = 'contenido'
}: ImageUploaderProps) {
  const instanceId = useId();
  const cleanId = instanceId.replace(/[^a-zA-Z0-9]/g, '');
  const fieldId = `uploader-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${cleanId}`;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Modo de relación de aspecto: 'free' (libre/personalizado), 'preset' (número) o undefined (react-easy-crop permite aspecto libre pasando undefined)
  const [currentAspect, setCurrentAspect] = useState<number | undefined>(undefined);
  const [activeAspectKey, setActiveAspectKey] = useState<string>('free');

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const processFile = (file: File) => {
    const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                   file.name.toLowerCase().endsWith('.heif') || 
                   file.type.includes('heic') || 
                   file.type.includes('heif');

    if (!file.type.startsWith('image/') && !isHeic) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP, HEIC, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const rawData = reader.result?.toString() || null;
      if (!rawData) return;

      if (isHeic) {
        setIsProcessing(true);
        try {
          const res = await fetch('/api/convert-heic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: rawData })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.dataUrl) {
              openCropModal(data.dataUrl);
              setIsProcessing(false);
              return;
            }
          }
        } catch (e) {
          console.warn('Fallo conversión HEIC en servidor, usando original:', e);
        } finally {
          setIsProcessing(false);
        }
      }

      openCropModal(rawData);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Helper to open modal with initial aspect configuration
  const openCropModal = (src: string) => {
    setImageSrc(src);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    // Por defecto iniciar en modo Libre / Completo para permitir manipular el tamaño como se desee
    setCurrentAspect(undefined);
    setActiveAspectKey('free');
    setIsModalOpen(true);
  };

  const syncToCloud = async (base64OrWebp: string) => {
    try {
      const cleanName = label.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30) || 'media';
      const res = await fetch('/api/upload-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64OrWebp,
          folder: folder || 'contenido',
          filename: `${cleanName}.webp`
        })
      });
      const data = await res.json();
      if (data && data.success && data.url) {
        onChange(data.url);
      }
    } catch (uploadErr) {
      console.warn('Almacenamiento en nube en segundo plano:', uploadErr);
    }
  };

  const handleUseFullImage = async () => {
    if (!imageSrc) return;
    try {
      setIsProcessing(true);
      // Usar imagen completa sin recortar, optimizada a WebP
      const fullOptimized = await getOptimizedFullImg(imageSrc, 1600, 0.85);
      onChange(fullOptimized);
      setIsModalOpen(false);
      await syncToCloud(fullOptimized);
    } catch (e) {
      console.error(e);
      // Fallback a usar la imagen original si algo falla
      onChange(imageSrc);
      setIsModalOpen(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const effectiveAspect = currentAspect || (croppedAreaPixels.width / croppedAreaPixels.height);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, effectiveAspect);
      // Immediate local preview so UI updates without lag
      onChange(croppedImage);
      setIsModalOpen(false);
      await syncToCloud(croppedImage);
    } catch (e) {
      console.error(e);
      alert('Error al procesar la imagen');
    } finally {
      setIsProcessing(false);
    }
  };

  const isDataImage = value?.startsWith('data:image');

  return (
    <div className="space-y-2">
      {/* Label and Clear action */}
      <div className="flex items-center justify-between">
        <label htmlFor={fieldId} className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[10px] font-bold text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
            title="Quitar foto"
          >
            <Trash2 size={11} />
            <span>Quitar</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`p-3 rounded-2xl border transition-all ${
          isDragging
            ? 'bg-red-950/30 border-red-500 ring-2 ring-red-500/40'
            : 'bg-black/40 border-white/10 hover:border-white/20'
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Thumbnail preview with hover camera icon */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center overflow-hidden shrink-0 cursor-pointer group shadow-inner"
            title="Haz clic para seleccionar una foto de tu dispositivo"
          >
            {value ? (
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <ImageIcon className="w-7 h-7 text-zinc-600 group-hover:text-red-500 transition-colors" />
            )}
            
            {/* Hover overlay with Camera icon */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
              <Camera size={16} className="text-red-500 mb-0.5" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Cambiar</span>
            </div>
          </div>

          {/* Controls & Inputs */}
          <div className="flex-1 min-w-0 space-y-2 w-full">
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/25 cursor-pointer transition-all active:scale-95"
              >
                <Upload size={14} />
                <span>{value ? 'Cambiar Foto' : 'Subir Foto'}</span>
              </button>

              {value && (
                <button
                  type="button"
                  onClick={() => openCropModal(value)}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border border-white/15 cursor-pointer transition-colors"
                >
                  <Crop size={13} className="text-red-400" />
                  <span>Ajustar / Recortar</span>
                </button>
              )}

              <span className="text-[11px] text-zinc-500 hidden md:inline">
                o arrastra una imagen aquí
              </span>
            </div>

            {/* URL or Status Input */}
            <div className="relative">
              <input
                id={fieldId}
                name={fieldId}
                type="text"
                value={isDataImage ? '[Imagen cargada desde tu dispositivo]' : value || ''}
                onChange={(e) => {
                  if (!isDataImage) {
                    onChange(e.target.value);
                  }
                }}
                readOnly={isDataImage}
                placeholder={placeholder || "Pega la URL de una imagen o escribe /assets/..."}
                className={`w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-red-500 transition-all font-mono ${
                  isDataImage ? 'text-emerald-400 font-sans cursor-default' : ''
                }`}
              />
              {isDataImage && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-400 p-1 cursor-pointer"
                  title="Eliminar imagen cargada"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hidden Native File Input */}
        <input 
          ref={fileInputRef}
          id={`${fieldId}-file`}
          name={`${fieldId}-file`}
          type="file" 
          accept="image/*,.heic,.heif,.HEIC,.HEIF" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>

      {/* Cropper Modal */}
      {isModalOpen && imageSrc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md font-sans">
          <div className="max-w-4xl w-full bg-[#12141a] border border-white/15 rounded-3xl p-4 sm:p-6 shadow-2xl relative flex flex-col h-[90vh] max-h-[860px]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-3 shrink-0 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-display font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span>Ajustar Imagen:</span> <span className="text-red-500">{label}</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
                  Puedes elegir relación horizontal, vertical, cuadrada, libre o usar la foto completa original sin recorte.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Selector de Proporciones (Libre, Cuadrado, Verticales, Horizontales) */}
            <div className="mb-3 shrink-0 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mr-1 shrink-0">
                Formato:
              </span>

              {[
                { key: 'free', label: 'Libre / Libre Tamaño', aspect: undefined, desc: 'Arrastra y ajusta cualquier tamaño' },
                { key: '1:1', label: '1:1 Cuadrado', aspect: 1, desc: 'Cuadrada' },
                { key: '4:3', label: '4:3 Estándar', aspect: 4 / 3, desc: 'Horizontal clásica' },
                { key: '16:9', label: '16:9 Panorámica', aspect: 16 / 9, desc: 'Horizontal ancha' },
                { key: '3:4', label: '3:4 Vertical', aspect: 3 / 4, desc: 'Retrato vertical' },
                { key: '9:16', label: '9:16 Vertical Móvil', aspect: 9 / 16, desc: 'Vertical estilo historia/reel' }
              ].map((fmt) => {
                const isActive = activeAspectKey === fmt.key;
                return (
                  <button
                    key={fmt.key}
                    type="button"
                    onClick={() => {
                      setActiveAspectKey(fmt.key);
                      setCurrentAspect(fmt.aspect);
                    }}
                    title={fmt.desc}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer flex items-center gap-1 border ${
                      isActive
                        ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
                    }`}
                  >
                    <span>{fmt.label}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                }}
                className="ml-auto px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                title="Centrar y reiniciar encuadre"
              >
                <RotateCcw size={11} />
                <span>Centrar</span>
              </button>
            </div>

            {/* Cropper Viewport */}
            <div className="flex-1 relative bg-black/80 rounded-2xl overflow-hidden mb-3 border border-white/10">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={currentAspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            {/* Bottom Controls Bar */}
            <div className="shrink-0 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-black/50 p-3 sm:p-4 rounded-2xl border border-white/10">
              {/* Zoom control */}
              <div className="flex items-center gap-3 w-full md:max-w-xs">
                <label htmlFor={`${fieldId}-zoom`} className="text-[10px] font-black text-zinc-400 uppercase tracking-widest shrink-0">
                  Zoom:
                </label>
                <input
                  id={`${fieldId}-zoom`}
                  name={`${fieldId}-zoom`}
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.05}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-white w-9 text-right shrink-0">
                  {zoom.toFixed(1)}x
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-white/10"
                >
                  Cancelar
                </button>

                {/* Usar Imagen Completa (sin ningún recorte) */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleUseFullImage}
                  title="Usar la imagen completa original (vertical u horizontal) sin recortar nada"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border border-white/15 shadow-md"
                >
                  <Maximize2 size={14} className="text-emerald-400" />
                  <span>Usar Imagen Completa</span>
                </button>

                {/* Guardar el recorte actual */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSaveCrop}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/30 transition-all border-none"
                >
                  {isProcessing ? 'Procesando...' : <Check size={15} />}
                  <span>Guardar Recorte</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
