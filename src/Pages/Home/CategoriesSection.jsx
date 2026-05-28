import React from "react";
import categories from "../../data/categories";
import { Link } from "react-router-dom";
const CategoriesSection = () => {
  const category_list = categories;
  console.log(category_list);

  return (
    <div className="flex flex-col px-6  justify-center  gap-10 ">
      <h1 className="text-lg md:text-2xl font-bold text-(--primary-text) tracking-tight">
        Browse by category
      </h1>

      <div className="flex flex-wrap gap-4 ">
        {category_list.map((item) => (
          <Link to={`/books/${item.name}`}>
            <div
              key={item.id}
              className="cursor-pointer px-6 py-3 rounded-2xl font-medium transition-all duration-300
                   /* Background & Text using your variables */
                   bg-(--card-bg) text-(--secondary-text) 
                   border border-(--card-border) backdrop-blur-md
                   
                   /* Shadow using your custom soft-shadow variable */
                   shadow-[0_4px_12px_var(--soft-shadow)]
                   
                   /* Hover States: Change BG, Text, Scale, and Shadow */
                   hover:bg-(--accent-bg) hover:text-white 
                   hover:scale-105 hover:-translate-y-1
                   hover:shadow-[0_8px_20px_var(--soft-shadow)]
                   hover:border-none
                   
                   /* Active/Click State */
                   active:scale-95 active:bg-s(--accent-hover)"
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
