# Guia de Despliegue - Taller MasterTech

Este repositorio contiene la pagina web oficial de Taller MasterTech, su catalogo con los 24 repuestos reales, servicios tecnicos, panel administrativo y la copia completa de la base de datos.

---

## 1. Requisitos Previos

- Node.js version 18 o superior.
- Gestor de paquetes npm o yarn.

---

## 2. Instalacion y Compilacion Local

Para probar o compilar el proyecto en cualquier computadora o servidor:

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (opcional si usas datos locales precargados)
cp .env.example .env

# 3. Iniciar entorno de desarrollo
npm run dev

# 4. Compilar para produccion
npm run build
```

El resultado compilado para produccion se generara en la carpeta `dist/`.

---

## 3. Opciones de Despliegue

### Opcion A: Hosting Estatico / Jamstack (Vercel, Netlify, Cloudflare Pages)

Esta es la opcion mas recomendada por velocidad y costo cero:

1. Conecta el repositorio de GitHub a tu cuenta de Vercel o Netlify.
2. Parametros de configuracion en el panel de hosting:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Variables de entorno (en los ajustes del hosting):
   - `VITE_SUPABASE_URL`: URL de tu proyecto Supabase.
   - `VITE_SUPABASE_ANON_KEY`: Clave publica anonima de Supabase.
   *(Nota: Si no se configuran estas variables, la web utiliza automaticamente el catalogo precargado con los 24 repuestos reales y servicios incorporados en el codigo fuente).*

---

### Opcion B: Hosting Tradicional (cPanel, Hostinger, GoDaddy, Apache, Nginx)

1. En tu computadora, ejecuta:
   ```bash
   npm run build
   ```
2. Entra en la carpeta `dist/` generada.
3. Sube todos los archivos y subcarpetas que estan dentro de `dist/` al directorio raiz de tu servidor web (usualmente `public_html/` o `/var/www/html/`).
4. Si usas Apache, asegurate de incluir una regla de reescritura para rutas SPA en `.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

### Opcion C: Servidor VPS con Nginx

Configuracion recomendada para `/etc/nginx/sites-available/tallermastertech`:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    root /var/www/tallermastertech/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 4. Base de Datos Incluida

La carpeta `database/` de este repositorio incluye:
- `schema.sql`: Esquema DDL para PostgreSQL / Supabase.
- `schema_sqlite.sql`: Esquema DDL para SQLite 3.
- `seed_data.sql`: Sentencias SQL INSERT completas con los 24 productos, leads y configuraciones.
- `data_export.json`: Exportacion completa en JSON de todos los datos.
- `csv/`: Archivos CSV tabulares por entidad (repuestos, servicios, testimonios, configuraciones).
