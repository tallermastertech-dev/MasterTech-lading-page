import React, { useState, useCallback, useId, useRef } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../cropImage';
import { Upload, X, Check, Image as ImageIcon, Crop, Trash2, Camera } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (base64OrUrl: string) => void;
  aspectRatio?: number;
  placeholder?: string;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  aspectRatio = 4 / 3,
  placeholder
}: ImageUploaderProps) {
  const instanceId = useId();
  const cleanId = instanceId.replace(/[^a-zA-Z0-9]/g, '');
  const fieldId = `uploader-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${cleanId}`;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP, etc.)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result?.toString() || null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setIsModalOpen(true);
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

  const handleSaveCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, aspectRatio);
      onChange(croppedImage);
      setIsModalOpen(false);
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
                  onClick={() => {
                    setImageSrc(value);
                    setCrop({ x: 0, y: 0 });
                    setZoom(1);
                    setIsModalOpen(true);
                  }}
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
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>

      {/* Cropper Modal */}
      {isModalOpen && imageSrc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-sans">
          <div className="max-w-3xl w-full bg-[#12141a] border border-white/15 rounded-3xl p-6 shadow-2xl relative flex flex-col h-[80vh]">
            
            <div className="flex justify-between items-center mb-6 shrink-0 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span>Ajustar y Recortar:</span> <span className="text-red-600">{label}</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Mueve y ajusta el zoom para encuadrar la imagen a la proporción requerida.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 relative bg-black/60 rounded-2xl overflow-hidden mb-6 border border-white/10">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
              <div className="flex-1 flex items-center gap-3">
                <label htmlFor={`${fieldId}-zoom`} className="text-xs font-black text-zinc-400 uppercase tracking-widest shrink-0">
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
                <span className="text-xs font-mono font-bold text-white w-10 text-right">
                  {zoom.toFixed(1)}x
                </span>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSaveCrop}
                  className="btn-primary !px-6 !py-2.5 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/30 border-none"
                >
                  {isProcessing ? 'Procesando...' : <Check size={16} />}
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
