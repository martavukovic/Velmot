import { createClient } from "contentful";
import styles from "./services.module.css";

export const revalidate = 60;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function getServices() {
  const res = await client.getEntries({
    content_type: "services",
    include: 2,
  });

  return res.items;
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className={styles.services}>
      <div className={styles.grid}>
        {services.map((item) => (
          <div key={item.sys.id} className={styles.card}>
            <div className={styles.imageGallery}>
              {item.fields.service?.map((img) => {
                const url = img?.fields?.file?.url;
                if (!url) return null;

                return (
                  <img
                    key={url}
                    src={`https:${url}`}
                    alt={item.fields.title}
                    className={styles.image}
                  />
                );
              })}
            </div>

            <h3>{item.fields.title}</h3>
            <p>{item.fields.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}