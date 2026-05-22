// import Navbar from "./Navbar";
// import { Certificate } from "@phosphor-icons/react";

// export default function Notes() {
//     return (
//         <div className="bg-zinc-900 font-serif h-screen overflow-y-scroll ">

//             <Navbar />

//             <div className="container mx-auto px-4 py-8">
//                 <div className=" mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//                     <div className="bg-white p-2 rounded-md">
//                         <div className="">
//                             <img className="object-contain w-full h-64" src="https://media.licdn.com/dms/image/v2/D5622AQG_RYTjYVEyfg/feedshare-shrink_1280/B56Z2NRFIsKYAM-/0/1776191558425?e=1779202148&v=beta&t=fhKHn1nDtiY3_Yxejs3brpu_9lwagm0YQ74zSCqeq6M" alt="SA" />
//                         </div>
//                         <div className="p-2 text-center">
//                             <h3 className="text-slate-800 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>Software Architecture: Patterns for Developers</h3>
//                             <a href="https://www.linkedin.com/learning/certificates/ed196d57010db1148603a2213e1cb6fe287b1c08f469bbb6c61ebdf5f7ae3d0f?trk=share_certificate" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
//                         </div>
//                     </div>
//                     <div className="bg-white p-2 rounded-md">
//                         <div className="">
//                             <img className="object-contain w-full h-64" src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~FPVVPJ2ZC7F9/CERTIFICATE_LANDING_PAGE~FPVVPJ2ZC7F9.jpeg" alt="" />
//                         </div>
//                         <div className="p-2 text-center">
//                             <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>AI Foundations for Everyone</h3>
//                             <a href="https://coursera.org/share/cef8734df2b492650b47b5accbc9d10b" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
//                         </div>
//                     </div>

//                     <div className="bg-white p-2 rounded-md">
//                         <div className="">
//                             <img className="object-contain w-full h-64" src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~TN6SBLCR47US/CERTIFICATE_LANDING_PAGE~TN6SBLCR47US.jpeg" alt="" />
//                         </div>
//                         <div className="p-2 text-center">
//                             <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>Leading People and Teams</h3>
//                             <a href="https://coursera.org/share/746e14424326f3efa99961ffb7554fc5" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
//                         </div>
//                     </div>

//                     {/* 2 */}
//                     <div className="bg-white p-2 rounded-md">
//                         <div className="">
//                             <img className="object-contain w-full h-64" src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~IFAR02UMDD0O/CERTIFICATE_LANDING_PAGE~IFAR02UMDD0O.jpeg" alt="" />
//                         </div>
//                         <div className="p-2 text-center">
//                             <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>The Art of the Job Interview</h3>
//                             <a href="https://coursera.org/share/aa1f8d46d97d6cfb646dc218c8cd1f13" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
//                         </div>
//                     </div>

//                     {/* 3 */}
//                     <div className="bg-white p-2 rounded-md">
//                         <div>
//                             <img className="object-contain w-full h-64" src="https://udemy-certificate.s3.amazonaws.com/image/UC-a39312cc-317c-45e7-bbda-033ffa8a85dd.jpg?v=1703609071000" alt="" />
//                         </div>
//                         <div className="p-2 text-center">
//                             <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>Figma Design Course</h3>
//                             <a href="https://www.udemy.com/certificate/UC-a39312cc-317c-45e7-bbda-033ffa8a85dd/" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
//                         </div>
//                     </div>

//                     {/* 4 */}
//                     <div className="bg-white p-2 rounded-md">
//                         <div>
//                             <img className="object-contain w-full h-64" src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~D5SLG3BE5WLR/CERTIFICATE_LANDING_PAGE~D5SLG3BE5WLR.jpeg" alt="" />
//                         </div>
//                         <div className="p-2 text-center">
//                             <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>C for Everyone: Programming</h3>
//                             <a href="https://coursera.org/share/c17aea30211de99ee27b74a68a79b836" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
//                         </div>
//                     </div>

//                     {/* 5 */}
//                     <div className="bg-white p-2 rounded-md">
//                         <div>
//                             <img className="object-contain w-full h-64" src="https://cc.sj-cdn.net/instructor/3d8458f2k85sh-postman/courses/1a8b8cdxvqjxq/promo-image.1676069333.png" alt="" />
//                         </div>
//                         <div className="p-2 text-center">
//                             <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>Postman API Student Expert</h3>
//                             <a href="https://badgr.com/public/assertions/ocdy-CL-SA6QQB5NnvdsyQ?identity__email=gaganbansal475%40gmail.com" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>



