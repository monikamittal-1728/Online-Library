import React, { useState } from "react";
import categories from "../../data/categories";

const AddBook = () => {
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle image file selection and generate preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setCoverImage(null);
    setPreview(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: dispatch addBook action here
  };

  return (
    <div className="w-screen h-full flex items-center justify-center px-6 py-10">
      {/* MAIN CARD */}
      <div className="w-full max-w-2xl bg-[var(--card-bg)] backdrop-blur-md border border-[var(--card-border)] rounded-3xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-[var(--primary-text)] mb-1">
          Add New Book
        </h1>
        <p className="text-sm text-[var(--secondary-text)] mb-7">
          Fill in the details below to add a book to the library.
        </p>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">

          {/* Row 1 — Title + Author */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium text-[var(--primary-text)]">
                Title <span className="text-[var(--accent-bg)]">*</span>
              </label>
              <input
                name="title"
                placeholder="e.g. Dune"
                className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)]"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium text-[var(--primary-text)]">
                Author <span className="text-[var(--accent-bg)]">*</span>
              </label>
              <input
                name="author"
                placeholder="e.g. Frank Herbert"
                className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)]"
              />
            </div>
          </div>

          {/* Row 2 — Category + Rating */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium text-[var(--primary-text)]">
                Category <span className="text-[var(--accent-bg)]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)]"
              >
                <option value="">Choose category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium text-[var(--primary-text)]">
                Rating <span className="text-[10px] text-[var(--secondary-text)]">(1 – 5)</span>{" "}
                <span className="text-[var(--accent-bg)]">*</span>
              </label>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                placeholder="e.g. 4"
                className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)]"
              />
            </div>
          </div>

          {/* Row 3 — Description (full width) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--primary-text)]">
              Description <span className="text-[var(--accent-bg)]">*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Write a short description of the book..."
              className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)] resize-none"
            />
          </div>

          {/* Row 4 — Cover Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--primary-text)]">
              Cover Image
            </label>

            {!preview ? (
              /* Drop zone — shown when no image selected */
              <label
                htmlFor="cover-upload"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[var(--card-border)] rounded-xl py-8 cursor-pointer hover:border-[var(--accent-bg)] transition-all duration-200 bg-white/30"
              >
                {/* Upload icon using inline SVG so no extra dependency */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--accent-bg)]"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="text-sm text-[var(--primary-text)] font-medium">
                  Click to upload cover image
                </span>
                <span className="text-xs text-[var(--secondary-text)]">
                  PNG, JPG, WEBP — max 5 MB
                </span>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              /* Preview — shown after image is selected */
              <div className="flex items-center gap-4 border border-[var(--card-border)] rounded-xl p-3 bg-white/30">
                <img
                  src={preview}
                  alt="Book cover preview"
                  className="w-16 h-20 object-cover rounded-lg border border-[var(--card-border)]"
                />
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-sm font-medium text-[var(--primary-text)]">
                    {coverImage?.name}
                  </span>
                  <span className="text-xs text-[var(--secondary-text)]">
                    {(coverImage?.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                {/* Remove image button */}
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs px-3 py-1 rounded-lg border border-[var(--card-border)] text-[var(--primary-text)] hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 px-5 py-3 rounded-xl bg-[var(--accent-bg)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-all duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;