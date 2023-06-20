import { personCreditsT } from "../../api/getPersonCredits";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { NavLink } from "react-router-dom";
import { noImgLong } from "../../assets";

interface Props {
    dataPersonCredits: personCreditsT;
}

const KnownFor = ({ dataPersonCredits }: Props) => {
    const [sortedCast, setSortedCast] = useState<personCreditsT["cast"]>(
        dataPersonCredits.cast
            .sort((a, b) => {
                return b.popularity - a.popularity;
            })
            .reduce((uniqueArray: personCreditsT["cast"], obj) => {
                // Check if the ID already exists in the uniqueArray
                const isDuplicate = uniqueArray.some(
                    (item) => item.id === obj.id
                );

                // If it's a new ID, add it to the uniqueArray
                !isDuplicate && uniqueArray.push(obj);

                return uniqueArray;
            }, [])
    );

    console.log(sortedCast);

    return (
        <div className="flex flex-col w-full mt-8 ">
            <h2 className="poppins text-xl font-semibold text-white ">
                Known for
            </h2>

            <Swiper
                spaceBetween={13}
                modules={[FreeMode]}
                freeMode={true}
                className="w-full mt-3 "
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                    },
                    500: {
                        slidesPerView: 3,
                    },
                    968: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                }}
            >
                {sortedCast.map((film) => {
                    return (
                        <SwiperSlide>
                            <NavLink
                                to={`/${film.media_type}/?id=${film.id}&name=${
                                    film.media_type === "tv"
                                        ? film["name"].replace(/ +/g, "-")
                                        : film["title"].replace(/ +/g, "-")
                                }`}
                                reloadDocument={true}
                                target="_blank"
                                key={film.id}
                                className=" rounded-[5px] h-auto"
                            >
                                <div className="relative w-auto h-[250px] md:h-[250px] lg:h-[260px] ">
                                    <img
                                        className="absolute object-cover object-top inset-0 w-full h-full rounded-[5px]"
                                        src={`${
                                            film.poster_path !== null
                                                ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                                                : noImgLong
                                        }`}
                                        alt="Poster"
                                    />
                                </div>
                                <h4
                                    title={
                                        film.media_type === "movie"
                                            ? film.title
                                            : film.name
                                    }
                                    className="twoLines text-ellipsis overflow-hidden  poppins text-white text-lg font-medium mt-1 leading-tight"
                                >
                                    {film.media_type === "movie"
                                        ? film.title
                                        : film.name}
                                </h4>
                                <h4
                                    className={`poppins text-white text-sm mt-1 ${
                                        film.character === "" && "hidden"
                                    }`}
                                >
                                    As {film.character.split(" /")[0]}
                                </h4>
                            </NavLink>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default KnownFor;
