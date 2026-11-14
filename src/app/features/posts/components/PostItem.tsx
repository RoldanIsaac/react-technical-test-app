import type { Post } from "../types";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <li className="post-item">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </li>
  );
}
