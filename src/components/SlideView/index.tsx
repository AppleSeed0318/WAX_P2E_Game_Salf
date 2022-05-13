import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import "./index.module.css";

export interface Prop {
  items: any,
}

export const SlideView = ({items}:Prop) => {

  const style = {
    display: "flex",
    justifyContent: "center",
  }

  return (
    <>
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        type: "progressbar",
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      navigation={true}
      
    >
      {items.map((data:any) =>(
        <SwiperSlide style = {style} key = "data">{data}</SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};
