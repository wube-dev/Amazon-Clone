import React from "react";
import CategoryCard from "./CategoryCard";
import { CatagoryFullInfos } from "./CategoryFullInfos";
import classes from "./Category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {CatagoryFullInfos.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Category;
