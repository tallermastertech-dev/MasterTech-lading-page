import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  ExternalLink, 
  Download, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Sparkles, 
  Car, 
  MessageCircle, 
  X, 
  Search, 
  Check,
  ChevronRight,
  BookOpen,
  SlidersHorizontal,
  Flame,
  Droplets,
  Clock,
  Layers,
  Cpu,
  Fuel,
  AlertTriangle,
  Gauge,
  Zap,
  Info,
  ShieldAlert,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type CategoryFilter = 'all' | 'diesel' | 'gasolina_turbo' | 'gasolina_v6_v8' | 'gasolina_aspirado';

export interface EngineCheck {
  title: string;
  desc: string;
}

export interface EngineScheduleItem {
  km: string;
  service: string;
  criticalAction: string;
}

export interface EngineTorque {
  part: string;
  spec: string;
}

export interface EngineSpec {
  id: string;
  name: string;
  code: string;
  type: 'diesel' | 'gasolina_turbo' | 'gasolina_v6_v8' | 'gasolina_aspirado';
  models: string;
  displacement: string;
  fuelSystem: string;
  oilViscosity: string;
  oilCapacity: string;
  transmissionFluid: string;
  coolantSpec: string;
  sparkPlugsOrGlow: string;
  severeInterval: string;
  severeTip: string;
  criticalChecks: EngineCheck[];
  schedule: EngineScheduleItem[];
  torques: EngineTorque[];
}

export interface ManualCard {
  id: string;
  brand: string;
  category: 'japones' | 'americano';
  status: 'disponible' | 'en_edicion';
  badge: string;
  badgeColor: string;
  statusBadge: string;
  statusBadgeColor: string;
  years: string;
  subtitle: string;
  models: string[];
  intervalsCount: string;
  htmlPath?: string;
  whatsappMessage: string;
  enginesList: EngineSpec[];
}

