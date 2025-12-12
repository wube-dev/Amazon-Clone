// LayOut.jsx - THIS MUST RENDER HEADER
import React from "react";
import Header from "../Header/Header"; // ← Make sure this import exists

function LayOut({ children }) {
  return (
    <div>
      <Header /> {/* ← This line must exist! */}
      <main>{children}</main>
    </div>
  );
}

export default LayOut;
