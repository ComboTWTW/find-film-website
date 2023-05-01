import { useQuery } from "react-query"
import { getFilm } from "../../api/getFilm";
import { useEffect, useState } from 'react';


interface Props {
    posterPath: string,
    id: number, 
}

const SubSlide = ({ posterPath, id }:Props) => {

    type filmData = {
        genres: {id: number, name:string}[],
        release_date: string,
        runtime: number,
    
    }

    const { 
        data:dataFilm, 
        refetch:refetchFilm, 
        isSuccess:isSuccessFilm
    } = useQuery<filmData>(['getFilm', id], () => getFilm(id, 'movie'));


    useEffect(() => {
        refetchFilm();
    }, [])

 




  return (
    <div className="flex w-full mt-3 gap-4">

        <div className="sm:hidden md:flex justify-center items-center min-w-[40%] max-w-[45%] ">
            <img loading="lazy" key={posterPath} src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="" className='w-full h-auto rounded-[10px]'/>
        </div>

        {isSuccessFilm && <div className="flex flex-col ">
            <p className="poppins text-white text-xs lg:text-base ">{dataFilm.release_date.slice(0, 4)} <span className={`${dataFilm.runtime === 0 && 'hidden'}`}> • {Math.floor(dataFilm.runtime /60)} hr {dataFilm.runtime % 60} min</span></p>
            <p className="poppins text-white text-xs lg:text-base mt-[5px] ">{dataFilm.genres.slice(0, 1).map((genre) => {
                return `${genre.name}`
            })
            }</p>
        </div>}
    
    </div>
  )
}

export default SubSlide