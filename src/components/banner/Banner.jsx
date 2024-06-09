
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import pic1 from '../../assets/property1.jpg'
import pic2 from '../../assets/property2.jpg'
import pic3 from '../../assets/property3.jpg'
import pic4 from '../../assets/property4.jpg'
import pic5 from '../../assets/property5.jpg'



// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <Swiper
        spaceBetween={50}
        effect={'fade'}
        loop={true}
        navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        
        modules={[Autoplay,EffectFade, Navigation, Pagination]}
        // className="mySwiper"
      >
        <SwiperSlide>
          <img src={pic1} className='w-full h-[300px] lg:h-[700px] object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={pic2} className='w-full h-[300px] lg:h-[700px] object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={pic3} className='w-full h-[300px]  lg:h-[700px] object-cover' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={pic4} className='w-full h-[300px] lg:h-[700px] object-cover ' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={pic5} className='w-full h-[300px] lg:h-[700px] object-cover ' />
        </SwiperSlide>
      </Swiper>
    );
};

export default Banner;