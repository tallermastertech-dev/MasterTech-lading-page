import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function run() {
  const { data, error } = await supabase.from('settings').select('*');
  if (error) {
    console.error('Error fetching settings:', error);
    return;
  }
  console.log('Total settings count in Supabase:', data.length);
  const emptyKeys: string[] = [];
  const activeKeys: { key: string; preview: string }[] = [];

  for (const row of data) {
    const val = (row.value || '').trim();
    if (!val || val === '[]' || val === '{}' || val === '""') {
      emptyKeys.push(row.key);
    } else {
      activeKeys.push({ key: row.key, preview: val.length > 50 ? val.substring(0, 50) + '...' : val });
    }
  }

  console.log('\n--- EMPTY / UNUSED KEYS (' + emptyKeys.length + ') ---');
  console.log(JSON.stringify(emptyKeys, null, 2));

  console.log('\n--- ACTIVE KEYS (' + activeKeys.length + ') ---');
  console.log(JSON.stringify(activeKeys, null, 2));
}

run();
