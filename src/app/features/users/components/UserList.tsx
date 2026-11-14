import type { User } from "../types";
import { UserListItem } from "./UserListItem";

interface UserListProps {
  users: User[];
  selectedUserId: number | null;
  onSelect: (user: User) => void;
}

export function UserList({ users, selectedUserId, onSelect }: UserListProps) {
  return (
    <ul className="user-list">
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
