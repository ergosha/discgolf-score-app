import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main content */}
      <main className="flex-1 pb-16">{children}</main>
    </div>
  );
}
