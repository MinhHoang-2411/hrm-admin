import React from 'react';
import Slider from 'react-slick';
import {Box} from '@mui/material';

export default function SliderList({data = [], content = null}) {
  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    variableWidth: true,
    draggable: true,
  };
  return (
    <Slider {...settings}>
      {data?.length > 0 &&
        data?.map((item, index) => {
          return <Box key={index}>{content(item)}</Box>;
        })}
    </Slider>
  );
}
