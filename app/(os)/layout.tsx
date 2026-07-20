import { ClientLayout } from "@/components/layout/client-layout";

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout variant="os">{children}</ClientLayout>;
}
