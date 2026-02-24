import Navbar from "./components/navbar/navbar";
import "./Home.module.css";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Velmot",
    template: "%s | Velmot",
  },
  description: "Industrial Electrical Services",
  icons: {
    icon: "/images/Velmot_cut_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}