# Sankayu Motos — versión 1

Sitio estático en español, adaptable a computador y móvil. Sube el contenido de esta carpeta a la raíz de un repositorio GitHub para publicarlo con GitHub Pages o Vercel. No necesita compilación.

## Archivos

- `index.html`: contenido, enlaces, mapa, metadatos y catálogo.
- `styles.css`: diseño, encuadre de las capturas y versiones responsivas.
- `script.js`: menú móvil, filtros, selector de mapa y ventana de Instagram.
- La moto de la franja roja avanza con el desplazamiento de la página en escritorio y móvil.
- `brief-marca.md`: investigación, fuentes y decisiones.
- `assets/`: fotografías finales y capturas facilitadas por el usuario.

## Fotos y marca

Las diez fotografías de producto proceden de capturas adjuntadas por el usuario. El CSS muestra solo el área fotográfica de cada captura, sin la interfaz de Instagram. Así se conservan el producto y los logos tal como aparecen en la publicación. Los PNG completos permanecen en `assets/` porque son los archivos utilizados por la página.

La cabecera incorpora la imagen de perfil de Sankayu, recortada visualmente de una captura, junto al nombre en texto. La miniatura tiene baja resolución; un logo original sería mejor para pantallas de alta densidad e impresión.

Las imágenes editoriales de portada, taller y ventana de Instagram fueron generadas con IA. No representan inventario, local ni personal real. Precios, tallas y disponibilidad se consultan por WhatsApp.

## Publicación

Para GitHub Pages, selecciona la rama principal y `/ (root)` en Settings → Pages. En Vercel, importa el repositorio como sitio estático sin comando de build. Las fuentes externas y el mapa requieren conexión a internet.
