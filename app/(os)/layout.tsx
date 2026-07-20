import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { osNavGroups } from "@/components/layout/nav-config";

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar navGroups={osNavGroups} variant="os" />
      <div className="flex flex-col flex-1 min-w-0">
        <Header variant="os" />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
