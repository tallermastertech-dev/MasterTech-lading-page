-- ============================================================
-- MASTERTECH: BLINDAJE TOTAL DE ROW LEVEL SECURITY (RLS)
-- Ejecuta este script en el SQL Editor de tu Dashboard de Supabase
-- ============================================================

-- 1. ACTIVAR RLS EN TODAS LAS TABLAS
ALTER TABLE IF EXISTS public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vehiculos_taller ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.tareas_vehiculo ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.taller_control ENABLE ROW LEVEL SECURITY;

-- 2. ELIMINAR TODAS LAS POLÍTICAS INSEGURAS ANTERIORES (QUE PERMITÍAN SELECT/UPDATE/DELETE PÚBLICO)
DROP POLICY IF EXISTS "leads_insert_public" ON public.leads;
DROP POLICY IF EXISTS "leads_insert_all" ON public.leads;
DROP POLICY IF EXISTS "leads_select_service" ON public.leads;
DROP POLICY IF EXISTS "leads_select_all" ON public.leads;
DROP POLICY IF EXISTS "leads_update_service" ON public.leads;
DROP POLICY IF EXISTS "leads_update_all" ON public.leads;
DROP POLICY IF EXISTS "leads_delete_service" ON public.leads;
DROP POLICY IF EXISTS "leads_delete_all" ON public.leads;

DROP POLICY IF EXISTS "settings_select_public" ON public.settings;
DROP POLICY IF EXISTS "settings_select_all" ON public.settings;
DROP POLICY IF EXISTS "settings_insert_service" ON public.settings;
DROP POLICY IF EXISTS "settings_insert_all" ON public.settings;
DROP POLICY IF EXISTS "settings_update_service" ON public.settings;
DROP POLICY IF EXISTS "settings_update_all" ON public.settings;
DROP POLICY IF EXISTS "settings_delete_service" ON public.settings;
DROP POLICY IF EXISTS "settings_delete_all" ON public.settings;

-- 3. POLÍTICAS BLINDADAS PARA "leads"
-- El público NO PUEDE LEER (SELECT), NI MODIFICAR (UPDATE), NI BORRAR (DELETE).
-- Solo el Backend (Service Role) tiene acceso completo para gestionar citas y clientes.
CREATE POLICY "leads_service_role_all"
  ON public.leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. POLÍTICAS BLINDADAS PARA "settings"
-- Se bloquea la lectura directa para proteger ADMIN_USERS_JSON, ADMIN_PASSWORD,
-- PROVEEDORES_JSON, TALLER_CONTROL_JSON y AUDIT_LOGS_JSON.
-- Solo el Backend (Service Role) tiene acceso completo.
CREATE POLICY "settings_service_role_all"
  ON public.settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. POLÍTICAS BLINDADAS PARA TABLAS DEL TALLER
CREATE POLICY "vehiculos_taller_service_role_all"
  ON public.vehiculos_taller
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "tareas_vehiculo_service_role_all"
  ON public.tareas_vehiculo
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "taller_control_service_role_all"
  ON public.taller_control
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- VERIFICACIÓN: Comprueba que RLS esté activo en todas las tablas
-- ============================================================
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
