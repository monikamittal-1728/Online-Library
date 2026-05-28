import React from "react";
import BookCard from "../../components/BookCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PopularBooksSection = () => {
  const books = useSelector((store) => store.books.books);
  const popularBooks = books.filter((item) => item.popular);
  console.log(books);

  return (
    <section className="w-full py-16 flex flex-col items-center gap-10">
      {/* Header */}
      <div className="w-full px-6 flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold tracking-tight text-[var(--primary-text)]">
          Popular Books
        </h1>
        <Link to="/books/All">
          <button
            className="
            flex items-center gap-2
            text-[var(--page-bg-dark)]
            font-semibold
            text-sm md:text-base
            transition-all duration-300
            hover:gap-3
            hover:text-[var(--primary-text)]
          "
          >
            See All
            <span>→</span>
          </button>
        </Link>
      </div>

      {/* Books Grid */}
      <div
        className="
          w-full
          max-w-[1800px]
          px-6
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-6
        "
      >
        {popularBooks.map((item) => (
          <BookCard book={item} />
        ))}
      </div>
    </section>
  );
};

export default PopularBooksSection;
