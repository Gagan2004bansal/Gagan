import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

/* ══════════════════════════════════════════════
   SKYLINE  —  viewBox 1200 × 260
   Buildings data-driven hain. Naya building add karna
   ho to array mein ek entry daal do; baaki sab
   (outline, windows, spacing) automatic hai.
   ══════════════════════════════════════════════ */
const VB_W = 1200;
const VB_H = 260;
const BASE = VB_H; // ground line = viewBox ka bilkul bottom edge

/* Skyline height = width ka itna %. Content ke padding-bottom
   mein isi ko use kiya hai, to gap kabhi mismatch nahi hoga. */
const RATIO_PCT = ((VB_H / VB_W) * 100).toFixed(2); // 21.67

const OUTLINE = "#0b7a5a";
const STROKE_W = 1.1;

/* Pehla aur aakhri building thoda bahar nikle hain (-10 / 1210)
   taaki dono kinaron pe koi gap na bache. */
const BUILDINGS = [
  { x: -10,  w: 90, h: 110, top: "flat",    win: "bands" },
  { x: 76,   w: 96, h: 175, top: "dome",    win: "grid"  },
  { x: 168,  w: 44, h: 95,  top: "flat",    win: "bands" },
  { x: 206,  w: 38, h: 200, top: "spire",   win: "grid"  },
  { x: 250,  w: 92, h: 235, top: "antenna", win: "grid"  },
  { x: 336,  w: 40, h: 120, top: "flat",    win: "grid"  },
  { x: 372,  w: 76, h: 210, top: "gable",   win: "grid"  },
  { x: 444,  w: 76, h: 195, top: "gable",   win: "grid"  },
  { x: 516,  w: 52, h: 135, top: "flat",    win: "bands" },
  { x: 562,  w: 88, h: 185, top: "flat",    win: "grid"  },
  { x: 644,  w: 70, h: 160, top: "step",    win: "grid"  },
  { x: 708,  w: 84, h: 205, top: "antenna", win: "grid"  },
  { x: 786,  w: 58, h: 140, top: "flat",    win: "grid"  },
  { x: 838,  w: 92, h: 178, top: "gable",   win: "grid"  },
  { x: 924,  w: 64, h: 125, top: "flat",    win: "bands" },
  { x: 982,  w: 96, h: 195, top: "dome",    win: "grid"  },
  { x: 1072, w: 80, h: 145, top: "flat",    win: "grid"  },
  { x: 1146, w: 64, h: 112, top: "flat",    win: "bands" },
];

/* Poora silhouette ek hi path mein. Roof aur body alag-alag
   stroke karte to jodh pe ek line dikhti — isliye combined. */
function silhouette(b) {
  const top = BASE - b.h;
  const l = b.x;
  const r = b.x + b.w;
  const cx = b.x + b.w / 2;
  const p = [`M ${l} ${BASE}`, `L ${l} ${top}`];

  switch (b.top) {
    case "spire": {
      const inset = b.w * 0.3;
      p.push(
        `L ${l + inset} ${top - 12}`,
        `L ${cx} ${top - 54}`,
        `L ${r - inset} ${top - 12}`,
        `L ${r} ${top}`
      );
      break;
    }
    case "dome": {
      const inset = 11;
      const rad = (b.w - inset * 2) / 2;
      p.push(
        `L ${l + inset} ${top}`,
        `A ${rad} ${rad * 0.95} 0 0 1 ${r - inset} ${top}`,
        `L ${r} ${top}`
      );
      break;
    }
    case "step": {
      const s1 = 11;
      const s2 = 24;
      p.push(
        `L ${l + s1} ${top}`,
        `L ${l + s1} ${top - 13}`,
        `L ${l + s2} ${top - 13}`,
        `L ${l + s2} ${top - 24}`,
        `L ${r - s2} ${top - 24}`,
        `L ${r - s2} ${top - 13}`,
        `L ${r - s1} ${top - 13}`,
        `L ${r - s1} ${top}`,
        `L ${r} ${top}`
      );
      break;
    }
    case "gable": {
      p.push(`L ${cx} ${top - 28}`, `L ${r} ${top}`);
      break;
    }
    default:
      p.push(`L ${r} ${top}`);
  }

  p.push(`L ${r} ${BASE}`, "Z");
  return p.join(" ");
}

/* Antenna mast — building ke path se alag, kyunki ye
   patli line hai, band shape nahi. */
function Mast({ b }) {
  if (b.top !== "antenna") return null;
  const top = BASE - b.h;
  const cx = b.x + b.w / 2;
  return (
    <g stroke={OUTLINE} strokeWidth={STROKE_W} vectorEffect="non-scaling-stroke">
      <line x1={cx} y1={top} x2={cx} y2={top - 34} />
      <line x1={cx - 9} y1={top - 20} x2={cx + 9} y2={top - 20} />
      <circle cx={cx} cy={top - 38} r={2.6} fill="#6ee7b7" stroke="none" className="cta-twinkle" />
    </g>
  );
}

