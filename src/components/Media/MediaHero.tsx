import { filmDataT } from "../../api/getFilm";
import { runtimeCalc } from "../../functions/runtimeCalc";
import MediaDescr from "./MediaDescr";

interface Props {
    media: string;
    dataFilm: filmDataT;
}

const MediaHero = ({ media, dataFilm }: Props) => {
    return (
        <div className=" relative overflow-hidden min-w-[100vw] flex justify-center text-start  ">
            <img
                className="absolute w-full h-auto left-0 right-0 "
                src={`${
                    dataFilm.backdrop_path !== null
                        ? `https://image.tmdb.org/t/p/original${dataFilm.backdrop_path}`
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/240px-Solid_black.svg.png"
                }`}
                alt="Backdrop"
            />
            <div
                className={`min-w-full relative flex py-5 justify-center md:bg-black bg-opacity-80 md:bg-opacity-95`}
            >
                <div className="max-w-[1300px] flex gap-5 md:gap-10 px-4 ">
                    {/* Poster */}
                    <img
                        className="max-w-[30%] md:max-w-[25%] h-fit rounded-[10px]"
                        src={`${
                            dataFilm.poster_path !== null
                                ? `https://image.tmdb.org/t/p/original${dataFilm.poster_path}`
                                : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                        }`}
                        alt="Poster"
                    />
                    {/* Description */}
                    <div className="hidden md:block">
                        <MediaDescr media={media} dataFilm={dataFilm} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaHero;
