import type { User } from "../types";

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function filterUsersByName(users: User[], query: string): User[] {
  const normalizedQuery = normalize(query);
  if (normalizedQuery === "") return users;
  return users.filter((user) => normalize(user.name).includes(normalizedQuery));
}
