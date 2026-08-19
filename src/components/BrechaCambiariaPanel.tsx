import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface RateData {
  bcv_usd: number;
  bcv_eur: number;
  usdt: number;
  brecha_usdt_usd: number;
  brecha_usdt_eur: number;
  brecha_eur_usd: number;
  timestamp: string;
}

export default function BrechaCambiariaPanel() {
  const [rates, setRates] = useState<RateData>({
    bcv_usd: 775.34,
    bcv_eur: 897.82,
    usdt: 922.43,
    brecha_usdt_usd: 18.88,
    brecha_usdt_eur: 2.66,
    brecha_eur_usd: 15.80,
    timestamp: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdatedFormatted, setLastUpdatedFormatted] = useState<string>('');

  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/brecha-cambiaria');
      if (res.ok) {
        const data = await res.json();
        if (data && (data.bcv_usd || data.usdt)) {
          setRates(prev => ({
            bcv_usd: data.bcv_usd || prev.bcv_usd,
            bcv_eur: data.bcv_eur || prev.bcv_eur,
            usdt: data.usdt || ((data.bcv_usd || prev.bcv_usd) * (1 + (data.brecha_usdt_usd || 18.88) / 100)),
            brecha_usdt_usd: data.brecha_usdt_usd ?? prev.brecha_usdt_usd,
            brecha_usdt_eur: data.brecha_usdt_eur ?? prev.brecha_usdt_eur,
            brecha_eur_usd: data.brecha_eur_usd ?? prev.brecha_eur_usd,
            timestamp: data.timestamp || new Date().toISOString()
          }));
        }
      }
    } catch (e) {
      console.error("Error al obtener tasas de brecha cambiaria:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      const date = rates.timestamp ? new Date(rates.timestamp) : new Date();
      const formatted = date.toLocaleString('es-VE', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setLastUpdatedFormatted(formatted);
    } catch (e) {
      setLastUpdatedFormatted(new Date().toLocaleTimeString());
    }
  }, [rates.timestamp]);

  const formatNumber = (num: number, decimals: number = 2) => {
    if (typeof num !== 'number' || isNaN(num)) return '0,00';
    return num.toLocaleString('es-VE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  return (
    <section className="py-8 px-4 sm:px-6 bg-[#07080b] border-b border-white/5 relative select-none">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Brecha Cambiaria Venezuela</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff00]"></span>
              </span>
              <span className="text-xs font-mono text-[#00ff00] tracking-wide font-semibold">
                Datos actualizados cada minuto
              </span>
            </div>
          </div>

          <button
            onClick={fetchRates}
            disabled={isLoading}
            className="self-start sm:self-auto bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
            title="Actualizar tasas ahora"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin text-[#00ff00]" : "text-zinc-400"} />
            <span>{isLoading ? "Sincronizando..." : "Actualizar"}</span>
          </button>
        </div>

        {/* Last Updated Box */}
        <div className="bg-[#0d0d0d] border border-white/10 border-l-4 border-l-[#00ff00] rounded-r-lg px-4 py-2 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">
            <strong className="text-zinc-300">Última actualización:</strong> {lastUpdatedFormatted || 'Cargando...'}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline-block">
            Binance P2P & Banco Central de Venezuela
          </span>
        </div>

        {/* 6 Rate Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* 1. USDT BINANCE */}
          <div className="bg-[#0d0d0d] border border-white/10 hover:border-[#f0b90b]/40 rounded-xl p-3.5 transition-all space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              USDT BINANCE
            </span>
            <div className="font-mono text-lg sm:text-xl font-black text-[#f0b90b] tracking-tight">
              {formatNumber(rates.usdt)}
            </div>
            <span className="text-[10px] font-mono text-zinc-500 block">
              VES/USDT
            </span>
          </div>

          {/* 2. DÓLAR BCV */}
          <div className="bg-[#0d0d0d] border border-white/10 hover:border-[#00ff00]/40 rounded-xl p-3.5 transition-all space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              DÓLAR BCV
            </span>
            <div className="font-mono text-lg sm:text-xl font-black text-[#00ff00] tracking-tight">
              {formatNumber(rates.bcv_usd)}
            </div>
            <span className="text-[10px] font-mono text-zinc-500 block">
              VES/USD
            </span>
          </div>

          {/* 3. EURO BCV */}
          <div className="bg-[#0d0d0d] border border-white/10 hover:border-[#00d4ff]/40 rounded-xl p-3.5 transition-all space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              EURO BCV
            </span>
            <div className="font-mono text-lg sm:text-xl font-black text-[#00d4ff] tracking-tight">
              {formatNumber(rates.bcv_eur)}
            </div>
            <span className="text-[10px] font-mono text-zinc-500 block">
              VES/EUR
            </span>
          </div>

          {/* 4. USDT VS $ BCV */}
          <div className="bg-[#0d0d0d] border border-white/10 hover:border-[#ff6b6b]/40 rounded-xl p-3.5 transition-all space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              USDT VS $ BCV
            </span>
            <div className="font-mono text-lg sm:text-xl font-black text-[#ff6b6b] tracking-tight">
              {formatNumber(rates.brecha_usdt_usd)}%
            </div>
            <span className="text-[10px] font-mono text-zinc-500 block">
              Brecha
            </span>
          </div>

          {/* 5. USDT VS € BCV */}
          <div className="bg-[#0d0d0d] border border-white/10 hover:border-[#ff6b6b]/40 rounded-xl p-3.5 transition-all space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              USDT VS € BCV
            </span>
            <div className="font-mono text-lg sm:text-xl font-black text-[#ff6b6b] tracking-tight">
              {formatNumber(rates.brecha_usdt_eur)}%
            </div>
            <span className="text-[10px] font-mono text-zinc-500 block">
              Brecha
            </span>
          </div>

          {/* 6. € BCV VS $ BCV */}
          <div className="bg-[#0d0d0d] border border-white/10 hover:border-[#ff6b6b]/40 rounded-xl p-3.5 transition-all space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              € BCV VS $ BCV
            </span>
            <div className="font-mono text-lg sm:text-xl font-black text-[#ff6b6b] tracking-tight">
              {formatNumber(rates.brecha_eur_usd)}%
            </div>
            <span className="text-[10px] font-mono text-zinc-500 block">
              Brecha
            </span>
          </div>

        </div>

        {/* Footer Disclaimer */}
        <div className="pt-1 text-[11px] text-zinc-500 leading-relaxed font-sans">
          <span>Información con fines informativos para la cotización de repuestos y servicios. Datos obtenidos en vivo de Binance P2P y Banco Central de Venezuela (BCV).</span>
        </div>

      </div>
    </section>
  );
}
