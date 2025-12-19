import Navbar from "./components/navbar/navbar";
import "./pages.css"
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
