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
      <div className="max-w-full h-auto  flex justify-center">
        <Swiper
          slidesPerView={3}
          width={2500}
          
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          centeredSlides={true}
          centeredSlidesBounds={true}
          zoom={true}
          breakpoints={{}}
          className=""
        >
            {newData?.results.map((film) => (
              <SwiperSlide className={`overflow-hidden flex justify-center`} key={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}>
                <div className="flex justify-center items-center overflow-hidden w-full md:max-w-[60rem]"><img className=' rounded-[10px] h-auto ' src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} alt="" /></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      
    </div>
  )
}

export default HeroSwiper