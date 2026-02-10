import Navbar from "./components/navbar/navbar";
import "./Home.module.css"
import "./globals.css";
import Head from 'next/head'

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
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
