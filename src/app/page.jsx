"use client";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";

const services = [
  {
    title: "Electric Motor Repair",
    short: "Rewinding and diagnostics",
    long: "Comprehensive stator and rotor rewinding, fault diagnostics, insulation testing and performance validation for industrial electric motors.",
    icon: "⚙️"
  },
  {
    title: "Transformers",
    short: "Manufacturing & servicing",
    long: "Production, refurbishment and maintenance of power and distribution transformers, including testing and documentation.",
    icon: "🔌"
  },
  {
    title: "Electrical Installations",
    short: "Industrial electrical works",
    long: "Design and execution of electrical installations, system upgrades, industrial wiring and control cabinets.",
    icon: "💡"
  },
  {
    title: "Energy Systems",
    short: "Solar & auxiliary systems",
    long: "Off-grid solar systems, alternators, starter motors and auxiliary energy solutions for remote and industrial use.",
    icon: "☀️"
  },
  {
    title: "Industrial Diagnostics",
    short: "Testing & fault analysis",
    long: "Electrical measurements, thermal inspections and performance analysis for preventive maintenance and troubleshooting.",
    icon: "🔍"
  },
  {
    title: "Maintenance Programs",
    short: "Planned service",
    long: "Scheduled maintenance programs tailored to reduce downtime and extend equipment lifecycle.",
    icon: "🛠️"
  }
];

const images = [
  "/images/radiona.jpg",
  "/images/solari.jpg",
  "/images/motor.jpg",
  "/images/elektro.jpg",
  "/images/homepage.jpg",
];

export default function HomePage() {
  const [active, setActive] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
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
      <a href="/servicerequest" className={styles.primaryBtn}>Service Request</a>  {/* Promijenjen href */}
      <a href="/contact" className={styles.secondaryBtn}>Contact Us</a>
    </div>
  </div>
</section>

      {/* SERVICES */}
      <section className={styles.services}>
        <h2>Services</h2>
        <div className={styles.cards}>
          {services.map((s, i) => (
            <button
              key={i}
              className={`${styles.card} ${active === i ? styles.active : ""}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className={styles.cardHeader}>
                <h3>
                  <span className={styles.icon}>{s.icon}</span> {s.title}
                </h3>
                <span>{s.short}</span>
                {active !== i && (
                  <small style={{ display: "block", marginTop: "0.4rem", color: "#64748b", fontSize: "0.75rem" }}>
                    Click to expand...
                  </small>
                )}
              </div>
              {active === i && (
                <div className={styles.cardBody}>
                  <p>{s.long}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>


      {/* IMAGE CAROUSEL */}
      <section className={styles.carouselSection}>
        <div className={styles.carousel}>
         <button onClick={prevImage} aria-label="Previous Image" className={styles.carouselBtn}>
  ‹
</button>

          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className={styles.carouselImage}
          />

          <button onClick={nextImage} aria-label="Next Image" className={styles.carouselBtn}>
  ›
</button>
        </div>

        {/* DOTS */}
        <div className={styles.carouselDots}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${currentIndex === i ? styles.activeDot : ""}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setCurrentIndex(i);
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
    <a href="/servicerequest" className={`${styles.ctaButton} ${styles.primaryBtn}`}>
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
          <span>© {new Date().getFullYear()} Velmot. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
