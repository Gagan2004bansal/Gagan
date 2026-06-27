import React, { useState, useEffect, useRef } from 'react';
import { LinkedinLogo, GithubLogo, ArrowUpRight, MusicNote, Camera, Airplane } from "@phosphor-icons/react";
import Navbar from './Navbar';

/* ── Typewriter for hero tagline ── */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timer;
    if (!deleting && displayed.length < word.length) {
      timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 68);
    } else if (!deleting && displayed.length === word.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % words.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, words]);

  return (
    <span className="tw-word">
      {displayed}<span className="tw-cursor">|</span>
    </span>
  );
}

/* ── Scroll-in observer ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.62s ease ${delay}s, transform 0.62s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── GenAI Section ── */
const GENAI_SKILLS = [
  { label: 'RAG Pipelines',     status: 'done',     desc: 'Multi-doc retrieval with Pinecone + Gemini' },
  { label: 'LangChain',         status: 'done',     desc: 'LLM orchestration & chain composition' },
  { label: 'LangGraph',         status: 'active',     desc: 'Stateful agentic graph workflows' },
  { label: 'FastAPI',           status: 'active',   desc: 'Python async API server for AI backends' },
  { label: 'MCP',               status: 'active',   desc: 'Model Context Protocol server development' },
  { label: 'LLM Evals',         status: 'active',   desc: 'Evaluation frameworks & benchmarking' },
  { label: 'Deep Learning',     status: 'learning', desc: 'Neural nets, backprop, transformers from scratch' },
  { label: 'Vector Databases',  status: 'done',     desc: 'Pinecone, embeddings, semantic search' },
];

const STATUS_META = {
  done:     { label: 'Shipped', color: '#16a34a', bg: 'rgba(22,163,74,0.10)' },
  active:   { label: 'Active',  color: '#2563eb', bg: 'rgba(37,99,235,0.10)' },
  learning: { label: 'Deep-dive', color: '#d97706', bg: 'rgba(217,119,6,0.10)' },
};

const GITHUB_REPOS = [
  { repo: 'Gagan2004bansal/Genei-AI', label: 'Genei AI', desc: 'Multi-PDF RAG chatbot — FastAPI, Gemini, Pinecone, React' },
  { repo: 'Gagan2004bansal/KVMemo',     label: 'KVMemo',         desc: 'Multithreaded C++ key-value store with WAL & LRU eviction' },
  // { repo: 'Gagan2004bansal/OForge',     label: 'OForge',         desc: 'Database schema design tool with real-time collaboration' },
];

function RepoCard({ repo, label, desc }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => setErr(true));
  }, [repo]);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card"
    >
      <div className="repo-top">
        <span className="repo-name">{label}</span>
        <ArrowUpRight size={14} className="repo-arrow" />
      </div>
      <p className="repo-desc">{desc}</p>
      {data && (
        <div className="repo-meta">
          {data.language && <span className="repo-tag">{data.language}</span>}
          <span className="repo-stat">⭐ {data.stargazers_count}</span>
          <span className="repo-stat">⑂ {data.forks_count}</span>
          {data.topics?.slice(0, 2).map(t => (
            <span key={t} className="repo-tag">{t}</span>
          ))}
        </div>
      )}
      {err && <p className="repo-err">github.com/{repo}</p>}
    </a>
  );
}

