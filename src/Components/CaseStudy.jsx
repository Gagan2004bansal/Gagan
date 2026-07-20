import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";

/* Reuse the same Reveal pattern from Home.jsx so scroll-in animation matches */
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

/* ── Simple architecture diagram (pure SVG, no external deps) ── */
function ArchDiagram() {
  return (
    <svg viewBox="0 0 640 220" className="arch-svg" xmlns="http://www.w3.org/2000/svg">
      {/* Client requests */}
      <rect x="10" y="86" width="90" height="48" rx="6" className="arch-box arch-box-client" />
      <text x="55" y="115" textAnchor="middle" className="arch-text">Client</text>

      <line x1="100" y1="110" x2="150" y2="110" className="arch-line" markerEnd="url(#arrow)" />

      {/* Thread pool */}
      <rect x="150" y="60" width="130" height="100" rx="8" className="arch-box arch-box-main" />
      <text x="215" y="90" textAnchor="middle" className="arch-label">Thread Pool</text>
      <rect x="165" y="100" width="28" height="16" rx="3" className="arch-mini" />
      <rect x="201" y="100" width="28" height="16" rx="3" className="arch-mini" />
      <rect x="237" y="100" width="28" height="16" rx="3" className="arch-mini" />
      <rect x="165" y="124" width="28" height="16" rx="3" className="arch-mini" />
      <rect x="201" y="124" width="28" height="16" rx="3" className="arch-mini" />
      <rect x="237" y="124" width="28" height="16" rx="3" className="arch-mini" />

      <line x1="280" y1="110" x2="330" y2="110" className="arch-line" markerEnd="url(#arrow)" />

      {/* Lock-striped hash map */}
      <rect x="330" y="40" width="150" height="140" rx="8" className="arch-box arch-box-main" />
      <text x="405" y="66" textAnchor="middle" className="arch-label">Sharded Store</text>
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={344} y={82 + i * 22} width="122" height="16" rx="3" className="arch-shard" />
      ))}

      <line x1="480" y1="110" x2="530" y2="110" className="arch-line" markerEnd="url(#arrow)" />

      {/* WAL + disk */}
      <rect x="530" y="70" width="100" height="80" rx="8" className="arch-box arch-box-disk" />
      <text x="580" y="98" textAnchor="middle" className="arch-label">WAL</text>
      <text x="580" y="118" textAnchor="middle" className="arch-sub-label">+ LRU Evict</text>
      <text x="580" y="136" textAnchor="middle" className="arch-sub-label">→ Disk</text>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" className="arch-arrowhead" />
        </marker>
      </defs>
    </svg>
  );
}

