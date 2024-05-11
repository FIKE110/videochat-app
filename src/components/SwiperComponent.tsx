// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { Scrollbar, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

export default function SwiperComponent ({children}:{children:React.ReactNode[]}) {
  return (
    <Swiper
        direction={'vertical'}
        slidesPerView='auto'
        initialSlide={children.length}
        scrollbar={true}
        mousewheel={true}
        style={{maxHeight:'350px',display:'flex',flexDirection:'column',paddingRight:'5px'}}
        modules={[Scrollbar, Mousewheel]}
        className="mySwiper"
      >
        {
          children && children.map((message,item)=>(
            <SwiperSlide key={item}>
              {message}
            </SwiperSlide>
          ))
        }
      </Swiper>
  );
};