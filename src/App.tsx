import { useState } from "react";
import { UserPostsPanel } from "./app/features/posts/components/UserPostsPanel";
import { useCreatedPosts } from "./app/features/posts/hooks/useCreatedPosts";
import { UserList } from "./app/features/users/components/UserList";
import { UserSearch } from "./app/features/users/components/UserSearch";
import { useUsers } from "./app/features/users/hooks/useUsers";
import { useDebounce } from "./app/hooks/useDebounce";
import { EmptyState } from "./app/shared/components/EmptyState";
import { ErrorMessage } from "./app/shared/components/ErrorMessage";
import { LoadingSpinner } from "./app/shared/components/LoadingSpinner";
import { filterUsersByName } from "./app/features/users/utils/filterUsers";

export default function App() {
  const { users, isLoading, error, retry } = useUsers();
  const { createdPosts, addCreatedPost } = useCreatedPosts();
  const [query, setQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const debouncedQuery = useDebounce(query);

  const visibleUsers = filterUsersByName(users, debouncedQuery);
  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;

  return (
    <div className="app">
      <header className="app__header">
        <h1>Usuarios y publicaciones</h1>
      </header>

      <aside className="app__sidebar">
        <UserSearch value={query} onChange={setQuery} />

        {isLoading && <LoadingSpinner label="Cargando usuarios…" />}
        {error && <ErrorMessage message={error} onRetry={retry} />}
        {!isLoading &&
          !error &&
          (visibleUsers.length > 0 ? (
            <UserList
              users={visibleUsers}
              selectedUserId={selectedUserId}
              onSelect={(user) => setSelectedUserId(user.id)}
            />
          ) : (
            <EmptyState message="No hay usuarios que coincidan con la búsqueda." />
          ))}
      </aside>

      <main className="app__content">
        {selectedUser ? (
          <UserPostsPanel
            key={selectedUser.id}
            user={selectedUser}
            createdPosts={createdPosts.filter(
              (post) => post.userId === selectedUser.id,
            )}
            onPostCreated={addCreatedPost}
          />
        ) : (
          <EmptyState message="Selecciona un usuario para ver sus publicaciones." />
        )}
      </main>
    </div>
  );
}
