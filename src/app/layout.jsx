import Navbar from "./components/navbar/navbar";
import "./Home.module.css"
import "./globals.css";
import Head from 'next/head'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Velmot',
  description: 'Industrial Electrical Services',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <Head>
        <link rel="icon" href="/images/Velmot_cut_logo.png" />
      </Head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
