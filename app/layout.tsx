import type { Metadata } from "next";
import SnowfallCanvas from "@/components/SnowfallCanvas";
import CursorGlow from "@/components/CursorGlow";
import { GridBackground } from "@/components/ui/GridBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Devsite",
  description: "Aditya Mendiratta's Personal Devsite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`relative min-h-screen overflow-x-hidden overflow-y-scroll`}
      >
        {children}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <SnowfallCanvas />
        </div>

        <div className="pointer-events-none fixed inset-0 -z-100">
          <CursorGlow />
        </div>

        <div className="pointer-events-none fixed inset-0 -z-1000">
          <GridBackground />
        </div>
      </body>
    </html>
  );
}
