import React, { useState } from "react";
import categories from "../../data/categories";
import books from "../../data/books";
import BookCard from "../../components/BookCard";

const BrowsePage = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const filterCategory = [{ id: 0, name: "All" }, ...categories];

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-semibold mb-4">Browse Books</h1>

      {/* Search */}
      <input
        placeholder="Search by title or author"
        className="w-full md:w-1/2 px-4 py-2 border rounded-md mb-6"
      />

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-6">
        {filterCategory.map((item) => {
          const isActive = activeCategory === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={`
                px-4 py-2 whitespace-nowrap rounded-full text-sm cursor-pointer
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[#3a4f4c] text-white shadow-md scale-105"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }
              `}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      {/* Books Grid */}
      <div className="w-full max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {books.map((item) => (
          <BookCard key={item.id} book={item} />
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;