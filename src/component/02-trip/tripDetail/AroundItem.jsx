// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const slides = [
  { id: 1, title: "성산일출봉", imgSrc: "/imgs/component_placeitem.jpg.jpg" },

];

export default function SwiperComponent() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change2')}
      onSwiper={(swiper) => console.log(swiper)}
      loop={true}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="swiperaround">
            <img className="triparoundslide" src={slide.imgSrc} alt={slide.title} />
            <b>{slide.title}</b>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
