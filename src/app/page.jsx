"use client";
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
  const [active, setActive] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true); // fade in
      }, 400); // trajanje fade out
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const prevImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFade(true);
    }, 400);
  };

  const nextImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 400);
  };

  const handlePrev = () => {
    setIsPaused(true);
    prevImage();
  };

  const handleNext = () => {
    setIsPaused(true);
    nextImage();
  };

  return (
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
                className={`${styles.card} ${
                  active === i ? styles.active : ""
                }`}
                onClick={() => setActive(active === i ? null : i)}
              >
                <div className={styles.cardHeader}>
                  <Icon size={22} />
                  <div>
                    <h3>{s.title}</h3>
                    <span>{s.short}</span>
                  </div>
                </div>

                <div
                  className={`${styles.cardBody} ${
                    active === i ? styles.expand : styles.collapse
                  }`}
                >
                  <p>{s.long}</p>
                </div>

                {active !== i && (
                  <span className={styles.expandHint}>
                    Click to expand
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* IMAGE CAROUSEL */}
      <section className={styles.carouselSection}>
        <div className={styles.carousel}>
          <button onClick={handlePrev} className={styles.carouselBtn}>‹</button>

          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className={styles.carouselImage}
            style={{ opacity: fade ? 1 : 0, transition: "opacity 0.4s ease-in-out" }}
          />

          <button onClick={handleNext} className={styles.carouselBtn}>›</button>
        </div>

        <div className={styles.carouselDots}>
          {images.map((_, i) => (
            <span
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Go to image ${i + 1}`}
              className={`${styles.dot} ${
                currentIndex === i ? styles.activeDot : ""
              }`}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setFade(true);
                }, 400);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setFade(false);
                  setTimeout(() => {
                    setCurrentIndex(i);
                    setFade(true);
                  }, 400);
                }
              }}
            />
          ))}
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
  );
}
