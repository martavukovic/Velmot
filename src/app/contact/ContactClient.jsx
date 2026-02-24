"use client";

import styles from "./Contact.module.css";

export default function ContactPage() {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <h1>Contact Us</h1>
          <p>
            Have a question or need a service? Reach out to our team — we’re
            ready to help.
          </p>
        </header>

        {/* GRID */}
        <div className={styles.grid}>
          {/* LEFT — INFO */}
          <div className={styles.card}>
            <h3>Velmot</h3>
            <p className={styles.subtitle}>
              Electrotechnical Services
            </p>

            <div className={styles.infoBlock}>
              <h4>Phone</h4>
              <p>+385 95 9400 094</p>
            </div>

            <div className={styles.infoBlock}>
              <h4>Email</h4>
              <p>velmot@net.hr</p>
            </div>

            <div className={styles.infoBlock}>
              <h4>Address</h4>
              <p>Put Piketa 8b</p>
              <p>21230 Sinj, Croatia</p>
            </div>
          </div>

          {/* RIGHT — MAP */}
          <div className={styles.mapCard}>
            <iframe
              src="https://www.google.com/maps?q=Put%20Piketa%208b%2C%2021230%20Sinj%2C%20Croatia&output=embed"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}