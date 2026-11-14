// fetch wrapper: base URL, errores, AbortSignal
const BASE_URL: string =
  import.meta.env.VITE_API_URL ?? "https://jsonplaceholder.typicode.com";

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  signal?: AbortSignal;
}

export async function request<T>(
  path: string,
  { method = "GET", body, signal }: RequestOptions = {},
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers:
        body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new ApiError(
      "No se pudo conectar con el servidor. Revisa la conexión.",
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `Error del servidor (${response.status}).`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

export function getErrorMessage(error: unknown): string {
  return error instanceof ApiError
    ? error.message
    : "Ocurrió un error inesperado. Inténtalo de nuevo.";
}
