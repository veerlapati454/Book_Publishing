import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineShoppingBag,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineDocumentPlus,
  HiOutlineUserPlus,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInbox,
  HiOutlineStar,
  HiOutlineGlobeAlt,
  HiOutlineArrowDownTray,
  HiOutlinePrinter,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import "./Dashboard.css";
import logo from "../../assets/stackly_logo.webp"

const NAV_ITEMS = [
  { label: "Dashboard", icon: HiOutlineSquares2X2, to: "/dashboard", active: true },
  { label: "Authors", icon: HiOutlineUserGroup, to: "/404" },
  { label: "Books", icon: HiOutlineBookOpen, to: "/404" },
  { label: "Orders", icon: HiOutlineShoppingBag, to: "/404" },
  { label: "Analytics", icon: HiOutlineChartBar, to: "/404" },
  { label: "Messages", icon: HiOutlineChatBubbleLeftRight, to: "/404" },
  { label: "Settings", icon: HiOutlineCog6Tooth, to: "/404" },
  { label: "Help & Support", icon: HiOutlineQuestionMarkCircle, to: "/404" },
];

const STATS = [
  { label: "Total Books", value: "1,248", delta: "+8.2%", up: true },
  { label: "Active Authors", value: "86", delta: "+3.1%", up: true },
  { label: "Monthly Orders", value: "3,920", delta: "-1.4%", up: false },
  { label: "Revenue", value: "₹9.4L", delta: "+12.6%", up: true },
];

const RECENT_ORDERS = [
  { id: "#BV-3081", book: "The Silent Library", author: "Emma Wilson", status: "Delivered", amount: "₹499" },
  { id: "#BV-3080", book: "The Glass Republic", author: "Karan Bose", status: "Shipped", amount: "₹649" },
  { id: "#BV-3079", book: "When Monsoon Stayed", author: "Sunita Rao", status: "Processing", amount: "₹349" },
  { id: "#BV-3078", book: "Margins of Success", author: "Arjun Mehta", status: "Delivered", amount: "₹399" },
  { id: "#BV-3077", book: "Ledger of Lives", author: "Neha Chandra", status: "Cancelled", amount: "₹549" },
];

const TOP_BOOKS = [
  { title: "The Last Chapter", author: "Sarah James", sales: 412, percent: 92 },
  { title: "The Silent Library", author: "Emma Wilson", sales: 378, percent: 84 },
  { title: "Roots & Rain", author: "Priya Nair", sales: 301, percent: 67 },
  { title: "Beyond The Horizon", author: "Michael Scott", sales: 256, percent: 57 },
];

const ACTIVITY_FEED = [
  { icon: HiOutlineDocumentPlus, text: "New manuscript submitted by Karan Bose", time: "12 minutes ago", tone: "gold" },
  { icon: HiOutlineCheckCircle, text: "Order #BV-3081 marked as delivered", time: "1 hour ago", tone: "success" },
  { icon: HiOutlineUserPlus, text: "Priya Nair joined as a new author", time: "3 hours ago", tone: "info" },
  { icon: HiOutlineExclamationCircle, text: "Order #BV-3077 was cancelled by customer", time: "5 hours ago", tone: "error" },
  { icon: HiOutlineInbox, text: "3 new messages in your inbox", time: "Yesterday", tone: "gold" },
];

const UPCOMING_TASKS = [
  { title: "Review final draft — The Glass Republic", date: "Today, 4:00 PM", priority: "High" },
  { title: "Cover design call with Sunita Rao", date: "Tomorrow, 11:00 AM", priority: "Medium" },
  { title: "Quarterly royalty statements due", date: "Jun 25", priority: "High" },
  { title: "Marketing sync — Summer catalogue", date: "Jun 27", priority: "Low" },
];

const NEW_AUTHORS = [
  { name: "Priya Nair", genre: "Literary Fiction", books: 2, joined: "3 hours ago" },
  { name: "Arjun Mehta", genre: "Non-fiction", books: 5, joined: "2 days ago" },
  { name: "Neha Chandra", genre: "Memoir", books: 1, joined: "4 days ago" },
];

