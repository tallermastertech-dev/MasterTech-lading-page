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

### Opcion C: Servidor VPS (GitHub + PM2 + Nginx + Certbot)

Estandar oficial de despliegue en VPS Linux:

1. **Clonar el proyecto desde GitHub en el VPS:**
   ```bash
   cd /var/www
   git clone https://github.com/tallermastertech-dev/MasterTech-lading-page.git tallermastertech
   cd tallermastertech
   npm install
   npm run build
   ```

2. **Configurar y gestionar la ejecucion con PM2:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "mastertech-web" -- run preview -- --port 3000 --host
   pm2 save
   pm2 startup
   ```

3. **Configuracion de Nginx como Reverse Proxy:**
   Archivo `/etc/nginx/sites-available/tallermastertech`:
   ```nginx
   server {
       listen 80;
       server_name tudominio.com www.tudominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
   Habilitar sitio y reiniciar Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/tallermastertech /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **Instalacion de Certificado SSL con Certbot (Let's Encrypt):**
   ```bash
   sudo apt update
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d tudominio.com -d www.tudominio.com
   ```
   Certbot configurara automaticamente la renovacion periodica y el cifrado HTTPS.

5. **Actualizaciones continuas desde GitHub:**
   ```bash
   git pull origin main
   npm install
   npm run build
   pm2 reload mastertech-web
   ```

---

## 4. Base de Datos Incluida

La carpeta `database/` de este repositorio incluye:
- `schema.sql`: Esquema DDL para PostgreSQL / Supabase.
- `schema_sqlite.sql`: Esquema DDL para SQLite 3.
- `seed_data.sql`: Sentencias SQL INSERT completas con los 24 productos, leads y configuraciones.
- `data_export.json`: Exportacion completa en JSON de todos los datos.
- `csv/`: Archivos CSV tabulares por entidad (repuestos, servicios, testimonios, configuraciones).
