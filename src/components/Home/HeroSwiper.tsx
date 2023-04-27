import { useEffect, useState } from 'react';
import { getPopular } from '../../api/getPopular' 
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


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
        data, 
        refetch, 
        isSuccess
      } = useQuery(['getPop'], () => getPopular());


    useEffect(() => {
        refetch();
    }, [])
    
    const [ newData, setNewData ] = useState<dataT>();

    useEffect(() => {
        if (data !== undefined) {
            setNewData(data);
        }
    }, [data])
     

      

  return (
    <div className='flex w-full justify-center '>
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          centeredSlides={true}
          

          breakpoints={{}}
          className="min-w-[120vw]"
        >
            {newData?.results.map((film) => (
              <SwiperSlide className={`overflow-hidden flex justify-center`} key={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}>
               {({isPrev, isNext, isActive}) => (
               <div className={`${isNext && 'opacity-50'} ${isPrev && 'opacity-50'} relative rounded-[10px] flex justify-center items-center overflow-hidden w-full `}>
                  <img className='w-full h-auto ' src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} alt="" />
                  <div className="absolute left-0 bottom-0 top-0 bg-black bg-opacity-90 p-4 pr-10 flex flex-col justify-between items-start max-w-[45%] min-w-[45%]">
                    <h1 className=' shrink-1 poppins text-white md:text-lg lg:text-4xl  font-bold'>{film.title}</h1>
                    <div className="flex justify-between w-full mt-3">
                      <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="" className='w-[40%] h-auto rounded-[10px]'/>
                      
                    </div>
                  </div>
                </div>
               )}
              </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default HeroSwiper