//         </div>
//     )
// }
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
    color: "#0e76a8",
    accent: "#0ea5e9",
  },
  {
    id: 2,
    title: "AI Foundations for Everyone",
    issuer: "Coursera / IBM",
    issuerTag: "CO",
    category: "AI & ML",
    img: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~FPVVPJ2ZC7F9/CERTIFICATE_LANDING_PAGE~FPVVPJ2ZC7F9.jpeg",
    link: "https://coursera.org/share/cef8734df2b492650b47b5accbc9d10b",
    color: "#059669",
    accent: "#34d399",
  },
  {
    id: 3,
    title: "Leading People and Teams",
    issuer: "Coursera / Michigan",
    issuerTag: "CO",
    category: "Leadership",
    img: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~TN6SBLCR47US/CERTIFICATE_LANDING_PAGE~TN6SBLCR47US.jpeg",
    link: "https://coursera.org/share/746e14424326f3efa99961ffb7554fc5",
    color: "#7c3aed",
    accent: "#a78bfa",
  },
  {
    id: 4,
    title: "The Art of the Job Interview",
    issuer: "Coursera",
    issuerTag: "CO",
    category: "Career",
    img: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~IFAR02UMDD0O/CERTIFICATE_LANDING_PAGE~IFAR02UMDD0O.jpeg",
    link: "https://coursera.org/share/aa1f8d46d97d6cfb646dc218c8cd1f13",
    color: "#b45309",
    accent: "#fbbf24",
  },
  {
    id: 5,
    title: "Figma Design Course",
    issuer: "Udemy",
    issuerTag: "UD",
    category: "Design",
    img: "https://udemy-certificate.s3.amazonaws.com/image/UC-a39312cc-317c-45e7-bbda-033ffa8a85dd.jpg?v=1703609071000",
    link: "https://www.udemy.com/certificate/UC-a39312cc-317c-45e7-bbda-033ffa8a85dd/",
    color: "#be185d",
    accent: "#f472b6",
  },
  {
    id: 6,
    title: "C for Everyone: Programming",
    issuer: "Coursera / UC Santa Cruz",
    issuerTag: "CO",
    category: "Engineering",
    img: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~D5SLG3BE5WLR/CERTIFICATE_LANDING_PAGE~D5SLG3BE5WLR.jpeg",
    link: "https://coursera.org/share/c17aea30211de99ee27b74a68a79b836",
    color: "#0f766e",
    accent: "#2dd4bf",
  },
  {
    id: 7,
    title: "Postman API Student Expert",
    issuer: "Postman",
    issuerTag: "PM",
    category: "Engineering",
    img: "https://cc.sj-cdn.net/instructor/3d8458f2k85sh-postman/courses/1a8b8cdxvqjxq/promo-image.1676069333.png",
    link: "https://badgr.com/public/assertions/ocdy-CL-SA6QQB5NnvdsyQ?identity__email=gaganbansal475%40gmail.com",
    color: "#ea580c",
    accent: "#fb923c",
  },
];

const categories = ["All", ...Array.from(new Set(certs.map((c) => c.category)))];

