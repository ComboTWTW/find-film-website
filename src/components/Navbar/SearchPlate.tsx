import { useEffect, useState } from "react";
import { noImage } from "../../assets";
import { useQuery } from 'react-query';

interface Props  {
    dataObj: filmT[];
    plateToggle: boolean;
    searchInput: string;
}

type filmT = {
    backdrop_path: string,
    media_type: string,
    poster_path: string,
    release_date: string,
    title: string,
    name: string,
    profile_path: string,
    gender: number,
}

const SearchPlate = ({dataObj, plateToggle, searchInput}:Props) => {

   

    const getImage = (film:filmT):string => {
        if (film.media_type === 'person') {
            if (film.profile_path === null) {
                return noImage
            } else {
                return `https://image.tmdb.org/t/p/w500${film.profile_path}`;
            }
        } else if (film.poster_path === null) {
            return noImage
        } else {
            return `https://image.tmdb.org/t/p/w500${film.poster_path}`
        }
    }

    const getName = (film:filmT):string => {
        if (film.media_type === 'person') {
            if (film.gender === 1) {
                return `${film.name} (Actress)`;
            } else {
                return `${film.name} (Actor)`;
            }
        } else if (film.media_type === 'movie') {
            return film.title;
        } else {
            return film.name;
        }
    }


  return (
    <div  className={`z-30 absolute top-11 borderPlate w-full`}>
        <div className={`bg-darkLighter  md:rounded-[5px]  overflow-hidden`}>

            <ul className={`flex flex-col items-start `}>
                {dataObj.slice(0,3).map((film:filmT) => {
                    return <li className=" flex flex-col w-full">
                        <div className="flex items-center w-full gap-2 hover:bg-bgMain">
                            <img loading="lazy" className="w-[55px] h-auto" src={`${getImage(film)}`} alt="" />
                            <h3 className="overflow-hidden poppins  text-white text-[1.1rem]">{`${getName(film)}`}</h3>
                        </div>
                        <div className="w-full bg-gray-500 h-[1px]"></div>
                        </li>
                        
                })}
                <h3 className={`w-full  text-center overflow-hidden poppins py-1 tracking-wider text-white`}>Show more...</h3>
            </ul>

        </div>
    </div>
  )
}

export default SearchPlate