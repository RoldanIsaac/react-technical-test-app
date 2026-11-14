import type { User } from "../types";
import { UserListItem } from "./UserListItem";

interface UserListProps {
  users: User[];
  selectedUserId: number | null;
  onSelect: (user: User) => void;
}

export function UserList({ users, selectedUserId, onSelect }: UserListProps) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          isSelected={user.id === selectedUserId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
