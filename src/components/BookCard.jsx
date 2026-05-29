import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <>
      <div
        className="
              group
              overflow-hidden
              rounded-3xl
              border border-[var(--card-border)]
              bg-[var(--card-bg)]
              backdrop-blur-md
              shadow-[0_4px_12px_var(--soft-shadow)]
              transition-all duration-300
              hover:-translate-y-2
              hover:scale-[1.02]
              hover:bg-[var(--accent-light-1)]
              hover:shadow-[0_10px_25px_var(--soft-shadow)]
              cursor-pointer
            "
      >
        {/* Image */}
        <div className="h-60 overflow-hidden relative group">
          <img
            src={
              book.image ||
              "/no_cover_image.png"
            }
            alt={book.title}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          {/* Blur Overlay — desktop hover only */}
          <Link to={`/bookdetail/${book.id}`}>
            <div
              className="
                absolute inset-0
                bg-black/30
                backdrop-blur-xs
                opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            {/* View Details — desktop hover only */}
            <div
              className="
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                flex items-center gap-2
                text-white
                font-semibold
                text-base
                opacity-0
                transition-all duration-300
                hover:text-yellow-200
                active:scale-90
                group-hover:opacity-100
                group-hover:scale-100
              "
            >
              View Details <span>→</span>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          {/* Title */}
          <h2
            className="
                  text-lg
                  font-semibold
                  text-[var(--primary-text)]
                  transition-colors
                  line-clamp-1
                "
          >
            {book.title}
          </h2>
          {/* Author */}
          <p
            className="
                  text-sm
                  text-[var(--secondary-text)]
                  transition-colors
                "
          >
            by {book.author}
          </p>

          {/* Category + Rating */}
          <div className="flex items-center justify-between mt-2">
            <span
              className="
                    px-3 py-1 rounded-full
                    text-xs font-medium
                    bg-[var(--accent-light)]
                    text-[var(--accent-bg)]
                    group-hover:bg-white/80
                    transition-colors
                  "
            >
              {book.category}
            </span>
            <span
              className="
                    text-sm
                    font-semibold
                    text-[var(--primary-text)]
                    transition-colors
                  "
            >
              ⭐ {book.rating}
            </span>
          </div>

          {/* View Details button — mobile only, hidden on md+ */}
          <Link
            to={`/bookdetail/${book.id}`}
            className="
              md:hidden
              w-full
              py-2
              rounded-xl
              border border-[var(--accent-bg)]
              text-[var(--accent-bg)]
              text-sm font-semibold
              text-center
              transition-all duration-200
              active:scale-95
              hover:bg-[var(--accent-bg)]
              hover:text-white
            "
          >
            View Details →
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookCard;