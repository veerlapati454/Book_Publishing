import { useState, useEffect, useRef } from "react";
import "./Contact.css";

/* ── Scroll reveal (same pattern as Books.jsx / Authors.jsx) ── */
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

const NAME_REGEX = /^[A-Za-z\s]+$/;
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const SUBJECTS = ["Manuscript Submission", "Partnership Inquiry", "Press & Media", "General Question"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (field, value) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (!NAME_REGEX.test(value)) return "Name can only contain letters and spaces.";
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!GMAIL_REGEX.test(value)) return "Please use a valid Gmail address (e.g. name@gmail.com).";
        return "";
      case "message":
        if (!value.trim()) return "Please add a short message.";
        if (value.trim().length < 10) return "Message should be at least 10 characters.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Hard-block non-alphabet characters as the user types
    if (name === "name" && value !== "" && !/^[A-Za-z\s]*$/.test(value)) return;

    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors((er) => ({ ...er, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validate("name", form.name),
      email: validate("email", form.email),
      message: validate("message", form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (!hasErrors) {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
      setTouched({});
    }
  };

  return (
    <main className="contact-page">

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-bg" aria-hidden="true" />
        <Reveal className="contact-hero-inner">
          <span className="eyebrow">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>Questions about a manuscript, a partnership, or just want to say hello? We'd love to hear from you.</p>
        </Reveal>
      </section>

      {/* ── Content ── */}
      <section className="contact-content">
        <div className="contact-grid">

          {/* Info column */}
          <Reveal className="contact-info">
            <h2>Let's start a conversation</h2>
            <p className="contact-info-lead">
              Our editorial team typically responds within one to two business days.
              For urgent matters, reach us directly using the details below.
            </p>

            <div className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">✉</span>
              <div>
                <span className="contact-detail-label">Email</span>
                <span className="contact-detail-value">info@stackly.com</span>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">☎</span>
              <div>
                <span className="contact-detail-label">Phone</span>
                <span className="contact-detail-value">+91 9876543210</span>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">⌖</span>
              <div>
                <span className="contact-detail-label">Studio</span>
                <span className="contact-detail-value">Hyderabad, Telangana, India</span>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">⏱</span>
              <div>
                <span className="contact-detail-label">Hours</span>
                <span className="contact-detail-value">Mon – Fri, 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>

            <div className="contact-socials">
              <a href="#" aria-label="Instagram" className="social-link">IG</a>
              <a href="#" aria-label="Twitter / X" className="social-link">X</a>
              <a href="#" aria-label="LinkedIn" className="social-link">in</a>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal className="contact-form-wrap" delay={100}>
            {submitted && (
              <div className="form-success" role="status">
                <span>✓</span> Your message has been sent. We'll be in touch soon.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? "invalid" : ""}
                  autoComplete="name"
                />
                {errors.name && touched.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "invalid" : ""}
                  autoComplete="email"
                />
                {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
                {!errors.email && <span className="field-hint">We currently only accept Gmail addresses.</span>}
              </div>

              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us a little about your inquiry…"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.message && touched.message ? "invalid" : ""}
                />
                {errors.message && touched.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn-primary form-submit">Send Message</button>
            </form>
          </Reveal>

        </div>
      </section>

    </main>
  );
}