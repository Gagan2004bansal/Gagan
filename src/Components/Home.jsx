import React, { useState, useEffect } from 'react';
import { LinkedinLogo, GithubLogo, Heart, ArrowUpRight } from "@phosphor-icons/react";
import Navbar from './Navbar';

/* ─── Side Dot Rail ─────────────────────────────────────────── */
const DOTS = Array.from({ length: 20 });

function SideDots({ side }) {
  return (
    <div className="side-dots-wrap" data-side={side}>
      {DOTS.map((_, i) => (
        <span key={i} className="sdot" style={{ animationDelay: `${i * 0.13}s` }} />
      ))}
    </div>
  );
}

/* ─── GenAI Constellation ─────────────────────────────────── */
const AI_NODES = [
  { id: 'rag',       label: 'RAG',       full: 'Retrieval-Augmented Generation', x: 68,  y: 95,  status: 'building' },
  { id: 'vectordb',  label: 'VectorDB',  full: 'Embeddings & Semantic Search',   x: 208, y: 42,  status: 'learning' },
  { id: 'tokens',    label: 'Tokens',    full: 'Tokenization & Context Windows', x: 320, y: 115, status: 'building' },
  { id: 'mcp',       label: 'MCP',       full: 'Model Context Protocol',         x: 442, y: 55,  status: 'learning' },
  { id: 'langchain', label: 'LangChain', full: 'LLM Orchestration Framework',    x: 548, y: 118, status: 'building' },
];

const EDGES = [[0,1],[0,2],[1,2],[2,3],[2,4],[3,4]];

