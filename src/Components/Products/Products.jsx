import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import ProductCard from './ProductCard'
import classes from "./Products.module.css";
import Loader from "../../Components/Loader/Loader"; // adjust path

function Products()
{
  const [Products, setProduts] = useState([])
  const [isLoading, setisLoading] = useState(false);
  useEffect(() =>
  {
    setisLoading(true);
    axios.get("https://fakestoreapi.com/products")
      .then((res) =>
      {
        setProduts(res.data)
        setisLoading(false);
      }).catch((err) =>
      {
        console.log(err)
        setisLoading(false);
      })
  
  }, [])


  return (
    <>
      {isLoading ? (<Loader />
      )
        : (
          <section className={classes.product_container}>
            {Products.map((singleProduct) =>
            (
              <ProductCard product={singleProduct} key={singleProduct.id} />
            ))}
          </section>)
      }
    </>
  );
}
  export default Products
