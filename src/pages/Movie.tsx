import { useEffect } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFilm } from "../api/getFilm";
import { useQuery } from "react-query";
import { filmDataT } from "../api/getFilm";
import MediaHero from "../components/Media/MediaHero";
import MediaDescr from "../components/Media/MediaDescr";



const Movie = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const media = location.pathname.split('/')[1];
    


    const { 
        data:dataFilm, 
        refetch:refetchFilm, 
        isSuccess:isSuccessFilm,
        isError,
    } = useQuery<filmDataT>(['getFilm', searchParams.get('id')], () => getFilm(`${id}`, `${media}`));
    
    useEffect(() => {
        refetchFilm();
        console.log(id);
        id === null && navigate('*')
    }, [])

    useEffect(() => {
          isError && navigate('*');
      }, [isError]);
    
   

  return (
    <div className="w-full flex justify-center text-center">
        {isSuccessFilm && 
        <div className="w-full max-w-[1300px] px-4 flex flex-col md:flex-row items-center md:justify-center">
                {/* Hero */}
            <MediaHero media={media} dataFilm={dataFilm}/>
                {/* Descr for sm */}
            <div className="md:hidden mt-5"><MediaDescr media={media} dataFilm={dataFilm}/></div>

        </div>}
    </div>
  )
}

export default Movie