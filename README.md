# H&S Solutions LLC - Sitio Web

Sitio web profesional para H&S Solutions LLC, taller automotriz en San Antonio, Texas.

## Características

- ✅ Bilingüe (Español/Inglés)
- ✅ Decap CMS integrado completamente funcional
- ✅ GitHub OAuth para autenticación
- ✅ Sitio estático generado con Next.js 15
- ✅ Diseño responsivo con Tailwind CSS v4
- ✅ Colores de marca: Verde oscuro + Dorado
- ✅ Sistema de Blog dinámico
- ✅ Testimonios y Servicios desde CMS
- ✅ Metadata Completa: Títulos, descripciones, keywords optimizados
- ✅ Open Graph: Imágenes y datos para compartir en redes sociales
- ✅ Twitter Cards: Optimización para Twitter/X
- ✅ Sitemap XML: Para indexación de motores de búsqueda
- ✅ robots.txt: Directivas para crawlers
- ✅ Canonical URLs: Para evitar contenido duplicado
- ✅ Mobile Friendly: Responsive design con viewport correcto

## Estructura

\`\`\`
.
├── app/                    # Next.js App Router
│   ├── blog/              # Páginas de blog
│   │   ├── page.tsx       # Listado de posts
│   │   └── [slug]/        # Página individual
│   ├── api/               # Rutas API
│   └── page.tsx           # Página de inicio
├── content/               # Archivos manejados por CMS
│   ├── servicios/        # Servicios ofrecidos
│   ├── blog/             # Artículos del blog
│   ├── testimonios/      # Testimonios de clientes
│   └── config/           # Configuración del sitio
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades
│   └── content-loader.ts # Funciones para cargar contenido
├── public/
│   ├── admin/            # Interfaz de Decap CMS
│   └── uploads/          # Imágenes subidas
└── README.md
\`\`\`

## Instalación y Configuración

### 1. Clonar el Repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/h-and-s-solutions.git
cd h-and-s-solutions
\`\`\`

### 2. Configurar Variables de Entorno

En Vercel, añade las siguientes variables de entorno en la sección **Settings > Environment Variables**:

\`\`\`
GITHUB_OAUTH_CLIENT_ID=tu_client_id_aqui
GITHUB_OAUTH_CLIENT_SECRET=tu_client_secret_aqui
\`\`\`

#### Obtener Credenciales de GitHub OAuth:

1. Ve a GitHub → Settings → Developer settings → OAuth Apps
2. Click en "New OAuth App"
3. Rellena:
   - **Application name**: H&S Solutions CMS
   - **Homepage URL**: \`https://www.hssolutionllc.com\`
   - **Authorization callback URL**: \`https://www.hssolutionllc.com/api/decap-github-oauth\`
4. Copia el **Client ID** y **Client Secret**
5. Pégalos en las variables de entorno de Vercel

### 3. Configurar el Repositorio en Decap CMS

Edita \`public/admin/config.yml\` y actualiza:

\`\`\`yaml
backend:
  repo: tu-usuario/h-and-s-solutions
  base_url: https://tu-dominio.vercel.app
\`\`\`

Reemplaza:
- \`tu-usuario\` con tu username de GitHub
- \`www.hssolutionllc.com)\` con tu dominio real

### 4. Instalar Dependencias y Desplegar

\`\`\`bash
npm install
npm run build
\`\`\`

Luego, pushea a GitHub y Vercel desplegará automáticamente.

### 5. Acceder al CMS

Una vez desplegado:

1. Ve a \`https://tu-dominio.vercel.app/admin\`
2. Click en "Login with GitHub"
3. Autoriza la aplicación
4. ¡Listo! Ahora puedes editar servicios, blog, testimonios y configuración

## Entorno de Desarrollo Local

\`\`\`bash
npm run dev
\`\`\`

El sitio estará disponible en \`http://localhost:3000\` y el CMS en \`http://localhost:3000/admin\`

## Usar el Sistema de Blog

### Crear un Nuevo Artículo

1. En \`/admin\`, ve a la sección "Blog"
2. Haz clic en "New Blog"
3. Completa los campos:
   - **Título**: Nombre del artículo
   - **Descripción**: Resumen corto
   - **Contenido**: Texto principal (Markdown)
   - **Imagen**: Portada del artículo
   - **Autor**: Nombre del autor
   - **Fecha**: Fecha de publicación
   - **Categoría**: Selecciona entre Mantenimiento, Reparación, Tips, Noticias
   - **Publicado**: Marca como publicado
4. Haz clic en "Save"

### Cómo Aparecen en el Sitio

- El listado se encuentra en \`/blog\`
- Cada artículo tiene su propia página en \`/blog/[slug]\`
- Los artículos se ordenan por fecha (más recientes primero)
- Solo aparecen artículos marcados como "Publicado"

## Variables de Entorno Requeridas

- \`GITHUB_OAUTH_CLIENT_ID\`: ID de cliente de GitHub OAuth
- \`GITHUB_OAUTH_CLIENT_SECRET\`: Secret de cliente de GitHub OAuth

## Stack Tecnológico

- **Next.js 16**: Framework React con SSR/SSG
- **Tailwind CSS v4**: Estilos utility-first
- **Decap CMS**: CMS Git-based
- **GitHub OAuth**: Autenticación segura
- **Date-fns**: Manejo de fechas
- **Gray-matter**: Parsing de frontmatter

## Próximos Pasos

- [ ] Crear página de galería de trabajos
- [ ] Crear página de contacto con formulario
- [ ] Implementar envío de emails
- [ ] Optimizar SEO
- [ ] Configurar Google Analytics
- [ ] Mejorar performance
- [ ] Registrar en Google Search Console
- [ ] Configurar Google Analytics 4
- [ ] Crear backlinks desde otros sitios
- [ ] Optimizar imágenes para mejor carga
- [ ] A/B testing de CTAs

## Monitoreo

- **Vercel Analytics**: Incluido en el proyecto
- **Search Console**: Registra tu sitio en Google Search Console
- **Page Speed**: Verifica performance en PageSpeed Insights

## Notas

- El CMS almacena archivos YAML/Markdown en la carpeta \`/content\`
- Los cambios se guardan como commits en GitHub
- Las imágenes subidas se guardan en \`/public/uploads\`
- El sitio se regenera automáticamente después de cada cambio
- El contenido se carga en tiempo de build para mejor performance

## Soporte

- Decap CMS: https://decapcms.org/docs
- Next.js: https://nextjs.org/docs
- Para problemas de GitHub OAuth, verifica las credenciales en Vercel
  
