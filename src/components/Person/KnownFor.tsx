import { personCreditsT } from "../../api/getPersonCredits";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { NavLink } from "react-router-dom";
import { noImgLong } from "../../assets";

interface Props {
    dataPersonCredits: personCreditsT;
}

const KnownFor = ({ dataPersonCredits }: Props) => {
    /* const mediaLink = (film:personCreditsT): string => {
        const name = film[0].media_type === "tv" ? "name" : "title";

        return `/${film[0].media_type}/&id=${film[0].id}&name=${name
            .split(" ")
            .join("-")
            .toLowerCase()}}`;
    }; */

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
                {dataPersonCredits.cast.map((film) => {
                    return (
                        <SwiperSlide>
                            <NavLink
                                to={""}
                                reloadDocument={true}
                                target="_blank"
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
                                <h4 className="poppinds text-white text-lg font-semibold mt-1 leading-tight">
                                    {film.media_type === "movie"
                                        ? film.title
                                        : film.name}
                                </h4>
                                <h4
                                    className={`poppinds text-white text-sm mt-1 ${
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
