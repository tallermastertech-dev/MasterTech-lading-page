-- ====================================================================
-- TALLER MASTERTECH - ESQUEMA DDL PARA SQLITE
-- Motor compatible: SQLite 3.35+
-- Ubicacion: C:\Users\maste\OneDrive\Documents\TALLERMASTERTECH\schema_sqlite.sql
-- ====================================================================

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS configuracion (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clave TEXT NOT NULL UNIQUE,
  valor TEXT,
  descripcion TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicios_taller (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descripcion TEXT,
  duracion_estimada TEXT,
  precio_estimado_usd REAL DEFAULT 0.0,
  imagen TEXT,
  activo INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS productos_catalogo (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  precio_usd REAL NOT NULL,
  precio_regular_usd REAL,
  en_oferta INTEGER DEFAULT 0,
  etiqueta_descuento TEXT,
  descripcion_corta TEXT,
  descripcion_larga TEXT,
  marca_repuesto TEXT,
  numero_parte_oem TEXT,
  compatibilidad_texto TEXT,
  stock INTEGER DEFAULT 0,
  es_importado_usa INTEGER DEFAULT 1,
  imagen_principal TEXT,
  imagenes_adicionales_json TEXT,
  especificaciones_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS marcas_oem (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  etiqueta TEXT NOT NULL,
  origen TEXT,
  badge TEXT,
  color_css TEXT
);

CREATE TABLE IF NOT EXISTS vehiculos_marcas (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  origen TEXT
);

CREATE TABLE IF NOT EXISTS vehiculos_modelos (
  id INTEGER PRIMARY KEY,
  marca_id INTEGER NOT NULL REFERENCES vehiculos_marcas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS vehiculos_submodelos (
  id INTEGER PRIMARY KEY,
  modelo_id INTEGER NOT NULL REFERENCES vehiculos_modelos(id) ON DELETE CASCADE,
  nombre_submodelo TEXT NOT NULL,
  anios TEXT,
  codigo_chasis TEXT
);

CREATE TABLE IF NOT EXISTS vehiculos_motores (
  id INTEGER PRIMARY KEY,
  modelo_id INTEGER NOT NULL REFERENCES vehiculos_modelos(id) ON DELETE CASCADE,
  submodelo_id INTEGER REFERENCES vehiculos_submodelos(id) ON DELETE SET NULL,
  especificacion_motor TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leads_citas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT,
  vehiculo TEXT NOT NULL,
  servicio TEXT NOT NULL,
  fecha_cita TEXT,
  hora_cita TEXT,
  status TEXT DEFAULT 'Pendiente',
  placa TEXT,
  anio TEXT,
  ubicacion TEXT,
  falla TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bahias_taller (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero_bahia INTEGER NOT NULL UNIQUE,
  tipo_bahia TEXT NOT NULL,
  mecanico_asignado TEXT,
  estado TEXT DEFAULT 'Disponible'
);

CREATE TABLE IF NOT EXISTS vehiculos_en_taller (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bahia_id INTEGER REFERENCES bahias_taller(id) ON DELETE SET NULL,
  placa TEXT NOT NULL,
  cliente_nombre TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  anio TEXT,
  mecanico_nombre TEXT,
  motivo_ingreso TEXT,
  estado_reparacion TEXT DEFAULT 'espera_tecnico',
  prioridad TEXT DEFAULT 'media',
  notas_internas TEXT,
  fecha_ingreso DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_estimada_entrega DATETIME
);

CREATE TABLE IF NOT EXISTS tareas_reparacion (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vehiculo_taller_id INTEGER NOT NULL REFERENCES vehiculos_en_taller(id) ON DELETE CASCADE,
  descripcion TEXT NOT NULL,
  completada INTEGER DEFAULT 0,
  estado TEXT DEFAULT 'pendiente'
);

CREATE TABLE IF NOT EXISTS equipo_taller (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL,
  desc_experiencia TEXT,
  foto TEXT
);

CREATE TABLE IF NOT EXISTS testimonios_clientes (
  id INTEGER PRIMARY KEY,
  cliente_nombre TEXT NOT NULL,
  vehiculo TEXT,
  comentario TEXT NOT NULL,
  calificacion INTEGER DEFAULT 5,
  fecha TEXT
);

CREATE TABLE IF NOT EXISTS proveedores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  contacto TEXT,
  telefono TEXT,
  categoria TEXT,
  pais TEXT,
  notas TEXT
);

CREATE TABLE IF NOT EXISTS recordatorios_mantenimiento (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  vehiculo TEXT NOT NULL,
  servicio TEXT NOT NULL,
  proxima_fecha TEXT NOT NULL,
  estado TEXT DEFAULT 'programado'
);

CREATE TABLE IF NOT EXISTS pedidos_catalogo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero_pedido TEXT NOT NULL UNIQUE,
  cliente_nombre TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  metodo_contacto TEXT DEFAULT 'WhatsApp',
  estado_pedido TEXT DEFAULT 'recibido',
  total_usd REAL DEFAULT 0.0,
  fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
  notas TEXT
);

CREATE TABLE IF NOT EXISTS pedidos_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id INTEGER NOT NULL REFERENCES pedidos_catalogo(id) ON DELETE CASCADE,
  producto_id INTEGER REFERENCES productos_catalogo(id),
  titulo_producto TEXT NOT NULL,
  cantidad INTEGER NOT NULL DEFAULT 1,
  precio_unitario_usd REAL NOT NULL,
  subtotal_usd REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS logs_auditoria (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  accion TEXT NOT NULL,
  categoria TEXT NOT NULL,
  usuario_nombre TEXT,
  usuario_email TEXT,
  detalles TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sq_prod_cat ON productos_catalogo(categoria);
CREATE INDEX IF NOT EXISTS idx_sq_prod_marca ON productos_catalogo(marca_repuesto);
CREATE INDEX IF NOT EXISTS idx_sq_veh_mod_marca ON vehiculos_modelos(marca_id);
CREATE INDEX IF NOT EXISTS idx_sq_veh_sub_mod ON vehiculos_submodelos(modelo_id);
CREATE INDEX IF NOT EXISTS idx_sq_veh_mot_mod ON vehiculos_motores(modelo_id);
CREATE INDEX IF NOT EXISTS idx_sq_leads_stat ON leads_citas(status);
CREATE INDEX IF NOT EXISTS idx_sq_leads_fec ON leads_citas(created_at);
CREATE INDEX IF NOT EXISTS idx_sq_veh_taller_bahia ON vehiculos_en_taller(bahia_id);
CREATE INDEX IF NOT EXISTS idx_sq_tareas_veh ON tareas_reparacion(vehiculo_taller_id);
