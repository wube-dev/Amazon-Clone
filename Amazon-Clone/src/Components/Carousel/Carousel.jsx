import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { img } from "./img/data";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel autoPlay infiniteLoop showIndicators showThumbs={false}>
        {img.map((imgItemLink, index) => (
          <img key={index} src={imgItemLink} alt="" />
        ))}
      </Carousel>
      <div className={ classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
