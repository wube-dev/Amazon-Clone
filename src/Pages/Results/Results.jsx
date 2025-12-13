import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Products/ProductCard";
import { productUrl } from "../../Api/endPoints";
import Loader from "../../Components/Loader/Loader"; // adjust path

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
   const [isLoading, setisLoading] = useState(false);
  useEffect(() =>
  {
    setisLoading(true);
    axios
      
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) =>
      {
        setResults(res.data) 
         setisLoading(false);
      })
      .catch((err) =>
      {
        console.log(err)
         setisLoading(false);
       });
  }, [categoryName]); // IMPORTANT FIX

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category / {categoryName}</p>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.product_container}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
