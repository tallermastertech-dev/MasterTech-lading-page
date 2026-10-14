# Diccionario de Datos - Taller MasterTech

Sistema de base de datos relacional disenado para la plataforma web y la operacion tecnica de Taller MasterTech (Porlamar, Isla de Margarita).

## Resumen del Modelo Relacional

El modelo soporta tanto entornos SQLite embebidos y de desarrollo local, como entornos de produccion en PostgreSQL y Supabase con Row Level Security (RLS).

---

## 1. Tabla: configuracion (Settings del Sistema)

Almacena todos los parametros dinamicos de la plataforma web, garantizando persistencia y administracion en caliente sin recompilar el codigo fuente.

| Columna | Tipo SQLite | Tipo PostgreSQL | Nulo | Clave | Descripcion |
|---|---|---|---|---|---|
| id | INTEGER | BIGSERIAL | NO | PK | Identificador correlativo unico |
| clave | TEXT | TEXT | NO | UNIQUE | Nombre identificador de la variable (ej. PHONE_NUMBER, IS_OPEN) |
| valor | TEXT | TEXT | SI | | Contenido de la variable en texto plano o JSON serializado |
| descripcion | TEXT | TEXT | SI | | Proposito operativo de la variable en el sistema |
| updated_at | DATETIME | TIMESTAMPTZ | NO | | Momento de la ultima modificacion |

---

## 2. Tabla: productos_catalogo (Inventario de Partes y Repuestos)

Gestiona el catalogo comercial de repuestos automotrices, kits OEM, lubricantes y consumibles.

| Columna | Tipo SQLite | Tipo PostgreSQL | Nulo | Clave | Descripcion |
|---|---|---|---|---|---|
| id | INTEGER | BIGINT | NO | PK | Identificador unico del producto |
| titulo | TEXT | TEXT | NO | | Titulo comercial detallado del repuesto |
| categoria | TEXT | TEXT | NO | INDEX | Categoria operativa (Frenos, Suspension, Lubricantes, etc.) |
| precio_usd | REAL | NUMERIC(10,2) | NO | | Precio de venta final en dolares estadounidenses |
| precio_regular_usd | REAL | NUMERIC(10,2) | SI | | Precio previo de referencia en ofertas especiales |
| en_oferta | INTEGER | BOOLEAN | NO | | Indicador binario si el repuesto tiene promocion activa |
| etiqueta_descuento | TEXT | TEXT | SI | | Badge publicitario (ej. AHORRAS $45 USD) |
| descripcion_corta | TEXT | TEXT | SI | | Resumen ejecutivo de la pieza |
| descripcion_larga | TEXT | TEXT | SI | | Ficha tecnica, materiales y recomendaciones de uso |
| marca_repuesto | TEXT | TEXT | SI | INDEX | Fabricante o linea OEM (Brembo, Toyota Genuine, Mopar, Bosch) |
| numero_parte_oem | TEXT | TEXT | SI | | Codigo o referencia internacional del fabricante OEM |
| compatibilidad_texto | TEXT | TEXT | SI | | Resumen textual de vehiculos compatibles |
| stock | INTEGER | INTEGER | NO | | Unidades fisicas disponibles en inventario de taller |
| es_importado_usa | INTEGER | BOOLEAN | NO | | Indica si la pieza proviene de importacion directa de USA |
| imagen_principal | TEXT | TEXT | SI | | Ruta de la fotografia principal |
| imagenes_adicionales_json | TEXT | JSONB | SI | | Arreglo de imagenes secundarias |
| especificaciones_json | TEXT | JSONB | SI | | Arreglo de caracteristicas tecnicas destacadas |
| created_at | DATETIME | TIMESTAMPTZ | NO | | Fecha de alta en el catalogo |

---

## 3. Tablas de Compatibilidad de Vehiculos (Selector Multinivel)

Estructura normalizada de cuatro niveles que permite validar si un repuesto aplica con precision milimetrica a un vehiculo.

### 3.1 vehiculos_marcas
| Columna | Tipo | Nulo | Clave | Descripcion |
|---|---|---|---|---|
| id | INTEGER / BIGINT | NO | PK | Identificador de la marca de automovil |
| nombre | TEXT | NO | UNIQUE | Nombre oficial (Toyota, Jeep, Ford, Chevrolet, etc.) |
| origen | TEXT | SI | | Region industrial (Japon, USA, Corea del Sur) |

### 3.2 vehiculos_modelos
| Columna | Tipo | Nulo | Clave | Descripcion |
|---|---|---|---|---|
| id | INTEGER / BIGINT | NO | PK | Identificador del modelo |
| marca_id | INTEGER / BIGINT | NO | FK | Referencia a vehiculos_marcas(id) |
| nombre | TEXT | NO | INDEX | Nombre del modelo (Corolla, 4Runner, Grand Cherokee) |

### 3.3 vehiculos_submodelos
| Columna | Tipo | Nulo | Clave | Descripcion |
|---|---|---|---|---|
| id | INTEGER / BIGINT | NO | PK | Identificador de la generacion o submodelo |
| modelo_id | INTEGER / BIGINT | NO | FK | Referencia a vehiculos_modelos(id) |
| nombre_submodelo | TEXT | NO | | Nombre o codigo de serie (WK2, 5ta Generacion, etc.) |
| anios | TEXT | SI | | Rango de fabricacion (ej. 2011-2022) |
| codigo_chasis | TEXT | SI | | Codigo de plataforma o chasis de fabrica |

