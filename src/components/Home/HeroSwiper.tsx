import { useEffect, useState } from 'react';
import { getPopular } from '../../api/getPopular' 
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../index.css";
import SubSlide from './SubSlide';


const HeroSwiper = () => {


    type popularDataT = {
        adult: boolean,
        backdrop_path: string, 
        id: number,
        original_title: string,
        poster_path: string,
        release_date: string,
        title: string,
    }
    
    type dataT = {
        results: popularDataT[];
    }
    

    const { 
        data:dataPopular, 
        refetch:refetchPopular, 
        isSuccess:isSuccessPopular
      } = useQuery(['getPop'], () => getPopular());


    useEffect(() => {
      refetchPopular();
    }, [])
    
    

  return (
    <div className='flex w-full justify-center '>
        <div className="relative w-full flex justify-center">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}

          navigation={{
            enabled: true,
          }}
          centeredSlides={true}
    
          breakpoints={{
            320: {
              slidesPerView: 1,
              pagination: false,
              autoplay: {

                delay: 2500,
                disableOnInteraction: false,
              },
            },
            768: {
              slidesPerView: 2,
              navigation: {
                nextEl: ".image-swiper-button-next",
                prevEl: ".image-swiper-button-prev",
                enabled: true,
              }
          
            },
          }}
          className="md:min-w-[115vw]" 
        >
            {isSuccessPopular && dataPopular?.results.slice(0, 10).map((film:popularDataT) => (
              <SwiperSlide className={` overflow-hidden flex justify-center cursor-pointer relative`} key={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}>
               {({isPrev, isNext, isActive}) => (
               <div className={`${isNext && 'opacity-50'} ${isPrev && 'opacity-50'} relative rounded-[10px] flex justify-center items-center overflow-hidden w-full `}>
                  <img  className='w-full h-auto' src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} alt="" />
                  <div className="absolute left-0 bottom-0 top-0 bg-black bg-opacity-90 p-4 pr-10 flex flex-col justify-between items-start max-w-[45%] min-w-[45%]">
                    <h1 className=' shrink-1 poppins text-white md:text-lg lg:text-4xl lg:leading-normal md:leading-snug font-bold'>{film.title}</h1>
                    <SubSlide posterPath={film.poster_path} id={film.id}/>
                  </div>
                </div>
               )}
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="image-swiper-button-prev hidden md:absolute z-[51] md:flex swiper-button left-5 opacity-50 hover:opacity-100 hover:duration-300 cursor-pointer top-[40%]"><IoIosArrowBack /></div>
        <div className="image-swiper-button-next hidden md:absolute z-[51] md:flex swiper-button right-5 opacity-50 hover:opacity-100 hover:duration-300 cursor-pointer top-[40%]"><IoIosArrowForward /></div>
        </div>
    </div>
  )
}

export default HeroSwiper