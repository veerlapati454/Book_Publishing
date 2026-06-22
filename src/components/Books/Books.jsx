import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Books.css";
import img1 from "../../assets/z1.webp"
import img2 from "../../assets/c1.webp"
import img3 from "../../assets/c2.webp"
import img4 from "../../assets/c3.webp"
import img5 from "../../assets/c4.webp"
import img6 from "../../assets/c5.webp"
import img7 from "../../assets/c6.webp"
import img8 from "../../assets/c7.webp"


/* ── Scroll reveal ── */
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
const books = [
  {
    id: 1,
    title: "The Silent Library",
    author: "Emma Wilson",
    genre: "Literary Fiction",
    pages: 312,
    year: 2024,
    rating: 4.7,
    description: "A haunting meditation on memory and silence, set inside a library that exists between worlds — where lost stories go to rest.",
    image: img2,
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "Beyond The Horizon",
    author: "Michael Scott",
    genre: "Adventure",
    pages: 428,
    year: 2023,
    rating: 4.5,
    description: "An explorer's journal turned novel — crossing deserts, oceans, and the limits of human endurance in search of a legendary city.",
    image: img3,
    badge: "Featured",
  },
  {
    id: 3,
    title: "The Last Chapter",
    author: "Sarah James",
    genre: "Mystery",
    pages: 276,
    year: 2024,
    rating: 4.8,
    description: "A literary detective unravels a decades-old manuscript mystery that leads her to question everything she believed about authorship.",
    image: img4,
    badge: "New",
  },
  {
    id: 4,
    title: "Roots & Rain",
    author: "Priya Nair",
    genre: "Literary Fiction",
    pages: 360,
    year: 2023,
    rating: 4.6,
    description: "Three generations of women in coastal Kerala, bound by secrets carried in monsoon seasons and the words they chose not to speak.",
    image: img1,
    badge: null,
  },
  {
    id: 5,
    title: "Margins of Success",
    author: "Arjun Mehta",
    genre: "Self-Help",
    pages: 198,
    year: 2024,
    rating: 4.4,
    description: "A former startup founder dismantles hustle-culture myths and offers a quieter, more durable framework for professional fulfilment.",
    image: img8,
    badge: "Trending",
  },
  {
    id: 6,
    title: "When Monsoon Stayed",
    author: "Sunita Rao",
    genre: "Poetry",
    pages: 124,
    year: 2023,
    rating: 4.9,
    description: "An award-winning debut collection of poems that map grief, love, and the long aftermath of belonging — through the lens of an Indian summer.",
    image: img5,
    badge: "Award Winner",
  },
  {
    id: 7,
    title: "The Glass Republic",
    author: "Karan Bose",
    genre: "Fantasy",
    pages: 514,
    year: 2024,
    rating: 4.6,
    description: "In a world built on reflections, the boy who casts no shadow must decide whether to restore a broken realm or let it finally shatter.",
    image: img6,
    badge: "New",
  },
  {
    id: 8,
    title: "Ledger of Lives",
    author: "Neha Chandra",
    genre: "Biography",
    pages: 296,
    year: 2023,
    rating: 4.3,
    description: "The untold story of five Indian accountants whose quiet decisions during the 1991 reforms reshaped the economic fate of millions.",
    image: img7,
    badge: null,
  },
];

const GENRES = ["All", ...Array.from(new Set(books.map((b) => b.genre)))];
const SORTS = [
  { label: "Newest", value: "newest" },
  { label: "Rating", value: "rating" },
  { label: "Title A–Z", value: "az" },
];

/* ── Star renderer ── */
function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "star full" : i === full && half ? "star half" : "star empty"}>
          ★
        </span>
      ))}
      <span className="rating-num">{rating}</span>
    </span>
  );
}

/* ── Modal ── */
function BookModal({ book, onClose, onGetBook }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-inner">
          <div className="modal-img-col">
            <img src={`${book.image}?w=600&q=80`} alt={book.title} />
          </div>
          <div className="modal-text-col">
            {book.badge && <span className="book-badge">{book.badge}</span>}
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">by {book.author}</p>
            <Stars rating={book.rating} />
            <div className="modal-meta">
              <span>{book.genre}</span>
              <span>{book.pages} pages</span>
              <span>{book.year}</span>
            </div>
            <p className="modal-desc">{book.description}</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={onGetBook}>Get This Book</button>
              <button className="btn-ghost" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function Books() {
  const navigate = useNavigate();
  const goTo404 = () => navigate("/404");

  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("newest");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = books
    .filter((b) => genre === "All" || b.genre === genre)
    .filter((b) =>
      query.trim() === "" ||
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "az") return a.title.localeCompare(b.title);
      return b.year - a.year;
    });

  return (
    <main className="books-page">

      {/* ── Hero banner ── */}
      <section className="books-hero">
        <div className="books-hero-bg" aria-hidden="true" />
        <Reveal className="books-hero-inner">
          <span className="eyebrow">Our Collection</span>
          <h1>Featured Books</h1>
          <p>Discover titles published through BookVerse — curated across genres, voices, and worlds.</p>
        </Reveal>
      </section>

      {/* ── Controls ── */}
      <section className="books-controls">
        <div className="books-controls-inner">

          {/* Search */}
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search by title or author…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search books"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery("")} aria-label="Clear">✕</button>
            )}
          </div>

          {/* Genre pills */}
          <div className="genre-pills" role="group" aria-label="Filter by genre">
            {GENRES.map((g) => (
              <button
                key={g}
                className={`genre-pill${genre === g ? " active" : ""}`}
                onClick={() => setGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="sort-box">
            <span className="sort-label">Sort:</span>
            {SORTS.map((s) => (
              <button
                key={s.value}
                className={`sort-btn${sort === s.value ? " active" : ""}`}
                onClick={() => setSort(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>

        </div>
        <p className="results-count">{filtered.length} book{filtered.length !== 1 ? "s" : ""}</p>
      </section>

      {/* ── Grid ── */}
      <section className="books-grid-section">
        {filtered.length > 0 ? (
          <div className="books-grid">
            {filtered.map((book, i) => (
              <Reveal key={book.id} delay={i * 60}>
                <div className="book-card" onClick={() => setSelected(book)} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(book)}>
                  <div className="book-img-wrap">
                    <img src={`${book.image}?w=500&q=75`} alt={book.title} loading="lazy" />
                    {book.badge && <span className="book-badge">{book.badge}</span>}
                    <div className="book-overlay">
                      <span className="overlay-cta">View Details</span>
                    </div>
                  </div>
                  <div className="book-info">
                    <span className="book-genre">{book.genre}</span>
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <div className="book-footer">
                      <Stars rating={book.rating} />
                      <span className="book-pages">{book.pages}p</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="books-empty">
            <span>📚</span>
            <p>No books match your search.</p>
            <button className="btn-ghost" onClick={() => { setQuery(""); setGenre("All"); }}>Clear Filters</button>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="books-cta">
        <div className="books-cta-glow" aria-hidden="true" />
        <Reveal className="books-cta-inner">
          <span className="eyebrow">Publish With Us</span>
          <h2>Your Book Could Be Next</h2>
          <p>Submit your manuscript and join 1,200+ authors who've published through BookVerse.</p>
          <button className="btn-primary" onClick={goTo404}>Submit Your Manuscript</button>
        </Reveal>
      </section>

      {/* ── Modal ── */}
      {selected && (
        <BookModal
          book={selected}
          onClose={() => setSelected(null)}
          onGetBook={goTo404}
        />
      )}
    </main>
  );
}