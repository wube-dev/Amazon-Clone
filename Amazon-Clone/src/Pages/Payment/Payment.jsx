import React, { use, useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // const userEmail = user?.email || user?.reloadUserInfo?.email || "Guest";
  // const displayName = user?.displayName || userEmail.split("@")[0];
  console.log(user);
  const totaItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // console.log(user);
  const handleChange = (e) => {
    setCardError(e.error?.message || "");
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || processing) return;
    try {
      setProcessing(true);
      // 1.backend || function contact to client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);

      const clientSecret = response.data?.clientSecret;

      // 2.client side (react side conformation)

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), //this hold each digit of card
        },
      });
      // console.log(paymentIntent);

      //3. after confirmation --->order firestore data save and clear basket

      if (!user) return;

      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

//eempty basket
      dispatch({
        type: "EMPTY_BASKET",
      });
      setProcessing(false);

      if (paymentIntent.status === "succeeded") {
        console.log("payment succeeded");
      }
      navigate("/orders", {
        state: { msg: "you have placed new order successfully" },
      });
    } catch (error) {
      console.error(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout {totaItem} items</div>
      {/* payment method */}
      <section className={classes.Payment}>
        {/* addres */}
        <div>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email?.split("@")[0] || "guest"}</div>
            <div>123 react lame</div>
            <div>chingo</div>
          </div>
        </div>
        <hr />
        {/* produ */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
        </div>
        <div>
          {basket?.map((item) => (
            <ProductCard key={item.id} product={item} flex={true} />
          ))}
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card__container}>
            <div className={classes.Payment__detail}>
              <form onSubmit={handlePayment}>
                {/* error element */}

                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}

                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.Payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total order || <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing || !stripe}>
                    {processing ? (
                      <span className={classes.payloading}>
                        .<ClipLoader color="grey" size={12} />{" "}
                        <p>please wait</p>
                      </span>
                    ) : (
                      "pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
