import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

export default function EmptyLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {children ?? <Outlet />}
    </div>
  );
}
