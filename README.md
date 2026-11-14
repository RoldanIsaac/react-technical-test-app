React app for Technical Test.

# Para ejecutar la app:

1. Clonar el repo
2. Instalar dependencias (tener en cuenta que el gestor de paquetes seleccionado es pnpm)
3. Correr con pnpm run dev o compilar y acceder mediante el dist del proyecto.

# Cómo usé la IA

(Buscando evitar empezar desde cero)

1. Pedí sugerencia de arquitectura de la app
2. Creación del código de los componentes
3. Creación de estilos básicos para cada componente y estilos generales con paleta de colores global y armonía entre los estilos
4. Corrección de errores ortográficos en el README.md

Cada prompt pasado fue escalonado, para supervisar que en cada uno tuviera en cuenta el contenido (código) generado y las convenciones tomadas en cada paso previo.

# Decisiones que tomé durante la realización

1. Escoger una arquitectura básica y fácilmente escalable. Buscando sobre todo fácil manejo del directory tree y los ficheros.
2. Trasladar los estilos completamente a Tailwind. Pues resulta más fácil de mantener y quedan en un solo fichero, junto con el html.
3. Incorporación de los tests al package.json para poder ejecutar los scripts (Toda la configuración de los tests fue manual)

# Qué corregí de la IA

1. Alteré ligeramente la arquitectura propuesta:
   - Directorio app como wrapper de todos los otros directorios,
   - Directorio core para api y contemplando la posibilidad de escalar la app con autenticación
   - Directorio layout
2. Elegí Tailwind sobre css para los estilos
3. Creé un directorio de layout, para reducir boilerplate y mantener los componentes en una misma Section reutilizable (más tarde se puede implementar aquí mismo Navbar, Footer, Sidebar y otros componentes que correspondan al layout de la app)
4. Revisé el resto del código a grosso modo para ver cómo estaba hecha la app. Eliminé comentarios innecesarios, y cambié parte del código enrevesado y difícil de entender para que fuera más legible, a la hora del mantenimiento o revisión.

   ***

   Un cambio en particular fue el siguiente:
   En el hook usePosts cambié los parámetros de la función de ser posicionales a ser named params

- Antes era:
  export function usePosts( userId: number) {
  ...
  }
- Después:
  export function usePosts(params: { userId: number }) {

  const { userId } = params;
  ...
  }

Por experiencia sé que resulta una decisión que puede robustecer la app y disminuir los errores a la hora del trabajo en equipos de desarrollo.

# Conclusiones parciales

1. Pruebas realizadas y superadas
2. Compilación exitosa de la app

# Lo que haría con más tiempo

## En cuanto a UX-UI

1.  Remover completamente los estilos genéricos y básicos generados por IA, para poner estilos más personalizados, ya sea manualmente o con un skills de UI que adaptaría en el modelo de IA.
    - Mejoraría tipografía
    - Paleta de colores personalizadas
    - Modificaciones de UI para hacerla más intuitiva
2.  Importante: Dedicaría un tiempo al responsiveness.
3.  Tal vez animaría un poco más la página. Instalaría Framer Motion para lograr una mejor experiencia de usuario

## En cuanto a la arquitectura y el código

1. Robustecer la arquitectura, y lograr mayor abstracción con third party libraries. En este caso los fetching los haría con Tanstack query en lugar del hook useFetch.
2. Trasladar la forma en que se gestionan las rutas a React Router (Acabé implementando esto finalmente)

## En general

1. Logrado el punto de React Router, crearía un landing page para el repo (proyecto) como tal.
2. En lo personal, tengo interés por el web performance. Tomaría la app como muestra para hacer comparaciones de desempeño de la página, con diferentes estrategias de fetching, evaluando métricas como DOM content load, optimización de LCP utilizando Chrome Web Tools y otras herramientas afines.
3. También implementaría algo de accesibilidad, como dark mode, prefers-reduced-motion, etc.

# Arquitectura básica inicialmente escogida, fácilmente escalable.

```text
src/
├── api/
│   ├── client.ts              fetch wrapper: base URL, errores, AbortSignal
│   ├── users.api.ts           getUsers()
│   └── posts.api.ts           getPostsByUser(), createPost()
├── features/
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/useUsers.ts
│   │   └── types.ts
│   └── posts/
│       ├── components/
│       ├── hooks/usePosts.ts
│       ├── validation.ts      reglas del formulario (función pura)
│       └── types.ts
├── shared/
│   └── components/            Spinner, ErrorMessage, EmptyState
├── hooks/
│   └── useDebounce.ts
├── test/                      setup, utilidades de render, mocks
├── App.tsx
└── main.tsx
```
