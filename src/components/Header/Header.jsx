import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/stackly_logo.webp";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const overlayRef = useRef(null);
  const location = useLocation();

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on outside click — checks both header AND overlay */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      const clickedInsideHeader = headerRef.current?.contains(e.target);
      const clickedInsideOverlay = overlayRef.current?.contains(e.target);
      if (!clickedInsideHeader && !clickedInsideOverlay) {
        setMenuOpen(false);
      }
    };
    /* Use capture phase so it runs before link navigation */
    document.addEventListener("mousedown", handler, true);
    document.addEventListener("touchstart", handler, true);
    return () => {
      document.removeEventListener("mousedown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [menuOpen]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/books", label: "Books" },
    { to: "/authors", label: "Authors" },
    { to: "/contact", label: "Contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`header${scrolled ? " header--scrolled" : ""}`}
        ref={headerRef}
      >
        <div className="header-container">
          {/* Logo */}
          <Link
  to="/"
  className="logo"
  onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: "instant" }); }}
>
  <img src={logo} alt="BookVerse logo" />
</Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" aria-label="Main navigation">
            <ul className="nav-links">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={
                      location.pathname === to ? "nav-link active" : "nav-link"
                    }
                  >
                    {label}
                    <span className="nav-underline" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side */}
          <div className="header-right">
            <Link to="/login" className="login-btn">
              Login
            </Link>

            {/* Hamburger */}
            <button
              className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-overlay"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-overlay"
        ref={overlayRef}
        className={`mobile-overlay${menuOpen ? " mobile-overlay--open" : ""}`}
        aria-hidden={!menuOpen}
        /* Prevent touches on the overlay from bubbling to the outside-click handler */
        onTouchStart={(e) => e.stopPropagation()}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <ul>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={
                    location.pathname === to
                      ? "mobile-link active"
                      : "mobile-link"
                  }
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/login" className="mobile-login-btn" onClick={closeMenu}>
            Login
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Header;