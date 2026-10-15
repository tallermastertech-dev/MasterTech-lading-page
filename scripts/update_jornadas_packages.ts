import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Faltan credenciales de Supabase en .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function updateJornadas() {
  const { data, error } = await supabase.from('settings').select('*').eq('key', 'JORNADAS_JSON').single();
  if (error || !data) {
    console.error('Error al obtener JORNADAS_JSON:', error);
    return;
  }

  const jornadas = JSON.parse(data.value);
  if (!Array.isArray(jornadas) || jornadas.length === 0) {
    console.error('JORNADAS_JSON no es un arreglo valido');
    return;
  }

  // Actualizar los 3 paquetes especificos de la Jornada
  jornadas[0].packages = [
    {
      id: "pkg_m20_1791391108317",
      name: "Corolla, RAV4, Camry, Levin",
      subtitle: "Motor 2.0L / 2.5L (M20A-FKS / A25A-FKS no híbrido)",
      regularPrice: "$1,079 USD",
      promoPrice: "$698 USD",
      discountBadge: "AHORRAS $381 USD"
    },
    {
      id: "pkg_t24a_1791391108317",
      name: "Tacoma, 4Runner, Highlander, Lexus RX / TX",
      subtitle: "Motor 2.4L Turbo (T24A-FTS no híbrido)",
      regularPrice: "$1,944 USD",
      promoPrice: "$1,299 USD",
      discountBadge: "AHORRAS $645 USD"
    },
    {
      id: "pkg_v35a_1791391108317",
      name: "Tundra, Land Cruiser 300, Sequoia, Lexus LX",
      subtitle: "Motor 3.5L Twin-Turbo (V35A-FTS no híbrido)",
      regularPrice: "$2,200 USD",
      promoPrice: "$1,499 USD",
      discountBadge: "AHORRAS $701 USD"
    }
  ];

  const updatedJson = JSON.stringify(jornadas);
  const { error: updateErr } = await supabase
    .from('settings')
    .update({ value: updatedJson })
    .eq('key', 'JORNADAS_JSON');

  if (updateErr) {
    console.error('Error actualizando JORNADAS_JSON en Supabase:', updateErr);
    return;
  }

  console.log('JORNADAS_JSON actualizado exitosamente en Supabase con la separacion correcta de modelos y motores.');
}

updateJornadas();
