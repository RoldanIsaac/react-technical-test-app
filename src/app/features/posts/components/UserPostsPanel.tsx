import { createPost } from "../../../core/api/posts.api";
import { EmptyState } from "../../../shared/components/EmptyState";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import type { User } from "../../users/types";
import { usePosts } from "../hooks/usePosts";
import type { Post, PostFormValues } from "../types";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";

interface UserPostsPanelProps {
  user: User;
  createdPosts: Post[];
  onPostCreated: (post: Post) => void;
}

// Se monta con key={user.id}: al cambiar de usuario se reinicia su estado.
export function UserPostsPanel({
  user,
  createdPosts,
  onPostCreated,
}: UserPostsPanelProps) {
  const { posts, isLoading, error, retry } = usePosts({ userId: user.id });

  async function handleSubmit(values: PostFormValues) {
    const savedPost = await createPost({ userId: user.id, ...values });
    onPostCreated(savedPost);
  }

  const allPosts = [...createdPosts, ...posts];

  return (
    <section>
      <h2>Publicaciones de {user.name}</h2>

      <PostForm onSubmit={handleSubmit} />

      {isLoading && <LoadingSpinner label="Cargando publicaciones…" />}
      {error && <ErrorMessage message={error} onRetry={retry} />}
      {allPosts.length > 0 && <PostList posts={allPosts} />}
      {!isLoading && !error && allPosts.length === 0 && (
        <EmptyState message="Este usuario aún no tiene publicaciones." />
      )}
    </section>
  );
}
