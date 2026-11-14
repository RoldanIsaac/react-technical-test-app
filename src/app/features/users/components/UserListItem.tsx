import type { User } from "../types";

interface UserListItemProps {
  user: User;
  isSelected: boolean;
  onSelect: (user: User) => void;
}

export function UserListItem({
  user,
  isSelected,
  onSelect,
}: UserListItemProps) {
  return (
    <li>
      <button
        type="button"
        className="user-item"
        aria-current={isSelected ? "true" : undefined}
        onClick={() => onSelect(user)}
      >
        <span className="user-item__name">{user.name}</span>
        <span className="user-item__email">{user.email}</span>
      </button>
    </li>
  );
}
