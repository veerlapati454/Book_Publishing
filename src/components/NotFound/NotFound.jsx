import { useEffect, useRef, useState } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
/* ── Falling pages particle system ── */
function useCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const pages = [];
    const COUNT = 38;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Page {
      constructor(born) { this.reset(born); }
      reset(born = false) {
        const W = canvas.width;
        const H = canvas.height;
        this.x     = Math.random() * W;
        this.y     = born ? Math.random() * H : -30;
        this.w     = 14 + Math.random() * 22;
        this.h     = this.w * 1.38;
        this.rot   = (Math.random() - 0.5) * 0.9;
        this.drot  = (Math.random() - 0.5) * 0.014;
        this.vy    = 0.55 + Math.random() * 0.9;
        this.vx    = (Math.random() - 0.5) * 0.5;
        this.alpha = 0.07 + Math.random() * 0.13;
        this.lines = Math.floor(3 + Math.random() * 5);
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = 0.006 + Math.random() * 0.008;
      }
      update() {
        this.y   += this.vy;
        this.x   += this.vx;
        this.rot += this.drot;
        this.phase += this.phaseSpeed;
        if (this.y > canvas.height + 40) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot + Math.sin(this.phase) * 0.08);
        const a = this.alpha;
        ctx.fillStyle   = `rgba(210,190,155,${a * 0.55})`;
        ctx.strokeStyle = `rgba(210,190,155,${a})`;
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.rect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = `rgba(210,190,155,${a * 0.7})`;
        ctx.lineWidth   = 0.5;
        const gap = this.h / (this.lines + 1);
        for (let i = 1; i <= this.lines; i++) {
          const y      = -this.h / 2 + gap * i;
          const indent = i === 1 ? 0.28 : 0;
          ctx.beginPath();
          ctx.moveTo(-this.w / 2 + this.w * 0.12 + indent * this.w * 0.3, y);
          ctx.lineTo( this.w / 2 - this.w * 0.1, y);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < COUNT; i++) pages.push(new Page(true));

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pages.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return ref;
}

/* ── Animated 3-D book ── */
function Book3D() {
  return (
    <div className="nf-book-wrap" aria-hidden="true">
      <div className="nf-book">
        <div className="nf-book__face nf-book__face--front">
          <div className="nf-book__cover-inner">
            <span className="nf-book__cover-num">404</span>
            <div className="nf-book__cover-lines">
              {[...Array(6)].map((_, i) => <div key={i} className="nf-book__cover-line" />)}
            </div>
            <span className="nf-book__cover-sub">CHAPTER NOT FOUND</span>
          </div>
        </div>
        <div className="nf-book__face nf-book__face--spine">
          <span className="nf-book__spine-text">404</span>
        </div>
        <div className="nf-book__face nf-book__face--back" />
        <div className="nf-book__face nf-book__face--top" />
        <div className="nf-book__face nf-book__face--bottom" />
        <div className="nf-book__face nf-book__face--right">
          <div className="nf-book__pages" />
        </div>
      </div>
      <div className="nf-book__shadow" />
    </div>
  );
}

/* ── Main component ── */
export default function NotFound() {
  const canvasRef = useCanvas();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="nf-root">
      <canvas ref={canvasRef} className="nf-canvas" />
      <div className="nf-vignette" />

      <div className="nf-rule" aria-hidden="true">
        <span className="nf-rule__line" />
        <span className="nf-rule__glyph">✦</span>
        <span className="nf-rule__line" />
      </div>

      <main className={`nf-stage ${visible ? "nf-stage--visible" : ""}`}>
        <Book3D />

        <div className="nf-copy">
          <p className="nf-eyebrow">The Library of Lost Pages</p>

          <h1 className="nf-headline">
            This chapter<br />was never written.
          </h1>

          <p className="nf-body">
            The page you sought has slipped between the shelves —
            unbound, unpublished, or perhaps never penned at all.
            Let us guide you back to the catalogue.
          </p>

          <div className="nf-divider" aria-hidden="true">
            <span />
            <span className="nf-divider__dot" />
            <span />
          </div>

          <div className="nf-actions">
            <button
              className="nf-btn nf-btn--ghost"
              onClick={() => window.history.back()}
              type="button"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M9.5 2.5L4.5 7.5L9.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous Page
            </button>

            <Link className="nf-btn nf-btn--primary" to="/">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M1.5 6L7.5 1.5L13.5 6V13H9.5V9.5H5.5V13H1.5V6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="nf-footer">
        <span className="nf-footer__stamp">
          Est. Error&ensp;·&ensp;HTTP 404&ensp;·&ensp;Folio Unfound
        </span>
      </footer>
    </div>
  );
}