import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar"; // if this path errors, use "../components/Navbar"
import Footer from "@/components/Footer"; // if this path errors, use "../components/Navbar"


export const metadata = {
  title: "PROCON",
  description: "PROCON Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100">
        <Navbar />
        <div className="">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
