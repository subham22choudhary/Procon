"use client";

export default function IntelligoPage() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Category",
      text: "Browse expert help across finance, legal, career, and personal guidance."
    },
    {
      num: "02",
      title: "Connect with a Professional",
      text: "Get matched with verified professionals who understand your exact needs."
    },
    {
      num: "03",
      title: "Book and Solve Faster",
      text: "Schedule your session securely and move forward with clarity and confidence."
    }
  ];

  const categories = [
    "Finance",
    "Legal",
    "Career",
    "Personal",
    "Business",
    "Wellness"
  ];

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

                :root {
                    --green: oklch(0.63 0.22 142.49);
                    --yellow: oklch(0.91 0.18 100);
                    --bg: #050505;
                    --bg2: rgba(10,10,10,0.62);
                    --bg3: rgba(18,18,18,0.7);
                    --border: rgba(255,255,255,0.07);
                    --text: #f5f5f5;
                    --muted: #b8b8b8;
                }

                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    background: var(--bg);
                    color: var(--text);
                    font-family: 'Outfit', sans-serif;
                    line-height: 1.6;
                }

                .intelligo-wrap {
                    min-height: 100vh;
                    background:
                        radial-gradient(circle at top, rgba(120,255,180,0.08), transparent 45%),
                        radial-gradient(circle at bottom right, rgba(255,230,120,0.05), transparent 35%),
                        var(--bg);
                    overflow-x: hidden;
                }

                section {
                    padding: 80px 20px;
                }

                .container {
                    width: 100%;
                    max-width: 1120px;
                    margin: 0 auto;
                }

                .section-head {
                    text-align: center;
                    margin-bottom: 42px;
                }

                .section-label {
                    display: inline-block;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: var(--yellow);
                    margin-bottom: 14px;
                }

                .section-title {
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 800;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    margin-bottom: 12px;
                }

                .section-sub {
                    max-width: 650px;
                    margin: 0 auto;
                    color: var(--muted);
                    font-size: 15px;
                }

                /* HERO */
                .hero {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    position: relative;
                    padding: 120px 20px 60px;
                }

                .hero-inner {
                    width: 100%;
                    max-width: 900px;
                    position: relative;
                    z-index: 1;
                    animation: fadeUp 0.7s ease forwards;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 16px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid var(--border);
                    backdrop-filter: blur(14px) saturate(160%);
                    -webkit-backdrop-filter: blur(14px) saturate(160%);
                    color: var(--muted);
                    font-size: 13px;
                    margin-bottom: 24px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.28);
                }

                .hero-badge span {
                    color: var(--yellow);
                    font-weight: 700;
                }

                .hero h1 {
                    font-size: clamp(2.7rem, 7vw, 5rem);
                    font-weight: 800;
                    line-height: 1.04;
                    letter-spacing: -0.045em;
                    margin-bottom: 18px;
                }

                .hero h1 em {
                    font-style: normal;
                    color: var(--green);
                }

                .hero-sub {
                    max-width: 650px;
                    margin: 0 auto 32px;
                    color: var(--muted);
                    font-size: clamp(1rem, 1.5vw, 1.12rem);
                    font-weight: 400;
                }

                .hero-trust {
                    display: flex;
                    gap: 14px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .hero-trust-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 14px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                    color: #d5d5d5;
                    font-size: 13px;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }

                .trust-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--yellow);
                    flex-shrink: 0;
                }

                /* GLASS PANEL */
                .glass-panel {
                    background: var(--bg2);
                    border: 1px solid var(--border);
                    border-radius: 24px;
                    backdrop-filter: blur(18px) saturate(160%);
                    -webkit-backdrop-filter: blur(18px) saturate(160%);
                    box-shadow:
                        0 8px 32px rgba(0,0,0,0.35),
                        0 0 0 1px rgba(255,255,255,0.04),
                        0 1px 0 0 oklch(0.63 0.22 142.49 / 0.10) inset;
                }

                /* HOW IT WORKS */
                .steps-shell {
                    padding: 26px;
                }

                .steps-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 22px;
                }

                .step-card {
                    background: var(--bg3);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    padding: 24px;
                    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeUp 0.55s ease forwards;
                }

                .step-card:hover {
                    transform: translateY(-4px);
                    border-color: oklch(0.63 0.22 142.49 / 0.45);
                    box-shadow: 0 16px 40px rgba(0,0,0,0.25);
                }

                .step-num {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    display: grid;
                    place-items: center;
                    margin-bottom: 16px;
                    border: 2px solid var(--green);
                    color: var(--green);
                    font-weight: 800;
                    font-size: 14px;
                    background: rgba(120,255,180,0.05);
                }

                .step-card h3 {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    color: #fff;
                }

                .step-card p {
                    font-size: 14px;
                    color: var(--muted);
                }

                /* CATEGORIES */
                .categories-section .glass-panel {
                    padding: 28px 24px;
                }

                .cat-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 14px;
                    justify-content: center;
                }

                .cat-pill {
                    padding: 13px 20px;
                    border-radius: 999px;
                    border: 1px solid rgba(255,255,255,0.08);
                    background: rgba(255,255,255,0.03);
                    color: #f3f3f3;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.22s ease;
                    cursor: pointer;
                }

                .cat-pill:hover {
                    color: var(--yellow);
                    border-color: oklch(0.91 0.18 100 / 0.6);
                    background: oklch(0.91 0.18 100 / 0.08);
                    transform: translateY(-2px);
                }

                /* CTA */
                .cta-banner {
                    padding-top: 30px;
                    padding-bottom: 100px;
                }

                .cta-box {
                    padding: 42px 24px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .cta-box::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at top, rgba(120,255,180,0.08), transparent 45%),
                        radial-gradient(circle at bottom, rgba(255,230,120,0.05), transparent 40%);
                    pointer-events: none;
                }

                .cta-box > * {
                    position: relative;
                    z-index: 1;
                }

                .cta-box h2 {
                    font-size: clamp(2rem, 4vw, 3.2rem);
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    margin-bottom: 12px;
                }

                .cta-box h2 span {
                    color: var(--yellow);
                }

                .cta-box p {
                    max-width: 520px;
                    margin: 0 auto;
                    color: var(--muted);
                    font-size: 15px;
                }

                /* ANIMATION */
                @keyframes fadeUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* RESPONSIVE */
                @media (max-width: 900px) {
                    .steps-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 640px) {
                    section {
                        padding: 64px 16px;
                    }

                    .hero {
                        padding: 110px 16px 50px;
                    }

                    .steps-shell,
                    .categories-section .glass-panel,
                    .cta-box {
                        padding-left: 18px;
                        padding-right: 18px;
                    }
                }
            `}</style>

      <div className="intelligo-wrap">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-badge">
              <span>Connect with Correct</span>
            </div>

            <h1>
              Get Expert Help for <em>Anything</em> That Matters
            </h1>

            <p className="hero-sub">
              From finance and legal to career and personal decisions. Connect with trusted professionals and solve your problems faster.
            </p>

            <div className="hero-trust">
              {["Verified professionals", "Secure payments", "Real solutions"].map((t) => (
                <div className="hero-trust-item" key={t}>
                  <span className="trust-dot" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head">
              <div className="section-label">How it works</div>
              <h2 className="section-title">Simple steps. Real outcomes.</h2>
              <p className="section-sub">
                A clear path from discovering the right expert to getting actionable help.
              </p>
            </div>

            <div className="glass-panel steps-shell">
              <div className="steps-grid">
                {steps.map((step, i) => (
                  <div
                    className="step-card"
                    key={step.num}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="step-num">{step.num}</div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section">
          <div className="container">
            <div className="section-head">
              <div className="section-label">Categories</div>
              <h2 className="section-title">Help across every important area</h2>
              <p className="section-sub">
                Explore the kinds of professionals users trust to guide critical decisions.
              </p>
            </div>

            <div className="glass-panel">
              <div className="cat-grid">
                {categories.map((cat) => (
                  <button className="cat-pill" key={cat}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="container">
            <div className="glass-panel cta-box">
              <h2>
                Start solving with <span>confidence</span>
              </h2>
              <p>
                Connect with verified experts, book securely, and get the guidance you need without the usual friction.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}