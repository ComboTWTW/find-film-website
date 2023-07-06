import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFilm, filmDataT } from "../api/getFilm";
import { useQuery } from "react-query";
import MediaHero from "../components/Media/MediaHero";
import MediaDescr from "../components/Media/MediaDescr";
import Cast from "../components/Media/Cast";
import MediaContent from "../components/Media/MediaContent";
import FilmCollection from "../components/Media/FilmCollection";
import Recomendations from "../components/Media/Recomendations";
import SeasonsTV from "../components/Media/SeasonsTV";

const Movie = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const id: string =
        typeof searchParams.get("id") === "string"
            ? `${searchParams.get("id")}`
            : "";
    const media: string = location.pathname.split("/")[1];

    const {
        data: dataFilm,
        refetch: refetchFilm,
        isSuccess: isSuccessFilm,
        isError,
    } = useQuery<filmDataT>(["getFilm", searchParams.get("id")], () =>
        getFilm(`${id}`, `${media}`)
    );

    useEffect(() => {
        refetchFilm();
        id === null && navigate("*");
    }, []);

    useEffect(() => {
        isError && navigate("*");
    }, [isError]);

    return (
        <div className="w-full  flex justify-center text-center">
            {isSuccessFilm && (
                <div className="w-full max-w-[1300px] px-4 flex flex-col  items-center md:justify-center">
                    {/* Hero */}
                    <MediaHero media={media} dataFilm={dataFilm} />
                    {/* Description for sm */}
                    <div className="md:hidden mt-5">
                        <MediaDescr media={media} dataFilm={dataFilm} />
                    </div>

                    <Cast id={dataFilm.id.toString()} media={media} />

                    {media === "tv" && <SeasonsTV id={id} media={media} />}

                    <MediaContent id={dataFilm.id.toString()} media={media} />

                    {dataFilm.belongs_to_collection !== undefined &&
                        dataFilm.belongs_to_collection !== null && (
                            <FilmCollection
                                collectionID={dataFilm.belongs_to_collection.id}
                            />
                        )}

                    <Recomendations id={id} media={media} />
                </div>
            )}
        </div>
    );
};

export default Movie;
