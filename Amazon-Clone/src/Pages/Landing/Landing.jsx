import React from 'react'
import LayOut from '../../Components/LayOut/LayOut.jsx';
import CarouselEffect from '../../Components/Carousel/Carousel.jsx';
import Category from '../../Components/Category/Category.jsx';
import Products from "../../Components/Products/Products.jsx";
import Header from '../../Components/Header/Header.jsx'
function Landing() {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <br /> <br /> <br />
      <Products />
    </LayOut>
  );
}

export default Landing
