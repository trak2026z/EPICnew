import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const SwiperComponent = ({ data, currentSlideIndex, setCurrentSlideIndex }) => {
  if (!data || data.length === 0) {
    return <p>Brak danych do wyświetlenia.</p>;
  }

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex);
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
      >
        {data.map((item, index) => {
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(' ')[0].replaceAll('-', '/')}/png/${item.image}.png`;
          return (
            <SwiperSlide key={index}>
              <img src={imageUrl} alt={item.caption} style={{ width: '100%' }} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
