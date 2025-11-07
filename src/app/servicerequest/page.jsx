import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Zahtjev</h1>
      <p>Upravljajte svojim zahtjevima za popravak, pošaljite nove ili pregledajte prethodne usluge.</p>

      <div>
        <p>
          <Link href="/servicerequest/new">Novi zahtjev</Link>
        </p>
        <p>
          <Link href="/servicerequest/history">Povijest</Link>
        </p>
      </div>
    </main>
  );
}
