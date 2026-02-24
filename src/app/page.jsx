"use client";

import Head from "next/head";
import styles from "./Home.module.css";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // ili tvoja putanja

const handleRequestClick = async (e) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    e.preventDefault();

    // ✅ dodaj redirect param
    const params = new URLSearchParams(window.location.search);
    params.set("redirect", "/servicerequest");
    window.history.replaceState(null, "", `?${params.toString()}`);

    setShowLogin(true);
    return;
  }
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Velmot – Electrical & Motor Services</title>
      </Head>

      <main className={styles.page}>
        {/* HERO */}
<section className={styles.hero}>
  <div className={styles.heroOverlay} />

  <div className={styles.heroInner}>
    {/* Lijevi stupac: badge, naslov i opis */}
    <div className={styles.heroCol}>
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
      </div>
    </div>

    {/* Desni stupac: stats i buttons */}
    <div className={styles.heroCol}>
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

      <div className={styles.heroActions}>
        <a href="/servicerequest"
        onClick={handleRequestClick}
         className={styles.primaryBtn}>
          Request Service
        </a>
        <a href="/services" className={styles.secondaryBtn}>
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>

        {/* VALUE CARDS */}
        <section className={styles.valueSection}>
          <div className={styles.valueInner}>
            <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
            <div className={styles.valueGrid}>
              {/* CARD 1 */}
              <div className={styles.valueCard}>
                <div className={styles.iconWrap}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 6v6l4 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <h4>Industrial Focus</h4>
                <p>
                  Specialized in demanding industrial environments and heavy
                  duty electrical systems.
                </p>
              </div>

              {/* CARD 2 */}
              <div className={styles.valueCard}>
                <div className={styles.iconWrap}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h4>Fast Turnaround</h4>
                <p>
                  Efficient diagnostics and repair workflow to minimize
                  downtime and keep operations running.
                </p>
              </div>

              {/* CARD 3 */}
              <div className={styles.valueCard}>
                <div className={styles.iconWrap}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <h4>Proven Quality</h4>
                <p>
                  Every repair and installation follows strict technical
                  standards and detailed testing procedures.
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
      </main>
    </>
  );
}