import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
