"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Hamburger / Close icons ──────────────────────────────────────────────────
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Nav links config ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/register" },
  { label: "Prof Admin", href: "/admin/professionals" },
  { label: "Professionals", href: "/professionals" },
  { label: "Bookings", href: "/bookings" },
  { label: "Contact", href: "/contact" },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        /* ── Design tokens ── */
        :root {
          --green:        oklch(0.63 0.22 142.49);
          --green-dim:    oklch(0.63 0.22 142.49 / 0.14);
          --green-ring:   oklch(0.63 0.22 142.49 / 0.28);
          --green-glow:   oklch(0.63 0.22 142.49 / 0.18);
          --yellow:       oklch(0.91 0.18 100);
          --yellow-dim:   oklch(0.91 0.18 100 / 0.12);
          --glass-bg:     rgba(10, 10, 10, 0.55);
          --glass-border: rgba(255, 255, 255, 0.07);
          --glass-scrolled-bg: rgba(8, 8, 8, 0.80);
        }

        /* ── Outer wrapper (sticky) ── */
        .hdr-outer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 14px 20px;
          pointer-events: none;          /* let clicks pass to page outside pill */
          font-family: 'Outfit', sans-serif;
        }

        /* ── The pill ── */
        .hdr-pill {
          pointer-events: all;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1060px;
          height: 58px;
          padding: 0 8px 0 20px;
          border-radius: 18px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          transition:
            background 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
          /* initial fade-in */
          opacity: 0;
          transform: translateY(-10px);
          animation: hdr-enter 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s forwards;
        }
        @keyframes hdr-enter {
          to { opacity: 1; transform: translateY(0); }
        }

        .hdr-pill.scrolled {
          background: var(--glass-scrolled-bg);
          border-color: rgba(255,255,255,0.10);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255,255,255,0.04),
            0 1px 0 0 oklch(0.63 0.22 142.49 / 0.12) inset;
        }

        /* ── Logo / Brand ── */
        .hdr-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        /* Animated icon mark */
        .hdr-mark {
          position: relative;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .hdr-mark-ring {
          position: absolute;
          inset: 0;
          border-radius: 9px;
          border: 1.5px solid var(--green);
          opacity: 0.7;
        }
        .hdr-mark-dot {
          position: absolute;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--green);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px var(--green);
          animation: hdr-pulse 2.6s ease-in-out infinite;
        }
        .hdr-mark-corner {
          position: absolute;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--yellow);
          top: 4px; right: 4px;
          opacity: 0.85;
        }
        @keyframes hdr-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1);   box-shadow: 0 0 8px  var(--green); }
          50%       { transform: translate(-50%,-50%) scale(1.2); box-shadow: 0 0 16px var(--green); }
        }

        /* Brand wordmark */
        .hdr-brand {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #fff;
          user-select: none;
        }
        .hdr-brand .b-green  { color: var(--green); }
        .hdr-brand .b-yellow { color: var(--yellow); }

        /* ── Desktop Nav ── */
        .hdr-nav {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .hdr-nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          color: #888;
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 10px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .hdr-nav-link:hover {
          color: #e8e8e8;
          background: rgba(255,255,255,0.05);
        }
        .hdr-nav-link.active {
          color: var(--green);
        }
        /* hover underline accent */
        .hdr-nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px;
          height: 2px;
          border-radius: 2px;
          background: var(--green);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hdr-nav-link:hover::after { transform: translateX(-50%) scaleX(1); }
        .hdr-nav-link.active::after { transform: translateX(-50%) scaleX(1); }

        /* ── CTA buttons ── */
        .hdr-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 8px;
        }

        .hdr-btn-ghost {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #888;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          padding: 8px 18px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .hdr-btn-ghost:hover {
          color: #e8e8e8;
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.04);
        }

        .hdr-btn-cta {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          background-color: lab(63.0386% -59.1384 59.9589);
          color: #000;
          border: none;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .hdr-btn-cta:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .hdr-btn-cta:active { transform: translateY(0); box-shadow: none; }

        /* CTA yellow dot accent */
        .hdr-cta-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--yellow);
          flex-shrink: 0;
        }

        /* ── Mobile hamburger ── */
        .hdr-burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #bbb;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .hdr-burger:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        /* ── Mobile drawer ── */
        .hdr-drawer {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          flex-direction: column;
          background: rgba(8,8,8,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 0 24px 40px;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .hdr-drawer.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .hdr-drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          flex-shrink: 0;
        }

        .hdr-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }

        .hdr-drawer-link {
          font-size: 1.6rem;
          font-weight: 700;
          color: #444;
          text-decoration: none;
          letter-spacing: -0.02em;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s;
        }
        .hdr-drawer-link:hover { color: #e8e8e8; }
        .hdr-drawer-link:last-child { border-bottom: none; }

        .hdr-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .hdr-drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px;
          background: var(--green);
          color: #000;
          border: none;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .hdr-drawer-cta:hover { opacity: 0.85; }

        .hdr-drawer-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          background: transparent;
          color: #666;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s;
        }
        .hdr-drawer-ghost:hover {
          color: #ccc;
          border-color: rgba(255,255,255,0.18);
        }

        /* ── Green line at very top ── */
        .hdr-topline {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent 0%,
            var(--green) 30%,
            var(--yellow) 60%,
            transparent 100%
          );
          z-index: 1001;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .hdr-topline.visible { opacity: 1; }

        /* ── Responsive breakpoints ── */
        @media (max-width: 820px) {
          .hdr-nav    { display: none; }
          .hdr-actions { display: none; }
          .hdr-burger { display: flex; }
          .hdr-pill   { padding: 0 10px 0 16px; }
        }
      `}</style>

      {/* Top accent line — appears on scroll */}
      <div className={`hdr-topline${scrolled ? " visible" : ""}`} />

      {/* ── Main header pill ── */}
      <header className={`hdr-outer`}>
        <div className={`hdr-pill${scrolled ? " scrolled" : ""}`}>

          {/* Logo */}
          <Link href="/" className="hdr-logo" onClick={() => setMenuOpen(false)}>
            <div className="hdr-mark">
              <div className="hdr-mark-ring" />
              <div className="hdr-mark-dot" />
              <div className="hdr-mark-corner" />
            </div>
            <span className="hdr-brand">
              Inteli<span className="b-green">g</span><span className="b-yellow">l</span>o
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hdr-nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hdr-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hdr-actions">

            <Link href="/login" className="hdr-btn-cta">
              <div className="hdr-cta-dot" />
              Get started
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="hdr-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`hdr-drawer${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="hdr-drawer-top">
          <Link href="/" className="hdr-logo" onClick={() => setMenuOpen(false)}>
            <div className="hdr-mark">
              <div className="hdr-mark-ring" />
              <div className="hdr-mark-dot" />
              <div className="hdr-mark-corner" />
            </div>
            <span className="hdr-brand">
              Inteli<span className="b-green">g</span><span className="b-yellow">l</span>o
            </span>
          </Link>
          <button
            className="hdr-burger"
            style={{ display: "flex" }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="hdr-drawer-links" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hdr-drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hdr-drawer-footer">
          <Link href="/login" className="hdr-drawer-cta" onClick={() => setMenuOpen(false)}>
            Get started
          </Link>

        </div>
      </div>
    </>
  );
}