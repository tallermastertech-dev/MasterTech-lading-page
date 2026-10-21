# Estandares de Arquitectura e Infraestructura

Directriz tecnica establecida para el desarrollo de landing pages y plataformas web:

---

## 1. Stack Tecnologico Principal

- **Base de Datos:** PostgreSQL
- **ORM:** Prisma ORM
- **Backend:** NestJS (Node.js framework modular)
- **Frontend:** React con Vite
- **Seguridad y Autenticacion:**
  - JSON Web Tokens (JWT) para sesion, tokens de acceso y refresco.
  - Firebase Authentication para Social Login (Google, etc.) en caso de requerirse inicio de sesion social.

---

## 2. Infraestructura y Despliegue en Servidor (VPS)

- **Alojamiento:** Servidor Privado Virtual (VPS Linux - Ubuntu Server recomendado)
- **Control de Versiones y Despliegue:** GitHub (CI/CD o webhook de despliegue mediante git pull)
- **Gestor de Procesos en Produccion:** PM2 para monitoreo, reinicio automatico y gestion de clusters en segundo plano
- **Seguridad Web y Cifrado:** Certificados SSL emitidos y autorenovados con Certbot (Let's Encrypt)
- **Servidor Web / Reverse Proxy:** Nginx proxy inverso hacia PM2 (puertos de la aplicacion) con configuracion SSL de Certbot

---

## 3. Protocolo de Implementacion

1. Toda landing o plataforma nueva o modulo que requiera persistencia y logica de backend debe apegarse a esta arquitectura.
2. Mantener esquema de base de datos modelado en schema.prisma.
3. El frontend React/Vite consumira los endpoints provistos por el backend NestJS con autenticacion basada en Bearer JWT.
4. Politica estricta de estilo y codigo: Cero emojis en codigo, comentarios, commits y documentacion.
