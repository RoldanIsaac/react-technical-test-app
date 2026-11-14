// getPostsByUser(), createPost()

import { request } from "./client";
import type { NewPostInput, Post } from "../../features/posts/types";

export function getPostsByUser(
  userId: number,
  signal?: AbortSignal,
): Promise<Post[]> {
  return request<Post[]>(`/users/${userId}/posts`, { signal });
}

// JSONPlaceholder simula la escritura: responde 201 con id 101 pero no persiste nada.
export function createPost(input: NewPostInput): Promise<Post> {
  return request<Post>("/posts", { method: "POST", body: input });
}
