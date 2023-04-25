import { useEffect, useState } from "react";
import { noImage } from "../../assets";
import { imgArray } from '../../functions/cacheImages';


interface Props  {
    dataObj: filmT[];
    isRefetching: boolean;
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

const SearchPlate = ({ dataObj, isRefetching }:Props) => {

    const [ isLoading, setIsLoading] = useState<boolean>(true);
    let newDO = [...dataObj];

    const cacheImages = async (imgArr:string[]) => {
        const promises = await imgArr.map((src) => {
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    const img = new Image();

                    img.src = src;
                    img.onload = () => resolve();
                    img.onerror = () => reject();
                }, 1000);
            })
        })

        await Promise.all(promises);

        setIsLoading(false);
    }

    useEffect(() => {
        
        setIsLoading(true)
        const imgs = imgArray(dataObj);

        cacheImages(imgs)
    }, [dataObj])

   
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
    <div  className={`z-30 absolute bg-darkLighter top-11 borderPlate w-full `}>
        <div className={`bg-darkLighter  md:rounded-[5px]  ${!isLoading ? 'hidden' : 'block'} ${isRefetching && 'block'}`}>
             <ul className={`flex flex-col items-start`}>
                {newDO.slice(0,3).map((film:filmT) => {
                    return <li className=" flex flex-col w-full">
                        <div className="flex  items-center w-full gap-2 hover:bg-bgMain">
                            <img className="w-[55px] h-auto"  src={`${getImage(film)}`} alt="" />
                            <h3 className=" poppins  text-white text-[1.1rem] pr-1">{`${getName(film)}`}</h3>
                        </div>
                        <div className="w-full bg-gray-500 h-[1px]"></div>
                        </li>
                        
                })}
                <h3 className={`w-full  text-center  poppins py-1 tracking-wider text-white`}>Show more...</h3>
            </ul>
        </div>
        <div className={`bg-darkLighter  md:rounded-[5px] ${isLoading ? 'hidden' : 'block'} ${isRefetching && 'hidden'}`}>
             <ul className={`flex flex-col items-start`}>
                {dataObj.slice(0,3).map((film:filmT) => {
                    return <li className=" flex flex-col w-full">
                        <div className="flex  items-center w-full gap-2 hover:bg-bgMain">
                            <img className="w-[55px] h-auto"  src={`${getImage(film)}`} alt="" />
                            <h3 className=" poppins  text-white text-[1.1rem] pr-1">{`${getName(film)}`}</h3>
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