const MANUALES: ManualCard[] = [
  {
    id: 'toyota',
    brand: 'TOYOTA',
    category: 'japones',
    status: 'disponible',
    badge: 'Protocolo de Alta Exigencia',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/30',
    statusBadge: 'Disponible PDF & Ficha',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Hilux, Fortuner, 4Runner, Prado, Land Cruiser, Corolla, Yaris, RAV4',
    models: ['Hilux (1GD / 2GD / 2TR)', 'Fortuner 4.0L & 2.8L', '4Runner 4.0L V6', 'Prado', 'Land Cruiser 70/200/300', 'Corolla (M20A / 2ZR)', 'Yaris', 'RAV4'],
    intervalsCount: '6 Pautas de Protección (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-toyota.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento bajo protocolo de alta exigencia para mi Toyota.',
    enginesList: [
      {
        id: '1gd',
        name: '2.8L & 2.4L Turbo Diésel D-4D',
        code: '1GD-FTV / 2GD-FTV',
        type: 'diesel',
        models: 'Hilux, Fortuner, Prado',
        displacement: '2.755 cc / 2.393 cc 4 Cilindros Turbo Diésel Intercooler',
        fuelSystem: 'Inyección Common Rail Denso a 2.500 bar con inyectores piezoeléctricos',
        oilViscosity: '5W-30 Full Sintético API CK-4 / ACEA C2/C3 o 15W-40 CI-4',
        oilCapacity: '7.5 Litros con filtro de aceite nuevo',
        transmissionFluid: 'Toyota Genuine ATF WS (Automática AC60F 6 vel) o 75W LV (Manual)',
        coolantSpec: 'Toyota Super Long Life Coolant (SLLC) Rosa 50/50 OAT (11.5 L)',
        sparkPlugsOrGlow: 'Calentadores incandescentes cerámicos Denso (No usa bujías de chispa)',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'Doble purga del sedimentador de diésel cada 2.500 km por condensación y humedad costera. Filtro combustible OEM cada 10.000 km. Engrase de crucetas cada 5.000 km.',
        criticalChecks: [
          { title: 'Trampa de Agua y Sedimentador Diésel', desc: 'Drenaje preventivo de condensación de humedad en el filtro primario cada 2.500 km para proteger los inyectores piezoeléctricos de óxido y desgaste prematuro.' },
          { title: 'Crucetas y Ejes Cardánicos 4x4', desc: 'Engrase con grasa base de litio NLGI No. 2 en los 6 puntos de engrase del cardán y estrías deslizantes en cada servicio de 5.000 km.' },
          { title: 'Válvula EGR y Colector de Admisión', desc: 'Descarbonización por ultrasonido del múltiple de admisión y enfriador EGR cada 25.000 km por acumulación de hollín diésel.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Preventivo Diésel', criticalAction: 'Cambio de aceite 5W-30 CK-4 + filtro OEM + purga de sedimentador + engrase de crucetas' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Sustitución de filtro de combustible diésel OEM + filtro de aire de motor + rotación' },
          { km: '20.000 km', service: 'Servicio Mayor', criticalAction: 'Limpieza de toberas EGR + inspección de holgura en cadena + líquido de frenos DOT 4' },
          { km: '40.000 km', service: 'Servicio Integral 4x4', criticalAction: 'Reemplazo de fluido transfer y diferenciales 75W-90 / 85W-140 + refrigerante rosa' }
        ],
        torques: [
          { part: 'Tapón de Cárter de Aceite', spec: '38 Nm (arandela deformable)' },
          { part: 'Carcasa Filtro de Aceite', spec: '25 Nm' },
          { part: 'Calentadores Diésel', spec: '18 Nm' },
          { part: 'Tuercas de Rueda (6 pernos)', spec: '112 Nm' }
        ]
      },
      {
        id: '1gr',
        name: '4.0L V6 Gasolina Dual VVT-i',
        code: '1GR-FE',
        type: 'gasolina_v6_v8',
        models: '4Runner, Fortuner 4.0L, Land Cruiser 70/200, Prado',
        displacement: '3.956 cc V6 24V DOHC Dual VVT-i',
        fuelSystem: 'Inyección Electrónica Multipunto Secuencial EFI en puerto (6 inyectores)',
        oilViscosity: '5W-30 / 0W-20 Full Sintético API SP / ILSAC GF-6',
        oilCapacity: '6.1 Litros con cambio de filtro',
        transmissionFluid: 'Toyota Genuine ATF WS (Caja Automática A750F de 5 velocidades)',
        coolantSpec: 'Toyota Super Long Life Coolant Rosa OAT (10.2 Litros)',
        sparkPlugsOrGlow: '6x Denso SK20HR11 (Iridio larga vida) - Calibración 1.1 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Sustitución de termostato y refrigerante rosa Toyota Super Long Life a los 40.000 km para prevenir sobrecalentamiento en colas bajo calor costero. Bujías cada 40.000 km.',
        criticalChecks: [
          { title: 'Bomba de Agua y Termostato', desc: 'Inspección de residuo rosado en el orificio testigo de la bomba de agua por fatiga térmica a más de 33°C ambiente en Margarita.' },
          { title: 'Inyectores y Sensor MAF', desc: 'Limpieza de los 6 inyectores en tina ultrasónica y limpieza del filamento caliente del sensor MAF cada 20.000 km.' },
          { title: 'Diferenciales y Transferencia', desc: 'Inspección de emulsión de agua en lubricante de diferenciales 75W-90 tras temporada de lluvias o salinidad.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Motor V6', criticalAction: 'Cambio de aceite 5W-30 API SP + filtro + escaneo de corrección de combustible STFT/LTFT' },
          { km: '10.000 km', service: 'Inspección de Admisión', criticalAction: 'Filtro de aire de alto flujo + limpieza cuerpo de aceleración + rotación' },
          { km: '20.000 km', service: 'Afinación de Inyección', criticalAction: 'Limpieza de 6 inyectores por ultrasonido + microfiltros + filtro de cabina' },
          { km: '40.000 km', service: 'Gran Servicio 40k', criticalAction: '6 bujías Denso Iridium + termostato nuevo + refrigerante SLLC + fluidos de diferenciales' }
        ],
        torques: [
          { part: 'Tapón de Cárter de Aceite', spec: '40 Nm' },
          { part: 'Filtro de Aceite', spec: '25 Nm' },
          { part: 'Bujías Denso Iridium (6)', spec: '21 Nm' },
          { part: 'Tuercas de Rueda', spec: '112 Nm' }
        ]
      },
      {
        id: '2tr',
        name: '2.7L 4 Cilindros Dual VVT-i',
        code: '2TR-FE',
        type: 'gasolina_aspirado',
        models: 'Hilux Gasolina, Fortuner 2.7L',
        displacement: '2.694 cc 4 Cilindros en Línea 16V DOHC',
        fuelSystem: 'Inyección Multipunto EFI Secuencial indirecta (4 inyectores)',
        oilViscosity: '5W-30 / 0W-20 API SP / ILSAC GF-6',
        oilCapacity: '5.6 Litros con filtro de aceite',
        transmissionFluid: 'Toyota ATF WS (Automática) o Toyota 75W-90 GL-4 (Manual)',
        coolantSpec: 'Toyota Super Long Life Coolant Rosa (8.8 Litros)',
        sparkPlugsOrGlow: '4x Denso K20HR-U11 / SK20HR11 - Calibración 1.1 mm - Cada 30.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Descarbonización de cuerpo de aceleración y sensor MAF cada 15.000 km por gasolina con sedimentos. Inspección de mangueras de recirculación PCV.',
        criticalChecks: [
          { title: 'Válvula PCV y Mangueras', desc: 'La válvula PCV plástica se cristaliza por calor; inspección de succión y cambio de manguera cuarteada para evitar consumo de aceite.' },
          { title: 'Cadena de Distribución y Tensor', desc: 'Verificación de presión hidráulica en frío; este motor es de altísima resistencia siempre que no se use aceite espeso que obstruya el tensor.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio 4 Cilindros', criticalAction: 'Aceite 5W-30 API SP + filtro OEM + revisión de niveles y correas' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire + filtro de combustible en línea + rotación de cauchos' },
          { km: '20.000 km', service: 'Afinación 2TR', criticalAction: 'Limpieza ultrasonido de 4 inyectores + líquido de frenos DOT 4' },
          { km: '40.000 km', service: 'Servicio Mayor', criticalAction: 'Bujías nuevas + refrigerante Toyota rosa + fluido de transmisión' }
        ],
        torques: [
          { part: 'Tapón de Cárter', spec: '38 Nm' },
          { part: 'Bujías (4)', spec: '21 Nm' },
          { part: 'Tapa de Válvulas', spec: '9 Nm' },
          { part: 'Tuercas de Rueda', spec: '112 Nm' }
        ]
      },
      {
        id: 'm20a',
        name: '2.0L / 1.8L Dynamic Force D-4S',
        code: 'M20A-FKS / 2ZR-FE',
        type: 'gasolina_aspirado',
        models: 'Corolla, Corolla Cross, Yaris, RAV4',
        displacement: '1.987 cc 4 Cilindros Dynamic Force VVT-iE eléctrico',
        fuelSystem: 'Inyección Dual D-4S (Inyección directa en cilindro + inyección en puerto)',
        oilViscosity: '0W-16 / 0W-20 Full Sintético API SP / ILSAC GF-6B',
        oilCapacity: '4.2 Litros con filtro',
        transmissionFluid: 'Toyota Genuine CVT Fluid FE (Direct Shift CVT K120 con Launch Gear)',
        coolantSpec: 'Toyota SLLC Rosa 50/50 OAT (6.1 Litros)',
        sparkPlugsOrGlow: '4x Denso FC16HR-Q8 (Iridio punta fina) - Calibración 0.8 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Bomba de aceite de caudal variable controlada por ECU: prohibido aceite grueso. Cambio de fluido caja CVT Direct Shift cada 30.000 km por fricción térmica en Margarita.',
        criticalChecks: [
          { title: 'Prohibición de Aceite Grueso (20W-50)', desc: 'La bomba de aceite comandada por solenoide ECU requiere viscosidad ultra-baja 0W-16/0W-20 para lubricar los cojinetes a compresión 13:1.' },
          { title: 'Caja Direct Shift CVT (Launch Gear)', desc: 'Reemplazo de fluido CVT FE por reboce a 38°C monitoreado por escáner OBD2 cada 30.000 km para proteger el engranaje físico de primera marcha.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Dynamic Force', criticalAction: 'Aceite 0W-16/0W-20 API SP + filtro de elemento + escaneo de VVT-iE' },
          { km: '10.000 km', service: 'Revisión Filtros', criticalAction: 'Filtro de aire + filtro de habitáculo de carbón activado + alineación' },
          { km: '20.000 km', service: 'Limpieza D-4S', criticalAction: 'Aditivo descarbonizador de toberas de inyección directa + líquido de frenos DOT 4' },
          { km: '30.000 km', service: 'Servicio Caja CVT', criticalAction: 'Reemplazo de fluido Genuine Toyota CVT FE con nivelación térmica por escáner' }
        ],
        torques: [
          { part: 'Tapón de Cárter', spec: '40 Nm' },
          { part: 'Carcasa Filtro de Aceite', spec: '25 Nm' },
          { part: 'Bujías (4)', spec: '18 Nm' },
          { part: 'Tuercas de Rueda', spec: '103 Nm' }
        ]
      }
    ]
  },
  {
    id: 'honda',
    brand: 'HONDA',
    category: 'japones',
    status: 'disponible',
    badge: 'Protocolo de Alta Exigencia',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    statusBadge: 'Disponible PDF & Ficha',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Civic, CR-V, Accord, Pilot, HR-V, Fit / Jazz, Ridgeline',
    models: ['Civic (1.5L Turbo / 2.0L)', 'CR-V (1.5T / 2.4L i-VTEC)', 'Accord 1.5T / 2.0T', 'Pilot 3.5L V6', 'HR-V 1.8L / 2.0L', 'Fit / Jazz 1.5L', 'Ridgeline 3.5L'],
    intervalsCount: '6 Pautas de Protección (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-honda.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento bajo protocolo de alta exigencia para mi Honda.',
    enginesList: [
      {
        id: 'l15',
        name: '1.5L Turbo Earth Dreams Inyección Directa',
        code: 'L15B7 / L15BA',
        type: 'gasolina_turbo',
        models: 'Civic Turbo, CR-V Turbo, Accord 1.5T',
        displacement: '1.498 cc 4 Cilindros 16V DOHC VTEC Turbo Intercooler',
        fuelSystem: 'Inyección Directa de Gasolina de alta presión (200 bar) sin inyectores en puerto',
        oilViscosity: '0W-20 Full Sintético API SP / ILSAC GF-6 (Formulación anti-LSPI)',
        oilCapacity: '3.5 Litros con cambio de filtro',
        transmissionFluid: 'Genuine Honda HCF-2 CVT Fluid (Caja CVT de poleas cónicas, 3.7L cambio)',
        coolantSpec: 'Honda Long Life Type 2 All Season Antifreeze Azul (6.0 Litros)',
        sparkPlugsOrGlow: '4x NGK DILKAR8A8 (Laser Iridium rango 8) - Calibración 0.75 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'Aceite API SP obligatorio para mitigar preignición a baja velocidad (LSPI). Descarbonización química de válvulas de admisión cada 25.000 km por inyección directa sin lavado de toberas.',
        criticalChecks: [
          { title: 'Dilución de Aceite por Gasolina en Frío', desc: 'En recorridos cortos urbanos el motor no evapora los vapores de combustible; degradan el aceite. Servicio innegociable cada 5.000 km.' },
          { title: 'Carbonilla en Válvulas de Admisión (GDI)', desc: 'Como el inyector pulveriza directo al pistón, no limpia el lomo de las válvulas. Descarbonización química cada 25.000 km.' },
          { title: 'Actuador Eléctrico de Wastegate', desc: 'Inspección de holgura en el varillaje del turbo para prevenir pérdida de soplado o código de baja sobrealimentación.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio de Protección Turbo', criticalAction: 'Aceite 0W-20 API SP anti-LSPI + filtro OEM + escaneo de presiones de turbo' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor + filtro de habitáculo antipolen + rotación de neumáticos' },
          { km: '20.000 km', service: 'Servicio de Admisión', criticalAction: 'Limpieza cuerpo de aceleración + aditivo limpia inyectores Honda + líquido frenos' },
          { km: '25.000 km', service: 'Transmisión & Válvulas', criticalAction: 'Reemplazo de fluido CVT Honda HCF-2 + descarbonización de válvulas de admisión' }
        ],
        torques: [
          { part: 'Tapón de Cárter de Aceite', spec: '40 Nm (arandela de aluminio nueva)' },
          { part: 'Filtro de Aceite', spec: '12 Nm' },
          { part: 'Bujías Laser Iridium (4)', spec: '16 Nm' },
          { part: 'Tuercas de Rueda', spec: '108 Nm' }
        ]
      },
      {
        id: 'k24',
        name: '2.4L / 2.0L i-VTEC Aspirado',
        code: 'K24W / R20A',
        type: 'gasolina_aspirado',
        models: 'CR-V Aspirada, Civic 2.0L, Accord 2.4L, HR-V',
        displacement: '2.354 cc / 1.997 cc 4 Cilindros 16V i-VTEC',
        fuelSystem: 'Inyección Multipunto Secuencial en puerto (MPI). Válvulas se autolavan con combustible',
        oilViscosity: '0W-20 / 5W-20 Full Sintético API SP / ILSAC GF-6',
        oilCapacity: '4.2 Litros con filtro',
        transmissionFluid: 'Honda Genuine HCF-2 (CVT) o Honda ATF-DW1 (Automática convencional 5 vel)',
        coolantSpec: 'Honda Type 2 Azul (6.8 Litros)',
        sparkPlugsOrGlow: '4x NGK IZFR6K11 (Iridio punta láser) - Calibración 1.1 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Calibración con galgas de holgura de válvulas cada 40.000 km. Reemplazo de fluido genuino Honda HCF-2 en transmisiones CVT cada 25.000 km.',
        criticalChecks: [
          { title: 'Reglaje Manual de Holgura de Válvulas', desc: 'No posee taqués hidráulicos. Requiere calibración con galga de espesores (admisión 0.21-0.25 mm / escape 0.25-0.29 mm) cada 40.000 km.' },
          { title: 'Malla Filtrante VTC en Culata', desc: 'El pequeño filtro cedazo de la electroválvula VTC se tapa si se estiran los cambios de aceite, provocando DTC P0341.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Regular i-VTEC', criticalAction: 'Aceite 0W-20 API SP + filtro de aceite OEM + inspección de tapa de válvulas' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire + filtro de cabina + rotación de neumáticos + frenos' },
          { km: '20.000 km', service: 'Afinación de Inyección', criticalAction: 'Limpieza ultrasonido de 4 inyectores + líquido de frenos DOT 4' },
          { km: '40.000 km', service: 'Reglaje de Válvulas', criticalAction: 'Reglaje manual de válvulas + empacadura de tapa nueva + 4 bujías + fluido CVT' }
        ],
        torques: [
          { part: 'Tapón de Cárter', spec: '40 Nm' },
          { part: 'Contratuerca de Balancín', spec: '14 Nm' },
          { part: 'Bujías (4)', spec: '18 Nm' },
          { part: 'Tuercas de Rueda', spec: '108 Nm' }
        ]
      },
      {
        id: 'j35',
        name: '3.5L V6 i-VTEC con VCM (Desconexión Cilindros)',
        code: 'J35Y / J35Z',
        type: 'gasolina_v6_v8',
        models: 'Pilot, Accord V6, Ridgeline, Odyssey',
        displacement: '3.471 cc V6 24V SOHC i-VTEC con sistema VCM',
        fuelSystem: 'Inyección Electrónica Multipunto Secuencial EFI',
        oilViscosity: '0W-20 / 5W-20 API SP',
        oilCapacity: '4.8 a 5.4 Litros con filtro',
        transmissionFluid: 'Honda ATF-3.1 (Caja 9 vel ZF) o Honda ATF-DW1 (Caja 6 vel Honda)',
        coolantSpec: 'Honda Long Life Type 2 Azul (9.5 Litros)',
        sparkPlugsOrGlow: '6x NGK ILZKR7B11 (Iridio punta fina) - Calibración 1.1 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Correa de distribución dentada y tensor hidráulico: cambio a 60.000 km o 4 años. El sistema VCM exige revisión periódica de soportes hidráulicos de motor.',
        criticalChecks: [
          { title: 'Correa de Distribución (Timing Belt)', desc: 'Motor de interferencia con correa de caucho. Ruptura dobla válvulas. Reemplazo mandatorio cada 60.000 km junto a bomba de agua y tensor.' },
          { title: 'Soportes Activos de Motor (ACM)', desc: 'La desconexión de cilindros genera vibración que desgasta los soportes hidráulicos activos controlados por vacío y solenoide.' },
          { title: 'Bujías Banco Trasero Cilindros 1-2-3', desc: 'Los cilindros desactivados acumulan vapores de aceite que ensucian las bujías traseras prematuramente.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Motor V6', criticalAction: 'Aceite 0W-20 API SP + filtro OEM + escaneo de banco VCM' },
          { km: '10.000 km', service: 'Inspección de Chasis', criticalAction: 'Filtro de aire + inspección de soportes de motor ACM + rotación' },
          { km: '20.000 km', service: 'Servicio de Frenos & Cabina', criticalAction: 'Líquido de frenos DOT 4 + filtro habitáculo + limpieza de mariposa' },
          { km: '60.000 km', service: 'Servicio Mayor Distribución', criticalAction: 'Kit correa de distribución dentada + tensor hidráulico + bomba de agua + bujías' }
        ],
        torques: [
          { part: 'Tapón de Cárter', spec: '40 Nm' },
          { part: 'Bujías (6)', spec: '22 Nm' },
          { part: 'Perno Polea Cigüeñal', spec: '64 Nm + 60 grados' },
          { part: 'Tuercas de Rueda', spec: '127 Nm' }
        ]
      }
    ]
  },
  {
    id: 'nissan',
    brand: 'NISSAN',
    category: 'japones',
    status: 'disponible',
    badge: 'Protocolo de Alta Exigencia',
    badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    statusBadge: 'Disponible PDF & Ficha',
    statusBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    years: '2021 – 2027',
    subtitle: 'Sentra, Versa, Kicks, Frontier / Navara, X-Trail, Altima, Pathfinder, Patrol',
    models: ['Sentra (2.0L MR20DD)', 'Frontier / Navara (YD25 / QR25)', 'X-Trail (QR25 / 1.5T VC)', 'Versa (HR16DE)', 'Kicks (1.6L)', 'Altima', 'Pathfinder', 'Patrol Y61/Y62'],
    intervalsCount: '6 Pautas de Protección (5k a 100k km)',
    htmlPath: '/manuales/manual-tecnico-nissan.html',
    whatsappMessage: 'Hola MasterTech, deseo agendar el servicio de mantenimiento bajo protocolo de alta exigencia para mi Nissan.',
    enginesList: [
      {
        id: 'mr20',
        name: '2.0L 4 Cilindros Inyección Directa (DIG)',
        code: 'MR20DD',
        type: 'gasolina_aspirado',
        models: 'Sentra B17/B18, X-Trail 2.0L, Qashqai',
        displacement: '1.997 cc 4 Cilindros 16V DOHC Inyección Directa DIG',
        fuelSystem: 'Inyección Directa de Gasolina de alta presión (15 MPa / 150 bar) en cámara',
        oilViscosity: '0W-20 Full Sintético API SP / ILSAC GF-6',
        oilCapacity: '3.8 Litros con reemplazo de filtro',
        transmissionFluid: 'Genuine Nissan CVT Fluid NS-3 (Caja Jatco JF016E / CVT8, 7.5L totales)',
        coolantSpec: 'Nissan Blue Long Life Antifreeze/Coolant 50/50 OAT (6.5 Litros)',
        sparkPlugsOrGlow: '4x NGK DILKAR7D11D (Doble Iridio punta fina) - Calibración 1.1 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Resguardo térmico estricto de caja CVT Jatco: cambio de fluido Genuine Nissan NS-3 y filtro de cartucho enfriador cada 25.000 km por sobrecalentamiento costero.',
        criticalChecks: [
          { title: 'Carbonilla en Válvulas de Admisión (GDI)', desc: 'La inyección directa en el cilindro no baña las válvulas de admisión; acumulan carbón viscoso por vapores PCV. Limpieza con solvente descarbonizante cada 25.000 km.' },
          { title: 'Sensibilidad Térmica Caja CVT Jatco JF016E', desc: 'El calor ambiente de Margarita degrada el fluido NS-3. Al cambiar el fluido, es OBLIGATORIO cambiar el microfiltro de cartucho en el enfriador lateral y reiniciar el contador de deterioro por escáner.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Inyección Directa', criticalAction: 'Aceite 0W-20 Full Sintético API SP + filtro de aceite OEM + escaneo de CVT' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor + filtro de cabina antipolen + inspección de frenos' },
          { km: '20.000 km', service: 'Afinación & Toberas', criticalAction: 'Aditivo limpiador de inyectores de alta presión GDI + cambio de líquido frenos DOT 4' },
          { km: '25.000 km', service: 'Servicio Mayor CVT Jatco', criticalAction: 'Cambio fluido Genuine Nissan NS-3 + filtro de cartucho enfriador + reseteo escáner' }
        ],
        torques: [
          { part: 'Tapón de Cárter de Aceite', spec: '34 Nm (con arandela de cobre nueva)' },
          { part: 'Filtro de Aceite', spec: '18 Nm' },
          { part: 'Bujías NGK Doble Iridio', spec: '19.6 Nm' },
          { part: 'Tuercas de Rueda', spec: '108 Nm' }
        ]
      },
      {
        id: 'hr16',
        name: '1.6L 4 Cilindros Inyección Secuencial (MPI)',
        code: 'HR16DE',
        type: 'gasolina_aspirado',
        models: 'Versa, Kicks, Note, March',
        displacement: '1.598 cc 4 Cilindros 16V DOHC Inyección Secuencial Multipunto',
        fuelSystem: 'Inyección Multipunto Secuencial en puerto (MPI). NO acumula carbón en válvulas',
        oilViscosity: '0W-20 o 5W-30 Full Sintético API SP',
        oilCapacity: '3.0 a 3.5 Litros con filtro',
        transmissionFluid: 'Genuine Nissan NS-3 (Caja CVT Jatco JF015E con sub-caja planetaria) o 75W-85 GL-4 (Manual)',
        coolantSpec: 'Nissan Blue Long Life Coolant (5.3 Litros)',
        sparkPlugsOrGlow: '4x NGK PLZKAR6A-11 (Platino cuello largo) - Calibración 1.1 mm - Cada 30.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Bujías de platino de cuello largo: reemplazo cada 30.000 km con gasolina local. Limpieza de toberas de inyección por ultrasonido cada 20.000 km.',
        criticalChecks: [
          { title: 'Cuerpo de Aceleración Electrónico', desc: 'No mover la mariposa manualmente con solventes agresivos. Requiere calibración del volumen de aire en ralentí por escáner tras cualquier servicio.' },
          { title: 'Soporte de Torsión Inferior (Huesito)', desc: 'El buje de goma del soporte de motor inferior se raja con facilidad por baches y calor; causa sacudida al acoplar Drive o acelerar.' },
          { title: 'Filtro Enfriador Caja CVT JF015E', desc: 'La caja de Kicks/Versa posee un microfiltro de papel en la carcasa cilíndrica lateral del enfriador; cambiar cada 25.000 km.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Motor HR16', criticalAction: 'Aceite 0W-20/5W-30 API SP + filtro de aceite + revisión de niveles y correas' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor + filtro de cabina + rotación y balanceo de neumáticos' },
          { km: '20.000 km', service: 'Mantenimiento de Inyección', criticalAction: 'Limpieza ultrasonido de 4 inyectores + líquido de frenos DOT 4 + bujes de soporte' },
          { km: '30.000 km', service: 'Afinación & Encendido', criticalAction: '4 bujías de platino cuello largo NGK + fluido de caja manual o CVT NS-3' }
        ],
        torques: [
          { part: 'Tapón de Cárter de Aceite', spec: '34 Nm' },
          { part: 'Filtro de Aceite', spec: '18 Nm' },
          { part: 'Bujías (4)', spec: '19.6 Nm' },
          { part: 'Tuercas de Rueda', spec: '108 Nm' }
        ]
      },
      {
        id: 'yd25_qr25',
        name: '2.5L Turbo Diésel (YD25) & 2.5L Gasolina (QR25)',
        code: 'YD25DDTi / QR25DE',
        type: 'diesel',
        models: 'Frontier / Navara, X-Trail 2.5L, Altima',
        displacement: '2.488 cc 4 Cilindros Turbo Diésel Intercooler / 2.488 cc Gasolina DOHC',
        fuelSystem: 'Diésel Common Rail Denso a 1.800 bar con trampa de agua / Gasolina Multipunto EFI',
        oilViscosity: '15W-40 / 5W-30 Heavy Duty API CI-4 / CJ-4 (Diésel) · 5W-30 API SP (Gasolina)',
        oilCapacity: '6.9 a 7.5 Litros en YD25 Diésel (con filtro) · 4.8 Litros en QR25',
        transmissionFluid: 'Nissan Matic-S (Automática 5/7 vel) o 75W-85 GL-4 (Manual 6 vel) + 80W-90 LSD en diferencial',
        coolantSpec: 'Nissan Blue Long Life Coolant (9.5 Litros en YD25)',
        sparkPlugsOrGlow: 'Calentadores incandescentes cerámicos (YD25 Diésel) · 4x NGK DILKAR6A11 (QR25 Gasolina)',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'En YD25 Diésel: purga del sensor de agua en filtro cada 2.500 km. Inspección de holgura en cadena primaria y limpieza de válvula EGR.',
        criticalChecks: [
          { title: 'Purga de Humedad en Sistema Diésel (YD25)', desc: 'El filtro principal posee un sensor de boya en la parte inferior. Purgar preventivamente cada 2.500 km para proteger la bomba de alta presión e inyectores de condensación.' },
          { title: 'Cadena de Distribución Doble/Simple', desc: 'Inspección de desgaste del patín guía y tensor hidráulico de la cadena superior a partir de 80.000 km.' },
          { title: 'Descarbonización EGR y Colector', desc: 'El hollín del diésel combinado con vapores de aceite tapa el conducto de la válvula EGR provocando pérdida de potencia y humo negro.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Pesado Frontier', criticalAction: 'Aceite 15W-40 CI-4 + filtro OEM pesado + purga sedimentador + engrase cardán' },
          { km: '10.000 km', service: 'Filtro Diésel OEM', criticalAction: 'Reemplazo de filtro de combustible metálico + filtro de aire de alta capacidad' },
          { km: '20.000 km', service: 'Descarbonización EGR', criticalAction: 'Limpieza de válvula EGR y colector + líquido de frenos + líquido de embrague' },
          { km: '40.000 km', service: 'Transmisión & Diferencial', criticalAction: 'Fluido caja Matic-S o manual + aceite de diferencial 80W-90 LSD + refrigerante' }
        ],
        torques: [
          { part: 'Tapón de Cárter YD25', spec: '40 Nm' },
          { part: 'Filtro de Aceite (Metálico)', spec: '20 Nm' },
          { part: 'Calentadores Diésel (Glow Plugs)', spec: '18 Nm' },
          { part: 'Tuercas de Rueda (Frontier)', spec: '135 Nm' }
        ]
      }
    ]
  },
  {
    id: 'jeep',
    brand: 'JEEP / MOPAR',
    category: 'americano',
    status: 'en_edicion',
    badge: 'Protocolo de Alta Exigencia',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    statusBadge: 'Ficha Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2015 – 2027',
    subtitle: 'Grand Cherokee, Wrangler, Cherokee, Compass, Renegade, Gladiator',
    models: ['Grand Cherokee (WK2 / WL 3.6L & 5.7L)', 'Wrangler (JK / JL 3.6L Pentastar)', 'Cherokee (KL 2.4L / 3.2L)', 'Compass', 'Gladiator JT', 'Commander'],
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento bajo protocolo de alta exigencia para mi Jeep.',
    enginesList: [
      {
        id: 'pentastar',
        name: '3.6L Pentastar V6 24V VVT',
        code: 'Pentastar V6',
        type: 'gasolina_v6_v8',
        models: 'Grand Cherokee WK2/WL, Wrangler JK/JL, Gladiator JT',
        displacement: '3.604 cc V6 24V DOHC con VVT en admisión y escape',
        fuelSystem: 'Inyección Secuencial Multipunto en múltiple (MPI)',
        oilViscosity: '0W-20 / 5W-20 Mopar MS-6395',
        oilCapacity: '5.7 Litros con filtro de elemento',
        transmissionFluid: 'Mopar ZF 8&9 Speed ATF (Transmisión ZF 8HP70 / 8HP75 de 8 velocidades)',
        coolantSpec: 'Mopar Antifreeze/Coolant 10 Year/150,000 Mile Purple OAT (13.2 Litros)',
        sparkPlugsOrGlow: '6x Champion RER8ZWYCB4 / NGK Laser Iridium - Calibración 1.1 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Falla crítica por calor: la base plástica del enfriador de aceite en la "V" del motor se fisura. Recomendamos enfriador de aluminio Dorman/Mopar. Inspección de balancines por desgaste de levas.',
        criticalChecks: [
          { title: 'Enfriador de Aceite y Base del Filtro (Falla #1)', desc: 'La carcasa plástica en el valle del motor se deforma por calor, fugando aceite y refrigerante hacia la campana de la caja. Recomendamos sustitución preventiva por enfriador de aluminio mecanizado.' },
          { title: 'Balancines de Rodillo y Árbol de Levas', desc: 'Los rodamientos de aguja de los balancines fallan por lubricación insuficiente si se atrasa el cambio de aceite, desgastando la leva del árbol.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Pentastar', criticalAction: 'Aceite 0W-20 MS-6395 + filtro Mopar + inspección visual de fugas en la V del motor' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor de alto flujo + filtro de cabina antipolen + rotación' },
          { km: '20.000 km', service: 'Afinación & Frenos', criticalAction: 'Limpieza de inyectores ultrasonido + líquido de frenos DOT 4 + inspección de balancines' },
          { km: '40.000 km', service: 'Servicio Mayor Mopar', criticalAction: '6 bujías de iridio + refrigerante Mopar OAT morado + fluido caja ZF 8 vel con cárter' }
        ],
        torques: [
          { part: 'Tapón de Cárter de Aceite', spec: '34 Nm' },
          { part: 'Tapa Carcasa Filtro de Aceite', spec: '25 Nm (NO sobreapretar)' },
          { part: 'Bujías (6)', spec: '17.5 Nm' },
          { part: 'Tuercas de Rueda (Wrangler/GC)', spec: '176 Nm' }
        ]
      },
      {
        id: 'hemi',
        name: '5.7L HEMI V8 MDS VVT',
        code: 'HEMI 5.7L',
        type: 'gasolina_v6_v8',
        models: 'Grand Cherokee 5.7L, RAM 1500',
        displacement: '5.654 cc V8 16V OHV con VVT y Desactivación de Cilindros MDS',
        fuelSystem: 'Inyección Secuencial Multipunto EFI',
        oilViscosity: '5W-20 Estricto Mopar MS-6395 (6.6L)',
        oilCapacity: '6.6 Litros con filtro roscado',
        transmissionFluid: 'Mopar ZF 8-Speed ATF (Transmisión TorqueFlite 8HP70)',
        coolantSpec: 'Mopar 10-Year OAT Violeta (14.0 Litros)',
        sparkPlugsOrGlow: '16x Bujías (2 por cilindro): NGK LZFR5C-11 - Cambio cada 30.000 km',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'Prohibido usar aceite grueso (20W-50): traba los botadores MDS causando daño al árbol de levas. 16 bujías (2 por cilindro) calibradas y cambiadas cada 30.000 km para combustión limpia.',
        criticalChecks: [
          { title: 'Prohibido Aceite Grueso (Sistema MDS)', desc: 'Los solenoides MDS usan presión de aceite calibrada para colapsar los botadores de los cilindros 1, 4, 6 y 7. El aceite pesado destruye el árbol de levas.' },
          { title: '16 Bujías de Encendido', desc: 'Cada cilindro posee 2 bujías para combustión balanceada. Bajo régimen de alta exigencia térmica urbana, deben sustituirse cada 30.000 km.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio de Protección HEMI', criticalAction: 'Aceite 5W-20 MS-6395 estricto + filtro de aceite roscado OEM + escaneo MDS' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor pesado + filtro habitáculo + rotación de cauchos' },
          { km: '20.000 km', service: 'Servicio de Inyección', criticalAction: 'Limpieza de 8 inyectores en laboratorio ultrasonido + líquido frenos DOT 4' },
          { km: '30.000 km', service: 'Afinación 16 Bujías', criticalAction: 'Reemplazo del juego completo de 16 bujías de encendido + refrigerante Mopar' }
        ],
        torques: [
          { part: 'Tapón de Cárter HEMI', spec: '34 Nm' },
          { part: 'Filtro de Aceite', spec: '18 Nm' },
          { part: '16 Bujías de Encendido', spec: '20 Nm' },
          { part: 'Tuercas de Rueda (RAM/GC)', spec: '176 Nm' }
        ]
      },
      {
        id: 'hurricane_jeep',
        name: '2.0L Turbo Hurricane GME T4',
        code: 'GME-T4 Hurricane',
        type: 'gasolina_turbo',
        models: 'Wrangler JL 2.0T, Cherokee KL',
        displacement: '1.995 cc 4 Cilindros Turbo Twin-Scroll Inyección Directa',
        fuelSystem: 'Inyección Directa de Gasolina a 200 bar',
        oilViscosity: '5W-30 Full Sintético API SP / MS-13340',
        oilCapacity: '4.7 Litros con filtro',
        transmissionFluid: 'Mopar ZF 8-Speed ATF',
        coolantSpec: 'Doble circuito: Motor (Mopar OAT) + Circuito independiente Intercooler agua-aire (3.2 L)',
        sparkPlugsOrGlow: '4x Bujías Iridio alta disipación térmica - Cada 25.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Circuito independiente de refrigeración para el intercooler aire-agua. Purgado con vacío. Monitoreo de bujías cada 25.000 km.',
        criticalChecks: [
          { title: 'Doble Circuito de Refrigeración', desc: 'Posee dos depósitos y dos bombas de agua: una para el motor y otra eléctrica para el intercooler agua-aire; purgado obligatorio con herramienta de vacío.' },
          { title: 'Sensibilidad a la Gasolina y Turbo Twin-Scroll', desc: 'Uso exclusivo de lubricante API SP para mitigar LSPI en los pistones de alta compresión turboalimentados.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio GME-T4', criticalAction: 'Aceite 5W-30 MS-13340 + filtro + escaneo de presiones de turbo' },
          { km: '10.000 km', service: 'Filtros & Niveles', criticalAction: 'Filtro de aire motor + inspección de nivel de refrigerante del intercooler' },
          { km: '20.000 km', service: 'Afinación Turbo', criticalAction: 'Limpieza de admisión + líquido de frenos DOT 4 + rotación' },
          { km: '25.000 km', service: 'Bujías & Descarbonización', criticalAction: '4 bujías especiales de iridio + aditivo descarbonizador GDI' }
        ],
        torques: [
          { part: 'Tapón de Cárter', spec: '27 Nm' },
          { part: 'Tapa Filtro de Aceite', spec: '25 Nm' },
          { part: 'Bujías (4)', spec: '18 Nm' },
          { part: 'Tuercas de Rueda', spec: '176 Nm' }
        ]
      }
    ]
  },
  {
    id: 'ford',
    brand: 'FORD / MOTORCRAFT',
    category: 'americano',
    status: 'en_edicion',
    badge: 'Protocolo de Alta Exigencia',
    badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
    statusBadge: 'Ficha Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2016 – 2027',
    subtitle: 'Explorer, F-150, Ranger, EcoSport, Edge, Expedition, Fiesta',
    models: ['Explorer (EcoBoost 2.3L / 3.5L Cyclone)', 'F-150 (5.0L Coyote / 3.5L EcoBoost)', 'Ranger (2.5L / 3.2L Diésel)', 'EcoSport', 'Edge', 'Expedition 3.5L'],
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento bajo protocolo de alta exigencia para mi Ford.',
    enginesList: [
      {
        id: 'ecoboost_v6',
        name: '3.5L / 2.7L V6 EcoBoost Twin-Turbo Inyección Directa',
        code: 'EcoBoost V6 DIT',
        type: 'gasolina_turbo',
        models: 'F-150 EcoBoost, Explorer Sport, Expedition',
        displacement: '3.496 cc / 2.694 cc V6 Twin-Turbo Inyección Directa',
        fuelSystem: 'Inyección Directa de Gasolina a alta presión (150 bar) con dos turbocargadores',
        oilViscosity: 'Motorcraft Full Synthetic 5W-30 API SP (WSS-M2C961-A1)',
        oilCapacity: '5.7 Litros con cambio de filtro',
        transmissionFluid: 'Motorcraft MERCON ULV (Caja 10R80 de 10 velocidades) o MERCON LV (6 vel)',
        coolantSpec: 'Motorcraft Yellow Antifreeze/Coolant OAT (13.5 Litros)',
        sparkPlugsOrGlow: '6x Motorcraft SP-548 / SP-578 Iridium - Calibración 0.75 mm - Cada 30.000 km',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'En Explorer 3.5L: bomba de agua interna accionada por la cadena de tiempo. Monitoreo preventivo del orificio testigo y refrigerante amarillo OAT para evitar fuga de agua al cárter.',
        criticalChecks: [
          { title: 'Bomba de Agua Interna (Explorer 3.5L Cyclone/EcoBoost)', desc: 'La bomba de agua está montada dentro de la tapa de la cadena de tiempo. Si el sello falla, el refrigerante drena al orificio de drenaje externo o al cárter. Inspección de testigo obligatoria.' },
          { title: 'Desgaste Térmico de Aceite en Turbos Gemelos', desc: 'Los dos turbocompresores refrigerados por agua y aceite degradan el lubricante rápidamente con calor ambiental >32°C; cambio riguroso a los 5.000 km.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio EcoBoost V6', criticalAction: 'Aceite 5W-30 API SP + filtro FL-500S + escaneo de presiones de turbo y levas' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor de alta captación + filtro cabina + rotación' },
          { km: '20.000 km', service: 'Descarbonización & Frenos', criticalAction: 'Aditivo descarbonizador GDI + líquido de frenos DOT 4 + inspección de mangueras turbo' },
          { km: '30.000 km', service: 'Afinación Bujías', criticalAction: '6 bujías Motorcraft Iridium calibradas a 0.75 mm + refrigerante amarillo Motorcraft' }
        ],
        torques: [
          { part: 'Tapón de Cárter de Aceite', spec: '26 Nm (o tapón plástico manual)' },
          { part: 'Filtro de Aceite FL-500S', spec: '18 Nm' },
          { part: 'Bujías Motorcraft (6)', spec: '15 Nm' },
          { part: 'Tuercas de Rueda (F-150)', spec: '204 Nm' }
        ]
      },
      {
        id: 'coyote',
        name: '5.0L Coyote V8 Ti-VCT',
        code: 'Coyote 5.0L',
        type: 'gasolina_v6_v8',
        models: 'F-150 V8 5.0L, Mustang GT',
        displacement: '4.951 cc V8 32V DOHC con distribución Ti-VCT independiente',
        fuelSystem: 'Inyección Secuencial Multipunto en puerto o Inyección Dual (Puerto + Directa Gen 3)',
        oilViscosity: 'Motorcraft 5W-20 / 5W-30 Synthetic Blend (WSS-M2C960-A1)',
        oilCapacity: '7.3 Litros (Gen 1/2) a 8.3 Litros (Gen 3) con filtro',
        transmissionFluid: 'Motorcraft MERCON ULV (Caja 10R80 de 10 velocidades)',
        coolantSpec: 'Motorcraft Yellow Coolant (14.2 Litros)',
        sparkPlugsOrGlow: '8x Motorcraft SP-548 / SP-589 - Calibración 1.0 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Mantenimiento de solenoides Ti-VCT. En la transmisión 10R80 (10 vel), sustitución de fluido Mercon ULV y filtro a los 40.000 km por sobrecalentamiento térmico.',
        criticalChecks: [
          { title: 'Solenoides y Mallas Ti-VCT', desc: 'Los 4 árboles de levas usan fasers hidráulicos muy sensibles a barnices de aceite; cambio cada 5.000 km para prevenir desincronización de levas.' },
          { title: 'Transmisión 10R80 (10 Velocidades)', desc: 'Caja propensa a tirones por calentamiento de fluido Mercon ULV en tráfico denso; reemplazo de fluido y filtro a los 40.000 km.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Coyote V8', criticalAction: 'Aceite Motorcraft 5W-20/5W-30 + filtro FL-500S + escaneo de solenoides Ti-VCT' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor V8 + filtro de habitáculo + rotación y alineación' },
          { km: '20.000 km', service: 'Afinación de Inyectores', criticalAction: 'Limpieza ultrasónica de 8 inyectores + líquido de frenos DOT 4' },
          { km: '40.000 km', service: 'Transmisión & Bujías', criticalAction: '8 bujías Motorcraft + fluido caja 10R80 Mercon ULV con filtro + refrigerante' }
        ],
        torques: [
          { part: 'Tapón de Cárter Coyote', spec: '26 Nm' },
          { part: 'Filtro de Aceite', spec: '18 Nm' },
          { part: 'Bujías (8)', spec: '17.5 Nm' },
          { part: 'Tuercas de Rueda', spec: '204 Nm' }
        ]
      },
      {
        id: 'duratorq',
        name: '3.2L 5 Cilindros & 2.2L Duratorq TDCi Diésel',
        code: 'Duratorq Puma',
        type: 'diesel',
        models: 'Ranger Diésel 3.2L / 2.2L',
        displacement: '3.198 cc 5 Cilindros / 2.198 cc 4 Cilindros Turbo Diésel Intercooler',
        fuelSystem: 'Inyección Common Rail Continental / Siemens a 1.800 bar con trampa de agua',
        oilViscosity: '5W-30 Low SAPS ACEA C1/C2 WSS-M2C913-D',
        oilCapacity: '9.8 Litros en 3.2L con filtro de elemento',
        transmissionFluid: 'Motorcraft MERCON LV (Automática 6R80 de 6 vel) o 75W-90 (Manual)',
        coolantSpec: 'Motorcraft Orange / Yellow OAT (11.8 Litros)',
        sparkPlugsOrGlow: '5x Calentadores incandescentes cerámicos (Glow Plugs) - No usa bujías',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Bomba de aceite de paletas variables: nunca dejar escurrir el cárter más de 10 min durante el servicio para no descebar la bomba. Doble trampa de sedimentación preventiva para sistema diésel.',
        criticalChecks: [
          { title: 'Regla Crítica de Drenaje de Aceite (10 Minutos)', desc: 'La bomba de aceite de paletas variables se desceba si se deja el cárter drenando más de 10 minutos. Llenar inmediatamente con aceite nuevo para no fundir el motor al arrancar.' },
          { title: 'Purga del Filtro de Diésel', desc: 'Drenar el sedimentador inferior cada 2.500 km y cambiar el cartucho de combustible cada 10.000 km para no triturar la bomba Common Rail.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Preventivo Duratorq', criticalAction: 'Aceite 5W-30 sintético diésel + filtro de elemento + purga de sedimentador + cardán' },
          { km: '10.000 km', service: 'Filtro Diésel OEM', criticalAction: 'Sustitución de filtro de combustible + filtro de aire de alta filtración + rotación' },
          { km: '20.000 km', service: 'Descarbonización EGR', criticalAction: 'Limpieza de válvula EGR y colector + líquido de frenos + inspección de turbo' },
          { km: '40.000 km', service: 'Servicio Integral 4x4', criticalAction: 'Fluido caja 6R80 + lubricante de diferenciales 80W-90 + refrigerante' }
        ],
        torques: [
          { part: 'Tapón de Cárter', spec: '34 Nm' },
          { part: 'Carcasa Filtro de Aceite', spec: '25 Nm' },
          { part: 'Calentadores Diésel (5)', spec: '15 Nm' },
          { part: 'Tuercas de Rueda (Ranger)', spec: '135 Nm' }
        ]
      }
    ]
  },
  {
    id: 'chevrolet',
    brand: 'CHEVROLET / GM',
    category: 'americano',
    status: 'en_edicion',
    badge: 'Protocolo de Alta Exigencia',
    badgeColor: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    statusBadge: 'Ficha Técnica en Taller',
    statusBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    years: '2015 – 2027',
    subtitle: 'Tahoe, Silverado, Suburban, Trailblazer, Cruze, Aveo, Captiva',
    models: ['Tahoe / Suburban (5.3L / 6.2L EcoTec3)', 'Silverado 1500 V8', 'Trailblazer', 'Cruze 1.4L Turbo', 'Aveo', 'Captiva 1.5T'],
    intervalsCount: 'Pauta Técnica Directa',
    whatsappMessage: 'Hola MasterTech, deseo consultar la pauta de mantenimiento bajo protocolo de alta exigencia para mi Chevrolet.',
    enginesList: [
      {
        id: 'ecotec3_v8',
        name: '5.3L / 6.2L EcoTec3 V8 con AFM / DFM (Desconexión Cilindros)',
        code: 'L83 / L84 / L87',
        type: 'gasolina_v6_v8',
        models: 'Tahoe, Suburban, Silverado 1500, Yukon',
        displacement: '5.328 cc / 6.162 cc V8 Inyección Directa con sistema AFM/DFM',
        fuelSystem: 'Inyección Directa de Gasolina a alta presión (150 bar en rieles de culata)',
        oilViscosity: '0W-20 con certificación Dexos 1 Gen 3 (7.6L a 8.0L)',
        oilCapacity: '7.6 a 8.0 Litros con filtro de aceite',
        transmissionFluid: 'Mobil 1 Synthetic LV ATF HP (Cajas GM 8L90 de 8 vel o 10L80 de 10 vel)',
        coolantSpec: 'ACDelco Dex-Cool Naranja OAT 50/50 (15.5 Litros)',
        sparkPlugsOrGlow: '8x ACDelco Iridium 12622561 - Calibración 1.0 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km (Estricto)',
        severeTip: 'Los botadores hidráulicos AFM/DFM colapsan si el aceite acumula carbón o se usa viscosidad errada. Malla filtrante del sensor VLOM debe limpiarse en cada servicio mayor.',
        criticalChecks: [
          { title: 'Colapso de Botadores AFM/DFM (Falla Crítica V8)', desc: 'Los taqués especiales con pines de bloqueo se traban por lodos o aceite degradado, doblando varillas empujadoras y rayando el árbol de levas. Lubricante Dexos 1 Gen 3 obligatorio a los 5.000 km.' },
          { title: 'Malla Filtrante del Módulo VLOM', desc: 'Bajo el múltiple de admisión existe un micro-filtro que protege los solenoides de desactivación; requiere limpieza en servicios mayores.' },
          { title: 'Vibración de Convertidor Caja 8L90', desc: 'Falla común de estremecimiento ("shudder") resuelta con sustitución de fluido por Mobil 1 LV ATF HP azul.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio de Protección V8 EcoTec3', criticalAction: 'Aceite 0W-20 Dexos 1 Gen 3 + filtro PF64 ACDelco + escaneo de presión VLOM' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor de alta capacidad + filtro habitáculo + rotación' },
          { km: '20.000 km', service: 'Afinación & Frenos', criticalAction: 'Aditivo limpiador GDI + líquido de frenos DOT 4 + inspección de tren delantero' },
          { km: '40.000 km', service: 'Servicio Mayor EcoTec3', criticalAction: '8 bujías ACDelco Iridium + fluido de transmisión Mobil 1 LV HP + Dex-Cool nuevo' }
        ],
        torques: [
          { part: 'Tapón de Cárter de Aceite', spec: '25 Nm' },
          { part: 'Filtro de Aceite PF64', spec: '15 Nm' },
          { part: 'Bujías (8)', spec: '20 Nm' },
          { part: 'Tuercas de Rueda (6 pernos)', spec: '190 Nm' }
        ]
      },
      {
        id: 'ecotec_turbo',
        name: '1.4T / 1.5T Turbo Ecotec Inyección Directa',
        code: 'Ecotec Turbo',
        type: 'gasolina_turbo',
        models: 'Cruze Turbo, Captiva Turbo, Tracker',
        displacement: '1.399 cc / 1.490 cc 4 Cilindros Turbo DOHC 16V',
        fuelSystem: 'Inyección Directa SIDI de alta presión',
        oilViscosity: '5W-30 con certificación estricta Dexos 1 Gen 3',
        oilCapacity: '4.0 Litros con filtro de elemento',
        transmissionFluid: 'Dexron VI ATF (Caja Automática 6T40 de 6 velocidades)',
        coolantSpec: 'Dex-Cool Naranja 50/50 (6.5 Litros)',
        sparkPlugsOrGlow: '4x Bujías Iridio rango térmico específico - Calibración 0.7 mm - Cada 30.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Protección contra LSPI: formulación Dexos 1 Gen 3 obligatoria. Revisión de válvula check de diafragma PCV en la tapa de válvulas (se rompe por vapores calientes y genera humo azul).',
        criticalChecks: [
          { title: 'Diafragma PCV Integrado en Tapa de Válvulas', desc: 'La membrana de goma PCV se rasga por temperatura provocando silbido agudo, humo azul y código P0171 de mezcla pobre; inspección obligatoria de vacío.' },
          { title: 'Termostato con Resistencia Calefactora', desc: 'La carcasa plástica del termostato electrónico se quiebra con el calor; sustitución preventiva a los 40.000 km.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Turbo Ecotec', criticalAction: 'Aceite 5W-30 Dexos 1 Gen 3 + filtro OEM + escaneo de presiones de turbo' },
          { km: '10.000 km', service: 'Filtros & Niveles', criticalAction: 'Filtro de aire motor + filtro de cabina + rotación de neumáticos' },
          { km: '20.000 km', service: 'Afinación Inyección', criticalAction: 'Limpieza de mariposa de admisión + líquido frenos DOT 4 + chequeo de válvula PCV' },
          { km: '30.000 km', service: 'Encendido & Caja', criticalAction: '4 bujías de iridio + drenaje y llenado de fluido Dexron VI para caja 6T40' }
        ],
        torques: [
          { part: 'Tapón de Cárter', spec: '14 Nm (cárter de aluminio delicado)' },
          { part: 'Carcasa Filtro de Aceite', spec: '25 Nm' },
          { part: 'Bujías (4)', spec: '18 Nm' },
          { part: 'Tuercas de Rueda', spec: '140 Nm' }
        ]
      },
      {
        id: 'ecotec3_v6',
        name: '4.3L EcoTec3 V6 LV3 Inyección Directa',
        code: 'LV3 4.3L',
        type: 'gasolina_v6_v8',
        models: 'Silverado 1500 V6',
        displacement: '4.301 cc V6 Inyección Directa derivado de la arquitectura V8',
        fuelSystem: 'Inyección Directa SIDI de alta presión',
        oilViscosity: '5W-30 Dexos 1 Gen 3 (5.7L)',
        oilCapacity: '5.7 Litros con filtro',
        transmissionFluid: 'Dexron VI ATF (Caja 6L80 de 6 velocidades)',
        coolantSpec: 'Dex-Cool Naranja (13.0 Litros)',
        sparkPlugsOrGlow: '6x ACDelco Iridium - Calibración 1.0 mm - Cada 40.000 km',
        severeInterval: 'Cada 5.000 km',
        severeTip: 'Inyección directa y sistema AFM: bujías de iridio cada 40.000 km para mantener encendido eficiente. Inspección de termostato y mangueras plásticas del radiador por fatiga térmica.',
        criticalChecks: [
          { title: 'Sistema AFM en V6', desc: 'Desactiva 2 cilindros en marcha crucero; requiere aceite Dexos 1 Gen 3 para proteger los botadores colapsables.' },
          { title: 'Conectores Rápidos de Mangueras de Calefacción', desc: 'Los acoples en "T" de plástico del radiador se tuestan por temperatura; reemplazo antes de que se partan en marcha.' }
        ],
        schedule: [
          { km: '5.000 km', service: 'Servicio Silverado V6', criticalAction: 'Aceite 5W-30 Dexos 1 Gen 3 + filtro PF64 + escaneo de solenoides' },
          { km: '10.000 km', service: 'Servicio Filtros', criticalAction: 'Filtro de aire motor de alto flujo + filtro cabina + rotación' },
          { km: '20.000 km', service: 'Afinación GDI', criticalAction: 'Limpieza toberas de inyección + líquido de frenos DOT 4' },
          { km: '40.000 km', service: 'Servicio Mayor', criticalAction: '6 bujías ACDelco + fluido caja 6L80 con filtro de cárter + refrigerante' }
        ],
        torques: [
          { part: 'Tapón de Cárter', spec: '25 Nm' },
          { part: 'Filtro de Aceite', spec: '15 Nm' },
          { part: 'Bujías (6)', spec: '20 Nm' },
          { part: 'Tuercas de Rueda', spec: '190 Nm' }
        ]
      }
    ]
  }
];

export default function PreviewManuales() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalManual, setActiveModalManual] = useState<ManualCard | null>(null);
  const [activeModalEngineId, setActiveModalEngineId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'engine' | 'document'>('engine');
  const [selectedEnginesByBrand, setSelectedEnginesByBrand] = useState<Record<string, string>>({});
  const [modalHtml, setModalHtml] = useState<string | null>(null);
  const [isLoadingHtml, setIsLoadingHtml] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (activeModalManual?.htmlPath) {
      setIsLoadingHtml(true);
      fetch(activeModalManual.htmlPath)
        .then((res) => {
          if (!res.ok) throw new Error('Error al cargar manual');
          return res.text();
        })
        .then((html) => {
          setModalHtml(html);
          setIsLoadingHtml(false);
        })
        .catch(() => {
          setModalHtml(null);
          setIsLoadingHtml(false);
        });
    } else {
      setModalHtml(null);
      setIsLoadingHtml(false);
    }
  }, [activeModalManual]);

  useEffect(() => {
    const isLight = document.documentElement.classList.contains('theme-light') || document.documentElement.classList.contains('light');
    setIsDark(!isLight);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.remove('theme-light', 'light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('theme-light', 'light');
    }
  };

  const handlePrintCurrent = () => {
    window.print();
  };

  const handleWhatsApp = (customMessage: string) => {
    const phone = '584123565012';
    const text = encodeURIComponent(customMessage);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const getActiveEngine = (manual: ManualCard): EngineSpec => {
    const selectedId = selectedEnginesByBrand[manual.id];
    if (selectedId) {
      const found = manual.enginesList.find(e => e.id === selectedId);
      if (found) return found;
    }
    return manual.enginesList[0];
  };

  const filteredManuales = MANUALES.filter((item) => {
    const matchesSearch = 
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.models.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.enginesList.some(e => 
        e.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    return item.enginesList.some(e => e.type === selectedCategory);
  });

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#07090e] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0c0f15]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a 
              href="/"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Volver a la Página Principal"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Página Principal</span>
            </a>

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs shadow-md shadow-red-500/20">
                MT
              </div>
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white hidden md:inline">
                MASTER<span className="text-red-500">TECH</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              type="button"
              onClick={() => handleWhatsApp('Hola MasterTech, deseo consultar la pauta de mantenimiento bajo protocolo de alta exigencia para mi vehículo.')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <MessageCircle size={15} />
              <span className="hidden sm:inline">Asesoría Técnica WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden py-10 sm:py-14 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-white to-slate-100 dark:from-[#0c0f15] dark:to-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold mb-4">
            <ShieldCheck size={14} />
            <span>Centro Especializado de Ingeniería Automotriz · Isla de Margarita</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            Recomendaciones de Mantenimiento <span className="text-red-500">· Protocolo de Alta Exigencia</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Pautas técnicas oficiales de taller calibradas minuciosamente <strong>por motorización</strong>. Diseñadas para contrarrestar el desgaste acelerado por altas temperaturas costeras, tráfico urbano y arranques frecuentes con intervalos preventivos de <strong>5.000 km</strong>.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-4xl">
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-sm">
              <span className="text-xl sm:text-2xl font-black text-red-500 flex items-center gap-1.5">
                <Clock size={18} />
                5.000 km
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">Intervalo de Alta Exigencia</span>
            </div>

            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-sm">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Droplets size={18} className="text-blue-500" />
                API SP / CK-4
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">Anti-LSPI & Protección Diésel</span>
            </div>

            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-sm">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Fuel size={18} className="text-emerald-500" />
                Doble Purga
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">Sedimentadores Diésel c/ 2.500 km</span>
            </div>

            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-sm">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck size={18} className="text-purple-500" />
                100% Digital
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">PDF & Ficha Técnica por Motor</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills by Engine Type */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal size={14} />
              Tipo:
            </span>
            {[
              { id: 'all', label: 'Todos los Motores' },
              { id: 'diesel', label: 'Diésel D-4D / TDCi' },
              { id: 'gasolina_turbo', label: 'Gasolina Turbo' },
              { id: 'gasolina_v6_v8', label: 'V6 & V8' },
              { id: 'gasolina_aspirado', label: '4 Cilindros' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & View Mode */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar marca o motor (ej. 1GD, HR16, Pentastar)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="Vista en Tarjetas Cuadrícula"
              >
                <Layers size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list' 
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="Vista en Lista Compacta"
              >
                <BookOpen size={15} />
              </button>
            </div>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>Mostrando {filteredManuales.length} marcas y especificaciones técnicas</span>
          <span className="text-[11px] text-red-500 font-semibold">Toca cada código de motor para ver su ficha técnica exclusiva</span>
        </div>

        {/* Cards Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredManuales.map((manual) => {
              const activeEngine = getActiveEngine(manual);
              const isAvailable = manual.status === 'disponible';
              const whatsappEngineMsg = `Hola MasterTech, deseo agendar el servicio de mantenimiento bajo protocolo de alta exigencia para mi ${manual.brand} con motor ${activeEngine.name} (${activeEngine.code}).`;

              return (
                <div 
                  key={manual.id}
                  className="bg-white dark:bg-[#0c0f15] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${manual.badgeColor}`}>
                        {manual.badge}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${manual.statusBadgeColor}`}>
                        <CheckCircle2 size={11} />
                        {manual.statusBadge}
                      </span>
                    </div>

                    {/* Brand & Years */}
                    <div className="flex items-baseline justify-between mb-1">
                      <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        {manual.brand}
                      </h2>
                      <span className="text-xs font-semibold text-slate-400">
                        {manual.years}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-1 font-medium">
                      {manual.subtitle}
                    </p>

                    {/* Engine Selection Pills */}
                    <div className="mb-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                          <Fuel size={12} className="text-red-500" />
                          Seleccionar Motor:
                        </span>
                        <span className="text-[10px] text-red-500 font-semibold">
                          {manual.enginesList.length} opciones
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {manual.enginesList.map((engine) => {
                          const isSelected = activeEngine.id === engine.id;
                          return (
                            <button
                              key={engine.id}
                              type="button"
                              onClick={() => {
                                setSelectedEnginesByBrand(prev => ({
                                  ...prev,
                                  [manual.id]: engine.id
                                }));
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                isSelected
                                  ? 'bg-red-600 text-white shadow-sm'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80'
                              }`}
                            >
                              <span>{engine.code}</span>
                              {isSelected && <span className="text-[10px] opacity-80">· Activo</span>}
                            </button>
                          );
                        })}
                      </div>

                      {/* Selected Engine Live Spec Preview */}
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-2">
                        <div>
                          <span className="font-extrabold text-xs text-slate-900 dark:text-white block">
                            {activeEngine.name}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                            Modelos: {activeEngine.models}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <span className="text-slate-400 text-[10px] block">Aceite Recomendado:</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate block">{activeEngine.oilViscosity}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 text-[10px] block">Capacidad Cárter:</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate block">{activeEngine.oilCapacity}</span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-[11px] leading-snug">
                          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-[10px] mb-1">
                            <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                            <span className="uppercase tracking-wider font-extrabold text-[10px] text-slate-700 dark:text-slate-300">Punto Clave de Protección:</span>
                          </div>
                          <p className="text-[10px] leading-relaxed text-slate-600 dark:text-slate-400">
                            {activeEngine.severeTip}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModalEngineId(activeEngine.id);
                        setModalTab('engine');
                        setActiveModalManual(manual);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Cpu size={13} className="text-red-500" />
                      <span>Ficha Técnica {activeEngine.code}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsApp(whatsappEngineMsg)}
                      className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer"
                      title={`Consultar por WhatsApp mantenimiento ${manual.brand} (${activeEngine.code})`}
                    >
                      <MessageCircle size={15} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* List Mode */
          <div className="space-y-4">
            {filteredManuales.map((manual) => {
              const activeEngine = getActiveEngine(manual);
              const whatsappEngineMsg = `Hola MasterTech, deseo agendar el servicio de mantenimiento bajo protocolo de alta exigencia para mi ${manual.brand} con motor ${activeEngine.name} (${activeEngine.code}).`;

              return (
                <div 
                  key={manual.id}
                  className="bg-white dark:bg-[#0c0f15] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${manual.badgeColor}`}>
                        {manual.badge}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        {manual.brand} <span className="text-xs font-semibold text-slate-400">({manual.years})</span>
                      </h3>
                    </div>

                    {/* Motor switcher in list */}
                    <div className="flex flex-wrap items-center gap-1.5 my-2">
                      <span className="text-[10px] font-bold text-slate-400">Motores:</span>
                      {manual.enginesList.map(e => {
                        const isSelected = activeEngine.id === e.id;
                        return (
                          <button
                            key={e.id}
                            type="button"
                            onClick={() => setSelectedEnginesByBrand(prev => ({ ...prev, [manual.id]: e.id }))}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-red-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {e.code}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span><strong>Motor activo:</strong> {activeEngine.name}</span>
                      <span>·</span>
                      <span><strong>Aceite:</strong> {activeEngine.oilViscosity} ({activeEngine.oilCapacity})</span>
                      <span>·</span>
                      <span className="text-red-500 font-bold">{activeEngine.severeInterval}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModalEngineId(activeEngine.id);
                        setModalTab('engine');
                        setActiveModalManual(manual);
                      }}
                      className="py-2 px-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Cpu size={14} className="text-red-500" />
                      <span>Ficha {activeEngine.code}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsApp(whatsappEngineMsg)}
                      className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all cursor-pointer"
                    >
                      <MessageCircle size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Interactive Modal Viewer with Engine Technical Sheet */}
      <AnimatePresence>
        {activeModalManual && (
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalManual(null)}
          >
            {(() => {
              const modalActiveEngine = activeModalManual.enginesList?.find(e => e.id === activeModalEngineId) || activeModalManual.enginesList?.[0];
              const modalWhatsappMsg = modalActiveEngine
                ? `Hola MasterTech, deseo agendar el servicio de mantenimiento bajo protocolo de alta exigencia para mi ${activeModalManual.brand} con motor ${modalActiveEngine.name} (${modalActiveEngine.code}).`
                : activeModalManual.whatsappMessage;

              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 20 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-[#0c0f15] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
                >
                  {/* Modal Header */}
                  <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white">
                          Recomendaciones Técnicas {activeModalManual.brand} ({activeModalManual.years})
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Pauta Oficial de Mantenimiento Preventivo · Protocolo de Uso Intensivo y Protección Térmica
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrintCurrent}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Imprimir o Guardar como PDF"
                      >
                        <Printer size={14} />
                        <span className="hidden sm:inline">Imprimir Ficha</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveModalManual(null)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Engine Selector Subbar & View Tabs */}
                  <div className="px-5 py-2.5 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
                    
                    {/* Engine Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 flex items-center gap-1">
                        <Fuel size={12} className="text-red-500" />
                        Motor:
                      </span>
                      <div className="flex items-center gap-1.5 flex-nowrap">
                        {activeModalManual.enginesList.map((eng) => {
                          const isSelected = (modalActiveEngine?.id === eng.id);
                          return (
                            <button
                              key={eng.id}
                              type="button"
                              onClick={() => {
                                setActiveModalEngineId(eng.id);
                                setModalTab('engine');
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-400/40'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 border border-slate-200/80 dark:border-slate-700'
                              }`}
                            >
                              <span>{eng.code}</span>
                              {isSelected && <span className="text-[10px] opacity-90">({eng.oilCapacity.split(' ')[0]})</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* View Switcher Tabs */}
                    <div className="flex items-center p-0.5 bg-slate-200 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => setModalTab('engine')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          modalTab === 'engine'
                            ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Cpu size={13} />
                        <span>Ficha del Motor ({modalActiveEngine?.code})</span>
                      </button>

                      {activeModalManual.htmlPath && (
                        <button
                          type="button"
                          onClick={() => setModalTab('document')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            modalTab === 'document'
                              ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <BookOpen size={13} />
                          <span>Manual Completo Marca</span>
                        </button>
                      )}
                    </div>

                  </div>

                  {/* Modal Body: Engine Sheet or Iframe */}
                  <div className="flex-1 bg-white dark:bg-[#07090e] overflow-y-auto relative">
                    
                    {modalTab === 'engine' && modalActiveEngine && (
                      <div className="p-5 sm:p-8 max-w-4xl mx-auto space-y-6">
                        
                        {/* Motor Hero Card */}
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-700">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                            <span className="px-2.5 py-1 rounded-lg bg-red-600 font-black text-xs uppercase tracking-wider text-white">
                              {modalActiveEngine.code}
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black">
                              Pauta Preventiva: {modalActiveEngine.severeInterval}
                            </span>
                          </div>

                          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                            {modalActiveEngine.name}
                          </h2>
                          <p className="text-xs text-slate-300 mt-1">
                            <strong>Arquitectura:</strong> {modalActiveEngine.displacement}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            <strong>Modelos Equipados:</strong> {modalActiveEngine.models}
                          </p>
                        </div>

                        {/* 4 Technical Capacities Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          
                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                              <Droplets size={12} className="text-red-500" />
                              Aceite de Motor
                            </span>
                            <span className="text-sm font-black text-slate-900 dark:text-white block leading-snug">
                              {modalActiveEngine.oilViscosity}
                            </span>
                            <span className="text-xs text-red-600 dark:text-red-400 font-bold block mt-1">
                              Capacidad: {modalActiveEngine.oilCapacity}
                            </span>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                              <Gauge size={12} className="text-blue-500" />
                              Transmisión Asignada
                            </span>
                            <span className="text-xs font-black text-slate-900 dark:text-white block leading-snug">
                              {modalActiveEngine.transmissionFluid}
                            </span>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                              <Fuel size={12} className="text-emerald-500" />
                              Alimentación & Encendido
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white block">
                              {modalActiveEngine.fuelSystem}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                              {modalActiveEngine.sparkPlugsOrGlow}
                            </span>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                              <Flame size={12} className="text-purple-500" />
                              Enfriamiento Motor
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white block leading-snug">
                              {modalActiveEngine.coolantSpec}
                            </span>
                          </div>

                        </div>

                        {/* Puntos Clave de Protección del Motor */}
                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
                          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                            <h3 className="text-sm font-black uppercase tracking-wider">
                              Puntos Clave de Protección & Rendimiento ({modalActiveEngine.code})
                            </h3>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {modalActiveEngine.severeTip}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                            {modalActiveEngine.criticalChecks.map((chk, i) => (
                              <div key={i} className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span className="text-xs font-black text-slate-900 dark:text-white block mb-1">
                                  {chk.title}
                                </span>
                                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                                  {chk.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Programa de Mantenimiento Kilómetro a Kilómetro */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                              <ClipboardList size={16} className="text-red-500" />
                              Programa de Servicios Recomendado ({modalActiveEngine.code})
                            </h3>
                            <span className="text-[11px] text-slate-500">Protocolo de Alta Exigencia · MasterTech</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {modalActiveEngine.schedule.map((item, idx) => (
                              <div key={idx} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between">
                                <div>
                                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[11px] inline-block mb-1.5">
                                    {item.km}
                                  </span>
                                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                                    {item.service}
                                  </h4>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                                    {item.criticalAction}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Torques de Apriete Oficiales */}
                        <div className="space-y-3">
                          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                            <Wrench size={16} className="text-red-500" />
                            Torques de Apriete de Taller ({modalActiveEngine.code})
                          </h3>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {modalActiveEngine.torques.map((t, i) => (
                              <div key={i} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-center">
                                <span className="text-[10px] font-bold text-slate-400 block truncate">{t.part}</span>
                                <span className="text-xs font-black text-red-600 dark:text-red-400 block mt-0.5">{t.spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {modalTab === 'document' && activeModalManual.htmlPath && (
                      <div className="w-full h-full relative">
                        {isLoadingHtml && !modalHtml && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 z-10">
                            <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin mb-3" />
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Cargando recomendaciones oficiales...
                            </p>
                          </div>
                        )}
                        <iframe
                          src={modalHtml ? undefined : activeModalManual.htmlPath}
                          srcDoc={modalHtml || undefined}
                          title={`Recomendaciones de Mantenimiento ${activeModalManual.brand}`}
                          className="w-full h-full border-0 min-h-[70vh]"
                          sandbox="allow-same-origin allow-scripts allow-modals allow-popups allow-forms"
                        />
                      </div>
                    )}

                  </div>

                  {/* Modal Bottom Bar */}
                  <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 shrink-0 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500">
                        © 2026 Taller MasterTech · Porlamar, Isla de Margarita
                      </span>
                      {modalActiveEngine && (
                        <span className="text-[11px] text-red-600 dark:text-red-400 font-bold">
                          · Ficha {modalActiveEngine.code} ({modalActiveEngine.oilViscosity})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleWhatsApp(modalWhatsappMsg)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <MessageCircle size={14} />
                        <span>Agendar Servicio {modalActiveEngine ? `(${modalActiveEngine.code})` : ''} vía WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
