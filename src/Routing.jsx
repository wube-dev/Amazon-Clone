import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Landing from './Pages/Landing/Landing'
import SignIn from "./Pages/Auth/Signup";
import Payments from "./Pages/Payment/Payment.jsx";
import Orders from "./Pages/Order/Order.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Results from "./Pages/Results/Results.jsx";
import ProductinDtail from './Pages/ProductinDtail/ProductinDtail.jsx'
function Routing() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<SignIn />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductinDtail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
