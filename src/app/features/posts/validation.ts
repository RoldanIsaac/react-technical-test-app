import type { PostFormValues } from "./types";

export const TITLE_MAX_LENGTH = 100;
export const BODY_MAX_LENGTH = 500;

export type PostFormErrors = Partial<Record<keyof PostFormValues, string>>;

export function validatePost({ title, body }: PostFormValues): PostFormErrors {
  const errors: PostFormErrors = {};
  const trimmedTitle = title.trim();
  const trimmedBody = body.trim();

  if (trimmedTitle === "") {
    errors.title = "El título es obligatorio.";
  } else if (trimmedTitle.length > TITLE_MAX_LENGTH) {
    errors.title = `El título no puede superar los ${TITLE_MAX_LENGTH} caracteres.`;
  }

  if (trimmedBody === "") {
    errors.body = "El contenido es obligatorio.";
  } else if (trimmedBody.length > BODY_MAX_LENGTH) {
    errors.body = `El contenido no puede superar los ${BODY_MAX_LENGTH} caracteres.`;
  }

  return errors;
}
