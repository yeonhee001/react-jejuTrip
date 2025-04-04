// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles


export default () => {
return (
    <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        // loop={true}
        // autoplay={{delay:3000}}
    >
        <SwiperSlide>
            <div className="swiperitem">
                <img className="tripslide" src="/imgs/component_placeitem.jpg.jpg" alt="" />
                <b>성산일출봉</b>
            </div>
        </SwiperSlide>

    </Swiper>
    );
};