### 3.4 vehiculos_motores
| Columna | Tipo | Nulo | Clave | Descripcion |
|---|---|---|---|---|
| id | INTEGER / BIGINT | NO | PK | Identificador de la configuracion de motor |
| modelo_id | INTEGER / BIGINT | NO | FK | Referencia a vehiculos_modelos(id) |
| submodelo_id | INTEGER / BIGINT | SI | FK | Referencia a vehiculos_submodelos(id) |
| especificacion_motor | TEXT | NO | | Cilindrada, valvulas y tipo (ej. 5.7L V8 HEMI MDS VVT) |

---

## 4. Tabla: servicios_taller (Portafolio de Servicios Tecnicos)

Catalogo maestro de servicios tecnicos ofrecidos por el taller en sus instalaciones fisicas.

| Columna | Tipo | Nulo | Clave | Descripcion |
|---|---|---|---|---|
| id | INTEGER / BIGSERIAL | NO | PK | Identificador unico |
| codigo | TEXT | NO | UNIQUE | Clave alfanumerica interna (mecanica, diagnostico, frenos) |
| titulo | TEXT | NO | | Nombre formal del servicio |
| categoria | TEXT | NO | | Area del taller encargada |
| descripcion | TEXT | SI | | Alcance tecnico y procedimientos incluidos |
| duracion_estimada | TEXT | SI | | Tiempo estandar de ejecucion en bahia |
| precio_estimado_usd | REAL / NUMERIC | SI | | Tarifa base estimada |
| imagen | TEXT | SI | | Fotografia de referencia |
| activo | INTEGER / BOOLEAN | NO | | Bandera de disponibilidad |

---

## 5. Tabla: leads_citas (Recepcion de Citas y Clientes Web)

Registra todas las solicitudes entrantes desde los formularios de agendamiento de la web.

| Columna | Tipo | Nulo | Clave | Descripcion |
|---|---|---|---|---|
| id | INTEGER / BIGSERIAL | NO | PK | Identificador unico de la cita |
| nombre | TEXT | NO | | Nombre y apellido del propietario |
| telefono | TEXT | NO | | Numero telefonico de contacto WhatsApp |
| email | TEXT | SI | | Correo electronico |
| vehiculo | TEXT | NO | | Marca, modelo y caracteristicas del carro |
| servicio | TEXT | NO | | Servicio requerido por el cliente |
| fecha_cita | TEXT / DATE | SI | | Fecha seleccionada para asistir |
| hora_cita | TEXT | SI | | Horario o bloque agendado |
| status | TEXT | NO | INDEX | Estado: Pendiente, En Contacto, En Taller, Completado, Cancelado |
| placa | TEXT | SI | | Matricula del vehiculo |
| anio | TEXT | SI | | Anio del carro |
| ubicacion | TEXT | SI | | Municipio o zona de residencia en Margarita |
| falla | TEXT | SI | | Sintomas o desperfecto reportado |
| notes | TEXT | SI | | Observaciones internas del asesor de servicio |
| created_at | DATETIME / TIMESTAMPTZ | NO | INDEX | Marca de tiempo del registro |

---

## 6. Control Operativo de Taller (Bahias, Vehiculos y Tareas)

### 6.1 bahias_taller
Bahias fisicas de trabajo en las instalaciones de Porlamar.
- **id**: Identificador primario.
- **numero_bahia**: Numero de bahia fisica (1 al 6).
- **tipo_bahia**: Elevador hidraulico, bahia de diagnostico, climatizacion, etc.
- **mecanico_asignado**: Nombre del mecanico responsable del puesto.
- **estado**: Disponible, Ocupada, Mantenimiento.

### 6.2 vehiculos_en_taller
Vehiculos que han ingresado formalmente y estan siendo intervenidos.
- **id**: Identificador unico.
- **bahia_id**: Referencia a la bahia donde se encuentra estacionado.
- **placa**: Placa del automovil.
- **cliente_nombre**: Propietario.
- **cliente_telefono**: Telefono de notificacion.
- **marca**, **modelo**, **anio**: Datos de ficha tecnica.
- **mecanico_nombre**: Tecnico asignado.
- **motivo_ingreso**: Descripcion de la reparacion contratada.
- **estado_reparacion**: espera_tecnico, diagnostico, en_proceso, control_calidad, listo_entrega.
- **prioridad**: baja, media, alta, urgente.
- **notas_internas**: Indicaciones confidenciales del jefe de taller.

### 6.3 tareas_reparacion
Desglose de tareas de la orden de trabajo para cada vehiculo.
- **id**: Identificador primario.
- **vehiculo_taller_id**: Llave foranea hacia vehiculos_en_taller(id).
- **descripcion**: Accion tecnica individual (ej. Rectificar discos, cambiar terminal).
- **completada**: Indicador 1 o 0 de avance.
- **estado**: pendiente, en_proceso, completado.

---

## 7. Tablas Complementarias

- **marcas_oem**: Proveedores internacionales de equipo original (Toyota Genuine, Mopar, Bosch, Denso, K&N, NGK, Brembo).
- **equipo_taller**: Directorio de la directiva y tecnicos de MasterTech.
- **testimonios_clientes**: Resenas verificadas de clientes con calificacion 1-5 estrellas.
- **proveedores**: Directorio de suplidores locales e internacionales en Miami.
- **recordatorios_mantenimiento**: Cronograma de avisos preventivos para fidelizacion.
- **pedidos_catalogo** y **pedidos_items**: Registro de ordenes y compras realizadas desde el catalogo web.
- **logs_auditoria**: Historial de seguridad de cambios de parametros y altas en el sistema.
