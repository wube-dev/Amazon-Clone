import React, { useContext } from "react";
import classes from "./Products.module.css";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc,renderAdd}) {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext)
  const addToCart = () =>
  {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,title,id,rating,price,description
      }
  })
}




  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>
        {renderDesc && <div>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0}</small>
        </div>

        <div className={classes.card_Prwrapper}>
          <CurrencyFormat amount={price} />
        </div>
        {
          renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
