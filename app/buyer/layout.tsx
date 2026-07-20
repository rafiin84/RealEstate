import { ClientLayout } from "@/components/layout/client-layout";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout variant="buyer">{children}</ClientLayout>;
}
