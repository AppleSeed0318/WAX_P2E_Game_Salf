import { useEffect, useState } from "react";

import { FormLabel, Box, Grid, backdropClasses } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import "./index.module.css";

export interface Prop {
  onStake: any,
  items: any,
  ids: any,
}

export const StakePanel = ({onStake, items, ids}:Prop) => {

  const style = {
    display: "flex",
    justifyContent: "center",
  }

  const grid_style = {marginBottom:"50px", marginRight:"4px", marginLeft:"4px"};

  return (
  <Box>
    <Grid container spacing={0} >
      {items.map((data:any, index:any) =>(
        <Grid key = {data+index} xl={2.4} md={4} sm={6} xs={12} style={grid_style}>
          <button onClick = {()=>onStake(ids[index])}>{data}</button>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
};
