import { useId } from "react";

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  const id = useId();

  return (
    <div className="field">
      <label htmlFor={id}>Buscar usuario</label>
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
