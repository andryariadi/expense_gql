import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import GridBackground from "@/components/GridBackground";
import ApolloWrapper from "@/components/ApolloWrapper";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExpenseGQL",
  description: "ExpenseGQL is a fullstack expense tracker.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} antialiased`}>
        <ApolloWrapper>
          <GridBackground>{children}</GridBackground>
        </ApolloWrapper>
      </body>
    </html>
  );
}
