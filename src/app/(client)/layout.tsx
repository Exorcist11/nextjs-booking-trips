"use client";

import Footer03Page from "@/components/Footer";
import Navbar04Page from "@/components/Navbar/navbar";


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar04Page />
      {children}
      <Footer03Page />
    </div>
  );
}
