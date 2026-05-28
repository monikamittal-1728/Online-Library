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
    rating: "",
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

  const handleCheckbox = (e) => {
    setFormData({ ...formData, popular: e.target.checked });
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
    if (!formData.category)           newErrors.category = "Category is required";
    if (!formData.rating)             newErrors.rating = "Rating is required";
    else if (formData.rating < 1 || formData.rating > 5)
                                      newErrors.rating = "Rating must be between 1 and 5";
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
    const newBook = {
      id: Date.now(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      rating: Number(formData.rating),
      description: formData.description.trim(),
      popular: formData.popular,
      image: preview ?? null,
    };
    dispatch(addBook(newBook));
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-6 py-10">
      {/* Two-column wrapper */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-start">

        {/* ── LEFT — Form ── */}
        <div className="flex-1 bg-[var(--card-bg)] backdrop-blur-md border border-[var(--card-border)] rounded-3xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-[var(--primary-text)] mb-1">
            Add New Book
          </h1>
          <p className="text-sm text-[var(--secondary-text)] mb-7">
            Fill in the details below to add a book to the library.
          </p>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">

            {/* Title + Author */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-[var(--primary-text)]">
                  Title <span className="text-[var(--accent-bg)]">*</span>
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Dune"
                  className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)]"
                />
                {errors.title && (
                  <span className="text-xs text-red-500">{errors.title}</span>
                )}
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-[var(--primary-text)]">
                  Author <span className="text-[var(--accent-bg)]">*</span>
                </label>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. Frank Herbert"
                  className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)]"
                />
                {errors.author && (
                  <span className="text-xs text-red-500">{errors.author}</span>
                )}
              </div>
            </div>

            {/* Category + Rating */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-[var(--primary-text)]">
                  Category <span className="text-[var(--accent-bg)]">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)]"
                >
                  <option value="">Choose category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-xs text-red-500">{errors.category}</span>
                )}
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-[var(--primary-text)]">
                  Rating{" "}
                  <span className="text-[10px] text-[var(--secondary-text)]">(1–5)</span>{" "}
                  <span className="text-[var(--accent-bg)]">*</span>
                </label>
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="e.g. 4"
                  className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)]"
                />
                {errors.rating && (
                  <span className="text-xs text-red-500">{errors.rating}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[var(--primary-text)]">
                Description <span className="text-[var(--accent-bg)]">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description of the book..."
                className="px-4 py-2 rounded-xl border border-[var(--card-border)] bg-white/60 outline-none focus:ring-2 focus:ring-[var(--accent-bg)] resize-none"
              />
              {errors.description && (
                <span className="text-xs text-red-500">{errors.description}</span>
              )}
            </div>

            {/* Popular checkbox */}
            <div className="flex items-center gap-3">
              <input
                id="popular"
                type="checkbox"
                checked={formData.popular}
                onChange={handleCheckbox}
                className="w-4 h-4 accent-[var(--accent-bg)] cursor-pointer rounded"
              />
              <label
                htmlFor="popular"
                className="text-sm font-medium text-[var(--primary-text)] cursor-pointer select-none"
              >
                Mark as popular
                <span className="ml-2 text-xs text-[var(--secondary-text)]">
                  (shows on home page)
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 px-5 py-3 rounded-xl bg-[var(--accent-bg)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-all duration-300"
            >
              Add Book
            </button>
          </form>
        </div>

        {/* ── RIGHT — Cover image upload ── */}
        <div className="w-full lg:w-72 flex flex-col gap-4 sticky top-10">

          {/* Upload card */}
          <div className="bg-[var(--card-bg)] backdrop-blur-md border border-[var(--card-border)] rounded-3xl p-6 shadow-lg flex flex-col gap-4">
            <div>
              <h2 className="text-base font-bold text-[var(--primary-text)] mb-1">
                Cover Image
              </h2>
              <p className="text-xs text-[var(--secondary-text)]">
                Upload a cover to make your book stand out.
              </p>
            </div>

            {!preview ? (
              /* Drop zone */
              <label
                htmlFor="cover-upload"
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[var(--card-border)] rounded-2xl py-10 cursor-pointer hover:border-[var(--accent-bg)] transition-all duration-200 bg-white/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
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
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--primary-text)]">
                    Click to upload
                  </p>
                  <p className="text-xs text-[var(--secondary-text)] mt-1">
                    PNG, JPG, WEBP
                  </p>
                </div>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              /* Preview */
              <div className="flex flex-col gap-3">
                <img
                  src={preview}
                  alt="Book cover preview"
                  className="w-full aspect-[3/4] object-cover rounded-2xl border border-[var(--card-border)] shadow-sm"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-[var(--primary-text)] truncate">
                    {coverImage?.name}
                  </span>
                  <span className="text-xs text-[var(--secondary-text)]">
                    {(coverImage?.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="w-full text-sm px-4 py-2 rounded-xl border border-[var(--card-border)] text-[var(--primary-text)] hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all duration-200"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          {/* Tip card */}
          <div className="bg-[var(--accent-light-1)] border border-[var(--card-border)] rounded-2xl p-4">
            <p className="text-xs font-medium text-[var(--primary-text)] mb-1">
              💡 Tip
            </p>
            <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
              Check "Mark as popular" to feature this book in the Popular Books section on the home page.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddBook;