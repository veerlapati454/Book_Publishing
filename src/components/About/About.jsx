import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import img1 from "../../assets/z1.webp"


/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ className = "", children, delay = 0 }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--delay": `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Data ── */
const values = [
  { icon: "✦", title: "Author-First", desc: "Every decision we make starts with one question: does this serve the author? You keep 100% of your rights — always." },
  { icon: "◈", title: "Craft Over Speed", desc: "We refuse to rush a manuscript. Quality editing, thoughtful design, and deliberate distribution take the time they deserve." },
  { icon: "⬡", title: "Radical Transparency", desc: "No hidden cuts, no opaque royalty math. Every rupee you earn is yours, tracked in a live dashboard you can check anytime." },
  { icon: "◎", title: "Inclusive Publishing", desc: "Regional languages, debut voices, unconventional genres — we publish stories the mainstream overlooks." },
];

const team = [
  { name: "Meera Iyer", role: "Editorial Director", bio: "Former senior editor at Penguin India with 14 years shaping award-winning literary fiction and narrative non-fiction.", initials: "MI" },
  { name: "Rahul Desai", role: "Head of Design", bio: "Award-winning book cover designer whose work has appeared on bestseller lists across three continents.", initials: "RD" },
  { name: "Priya Krishnan", role: "Distribution Lead", bio: "Built distribution pipelines for 500+ titles across Amazon, Flipkart, and 40 international wholesalers.", initials: "PK" },
  { name: "Arvind Nair", role: "Author Relations", bio: "Published author himself, Arvind ensures every writer we work with feels supported from first draft to final shelf.", initials: "AN" },
];

const milestones = [
  { year: "2016", event: "Founded in Bangalore with a team of three editors and a single shared manuscript." },
  { year: "2018", event: "Crossed 100 published titles; launched regional language publishing in Telugu and Tamil." },
  { year: "2020", event: "Expanded distribution to 40+ countries; introduced the Author Dashboard for real-time royalty tracking." },
  { year: "2022", event: "Opened physical offices in Mumbai and Hyderabad; launched audiobook production studio." },
  { year: "2024", event: "Reached 1,200 published authors across 8 Indian languages and 190+ countries." },
];

const services = [
  { title: "Manuscript Editing", detail: "Developmental, line, and copy editing across three structured rounds." },
  { title: "Cover Design", detail: "Genre-aware covers crafted by designers with proven bestseller track records." },
  { title: "ISBN & Copyright", detail: "Full legal registration handled before a single copy is printed or uploaded." },
  { title: "E-book Conversion", detail: "EPUB and MOBI files optimised for every reader device and storefront." },
  { title: "Global Distribution", detail: "Simultaneous listing across Amazon, Flipkart, Barnes & Noble, and 60+ platforms." },
  { title: "Author Branding", detail: "Website, social media kit, and press bio that make you memorable beyond the page." },
  { title: "Print-on-Demand", detail: "No inventory risk — books printed and shipped only when readers order them." },
  { title: "Audiobook Production", detail: "Professional studio narration with quality review and platform distribution." },
];

export default function About() {
  const navigate = useNavigate();
  const goTo404 = () => navigate("/404");

  return (
    <main className="about-page">

      {/* ── 1. HERO ── */}
      <section className="about-hero">
        <div className="about-hero-bg" aria-hidden="true" />
        <div className="about-hero-inner">
          <Reveal>
            <span className="eyebrow">About BookVerse</span>
            <h1 className="about-hero-h1">
              A Publishing House<br />
              <em>Built for Authors</em>
            </h1>
            <p className="about-hero-sub">
              Founded in 2016, BookVerse exists for one reason: to give every
              manuscript the professional stage it deserves — regardless of genre,
              language, or whether you've published before.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 2. MISSION ── */}
      <section className="about-mission">
        <Reveal className="mission-image-col">
          <div className="mission-img-wrap">
            <img
              src={img1}
              alt="Authors collaborating"
            />
            <div className="mission-img-tag">Since 2016</div>
          </div>
        </Reveal>
        <Reveal className="mission-text-col" delay={140}>
          <span className="eyebrow">Our Mission</span>
          <h2>Stories Deserve More Than a Drawer</h2>
          <p>
            Too many manuscripts never reach readers — not because they lack merit,
            but because authors lack access. Traditional publishing gatekeepers,
            prohibitive costs, and opaque processes keep great stories hidden.
          </p>
          <p>
            BookVerse tears those barriers down. We give authors the same tools,
            quality, and global reach that major publishers reserve for their top
            commercial titles — at a price that doesn't require a bestseller advance
            to afford.
          </p>
          <div className="mission-stat-row">
            <div className="mission-stat">
              <strong>1,200+</strong>
              <span>Authors Published</span>
            </div>
            <div className="mission-stat">
              <strong>190+</strong>
              <span>Countries Reached</span>
            </div>
            <div className="mission-stat">
              <strong>8</strong>
              <span>Indian Languages</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 3. VALUES ── */}
      <section className="about-values">
        <Reveal className="section-header">
          <span className="eyebrow">What We Stand For</span>
          <h2>Four Principles We Never Compromise</h2>
        </Reveal>
        <div className="values-grid">
          {values.map(({ icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="value-card">
                <span className="value-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 4. SERVICES ── */}
      <section className="about-services">
        <Reveal className="section-header">
          <span className="eyebrow">What We Do</span>
          <h2>End-to-End Publishing, Under One Roof</h2>
          <p>Eight services that carry your manuscript from raw file to global reader — no third-party handoffs, no hidden fees.</p>
        </Reveal>
        <div className="services-table">
          {services.map(({ title, detail }, i) => (
            <Reveal key={title} delay={i * 60}>
              <button
                type="button"
                className="service-row"
                onClick={goTo404}
              >
                <span className="service-num">0{i + 1}</span>
                <div className="service-body">
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
                <span className="service-arrow">→</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 5. TIMELINE ── */}
      <section className="about-timeline">
        <Reveal className="section-header">
          <span className="eyebrow">Our Journey</span>
          <h2>Eight Years, One Purpose</h2>
        </Reveal>
        <div className="timeline-track">
          <div className="timeline-rail" aria-hidden="true" />
          {milestones.map(({ year, event }, i) => (
            <Reveal key={year} delay={i * 90} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">{year}</div>
              <div className="timeline-card">
                <p>{event}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6. TEAM ── */}
      <section className="about-team">
        <Reveal className="section-header">
          <span className="eyebrow">The People Behind the Books</span>
          <h2>Meet Our Core Team</h2>
          <p>Editors, designers, and publishing veterans who bring decades of combined experience to every title.</p>
        </Reveal>
        <div className="team-grid">
          {team.map(({ name, role, bio, initials }, i) => (
            <Reveal key={name} delay={i * 90}>
              <div className="team-card">
                <div className="team-avatar">
                  <span>{initials}</span>
                </div>
                <div className="team-info">
                  <h3>{name}</h3>
                  <span className="team-role">{role}</span>
                  <p>{bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="about-cta">
        <div className="about-cta-glow" aria-hidden="true" />
        <Reveal className="about-cta-inner">
          <span className="eyebrow">Ready to Publish?</span>
          <h2>Your Manuscript Belongs in the World</h2>
          <p>Submit your draft today — our team responds within 48 hours with a personalised publishing plan, no commitment required.</p>
          <div className="cta-actions">
            <button className="btn-primary1" onClick={goTo404}>Submit Your Manuscript</button>
            <button className="btn-ghost" onClick={goTo404}>Talk to an Editor</button>
          </div>
        </Reveal>
      </section>

    </main>
  );
}