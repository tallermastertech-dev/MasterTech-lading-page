import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  ExternalLink, 
  Download, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Search, 
  Car,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

export type BrandKey = 'nissan' | 'toyota' | 'honda';

interface ManualData {
  brand: string;
  brandColor: string;
  badgeBg: string;
  years: string;
  models: string[];
  htmlPath: string;
  consideraciones: {
    title: string;
    description: string;
    fluidoRequerido?: string;
    advertencia?: string;
    puntosClave?: string[];
  }[];
  pautas: {
    km: string;
    subtitulo: string;
    items: {
      titulo: string;
      detalle: string;
      subpuntos?: string[];
    }[];
  }[];
  torques: {
    componente: string;
    especificacion: string;
    torque: string;
  }[];
  libreta: {
    km: string;
    tipo: string;
    detalle: string;
  }[];
}

const MANUALES_DATA: Record<BrandKey, ManualData> = {
  nissan: {
    brand: 'NISSAN',
    brandColor: '#dc2626',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    years: '2021–2027',
    models: ['Versa', 'Sentra', 'Altima', 'Kicks', 'Rogue', 'Murano', 'Pathfinder', 'Frontier', 'Z'],
    htmlPath: '/manuales/manual-tecnico-nissan.html',
    consideraciones: [
      {
        title: 'Sensibilidad Extrema en Cajas CVT Jatco (Xtronic)',
        description: 'Las transmisiones Jatco son las más sensibles a la temperatura y a la calidad del fluido de todo el mercado. Usar un lubricante genérico "multivehículo" o dejar pasar el kilometraje destruye las poleas cónicas y la banda metálica.',
        fluidoRequerido: 'Uso exclusivo de fluido Genuine Nissan NS-3 (de color verde).',
        advertencia: 'Conteo de Deterioro por Escáner: Durante el servicio a la caja CVT, es obligatorio ingresar con escáner para reiniciar el contador de deterioro del fluido CVT (CVT Fluid Deterioration Date).'
      },
      {
        title: 'Motores VC-Turbo (Compresión Variable 1.5T / 2.0T) y GDI Puros',
        description: 'Los modelos Rogue, Altima y Murano modernos usan inyección directa pura sin inyector de puerto. Requieren descarbonización física/química de las válvulas de admisión cada 40.000 km para corregir pérdidas de potencia y fallas de encendido (misfires) provocadas por la recirculación de gases y la gasolina local.',
        advertencia: 'La acumulación severa de carbonilla sin puerto de inyección auxiliar genera detonación prematura y cascabeleo en combustible de bajo octanaje.'
      }
    ],
    pautas: [
      {
        km: '5.000 KM',
        subtitulo: 'Servicio de Resguardo',
        items: [
          {
            titulo: 'Motor',
            detalle: 'Cambio de aceite full sintético API SP / ILSAC GF-6 (viscosidades 0W-20 o 5W-30 según indicación del fabricante) y filtro de aceite original.'
          },
          {
            titulo: 'Escudo Antisalitre y Baterías',
            detalle: 'Limpieza de bornes de batería. En modelos con sistema Auto Start-Stop, si se desconecta o cambia la batería EFB/AGM, es obligatorio el registro del módulo BMS vía escáner.'
          },
          {
            titulo: 'Frenos',
            detalle: 'Desarmado y lubricación de pasadores de caliper con grasa sintética para frenos (PTFE/Cerámica).'
          }
        ]
      },
      {
        km: '10.000 KM',
        subtitulo: 'Fluidos y Neumáticos',
        items: [
          {
            titulo: 'Líquido de Frenos (DOT 3 / DOT 4)',
            detalle: 'Reemplazo anual obligatorio. La humedad del aire marino degrada rápidamente el fluido y oxida el módulo de válvulas del sistema ABS/ESP.'
          },
          {
            titulo: 'Filtro de Aire y Cabina',
            detalle: 'Reemplazar obligatoriamente. Prohibido soplado con aire a presión para no expandir los poros del elemento filtrante.'
          },
          {
            titulo: 'Rotación de Neumáticos',
            detalle: 'Torque estricto en estrella según segmento:',
            subpuntos: [
              'Sedanes y Crossovers (Versa, Sentra, Kicks): 80 lb·ft (108 Nm)',
              'SUVs Grandes / Pickup (Rogue, Pathfinder, Frontier): 98 a 113 lb·ft (133-153 Nm)'
            ]
          }
        ]
      },
      {
        km: '20.000 KM',
        subtitulo: 'Afinación y Diagnóstico de Encendido',
        items: [
          {
            titulo: 'Inspección de Bujías de Iridio',
            detalle: 'Revisión del aislador cerámico. La gasolina local suele dejar depósitos rojizos (contaminación por hierro/plomo). Reemplazar si hay rastro de fugas de corriente a masa.'
          },
          {
            titulo: 'Limpieza de Inyección',
            detalle: 'Tratamiento en tanque con aditivos de alta concentración de PEA para proteger los inyectores de alta presión GDI.'
          }
        ]
      },
      {
        km: '30.000 KM',
        subtitulo: 'Transmisión CVT Xtronic y AWD',
        items: [
          {
            titulo: 'Cajas CVT Jatco (NS-3)',
            detalle: 'Drenaje por gravedad del fluido viejo y llenado con Nissan Genuine NS-3. Reemplazo del filtro de cartucho (ubicado detrás del enfriador de aceite de la caja) y reemplazo del filtro de malla del cárter. Reseteo del contador de degradación de aceite con escáner.'
          },
          {
            titulo: 'Diferencial Trasero y Transfer (AWD / 4x4)',
            detalle: 'Cambio de aceite lubricante de engranajes hipoidales API GL-5 80W-90 o 75W-85.'
          }
        ]
      },
      {
        km: '40.000 KM',
        subtitulo: 'Mantenimiento Mayor GDI / VC-Turbo',
        items: [
          {
            titulo: 'Descarbonización de Válvulas de Admisión',
            detalle: 'Tratamiento por química presurizada o walnut blasting (chorro de esferas de nogal) en los motores VC-Turbo y GDI directos para eliminar la costra de carbón de las válvulas.'
          },
          {
            titulo: 'Filtro de Gasolina (Tanque)',
            detalle: 'Reemplazo del cartucho del módulo sumergido de la bomba para evitar fallas por sobrecalentamiento eléctrico.'
          }
        ]
      },
      {
        km: '50.000 a 60.000 KM',
        subtitulo: 'Transmisiones Automáticas Tradicionales',
        items: [
          {
            titulo: 'Pathfinder / Frontier (Cajas AT de 9 Velocidades)',
            detalle: 'Reemplazo del fluido por gravedad utilizando Nissan Matic-S / Matic-HD.'
          }
        ]
      }
    ],
    torques: [
      { componente: 'Bujías (Motores HR16DE, MR20DD, KR15DDT)', especificacion: 'Rosca Fina Delgado', torque: '10 a 12 lb·ft (14-16 Nm)' },
      { componente: 'Tapón de Cárter de Aceite Motor', especificacion: 'Arandela de aluminio nueva', torque: '25 lb·ft (34 Nm)' },
      { componente: 'Tuercas de Rueda (Versa, Sentra, Kicks)', especificacion: 'Patrón en estrella', torque: '80 lb·ft (108 Nm)' },
      { componente: 'Tuercas de Rueda (Pathfinder, Frontier)', especificacion: 'Patrón en estrella', torque: '100 lb·ft (135 Nm)' },
      { componente: 'Tapón de Drenaje Caja CVT Jatco', especificacion: 'Arandela de cobre/aluminio nueva', torque: '25 lb·ft (34 Nm)' },
      { componente: 'Tapón de Filtro Cartucho CVT', especificacion: 'O-ring nuevo', torque: '18 lb·ft (25 Nm)' }
    ],
    libreta: [
      { km: '5.000 KM', tipo: 'Servicio Resguardo', detalle: 'Aceite Full Sintético + Filtro OEM' },
      { km: '10.000 KM', tipo: 'Fluidos & Neumáticos', detalle: 'Rotación + Liq. Frenos DOT 4' },
      { km: '20.000 KM', tipo: 'Afinación Encendido', detalle: 'Aditivo PEA + Revisión Bujías' },
      { km: '30.000 KM', tipo: 'Transmisión & AWD', detalle: 'Fluido Genuine NS-3 + Filtro CVT' },
      { km: '40.000 KM', tipo: 'Mayor GDI / Turbo', detalle: 'Descarbonización Válvulas GDI' },
      { km: '50.000 KM', tipo: 'Transmisión Mayor', detalle: 'Mantenimiento Caja AT9 (Matic-S)' }
    ]
  },

  toyota: {
    brand: 'TOYOTA',
    brandColor: '#dc2626',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    years: '2021–2027',
    models: ['Yaris Cross', 'Corolla', 'Corolla GR', 'RAV4', 'Camry', 'Highlander', 'Sienna', '4Runner', 'Tacoma', 'Tundra', 'Land Cruiser', 'Sequoia'],
    htmlPath: '/manuales/manual-tecnico-toyota.html',
    consideraciones: [
      {
        title: 'Tecnología de Inyección D-4S (Mixta)',
        description: 'La mayoría de los motores Dynamic Force (Corolla 2.0L, RAV4 2.5L, Tacoma 2.4T/3.5L, Tundra 3.4T V6) emplean inyectores en el puerto de admisión e inyectores directos en el cilindro. La inyección de puerto lava las válvulas automáticamente, reduciendo radicalmente la acumulación de carbón en comparación con la competencia.'
      },
      {
        title: 'Transmisiones CVT Direct Shift (K120) y e-CVT',
        description: 'Poseen un engranaje físico de arranque (Launch Gear) para primera marcha antes de pasar a las poleas y la banda metálica.',
        advertencia: 'Regla de nivelación: No poseen varilla. La medición del nivel de aceite CVT FE o TC se realiza únicamente por reboce a una temperatura controlada de 35°C a 45°C monitoreada mediante escáner en el puerto OBD2.'
      },
      {
        title: 'Aceites de Ultra-Baja Viscosidad (0W-16 / 0W-20)',
        description: 'Los motores Dynamic Force poseen bombas de aceite de desplazamiento variable impulsadas por la computadora. El uso de aceites gruesos (15W-40 o 20W-50) bloquea los actuadores del sistema VVT-iE (eléctrico) y destruye el motor por falta de lubricación en frío. Exigir norma API SP / ILSAC GF-6.'
      }
    ],
    pautas: [
      {
        km: '5.000 KM',
        subtitulo: 'Servicio de Resguardo',
        items: [
          {
            titulo: 'Motor',
            detalle: 'Cambio de aceite full sintético API SP / ILSAC GF-6 (0W-16 o 0W-20 según la tapa de llenado) y filtro de aceite genuino Toyota.'
          },
          {
            titulo: 'Modelos Híbridos (RAV4, Sienna, Highlander, Corolla Cross)',
            detalle: 'Limpieza obligatoria del filtro de la rejilla de enfriamiento de la batería de alto voltaje (ubicado bajo el asiento trasero). Si se tupa de polvo, la batería híbrida se sobrecalienta y se degrada.'
          },
          {
            titulo: 'Frenos y Tren Delantero',
            detalle: 'Engrase de pasadores de mordaza con grasa sintética con base de cerámica o PTFE. Inspección de bujes de suspensión.'
          }
        ]
      },
      {
        km: '10.000 KM',
        subtitulo: 'Fluidos Higroscópicos y Neumáticos',
        items: [
          {
            titulo: 'Líquido de Frenos (DOT 3 / DOT 4)',
            detalle: 'Reemplazo del fluido por tiempo (máximo 12 a 18 meses) evaluando con probador de conductividad (debe marcar menos del 3% de humedad) debido a la humedad costera.'
          },
          {
            titulo: 'Filtros de Aire',
            detalle: 'Reemplazo directo del filtro de aire del motor y de cabina. Prohibido soplar con aire a presión.'
          },
          {
            titulo: 'Rotación y Torque de Ruedas',
            detalle: 'Apriete cruzado en estrella:',
            subpuntos: [
              'Sedanes/Crossovers (Corolla, Yaris Cross): 76 lb·ft (103 Nm)',
              'Camionetas/Rústicos (RAV4, 4Runner, Tacoma, Tundra): 103 lb·ft (140 Nm)'
            ]
          }
        ]
      },
      {
        km: '20.000 KM',
        subtitulo: 'Sistema de Combustible',
        items: [
          {
            titulo: 'Inyección Mixta D-4S',
            detalle: 'Desmontaje y limpieza ultrasónica de los 4 o 6 inyectores de puerto. Reemplazo de O-rings.'
          },
          {
            titulo: 'Inyección Directa y Aditivos',
            detalle: 'Aplicación en tanque de aditivo descarbonizante con tecnología PEA (Poliéter amina) para proteger la bomba de alta presión (HPFP) de los sedimentos locales.'
          }
        ]
      },
      {
        km: '30.000 KM',
        subtitulo: 'Cajas CVT / e-CVT / Tracción 4x4',
        items: [
          {
            titulo: 'Cajas CVT / e-CVT',
            detalle: 'Cambio de fluido Toyota CVT FE (o fluido Toyota e-CVT para híbridos) por gravedad (drain & fill). Cambio de filtro de cárter de cartucho y ajuste de nivel por reboce a 40°C.'
          },
          {
            titulo: 'Diferenciales y Transfer (4x4 / AWD)',
            detalle: 'Reemplazo de aceite en diferencial delantero, trasero y transfer con lubricante API GL-5 75W-85 o 80W-90. En camionetas con diferencial LSD (Tacoma / 4Runner TRD), usar únicamente aceite API GL-5 LS o agregar modificador de fricción.'
          }
        ]
      },
      {
        km: '50.000 a 60.000 KM',
        subtitulo: 'Transmisiones Automáticas Convencionales',
        items: [
          {
            titulo: 'Cajas de 6, 8 y 10 Velocidades (Direct Shift - AT)',
            detalle: 'Reemplazo por gravedad de fluido Toyota ATF WS. Se descarta la diálisis presurizada a máquina para evitar desprendimiento de sedimentos hacia el cuerpo de válvulas.'
          }
        ]
      }
    ],
    torques: [
      { componente: 'Bujías (Rosca Fina Dynamic Force)', especificacion: 'Iridio Largo Alcance', torque: '11 lb·ft (15 Nm)' },
      { componente: 'Bujías (Rosca Tradicional V6 4.0L / 2.7L)', especificacion: 'Iridio / Platino', torque: '13 a 15 lb·ft (18-20 Nm)' },
      { componente: 'Tapón de Cárter de Aceite', especificacion: 'Arandela de aplastamiento nueva', torque: '27 lb·ft (37 Nm)' },
      { componente: 'Tuercas de Rueda (M12 - Autos)', especificacion: 'Apriete en estrella', torque: '76 lb·ft (103 Nm)' },
      { componente: 'Tuercas de Rueda (M14 - Camionetas)', especificacion: 'Apriete en estrella', torque: '103 lb·ft (140 Nm)' },
      { componente: 'Tapón Drenaje / Reboce Caja CVT', especificacion: 'Toyota Genuine CVT FE / TC', torque: '30 lb·ft (40 Nm)' }
    ],
    libreta: [
      { km: '5.000 KM', tipo: 'Servicio Resguardo', detalle: 'Aceite 0W-16/0W-20 API SP + Filtro OEM' },
      { km: '10.000 KM', tipo: 'Fluidos & Neumáticos', detalle: 'Rotación + Liq. Frenos DOT 4' },
      { km: '20.000 KM', tipo: 'Combustible D-4S', detalle: 'Limpieza Inyectores D-4S / PEA' },
      { km: '30.000 KM', tipo: 'Transmisión & 4x4', detalle: 'Mantenimiento CVT FE / Drivetrain' },
      { km: '40.000 KM', tipo: 'Módulo Gasolina', detalle: 'Filtro de Gasolina Módulo Tanque' },
      { km: '50.000 KM', tipo: 'Transmisión AT', detalle: 'Aceite Toyota ATF WS (Cajas AT8/10)' }
    ]
  },

  honda: {
    brand: 'HONDA',
    brandColor: '#dc2626',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    years: '2021–2027',
    models: ['Civic', 'City', 'HR-V', 'CR-V', 'Accord', 'Pilot', 'Passport', 'Odyssey'],
    htmlPath: '/manuales/manual-tecnico-honda.html',
    consideraciones: [
      {
        title: 'Fenómeno LSPI y Dilución de Combustible en Motores Turbo (1.5T / 2.0T Earth Dreams)',
        description: 'Los motores inyectados directamente con turbocompresor sufren un alto riesgo de LSPI (Preignición a Baja Velocidad) impulsado por la gasolina de bajo octanaje.',
        advertencia: 'Es estrictamente obligatorio utilizar aceites con especificación API SP / ILSAC GF-6 en viscosidades 0W-20 o 5W-30.'
      },
      {
        title: 'Transmisiones CVT Earth Dreams y AT de 10 Velocidades',
        description: 'Requisitos específicos de fluidos según tipo de transmisión:',
        puntosClave: [
          'Transmisiones CVT: Utilizan exclusivamente el fluido Honda Genuine HCF-2. Prohibido utilizar el fluido Honda DW-1 de generaciones anteriores en cajas CVT. Poseen perno de reboce para la nivelación de fluido a temperatura especificada.',
          'Cajas Automáticas de 10 Velocidades (Accord 2.0T, Pilot): Requieren el fluido específico Honda ATF 2.0.'
        ]
      },
      {
        title: 'Mantenimiento del Sistema de Turboalimentación',
        description: 'La pausa de 1 minuto en ralentí antes de apagar el motor aplica únicamente tras trayectos a alta velocidad o pendientes exigentes. En tráfico urbano común, los sistemas de enfriamiento auxiliares de Honda protegen el turbo de forma pasiva.'
      }
    ],
    pautas: [
      {
        km: '5.000 KM',
        subtitulo: 'Servicio de Resguardo Base',
        items: [
          {
            titulo: 'Motor (L15B7 / L15CA / K20C)',
            detalle: 'Cambio de aceite full sintético API SP / ILSAC GF-6 (0W-20 o 5W-30) y filtro de aceite genuino Honda.'
          },
          {
            titulo: 'Revisión de Admisión',
            detalle: 'Inspección del ducto de carga del turbo en búsqueda de vapores de aceite no deseados procedente de la válvula PCV.'
          },
          {
            titulo: 'Escudo Antisalitre y Frenos',
            detalle: 'Lubricación de pasadores de calipers de freno con grasa sintética libre de petróleo (base cerámica/PTFE). Limpieza y protección dieléctrica de bornes de batería.'
          }
        ]
      },
      {
        km: '10.000 KM',
        subtitulo: 'Sistemas de Seguridad y Cabina',
        items: [
          {
            titulo: 'Renovación del Líquido de Frenos (DOT 3 / DOT 4)',
            detalle: 'Reemplazo del fluido por purga completa cada 12 a 18 meses. La alta humedad ambiental genera pedal esponjoso y corroe internamente la unidad del control de estabilidad (VSA).'
          },
          {
            titulo: 'Reemplazo de Filtros',
            detalle: 'Filtro de aire de motor y filtro de polen de cabina.'
          },
          {
            titulo: 'Rotación y Alineación',
            detalle: 'Balanceo y rotación en patrón cruzado:',
            subpuntos: [
              'Sedanes/Crossovers (Civic, City, HR-V): 80 lb·ft (108 Nm)',
              'SUVs/Minivans (CR-V, Pilot, Passport, Odyssey): 94 lb·ft (127 Nm)'
            ]
          }
        ]
      },
      {
        km: '20.000 KM',
        subtitulo: 'Sistema de Inyección GDI',
        items: [
          {
            titulo: 'Aditivo Descarbonizante de Inyección Directa',
            detalle: 'Limpieza preventiva de inyectores de alta presión en el vehículo mediante químicos descarbonizantes formulados con PEA agregados al tanque.'
          },
          {
            titulo: 'Calibración / Inspección de Bujías',
            detalle: 'Los motores Honda Turbo degradan las bujías de forma más acelerada con gasolina de bajo octanaje. Inspección de aisladores cerámicos.'
          }
        ]
      },
      {
        km: '30.000 KM',
        subtitulo: 'Transmisiones CVT / Real Time AWD',
        items: [
          {
            titulo: 'Transmisiones CVT Earth Dreams',
            detalle: 'Reemplazo del fluido Honda Genuine HCF-2 por gravedad (drain & fill). Reemplazo del filtro tipo cartucho externo y limpieza de imanes de cárter.'
          },
          {
            titulo: 'Sistema Real Time AWD (CR-V / HR-V / Pilot)',
            detalle: 'Reemplazo del fluido del diferencial trasero utilizando exclusivamente el fluido genuino Honda Dual Pump Fluid II (DPF-II). Usar aceite estándar GL-5 destruye los embragues hidráulicos traseros.'
          }
        ]
      },
      {
        km: '40.000 KM',
        subtitulo: 'Descarbonización Válvulas y Módulo de Gasolina',
        items: [
          {
            titulo: 'Descarbonización de Válvulas de Admisión (GDI Pura)',
            detalle: 'Limpieza física mediante walnut blasting o químicos presurizados para remover las costras de carbón seco acumuladas en las válvulas de admisión de los motores 1.5T y 2.0L.'
          },
          {
            titulo: 'Filtro de Gasolina (Tanque)',
            detalle: 'Cambio del filtro sumergido del módulo de la bomba de combustible.'
          }
        ]
      },
      {
        km: '45.000 a 50.000 KM',
        subtitulo: 'Cajas Automáticas de 10 Velocidades',
        items: [
          {
            titulo: 'Caja Automática Honda AT10 (Pilot / Accord 2.0T)',
            detalle: 'Cambio por gravedad del fluido genuino Honda ATF 2.0.'
          }
        ]
      }
    ],
    torques: [
      { componente: 'Bujías (Motor 1.5T / 2.0T Earth Dreams)', especificacion: 'Rosca Fina Delgado', torque: '12 lb·ft (16 Nm)' },
      { componente: 'Bujías (Motores 2.0L N/A / V6 3.5L)', especificacion: 'Iridio Largo Alcance', torque: '13 a 16 lb·ft (18-22 Nm)' },
      { componente: 'Tapón de Cárter de Aceite', especificacion: 'Arandela de deformación nueva', torque: '29 lb·ft (39 Nm)' },
      { componente: 'Tuercas de Rueda (Civic, City, HR-V)', especificacion: 'Patrón en estrella', torque: '80 lb·ft (108 Nm)' },
      { componente: 'Tuercas de Rueda (CR-V, Pilot, Odyssey)', especificacion: 'Patrón en estrella', torque: '94 lb·ft (127 Nm)' },
      { componente: 'Tapón de Drenaje Caja CVT Honda', especificacion: 'Usar arandela de aluminio nueva', torque: '36 lb·ft (49 Nm)' },
      { componente: 'Perno de Llenado / Nivel de Caja CVT', especificacion: 'Perno con arandela', torque: '33 lb·ft (44 Nm)' }
    ],
    libreta: [
      { km: '5.000 KM', tipo: 'Servicio Resguardo', detalle: 'Aceite 0W-20 API SP + Filtro OEM' },
      { km: '10.000 KM', tipo: 'Seguridad & Cabina', detalle: 'Rotación + Liq. Frenos DOT 4' },
      { km: '20.000 KM', tipo: 'Inyección GDI', detalle: 'Aditivo PEA + Inspección Bujías' },
      { km: '30.000 KM', tipo: 'Transmisión & AWD', detalle: 'Fluido Genuine HCF-2 / DPF-II AWD' },
      { km: '40.000 KM', tipo: 'Mayor Válvulas', detalle: 'Descarbonización Válvulas GDI' },
      { km: '45.000 KM', tipo: 'Transmisión AT10', detalle: 'Aceite Honda ATF 2.0 (Caja AT10)' }
    ]
  }
};

