// import { AuthHandler } from "@/components/AuthHandler";
import Header from "@/components/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <AuthHandler /> */}
      <Header />
      {children}
    </>
  );
}
