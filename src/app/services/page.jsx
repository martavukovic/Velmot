import { createClient } from "contentful";
import ServicesClient from "./ServicesClient";
import styles from "./services.module.css";

export const revalidate = 60;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

/* 🔹 STATIC COPY */
const SERVICES = [
  {
    title: "Electric Motor Repair",
    short: "Rewinding and diagnostics",
    long: `Professional rewinding, fault detection and complete refurbishment of
industrial electric motors. We perform insulation testing, bearing inspection,
thermal analysis and performance validation to ensure reliable long-term
operation even in demanding environments.`,
  },
  {
    title: "Transformers",
    short: "Manufacturing & servicing",
    long: `Custom transformer production, repair and lifecycle maintenance for
industrial and commercial applications. Our process includes electrical testing,
core inspection, oil checks and full documentation to guarantee efficiency,
safety and compliance with technical standards.`,
  },
  {
    title: "Electrical Installations",
    short: "Industrial electrical works",
    long: `Design and execution of low and medium voltage electrical installations.
We handle industrial wiring, control cabinets, facility upgrades and system
modernization with focus on safety, scalability and long-term reliability.`,
  },
  {
    title: "Energy Systems",
    short: "Solar & auxiliary systems",
    long: `Implementation of off-grid solar systems and supporting energy solutions.
We design and install efficient systems tailored for independence, stability and
optimal energy performance in residential and industrial settings.`,
  },
  {
    title: "Industrial Diagnostics",
    short: "Testing & fault analysis",
    long: `Advanced electrical diagnostics including thermal imaging, measurement
analysis and preventive inspections. Our goal is early fault detection and
downtime reduction through data-driven maintenance decisions.`,
  },
  {
    title: "Maintenance Programs",
    short: "Planned service",
    long: `Structured preventive maintenance programs designed to extend equipment
lifetime and minimize unexpected failures. We create service schedules tailored
to your operational load and critical infrastructure needs.`,
  },
];

async function getServicesImages() {
  const res = await client.getEntries({
    content_type: "services",
    include: 2,
  });

  return res.items;
}

export default async function ServicesPage() {
  const entries = await getServicesImages();

  const allImages = entries.flatMap(
    (item) => item.fields.service || []
  );

  return (
    <ServicesClient
      services={SERVICES}
      allImages={allImages}
    />
  );
}