import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function TripTag({tag}) {
  if (!tag || tag.length === 0) return null;
  return (
    <div className='trip-tag'>
        {
          tag.map((item, i)=>
            <Swiper className='trip-tag-swiper' spaceBetween={10} slidesPerView="auto">
              <SwiperSlide className='trip-tag-slide' key={i}>
                <span>{item}</span>
              </SwiperSlide>
            </Swiper>
          )
        }
    </div>
  )
}

export default TripTag