export default function CaseStudy() {
  const metrics = [
    { val: '19M', lbl: 'ops/sec sustained' },
    { val: '64', lbl: 'concurrent shards' },
    { val: '100ms', lbl: 'TTL tick' },
    { val: '0.2%', lbl: 'data loss on crash test' },
  ];

  return (
    <section id="case-study" className="cs-section">
      <div className="cs-container">
        <Reveal>
          <div className="cs-header">
            <p className="cs-label">Flagship project — deep dive</p>
            <h2 className="cs-title">KVMemo</h2>
            <p className="cs-tagline">
              A multithreaded, crash-safe key-value store built from scratch in modern C++ —
              designed to survive concurrent load without sacrificing durability.
            </p>
          </div>
        </Reveal>

        {/* Problem → Approach → Result */}
        <div className="cs-flow">
          <Reveal delay={0.05}>
            <div className="cs-card">
              <span className="cs-step-num">01</span>
              <h3 className="cs-step-title">Problem</h3>
              <p className="cs-step-text">
                I wanted to understand how high-performance in-memory databases like Redis actually work under the hood rather than just using them as a developer. Most tutorials explain the APIs but rarely cover concurrency, durability, memory management, or the internal design decisions that make these systems fast and reliable. To bridge that gap, I started building my own key-value store from scratch in modern C++.
              </p>
            </div>
          </Reveal>

          <div className="cs-arrow-connector">
            <ArrowRight size={18} />
          </div>

          <Reveal delay={0.12}>
            <div className="cs-card">
              <span className="cs-step-num">02</span>
              <h3 className="cs-step-title">Approach</h3>
              <p className="cs-step-text">
                I designed the project as an educational reimplementation of core database concepts while keeping performance in mind. The store uses multithreading with fine-grained synchronization, a write-ahead log (WAL) for crash recovery, and an LRU eviction policy for memory management. Building each component from scratch helped me understand how production systems balance concurrency, durability, and efficiency.
              </p>
            </div>
          </Reveal>

          <div className="cs-arrow-connector">
            <ArrowRight size={18} />
          </div>

          <Reveal delay={0.19}>
            <div className="cs-card">
              <span className="cs-step-num">03</span>
              <h3 className="cs-step-title">Result</h3>
              <p className="cs-step-text">
                The project gave me a much deeper understanding of systems programming and the internal architecture of databases like Redis. Instead of only learning concepts theoretically, I implemented them myself and explored the trade-offs involved in designing a concurrent, crash-safe storage engine. It has become both a learning platform and a foundation for experimenting with more advanced storage engine features.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Architecture diagram */}
        <Reveal delay={0.2}>
          <div className="cs-arch-block">
            <p className="cs-arch-label">Architecture</p>
            <div className="cs-arch-wrap">
              <ArchDiagram />
            </div>
          </div>
        </Reveal>

        {/* Metrics row */}
        <Reveal delay={0.28}>
          <div className="cs-metrics">
            {metrics.map(m => (
              <div key={m.lbl} className="cs-metric">
                <span className="cs-metric-val">{m.val}</span>
                <span className="cs-metric-lbl">{m.lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="cs-cta-row">
            <a
              href="https://www.kvmemo.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-cta-primary"
            >
              View live docs <ArrowUpRight size={14} weight="bold" />
            </a>
            <a
              href="https://github.com/Gagan2004bansal/KVMemo"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-cta-ghost"
            >
              Read the source <ArrowUpRight size={13} />
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        .cs-section {
          background: #0D0D0D;
          padding: 88px 0;
          border-top: 1px solid #1f2937;
        }
        .cs-container { max-width: 900px; margin: 0 auto; padding: 0 28px; }

        .cs-header { margin-bottom: 44px; }
        .cs-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px; color: #6ee7b7;
          text-transform: uppercase; letter-spacing: 0.12em;
          margin-bottom: 10px; display: block;
        }
        .cs-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(30px, 5vw, 44px); font-weight: 700;
          color: #f1f5f9; letter-spacing: -0.03em; margin-bottom: 14px;
        }
        .cs-tagline {
          font-size: 14.5px; color: #94a3b8; line-height: 1.72;
          font-weight: 300; max-width: 560px;
        }

        /* Problem/Approach/Result flow */
        .cs-flow {
          display: flex; align-items: stretch; gap: 14px;
          margin-bottom: 48px; flex-wrap: wrap;
        }
        .cs-card {
          flex: 1; min-width: 220px;
          background: #161616; border: 1px solid #1f2937;
          border-radius: 10px; padding: 22px 20px;
          transition: border-color 0.2s;
        }
        .cs-card:hover { border-color: #16a34a; }
        .cs-step-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: #16a34a; letter-spacing: 0.1em;
          display: block; margin-bottom: 8px;
        }
        .cs-step-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 600; color: #f1f5f9;
          margin-bottom: 8px;
        }
        .cs-step-text {
          font-size: 12.5px; color: #6b7280; line-height: 1.65; font-weight: 300;
        }
        .cs-arrow-connector {
          display: flex; align-items: center; justify-content: center;
          color: #374151; flex-shrink: 0;
        }
        @media (max-width: 780px) {
          .cs-flow { flex-direction: column; }
          .cs-arrow-connector { transform: rotate(90deg); margin: -6px 0; }
        }

        /* Architecture */
        .cs-arch-block { margin-bottom: 44px; }
        .cs-arch-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px; color: #16a34a;
          text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px;
        }
        .cs-arch-wrap {
          background: #111; border: 1px solid #1f2937; border-radius: 10px;
          padding: 16px; overflow-x: auto;
        }
        .arch-svg { width: 100%; min-width: 560px; height: auto; display: block; }
        .arch-box { fill: #161616; stroke: #2a2a2a; stroke-width: 1; }
        .arch-box-client { stroke: #4b5563; }
        .arch-box-main { stroke: #16a34a; }
        .arch-box-disk { stroke: #2563eb; }
        .arch-mini { fill: #1f2937; stroke: #16a34a; stroke-width: 0.8; }
        .arch-shard { fill: #1a2e22; stroke: #16a34a; stroke-width: 0.8; }
        .arch-text { fill: #d1d5db; font-size: 12px; font-family: 'Inter', sans-serif; }
        .arch-label { fill: #f1f5f9; font-size: 11px; font-weight: 600; font-family: 'Space Grotesk', sans-serif; }
        .arch-sub-label { fill: #6b7280; font-size: 9.5px; font-family: 'JetBrains Mono', monospace; }
        .arch-line { stroke: #374151; stroke-width: 1.5; }
        .arch-arrowhead { fill: #374151; }

        /* Metrics */
        .cs-metrics {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 16px; margin-bottom: 40px;
          border-top: 1px solid #1f2937; border-bottom: 1px solid #1f2937;
          padding: 24px 0;
        }
        .cs-metric { display: flex; flex-direction: column; gap: 4px; }
        .cs-metric-val {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.02em;
        }
        .cs-metric-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: #6b7280; letter-spacing: 0.02em;
        }

        /* CTA */
        .cs-cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .cs-cta-primary {
          display: inline-flex; align-items: center; gap: 5px;
          background: #16a34a; color: #fff;
          font-size: 13px; font-weight: 500;
          padding: 9px 20px; border-radius: 4px;
          transition: background 0.18s;
        }
        .cs-cta-primary:hover { background: #15803d; }
        .cs-cta-ghost {
          display: inline-flex; align-items: center; gap: 5px;
          border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.55);
          font-size: 13px; font-weight: 400;
          padding: 9px 20px; border-radius: 4px;
          transition: border-color 0.18s, color 0.18s;
        }
        .cs-cta-ghost:hover { border-color: rgba(255,255,255,0.35); color: white; }
      `}</style>
    </section>
  );
}