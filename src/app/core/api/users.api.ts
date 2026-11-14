// getUsers();

import { request } from "./client";
import type { User } from "../../features/users/types";

export function getUsers(signal?: AbortSignal): Promise<User[]> {
  return request<User[]>("/users", { signal });
}
