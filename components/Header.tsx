"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Icons ─────────────────────────────────────────────────────────────────────
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

const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// ── Nav links per role ────────────────────────────────────────────────────────
const NAV_BY_ROLE: Record<string, { label: string; href: string }[]> = {
  admin: [
    { label: "Home", href: "/" },
    { label: "Register", href: "/register" },
    { label: "Prof Admin", href: "/admin/professionals" },
    { label: "Professionals", href: "/professionals" },
    { label: "Users", href: "/users" },
    { label: "Bookings", href: "/bookings" },
    { label: "Contact", href: "/contact" },
  ],
  professional: [
    { label: "Home", href: "/" },
    { label: "Register", href: "/register" },
    { label: "Professionals", href: "/professionals" },
    { label: "Contact", href: "/contact" },
    { label: "My Profile", href: "/dashboard" },

  ],
  user: [
    { label: "Home", href: "/" },
    { label: "Professionals", href: "/professionals" },
    { label: "Users", href: "/users" },
    { label: "Contact", href: "/contact" },
    { label: "My Profile", href: "/my-profile" },
  ],
  guest: [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ],
};

const ROLE_TAG: Record<string, string> = {
  admin: "AD",
  professional: "P",
  user: "U",
};

// ── Add your Firebase UID here to grant admin access ──────────────────────────
const ADMIN_UIDS: string[] = [
  "vwF9rbax15blPAcHglX0eTjNlui2"
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [displayName, setDisplayName] = useState("");

  const dropRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ── Scroll ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Firebase auth listener ────────────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setLoggedIn(false);
        setUserRole("guest");
        setDisplayName("");
        setAuthLoading(false);
        return;
      }

      setLoggedIn(true);

      // Admin check
      if (ADMIN_UIDS.includes(u.uid)) {
        setUserRole("admin");
        setDisplayName(u.displayName || "Admin");
        setAuthLoading(false);
        return;
      }

      // Fetch role + name from Supabase profiles
      const { data } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("firebase_uid", u.uid)
        .single();

      setUserRole(data?.role || "user");
      setDisplayName(data?.full_name || "");
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "fb_token=; path=/; max-age=0";
    setDropOpen(false);
    setMenuOpen(false);
    router.push("/login");
  };

  const navLinks = NAV_BY_ROLE[userRole] ?? NAV_BY_ROLE.guest;
  const roleTag = ROLE_TAG[userRole] ?? "";
  const firstName = displayName.split(" ")[0] || "Me";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        :root {
          --green:             oklch(0.63 0.22 142.49);
          --yellow:            oklch(0.91 0.18 100);
          --glass-bg:          rgba(10,10,10,0.55);
          --glass-border:      rgba(255,255,255,0.07);
          --glass-scrolled-bg: rgba(8,8,8,0.82);
        }

        .hdr-outer {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000; display: flex; justify-content: center;
          padding: 14px 20px; pointer-events: none;
          font-family: 'Outfit', sans-serif;
        }

        .hdr-pill {
          pointer-events: all;
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; max-width: 1060px; height: 58px;
          padding: 0 8px 0 20px; border-radius: 18px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
          opacity: 0; transform: translateY(-10px);
          animation: hdr-enter 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s forwards;
        }
        @keyframes hdr-enter { to { opacity:1; transform:translateY(0); } }

        .hdr-pill.scrolled {
          background: var(--glass-scrolled-bg);
          border-color: rgba(255,255,255,0.10);
          box-shadow: 0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04),
                      0 1px 0 0 oklch(0.63 0.22 142.49 / 0.12) inset;
        }

        /* Logo */
        .hdr-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .hdr-mark { position: relative; width: 32px; height: 32px; flex-shrink: 0; }
        .hdr-mark-ring { position: absolute; inset: 0; border-radius: 9px; border: 1.5px solid var(--green); opacity: 0.7; }
        .hdr-mark-dot {
          position: absolute; width: 10px; height: 10px; border-radius: 50%;
          background: var(--green); top: 50%; left: 50%;
          transform: translate(-50%,-50%); box-shadow: 0 0 10px var(--green);
          animation: hdr-pulse 2.6s ease-in-out infinite;
        }
        .hdr-mark-corner { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: var(--yellow); top: 4px; right: 4px; opacity: 0.85; }
        @keyframes hdr-pulse {
          0%,100% { transform: translate(-50%,-50%) scale(1);   box-shadow: 0 0 8px  var(--green); }
          50%      { transform: translate(-50%,-50%) scale(1.2); box-shadow: 0 0 16px var(--green); }
        }
        .hdr-brand { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em; color: #fff; user-select: none; }
        .hdr-brand .b-green  { color: var(--green); }
        .hdr-brand .b-yellow { color: var(--yellow); }

        /* Desktop nav */
        .hdr-nav { display: flex; align-items: center; gap: 2px; }
        .hdr-nav-link {
          position: relative; font-size: 14px; font-weight: 500; color: #888;
          text-decoration: none; padding: 7px 14px; border-radius: 10px;
          transition: color 0.2s, background 0.2s; white-space: nowrap;
        }
        .hdr-nav-link:hover { color: #e8e8e8; background: rgba(255,255,255,0.05); }
        .hdr-nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px; height: 2px; border-radius: 2px; background: var(--green);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hdr-nav-link:hover::after { transform: translateX(-50%) scaleX(1); }

        /* Right actions */
        .hdr-actions { display: flex; align-items: center; gap: 8px; margin-left: 8px; }

        /* Guest CTA */
        .hdr-btn-cta {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 20px; background: var(--green); color: #000;
          border: none; border-radius: 50px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s; white-space: nowrap;
        }
        .hdr-btn-cta:hover { opacity: 0.85; transform: translateY(-1px); box-shadow: 0 6px 20px oklch(0.63 0.22 142.49 / 0.4); }
        .hdr-cta-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--yellow); }

        /* User pill */
        .hdr-user-wrap { position: relative; }
        .hdr-user-pill {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 14px 6px 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 50px; cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          font-family: 'Outfit', sans-serif;
        }
        .hdr-user-pill:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); }

        .hdr-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 800; color: #000; flex-shrink: 0;
        }
        .hdr-avatar.user         { background: var(--green); }
        .hdr-avatar.professional  { background: var(--yellow); }
        .hdr-avatar.admin         { background: #e040fb; }

        .hdr-user-name { font-size: 13px; font-weight: 600; color: #e0e0e0; }

        .hdr-role-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 0.05em;
          padding: 2px 7px; border-radius: 50px;
        }
        .hdr-role-tag.user         { background: oklch(0.63 0.22 142.49 / 0.15); color: var(--green); }
        .hdr-role-tag.professional { background: oklch(0.91 0.18 100 / 0.12);    color: var(--yellow); }
        .hdr-role-tag.admin        { background: rgba(224,64,251,0.12);           color: #e040fb; }

        /* Dropdown */
        .hdr-drop {
          position: absolute; top: calc(100% + 10px); right: 0;
          min-width: 180px; background: rgba(14,14,14,0.97);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 14px;
          padding: 6px; backdrop-filter: blur(20px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          opacity: 0; transform: translateY(-6px) scale(0.97);
          pointer-events: none; transition: opacity 0.18s, transform 0.18s; z-index: 999;
        }
        .hdr-drop.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }

        .hdr-drop-header { padding: 8px 12px 8px; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 4px; }
        .hdr-drop-name   { font-size: 13px; font-weight: 600; color: #e0e0e0; }
        .hdr-drop-role   { font-size: 11px; color: #555; margin-top: 1px; text-transform: capitalize; }

        .hdr-drop-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 9px 12px; border-radius: 9px;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; border: none; background: none; text-align: left;
          transition: background 0.15s; white-space: nowrap; color: #f87171;
        }
        .hdr-drop-btn:hover { background: rgba(220,50,50,0.1); }

        /* Mobile */
        .hdr-burger {
          display: none; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent; color: #bbb; cursor: pointer;
          transition: background 0.2s, color 0.2s; flex-shrink: 0;
        }
        .hdr-burger:hover { background: rgba(255,255,255,0.06); color: #fff; }

        .hdr-drawer {
          position: fixed; inset: 0; z-index: 999;
          display: flex; flex-direction: column;
          background: rgba(8,8,8,0.97); backdrop-filter: blur(20px);
          padding: 0 24px 40px;
          opacity: 0; transform: translateY(-8px); pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .hdr-drawer.open { opacity: 1; transform: translateY(0); pointer-events: all; }

        .hdr-drawer-top {
          display: flex; align-items: center; justify-content: space-between;
          height: 72px; flex-shrink: 0;
        }

        .hdr-drawer-links { display: flex; flex-direction: column; gap: 4px; flex: 1; justify-content: center; }
        .hdr-drawer-link {
          font-size: 1.6rem; font-weight: 700; color: #444;
          text-decoration: none; letter-spacing: -0.02em;
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s;
        }
        .hdr-drawer-link:hover { color: #e8e8e8; }
        .hdr-drawer-link:last-child { border-bottom: none; }

        .hdr-drawer-footer { display: flex; flex-direction: column; gap: 10px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); }

        /* Drawer user card */
        .hdr-drawer-user {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
        }
        .hdr-drawer-user-name { font-size: 15px; font-weight: 600; color: #e0e0e0; }
        .hdr-drawer-user-role { font-size: 12px; color: #555; margin-top: 2px; text-transform: capitalize; }

        .hdr-drawer-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 15px; background: var(--green); color: #000;
          border: none; border-radius: 14px;
          font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700;
          cursor: pointer; text-decoration: none; transition: opacity 0.2s;
        }
        .hdr-drawer-cta:hover { opacity: 0.85; }

        .hdr-drawer-logout {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px; background: rgba(220,50,50,0.08); color: #f87171;
          border: 1px solid rgba(220,50,50,0.22); border-radius: 14px;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: background 0.2s;
        }
        .hdr-drawer-logout:hover { background: rgba(220,50,50,0.15); }

        /* Top line */
        .hdr-topline {
          position: fixed; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, transparent, var(--green) 30%, var(--yellow) 60%, transparent);
          z-index: 1001; opacity: 0; transition: opacity 0.4s;
        }
        .hdr-topline.visible { opacity: 1; }

        /* Skeleton loader */
        .hdr-skeleton {
          width: 110px; height: 36px; border-radius: 50px;
          background: rgba(255,255,255,0.05);
          animation: hdr-shimmer 1.4s ease-in-out infinite;
        }
        @keyframes hdr-shimmer {
          0%,100% { opacity: 0.5; } 50% { opacity: 1; }
        }

        @media (max-width: 860px) {
          .hdr-nav     { display: none; }
          .hdr-actions { display: none; }
          .hdr-burger  { display: flex; }
          .hdr-pill    { padding: 0 10px 0 16px; }
        }
      `}</style>

      <div className={`hdr-topline${scrolled ? " visible" : ""}`} />

      <header className="hdr-outer">
        <div className={`hdr-pill${scrolled ? " scrolled" : ""}`}>

          {/* Logo */}
          <Link href="/" className="hdr-logo" onClick={() => setMenuOpen(false)}>
            {/* <div className="hdr-mark">
              <div className="hdr-mark-ring" />
              <div className="hdr-mark-dot" />
              <div className="hdr-mark-corner" />
            </div> */}
            <span className="hdr-brand">
              Inteli<span className="b-green">g</span><span className="b-yellow">l</span>o
            </span>
          </Link>

          {/* Desktop nav — role-filtered */}
          <nav className="hdr-nav" aria-label="Main navigation">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="hdr-nav-link">{l.label}</Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hdr-actions">
            {authLoading ? (
              <div className="hdr-skeleton" />
            ) : loggedIn ? (
              <div className="hdr-user-wrap" ref={dropRef}>
                <button className="hdr-user-pill" onClick={() => setDropOpen(v => !v)}>
                  <div className={`hdr-avatar ${userRole}`}>{roleTag}</div>
                  <span className="hdr-user-name">{firstName}</span>
                  <span className={`hdr-role-tag ${userRole}`}>{roleTag}</span>
                </button>

                <div className={`hdr-drop${dropOpen ? " open" : ""}`}>
                  <div className="hdr-drop-header">
                    <div className="hdr-drop-name">{displayName}</div>
                    <div className="hdr-drop-role">{userRole}</div>
                  </div>
                  <button className="hdr-drop-btn" onClick={handleLogout}>
                    <LogoutIcon /> Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hdr-btn-cta">
                <div className="hdr-cta-dot" />
                Get started
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button className="hdr-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`hdr-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
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
          <button className="hdr-burger" style={{ display: "flex" }}
            onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

        <nav className="hdr-drawer-links" aria-label="Mobile navigation">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="hdr-drawer-link"
              onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
        </nav>

        <div className="hdr-drawer-footer">
          {loggedIn ? (
            <>
              <div className="hdr-drawer-user">
                <div className={`hdr-avatar ${userRole}`}
                  style={{ width: 42, height: 42, fontSize: 13 }}>{roleTag}</div>
                <div>
                  <div className="hdr-drawer-user-name">{displayName}</div>
                  <div className="hdr-drawer-user-role">{userRole}</div>
                </div>
              </div>
              <button className="hdr-drawer-logout" onClick={handleLogout}>
                <LogoutIcon /> Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className="hdr-drawer-cta" onClick={() => setMenuOpen(false)}>
              Get started
            </Link>
          )}
        </div>
      </div>
    </>
  );
}