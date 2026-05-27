import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <p
            className="
              text-(--secondary-text)
              hover:text-(--primary-text)
              cursor-pointer
              transition
            "
          >
            Home
          </p>

          <p
            className="
              text-(--secondary-text)
              hover:text-(--primary-text)
              cursor-pointer
              transition
            "
          >
            Browse
          </p>

          <p
            className="
              bg-(--accent-bg)
              hover:bg-(--accent-hover)
              text-white
              px-4
              py-1.5
              rounded-full
              cursor-pointer
              transition
              shadow-sm
            "
          >
            Add Book
          </p>
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
            flex
            flex-col
            gap-3
            bg-(--card-bg)
            border
            border-(--border-color)
            rounded-xl
            p-4
            shadow-md
            text-center
            text-sm
            font-medium
          "
        >
          <p
            className="
              text-(--secondary-text)
              hover:text-(--primary-text)
              cursor-pointer
              transition
            "
          >
            Home
          </p>

          <p
            className="
              text-(--secondary-text)
              hover:text-(--primary-text)
              cursor-pointer
              transition
            "
          >
            Browse
          </p>

          <p
            className="
              bg-(--accent-bg)
              hover:bg-(--accent-hover)
              text-white
              px-4
              py-2
              rounded-full
              cursor-pointer
              transition
              shadow-sm
            "
          >
            Add Book
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
