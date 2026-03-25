import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark-site-theme min-h-screen">
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
