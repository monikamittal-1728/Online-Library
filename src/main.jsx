import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage.jsx";
import AddBook from "./Pages/AddBook/AddBook.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import BrowseBooks from "./Pages/Books/BrowseBooks.jsx";
import BookDetails from "./Pages/Books/BookDetails.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/books/:category",
        element: <BrowseBooks/>
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/bookdetail/:id",
        element: <BookDetails/>,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>,
);