/* Lit-window pattern deterministic hai. Math.random() se
   har re-render pe lighting badal jaati — flicker dikhta. */
const WIN_TIERS = [
  { fill: "#0d3b2c", opacity: 1 },     // unlit
  { fill: "#0d3b2c", opacity: 1 },
  { fill: "#10b981", opacity: 0.45 },  // dim
  { fill: "#10b981", opacity: 0.7 },
  { fill: "#34d399", opacity: 0.85 },  // mid
  { fill: "#34d399", opacity: 1 },
  { fill: "#6ee7b7", opacity: 1 },     // bright
];
const tierOf = (b, r, c) => WIN_TIERS[(b * 13 + r * 7 + c * 5) % WIN_TIERS.length];
const twinkles = (b, r, c) => (b * 5 + r * 11 + c * 3) % 17 === 0;

function Windows({ b, i }) {
  const out = [];
  const topPad = b.top === "flat" ? 12 : 16;

  if (b.win === "bands") {
    const padX = 7;
    const bandH = 5;
    const gap = 9;
    const rows = Math.floor((b.h - topPad - 8) / (bandH + gap));
    for (let r = 0; r < rows; r++) {
      const t = tierOf(i, r, 0);
      const tw = twinkles(i, r, 0);
      out.push(
        <rect
          key={r}
          x={b.x + padX}
          y={BASE - b.h + topPad + r * (bandH + gap)}
          width={b.w - padX * 2}
          height={bandH}
          fill={t.fill}
          opacity={t.opacity}
          className={tw ? "cta-twinkle" : undefined}
          style={tw ? { animationDelay: `${(r % 5) * 0.8}s` } : undefined}
        />
      );
    }
    return <>{out}</>;
  }

  const padX = 8;
  const winW = 6;
  const winH = 9;
  const gapX = 6;
  const gapY = 7;
  const cols = Math.max(1, Math.floor((b.w - padX * 2 + gapX) / (winW + gapX)));
  const rows = Math.max(1, Math.floor((b.h - topPad - 8 + gapY) / (winH + gapY)));
  const usedW = cols * winW + (cols - 1) * gapX;
  const startX = b.x + (b.w - usedW) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = tierOf(i, r, c);
      const tw = twinkles(i, r, c);
      out.push(
        <rect
          key={`${r}-${c}`}
          x={startX + c * (winW + gapX)}
          y={BASE - b.h + topPad + r * (winH + gapY)}
          width={winW}
          height={winH}
          fill={t.fill}
          opacity={t.opacity}
          className={tw ? "cta-twinkle" : undefined}
          style={tw ? { animationDelay: `${((r + c) % 6) * 0.7}s` } : undefined}
        />
      );
    }
  }
  return <>{out}</>;
}

function Skyline() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      aria-hidden="true"
      focusable="false"
      /* block = inline-SVG ka baseline gap khatam.
         w-full + koi height nahi = full width, no crop, no stretch. */
      className="pointer-events-none absolute bottom-0 left-0 block w-full"
    >
      <defs>
        <linearGradient id="ctaSkyGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
          <stop offset="65%" stopColor="#10b981" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Glow — iske against black buildings silhouette ki tarah padhte hain */}
      <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#ctaSkyGlow)" />

      {BUILDINGS.map((b, i) => (
        <g key={i}>
          <Mast b={b} />
          <path
            d={silhouette(b)}
            fill="#000"
            stroke={OUTLINE}
            strokeWidth={STROKE_W}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <Windows b={b} i={i} />
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════ */
export default function TopicCTA() {
  return (
    <section className="border-t border-slate-200 pt-16">
      <div className="mx-auto">
        <div className="relative overflow-hidden rounded-lg bg-black text-center text-white">
          <Skyline />

          <div
            className="relative space-y-6 px-8 pt-12 sm:px-12"
            /* Padding-bottom = skyline ki exact height + breathing room.
               % width se calculate hota hai, isliye har screen pe sahi. */
            style={{ paddingBottom: `calc(${RATIO_PCT}% + 2rem)` }}
          >
            <h2
              style={{ fontFamily: "'Crimson Text', serif" }}
              className="text-4xl font-light"
            >
              Have a topic in mind?
            </h2>
            <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-slate-300">
              Suggest topics or collaborate on articles. Always interested in
              exploring new ideas.
            </p>
            <a
              href="mailto:bansalgagan2004@gmail.com"
              className="inline-flex items-center gap-2 rounded bg-emerald-600 px-8 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Reach out
              <ArrowUpRight size={18} weight="bold" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .cta-twinkle { animation: ctaTwinkle 4.5s ease-in-out infinite; }
        @keyframes ctaTwinkle {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-twinkle { animation: none; }
        }
      `}</style>
    </section>
  );
}