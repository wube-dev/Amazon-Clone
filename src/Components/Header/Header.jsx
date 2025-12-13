import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { } from "react-icons/fa";
import { Link } from "react-router-dom";
import clases from "./Header.module.css";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";

const Header = () =>
{
  const [{ basket },state, dispatch] = useContext(DataContext);
  
  return (
    <>
      <section className={clases.fixed}>
        <section>
          <div className={clases.header_container}>
            <div className={clases.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt=""
                />
              </Link>
              <div className={clases.delivary}>
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>delevery to </p>
                  <span>ethiopia</span>
                </div>
              </div>
            </div>

            <div className={clases.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" name="" id="" placeholder="Search product" />
              <FaSearch size={25} />
            </div>
            <div className={clases.order_container}>
              <Link to="" className={clases.language}>
                <img
                  src="https://pngimg.com/uploads/flags/flags_PNG14592.png"
                  alt=""
                />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>
              <Link to="/auth">
                <div>
                  <p> Sign in</p>
                  <span>Account & Lists</span>
                </div>
              </Link>
              <Link to="/orders">
                <p>Returns</p>
                <span>& Orders</span>
              </Link>
              <Link to="/cart" className={clases.cart}>
                <BiCart size={35} />
                <span>{basket.length}</span>
                <CiShoppingCart />
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    </>
  );
};

export default Header;
