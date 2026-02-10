"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Settings,
  Plug,
  Lightbulb,
  Sun,
  Activity,
  Wrench
} from "lucide-react";
import styles from "./Home.module.css";

const services = [
  {
    title: "Electric Motor Repair",
    short: "Rewinding and diagnostics",
    long: "Comprehensive stator and rotor rewinding, fault diagnostics, insulation testing and performance validation for industrial electric motors.",
    icon: Settings,
  },
  {
    title: "Transformers",
    short: "Manufacturing & servicing",
    long: "Production, refurbishment and maintenance of power and distribution transformers, including testing and documentation.",
    icon: Plug,
  },
  {
    title: "Electrical Installations",
    short: "Industrial electrical works",
    long: "Design and execution of electrical installations, system upgrades, industrial wiring and control cabinets.",
    icon: Lightbulb,
  },
  {
    title: "Energy Systems",
    short: "Solar & auxiliary systems",
    long: "Off-grid solar systems, alternators, starter motors and auxiliary energy solutions for remote and industrial use.",
    icon: Sun,
  },
  {
    title: "Industrial Diagnostics",
    short: "Testing & fault analysis",
    long: "Electrical measurements, thermal inspections and performance analysis for preventive maintenance and troubleshooting.",
    icon: Activity,
  },
  {
    title: "Maintenance Programs",
    short: "Planned service",
    long: "Scheduled maintenance programs tailored to reduce downtime and extend equipment lifecycle.",
    icon: Wrench,
  },
];

const images = [
  "/images/pic1.jpg",
  "/images/pic2.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
];

export default function HomePage() {
  const [activeService, setActiveService] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setActiveService(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setIsPaused(true);
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFade(true);
    }, 400);
  };

  const handleNext = () => {
    setIsPaused(true);
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 400);
  };

  return (
    <>
      <Head>
        <title>Velmot – Electrotechnical Services</title>
        <link
          rel="icon"
          href="/images/Velmot_cut_logo.png"
          type="image/png"
        />
      </Head>

      <main className={styles.page}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1>Industrial Electrical Repairs, Done Right</h1>
            <p>
              Velmot delivers precision electrotechnical services for industry,
              infrastructure and professionals who require reliability.
            </p>
            <div className={styles.heroActions}>
              <a href="/servicerequest" className={styles.primaryBtn}>
                Service Request
              </a>
              <a href="/contact" className={styles.secondaryBtn}>
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className={styles.services}>
          <h2>Services</h2>
          <div className={styles.cards}>
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={i}
                  className={styles.card}
                  onClick={() => setActiveService(s)}
                >
                  <Icon size={28} />
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* MODAL */}
        {activeService && (
          <div
            className={styles.modalOverlay}
            onClick={() => setActiveService(null)}
          >
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalTitle}>
                <activeService.icon size={36} />
                <h3>{activeService.title}</h3>
              </div>
              <p>{activeService.long}</p>
              <button
                className={styles.modalClose}
                onClick={() => setActiveService(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* IMAGE CAROUSEL */}
        <section className={styles.carouselSection}>
          <div className={styles.carousel}>
            <button
              onClick={handlePrev}
              className={`${styles.arrow} ${styles.left}`}
            >
              ‹
            </button>

            <img
              src={images[currentIndex]}
              alt=""
              className={styles.carouselImage}
              style={{ opacity: fade ? 1 : 0 }}
            />

            <button
              onClick={handleNext}
              className={`${styles.arrow} ${styles.right}`}
            >
              ›
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <h2>Need a reliable electrical service partner?</h2>
              <p>
                From urgent repairs to planned maintenance, our team responds with
                clear communication, technical accuracy and proven processes.
              </p>
            </div>
            <a
              href="/servicerequest"
              className={`${styles.ctaButton} ${styles.primaryBtn}`}
            >
              Request a Service
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
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

            <div>
              <h4>Working Hours</h4>
              <p>Mon – Fri</p>
              <p>08:00 – 16:00</p>
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
