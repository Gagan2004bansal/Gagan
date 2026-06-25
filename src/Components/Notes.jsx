import Navbar from "./Navbar";
import { Certificate, ArrowUpRight, Medal } from "@phosphor-icons/react";
import { useState } from "react";

const certs = [
  {
    id: 1,
    title: "Software Architecture: Patterns for Developers",
    issuer: "LinkedIn Learning",
    issuerTag: "LI",
    category: "Engineering",
    img: "https://media.licdn.com/dms/image/v2/D5622AQG_RYTjYVEyfg/feedshare-shrink_1280/B56Z2NRFIsKYAM-/0/1776191558425?e=1779475225&v=beta&t=pWZ0U2bVP6BW7GxmK8YsdvYwsOEUNNHsRoNJDtWpwZI",
    link: "https://www.linkedin.com/learning/certificates/ed196d57010db1148603a2213e1cb6fe287b1c08f469bbb6c61ebdf5f7ae3d0f?trk=share_certificate",
  },
  {
    id: 2,
    title: "AI Foundations for Everyone",
    issuer: "Coursera / IBM",
    issuerTag: "CO",
    category: "AI & ML",
    img: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~FPVVPJ2ZC7F9/CERTIFICATE_LANDING_PAGE~FPVVPJ2ZC7F9.jpeg",
    link: "https://coursera.org/share/cef8734df2b492650b47b5accbc9d10b",
  },
  {
    id: 3,
    title: "Leading People and Teams",
    issuer: "Coursera / Michigan",
    issuerTag: "CO",
    category: "Leadership",
    img: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~TN6SBLCR47US/CERTIFICATE_LANDING_PAGE~TN6SBLCR47US.jpeg",
    link: "https://coursera.org/share/746e14424326f3efa99961ffb7554fc5",
  },
  {
    id: 4,
    title: "The Art of the Job Interview",
    issuer: "Coursera",
    issuerTag: "CO",
    category: "Career",
    img: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~IFAR02UMDD0O/CERTIFICATE_LANDING_PAGE~IFAR02UMDD0O.jpeg",
    link: "https://coursera.org/share/aa1f8d46d97d6cfb646dc218c8cd1f13",
  },
  {
    id: 5,
    title: "Figma Design Course",
    issuer: "Udemy",
    issuerTag: "UD",
    category: "Design",
    img: "https://udemy-certificate.s3.amazonaws.com/image/UC-a39312cc-317c-45e7-bbda-033ffa8a85dd.jpg?v=1703609071000",
    link: "https://www.udemy.com/certificate/UC-a39312cc-317c-45e7-bbda-033ffa8a85dd/",
  },
  {
    id: 6,
    title: "C for Everyone: Programming",
    issuer: "Coursera / UC Santa Cruz",
    issuerTag: "CO",
    category: "Engineering",
    img: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~D5SLG3BE5WLR/CERTIFICATE_LANDING_PAGE~D5SLG3BE5WLR.jpeg",
    link: "https://coursera.org/share/c17aea30211de99ee27b74a68a79b836",
  },
  {
    id: 7,
    title: "Postman API Student Expert",
    issuer: "Postman",
    issuerTag: "PM",
    category: "Engineering",
    img: "https://cc.sj-cdn.net/instructor/3d8458f2k85sh-postman/courses/1a8b8cdxvqjxq/promo-image.1676069333.png",
    link: "https://badgr.com/public/assertions/ocdy-CL-SA6QQB5NnvdsyQ?identity__email=gaganbansal475%40gmail.com",
  },
];

const categories = ["All", ...Array.from(new Set(certs.map((c) => c.category)))];

