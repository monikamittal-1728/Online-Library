import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const isBooks = pathname.startsWith("/books");
  const isAddBook = pathname === "/addbook";

  return (
    <nav
      className="
        w-full
        px-2
        sm:px-3
        py-2
      "
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />

          <h1
            className="
              text-lg
              sm:text-2xl
              font-semibold
              text-(--primary-text)
              leading-tight
            "
          >
            Online Library
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          <Link to="/">
            <p
              className={`
                font-bold
                hover:text-(--nav-hover)
                hover:scale-110
                cursor-pointer
                transition
                rounded-full
                px-3
                py-1
                ${
                  isHome
                    ? "text-(--nav-active) bg-white/40"
                    : "text-(--nav-text)"
                }
              `}
            >
              Home
            </p>
          </Link>

          <Link to="/books/All">
            <p
              className={`
                font-bold
                hover:text-(--nav-hover)
                hover:scale-110
                cursor-pointer
                transition
                rounded-full
                px-3
                py-1
                ${
                  isBooks
                    ? "text-(--nav-active) bg-white/40"
                    : "text-(--nav-text)"
                }
              `}
            >
              Browse
            </p>
          </Link>

          <Link to="/addbook">
            <p
              className={`
                font-bold
                hover:text-(--nav-hover)
                hover:scale-110
                cursor-pointer
                transition
                rounded-full
                px-3
                py-1
                ${
                  isAddBook
                    ? "text-(--nav-active) bg-white/40"
                    : "text-(--nav-text)"
                }
              `}
            >
              Add Book
            </p>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden
            text-(--primary-text)
            text-2xl
          "
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
            md:hidden
            mt-3
            mx-4
            flex
            flex-col
            gap-3
            bg-(--card-bg)
            rounded-xl
            p-4
            shadow-md
            text-center
            text-sm
            font-medium
          "
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <p
              className={`
                font-bold
                cursor-pointer
                transition
                rounded-full
                px-3
                py-2
                ${
                  isHome
                    ? "text-(--nav-text) bg-(--accent-hover)/30"
                    : "text-(--secondary-text) hover:text-(--primary-text)"
                }
              `}
            >
              Home
            </p>
          </Link>

          <Link to="/books/All" onClick={() => setMenuOpen(false)}>
            <p
              className={`
                font-bold
                cursor-pointer
                transition
                rounded-full
                px-3
                py-2
                ${
                  isBooks
                    ? "text-(--nav-text) bg-(--accent-hover)/30"
                    : "text-(--secondary-text) hover:text-(--primary-text)"
                }
              `}
            >
              Browse
            </p>
          </Link>

          <Link to="/addbook" onClick={() => setMenuOpen(false)}>
            <p
              className={`
                font-bold
                cursor-pointer
                transition
                rounded-full
                px-3
                py-2
                ${
                  isAddBook
                    ? "text-(--nav-text) bg-(--accent-hover)/30"
                    : "text-(--secondary-text) hover:text-(--primary-text)"
                }
              `}
            >
              Add Book
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;