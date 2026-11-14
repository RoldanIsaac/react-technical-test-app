import { useState } from "react";
import { UserPostsPanel } from "../../../features/posts/components/UserPostsPanel";
import { useCreatedPosts } from "../../../features/posts/hooks/useCreatedPosts";
import { UserList } from "../../../features/users/components/UserList";
import { UserSearch } from "../../../features/users/components/UserSearch";
import { useUsers } from "../../../features/users/hooks/useUsers";
import { useDebounce } from "../../../hooks/useDebounce";
import { EmptyState } from "../../../shared/components/EmptyState";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { filterUsersByName } from "../utils/filterUsers";

export default function UsersPage() {
  const { users, isLoading, error, retry } = useUsers();
  const { createdPosts, addCreatedPost } = useCreatedPosts();
  const [query, setQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const debouncedQuery = useDebounce(query);

  const visibleUsers = filterUsersByName(users, debouncedQuery);
  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;

  return (
    <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 p-6 min-[721px]:grid-cols-[320px_1fr]">
      <header className="min-[721px]:col-span-2">
        <h1>Usuarios y publicaciones</h1>
      </header>

      <aside className="self-start">
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

      <main className="min-w-0">
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
