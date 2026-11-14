import { useCallback } from "react";
import { getPostsByUser } from "../../../core/api/posts.api";
import { useFetch } from "../../../hooks/useFetch";

export function usePosts(params: { userId: number }) {
  const { userId } = params;
  const fetchPosts = useCallback(
    (signal: AbortSignal) => getPostsByUser(userId, signal),
    [userId],
  );
  const { data, ...rest } = useFetch(fetchPosts);
  return { posts: data ?? [], ...rest };
}
