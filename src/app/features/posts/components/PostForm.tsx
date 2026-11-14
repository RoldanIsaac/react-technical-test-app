import { useId, useState, type FormEvent } from "react";
import type { PostFormValues } from "../types";
import { validatePost, type PostFormErrors } from "../validation";

interface PostFormProps {
  onSubmit: (values: PostFormValues) => Promise<void>;
}

const EMPTY_VALUES: PostFormValues = { title: "", body: "" };

export function PostForm({ onSubmit }: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<PostFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();
  const bodyId = useId();

  function handleChange(field: keyof PostFormValues, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);

    if (errors[field] && validatePost(next)[field] === undefined) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validatePost(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await onSubmit({ title: values.title.trim(), body: values.body.trim() });
      setValues(EMPTY_VALUES);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No se pudo crear la publicación.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="my-4 rounded-lg border border-(--border) bg-(--surface) p-4"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3>Nueva publicación</h3>

      <div className="mb-3 flex flex-col gap-1">
        <label htmlFor={titleId} className="text-[0.9rem] font-semibold">
          Título
        </label>
        <input
          id={titleId}
          type="text"
          value={values.title}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? `${titleId}-error` : undefined}
          onChange={(event) => handleChange("title", event.target.value)}
        />
        {errors.title && (
          <p
            id={`${titleId}-error`}
            className="m-0 text-[0.85rem] text-(--danger)"
            role="alert"
          >
            {errors.title}
          </p>
        )}
      </div>

      <div className="mb-3 flex flex-col gap-1">
        <label htmlFor={bodyId} className="text-[0.9rem] font-semibold">
          Contenido
        </label>
        <textarea
          id={bodyId}
          value={values.body}
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? `${bodyId}-error` : undefined}
          onChange={(event) => handleChange("body", event.target.value)}
        />
        {errors.body && (
          <p
            id={`${bodyId}-error`}
            className="m-0 text-[0.85rem] text-(--danger)"
            role="alert"
          >
            {errors.body}
          </p>
        )}
      </div>

      {submitError && (
        <p className="m-0 mb-3 text-[0.85rem] text-(--danger)" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className="cursor-pointer rounded-md bg-(--accent) px-4 py-2 font-semibold text-(--accent-contrast) disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Publicando…" : "Publicar"}
      </button>
    </form>
  );
}
