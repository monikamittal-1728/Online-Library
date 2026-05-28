import React, { useState } from "react";
import categories from "../../data/categories";
import { useDispatch } from "react-redux";
import { addBook } from "../../store/booksSlice";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    rating: 0,
    description: "",
    popular: false,
  });

  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCategory = (cat) => {
    setFormData({ ...formData, category: cat });
    setErrors({ ...errors, category: "" });
  };

  const handleRating = (val) => {
    setFormData({ ...formData, rating: val });
    setErrors({ ...errors, rating: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setPreview(null);
  };

  const validateErrors = () => {
    const newErrors = {};
    if (!formData.title.trim())       newErrors.title = "Title is required";
    if (!formData.author.trim())      newErrors.author = "Author is required";
    if (!formData.category)           newErrors.category = "Please select a category";
    if (!formData.rating)             newErrors.rating = "Please select a rating";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(addBook({
      id: Date.now(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      rating: formData.rating,
      description: formData.description.trim(),
      popular: formData.popular,
      image: preview ?? null,
    }));
    navigate("/books/All");
  };

  return (
    /* ← left-aligned like your other pages, no centering */
    <div className="w-full min-h-screen px-6 pt-2 pb-10">

      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--primary-text)] mb-1">
          Add a new book
        </h1>
        <p className="text-sm text-[var(--secondary-text)]">
          Fill in the details and upload a cover to add your book to the library.
        </p>
      </div>

      {/* Two-column layout */}
      <form onSubmit={handleFormSubmit} className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── LEFT — main form ── */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Card 1 — Book info */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-light-1)] flex items-center justify-center text-[var(--accent-bg)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--primary-text)]">Book details</div>
                <div className="text-xs text-[var(--secondary-text)]">Title, author and description</div>
              </div>
            </div>

            {/* Title + Author */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wide">
                  Title <span className="text-[var(--accent-bg)]">*</span>
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Dune"
                  className="px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)] text-sm"
                />
                {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wide">
                  Author <span className="text-[var(--accent-bg)]">*</span>
                </label>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. Frank Herbert"
                  className="px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)] text-sm"
                />
                {errors.author && <span className="text-xs text-red-500">{errors.author}</span>}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wide">
                Description <span className="text-[var(--accent-bg)]">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description of the book..."
                className="px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)] resize-none text-sm"
              />
              {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
            </div>
          </div>

          {/* Card 2 — Category as clickable pills */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-light-1)] flex items-center justify-center text-[var(--accent-bg)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--primary-text)]">Category</div>
                <div className="text-xs text-[var(--secondary-text)]">Pick one that fits best</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    formData.category === cat.name
                      ? "bg-[var(--accent-bg)] text-white border-[var(--accent-bg)]"
                      : "bg-white/60 text-[var(--secondary-text)] border-[var(--card-border)] hover:border-[var(--accent-bg)] hover:text-[var(--accent-bg)]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {errors.category && <span className="text-xs text-red-500 mt-2 block">{errors.category}</span>}
          </div>

          {/* Card 3 — Star rating + popular */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-light-1)] flex items-center justify-center text-[var(--accent-bg)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--primary-text)]">Rating & visibility</div>
                <div className="text-xs text-[var(--secondary-text)]">How good is this book?</div>
              </div>
            </div>

            {/* Star rating */}
            <div className="mb-2">
              <div className="text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wide mb-3">
                Rating <span className="text-[var(--accent-bg)]">*</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    className={`w-11 h-11 rounded-xl border text-xl transition-all duration-200 ${
                      formData.rating >= star
                        ? "bg-[var(--accent-light-1)] border-[var(--accent-bg)] text-[var(--accent-bg)]"
                        : "bg-white/60 border-[var(--card-border)] text-[var(--muted-text)] hover:border-[var(--accent-bg)]"
                    }`}
                  >
                    ★
                  </button>
                ))}
                {formData.rating > 0 && (
                  <span className="self-center text-sm text-[var(--secondary-text)] ml-2">
                    {formData.rating}/5
                  </span>
                )}
              </div>
              {errors.rating && <span className="text-xs text-red-500 mt-2 block">{errors.rating}</span>}
            </div>

            {/* Popular toggle */}
            <div
              onClick={() => setFormData({ ...formData, popular: !formData.popular })}
              className={`mt-4 flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                formData.popular
                  ? "bg-[var(--accent-light-1)] border-[var(--accent-bg)]"
                  : "bg-white/40 border-[var(--card-border)] hover:border-[var(--accent-bg)]"
              }`}
            >
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                formData.popular
                  ? "bg-[var(--accent-bg)] border-[var(--accent-bg)]"
                  : "border-[var(--muted-text)]"
              }`}>
                {formData.popular && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--primary-text)]">Mark as popular</div>
                <div className="text-xs text-[var(--secondary-text)]">Shows in the Popular Books section on home page</div>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[var(--accent-hover)] text-white font-semibold text-base hover:bg-[var(--nav-active)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Add book to library
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>

        {/* ── RIGHT — image upload ── */}
        <div className="w-full lg:w-64 flex flex-col gap-4 sticky top-10">

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-5 flex flex-col gap-4">
            <div>
              <div className="text-sm font-semibold text-[var(--primary-text)] mb-1">Cover image</div>
              <div className="text-xs text-[var(--secondary-text)]">Upload to make your book stand out</div>
            </div>

            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Cover preview"
                  className="w-full aspect-[3/4] object-cover rounded-xl border border-[var(--card-border)]"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full border border-[var(--card-border)] flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div className="mt-2">
                  <div className="text-xs font-medium text-[var(--primary-text)] truncate">{coverImage?.name}</div>
                  <div className="text-xs text-[var(--secondary-text)]">{(coverImage?.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-[3/4] bg-[var(--accent-light-1)] rounded-xl border border-dashed border-[var(--accent-bg)] flex flex-col items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-bg)]"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <span className="text-xs text-[var(--accent-bg)] font-medium">No cover yet</span>
              </div>
            )}

            {!preview && (
              <label
                htmlFor="cover-upload"
                className="flex flex-col items-center gap-2 border border-dashed border-[var(--card-border)] rounded-xl py-5 cursor-pointer hover:border-[var(--accent-bg)] transition-all duration-200 bg-white/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-bg)]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span className="text-xs font-medium text-[var(--primary-text)]">Click to upload</span>
                <span className="text-xs text-[var(--secondary-text)]">PNG · JPG · WEBP</span>
                <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>

          {/* Tip card */}
          <div className="bg-[var(--accent-light-1)] border border-[var(--card-border)] rounded-2xl p-4 flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-bg)] flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
              Marking a book as <span className="font-medium text-[var(--primary-text)]">popular</span> will feature it in the Popular Books section on the home page.
            </p>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddBook;