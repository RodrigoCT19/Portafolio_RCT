import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Aldrich } from "next/font/google";

const aldrich = Aldrich({
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "RCT | Portafolio",
  description: "Portafolio | Rodrigo Cotrina Temple.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">

      <body className={`${aldrich.className} bg-black`}>
        <Navbar />
        {/* separa el contenido del navbar fijo */}
        <div>{children}</div>
      </body>

    </html>
  );
}
