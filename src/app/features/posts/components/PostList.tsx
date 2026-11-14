import type { Post } from "../types";
import { PostItem } from "./PostItem";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