function AIGraph() {
  const [hov, setHov] = useState(null);

  return (
    <svg viewBox="0 0 620 185" style={{ width: '100%', overflow: 'visible' }}>
      {/* ── Edges with traveling signal dots ── */}
      {EDGES.map(([a, b], i) => {
        const na = AI_NODES[a], nb = AI_NODES[b];
        const fwd = `M${na.x},${na.y} L${nb.x},${nb.y}`;
        const rev = `M${nb.x},${nb.y} L${na.x},${na.y}`;
        return (
          <g key={i}>
            <line
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="#059669" strokeWidth="0.8" opacity="0.18" strokeDasharray="3 3"
            />
            <circle r="2.2" fill="#059669" opacity="0.7">
              <animateMotion dur={`${2.8 + i * 0.35}s`} repeatCount="indefinite" begin={`${i * 0.55}s`} path={fwd} />
            </circle>
            <circle r="1.4" fill="#34d399" opacity="0.45">
              <animateMotion dur={`${3.4 + i * 0.28}s`} repeatCount="indefinite" begin={`${i * 0.7 + 1.1}s`} path={rev} />
            </circle>
          </g>
        );
      })}

      {/* ── Nodes ── */}
      {AI_NODES.map((node, i) => {
        const isHov = hov === node.id;
        return (
          <g
            key={node.id}
            onMouseEnter={() => setHov(node.id)}
            onMouseLeave={() => setHov(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Pulsing ring */}
            <circle
              cx={node.x} cy={node.y} r="18"
              fill="none" stroke="#059669" strokeWidth="0.6"
              className="node-ring"
              style={{ animationDelay: `${i * 0.42}s` }}
            />
            {/* Main circle */}
            <circle
              cx={node.x} cy={node.y} r="19"
              fill={isHov ? '#059669' : '#0f1e2e'}
              stroke={isHov ? '#34d399' : '#059669'}
              strokeWidth={isHov ? '1.5' : '1'}
              style={{ transition: 'fill 0.22s, stroke 0.22s' }}
            />
            {/* Inner fill */}
            <circle
              cx={node.x} cy={node.y} r="14"
              fill={isHov ? '#047857' : '#122435'}
              style={{ transition: 'fill 0.22s' }}
            />
            {/* Label */}
            <text
              x={node.x} y={node.y}
              textAnchor="middle" dominantBaseline="central"
              fill={isHov ? '#d1fae5' : '#34d399'}
              style={{ fontFamily: "'Geist Mono', monospace", fontSize: '8px', fontWeight: '700', transition: 'fill 0.22s' }}
            >
              {node.label}
            </text>
            {/* Status dot */}
            <circle
              cx={node.x + 14} cy={node.y - 14} r="4"
              fill={node.status === 'building' ? '#059669' : '#f59e0b'}
              stroke="#0f172a" strokeWidth="1.2"
            />
            {/* Hover tooltip */}
            {isHov && (
              <text
                x={node.x} y={node.y + 32}
                textAnchor="middle"
                fill="#94a3b8"
                style={{ fontFamily: "'Geist Mono', monospace", fontSize: '7px' }}
              >
                {node.full}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const projects = [
    {
      title: 'KVMemo', sub: 'High-performance key-value store',
      desc: 'Cross-platform concurrent KV store in C++ with focus on performance and clean architecture.',
      tags: ['C++', 'Systems', 'Concurrency'], link: 'https://www.kvmemo.dev/',
    },
    {
      title: 'FlarePP', sub: 'Creator-editor collaboration platform',
      desc: 'Upload, assign, collaborate, and publish directly to YouTube end-to-end.',
      tags: ['MERN', 'YouTube API', 'Real-time'], link: 'https://github.com/Gagan2004bansal/',
    },
    {
      title: 'SANGAM', sub: 'Collaborative note-taking',
      desc: 'Real-time collaborative notes with powerful organization and team features.',
      tags: ['React', 'Real-time', 'Web'], link: 'https://github.com/Gagan2004bansal/SANGAM',
    },
    {
      title: 'CDS Library', sub: 'Custom C data structures',
      desc: 'Comprehensive C library with linked lists, trees, graphs, and sorting algorithms.',
      tags: ['C', 'Algorithms', 'DSA'], link: 'https://github.com/Gagan2004bansal/CDS',
    },
  ];

  const skills = [
    { cat: 'Languages', items: ['C/C++', 'Rust', 'JavaScript', 'Java'] },
    { cat: 'Web', items: ['React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Tailwind'] },
    { cat: 'Systems', items: ['Linux', 'AWS', 'Docker', 'Git', 'Figma'] },
    { cat: 'Core', items: ['System Design', 'DSA', 'Databases', 'OS', 'Networks'] },
  ];

  return (
    <div className="pr">
      <SideDots side="left" />
      <SideDots side="right" />
      <Navbar />

      {/* ── Hero ─────────────────────────────────── */}
      <section className="hero-wrap">
        <div className="container">
          <p className="mono-tag">Software Engineer</p>
          <h1 className="hero-name">Gagan<br />Bansal</h1>
          <p className="hero-desc">
            I build <em className="eg">scalable systems</em> and craft thoughtful digital experiences.
            Currently researching low-level optimizations at <em className="eg">Quark Software</em> (Trilogy).
            Student at Chitkara University.
          </p>
          <div className="hero-links">
            <a href="#contact" className="flex items-center gap-x-2 hover:underline">
              Get in touch <ArrowUpRight size={14} weight="bold" />
            </a>
            <a href="/Data/GaganResume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Resume <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="divider" />
      </section>

      {/* ── About ────────────────────────────────── */}
      <section id="about" className="section bg-soft">
        <div className="container">
          <div className="about-grid">
            <div>
              <h2 className="sh">About me</h2>
              <p className="bt">Final year CS student passionate about understanding systems at a fundamental level —
                from CPU architectures to distributed systems design.</p>
              <p className="bt">At Quark, integrating client-side code with legacy C++ servers and learning how real
                systems age and evolve. Equally interested in modern web tech and low-level optimizations.</p>
              <p className="bt">Outside code: systems design reading, writing, guitar, and exploring the night sky.</p>
            </div>
            <div className="about-aside">
              <p className="mono-tag-sm">Key Stats</p>
              <table className="stats-table">
                <tbody>
                  {[['CGPA','9.41'],['DSA Problems','1300+'],['Dept Rank','Top 80/2500'],['Hackathon','Finalist']].map(([k,v])=>(
                    <tr key={k}>
                      <td className="stat-k">{k}</td>
                      <td className="stat-v">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mono-tag-sm" style={{ marginTop: '20px' }}>Social</p>
              <div className="socials">
                <a href="https://github.com/Gagan2004bansal" target="_blank" rel="noopener noreferrer" className="si"><GithubLogo size={18} /></a>
                <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer" className="si"><LinkedinLogo size={18} /></a>
                <a href="https://leetcode.com/u/Gagan_Bansal/" target="_blank" rel="noopener noreferrer" className="si si-text">LC</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────── */}
      <section id="work" className="section">
        <div className="container">
          <h2 className="sh">Experience</h2>
          <div className="exp-card">
            <div className="exp-top">
              <div>
                <h3 className="exp-title">R&D Intern</h3>
                <span className="exp-co">Quark (Trilogy)</span>
              </div>
              <span className="mono-date">Jan 2026 – Now</span>
            </div>
            <ul className="exp-list">
              <li>Research on gSOAP client-side integration with Axis2 C/C++ servers</li>
              <li>Modernizing legacy codebases for ARM64 architecture support</li>
              <li>Deep dive into low-level optimizations and system design patterns</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────── */}
      <section id="projects" className="section bg-soft">
        <div className="container">
          <h2 className="sh">Projects</h2>
          <div className="proj-grid">
            {projects.map((p, i) => (
              <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="proj-card">
                <div className="proj-top">
                  <div>
                    <h3 className="proj-title">{p.title}</h3>
                    <p className="proj-sub">{p.sub}</p>
                  </div>
                  <ArrowUpRight size={15} className="proj-arrow" />
                </div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tags">
                  {p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── GenAI Exploration ────────────────────── */}
      <section className="section genai-section">
        <div className="container">
          <div className="genai-head">
            <h2 className="sh" style={{ color: 'white', margin: 0 }}>GenAI Exploration</h2>
            <div className="legend">
              <span className="leg-item"><span className="leg-dot green" />Building</span>
              <span className="leg-item"><span className="leg-dot amber" />Learning</span>
            </div>
          </div>
          <p className="bt" style={{ color: '#94a3b8', marginBottom: '20px', marginTop: '6px' }}>
            Actively exploring the GenAI stack — from fundamentals to production systems.
            Hover the nodes to inspect each technology.
          </p>

          {/* Graph */}
          <div className="genai-graph">
            <AIGraph />
          </div>

          {/* Info chips */}
          <div className="genai-chips">
            {AI_NODES.map(n => (
              <div key={n.id} className={`chip chip-${n.status}`}>
                <span className={`chip-dot ${n.status}`} />
                <span className="chip-label">{n.label}</span>
                <span className="chip-sep">·</span>
                <span className="chip-desc">{n.full}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────── */}
      <section className="section bg-soft">
        <div className="container">
          <h2 className="sh">Skills &amp; Tools</h2>
          <div className="skills-grid">
            {skills.map((g, i) => (
              <div key={i}>
                <p className="mono-tag-sm">{g.cat}</p>
                <div className="skill-items">
                  {g.items.map((item, j) => (
                    <span key={j} className="skill-item">
                      <span className="skill-dot" />{item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────── */}
      <section id="contact" className="contact-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="contact-h">Let's work<br />together</h2>
          <p className="contact-desc">
            Always interested in hearing about interesting projects and opportunities.
            Drop a message and let's create something meaningful.
          </p>
          <div className="contact-links">
            <a href="mailto:bansalgagan2004@gmail.com" className="cb-primary">Send me an email</a>
            <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer" className="cb-ghost">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#94a3b8', fontWeight: 300 }}>
            Developed with <Heart size={13} weight="fill" style={{ color: '#059669' }} /> by Gagan
          </div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: '11px', color: '#94a3b8' }}>
            © 2026 · gagan
          </div>
          <div className="footer-links">
            <a href="https://github.com/Gagan2004bansal" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Geist+Mono:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        a { -webkit-tap-highlight-color: transparent; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* ── Root ── */
        .pr { background: white; color: #0f172a; overflow-x: hidden; min-height: 100vh; }

        /* ── Side Dots ── */
        .side-dots-wrap {
          position: fixed; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 7px;
          z-index: 50; pointer-events: none;
        }
        .side-dots-wrap[data-side="left"]  { left: 11px; }
        .side-dots-wrap[data-side="right"] { right: 11px; }
        .sdot {
          display: block; width: 4px; height: 4px;
          border-radius: 50%; background: #059669;
          animation: blink 2.6s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50%       { opacity: 0.75; transform: scale(1.4); }
        }

        /* ── Layout helpers ── */
        .container { max-width: 860px; margin: 0 auto; padding: 0 24px; }
        .section    { padding: 56px 0; }
        .bg-soft    { background: #f8fafc; }
        .divider {
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, #e2e8f0, transparent);
        }

        /* ── Typography ── */
        .sh {
          font-family: 'Crimson Text', serif; font-size: 30px; font-weight: 300;
          color: #0f172a; margin: 0 0 20px; letter-spacing: -0.01em;
        }
        .mono-tag {
          font-family: 'Geist Mono', monospace; font-size: 10.5px;
          color: #059669; font-weight: 500; text-transform: uppercase; letter-spacing: .1em;
        }
        .mono-tag-sm {
          font-family: 'Geist Mono', monospace; font-size: 9.5px;
          color: #059669; font-weight: 500; text-transform: uppercase;
          letter-spacing: .1em; margin: 0 0 10px; display: block;
        }
        .mono-date {
          font-family: 'Geist Mono', monospace; font-size: 10px;
          color: #94a3b8; font-weight: 500; white-space: nowrap;
        }
        .bt { font-size: 14px; color: #475569; line-height: 1.7; font-weight: 300; margin: 0 0 11px; }
        .eg { color: #059669; font-style: normal; font-weight: 500; }

        /* ── Hero ── */
        .hero-wrap { position: relative; }
        .hero-wrap .container { padding-top: 110px; padding-bottom: 56px; }
        .hero-name {
          font-family: 'Crimson Text', serif;
          font-size: clamp(54px, 9vw, 82px); font-weight: 300;
          line-height: 1.02; letter-spacing: -0.025em; color: #0f172a;
          margin: 10px 0 14px;
        }
        .hero-desc {
          font-size: 15px; color: #475569; max-width: 520px;
          line-height: 1.65; font-weight: 300; margin-bottom: 22px;
        }
        .hero-links { display: flex; gap: 18px; align-items: center; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 500; color: #0f172a;
          border-bottom: 2px solid #059669; padding-bottom: 2px;
          text-decoration: none; transition: color .18s;
        }
        .btn-primary:hover { color: #059669; }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 400; color: #64748b;
          border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;
          text-decoration: none; transition: color .18s, border-color .18s;
        }
        .btn-ghost:hover { color: #0f172a; border-color: #0f172a; }

        /* ── About ── */
        .about-grid {
          display: grid; grid-template-columns: 1fr 200px; gap: 48px; align-items: start;
        }
        @media(max-width:640px){ .about-grid { grid-template-columns: 1fr; } }
        .about-aside {}
        .stats-table { width: 100%; border-collapse: collapse; }
        .stats-table tr { border-bottom: 1px solid #f1f5f9; }
        .stat-k { font-size: 12px; color: #64748b; font-weight: 300; padding: 6px 0; }
        .stat-v {
          font-family: 'Geist Mono', monospace; font-size: 11px;
          font-weight: 600; color: #0f172a; text-align: right; padding: 6px 0;
        }
        .socials { display: flex; gap: 10px; align-items: center; }
        .si { color: #94a3b8; text-decoration: none; transition: color .18s; }
        .si:hover { color: #0f172a; }
        .si-text { font-size: 11.5px; font-weight: 700; font-family: 'Geist Mono', monospace; }

        /* ── Experience ── */
        .exp-card { border-left: 2px solid #059669; padding-left: 18px; }
        .exp-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 10px; gap: 12px; flex-wrap: wrap;
        }
        .exp-title { font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 2px; }
        .exp-co { font-size: 12.5px; color: #059669; font-weight: 500; }
        .exp-list { list-style: none; padding: 0; margin: 0; }
        .exp-list li {
          font-size: 13px; color: #475569; font-weight: 300;
          padding: 3px 0; line-height: 1.6;
        }
        .exp-list li::before { content: '→ '; color: #059669; }

        /* ── Projects ── */
        .proj-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: #e2e8f0;
          border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;
        }
        @media(max-width:600px){ .proj-grid { grid-template-columns: 1fr; } }
        .proj-card {
          background: white; text-decoration: none; display: block;
          padding: 20px 22px; transition: background .18s;
        }
        .proj-card:hover { background: #f0fdf4; }
        .proj-card:hover .proj-title { color: #059669; }
        .proj-card:hover .proj-arrow { color: #059669; }
        .proj-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 7px; }
        .proj-title { font-size: 15px; font-weight: 600; color: #0f172a; margin: 0 0 2px; transition: color .18s; }
        .proj-sub { font-size: 11.5px; color: #94a3b8; font-weight: 300; }
        .proj-desc { font-size: 12.5px; color: #475569; line-height: 1.55; font-weight: 300; margin: 0 0 10px; }
        .proj-arrow { color: #cbd5e1; transition: color .18s; flex-shrink: 0; margin-top: 2px; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .tag {
          font-family: 'Geist Mono', monospace; font-size: 10px;
          color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 3px;
        }

        /* ── GenAI ── */
        .genai-section { background: #0b1626; }
        .genai-head {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; margin-bottom: 4px;
        }
        .legend { display: flex; gap: 14px; align-items: center; }
        .leg-item {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Geist Mono', monospace; font-size: 10px; color: #64748b;
        }
        .leg-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; }
        .leg-dot.green { background: #059669; }
        .leg-dot.amber { background: #f59e0b; }

        .genai-graph {
          background: #0f1e2e; border: 1px solid #1a3550;
          border-radius: 8px; padding: 22px 14px 10px; margin-bottom: 14px;
        }

        /* Node ring pulse (SVG) */
        .node-ring {
          animation: ringPulse 2.6s ease-out infinite;
          transform-box: fill-box; transform-origin: center;
        }
        @keyframes ringPulse {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.9); opacity: 0; }
        }

        .genai-chips { display: flex; flex-wrap: wrap; gap: 7px; }
        .chip {
          display: flex; align-items: center; gap: 6px;
          background: #0f1e2e; border: 1px solid #1a3550;
          border-radius: 20px; padding: 5px 12px;
          transition: border-color .2s, background .2s;
        }
        .chip:hover { border-color: #059669; background: #0d2818; }
        .chip-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .chip-dot.building { background: #059669; }
        .chip-dot.learning { background: #f59e0b; }
        .chip-label {
          font-family: 'Geist Mono', monospace; font-size: 11px;
          font-weight: 600; color: #e2e8f0;
        }
        .chip-sep { color: #334155; font-size: 11px; }
        .chip-desc { font-size: 10.5px; color: #4a6280; font-weight: 300; }

        /* ── Skills ── */
        .skills-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px 36px;
        }
        @media(min-width:640px){ .skills-grid { grid-template-columns: repeat(4, 1fr); } }
        .skill-items { display: flex; flex-direction: column; gap: 6px; }
        .skill-item {
          font-size: 13px; color: #475569; font-weight: 300;
          display: flex; align-items: center; gap: 7px;
        }
        .skill-dot {
          display: inline-block; width: 5px; height: 5px;
          background: #059669; border-radius: 50%; flex-shrink: 0;
        }

        /* ── Contact ── */
        .contact-section { padding: 72px 0; background: #0f172a; color: white; }
        .contact-h {
          font-family: 'Crimson Text', serif;
          font-size: clamp(38px, 7vw, 58px); font-weight: 300;
          line-height: 1.08; margin: 0 0 14px;
        }
        .contact-desc {
          font-size: 14px; color: #94a3b8; font-weight: 300;
          line-height: 1.65; max-width: 420px; margin: 0 auto 28px;
        }
        .contact-links { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .cb-primary {
          padding: 9px 22px; background: #059669; color: white;
          font-size: 13px; font-weight: 500; border-radius: 4px;
          text-decoration: none; transition: background .18s;
        }
        .cb-primary:hover { background: #047857; }
        .cb-ghost {
          padding: 9px 22px; border: 1px solid #334155; color: white;
          font-size: 13px; font-weight: 400; border-radius: 4px;
          text-decoration: none; transition: border-color .18s;
        }
        .cb-ghost:hover { border-color: white; }

        /* ── Footer ── */
        .footer { background: white; border-top: 1px solid #e2e8f0; padding: 18px 0; }
        .footer-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        .footer-links { display: flex; gap: 16px; }
        .footer-links a {
          color: #94a3b8; text-decoration: none; font-size: 12px;
          transition: color .18s;
        }
        .footer-links a:hover { color: #0f172a; }
      `}</style>
    </div>
  );
}