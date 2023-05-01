import { useEffect } from "react"
import { useSearchParams } from 'react-router-dom';
import { getFilm } from "../api/getFilm";
import { useQuery } from "react-query";




const Movie = () => {
    type filmData = {
        adult: boolean;
        backdrop_path: string | null;
        belongs_to_collection: null | object
        budget: number;
        genres: {id: number, name: string}[];
        homepage: string; 
        id: number;
        imdb_id: string | null;
        original_language: string;
        original_title: string;
        overview: string | null;
        popularity: number;
        poster_path: string | null;
        production_companies: {
            name: string;
            id: number;
            logo_path: string | null;
            origin_country: string;
            }[];
        production_countries: {
            iso_3166_1: string;
            name: string;
        }[];
        release_date: string;
        revenue: number;
        runtime: number | null;
        spoken_languages: {
            iso_639_1: string;
            name: string;
        }[];
        status: string;
        tagline: string | null;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }

    const [searchParams] = useSearchParams();
    const { 
        data:dataFilm, 
        refetch:refetchFilm, 
        isSuccess:isSuccessFilm
    } = useQuery<filmData>(['getFilm', searchParams.get('id')], () => getFilm(`${searchParams.get('id')}`, `${location.pathname.split('/')[1]}`));
    
    useEffect(() => {
        refetchFilm();
    }, [])

    useEffect(() => {
        console.log(dataFilm)
    }, [dataFilm])


  return (
    <div className="w-full flex justify-center text-center">
        <div className="w-full max-w-[1300px] px-4 flex justify-center">

            {isSuccessFilm && 
            <div className="relative overflow-hidden min-w-[100vw] flex justify-center">
            <img className="absolute w-full h-auto left-0 right-0" src={`https://image.tmdb.org/t/p/original${dataFilm.backdrop_path}`} alt="" />
            <div className={`min-w-full relative flex py-5 justify-center bg-black bg-opacity-70 md:bg-opacity-90`}>
                <div className="w-[1300px] flex justify-between px-4 ">
                    <img className='max-w-[30%] md:max-w-[30%] h-auto rounded-[10px]' src={`https://image.tmdb.org/t/p/original${dataFilm.poster_path}`} alt="Poster" />
                </div>
            </div>
            </div>
            }

        </div>
    </div>
  )
}

export default Movie