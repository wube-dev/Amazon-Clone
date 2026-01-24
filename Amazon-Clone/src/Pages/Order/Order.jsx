import React, { useContext, useEffect, useState } from "react";
import classes from "./Order.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import ProductCard from "../../Components/Products/ProductCard";

function Order() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.uid) {
      setOrders([]);
      return;
    }

    // ✅ Correct Firestore v9
    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    // ✅ Correct onSnapshot
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setOrders(ordersData);
      console.log("Orders:", ordersData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>

          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div>
              {orders.map((eachorder, i) => (
                <div key={i} className={classes.order_item}>
                  <hr />
                  <p>
                    <strong>Order ID:</strong> {eachorder.id}
                  </p>
                  <p>
                    <strong>Total:</strong>{" "}
                    <CurrencyFormat amount={eachorder.data.amount / 100} />
                  </p>
                  <p>
                    {/* <strong>Date:</strong>{" "} */}
                    {/* {new Date(
                      // eachorder.data.created?.seconds * 1000,
                    // ).toLocaleDateString()} */}
                  </p>

                  <div className={classes.products_list}>
                    {eachorder.data.basket?.map((order) => (
                      <ProductCard key={order.id} product={order} flex={true} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
