import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Authors.css";
import img1 from "../../assets/pr1.webp"
import img2 from "../../assets/pr2.webp"
import img3 from "../../assets/pr3.webp"
import img4 from "../../assets/pr4.webp"
import img5 from "../../assets/pr5.webp"
import img6 from "../../assets/pr6.webp"
import img7 from "../../assets/pr7.webp"
import img8 from "../../assets/pr8.webp"


/* ── Scroll reveal (same pattern as Books.jsx) ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("revealed"); obs.unobserve(el); } },
      { threshold: 0.08 }
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
const authors = [
  {
    id: 1,
    name: "Emma Wilson",
    role: "Fiction Writer",
    books: 4,
    bio: "Known for prose that lingers in liminal spaces, Emma's novels explore memory, silence, and the architecture of forgotten places.",
    image:img1,
    tag: "Literary Fiction",
  },
  {
    id: 2,
    name: "Michael Scott",
    role: "Science Fiction Author",
    books: 6,
    bio: "A former field geologist turned novelist, Michael writes expansive adventure fiction grounded in real terrain and harder truths.",
    image:img2,
    tag: "Adventure",
  },
  {
    id: 3,
    name: "Sarah James",
    role: "Historical Novelist",
    books: 3,
    bio: "Sarah spent a decade as an archivist before turning to fiction, and it shows — her mysteries are built on real manuscripts and real silences.",
    image:img3,
    tag: "Mystery",
  },
  {
    id: 4,
    name: "Priya Nair",
    role: "Literary Novelist",
    books: 2,
    bio: "Writing from the Kerala coast, Priya traces generations of women through monsoon seasons, inheritance, and the words left unsaid.",
    image:img4,
    tag: "Literary Fiction",
  },
  {
    id: 5,
    name: "Arjun Mehta",
    role: "Self-Help Author",
    books: 1,
    bio: "After exiting his startup, Arjun began writing about what hustle culture leaves out — a quieter, more durable model for success.",
    image:img5,
    tag: "Self-Help",
  },
  {
    id: 6,
    name: "Sunit Rao",
    role: "Poet",
    books: 2,
    bio: "Sunit's award-winning verse maps grief and belonging through the lens of an Indian summer — spare, exact, and unflinching.",
    image:img6,
    tag: "Poetry",
  },
  {
    id: 7,
    name: "Karan Bose",
    role: "Fantasy Author",
    books: 3,
    bio: "Karan builds worlds out of reflection and refraction — his Glass Republic series has become a cornerstone of modern Indian fantasy.",
    image:img7,
    tag: "Fantasy",
  },
  {
    id: 8,
    name: "Neha Chandra",
    role: "Biographer",
    books: 2,
    bio: "A former financial journalist, Neha writes meticulously researched biographies that find the human story inside economic history.",
    image:img8,
    tag: "Biography",
  },
];

export default function Authors() {
  const navigate = useNavigate();
  const goTo404 = () => navigate("/404");

  return (
    <main className="authors-page">

      {/* ── Hero ── */}
      <section className="authors-hero">
        <div className="authors-hero-bg" aria-hidden="true" />
        <Reveal className="authors-hero-inner">
          <span className="eyebrow">Our Voices</span>
          <h1>Meet Our Authors</h1>
          <p>The writers, poets, and storytellers building the BookVerse catalogue — one manuscript at a time.</p>
        </Reveal>
      </section>

      {/* ── Grid ── */}
      <section className="authors-grid-section">
        <div className="authors-grid">
          {authors.map((author, i) => (
            <Reveal key={author.id} delay={i * 60}>
              <div className="author-card">
                <div className="author-img-wrap">
                  <img src={`${author.image}?w=500&q=75`} alt={author.name} loading="lazy" />
                  <span className="author-tag">{author.tag}</span>
                </div>
                <div className="author-info">
                  <h3 className="author-name">{author.name}</h3>
                  <p className="author-role">{author.role}</p>
                  <p className="author-bio">{author.bio}</p>
                  <div className="author-footer">
                    <span className="author-books">{author.books} book{author.books !== 1 ? "s" : ""} published</span>
                    <button className="author-link" onClick={goTo404}>View Profile →</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="authors-cta">
        <div className="authors-cta-glow" aria-hidden="true" />
        <Reveal className="authors-cta-inner">
          <span className="eyebrow">Join The Catalogue</span>
          <h2>Are You Our Next Author?</h2>
          <p>We're always looking for distinct voices. Submit your manuscript and tell us your story.</p>
          <button className="btn-primary" onClick={goTo404}>Submit Your Manuscript</button>
        </Reveal>
      </section>

    </main>
  );
}