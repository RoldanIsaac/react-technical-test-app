import { getUsers } from "../../../core/api/users.api";
import { useFetch } from "../../../hooks/useFetch";

export function useUsers() {
  const { data, ...rest } = useFetch(getUsers);
  return { users: data ?? [], ...rest };
}