/* ── Main ── */
export default function Home() {
  const projects = [
    {
      title: 'Genei AI',
      sub: 'RAG · LLM · Vector Search',
      desc: 'Production-grade multi-PDF RAG chatbot. FastAPI backend with Pinecone vector store, Google Gemini embeddings, and a dark SaaS React frontend.',
      tags: ['FastAPI', 'LangChain', 'Pinecone', 'Gemini', 'React'],
      link: 'https://github.com/Gagan2004bansal/Genei-AI',
      year: '2026',
    },
    {
      title: 'KVMemo',
      sub: 'Systems · C++ · Concurrency',
      desc: 'High-throughput concurrent key-value store written in modern C++. Write-ahead logging, LRU eviction, ARM64 and x86-64 support.',
      tags: ['C++', 'Multithreading', 'Systems', 'ARM64'],
      link: 'https://www.kvmemo.dev/',
      year: '2026',
    },
    {
      title: 'OForge',
      sub: 'Full-stack · Real-time · Postgres',
      desc: 'Collaborative database schema designer with real-time messaging, Socket.IO presence indicators, and a React Flow canvas.',
      tags: ['React', 'PostgreSQL', 'Socket.IO', 'Node.js'],
      link: 'https://oforge.vercel.app',
      year: '2026',
    },
    {
      title: 'FlarePP',
      sub: 'MERN · YouTube API',
      desc: 'Creator-editor collaboration platform — upload, review, and publish video content end-to-end with a YouTube API integration.',
      tags: ['MongoDB', 'Express', 'React', 'YouTube API'],
      link: 'https://github.com/Gagan2004bansal/',
      year: '2025',
    },
  ];

  const skills = [
    { cat: 'Languages',  items: ['C++', 'JavaScript', 'Python', 'Java'] },
    { cat: 'Systems',    items: ['Linux', 'Docker', 'Git', 'AWS', 'ARM64'] },
    { cat: 'Backend',    items: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB'] },
    { cat: 'Frontend',   items: ['React', 'Vite', 'Tailwind', 'Socket.IO'] },
    { cat: 'GenAI',      items: ['LangChain', 'LangGraph', 'Pinecone', 'Gemini API', 'MCP'] },
    { cat: 'Core CS',    items: ['System Design', 'DSA', 'OS', 'Networks', 'Databases'] },
  ];

  const hobbies = [
    { icon: <MusicNote size={20} weight="duotone" />, label: 'Music',       note: 'Electronic, indie rock, ambient' },
    { icon: <Airplane   size={20} weight="duotone" />, label: 'Travel',      note: 'Chasing new perspectives' },
    { icon: <Camera     size={20} weight="duotone" />, label: 'Photography', note: 'Street & night photography' },
  ];

  return (
    <div className="root">
      <Navbar />

      {/* ────────────────── HERO ────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">
            <span className="dot-live" />
            <span className="eyebrow-text">Open to remote contracts · Chandigarh, IN</span>
          </div>

          <h1 className="hero-h1">
            <span className="h1-line1">Gagan</span>
            <span className="h1-line2">
              Bansal<span className="h1-accent">.</span>
            </span>
          </h1>

          <div className="hero-sub">
            <span className="sub-static">Building </span>
            <Typewriter words={['production AI systems.', 'scalable backends.', 'developer tools.', 'LangGraph agents.']} />
          </div>

          <p className="hero-body">
            Software engineer focused on the intersection of backend programming and applied AI —
            from low-level C++ to RAG pipelines and agentic workflows.
            Recently completed an R&D internship at Quark Software porting legacy macOS/ARM64 C++ systems.
          </p>

          <div className="hero-cta">
            <a href="mailto:bansalgagan2004@gmail.com" className="cta-primary">
              Get in touch <ArrowUpRight size={14} weight="bold" />
            </a>
            <a href="/Data/Gagan_Bansal_CSE26.pdf" target="_blank" rel="noopener noreferrer" className="cta-ghost">
              Resume <ArrowUpRight size={14} />
            </a>
            <a href="https://github.com/Gagan2004bansal" target="_blank" rel="noopener noreferrer" className="cta-icon" aria-label="GitHub">
              <GithubLogo size={18} />
            </a>
            <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer" className="cta-icon" aria-label="LinkedIn">
              <LinkedinLogo size={18} />
            </a>
          </div>
        </div>

        {/* ruled background lines */}
        <div className="hero-ruled" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="ruled-line" style={{ top: `${12 + i * 12}%` }} />
          ))}
        </div>
      </section>

      {/* ────────────────── STATS BAR ────────────────── */}
      <div className="stats-bar">
        <div className="container stats-inner">
          {[
            ['9.44', 'CGPA — Chitkara University'],
            ['1300+', 'DSA problems solved'],
            ['1618', 'LeetCode contest rating'],
            ['Top 3%', 'Department rank'],
          ].map(([val, lbl]) => (
            <div key={lbl} className="stat-item">
              <span className="stat-val">{val}</span>
              <span className="stat-lbl">{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────── ABOUT ────────────────── */}
      <section id="about" className="section">
        <div className="container">
          <Reveal>
            <div className="about-grid">
              <div className="about-left">
                <p className="section-label">About</p>
                <h2 className="section-h2">
                  Engineer at the boundary of backend and AI.
                </h2>
                <p className="body-text">
                  Final-year CS graduate from Chitkara University with a 9.44 CGPA.
                  I care about understanding how things work at a fundamental level —
                  whether that's CPU memory models, transformer attention, or distributed consensus.
                </p>
                <p className="body-text">
                  At Quark Software (Trilogy), I spent six months porting a legacy C++ codebase to
                  Apple Silicon (ARM64) and modernizing cross-platform builds involving OpenSSL and
                  Axis2 across macOS versions. Outside systems work, I've been building production AI
                  applications — RAG pipelines, MCP servers, and agentic LangGraph workflows.
                </p>
              </div>
              <div className="about-right">
                <p className="section-label">When not coding</p>
                <div className="hobbies">
                  {hobbies.map(h => (
                    <div key={h.label} className="hobby-item">
                      <span className="hobby-icon">{h.icon}</span>
                      <div>
                        <p className="hobby-label">{h.label}</p>
                        <p className="hobby-note">{h.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────── EXPERIENCE ────────────────── */}
      <section id="work" className="section section-alt">
        <div className="container">
          <Reveal>
            <p className="section-label">Experience</p>
            <div className="exp-block">
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">R&D Engineer Intern</h3>
                  <span className="exp-company">Quark Software — Trilogy</span>
                </div>
                <span className="exp-date">Jan 2026 – Jun 2026</span>
              </div>
              <ul className="exp-bullets">
                <li>Ported a legacy C++ desktop application to Apple Silicon (ARM64) and maintained compatibility with x86-64 macOS — resolving architecture-specific memory layout and alignment issues.</li>
                <li>Rebuilt cross-platform dependency chain for OpenSSL and Axis2, eliminating flaky builds and deprecated system API calls across macOS 13–15.</li>
                <li>Debugged low-level crashes from architecture ABI differences and deprecated POSIX APIs by reading disassembly and kernel logs — no external debugger for the hot paths.</li>
              </ul>
              <div className="exp-tags">
                {['C++', 'Objective-C', 'Cocoa', 'macOS', 'ARM64', 'OpenSSL', 'CMake', 'Xcode'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────── PROJECTS ────────────────── */}
      <section id="projects" className="section">
        <div className="container">
          <Reveal>
            <div className="proj-header">
              <p className="section-label">Selected work</p>
              <a href="https://github.com/Gagan2004bansal" target="_blank" rel="noopener noreferrer" className="view-all">
                View all on GitHub <ArrowUpRight size={13} />
              </a>
            </div>
          </Reveal>

          <div className="proj-list">
            {projects.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-row">
                  <div className="proj-row-left">
                    <div className="proj-row-meta">
                      <span className="proj-year">{p.year}</span>
                      <span className="proj-category">{p.sub}</span>
                    </div>
                    <h3 className="proj-title">{p.title}</h3>
                    <p className="proj-desc">{p.desc}</p>
                    <div className="proj-tags">
                      {p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="proj-arrow" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── GENAI EXPLORATION ────────────────── */}
      <section id="genai" className="section genai-section">
        <div className="container">
          <Reveal>
            <p className="section-label" style={{ color: '#6ee7b7' }}>GenAI Stack</p>
            <h2 className="section-h2" style={{ color: '#f1f5f9' }}>
              Building at the edge of the LLM ecosystem.
            </h2>
            <p className="body-text" style={{ color: '#94a3b8', maxWidth: '540px', marginBottom: '36px' }}>
              Actively learning and shipping with the modern AI stack —
              from embedding pipelines to stateful agentic graphs.
              Everything below is hands-on, not theoretical.
            </p>
          </Reveal>

          {/* Skill grid */}
          <div className="genai-grid">
            {GENAI_SKILLS.map((s, i) => {
              const m = STATUS_META[s.status];
              return (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div className="genai-card">
                    <div className="genai-card-top">
                      <span className="genai-label">{s.label}</span>
                      <span className="status-pill" style={{ color: m.color, background: m.bg }}>
                        {m.label}
                      </span>
                    </div>
                    <p className="genai-desc">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Live GitHub repos */}
          <Reveal delay={0.2}>
            <p className="section-label" style={{ color: '#6ee7b7', marginTop: '48px', marginBottom: '16px' }}>
              Live from GitHub
            </p>
            <div className="repo-grid">
              {GITHUB_REPOS.map(r => (
                <RepoCard key={r.repo} {...r} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────── SKILLS ────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <p className="section-label">Skills &amp; tools</p>
            <div className="skills-grid">
              {skills.map((g, i) => (
                <div key={i} className="skill-group">
                  <p className="skill-cat">{g.cat}</p>
                  {g.items.map((item, j) => (
                    <span key={j} className="skill-pill">{item}</span>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────── CONTACT ────────────────── */}
      <section id="contact" className="contact-section">
        <div className="container">
          <Reveal>
            <p className="section-label" style={{ color: '#6ee7b7' }}>Contact</p>
            <h2 className="contact-h">
              Let's build<br />something real.
            </h2>
            <p className="contact-sub">
              Open to remote freelance contracts, full-time roles, and interesting collaborations.
              AI systems, developer tools, and backend engineering.
            </p>
            <div className="contact-ctas">
              <a href="mailto:bansalgagan2004@gmail.com" className="cta-primary cta-lg">
                bansalgagan2004@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer" className="cta-ghost">
                LinkedIn <ArrowUpRight size={13} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-name">Gagan Bansal</span>
          <span className="footer-copy">© 2026</span>
          <div className="footer-links">
            <a href="https://github.com/Gagan2004bansal" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://leetcode.com/u/Gagan_Bansal/" target="_blank" rel="noopener noreferrer">LeetCode</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        * { -webkit-font-smoothing: antialiased; }
        a { -webkit-tap-highlight-color: transparent; color: inherit; text-decoration: none; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }

        /* ── Root ── */
        .root {
          background: #FAFAFA;
          color: #111;
          overflow-x: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Container ── */
        .container { max-width: 900px; margin: 0 auto; padding: 0 28px; }

        /* ── Hero ── */
        .hero {
          position: relative;
          background: #0D0D0D;
          padding: 130px 0 80px;
          overflow: hidden;
        }
        .hero-ruled {
          position: absolute; inset: 0; pointer-events: none;
        }
        .ruled-line {
          position: absolute; left: 0; right: 0; height: 1px;
          background: rgba(255,255,255,0.035);
        }

        .hero-eyebrow {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 28px;
        }
        .dot-live {
          display: inline-block; width: 7px; height: 7px;
          border-radius: 50%; background: #16a34a;
          box-shadow: 0 0 0 0 rgba(22,163,74,0.4);
          animation: livePulse 2s ease-in-out infinite;
        }
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(22,163,74,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(22,163,74,0); }
        }
        .eyebrow-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: #6b7280; letter-spacing: 0.06em;
        }

        .hero-h1 {
          font-family: 'Space Grotesk', sans-serif;
          line-height: 0.94; letter-spacing: -0.04em;
          margin-bottom: 20px;
        }
        .h1-line1 {
          display: block;
          font-size: clamp(72px, 14vw, 130px);
          font-weight: 700; color: #ffffff;
        }
        .h1-line2 {
          display: block;
          font-size: clamp(72px, 14vw, 130px);
          font-weight: 300; color: rgba(255,255,255,0.28);
        }
        .h1-accent { color: #16a34a; font-weight: 700; }

        .hero-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(13px, 2vw, 15px);
          color: #4b5563; margin-bottom: 18px;
        }
        .sub-static { color: #6b7280; }
        .tw-word { color: #d1fae5; }
        .tw-cursor {
          color: #16a34a; margin-left: 1px;
          animation: blink 0.75s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .hero-body {
          font-size: 14.5px; color: #6b7280; line-height: 1.72;
          max-width: 500px; font-weight: 300; margin-bottom: 32px;
        }
        .hero-cta {
          display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
        }
        .cta-primary {
          display: inline-flex; align-items: center; gap: 5px;
          background: #16a34a; color: #fff;
          font-size: 13px; font-weight: 500;
          padding: 9px 20px; border-radius: 4px;
          transition: background 0.18s;
        }
        .cta-primary:hover { background: #15803d; }
        .cta-ghost {
          display: inline-flex; align-items: center; gap: 5px;
          border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.55);
          font-size: 13px; font-weight: 400;
          padding: 9px 20px; border-radius: 4px;
          transition: border-color 0.18s, color 0.18s;
        }
        .cta-ghost:hover { border-color: rgba(255,255,255,0.35); color: white; }
        .cta-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px;
          border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.45);
          border-radius: 4px; transition: color 0.18s, border-color 0.18s;
        }
        .cta-icon:hover { color: white; border-color: rgba(255,255,255,0.3); }

        /* ── Stats Bar ── */
        .stats-bar {
          background: #111; border-bottom: 1px solid #1f2937;
        }
        .stats-inner {
          display: flex; flex-wrap: wrap;
          padding: 18px 28px;
        }
        .stat-item {
          flex: 1; min-width: 130px;
          padding: 6px 0;
          border-right: 1px solid #1f2937;
          padding-right: 24px; margin-right: 24px;
        }
        .stat-item:last-child { border-right: none; margin-right: 0; }
        .stat-val {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px; font-weight: 700; color: #f1f5f9;
          letter-spacing: -0.03em;
        }
        .stat-lbl {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #4b5563; letter-spacing: 0.04em;
        }

        /* ── Section base ── */
        .section { padding: 72px 0; }
        .section-alt { background: #f4f4f5; }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px; color: #16a34a;
          text-transform: uppercase; letter-spacing: 0.12em;
          margin-bottom: 10px; display: block;
        }
        .section-h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 600; letter-spacing: -0.03em;
          color: #111; margin-bottom: 18px; line-height: 1.2;
        }
        .body-text {
          font-size: 14.5px; color: #4b5563; line-height: 1.72;
          font-weight: 300; margin-bottom: 12px;
        }

        /* ── About ── */
        .about-grid {
          display: grid; grid-template-columns: 1fr 260px; gap: 56px; align-items: start;
        }
        @media(max-width:660px) { .about-grid { grid-template-columns: 1fr; gap: 32px; } }

        .hobbies { display: flex; flex-direction: column; gap: 14px; }
        .hobby-item {
          display: flex; align-items: flex-start; gap: 13px;
        }
        .hobby-icon {
          width: 36px; height: 36px;
          background: #f0fdf4; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #16a34a; flex-shrink: 0;
        }
        .hobby-label {
          font-size: 13.5px; font-weight: 500; color: #111; margin-bottom: 2px;
        }
        .hobby-note {
          font-size: 12px; color: #9ca3af; font-weight: 300;
        }

        /* ── Experience ── */
        .exp-block {
          border-left: 2px solid #16a34a; padding-left: 24px; margin-top: 4px;
        }
        .exp-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; flex-wrap: wrap; gap: 8px;
          margin-bottom: 14px;
        }
        .exp-role {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px; font-weight: 600; color: #111;
          letter-spacing: -0.02em; margin-bottom: 3px;
        }
        .exp-company {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: #16a34a;
        }
        .exp-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px; color: #9ca3af; white-space: nowrap;
        }
        .exp-bullets {
          list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;
        }
        .exp-bullets li {
          font-size: 13.5px; color: #4b5563; font-weight: 300; line-height: 1.65;
          padding-left: 16px; position: relative;
        }
        .exp-bullets li::before {
          content: ''; position: absolute; left: 0; top: 8px;
          width: 5px; height: 5px; border-radius: 50%;
          background: #16a34a;
        }
        .exp-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #6b7280;
          background: #f1f5f9; padding: 2px 9px;
          border-radius: 3px; border: 1px solid #e2e8f0;
        }

        /* ── Projects ── */
        .proj-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px;
        }
        .view-all {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px; color: #9ca3af;
          transition: color 0.18s;
        }
        .view-all:hover { color: #16a34a; }

        .proj-list { display: flex; flex-direction: column; }
        .proj-row {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px;
          padding: 24px 0;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
          transition: background 0.15s;
        }
        .proj-row:first-of-type { border-top: 1px solid #e5e7eb; }
        .proj-row:hover .proj-title { color: #16a34a; }
        .proj-row:hover .proj-arrow { opacity: 1; transform: translate(2px, -2px); }

        .proj-row-left { flex: 1; }
        .proj-row-meta {
          display: flex; gap: 12px; align-items: center; margin-bottom: 5px;
        }
        .proj-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #9ca3af;
        }
        .proj-category {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #6b7280;
        }
        .proj-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px; font-weight: 600; color: #111;
          letter-spacing: -0.02em; margin-bottom: 6px;
          transition: color 0.18s;
        }
        .proj-desc {
          font-size: 13.5px; color: #6b7280; line-height: 1.6;
          font-weight: 300; margin-bottom: 10px; max-width: 560px;
        }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .proj-arrow {
          color: #d1d5db; flex-shrink: 0; margin-top: 4px;
          opacity: 0.4; transition: opacity 0.18s, transform 0.18s;
        }

        /* ── GenAI ── */
        .genai-section { background: #0D0D0D; }
        .genai-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px; margin-bottom: 0;
        }
        .genai-card {
          background: #161616; border: 1px solid #1f2937;
          border-radius: 8px; padding: 16px 18px;
          transition: border-color 0.2s;
        }
        .genai-card:hover { border-color: #16a34a; }
        .genai-card-top {
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px; margin-bottom: 7px;
        }
        .genai-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13.5px; font-weight: 600; color: #f1f5f9;
        }
        .status-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; font-weight: 500;
          padding: 2px 8px; border-radius: 20px;
          white-space: nowrap; flex-shrink: 0;
        }
        .genai-desc {
          font-size: 12px; color: #6b7280; line-height: 1.55; font-weight: 300;
        }

        /* ── Repos ── */
        .repo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 10px;
        }
        .repo-card {
          background: #161616; border: 1px solid #1f2937;
          border-radius: 8px; padding: 18px 20px;
          display: block; transition: border-color 0.2s;
        }
        .repo-card:hover { border-color: #16a34a; }
        .repo-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 6px;
        }
        .repo-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 600; color: #f1f5f9;
        }
        .repo-arrow { color: #374151; transition: color 0.18s; }
        .repo-card:hover .repo-arrow { color: #16a34a; }
        .repo-desc {
          font-size: 12px; color: #6b7280; line-height: 1.55; font-weight: 300;
          margin-bottom: 12px;
        }
        .repo-meta { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }
        .repo-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px; color: #4b5563;
          background: #1f2937; padding: 2px 8px; border-radius: 3px;
          border: 1px solid #374151;
        }
        .repo-stat {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #6b7280;
        }
        .repo-err { font-size: 11px; color: #374151; }

        /* ── Skills ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 24px 32px;
        }
        .skill-cat {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #16a34a; text-transform: uppercase;
          letter-spacing: 0.1em; margin-bottom: 10px;
        }
        .skill-group { display: flex; flex-direction: column; gap: 6px; }
        .skill-pill {
          font-size: 13px; color: #374151; font-weight: 300;
        }

        /* ── Contact ── */
        .contact-section {
          background: #0D0D0D; padding: 80px 0;
        }
        .contact-h {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(38px, 7vw, 60px);
          font-weight: 700; color: #f1f5f9;
          letter-spacing: -0.04em; line-height: 1.0;
          margin: 10px 0 16px;
        }
        .contact-sub {
          font-size: 14px; color: #6b7280; font-weight: 300;
          line-height: 1.65; max-width: 420px; margin-bottom: 28px;
        }
        .contact-ctas { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .cta-lg { padding: 11px 24px; font-size: 14px; }

        /* ── Footer ── */
        .footer { background: #111; border-top: 1px solid #1f2937; padding: 22px 0; }
        .footer-inner {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .footer-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 600; color: #f1f5f9;
        }
        .footer-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: #374151;
        }
        .footer-links { display: flex; gap: 16px; }
        .footer-links a {
          font-size: 12px; color: #4b5563;
          transition: color 0.18s;
        }
        .footer-links a:hover { color: #f1f5f9; }
      `}</style>
    </div>
  );
}