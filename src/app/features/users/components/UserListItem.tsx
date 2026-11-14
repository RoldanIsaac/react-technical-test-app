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
        className="flex w-full cursor-pointer flex-col rounded-lg border border-(--border) bg-(--surface) px-3 py-[0.6rem] text-left hover:border-(--accent) aria-[current=true]:border-(--accent) aria-[current=true]:shadow-[inset_3px_0_0_var(--accent)]"
        aria-current={isSelected ? "true" : undefined}
        onClick={() => onSelect(user)}
      >
        <span className="font-semibold">{user.name}</span>
        <span className="text-[0.85rem] text-(--muted)">{user.email}</span>
      </button>
    </li>
  );
}
