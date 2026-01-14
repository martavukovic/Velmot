import Image from "next/image";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className={styles.hero}
        style={{ backgroundImage: "url('/images/homepage.jpg')" }}
      >
        <div className={styles.heroOverlay}>
          <h1>A Smarter Way to Manage Repairs</h1>
          <p>
            Report issues, track repairs and stay informed – all in one place
          </p>
          <button>Service Request</button>
        </div>
      </section>

      {/* CONTENT */}
      <main className={styles.container}>
        <section>
          <h2>What We Do?</h2>
          <p>
            Velmot specializes in the rewinding and servicing of electric motor
            stators and rotors, transformer manufacturing and maintenance, and
            the repair of handheld electrical tools.
          </p>
          <p>
            We also provide professional electrical installation works,
            installation of air conditioning systems, off-grid solar solutions,
            as well as alternator and starter motor repair.
          </p>
        </section>

        <section>
          <h2>Why Velmot?</h2>
          <p>
            Velmot is a trusted electrotechnical service company providing fast,
            reliable, and professional solutions. With years of experience and
            a skilled technical team, we ensure high-quality repairs and
            long-lasting results for every client.
          </p>
        </section>
      </main>

        {/* CARDS */}
        <div className={styles.allcards}>
          <section className={styles.cards}>
            <div className={styles.card}>
              <h3>⚡ Fast Service</h3>
              <p>Quick response times and efficient repairs to minimize downtime.</p>
            </div>

            <div className={styles.card}>
              <h3>🛠 Experienced technicians</h3>
              <p>Certified professionals with hands-on industry experience.</p>
            </div>

            <div className={styles.card}>
              <h3>🔒 Reliable & transparent</h3>
              <p>Quick response times and efficient repairs to minimize downtime.</p>
            </div>
          </section>
        </div>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Need a repair or technical support?</h2>
        <p>Submit a service request and our team will get back to you quickly.</p>
        <button>Request a Service</button>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <h3>Contact info:</h3>
        <p>Address: Put Piketa 8b, Sinj, Croatia</p>
        <p>Phone: +385 95 9400 094</p>
        <p>Email: velmot@net.hr</p>
        <span>© 2026 Velmot – All rights reserved</span>
      </footer>
    </>
  );
}