export default function ManualesTecnicosPanel() {
  const [selectedBrand, setSelectedBrand] = useState<BrandKey>('nissan');
  const [activeChapter, setActiveChapter] = useState<'cap1' | 'cap2' | 'cap3' | 'libreta'>('cap1');
  const [copiedTorque, setCopiedTorque] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentManual = MANUALES_DATA[selectedBrand];

  const handleCopyTorque = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedTorque(id);
      setTimeout(() => setCopiedTorque(null), 1800);
    } catch (e) {}
  };

  const handlePrintManual = (brandKey: BrandKey) => {
    const url = MANUALES_DATA[brandKey].htmlPath;
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        setTimeout(() => printWindow.print(), 300);
      };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12161f] via-[#0d1117] to-[#080a0e] border border-red-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-40 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] tracking-widest uppercase">
              <ShieldCheck size={13} className="text-red-400" />
              <span>BIBLIOTECA TÉCNICA OFICIAL MASTERTECH</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
              Manuales de Mantenimiento <span className="text-red-500 italic">OEM</span>
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Pautas técnicas de servicio adaptadas a las condiciones severas y costeras de Venezuela (2021–2027). Información íntegra de fábrica con el diseño y certificación técnica de Taller MasterTech.
            </p>
          </div>

          {/* Quick Action Buttons for Current Brand */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handlePrintManual(selectedBrand)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer size={15} />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <a
              href={currentManual.htmlPath}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 hover:text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <ExternalLink size={15} />
              <span>Abrir Manual Completo</span>
            </a>
          </div>
        </div>

        {/* Brand Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10">
          {(Object.keys(MANUALES_DATA) as BrandKey[]).map((key) => {
            const m = MANUALES_DATA[key];
            const isSelected = selectedBrand === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedBrand(key)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-red-500/15 via-red-500/5 to-transparent border-red-500/50 shadow-lg shadow-red-500/10'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-base font-black tracking-wider uppercase ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {m.brand}
                  </span>
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-md font-bold ${
                    isSelected ? 'bg-red-500 text-white' : 'bg-white/10 text-zinc-400'
                  }`}>
                    {m.years}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-1">
                  {m.models.slice(0, 5).join(', ')}...
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-bold">
                  <span className={isSelected ? 'text-red-400' : 'text-zinc-500'}>
                    {m.torques.length} torques • {m.pautas.length} pautas
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    Ver manual <ChevronRight size={12} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Viewer Container */}
      <div className="rounded-2xl bg-[#0f1218] border border-white/10 shadow-xl overflow-hidden">
        
        {/* Sub-navigation tabs: Chapters */}
        <div className="px-6 py-3 bg-[#151922] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveChapter('cap1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeChapter === 'cap1'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Capítulo 1: Consideraciones VE
            </button>
            <button
              onClick={() => setActiveChapter('cap2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeChapter === 'cap2'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Capítulo 2: Pautas por KM
            </button>
            <button
              onClick={() => setActiveChapter('cap3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeChapter === 'cap3'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Capítulo 3: Torques Oficiales
            </button>
            <button
              onClick={() => setActiveChapter('libreta')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeChapter === 'libreta'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Libreta de Servicios
            </button>
          </div>

          <div className="text-xs font-bold text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{currentManual.brand} ({currentManual.years})</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">

          {/* Applicable Models Tag Box */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Car size={16} className="text-red-400 shrink-0" />
              <span><strong>Modelos aplicables:</strong> {currentManual.models.join(', ')}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono uppercase shrink-0 font-bold">
              <span>CONDICIONES SEVERAS / ZONAS COSTERAS</span>
            </div>
          </div>

          {/* CHAPTER 1 */}
          {activeChapter === 'cap1' && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-l-4 border-red-500 pl-3">
                <h3 className="text-base font-black uppercase text-white tracking-wide">
                  Capítulo 1: Consideraciones Técnicas {currentManual.brand} en Venezuela
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Protocolos mecánicos obligatorios para mitigar el efecto de gasolina local, salitre y temperaturas extremas.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2">
                {currentManual.consideraciones.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3 relative overflow-hidden">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>{item.title}</span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>

                    {item.puntosClave && (
                      <ul className="space-y-1.5 pl-4 text-xs text-zinc-300">
                        {item.puntosClave.map((pk, pidx) => (
                          <li key={pidx} className="list-disc leading-relaxed">{pk}</li>
                        ))}
                      </ul>
                    )}

                    {item.fluidoRequerido && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-semibold flex items-center gap-2">
                        <Info size={15} className="shrink-0 text-red-400" />
                        <span><strong>Fluido Requerido:</strong> {item.fluidoRequerido}</span>
                      </div>
                    )}

                    {item.advertencia && (
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-semibold flex items-start gap-2">
                        <AlertTriangle size={15} className="shrink-0 text-amber-400 mt-0.5" />
                        <span><strong>Aviso Crítico:</strong> {item.advertencia}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHAPTER 2 */}
          {activeChapter === 'cap2' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-l-4 border-red-500 pl-3">
                <h3 className="text-base font-black uppercase text-white tracking-wide">
                  Capítulo 2: Pauta de Mantenimiento {currentManual.brand} por Kilometraje
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Intervalos preventivos calculados para condiciones severas y clima tropical costero.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {currentManual.pautas.map((pauta, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-red-300 font-black text-xs font-mono">
                        <Clock size={13} />
                        <span>{pauta.km}</span>
                      </div>
                      <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                        {pauta.subtitulo}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {pauta.items.map((it, iidx) => (
                        <div key={iidx} className="p-3.5 rounded-lg bg-white/5 border border-white/5 space-y-1.5">
                          <span className="text-xs font-bold text-white block">
                            • {it.titulo}
                          </span>
                          <p className="text-[11px] text-zinc-400 leading-relaxed">
                            {it.detalle}
                          </p>
                          {it.subpuntos && (
                            <ul className="pl-4 space-y-1 text-[11px] text-zinc-400 pt-1">
                              {it.subpuntos.map((sp, spidx) => (
                                <li key={spidx} className="list-disc">{sp}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHAPTER 3 */}
          {activeChapter === 'cap3' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-red-500 pl-3">
                <div>
                  <h3 className="text-base font-black uppercase text-white tracking-wide">
                    Capítulo 3: Tabla de Torques Específicos {currentManual.brand}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Especificaciones para llave dinamométrica calibrada y arandelas de reemplazo obligatorio.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-black/60 border-b border-white/10 text-zinc-400 font-mono uppercase text-[10px]">
                      <th className="py-3 px-4 font-extrabold">Componente</th>
                      <th className="py-3 px-4 font-extrabold">Especificación Técnica / Fluido</th>
                      <th className="py-3 px-4 font-extrabold text-right">Torque de Ajuste</th>
                      <th className="py-3 px-4 font-extrabold text-center w-16">Copiar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {currentManual.torques.map((t, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{t.componente}</td>
                        <td className="py-3 px-4 text-zinc-300">{t.especificacion}</td>
                        <td className="py-3 px-4 text-right font-mono font-black text-red-400">{t.torque}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleCopyTorque(`${t.componente}: ${t.torque}`, `t-${idx}`)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Copiar torque"
                          >
                            {copiedTorque === `t-${idx}` ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LIBRETA DE SERVICIOS */}
          {activeChapter === 'libreta' && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-l-4 border-red-500 pl-3">
                <h3 className="text-base font-black uppercase text-white tracking-wide">
                  Libreta Oficial de Control de Servicios MasterTech
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Planilla imprimible para registrar intervenciones con fecha, kilometraje, firmas y sello oficial del taller.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/40 border-2 border-dashed border-zinc-700 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-zinc-500 font-bold block text-[10px] uppercase">Propietario</span>
                    <span className="text-zinc-300 font-semibold">Cliente Registrado</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-zinc-500 font-bold block text-[10px] uppercase">Teléfono</span>
                    <span className="text-zinc-300 font-semibold">+58 (WhatsApp)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-zinc-500 font-bold block text-[10px] uppercase">Vehículo / Modelo</span>
                    <span className="text-zinc-300 font-semibold">{currentManual.brand}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-zinc-500 font-bold block text-[10px] uppercase">VIN / Serial Carrocería</span>
                    <span className="text-zinc-300 font-mono">17 Caracteres</span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-black/60 border-b border-white/10 text-zinc-400 font-mono uppercase text-[10px]">
                        <th className="py-2.5 px-3">Fecha</th>
                        <th className="py-2.5 px-3">KM</th>
                        <th className="py-2.5 px-3">Tipo de Servicio</th>
                        <th className="py-2.5 px-3">Detalle de Fluidos / Repuestos</th>
                        <th className="py-2.5 px-3 text-center">Firma / Sello</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                      {currentManual.libreta.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="py-3 px-3 text-zinc-500">___/___/______</td>
                          <td className="py-3 px-3 font-bold text-white">{row.km}</td>
                          <td className="py-3 px-3 text-zinc-300 font-sans">{row.tipo}</td>
                          <td className="py-3 px-3 text-zinc-400 font-sans">{row.detalle}</td>
                          <td className="py-3 px-3 text-center text-zinc-600 font-sans">
                            <span className="px-2 py-1 rounded border border-dashed border-zinc-700 text-[10px]">
                              Sello Técnico
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handlePrintManual(selectedBrand)}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Printer size={14} />
                    <span>Imprimir Planilla para Entregar al Cliente</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
