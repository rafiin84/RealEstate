import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { buyerNavGroups } from "@/components/layout/nav-config";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar navGroups={buyerNavGroups} variant="buyer" />
      <div className="flex flex-col flex-1 min-w-0">
        <Header variant="buyer" />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
