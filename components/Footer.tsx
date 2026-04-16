"use client";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <>
            <style>{`
        .ftr-wrap {
          display: flex;
          justify-content: center;
          padding: 24px 20px 32px;
          font-family: 'Outfit', sans-serif;
        }

        .ftr-pill {
          width: 100%;
          max-width: 1060px;
          min-height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(10, 10, 10, 0.55);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.35),
            0 0 0 1px rgba(255,255,255,0.04),
            0 1px 0 0 oklch(0.63 0.22 142.49 / 0.10) inset;
          opacity: 0;
          transform: translateY(10px);
          animation: ftr-enter 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s forwards;
        }

        @keyframes ftr-enter {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ftr-text {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #b8b8b8;
          text-align: center;
        }

        .ftr-text .ftr-year {
          color: oklch(0.63 0.22 142.49);
          font-weight: 700;
        }

        .ftr-text .ftr-accent {
          color: oklch(0.91 0.18 100);
        }
      `}</style>

            <footer className="ftr-wrap">
                <div className="ftr-pill">
                    <p className="ftr-text">
                        © <span className="ftr-year">{year}</span> All rights reserved
                        <span className="ftr-accent">.</span>
                    </p>
                </div>
            </footer>
        </>
    );
}