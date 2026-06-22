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
  HiOutlineUserPlus,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineFlag,
  HiOutlineShieldCheck,
  HiOutlineServerStack,
  HiOutlineArrowDownTray,
  HiOutlineEllipsisHorizontal,
  HiOutlineBanknotes,
  HiOutlineNoSymbol,
} from "react-icons/hi2";
import "./AdminDashboard.css";
import logo from "../../assets/stackly_logo.webp"

const NAV_ITEMS = [
  { label: "Admin Dashboard", icon: HiOutlineSquares2X2, to: "/admin-dashboard", active: true },
  { label: "Users", icon: HiOutlineUserGroup, to: "/404" },
  { label: "Authors", icon: HiOutlineUserGroup, to: "/404" },
  { label: "Books", icon: HiOutlineBookOpen, to: "/404" },
  { label: "Orders", icon: HiOutlineShoppingBag, to: "/404" },
  { label: "Reports & Flags", icon: HiOutlineFlag, to: "/404" },
  { label: "Platform Analytics", icon: HiOutlineChartBar, to: "/404" },
  { label: "Messages", icon: HiOutlineChatBubbleLeftRight, to: "/404" },
  { label: "Settings", icon: HiOutlineCog6Tooth, to: "/404" },
  { label: "Help & Support", icon: HiOutlineQuestionMarkCircle, to: "/404" },
];

const STATS = [
  { label: "Total Users", value: "24,602", delta: "+5.4%", up: true },
  { label: "Active Authors", value: "1,340", delta: "+2.7%", up: true },
  { label: "Platform Orders", value: "58,910", delta: "-0.8%", up: false },
  { label: "Platform Revenue", value: "₹1.82Cr", delta: "+11.3%", up: true },
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
  { icon: HiOutlineUserPlus, text: "142 new users registered platform-wide today", time: "12 minutes ago", tone: "gold" },
  { icon: HiOutlineCheckCircle, text: "Author application approved for Rohit Khanna", time: "1 hour ago", tone: "success" },
  { icon: HiOutlineShieldCheck, text: "Payout batch processed for 38 authors", time: "3 hours ago", tone: "info" },
  { icon: HiOutlineExclamationCircle, text: "Book listing flagged for copyright review", time: "5 hours ago", tone: "error" },
  { icon: HiOutlineServerStack, text: "Scheduled database backup completed", time: "Yesterday", tone: "gold" },
];

const PENDING_APPROVALS = [
  { title: "Author application — Rohit Khanna", date: "Submitted today, 9:12 AM", priority: "High" },
  { title: "Manuscript review — \"The Quiet Coast\"", date: "Submitted yesterday", priority: "Medium" },
  { title: "Payout request — ₹84,200 batch", date: "Due Jun 25", priority: "High" },
  { title: "Storefront banner update request", date: "Due Jun 28", priority: "Low" },
];

const NEW_USERS = [
  { name: "Rohit Khanna", role: "Author (pending)", joined: "1 hour ago" },
  { name: "Ananya Pillai", role: "Reader", joined: "3 hours ago" },
  { name: "Devraj Shetty", role: "Reader", joined: "1 day ago" },
];

const FLAGGED_CONTENT = [
  { item: "\"The Quiet Coast\" — manuscript", reason: "Possible copyright overlap", severity: "High" },
  { item: "Review on \"Roots & Rain\"", reason: "Reported as spam", severity: "Low" },
  { item: "Author profile — guest_writer22", reason: "Suspicious payout activity", severity: "High" },
];

const REVENUE_BY_CATEGORY = [
  { category: "Literary Fiction", percent: 31 },
  { category: "Non-fiction", percent: 24 },
  { category: "Memoir", percent: 17 },
  { category: "Mystery & Thriller", percent: 16 },
  { category: "Poetry", percent: 12 },
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

function severityClass(s) {
  if (s === "High") return "priority-pill high";
  if (s === "Medium") return "priority-pill medium";
  return "priority-pill low";
}

function toneClass(tone) {
  return `activity-icon ${tone}`;
}

export default function AdminDashboard() {
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
            <input type="text" placeholder="Search users, authors, orders..." />
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
              <h1>Admin overview</h1>
              <p>Platform-wide activity, users, and approvals at a glance.</p>
            </div>
            <div className="dash-heading-actions">
              <Link to="/404" className="btn-secondary">
                <HiOutlineArrowDownTray />
                Export Report
              </Link>
              <Link to="/404" className="btn-primary">+ Add Admin User</Link>
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

            {/* Recent orders (site-wide) */}
            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Recent Platform Orders</h2>
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

          {/* Activity + Pending approvals */}
          <section className="dash-panels">

            {/* Activity feed */}
            <div className="panel">
              <div className="panel-header">
                <h2>System Activity</h2>
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

            {/* Pending approvals */}
            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Pending Approvals</h2>
                <Link to="/404" className="panel-link">Manage</Link>
              </div>
              <ul className="task-list">
                {PENDING_APPROVALS.map((t, i) => (
                  <li key={i}>
                    <Link to="/404" className="task-item">
                      <span className="task-icon"><HiOutlineShieldCheck /></span>
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

          {/* New users + Revenue by category + Flagged content */}
          <section className="dash-panels dash-panels-three">

            {/* New users */}
            <div className="panel">
              <div className="panel-header">
                <h2>New Sign-ups</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="author-list">
                {NEW_USERS.map((a) => (
                  <li key={a.name}>
                    <Link to="/404" className="author-item">
                      <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("")}</span>
                      <div className="author-text">
                        <span className="author-name">{a.name}</span>
                        <span className="author-meta">{a.role}</span>
                      </div>
                      <span className="author-joined">{a.joined}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Revenue by category */}
            <div className="panel">
              <div className="panel-header">
                <h2>Revenue by Category</h2>
                <Link to="/404" className="panel-link">Full report</Link>
              </div>
              <ul className="genre-list">
                {REVENUE_BY_CATEGORY.map((g) => (
                  <li key={g.category} className="genre-item">
                    <div className="genre-row">
                      <span className="genre-name">{g.category}</span>
                      <span className="genre-percent">{g.percent}%</span>
                    </div>
                    <div className="genre-bar">
                      <div className="genre-bar-fill" style={{ width: `${g.percent}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flagged content */}
            <div className="panel">
              <div className="panel-header">
                <h2>Flagged Content</h2>
                <Link to="/404" className="panel-link">Review queue</Link>
              </div>
              <ul className="review-list">
                {FLAGGED_CONTENT.map((f, i) => (
                  <li key={i}>
                    <Link to="/404" className="review-item">
                      <div className="review-top">
                        <span className="review-book">{f.item}</span>
                        <span className={severityClass(f.severity)}>{f.severity}</span>
                      </div>
                      <p className="review-text">{f.reason}</p>
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
                <HiOutlineUserGroup />
                <span>Manage Users</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineBookOpen />
                <span>Manage Books</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineShoppingBag />
                <span>View Orders</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineFlag />
                <span>Review Flags</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineBanknotes />
                <span>Process Payouts</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineNoSymbol />
                <span>Suspended Accounts</span>
              </Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}