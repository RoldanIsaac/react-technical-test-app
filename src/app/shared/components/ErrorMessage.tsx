interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="my-3 flex flex-col items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-red-600"
      role="alert"
    >
      <p className="m-0">{message}</p>
      {onRetry && (
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:opacity-50"
          onClick={onRetry}
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