const REVIEWS = [
  { book: "The Last Chapter", reviewer: "Goodreads Reader", rating: 5, text: "A gripping, layered story that stays with you long after the final page." },
  { book: "Roots & Rain", reviewer: "Verified Buyer", rating: 4, text: "Beautifully written, though the middle act drags a little." },
  { book: "Beyond The Horizon", reviewer: "Verified Buyer", rating: 5, text: "Michael Scott's best work yet — couldn't put it down." },
];

const SALES_BY_GENRE = [
  { genre: "Literary Fiction", percent: 34 },
  { genre: "Non-fiction", percent: 26 },
  { genre: "Memoir", percent: 18 },
  { genre: "Mystery & Thriller", percent: 14 },
  { genre: "Poetry", percent: 8 },
];

function priorityClass(p) {
  if (p === "High") return "priority-pill high";
  if (p === "Medium") return "priority-pill medium";
  return "priority-pill low";
}

function statusClass(status) {
  switch (status) {
    case "Delivered": return "status-pill delivered";
    case "Shipped": return "status-pill shipped";
    case "Processing": return "status-pill processing";
    case "Cancelled": return "status-pill cancelled";
    default: return "status-pill";
  }
}

function toneClass(tone) {
  return `activity-icon ${tone}`;
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <div className="dash-page">

      {/* ── Mobile overlay ── */}
      {sidebarOpen && <div className="dash-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="dash-logo-area">
          <div className="dash-logo-placeholder" aria-label="Logo placeholder">
            <img src={logo} alt="" />
          </div>
          <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <HiOutlineXMark />
          </button>
        </div>

        <nav className="dash-nav">
          <span className="dash-nav-label">Menu</span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
  key={item.label}
  to={item.to}
  className={`dash-nav-item${item.active ? " active" : ""}`}
  onClick={() => {
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }}
>
                <Icon className="dash-nav-icon" />
                <span>{item.label}</span>
                {item.active && <span className="dash-nav-dot" />}
              </Link>
            );
          })}
        </nav>

        <div className="dash-sidebar-footer">
          <button type="button" className="dash-nav-item logout" onClick={handleLogout}>
            <HiOutlineArrowRightOnRectangle className="dash-nav-icon" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="dash-main">

        {/* Topbar */}
        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <HiOutlineBars3 />
          </button>

          <div className="dash-search">
            <HiOutlineMagnifyingGlass className="dash-search-icon" />
            <input type="text" placeholder="Search books, authors, orders…" />
          </div>

          <div className="dash-topbar-actions">
            <Link to="/404" className="dash-icon-btn" aria-label="Notifications">
              <HiOutlineBell />
              <span className="dash-icon-badge" />
            </Link>
            
          </div>
        </header>

        {/* Content */}
        <main className="dash-content">

          <div className="dash-heading-row">
            <div>
              <h1>Welcome back</h1>
              <p>Here's what's happening across your catalogue today.</p>
            </div>
            <div className="dash-heading-actions">
              <Link to="/404" className="btn-secondary">
                <HiOutlineArrowDownTray />
                Export Report
              </Link>
              <Link to="/404" className="btn-primary">+ Add New Book</Link>
            </div>
          </div>

          {/* Stat cards */}
          <section className="dash-stats">
            {STATS.map((s) => (
              <Link to="/404" className="stat-card" key={s.label}>
                <span className="stat-label">{s.label}</span>
                <div className="stat-row">
                  <span className="stat-value">{s.value}</span>
                  <span className={`stat-delta ${s.up ? "up" : "down"}`}>
                    {s.up ? <HiOutlineArrowTrendingUp /> : <HiOutlineArrowTrendingDown />}
                    {s.delta}
                  </span>
                </div>
              </Link>
            ))}
          </section>

          {/* Two-column panels */}
          <section className="dash-panels">

            {/* Recent orders */}
            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Recent Orders</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Book</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((o) => (
                      <tr key={o.id}>
                        <td className="muted">{o.id}</td>
                        <td className="strong">{o.book}</td>
                        <td className="muted">{o.author}</td>
                        <td><span className={statusClass(o.status)}>{o.status}</span></td>
                        <td className="strong">{o.amount}</td>
                        <td>
                          <Link to="/404" className="row-action" aria-label="More options">
                            <HiOutlineEllipsisHorizontal />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top performing books */}
            <div className="panel">
              <div className="panel-header">
                <h2>Top Performing</h2>
                <Link to="/404" className="panel-link">Details</Link>
              </div>
              <ul className="top-list">
                {TOP_BOOKS.map((b) => (
                  <li key={b.title}>
                    <Link to="/404" className="top-item">
                      <div className="top-item-text">
                        <span className="top-item-title">{b.title}</span>
                        <span className="top-item-author">{b.author}</span>
                      </div>
                      <div className="top-item-bar-wrap">
                        <div className="top-item-bar">
                          <div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} />
                        </div>
                        <span className="top-item-sales">{b.sales} sold</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* Activity + Tasks */}
          <section className="dash-panels">

            {/* Activity feed */}
            <div className="panel">
              <div className="panel-header">
                <h2>Recent Activity</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="activity-list">
                {ACTIVITY_FEED.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <li key={i}>
                      <Link to="/404" className="activity-item">
                        <span className={toneClass(a.tone)}><Icon /></span>
                        <div className="activity-text">
                          <span>{a.text}</span>
                          <span className="activity-time">
                            <HiOutlineClock /> {a.time}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Upcoming tasks */}
            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Upcoming Tasks</h2>
                <Link to="/404" className="panel-link">Manage</Link>
              </div>
              <ul className="task-list">
                {UPCOMING_TASKS.map((t, i) => (
                  <li key={i}>
                    <Link to="/404" className="task-item">
                      <span className="task-icon"><HiOutlineCalendarDays /></span>
                      <div className="task-text">
                        <span className="task-title">{t.title}</span>
                        <span className="task-date">{t.date}</span>
                      </div>
                      <span className={priorityClass(t.priority)}>{t.priority}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* New authors + Sales by genre + Reviews */}
          <section className="dash-panels dash-panels-three">

            {/* New authors */}
            <div className="panel">
              <div className="panel-header">
                <h2>New Authors</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="author-list">
                {NEW_AUTHORS.map((a) => (
                  <li key={a.name}>
                    <Link to="/404" className="author-item">
                      <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("")}</span>
                      <div className="author-text">
                        <span className="author-name">{a.name}</span>
                        <span className="author-meta">{a.genre} · {a.books} books</span>
                      </div>
                      <span className="author-joined">{a.joined}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sales by genre */}
            <div className="panel">
              <div className="panel-header">
                <h2>Sales by Genre</h2>
                <Link to="/404" className="panel-link">Full report</Link>
              </div>
              <ul className="genre-list">
                {SALES_BY_GENRE.map((g) => (
                  <li key={g.genre} className="genre-item">
                    <div className="genre-row">
                      <span className="genre-name">{g.genre}</span>
                      <span className="genre-percent">{g.percent}%</span>
                    </div>
                    <div className="genre-bar">
                      <div className="genre-bar-fill" style={{ width: `${g.percent}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="panel">
              <div className="panel-header">
                <h2>Latest Reviews</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="review-list">
                {REVIEWS.map((r, i) => (
                  <li key={i}>
                    <Link to="/404" className="review-item">
                      <div className="review-top">
                        <span className="review-book">{r.book}</span>
                        <span className="review-stars">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <HiOutlineStar key={idx} className={idx < r.rating ? "filled" : ""} />
                          ))}
                        </span>
                      </div>
                      <p className="review-text">{r.text}</p>
                      <span className="review-by">— {r.reviewer}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* Quick actions */}
          <section className="panel quick-actions">
            <div className="panel-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-grid">
              <Link to="/404" className="quick-card">
                <HiOutlineBookOpen />
                <span>Manage Books</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineUserGroup />
                <span>Manage Authors</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineShoppingBag />
                <span>View Orders</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineChartBar />
                <span>Full Analytics</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineGlobeAlt />
                <span>Storefront</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlinePrinter />
                <span>Print Invoices</span>
              </Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}