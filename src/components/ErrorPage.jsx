import React from "react";
import { useLocation, Link } from "react-router-dom";

const ACCENT = "#5d7c78"; // --accent-bg
const DARK = "#3a4f4c"; // --page-bg-dark
const MUTED = "#4f6663"; // --secondary-text
const LIGHT = "#dbe8e6"; // --accent-light
const BORDER = "#d5e2e0"; // --card-border

const ErrorPage = () => {
  const { pathname } = useLocation();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-(--page-bg)  via-(--page-bg-secondary) to-(--page-bg-dark)"
    >
      <div className="flex flex-col items-center text-center max-w-2xl w-full">
        {/* ── Big 404 with book spines on both sides ── */}
        <div className="mb-6 w-full flex items-center justify-center">
          <svg
            viewBox="0 0 500 130"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Shelf plank */}
            <rect x="0" y="118" width="500" height="5" rx="2" fill={DARK} />

            {/* ── Left book cluster ── */}
            <rect x="10" y="28" width="13" height="90" rx="2" fill={ACCENT} />
            <rect x="25" y="38" width="10" height="80" rx="2" fill={DARK} />
            <rect x="37" y="22" width="14" height="96" rx="2" fill={MUTED} />
            <rect
              x="53"
              y="34"
              width="11"
              height="84"
              rx="2"
              fill={ACCENT}
              opacity="0.55"
            />
            <rect
              x="66"
              y="18"
              width="15"
              height="100"
              rx="2"
              fill={DARK}
              stroke={BORDER}
              strokeWidth="0.5"
            />
            <rect
              x="83"
              y="30"
              width="12"
              height="88"
              rx="2"
              fill={ACCENT}
              opacity="0.75"
            />
            <rect x="97" y="24" width="13" height="94" rx="2" fill={MUTED} />
            <rect x="112" y="36" width="10" height="82" rx="2" fill={ACCENT} />

            {/* ── 404 number — centre ── */}
            <text
              x="250"
              y="108"
              textAnchor="middle"
              fontSize="110"
              fontWeight="700"
              fontFamily="sans-serif"
              fill={ACCENT}
              opacity="0.15"
            >
              404
            </text>
            <text
              x="250"
              y="104"
              textAnchor="middle"
              fontSize="100"
              fontWeight="600"
              fontFamily="sans-serif"
              fill={ACCENT}
            >
              404
            </text>

            {/* ── Right book cluster ── */}
            <rect x="378" y="36" width="10" height="82" rx="2" fill={ACCENT} />
            <rect x="390" y="24" width="13" height="94" rx="2" fill={MUTED} />
            <rect
              x="405"
              y="30"
              width="12"
              height="88"
              rx="2"
              fill={ACCENT}
              opacity="0.75"
            />
            <rect
              x="419"
              y="18"
              width="15"
              height="100"
              rx="2"
              fill={DARK}
              stroke={BORDER}
              strokeWidth="0.5"
            />
            <rect
              x="436"
              y="34"
              width="11"
              height="84"
              rx="2"
              fill={ACCENT}
              opacity="0.55"
            />
            <rect x="449" y="22" width="14" height="96" rx="2" fill={MUTED} />
            <rect x="465" y="38" width="10" height="80" rx="2" fill={DARK} />
            <rect x="477" y="28" width="13" height="90" rx="2" fill={ACCENT} />
          </svg>
        </div>

        {/* ── Error label ── */}
        <p
          className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--accent-bg)" }}
        >
          Page missing
        </p>

        {/* ── Heading ── */}
        <h1
          className="text-3xl font-semibold mb-3 leading-snug"
          style={{ color: "var(--primary-text)" }}
        >
          Seems this book flew off the shelf
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="text-sm mb-5 leading-relaxed max-w-sm"
          style={{ color: "var(--secondary-text)" }}
        >
          The page you're looking for isn't in our collection.
        </p>

        {/* ── Bad URL — required by assignment spec ── */}
        <div
          className="text-xs font-mono px-4 py-2 rounded-lg mb-8"
          style={{
            backgroundColor: "var(--accent-light)",
            color: "var(--secondary-text)",
            border: "0.5px solid var(--card-border)",
          }}
        >
          {pathname}
        </div>

        {/* ── Action buttons ── */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="
  flex items-center gap-2
  px-6 py-2.5
  rounded-xl
  text-sm font-medium
  transition-all duration-200
  bg-[var(--accent-bg)]
  text-white
  hover:bg-[var(--accent-hover)]
"
          >
            🏠︎ Back to home
          </Link>

          <Link
            to="/books/All"
            className="
    flex items-center gap-2
    px-6 py-2.5
    rounded-xl
    text-sm font-medium
    transition-all duration-200
    border
    bg-[var(--primary-text)]
    text-white
    border-[var(--primary-text)]
    hover:bg-[var(--accent-light)]
    hover:text-[var(--primary-text)]
  "
          >
            <span className="font-bold">🕮</span> Browse books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
