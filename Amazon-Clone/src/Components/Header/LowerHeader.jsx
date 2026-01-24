import React from "react";
import { BiMenu } from "react-icons/bi";
import clases from "./Header.module.css";
function LowerHeader() {
  return (
    <div className={clases.lower_container}>
      <ul>
        <BiMenu />

        <li>All</li>
        <li> Today's Deals </li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
