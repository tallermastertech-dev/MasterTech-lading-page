-- ====================================================================
-- TALLER MASTERTECH - ESQUEMA DE BASE DE DATOS COMPLETO
-- Motor compatible: PostgreSQL 14+ / Supabase
-- Ubicacion: C:\Users\maste\OneDrive\Documents\TALLERMASTERTECH\schema.sql
-- ====================================================================

-- 1. TABLA: configuracion (Settings dinamicos del sitio web)
CREATE TABLE IF NOT EXISTS public.configuracion (
    id BIGSERIAL PRIMARY KEY,
    clave TEXT NOT NULL UNIQUE,
    valor TEXT,
    descripcion TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TABLA: servicios_taller (Catalogo de servicios ofrecidos)
CREATE TABLE IF NOT EXISTS public.servicios_taller (
    id BIGSERIAL PRIMARY KEY,
    codigo TEXT NOT NULL UNIQUE,
    titulo TEXT NOT NULL,
    categoria TEXT NOT NULL,
    descripcion TEXT,
    duracion_estimada TEXT,
    precio_estimado_usd NUMERIC(10,2) DEFAULT 0.00,
    imagen TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABLA: productos_catalogo (Catalogo de repuestos y partes OEM)
CREATE TABLE IF NOT EXISTS public.productos_catalogo (
    id BIGINT PRIMARY KEY,
    titulo TEXT NOT NULL,
    categoria TEXT NOT NULL,
    precio_usd NUMERIC(10,2) NOT NULL,
    precio_regular_usd NUMERIC(10,2),
    en_oferta BOOLEAN DEFAULT FALSE,
    etiqueta_descuento TEXT,
    descripcion_corta TEXT,
    descripcion_larga TEXT,
    marca_repuesto TEXT,
    numero_parte_oem TEXT,
    compatibilidad_texto TEXT,
    stock INTEGER DEFAULT 0,
    es_importado_usa BOOLEAN DEFAULT TRUE,
    imagen_principal TEXT,
    imagenes_adicionales_json JSONB DEFAULT '[]'::jsonb,
    especificaciones_json JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLA: marcas_oem (Fabricantes y marcas de repuestos certificados)
CREATE TABLE IF NOT EXISTS public.marcas_oem (
    id BIGINT PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE,
    etiqueta TEXT NOT NULL,
    origen TEXT,
    badge TEXT,
    color_css TEXT
);

-- 5. TABLAS NORMALIZADAS DE VEHICULOS (Selector de compatibilidad)
CREATE TABLE IF NOT EXISTS public.vehiculos_marcas (
    id BIGINT PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE,
    origen TEXT
);

CREATE TABLE IF NOT EXISTS public.vehiculos_modelos (
    id BIGINT PRIMARY KEY,
    marca_id BIGINT NOT NULL REFERENCES public.vehiculos_marcas(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.vehiculos_submodelos (
    id BIGINT PRIMARY KEY,
    modelo_id BIGINT NOT NULL REFERENCES public.vehiculos_modelos(id) ON DELETE CASCADE,
    nombre_submodelo TEXT NOT NULL,
    anios TEXT,
    codigo_chasis TEXT
);

CREATE TABLE IF NOT EXISTS public.vehiculos_motores (
    id BIGINT PRIMARY KEY,
    modelo_id BIGINT NOT NULL REFERENCES public.vehiculos_modelos(id) ON DELETE CASCADE,
    submodelo_id BIGINT REFERENCES public.vehiculos_submodelos(id) ON DELETE SET NULL,
    especificacion_motor TEXT NOT NULL
);

-- 6. TABLA: leads_citas (Solicitudes de citas recibidas desde la web)
CREATE TABLE IF NOT EXISTS public.leads_citas (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT,
    vehiculo TEXT NOT NULL,
    servicio TEXT NOT NULL,
    fecha_cita DATE,
    hora_cita TEXT,
    status TEXT NOT NULL DEFAULT 'Pendiente',
    placa TEXT,
    anio TEXT,
    ubicacion TEXT,
    falla TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. CONTROL DE TALLER: Bahias y Vehiculos activos
CREATE TABLE IF NOT EXISTS public.bahias_taller (
    id BIGSERIAL PRIMARY KEY,
    numero_bahia INTEGER NOT NULL UNIQUE,
    tipo_bahia TEXT NOT NULL,
    mecanico_asignado TEXT,
    estado TEXT NOT NULL DEFAULT 'Disponible'
);

CREATE TABLE IF NOT EXISTS public.vehiculos_en_taller (
    id BIGSERIAL PRIMARY KEY,
    bahia_id BIGINT REFERENCES public.bahias_taller(id) ON DELETE SET NULL,
    placa TEXT NOT NULL,
    cliente_nombre TEXT NOT NULL,
    cliente_telefono TEXT NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    anio TEXT,
    mecanico_nombre TEXT,
    motivo_ingreso TEXT,
    estado_reparacion TEXT NOT NULL DEFAULT 'espera_tecnico',
    prioridad TEXT NOT NULL DEFAULT 'media',
    notas_internas TEXT,
    fecha_ingreso TIMESTAMPTZ DEFAULT NOW(),
    fecha_estimada_entrega TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.tareas_reparacion (
    id BIGSERIAL PRIMARY KEY,
    vehiculo_taller_id BIGINT NOT NULL REFERENCES public.vehiculos_en_taller(id) ON DELETE CASCADE,
    descripcion TEXT NOT NULL,
    completada BOOLEAN DEFAULT FALSE,
    estado TEXT DEFAULT 'pendiente'
);

-- 8. TABLA: equipo_taller (Directiva, mecanicos y personal tecnico)
CREATE TABLE IF NOT EXISTS public.equipo_taller (
    id BIGINT PRIMARY KEY,
    nombre TEXT NOT NULL,
    rol TEXT NOT NULL,
    desc_experiencia TEXT,
    foto TEXT
);

-- 9. TABLA: testimonios_clientes (Resenas reales)
CREATE TABLE IF NOT EXISTS public.testimonios_clientes (
    id BIGINT PRIMARY KEY,
    cliente_nombre TEXT NOT NULL,
    vehiculo TEXT,
    comentario TEXT NOT NULL,
    calificacion INTEGER DEFAULT 5,
    fecha DATE DEFAULT CURRENT_DATE
);

-- 10. TABLA: proveedores (Logistica y cadenas de suministro)
CREATE TABLE IF NOT EXISTS public.proveedores (
    id BIGSERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    contacto TEXT,
    telefono TEXT,
    categoria TEXT,
    pais TEXT,
    notas TEXT
);

-- 11. TABLA: recordatorios_mantenimiento
CREATE TABLE IF NOT EXISTS public.recordatorios_mantenimiento (
    id BIGSERIAL PRIMARY KEY,
    cliente_nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    vehiculo TEXT NOT NULL,
    servicio TEXT NOT NULL,
    proxima_fecha DATE NOT NULL,
    estado TEXT DEFAULT 'programado'
);

-- 12. TABLAS: pedidos_catalogo y pedidos_items
CREATE TABLE IF NOT EXISTS public.pedidos_catalogo (
    id BIGSERIAL PRIMARY KEY,
    numero_pedido TEXT NOT NULL UNIQUE,
    cliente_nombre TEXT NOT NULL,
    cliente_telefono TEXT NOT NULL,
    metodo_contacto TEXT DEFAULT 'WhatsApp',
    estado_pedido TEXT DEFAULT 'recibido',
    total_usd NUMERIC(10,2) DEFAULT 0.00,
    fecha_pedido TIMESTAMPTZ DEFAULT NOW(),
    notas TEXT
);

CREATE TABLE IF NOT EXISTS public.pedidos_items (
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL REFERENCES public.pedidos_catalogo(id) ON DELETE CASCADE,
    producto_id BIGINT REFERENCES public.productos_catalogo(id),
    titulo_producto TEXT NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1,
    precio_unitario_usd NUMERIC(10,2) NOT NULL,
    subtotal_usd NUMERIC(10,2) NOT NULL
);

-- 13. TABLA: logs_auditoria
CREATE TABLE IF NOT EXISTS public.logs_auditoria (
    id BIGSERIAL PRIMARY KEY,
    accion TEXT NOT NULL,
    categoria TEXT NOT NULL,
    usuario_nombre TEXT,
    usuario_email TEXT,
    detalles TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- INDICES PARA OPTIMIZACION DE BUSQUEDAS
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_prod_cat ON public.productos_catalogo(categoria);
CREATE INDEX IF NOT EXISTS idx_prod_marca ON public.productos_catalogo(marca_repuesto);
CREATE INDEX IF NOT EXISTS idx_veh_mod_marca ON public.vehiculos_modelos(marca_id);
CREATE INDEX IF NOT EXISTS idx_veh_sub_mod ON public.vehiculos_submodelos(modelo_id);
CREATE INDEX IF NOT EXISTS idx_veh_mot_mod ON public.vehiculos_motores(modelo_id);
CREATE INDEX IF NOT EXISTS idx_leads_stat ON public.leads_citas(status);
CREATE INDEX IF NOT EXISTS idx_leads_fec ON public.leads_citas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_veh_taller_bahia ON public.vehiculos_en_taller(bahia_id);
CREATE INDEX IF NOT EXISTS idx_tareas_veh ON public.tareas_reparacion(vehiculo_taller_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_num ON public.pedidos_catalogo(numero_pedido);
