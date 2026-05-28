import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import categories from "../../data/categories";
import BookCard from "../../components/BookCard";
import { filterByCategory } from "../../store/booksSlice";

const BrowseBooks = () => {
  /* -------------------------------------------------------------------------- */
  /*                               Route Params                                 */
  /* -------------------------------------------------------------------------- */

  // Getting category from URL
  // Example: /books/Mystery
  const { category } = useParams();

  /* -------------------------------------------------------------------------- */
  /*                           React Router & Redux                             */
  /* -------------------------------------------------------------------------- */

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing filtered books from redux store
  const { filteredBooks } = useSelector((state) => state.books);

  /* -------------------------------------------------------------------------- */
  /*                                Local State                                 */
  /* -------------------------------------------------------------------------- */

  // Stores current search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Stores active category id for UI highlight
  const [activeCategory, setActiveCategory] = useState(0);

  /* -------------------------------------------------------------------------- */
  /*                            Category Filter List                            */
  /* -------------------------------------------------------------------------- */

  // Adding "All" category manually at first position
  const filterCategory = [{ id: 0, name: "All" }, ...categories];

  /* -------------------------------------------------------------------------- */
  /*                          Filter Books By Category                          */
  /* -------------------------------------------------------------------------- */

  // Runs every time category changes from URL
  useEffect(() => {
    dispatch(filterByCategory(category));

    // Find active category from URL
    const activeItem = filterCategory.find(
      (item) => item.name.toLowerCase() === category.toLowerCase(),
    );

    // Update active category state
    setActiveCategory(activeItem?.id || 0);
  }, [category]);

  /* -------------------------------------------------------------------------- */
  /*                           Search By Title/Author                           */
  /* -------------------------------------------------------------------------- */

  // Filters books based on search input
  const searchedBooks = filteredBooks.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    );
  });

  return (
    <div className="px-6 py-4">
      {/* ----------------------------------------------------------------------- */}
      {/*                                Page Title                               */}
      {/* ----------------------------------------------------------------------- */}

      <h1 className="text-2xl font-semibold mb-4">Browse Books</h1>

      {/* ----------------------------------------------------------------------- */}
      {/*                                 Search Bar                              */}
      {/* ----------------------------------------------------------------------- */}

      <div className="relative w-full md:w-1/2 mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
      w-full
      px-4 py-2
      pr-12
      border rounded-md
      outline-none
    "
        />

        {/* Clear Search Button */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="
        absolute right-3 top-1/2
        -translate-y-1/2

        w-7 h-7
        flex items-center justify-center

        font-bold
        text-(--primary-text)

        transition-all duration-200
        hover:text-red-800
        hover:scale-105
        active:scale-95
      "
          >
            ✕
          </button>
        )}
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/*                              Category Buttons                           */}
      {/* ----------------------------------------------------------------------- */}

      <div className="flex gap-3 overflow-x-auto pb-3 mb-6">
        {filterCategory.map((item) => {
          // Checks currently active category
          const isActive = activeCategory === item.id;

          return (
            <div
              key={item.id}
              onClick={() => {
                // Navigate to selected category route
                navigate(`/books/${item.name}`);

                // Update active category UI
                setActiveCategory(item.id);
              }}
              className={`
                px-4 py-2
                whitespace-nowrap
                rounded-full
                text-sm
                cursor-pointer
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[#3a4f4c] text-white shadow-md scale-105"
                    : "bg-(--page-bg-secondary) text-black hover:bg-white "
                }
              `}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/*                            Empty Search State                           */}
      {/* ----------------------------------------------------------------------- */}

      {searchedBooks.length === 0 ? (
        <div
          className="
    flex flex-col items-center justify-center
    py-20 px-6
    text-center
    rounded-3xl
    shadow-[0_8px_30px_var(--soft-shadow)]
  "
        >
          {/* Icon */}
          <div
            className="
    w-20 h-20
    flex items-center justify-center
    rounded-full
    bg-white/70
    shadow-md
    mb-5
    overflow-hidden
  "
          >
            <span className="font-bold text-4xl">🕮</span>
          </div>
          {/* Heading */}
          <h2
            className="
      text-3xl
      font-bold
      text-[var(--primary-text)]
      mb-3
    "
          >
            No Books Found
          </h2>

          {/* Description */}
          <p
            className="
      text-[var(--secondary-text)]
      max-w-md
      leading-relaxed
    "
          >
            We couldn&apos;t find any books matching your search. Try another
            title, author, or category.
          </p>

          {/* Action Button */}
          <button
            onClick={() => setSearchTerm("")}
            className="
      mt-6
      px-6 py-3
      rounded-full
      bg-[#3a4f4c]
      text-white
      font-medium
      transition-all duration-300
      hover:scale-105
      hover:shadow-lg
      active:scale-95
    "
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* --------------------------------------------------------------------- */
        /*                               Books Grid                              */
        /* --------------------------------------------------------------------- */

        <div
          className="
            w-full max-w-[1800px]
            mx-auto
            grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-6
          "
        >
          {searchedBooks.map((item) => (
            <BookCard key={item.id} book={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseBooks;
