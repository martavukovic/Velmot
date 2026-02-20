// =============================
// HomePage.jsx
// =============================
"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";

const images = [
  "/images/Velmot1.jpeg",
  "/images/Velmot2.jpeg",
  "/images/Velmot3.jpeg",
  "/images/Velmot4.jpeg",
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Velmot – Electrical & Motor Services</title>
      </Head>

      <main className={styles.page}>
<section className={styles.hero}>
  <div className={styles.heroInner}>
    <div className={styles.heroText}>
      <span className={styles.badge}>VELMOT D.O.O.</span>

      <h1>
        Reliable Electrical
        <br /> & Motor Solutions
      </h1>

      <p>
        Professional electric motor rewinding, transformer services
        and industrial electrical works. Fast response, proven
        expertise and long-term reliability.
      </p>

      <div className={styles.heroActions}>
        <a href="/servicerequest" className={styles.primaryBtn}>
          Request Service
        </a>
        <a href="/services" className={styles.secondaryBtn}>
          Learn More
        </a>
      </div>

      <div className={styles.stats}>
        <div>
          <strong>10+</strong>
          <span>Years Experience</span>
        </div>
        <div>
          <strong>1000+</strong>
          <span>Serviced Units</span>
        </div>
        <div>
          <strong>24h</strong>
          <span>Response Time</span>
        </div>
      </div>
    </div>

    {/* HERO IMAGE */}
    <div className={styles.heroVisual}>
      <img
        src="/images/gear.png"
        className={styles.heroImage}
        alt="Gear"
      />
      <div className={styles.glow} />
    </div>
  </div>
</section>


        {/* VALUE SECTION */}
        <section className={styles.valueSection}>
          <div className={styles.valueInner}>
            <h2>Built for Reliability</h2>

            <div className={styles.valueGrid}>
              <div className={styles.valueItem}>
                <h4>Industrial Focus</h4>
                <p>
                  Specialized in demanding industrial environments and heavy
                  duty electrical systems.
                </p>
              </div>

              <div className={styles.valueItem}>
                <h4>Fast Turnaround</h4>
                <p>
                  Efficient diagnostics and repair workflow to minimize
                  downtime.
                </p>
              </div>

              <div className={styles.valueItem}>
                <h4>Proven Quality</h4>
                <p>
                  Every repair and installation follows strict technical
                  standards and testing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <div>
              <h2>Need urgent electrical service?</h2>
              <p>
                Send a request and our team will get back to you quickly.
              </p>
            </div>

            <a
              href="/servicerequest"
              className={`${styles.primaryBtn} ${styles.ctaBtn}`}
            >
              Request Service
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
         <div className={styles.footerGrid}>
            <div>
              <strong>Velmot</strong>
              <p>Electrotechnical Services</p>
            </div>

            <div>
              <h4>Contact</h4>
              <p>+385 95 9400 094</p>
              <p>velmot@net.hr</p>
            </div>

            <div>
              <h4>Location</h4>
              <p>Put Piketa 8b</p>
              <p>21230 Sinj, Croatia</p>
            </div>
          </div>

          <div className={styles.footerBottom}>
            © {new Date().getFullYear()} Velmot. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}


