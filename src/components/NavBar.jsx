import React, { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-stone-100 shadow-md border-b border-stone-300 px-2 sm:px-3 py-2">
      
      <div className=" mx-auto flex items-center justify-between px-2">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />

          <div>
            <h1 className="text-base sm:text-lg font-bold text-emerald-900 leading-tight">
              Online Library
            </h1>

            <p className="text-[10px] sm:text-xs text-emerald-700 leading-tight">
              Read • Learn • Explore
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          <p className="text-stone-700 hover:text-emerald-800 cursor-pointer transition">
            Home
          </p>

          <p className="text-stone-700 hover:text-emerald-800 cursor-pointer transition">
            Browse
          </p>

          <p className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-full cursor-pointer transition shadow-sm">
            Add Book
          </p>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-emerald-900 text-2xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-white rounded-xl p-4 shadow-md text-center text-sm font-medium">

          <p className="text-stone-700 hover:text-emerald-800 cursor-pointer transition">
            Home
          </p>

          <p className="text-stone-700 hover:text-emerald-800 cursor-pointer transition">
            Browse
          </p>

          <p className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-full cursor-pointer transition shadow-sm">
            Add Book
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;