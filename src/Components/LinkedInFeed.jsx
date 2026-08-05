import React, { useState, useEffect, useRef, useCallback } from "react";

/* ──────────────────────────────────────────────
   Embed URLs. LinkedIn post → ••• → "Embed this post"
   se copy karo. Post public hona chahiye, warna
   iframe blank aayega.
   Placeholder entries automatically filter ho jaati hain.
   ────────────────────────────────────────────── */
const EMBEDS = [
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7488955793434673152?collapsed=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7486475028251844608?collapsed=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7477640207475933185?collapsed=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7477025808352555008?collapsed=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7448751756911734785?collapsed=1",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7434992958585729024?collapsed=1",
];

const URN = /urn:li:(share|activity|ugcPost):(\d+)/;
const POSTS = EMBEDS.filter((u) => URN.test(u));

/* Embed URL se normal post link nikal lo */
function permalink(embedUrl) {
  const m = embedUrl.match(URN);
  return m
    ? `https://www.linkedin.com/feed/update/urn:li:${m[1]}:${m[2]}/`
    : "https://www.linkedin.com/in/bansalgagan2004/recent-activity/all/";
}

export default function LinkedInFeed() {
  const railRef = useRef(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [mounted, setMounted] = useState(() => new Set([0])); // kaunse iframes load hue
  const [live, setLive] = useState(() => new Set());          // kaunse card interactive hain

  /* ── active card + edge state track karo ── */
  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.querySelectorAll("[data-card]")).forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - pad - el.scrollLeft);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  /* Sirf aas-paas ke iframes mount karo — 5 embeds ek saath = slow page.
     Ek baar mount hone ke baad hataya nahi, warna reload hote rehte. */
  useEffect(() => {
    setMounted((prev) => {
      const next = new Set(prev);
      [active - 1, active, active + 1].forEach((i) => {
        if (i >= 0 && i < POSTS.length) next.add(i);
      });
      return next.size === prev.size ? prev : next;
    });
  }, [active]);

  const goTo = (i) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelectorAll("[data-card]")[i];
    if (!card) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.scrollTo({ left: card.offsetLeft - pad, behavior: "smooth" });
  };

  const step = (dir) =>
    goTo(Math.min(POSTS.length - 1, Math.max(0, active + dir)));

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); step(-1); }
  };

  if (!POSTS.length) return null;

  return (
    <section id="linkedin" className="li-section">
      <div className="li-wrap">
        <header className="li-head">
          <p className="li-label">LinkedIn</p>
          <h2 className="li-h2">Latest Posts</h2>
          <p className="li-sub">
            A few things I've been building and sharing recently.
          </p>
        </header>
      </div>

      <div className="li-rail-outer">
        <div
          className="li-rail"
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="LinkedIn posts carousel"
          onKeyDown={onKeyDown}
        >
          {POSTS.map((url, i) => (
            <article className="li-card" data-card key={url}>
              <div className="li-frame">
                {mounted.has(i) ? (
                  <iframe
                    src={url}
                    title={`LinkedIn post ${i + 1}`}
                    loading="lazy"
                    allowFullScreen
                    className="li-iframe"
                  />
                ) : (
                  <div className="li-skeleton" aria-hidden="true">
                    <span className="li-skel-row li-skel-a" />
                    <span className="li-skel-row li-skel-b" />
                    <span className="li-skel-box" />
                  </div>
                )}

                {/* Shim: iframe touch events kha jaata hai, isse swipe rukta hai.
                    Ek tap = card interactive. */}
                {!live.has(i) && (
                  <button
                    className="li-shim"
                    onClick={() => setLive((p) => new Set(p).add(i))}
                    aria-label={`Interact with post ${i + 1}`}
                  >
                    <span className="li-shim-pill">Tap to interact</span>
                  </button>
                )}
              </div>

              <footer className="li-card-foot">
                <span className="li-index">
                  {String(i + 1).padStart(2, "0")} / {String(POSTS.length).padStart(2, "0")}
                </span>
                <a
                  href={permalink(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="li-open"
                >
                  Open on LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </footer>
            </article>
          ))}
        </div>

        <span className={`li-edge li-edge-l ${atStart ? "li-edge-off" : ""}`} aria-hidden="true" />
        <span className={`li-edge li-edge-r ${atEnd ? "li-edge-off" : ""}`} aria-hidden="true" />
      </div>

      <div className="li-wrap">
        <div className="li-controls">
          <button
            className="li-arrow"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous post"
          >
            ‹
          </button>

          <div className="li-dots" role="tablist" aria-label="Choose post">
            {POSTS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Post ${i + 1}`}
                className={`li-dot ${i === active ? "li-dot-on" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            className="li-arrow"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next post"
          >
            ›
          </button>
        </div>
      </div>

      <style>{`
        /* Card size ek jagah se control — yahin tweak karna */
        .li-section {
        --li-w: 400px;
        --li-h: 460px;
        --li-gap: 20px;
        --li-pad: 28px;
        padding: 80px 0 64px;
      }
      @media (max-width: 1024px) {
        .li-section { --li-w: 360px; --li-h: 430px; --li-gap: 16px; --li-pad: 24px; }
      }
      @media (max-width: 640px) {
        .li-section {
          --li-w: 82vw; --li-h: 400px; --li-gap: 12px; --li-pad: 18px;
          padding: 56px 0 44px;
        }
      }

        .li-wrap { max-width: 1300px; margin: 0 auto; padding: 0 var(--li-pad); }

        .li-head { text-align: center; margin-bottom: 40px; }
        .li-label {
          color: #16a34a; font-weight: 600; font-size: 12px;
          letter-spacing: 2px; text-transform: uppercase; margin: 0;
        }
        .li-h2 {
          font-size: clamp(28px, 5vw, 42px); line-height: 1.15;
          margin: 10px 0; color: #111; letter-spacing: -0.02em;
        }
        .li-sub { color: #666; font-size: clamp(14px, 2vw, 16px); margin: 0; }

        /* ── Rail ── */
        .li-rail-outer { position: relative; }
        .li-rail {
          display: flex; gap: var(--li-gap);
          overflow-x: auto; overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 6px max(var(--li-pad), calc((100vw - 1300px) / 2 + var(--li-pad)));
          scrollbar-width: none;
        }
        .li-rail::-webkit-scrollbar { display: none; }
        .li-rail:focus-visible { outline: 2px solid #16a34a; outline-offset: -2px; }

        .li-card {
          position: relative; flex: 0 0 var(--li-w); max-width: 560px;
          scroll-snap-align: start;
          background: #fff; border-radius: 16px; overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,.08);
          display: flex; flex-direction: column;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        @media (hover: hover) {
          .li-card:hover { transform: translateY(-5px); box-shadow: 0 18px 40px rgba(0,0,0,.11); }
        }

        .li-frame { position: relative; height: var(--li-h); background: #f4f4f5; }
        .li-iframe { display: block; width: 100%; height: 100%; border: 0; }

        /* ── Interaction shim ── */
        .li-shim {
          position: absolute; inset: 0; width: 100%; height: 100%;
          background: transparent; border: 0; padding: 0; cursor: pointer;
          display: flex; align-items: flex-end; justify-content: center;
          touch-action: pan-x pan-y;
        }
        .li-shim-pill {
          margin-bottom: 14px;
          background: rgba(13,13,13,.82); color: #fff;
          font-size: 11px; letter-spacing: .04em;
          padding: 6px 12px; border-radius: 20px;
          opacity: .85; transition: opacity .2s;
        }
        .li-shim:hover .li-shim-pill { opacity: 1; }
        .li-shim:focus-visible { outline: 2px solid #16a34a; outline-offset: -4px; }

        /* ── Skeleton ── */
        .li-skeleton {
          padding: 22px; height: 100%;
          display: flex; flex-direction: column; gap: 12px;
        }
        .li-skel-row { height: 12px; border-radius: 6px; background: #e5e7eb; }
        .li-skel-a { width: 45%; }
        .li-skel-b { width: 70%; }
        .li-skel-box { flex: 1; border-radius: 10px; background: #e9eaec; }

        /* ── Card footer ── */
        .li-card-foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 12px 18px;
          border-top: 1px solid #f1f5f9;
        }
        .li-index { font-size: 11px; color: #9ca3af; letter-spacing: .08em; }
        .li-open {
          font-size: 12.5px; font-weight: 500; color: #16a34a;
          text-decoration: none; white-space: nowrap;
        }
        .li-open:hover { text-decoration: underline; }

        /* ── Edge fades ── */
        .li-edge {
          position: absolute; top: 0; bottom: 0; width: 60px;
          pointer-events: none; transition: opacity .25s; z-index: 2;
        }
        .li-edge-off { opacity: 0; }
        .li-edge-l { left: 0; background: linear-gradient(90deg, #FAFAFA 15%, rgba(250,250,250,0)); }
        .li-edge-r { right: 0; background: linear-gradient(270deg, #FAFAFA 15%, rgba(250,250,250,0)); }
        @media (max-width: 640px) { .li-edge { display: none; } }

        /* ── Controls ── */
        .li-controls {
          display: flex; align-items: center; justify-content: center;
          gap: 18px; margin-top: 26px;
        }
        .li-arrow {
          width: 40px; height: 40px; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 22px; line-height: 1; color: #4b5563;
          background: #fff; border: 1px solid #e5e7eb; border-radius: 50%;
          cursor: pointer; transition: border-color .18s, color .18s, opacity .18s;
        }
        .li-arrow:hover:not(:disabled) { border-color: #16a34a; color: #16a34a; }
        .li-arrow:disabled { opacity: .3; cursor: default; }
        .li-arrow:focus-visible { outline: 2px solid #16a34a; outline-offset: 2px; }

        .li-dots { display: flex; align-items: center; gap: 8px; }
        .li-dot {
          width: 8px; height: 8px; padding: 0;
          background: #d1d5db; border: 0; border-radius: 50%;
          cursor: pointer; transition: width .25s, background .25s;
        }
        .li-dot-on { width: 24px; border-radius: 4px; background: #16a34a; }
        .li-dot:focus-visible { outline: 2px solid #16a34a; outline-offset: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .li-card, .li-dot, .li-shim-pill, .li-edge { transition: none; }
          .li-card:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}