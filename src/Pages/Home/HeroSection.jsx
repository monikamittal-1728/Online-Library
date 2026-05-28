import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="
        w-full
        px-5
        sm:px-8
        py-8
        md:py-10
        flex
        flex-col-reverse
        md:flex-row
        items-center
        justify-between
        gap-8
      "
    >
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left">
        <p
          className="
            text-sm
            sm:text-base
            font-medium
            text-(--accent-bg)
            mb-3
          "
        >
          Explore • Read • Learn
        </p>

        <h1
          className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-bold
            leading-tight
            text-(--primary-text)
          "
        >
          Your Online
          <br />
          Book Library
        </h1>

        <p
          className="
            mt-5
            text-sm
            sm:text-base
            text-(--secondary-text)
            max-w-xl
            leading-relaxed
          "
        >
          Discover thousands of books across every genre. Read, explore, and
          build your personal collection from anywhere.
        </p>

        {/* Buttons */}
        <div
          className="
            mt-7
            flex
            flex-wrap
            items-center
            justify-center
            md:justify-start
            gap-4
          "
        >
          <Link to='/books/All'>
          <button
            className="
              bg-(--accent-bg)
              active:scale-90
              hover:bg-(--accent-hover)
              duration-300 
              hover:shadow-xl
              text-white
              px-6
              py-3
              rounded-2xl
              text-sm
              sm:text-base
              font-medium
              transition
              shadow-md
            "
          >
            Browse Books
          </button>
          </Link>
          <Link to="/addbook">
            <button
              className="
              bg-(--accent-bg-1)
              active:scale-90
              hover:bg-[#3a4f4c]
              hover:text-white
              hover:border-none
              duration-300 
              text-(--primary-text)
              border
              border-(--card-border)
              px-6
              py-3
              rounded-2xl
              text-sm
              sm:text-base
              font-medium
              transition
            "
            >
              Add Books
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center">
        <img
          src="/hero-img.png"
          alt="Books"
          className="
            w-[260px]
            sm:w-[320px]
            md:w-[400px]
            lg:w-[480px]
            object-contain
            drop-shadow-2xl
          "
        />
      </div>
    </section>
  );
};

export default HeroSection;
