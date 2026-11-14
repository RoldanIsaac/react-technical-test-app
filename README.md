-- Arquitectura basica escogida, facilmente escalable.

src/
├── api/
│ ├── client.ts fetch wrapper: base URL, errores, AbortSignal
│ ├── users.api.ts getUsers()
│ └── posts.api.ts getPostsByUser(), createPost()
├── features/
│ ├── users/
│ │ ├── components/
│ │ ├── hooks/useUsers.ts
│ │ └── types.ts
│ └── posts/
│ ├── components/
│ ├── hooks/usePosts.ts
│ ├── validation.ts reglas del formulario (función pura)
│ └── types.ts
├── shared/components/ Spinner, ErrorMessage, EmptyState
├── hooks/useDebounce.ts
├── test/ setup, utilidades de render, mocks
├── App.tsx
└── main.tsx
