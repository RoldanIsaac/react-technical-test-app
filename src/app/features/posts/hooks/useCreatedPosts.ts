import { useCallback, useRef, useState } from "react";
import type { Post } from "../types";

/** Guarda en memoria los posts creados, ya que la API no los persiste. */
export function useCreatedPosts() {
  const [createdPosts, setCreatedPosts] = useState<Post[]>([]);
  const nextLocalId = useRef(-1);

  const addCreatedPost = useCallback((post: Post) => {
    // La API devuelve siempre id 101: se sustituye por un id local único.
    const localPost: Post = { ...post, id: nextLocalId.current-- };
    setCreatedPosts((current) => [localPost, ...current]);
  }, []);

  return { createdPosts, addCreatedPost };
}
