interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <p className="my-3 flex items-center gap-2 text-slate-500">{message}</p>
  );
}
