// ===============================
// RequestServicePage.jsx
// ===============================
"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import styles from "./ServiceRequest.module.css";

const SERVICES = [
  { title: "Electric Motor Repair", short: "Rewinding and diagnostics" },
  { title: "Transformers", short: "Manufacturing & servicing" },
  { title: "Electrical Installations", short: "Industrial electrical works" },
  { title: "Energy Systems", short: "Solar & auxiliary systems" },
  { title: "Industrial Diagnostics", short: "Testing & fault analysis" },
  { title: "Maintenance Programs", short: "Planned service" },
];

export default function RequestServicePage() {
  const [serviceType, setServiceType] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [checkingUser, setCheckingUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // ❌ nije logiran → nazad na home + otvori login
      if (!user) {
        router.replace("/?redirect=/servicerequest");

        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("open-login"));
        }, 100);

                return;
      }

      // ✅ logiran → pusti dalje
setCheckingUser(false);
    };

    checkUser();
  }, [router]);

  // ⏳ loader dok provjerava
    if (checkingUser) {
      return (
        <div className={styles.pageLoader}>
          <div className={styles.spinner} />
        </div>
      );
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You need to sign in first!");
      setLoading(false);
      return;
    }

    let imageUrl = null;
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `service-requests/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);

if (uploadError) {
  console.error(uploadError);
  alert(uploadError.message);
  setLoading(false);
  return;
}
if (imageFile.size > 5 * 1024 * 1024) {
  alert("Image must be under 5MB");
  setLoading(false);
  return;
}

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    const { error } = await supabase.from("service_requests").insert([
      {
        user_id: user.id,
        service_type: serviceType ? serviceType.title : null,
        subject,
        description,
        company,
        images: imageUrl ? [imageUrl] : [],
      },
    ]);

    if (!error) {
      setSuccess(true);
      setServiceType(null);
      setSubject("");
      setDescription("");
      setCompany("");
      setImageFile(null);
    }

    setLoading(false);
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <h1>Request Service</h1>
          <p>
            Tell us what you need. Our technical team will review your request
            and get back to you shortly.
          </p>
        </header>

        {/* SERVICE PICKER */}
        <section className={styles.step}>
          <h2>Select a service</h2>

          <div className={styles.serviceGrid}>
            {SERVICES.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() =>
                  setServiceType(serviceType?.title === s.title ? null : s)
                }
                className={`${styles.serviceCard} ${
                  serviceType?.title === s.title ? styles.active : ""
                }`}
              >
                <strong>{s.title}</strong>
                <span>{s.short}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FORM */}
        <section className={styles.formSection}>
          <h2>Project details</h2>

          <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.field}>
              <label>Description</label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue, goals, deadlines…"
                required
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label>Company (optional)</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                />
              </div>

              <div className={styles.field}>
                <label>Upload image (optional)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              </div>
              {imageFile && (
              <div className={styles.imagePreview}>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className={styles.previewImg}
                />

            <button
              type="button"
              className={styles.removeImageBtn}
              onClick={() => {
                setImageFile(null);

                // 🔥 reset input value
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Remove image
            </button>
          </div>
        )}
            </div>
            <div className={styles.submit}>
            <button className={styles.submitBtn} disabled={loading}>
              {loading ? "Sending…" : "Submit request"}
            </button>
            </div>

            {success && (
              <p className={styles.success}>
                ✅ Request successfully submitted
              </p>
            )}
          </form>
        </section>
      </div>
    </section>
  );
}


// ===============================
// ServiceRequest.module.css
// ===============================


