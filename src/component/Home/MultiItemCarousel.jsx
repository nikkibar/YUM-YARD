import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeals } from "./topMeals";
import CarouselItem from "./CarouselItem";

const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default number of slides to show
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [

      {
        breakpoint: 420, // Adjust breakpoint as needed for mobile devices
        settings: {
          slidesToShow: 1, // Set to show only 1 slide on mobile
        },
      },
      {
        breakpoint: 600, // Adjust breakpoint as needed for mobile devices
        settings: {
          slidesToShow: 2, // Set to show only 1 slide on mobile
        },
      },
      {
        breakpoint: 1100, // Adjust breakpoint as needed for mobile devices
        settings: {
          slidesToShow: 3, // Set to show only 1 slide on mobile
        },
      },
      {
        breakpoint: 1320, // Adjust breakpoint as needed for mobile devices
        settings: {
          slidesToShow: 4, // Set to show only 1 slide on mobile
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {topMeals.map((item) => (
          <CarouselItem key={item.id} image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
