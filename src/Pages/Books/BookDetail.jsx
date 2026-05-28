import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find book from Redux store by id
  const book = useSelector((state) =>
    state.books.books.find((b) => String(b.id) === String(id))
  );

  // If book not found
  if (!book) {
    return (
      <div className="w-full min-h-screen px-6 py-10 flex flex-col items-start gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to browse
        </button>
        <div className="text-[var(--primary-text)] text-lg font-semibold">Book not found.</div>
        <div className="text-[var(--secondary-text)] text-sm">The book you're looking for doesn't exist in our library.</div>
      </div>
    );
  }

  // Render filled stars based on rating
  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        style={{ color: star <= Math.round(rating) ? "#854F0B" : "#D3D1C7", fontSize: "18px" }}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="w-full min-h-screen px-6 py-10">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors duration-200 mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to browse
      </button>

      {/* Main two-panel layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">

        {/* ── LEFT — Cover image + action buttons ── */}
        <div className="w-full lg:w-76 flex-shrink-0 flex flex-col gap-3 sticky top-10">
          {book.image ? (
            <img
              src={book.image}
              alt={`${book.title} cover`}
              className="w-full aspect-[3/4] object-cover rounded-2xl border border-[var(--card-border)]"
            />
          ) : (
            /* Placeholder when no image */
            <div className="w-full aspect-[3/4] bg-[var(--accent-light-1)] rounded-2xl border border-dashed border-[var(--accent-bg)] flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-bg)]"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <span className="text-xs text-[var(--accent-bg)] font-medium">No cover</span>
            </div>
          )}
        </div>

        {/* ── RIGHT — Book info ── */}
        <div className="flex-1 min-w-0">

          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {book.category && (
              <span className="bg-[var(--muted-text)] text-[var(--accent-light-1)] text-xs font-medium px-3 py-1 rounded-full">
                {book.category}
              </span>
            )}
            {book.popular && (
              <span className="bg-[var(--accent-light)] text-[var(--accent-hover)] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Popular
              </span>
            )}
          </div>

          {/* Title + author */}
          <h1 className="text-3xl font-bold text-[var(--primary-text)] mb-2 leading-tight">
            {book.title}
          </h1>
          <p className="text-base text-[var(--secondary-text)] mb-5">
            by <span className="font-medium text-[var(--primary-text)]">{book.author}</span>
          </p>

          {/* Star rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-0.5">{renderStars(book.rating)}</div>
            <span className="text-lg font-semibold text-[var(--primary-text)]">{book.rating}</span>
            <span className="text-sm text-[var(--secondary-text)]">/ 5.0</span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-[var(--secondary-text)] uppercase tracking-wider mb-3">
              About this book
            </h2>
            <p className="text-base text-[var(--secondary-text)] leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4">
              <div className="text-xs text-[var(--muted-text)] mb-1">Category</div>
              <div className="text-sm font-semibold text-[var(--primary-text)]">{book.category || "—"}</div>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4">
              <div className="text-xs text-[var(--muted-text)] mb-1">Rating</div>
              <div className="text-sm font-semibold text-[var(--primary-text)]">{book.rating} / 5.0</div>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4">
              <div className="text-xs text-[var(--muted-text)] mb-1">Author</div>
              <div className="text-sm font-semibold text-[var(--primary-text)] truncate">{book.author}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetail;