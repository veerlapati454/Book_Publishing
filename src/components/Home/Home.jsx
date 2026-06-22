import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import img1 from "../../assets/c6.webp"
import img2 from "../../assets/c7.webp"
import img3 from "../../assets/c5.webp"


/* ── Reusable scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Section wrapper with reveal ── */
function Reveal({ className = "", children, delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Data ── */
const services = [
  {
    icon: "✦",
    title: "Manuscript Editing",
    desc: "From developmental edits to final proofreading — our editors shape your words into their sharpest form.",
  },
  {
    icon: "◈",
    title: "Cover Design",
    desc: "Striking, genre-aware covers designed by professionals who understand what makes readers stop scrolling.",
  },
  {
    icon: "⬡",
    title: "Global Distribution",
    desc: "Your book placed in 190+ countries — Amazon, Flipkart, Barnes & Noble, local bookstores, and beyond.",
  },
  {
    icon: "◎",
    title: "ISBN & Copyright",
    desc: "We handle the legal backbone so your intellectual property is protected before day one of publication.",
  },
  {
    icon: "⟡",
    title: "E-book Conversion",
    desc: "Pixel-perfect EPUB and MOBI files, optimised for every reader device and platform on the market.",
  },
  {
    icon: "✧",
    title: "Author Branding",
    desc: "A cohesive identity — website, social kit, author bio — that makes you memorable beyond the page.",
  },
];

const process = [
  { step: "Submit", desc: "Share your manuscript through our secure portal. We review within 48 hours." },
  { step: "Edit", desc: "Our editorial team refines your work across three structured revision rounds." },
  { step: "Design", desc: "Cover, layout, and typography crafted to match your genre and audience." },
  { step: "Publish", desc: "Your book goes live across all platforms simultaneously, worldwide." },
  { step: "Promote", desc: "Launch campaigns, press kits, and reader outreach managed by our team." },
];

const genres = [
  { label: "Literary Fiction", color: "#1a1a2e" },
  { label: "Self-Help", color: "#16213e" },
  { label: "Business", color: "#0f3460" },
  { label: "Children's Books", color: "#1b2838" },
  { label: "Poetry", color: "#22223b" },
  { label: "Biography", color: "#1c1c2e" },
  { label: "Fantasy", color: "#12122a" },
  { label: "Academic", color: "#0d1b2a" },
];

const testimonials = [
  {
    quote:
      "BookVerse turned my scattered drafts into a finished novel I'm genuinely proud of. The editing alone was worth every rupee.",
    name: "Priya Nair",
    role: "Author · The Salt Letters",
  },
  {
    quote:
      "I had zero publishing knowledge. BookVerse walked me through every step and my book is now stocked in three countries.",
    name: "Arjun Mehta",
    role: "Author · Margins of Success",
  },
  {
    quote:
      "The cover designer understood my brief immediately. Readers constantly comment on how professional it looks.",
    name: "Sunita Rao",
    role: "Author · When Monsoon Stayed",
  },
];

const faqs = [
  {
    q: "How long does the full publishing process take?",
    a: "Most titles are fully published within 8–12 weeks, depending on manuscript length and revision cycles.",
  },
  {
    q: "Do I retain rights to my book?",
    a: "Yes — always. You retain 100% of your intellectual property and creative rights throughout.",
  },
  {
    q: "What formats do you publish in?",
    a: "Hardcover, paperback, e-book (EPUB/MOBI), and audiobook production on request.",
  },
  {
    q: "Can I publish in regional Indian languages?",
    a: "Yes. We support Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Gujarati, and Bengali.",
  },
  {
    q: "Is there a minimum manuscript length?",
    a: "We work with everything from short poetry collections (30+ pages) to multi-volume series.",
  },
];

/* ── Component ── */
export default function Home() {
  const navigate = useNavigate();
  const goTo404 = () => navigate("/404");

  /* FAQ accordion state via DOM to keep it CSS-native */
  const toggleFaq = (e) => {
    const item = e.currentTarget.closest(".faq-item");
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((el) => el.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  };

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-content">
          <span className="hero-eyebrow">Independent Publishing Platform</span>
          <h1 className="hero-h1">
            Publish Your Story<br />
            <span className="hero-accent">With Confidence</span>
          </h1>
          <p className="hero-sub">
            We help authors transform manuscripts into professionally published
            books available in 190+ countries — from first draft to final shelf.
          </p>
          <div className="hero-actions">
            <button className="btn-primary1" onClick={goTo404}>Explore Books</button>
            <button className="btn-ghost" onClick={goTo404}>See How It Works</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-img-frame">
            <img
              src={img1}
              alt="Stack of published books"
            />
            <div className="hero-img-badge">
              <span>190+</span>
              <small>Countries</small>
            </div>
          </div>
        </div>
       
      </section>

      {/* ── 2. SERVICES ─────────────────────────────────────── */}
      <section className="services-section">
        <Reveal className="section-header">
          <span className="eyebrow">What We Offer</span>
          <h2>Everything an Author Needs</h2>
          <p>Six pillars that take your manuscript from raw file to global reader.</p>
        </Reveal>
        <div className="services-grid">
          {services.map(({ icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="service-card">
                <span className="service-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="service-card-line" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3. ABOUT ────────────────────────────────────────── */}
      <section className="about-section">
        <Reveal className="about-image-col">
          <div className="about-img-stack">
            <img
              src={img2}
              alt="Authors at work"
              className="about-img-main"
            />
            <img
              src={img3}
              alt="Open book"
              className="about-img-accent"
            />
          </div>
        </Reveal>
        <Reveal className="about-text-col" delay={150}>
          <span className="eyebrow">About BookVerse</span>
          <h2>Built by Readers,<br />Run for Authors</h2>
          <p>
            BookVerse was founded on a single belief: every story deserves a
            professional stage. Our team — editors, designers, marketers, and
            technologists — exists solely to serve the author's vision.
          </p>
          <p>
            We are not a vanity press. We are a full-service publishing partner
            that invests in quality at every step, from the grammar of your first
            chapter to the metadata of your final ebook file.
          </p>
          <ul className="about-pillars">
            <li>Author-first, always — you keep 100% of your rights</li>
            <li>Transparent pricing with no hidden distribution cuts</li>
            <li>Dedicated editor assigned to every manuscript</li>
            <li>Multilingual support across 8 Indian languages</li>
          </ul>
          <button className="btn-primary1" onClick={goTo404}>Our Story</button>
        </Reveal>
      </section>

      {/* ── 4. HOW IT WORKS ─────────────────────────────────── */}
      <section className="process-section">
        <Reveal className="section-header">
          <span className="eyebrow">The Process</span>
          <h2>From Manuscript to Market</h2>
          <p>Five stages — each with a dedicated team, clear timeline, and no surprises.</p>
        </Reveal>
        <div className="process-track">
          <div className="process-line" aria-hidden="true" />
          {process.map(({ step, desc }, i) => (
            <Reveal key={step} delay={i * 100} className="process-node">
              <div className="process-dot">
                <span>{i + 1}</span>
              </div>
              <div className="process-card">
                <h3>{step}</h3>
                <p>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 5. GENRES ───────────────────────────────────────── */}
      <section className="genres-section">
        <Reveal className="section-header">
          <span className="eyebrow">Genres We Publish</span>
          <h2>Every Voice Has a Home Here</h2>
          <p>We publish across literary spectrums — no genre is too niche, no story too small.</p>
        </Reveal>
        <div className="genres-grid">
          {genres.map(({ label, color }, i) => (
            <Reveal key={label} delay={i * 60}>
              <div className="genre-tile" style={{ "--tile-bg": color }}>
                <span>{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ─────────────────────────────────── */}
      <section className="testimonials-section">
        <Reveal className="section-header">
          <span className="eyebrow">Author Stories</span>
          <h2>Words From the Writers We Serve</h2>
        </Reveal>
        <div className="testimonials-grid">
          {testimonials.map(({ quote, name, role }, i) => (
            <Reveal key={name} delay={i * 100}>
              <div className="testimonial-card">
                <div className="testimonial-mark">"</div>
                <p className="testimonial-quote">{quote}</p>
                <div className="testimonial-author">
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────── */}
      <section className="faq-section">
        <Reveal className="section-header">
          <span className="eyebrow">FAQ</span>
          <h2>Questions Authors Ask Us Most</h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map(({ q, a }) => (
            <Reveal key={q}>
              <div className="faq-item">
                <button className="faq-question" onClick={toggleFaq}>
                  <span>{q}</span>
                  <span className="faq-chevron" aria-hidden="true" />
                </button>
                <div className="faq-answer">
                  <p>{a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 8. CTA ──────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-bg" aria-hidden="true" />
        <Reveal className="cta-inner">
          <span className="eyebrow cta-eyebrow">Start Today</span>
          <h2 className="cta-h2">Your Manuscript Is<br />Waiting to Become a Book</h2>
          <p className="cta-sub">
            Submit your draft — no commitment required. Our team will reach out
            within 48 hours with a personalised publishing plan.
          </p>
          <div className="cta-actions">
            <button className="btn-primary1 btn-large" onClick={goTo404}>Submit Your Manuscript</button>
            <button className="btn-ghost btn-large" onClick={goTo404}>Talk to an Editor</button>
          </div>
        </Reveal>
      </section>
    </>
  );
}