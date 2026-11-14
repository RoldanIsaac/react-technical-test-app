import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "./app/shared/components/LoadingSpinner";
import EmptyLayout from "./app/layout/EmptyLayout";

// -- Lazy pages --
const UsersPage = lazy(() => import("./app/features/users/views/UserPage"));

const router = createBrowserRouter([
  // -- Users & posts (public) --
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <EmptyLayout>
            <LoadingSpinner label="Cargando…" />
          </EmptyLayout>
        }
      >
        <UsersPage />
      </Suspense>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
