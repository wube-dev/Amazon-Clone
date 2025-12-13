import React, { useContext } from "react";
import Layout from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import classes from "./Cart.module.css";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (item) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id: item.id,
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>hello</h2>
          <h3>your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps! no item in your cart </p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.product_container}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderAdd={false}
                    renderDesc={true}
                    flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => {
                        increment(item);
                      }}
                    >
                      <FaArrowUp size={30}/>
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => {
                        decrement(item);
                      }}
                    >
                      <FaArrowDown size={30}/>
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>subtotal({basket?.length}items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small> this orde contain a gift </small>
            </span>
            <Link>Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