export default function Notes() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState(null);

  const filtered = active === "All" ? certs : certs.filter((c) => c.category === active);

  return (
    <div className="page-root">
      <Navbar />

      {/* ── Header ── */}
      <header className="cert-header">
        <div className="cert-header-inner">
          <p className="mono-tag">Credentials</p>
          <h1 className="cert-h1">Certificates &<br />Achievements</h1>
          <p className="cert-sub">
            A curated collection of completed courses and earned credentials spanning
            engineering, design, AI, and leadership.
          </p>

          {/* Stat row */}
          <div className="stat-row">
            {[
              { val: `${certs.length}`, label: "Certificates" },
              { val: "4", label: "Platforms" },
              { val: "4", label: "Domains" },
            ].map((s) => (
              <div key={s.label} className="stat-pill">
                <span className="stat-val">{s.val}</span>
                <span className="stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? "filter-btn--on" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="header-divider" />
      </header>

      {/* ── Grid ── */}
      <main className="cert-main">
        <div className="cert-grid">
          {filtered.map((c, i) => (
            <article
              key={c.id}
              className={`cert-card ${hovered === c.id ? "cert-card--hov" : ""}`}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ "--accent": c.accent, "--base": c.color, animationDelay: `${i * 0.07}s` }}
            >
              {/* Image zone */}
              <div className="card-img-wrap">
                <img src={c.img} alt={c.title} className="card-img" />
                <div className="card-img-overlay" />
                {/* Category badge */}
                <span className="card-cat" style={{ background: c.color }}>{c.category}</span>
              </div>

              {/* Body */}
              <div className="card-body">
                <div className="card-issuer">
                  <span className="issuer-badge">{c.issuerTag}</span>
                  <span className="issuer-name">{c.issuer}</span>
                </div>
                <h3 className="card-title">{c.title}</h3>

                <div className="card-footer">
                  <span className="card-icon-wrap">
                    <Certificate size={15} style={{ color: "var(--accent)" }} />
                    <span className="card-icon-text">Verified</span>
                  </span>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                    style={{ "--accent": c.accent, "--base": c.color }}
                  >
                    View <ArrowUpRight size={13} weight="bold" />
                  </a>
                </div>
              </div>

              {/* Accent line on hover */}
              <div className="card-accent-line" style={{ background: `var(--accent)` }} />
            </article>
          ))}
        </div>
      </main>

      {/* ── Footer note ── */}
      <div className="cert-footer-note">
        <Medal size={18} style={{ color: "#059669" }} />
        <span>All certificates are publicly verifiable via their respective platforms.</span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Geist+Mono:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; }

        .page-root {
          background: white;
          color: #0f172a;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Header ── */
        .cert-header {
          position: relative;
          background: #0f172a;
          padding: 110px 0 52px;
        }
        .cert-header-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .mono-tag {
          font-family: 'Geist Mono', monospace;
          font-size: 10.5px;
          color: #059669;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .12em;
          display: block;
          margin-bottom: 10px;
        }
        .cert-h1 {
          font-family: 'Crimson Text', serif;
          font-size: clamp(42px, 7vw, 68px);
          font-weight: 300;
          color: white;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 14px;
        }
        .cert-sub {
          font-size: 14px;
          color: #64748b;
          font-weight: 300;
          line-height: 1.65;
          max-width: 480px;
          margin: 0 0 28px;
        }

        /* stat row */
        .stat-row {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .stat-pill {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 10px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          min-width: 80px;
        }
        .stat-val {
          font-family: 'Geist Mono', monospace;
          font-size: 20px;
          font-weight: 600;
          color: #059669;
        }
        .stat-lbl {
          font-size: 10px;
          color: #475569;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        /* filter tabs */
        .filter-tabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .filter-btn {
          font-family: 'Geist Mono', monospace;
          font-size: 10.5px;
          font-weight: 500;
          padding: 5px 14px;
          border-radius: 20px;
          border: 1px solid #334155;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          transition: all 0.18s;
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .filter-btn:hover { border-color: #059669; color: #059669; }
        .filter-btn--on {
          background: #059669;
          border-color: #059669;
          color: white;
        }

        .header-divider {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #334155, transparent);
        }

        /* ── Main ── */
        .cert-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 52px 24px 40px;
        }

        /* ── Grid ── */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        /* ── Card ── */
        .cert-card {
          position: relative;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          animation: fadeUp 0.4s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cert-card--hov {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px -8px rgba(0,0,0,0.14);
          border-color: var(--accent, #059669);
        }

        /* image */
        .card-img-wrap {
          position: relative;
          height: 170px;
          overflow: hidden;
          background: #f8fafc;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.4s ease;
        }
        .cert-card--hov .card-img { transform: scale(1.04); }
        .card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.08) 100%);
        }
        .card-cat {
          position: absolute;
          top: 10px; right: 10px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          font-weight: 600;
          color: white;
          padding: 3px 9px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        /* body */
        .card-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .card-issuer {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .issuer-badge {
          font-family: 'Geist Mono', monospace;
          font-size: 8px;
          font-weight: 700;
          color: white;
          background: #334155;
          border-radius: 4px;
          padding: 2px 6px;
          letter-spacing: .05em;
        }
        .issuer-name {
          font-family: 'Geist Mono', monospace;
          font-size: 10px;
          color: #94a3b8;
          font-weight: 400;
        }
        .card-title {
          font-family: 'Crimson Text', serif;
          font-size: 17px;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.3;
          margin: 0;
          flex: 1;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .card-icon-wrap {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .card-icon-text {
          font-family: 'Geist Mono', monospace;
          font-size: 9.5px;
          color: #94a3b8;
          font-weight: 400;
        }
        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: 'Geist Mono', monospace;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--base, #059669);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          padding-bottom: 1px;
          transition: border-color 0.18s, color 0.18s;
        }
        .card-link:hover {
          border-color: var(--base, #059669);
        }

        /* bottom accent line */
        .card-accent-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          width: 0;
          transition: width 0.3s ease;
          border-radius: 0 0 10px 10px;
        }
        .cert-card--hov .card-accent-line { width: 100%; }

        /* ── Footer note ── */
        .cert-footer-note {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 24px 52px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #94a3b8;
          font-weight: 300;
          border-top: 1px solid #f1f5f9;
          padding-top: 20px;
        }

        @media (max-width: 600px) {
          .cert-grid { grid-template-columns: 1fr; }
          .cert-h1 { font-size: 38px; }
        }
      `}</style>
    </div>
  );
}