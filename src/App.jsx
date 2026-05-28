import React from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="min-h-screen bg-fixed bg-gradient-to-br from-[var(--page-bg)] via-[var(--page-bg-secondary)] to-[var(--page-bg-dark)]">
     <ScrollToTop/>
      <NavBar />
      <Outlet/>
    </div>
  );
};



// 74639f 5F7C78

export default App;
