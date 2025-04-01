// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default () => {
return (
    <Swiper
        spaceBetween={40}
        slidesPerView={6}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        autoplay={{delay:3000}}
    >
        <SwiperSlide><a className=''>1</a><img src="/imgs/logo_blue.svg" alt="" /></SwiperSlide>
        <SwiperSlide><a className="">2</a>22</SwiperSlide>
        <SwiperSlide><a className="">3</a></SwiperSlide>
        <SwiperSlide><a className=""></a></SwiperSlide>
        <SwiperSlide><a className=""></a></SwiperSlide>
        <SwiperSlide><a className=""></a></SwiperSlide>
        <SwiperSlide><a className=""></a></SwiperSlide>
        <SwiperSlide><a className=""></a></SwiperSlide>
        <SwiperSlide><a className=""></a></SwiperSlide>
        <SwiperSlide><a className=""></a></SwiperSlide>
    </Swiper>
    );
};