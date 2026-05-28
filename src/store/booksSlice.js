import { createSlice } from "@reduxjs/toolkit";
import  initialBooks from "../data/books"
const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: initialBooks,   /* Here I fetched my dummy data from books.js and saved in slice as initial data*/
    searchBooks :[]
  },
  reducers: {
    addBook: (state, action) => {
      state.books = [action.payload, ...state.books];
    },  
    searchBooks :(state,action)=>{
        state.searchBooks = action.payload;
    }
  },
});

export const{addBook,searchBooks} = booksSlice.actions;

export default booksSlice.reducer;
