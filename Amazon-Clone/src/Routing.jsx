import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/auth/Auth.jsx";
import Payment from "./Pages/Payment/Payment.jsx";
import Orders from "./Pages/Order/Order.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Results from "./Pages/Results/Results.jsx";
import ProductinDtail from "./Pages/ProductinDtail/ProductinDtail.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";



const stripePromise = loadStripe(
  "pk_test_51SegQ412bxdIJWjEJEdRmzBBCzrKMJSZZaYzdyWgrSxeWHIvHmItN3HLH7nk48dzF1lXafDHIR9bOQ1kh6t3dJS800rmNivTWo"
);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payments"
            element={
              <ProtectedRoute
                msg={"you need to login to proceed to payment"}
                redirect={"/payments"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you must  login to access your orders"}
                redirect={"/orders"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductinDtail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
