# EPSIG Consultores — sitio web

Web corporativa de EPSIG Consultores construida con Next.js (App Router), TypeScript y Tailwind CSS v4.
Producción: [https://epsigconsultores.com](https://epsigconsultores.com) (servidor Plesk).

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # y rellena las variables de correo si quieres probar el formulario
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> **Nota (Windows):** si `npm run dev` o `next telemetry` fallan con `EXDEV: cross-device link not permitted`,
> es porque `%APPDATA%` no está en la misma unidad que este proyecto. Ejecuta los comandos con
> `APPDATA` apuntando a una carpeta del mismo disco, por ejemplo:
> `APPDATA='D:\ruta\al\proyecto\.appdata' npm run dev` (Git Bash) o el equivalente en PowerShell.

Antes de subir cambios: `npm run lint` y `npm run build` sin errores.

## Estructura

- `src/app/` — rutas (App Router):
  - Inicio, `/nosotros`, `/contacto` (+ `/contacto/enviado` y `/contacto/error`).
  - `/servicios` y sus subpáginas: `odoo`, `consultoria-empresarial`, `transformacion-digital` y
    `proteccion-del-negocio` (ciberseguridad).
  - Asesoría: `/economico-financiero`, `/laboral`, `/fiscal-contable`.
  - `/software` y sus subpáginas: `control-electrico-camping`, `viviendas-tuteladas`, `conectores`.
  - `/kit-digital` y `/kit-consulting`, con una página por categoría (`[slug]`).
  - Páginas legales (`/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies`),
    `sitemap.ts` y `robots.ts`.
- `src/app/api/contacto/route.ts` — recibe el formulario de contacto (antispam, límite de envíos
  por IP y solo desde el propio dominio) y envía el correo con `src/lib/mailer.ts`.
- `src/lib/site.ts` — datos de la empresa (contacto, oficinas, datos legales, servicios, software,
  Kit Digital / Kit Consulting) y los menús: `primaryNav` (cabecera: `label` = título,
  `description` = subtítulo del desplegable) y `footerNav` (pie de página).
- `src/components/` — componentes compartidos (menú, pie, secciones de la home, formulario,
  banner de cookies, Google Analytics...).
- `public/software/` — vídeo y póster de la app de campings (grabados con datos de demostración).
- `next.config.ts` — cabeceras de seguridad (CSP, HSTS...) y redirecciones de las URLs de la
  antigua web WordPress.
- `server.js` — fichero de arranque para Plesk (equivale a `next start`).

## Variables de entorno

Se leen de `.env.local` en la raíz del proyecto (ver `.env.example`). **Nunca se suben a git.**

| Variable | Obligatoria | Para qué |
|---|---|---|
| `GRAPH_TENANT_ID`, `GRAPH_CLIENT_ID`, `GRAPH_CERT_FILE` | Sí (o las SMTP) | Envío del formulario por Microsoft Graph (aplicación «Web EPSIG» de Entra ID con el permiso Mail.Send). Es el método en uso. `GRAPH_CERT_FILE` apunta a `graph-cert.pem` (clave privada + certificado, **fuera de git**, caduca en octubre de 2028: renovarlo antes subiendo un `.cer` nuevo a la aplicación). El inquilino no permite secretos de cliente (`GRAPH_CLIENT_SECRET`). |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Alternativa | Envío por SMTP; solo se usan si `GRAPH_TENANT_ID` está vacío. |
| `CONTACT_FROM`, `CONTACT_TO` | Sí | Remitente y buzón que recibe las solicitudes. |
| `ODOO_URL`, `ODOO_API_KEY` | Recomendado | Cada envío del formulario crea una oportunidad en el CRM de Odoo (`epsig-consultores.odoo.com`, Odoo 19, API JSON-2) con la etiqueta «Web» y la fuente/medio/campaña de la visita (solo si el visitante aceptó las cookies de marketing; ver `src/lib/attribution.ts`). Comprobar con `test-odoo`. Si Odoo falla, el correo sigue llegando. |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 (`G-…`). Solo se carga si el usuario acepta las cookies analíticas. **Se aplica al compilar**: si la cambias, vuelve a compilar. |
| `GOOGLE_SITE_VERIFICATION` | No | Verificación de Google Search Console por meta etiqueta. |

## Despliegue en Plesk

Requisitos: extensión **Node.js** de Plesk con Node **20.9 o superior** (recomendado 22 LTS),
extensión **Git** (opcional, para desplegar desde GitHub) y al menos ~2 GB de RAM libres para
compilar.

### Primera vez

1. **Copia de seguridad** de la web actual del dominio (WordPress): en Plesk, *Copias de
   seguridad* → *Hacer copia de seguridad* (archivos y bases de datos). Las URLs antiguas ya
   tienen redirección en `next.config.ts`.
2. **SSL**: en *Sitios web y dominios* → *SSL/TLS* → Let's Encrypt, para `epsigconsultores.com`
   y `www`, con la redirección HTTP → HTTPS activada.
3. **Subir el código** a la carpeta del dominio (por ejemplo `httpdocs`), sin `node_modules`,
   `.next` ni `.env*`:
   - **Con Git (recomendado):** *Git* → *Añadir repositorio* → remoto
     `https://github.com/Ivanlloret/nueva-web-epsig.git` (si es privado, añade en GitHub la clave
     SSH que muestra Plesk como *Deploy key* y usa la URL `git@github.com:…`), rama `main`,
     ruta de despliegue `httpdocs`.
   - **Sin Git:** sube un `.zip` del proyecto con el *Administrador de archivos* y extráelo.
4. **Variables de entorno**: en el *Administrador de archivos* crea `httpdocs/.env.local`
   copiando `.env.example` y rellena las variables `GRAPH_*` (y `NEXT_PUBLIC_GA_ID` si usas
   Analytics).
5. **Configurar Node.js** (*Sitios web y dominios* → *Node.js* → *Habilitar Node.js*):
   - Versión de Node.js: **22.x** (o 20.9+).
   - Administrador de paquetes: **npm**.
   - Modo de aplicación: **production**.
   - Raíz de la aplicación: **/httpdocs** (donde está `package.json`).
   - Raíz de documentos: **/httpdocs/public**.
   - Archivo de inicio de la aplicación: **server.js**.
6. **Instalar y compilar**: en la misma pantalla, *Ejecutar script* → escribe `deploy` → ejecutar.
   Instala las dependencias (también las de desarrollo, necesarias para compilar) y hace
   `next build`. Tarda unos minutos; debe terminar sin errores.
   *(No uses el botón «NPM install» suelto: en modo production omite las dependencias de
   desarrollo y la compilación falla.)*
7. **Reiniciar la aplicación** (*Reiniciar aplicación*) y abrir https://epsigconsultores.com.

### Comprobaciones tras publicar

- [ ] *Ejecutar script* → `test-correo`: debe llegar un correo de prueba a `CONTACT_TO`.
- [ ] *Ejecutar script* → `test-odoo`: crea una oportunidad de prueba en el CRM (bórrala después).
- [ ] Enviar el formulario de `/contacto` y comprobar que llega el correo a `CONTACT_TO` y la
      confirmación al remitente.
- [ ] Navegar por el menú, abrir el vídeo de `/software/control-electrico-camping` y aceptar /
      rechazar el banner de cookies.
- [ ] Probar un par de URLs antiguas de WordPress (p. ej. `/acerca-de`) y ver que redirigen.
- [ ] Google Search Console: verificar el dominio y enviar `https://epsigconsultores.com/sitemap.xml`.
- [ ] Si usas Analytics, ver en tiempo real que llegan visitas tras aceptar cookies.

> El formulario solo acepta envíos desde `epsigconsultores.com` y sus subdominios. Para probar en
> otro dominio provisional, hazlo en un subdominio (p. ej. `pruebas.epsigconsultores.com`).

### Actualizar la web

1. Sube los cambios a `main` en GitHub y en Plesk → *Git* pulsa *Extraer ahora* (o sube los
   ficheros a mano).
2. *Node.js* → *Ejecutar script* → `deploy`.
3. *Reiniciar aplicación*.

Si algo falla, los registros están en *Sitios web y dominios* → *Registros* (y el error de la
aplicación en el `stderr` de Passenger).
