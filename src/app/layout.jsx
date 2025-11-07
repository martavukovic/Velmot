import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>
        <header style={{ padding: "1rem", background: "#eee" }}>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link href="/">Početna</Link>
            <Link href="/signin">Prijava</Link>
            <Link href="/useraccount">Korisnički račun</Link>
            <Link href="/servicerequest">Zahtjev</Link>
            <Link href="/feedback">Povratne informacije</Link>
            <Link href="/about">O nama</Link>
            <Link href="/contact">Kontakt</Link>
          </nav>
        </header>
        <main style={{ padding: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}
