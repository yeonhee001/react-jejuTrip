import React, { useEffect } from 'react'
import { shopNfoodNparty, tour } from '../../api';
import TripSildeItem from './TripSildeItem';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import 'swiper/css/free-mode';

function TripSilde({slidedata=[], detailurl}) {

  return (
    <Swiper className='trip-main-swiper'
    slidesPerView={2.5}
    spaceBetween={10}
    >
      {
        slidedata.map((item)=>
          <SwiperSlide className="trip-main-slideitem" key={item.contentsid}>
            <TripSildeItem 
              img={item.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'} 
              title={item.title} 
              id={item.contentsid}
              detailurl={detailurl}
            />
          </SwiperSlide>
        )
      }
    </Swiper>
  )
}

export default TripSilde