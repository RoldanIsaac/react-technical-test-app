import { useId } from "react";

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  const id = useId();

  return (
    <div className="mb-3 flex flex-col gap-1">
      <label htmlFor={id} className="text-[0.9rem] font-semibold">
        Buscar usuario
      </label>
      <input
        id={id}
        type="search"
        value={value}
        placeholder="Nombre…"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
