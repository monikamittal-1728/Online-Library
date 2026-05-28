import { createSlice } from "@reduxjs/toolkit";
import initialBooks from "../data/books";
const booksSlice = createSlice({
  name: "books",
  initialState: {
    books:
      initialBooks /* Here I fetched my dummy data from books.js and saved in slice as initial data*/,
    filteredBooks: initialBooks,
  },
  reducers: {
    addBook: (state, action) => {
      state.books = [action.payload, ...state.books];
    },
    filterByCategory: (state, action) => {
      const category = action.payload.toLowerCase();

      if (category === "all") {
        state.filteredBooks = state.books;
      } else {
        state.filteredBooks = state.books.filter(
          (book) => book.category.toLowerCase() === category,
        );
      }
    },
  },
});

export const { addBook, filterByCategory } = booksSlice.actions;

export default booksSlice.reducer;
