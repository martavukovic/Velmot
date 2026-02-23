"use client";

import { useState } from "react";
import styles from "./services.module.css";

export default function ServicesClient({ services, allImages }) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? services
      : services.filter((s) => s.title === active);

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Our Services</h1>
          <p>
            Comprehensive electrical engineering and industrial service
            solutions tailored for reliability, efficiency and long-term
            performance.
          </p>
        </header>

        {/* ✅ FILTER BAR */}
        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${
              active === "All" ? styles.active : ""
            }`}
            onClick={() => setActive("All")}
          >
            All
          </button>

          {services.map((s) => (
            <button
              key={s.title}
              className={`${styles.filterBtn} ${
                active === s.title ? styles.active : ""
              }`}
              onClick={() => setActive(s.title)}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* ✅ ORIGINAL LOOK — untouched */}
        <div className={styles.list}>
          {filtered.map((service) => {
            const index = services.findIndex(
              (s) => s.title === service.title
            );

            const img = allImages[index];
            const imageUrl = img?.fields?.file?.url;

            return (
              <article key={service.title} className={styles.serviceRow}>
                <div className={styles.imageWrap}>
                  {imageUrl && (
                    <img
                      src={`https:${imageUrl}`}
                      alt={service.title}
                    />
                  )}
                </div>

                <div className={styles.content}>
                  <h2>{service.title}</h2>
                  <span className={styles.badge}>{service.short}</span>
                  <p>{service.long}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}