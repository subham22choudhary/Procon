"use client";

export default function IntelligoPage() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        :root {
          --green: lab(63.0386% -59.1384 59.9589);
          --yellow: lab(91.3413% 4.51836 106.171);
          --green-light: lab(80% -40 40);
          --bg: #0a0f0a;
          --bg2: #0f160f;
          --bg3: #141e14;
          --border: rgba(255,255,255,0.07);
          --text: #f0f5f0;
          --muted: rgba(240,245,240,0.5);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;

        }

        .intelligo-wrap {
          min-height: 100vh;
          background: var(--bg);
          overflow-x: hidden;
        }

        /* ─── HERO ─── */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 120px 5% 50px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -20%, lab(63.0386% -59.1384 59.9589 / 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 80%, lab(91.3413% 4.51836 106.171 / 0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.8rem; color: var(--muted);
          margin-bottom: 2rem;
          letter-spacing: 0.02em;
        }
        .hero-badge span {
          color: var(--yellow);
          font-weight: 600;
        }
        .hero h1 {
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          max-width: 800px;
          margin-bottom: 1.5rem;
        }
        .hero h1 em {
          font-style: normal;
          color: var(--green);
        }
        .hero-sub {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: var(--muted);
          max-width: 520px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        .hero-trust {
          display: flex; gap: 2.5rem; flex-wrap: wrap; justify-content: center;
        }
        .hero-trust-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.825rem; color: var(--muted);
        }
        .trust-dot {
          width: 6px; height: 6px;
          border-radius: 50%; background: var(--yellow);
          flex-shrink: 0;
        }

        /* ─── SECTION COMMONS ─── */
        section { padding: 50px 5%; }
        .section-label {
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--yellow);
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
        }
        .section-head { margin-bottom: 4rem; text-align: center; }

        /* ─── HOW IT WORKS ─── */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          position: relative;
        }
        // .steps-grid::before {
        //   content: '';
        //   position: absolute;
        //   top: 28px; left: calc(16.66% + 1rem);
        //   right: calc(16.66% + 1rem);
        //   height: 1px;
        //   background: linear-gradient(90deg, var(--green), var(--yellow), var(--green));
        //   opacity: 0.35;
        // }
        .step-card {
          display: flex; flex-direction: column;
          align-items: flex-start;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          transition: border-color 0.2s;
        }
        .step-card:hover {
          border-color: lab(91.3413% 4.51836 106.171 / 0.4);
        }
        .step-num {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 2px solid var(--green);
          display: grid; place-items: center;
          color: var(--green);
          font-weight: 700; font-size: 1rem;
          margin-bottom: 1.25rem;
          flex-shrink: 0;
        }
        .step-card h3 {
          font-size: 1.05rem; font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .step-card p { font-size: 0.875rem; color: var(--muted); }

        /* ─── CATEGORIES ─── */
        .categories-section { background: var(--bg2); }
        .cat-grid {
          display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;
        }
        .cat-pill {
          padding: 12px 22px;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.9rem; font-weight: 500;
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-pill:hover {
          border-color: var(--yellow);
          color: var(--yellow);
          background: lab(91.3413% 4.51836 106.171 / 0.06);
        }

        /* ─── CTA BANNER ─── */
        .cta-banner {
          background: var(--bg);
          padding: 100px 5%;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 50% 100%, lab(63.0386% -59.1384 59.9589 / 0.1) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 20% 50%, lab(91.3413% 4.51836 106.171 / 0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .cta-banner h2 {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .cta-banner h2 span { color: var(--yellow); }
        .cta-banner p {
          color: var(--muted); font-size: 1rem;
          max-width: 440px;
          margin: 0 auto;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr; }
          .steps-grid::before { display: none; }
        }

        @media (max-width: 480px) {
          section { padding: 60px 5%; }
          .hero { padding: 100px 5% 60px; }
        }
      `}</style>

            <div className="intelligo-wrap">

                {/* ─── HERO ─── */}
                <section className="hero">
                    <div className="hero-badge">
                        <span>Connect with Correct</span>
                    </div>
                    <h1>Get Expert Help for <em>Anything</em> That Matters</h1>
                    <p className="hero-sub">
                        From finance and legal to career and personal decisions—connect with trusted professionals and solve your problems faster.
                    </p>
                    <div className="hero-trust">
                        {["Verified professionals", "Secure payments", "Real solutions"].map((t) => (
                            <div className="hero-trust-item" key={t}>
                                <span className="trust-dot" />
                                {t}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── HOW IT WORKS ─── */}
                <section id="how-it-works">
                    <div className="section-head">
                        <p className="section-label">Process</p>
                        <h2 className="section-title">How It Works</h2>
                    </div>
                    <div className="steps-grid">
                        {[
                            { n: "1", title: "Choose Your Expert", desc: "Browse verified professionals based on your needs." },
                            { n: "2", title: "Pick a Time Slot", desc: "Select a convenient time that works for you." },
                            { n: "3", title: "Book & Get Help", desc: "Secure your session and get real solutions." },
                        ].map((s) => (
                            <div className="step-card" key={s.n}>
                                <div className="step-num">{s.n}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── CATEGORIES ─── */}
                <section id="categories" className="categories-section">
                    <div className="section-head">
                        <p className="section-label">Areas of Help</p>
                        <h2 className="section-title">Get Help Across Multiple Areas</h2>
                    </div>
                    <div className="cat-grid">
                        {[
                            "Finance & Tax (CAs)",
                            "Legal Advice",
                            "Career & Job Guidance",
                            "Personal Consultation",
                            "Business & Startup Help",
                            "Health & Wellness",
                        ].map((label) => (
                            <div className="cat-pill" key={label}>{label}</div>
                        ))}
                    </div>
                </section>

                {/* ─── CTA BANNER ─── */}
                <section className="cta-banner">
                    <h2>Stop Guessing. <span>Start Solving.</span></h2>
                    <p>Get expert help today and make better decisions faster.</p>
                </section>

            </div>
        </>
    );
}