export default function Notes() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState(null);

  const filtered = active === "All" ? certs : certs.filter((c) => c.category === active);

  return (
    <div style={s.root}>
      <Navbar />

      {/* ── Hero header ── */}
      <header style={s.hero}>
        {/* ruled background lines */}
        <div style={s.ruled} aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ ...s.ruledLine, top: `${12 + i * 12}%` }} />
          ))}
        </div>

        <div style={s.heroInner}>
          {/* <div style={s.eyebrowRow}>
            <span style={s.liveDot} />
            <span style={s.eyebrowText}>Credentials &amp; Certifications</span>
          </div> */}

          <h1 style={s.h1}>
            <span style={s.h1Bold}>Certificates</span>
            <span style={s.h1Light}>&amp; Achievements.</span>
          </h1>

          <p style={s.heroSub}>
            A curated collection of completed courses and earned credentials spanning
            engineering, design, AI, and leadership.
          </p>

          {/* Stats */}
          <div style={s.statsBar}>
            {[
              { val: `${certs.length}`, lbl: "Certificates" },
              { val: "4", lbl: "Platforms" },
              { val: "4", lbl: "Domains" },
            ].map((st) => (
              <div key={st.lbl} style={s.statItem}>
                <span style={s.statVal}>{st.val}</span>
                <span style={s.statLbl}>{st.lbl}</span>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div style={s.filterRow}>
            {categories.map((cat) => (
              <FilterBtn
                key={cat}
                label={cat}
                active={active === cat}
                onClick={() => setActive(cat)}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ── Grid ── */}
      <main style={s.main}>
        <div style={s.grid}>
          {filtered.map((c, i) => (
            <CertCard
              key={c.id}
              cert={c}
              hovered={hovered === c.id}
              onEnter={() => setHovered(c.id)}
              onLeave={() => setHovered(null)}
              delay={i * 0.07}
            />
          ))}
        </div>
      </main>

      {/* ── Footer note ── */}
      <div style={s.footerNote}>
        <Medal size={16} style={{ color: "#16a34a", flexShrink: 0 }} />
        <span>All certificates are publicly verifiable via their respective platforms.</span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        * { -webkit-font-smoothing: antialiased; }
        a { -webkit-tap-highlight-color: transparent; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(22,163,74,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(22,163,74,0); }
        }
      `}</style>
    </div>
  );
}

/* ── Filter button ── */
function FilterBtn({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        fontWeight: 500,
        padding: "5px 14px",
        borderRadius: "20px",
        border: active
          ? "1px solid #16a34a"
          : hov
          ? "1px solid #16a34a"
          : "1px solid #1f2937",
        background: active ? "#16a34a" : "transparent",
        color: active ? "#fff" : hov ? "#16a34a" : "#4b5563",
        cursor: "pointer",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        transition: "all 0.18s",
      }}
    >
      {label}
    </button>
  );
}

/* ── Certificate card ── */
function CertCard({ cert, hovered, onEnter, onLeave, delay }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        background: "#161616",
        border: `1px solid ${hovered ? "#16a34a" : "#1f2937"}`,
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s, transform 0.22s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        animation: `fadeUp 0.4s ease ${delay}s both`,
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "170px", overflow: "hidden", background: "#0f0f0f", flexShrink: 0 }}>
        {!imgErr ? (
          <img
            src={cert.img}
            alt={cert.title}
            onError={() => setImgErr(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top",
              display: "block",
              transition: "transform 0.38s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{ backgroundColor: "whitesmoke", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{  fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#374151" }}>
              {cert.issuer}
            </span>
          </div>
        )}
        {/* gradient fade into card */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
          background: "linear-gradient(to top, #161616, transparent)",
          pointerEvents: "none",
        }} />
        {/* Category pill */}
        <span style={{
          position: "absolute", top: "10px", right: "10px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px", fontWeight: 500,
          color: "", background: "rgba(22,163,74,0.18)",
          border: "1px solid rgba(22,163,74,0.3)",
          padding: "3px 9px", borderRadius: "20px",
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}>
          {cert.category}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        {/* Issuer row */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "8px", fontWeight: 700,
            color: "#d1fae5", background: "rgba(22,163,74,0.15)",
            border: "1px solid rgba(22,163,74,0.25)",
            borderRadius: "3px", padding: "2px 6px", letterSpacing: "0.05em",
          }}>
            {cert.issuerTag}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px", color: "#4b5563", fontWeight: 400,
          }}>
            {cert.issuer}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "14.5px", fontWeight: 600,
          color: hovered ? "#d1fae5" : "#f1f5f9",
          lineHeight: 1.35, letterSpacing: "-0.02em",
          flex: 1, transition: "color 0.2s",
        }}>
          {cert.title}
        </h3>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Certificate size={14} style={{ color: "#16a34a" }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9.5px", color: "#374151",
            }}>Verified</span>
          </span>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10.5px", fontWeight: 500,
              color: hovered ? "#86efac" : "#16a34a",
              textDecoration: "none",
              transition: "color 0.18s",
            }}
          >
            View <ArrowUpRight size={12} weight="bold" />
          </a>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: "2px",
        width: hovered ? "100%" : "0",
        background: "#16a34a",
        transition: "width 0.3s ease",
      }} />
    </article>
  );
}

/* ── Styles object ── */
const s = {
  root: {
    background: "#FAFAFA",
    color: "#111",
    minHeight: "100vh",
    overflowX: "hidden",
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  /* Hero */
  hero: {
    position: "relative",
    background: "#0D0D0D",
    padding: "120px 0 56px",
    overflow: "hidden",
  },
  ruled: { position: "absolute", inset: 0, pointerEvents: "none" },
  ruledLine: { position: "absolute", left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.03)" },
  heroInner: { maxWidth: "900px", margin: "0 auto", padding: "0 28px" },

  eyebrowRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" },
  liveDot: {
    display: "inline-block", width: "7px", height: "7px",
    borderRadius: "50%", background: "#16a34a",
    animation: "livePulse 2s ease-in-out infinite",
  },
  eyebrowText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px", color: "#6b7280", letterSpacing: "0.06em",
  },

  h1: {
    fontFamily: "'Space Grotesk', sans-serif",
    lineHeight: 0.96, letterSpacing: "-0.04em",
    marginBottom: "18px",
  },
  h1Bold: {
    display: "block",
    fontSize: "clamp(52px, 11vw, 100px)",
    fontWeight: 700, color: "#ffffff",
  },
  h1Light: {
    display: "block",
    fontSize: "clamp(52px, 11vw, 100px)",
    fontWeight: 300, color: "rgba(255,255,255,0.22)",
  },

  heroSub: {
    fontSize: "14px", color: "#6b7280", fontWeight: 300,
    lineHeight: 1.72, maxWidth: "480px", marginBottom: "28px",
  },

  /* Stats */
  statsBar: {
    display: "flex", gap: "0",
    background: "#111", border: "1px solid #1f2937",
    borderRadius: "8px", overflow: "hidden",
    marginBottom: "24px", width: "fit-content",
  },
  statItem: {
    padding: "14px 24px",
    borderRight: "1px solid #1f2937",
    display: "flex", flexDirection: "column", gap: "2px",
  },
  statVal: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "22px", fontWeight: 700,
    color: "#f1f5f9", letterSpacing: "-0.03em",
  },
  statLbl: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "9.5px", color: "#4b5563",
    textTransform: "uppercase", letterSpacing: "0.08em",
  },

  /* Filter */
  filterRow: { display: "flex", gap: "6px", flexWrap: "wrap" },

  /* Main */
  main: { maxWidth: "900px", margin: "0 auto", padding: "48px 28px 40px" },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "12px",
  },

  /* Footer note */
  footerNote: {
    maxWidth: "900px", margin: "0 auto",
    padding: "20px 28px 52px",
    display: "flex", alignItems: "center", gap: "8px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "10.5px", color: "#374151",
    borderTop: "1px solid #e5e7eb",
  },
};