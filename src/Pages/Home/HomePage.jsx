import React from "react";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import PopularBooksSection from "./PopularBooksSection";

const HomePage = () => {
  return (
<div className="min-h-screen bg-transparent">
  <HeroSection />
  <CategoriesSection />
  <PopularBooksSection />
</div>  );
};

export default HomePage;
