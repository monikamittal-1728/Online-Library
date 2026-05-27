import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./Pages/Home/HomePage";

const App = () => {
  return (
    <div className="bg-fixed bg-gradient-to-br from-(--page-bg)  via-(--page-bg-secondary) to-(--page-bg-dark)">
      <NavBar />
      <HomePage/>
    </div>
  );
};



// 74639f 5F7C78

export default App;
