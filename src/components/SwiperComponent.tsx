import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { ReactNode } from 'react';

export const SwiperComponent=({children}:{children:ReactNode | ReactNode[]}) => {
  return (
    <Swiper
    id='screencontainer'
    style={{width:'100%',backgroundColor:'blue'}}
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >

      {
        Array.isArray(children) ?children.map(item=> <SwiperSlide>{item}</SwiperSlide>) : <SwiperSlide>children</SwiperSlide>
      }
    </Swiper>
  );
};