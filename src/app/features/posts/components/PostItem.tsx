import type { Post } from "../types";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <li className="rounded-lg border border-(--border) bg-(--surface) p-4">
      <h3 className="text-base">{post.title}</h3>
      <p className="m-0 text-(--muted)">{post.body}</p>
    </li>
  );
}
