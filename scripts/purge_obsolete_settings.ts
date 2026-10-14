import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const obsoleteKeys = [
  "BANNER_TEXT",
  "FAQS_JSON",
  "PROVEEDORES_JSON",
  "PROMO_REPUESTO_3",
  "PROMO_REPUESTO_2",
  "PROMO_BAR_BADGE_TEXT",
  "CATALOG_HERO_IMG_2",
  "CATALOG_HERO_IMG_3",
  "CATALOG_HERO_IMG_4",
  "CATALOG_HERO_IMG_5",
  "CATALOG_HERO_TITLE",
  "PROMO_SECTION_BADGE",
  "CATALOG_HERO_SUBTITLE",
  "CATALOG_HERO_BADGE",
  "PROMO_IMG_FRENOS",
  "PROMO_1_TAG",
  "PROMO_1_TITLE_1",
  "PROMO_1_TITLE_2",
  "PROMO_1_DESC",
  "PROMO_1_BTN",
  "PROMO_IMG_SUSPENSION",
  "PROMO_2_TAG",
  "PROMO_2_TITLE_1",
  "PROMO_2_TITLE_2",
  "PROMO_2_DESC",
  "PROMO_2_BTN",
  "PROMO_IMG_MOTOR",
  "PROMO_3_TAG",
  "PROMO_3_TITLE_1",
  "PROMO_3_TITLE_2",
  "PROMO_3_DESC",
  "PROMO_3_BTN",
  "PROMO_SECTION_TITLE_JORNADAS",
  "PROMO_SECTION_DESC_JORNADAS",
  "PROMO_SECTION_TITLE_REPUESTOS",
  "PROMO_SECTION_DESC_REPUESTOS",
  "PROMO_BAR_BTN_TEXT",
  "PROMO_BAR_LINK_TEXT"
];

async function purge() {
  console.log(`Starting purge of ${obsoleteKeys.length} obsolete / empty keys from Supabase settings...`);
  
  const { data: beforeData, error: beforeErr } = await supabase.from('settings').select('key');
  if (beforeErr) {
    console.error('Error fetching before purge:', beforeErr);
    return;
  }
  console.log(`Total keys before purge: ${beforeData.length}`);

  const { data, error } = await supabase
    .from('settings')
    .delete()
    .in('key', obsoleteKeys);

  if (error) {
    console.error('Error deleting obsolete keys:', error);
    return;
  }

  const { data: afterData, error: afterErr } = await supabase.from('settings').select('key, value');
  if (afterErr) {
    console.error('Error fetching after purge:', afterErr);
    return;
  }

  console.log(`Successfully purged obsolete keys!`);
  console.log(`Total active keys remaining in Supabase: ${afterData.length}`);
  console.log('Remaining active keys:');
  afterData.forEach(row => {
    const preview = (row.value || '').substring(0, 40).replace(/\n/g, ' ');
    console.log(` - ${row.key}: ${preview}...`);
  });
}

purge();
