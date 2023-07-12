import { useState, useEffect } from "react";
import { getTrending, trendingT } from "../../api/getTrending";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../index.css";
import { NavLink } from "react-router-dom";
import { noImgLong } from "../../assets";

const WhatPopular = () => {
    const {
        data: dataTrending,
        refetch: refetchTrending,
        isSuccess: isSuccessTrending,
    } = useQuery<trendingT>(["getTrending"], () => getTrending());

    useEffect(() => {
        refetchTrending();
    }, []);

    const [showNav, setShowNav] = useState<boolean>(false);

    return (
        <div className="w-full flex flex-col mt-6 ">
            <h2 className="poppins text-white text-3xl lg:text-4xl font-semibold">
                What's Popular
            </h2>

            {isSuccessTrending && (
                <div
                    onMouseEnter={() => setShowNav(true)}
                    onMouseLeave={() => setShowNav(false)}
                >
                    <Swiper
                        spaceBetween={13}
                        modules={[FreeMode, Navigation]}
                        freeMode={true}
                        className="w-full mt-3 relative"
                        navigation={{
                            enabled: true,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                            },
                            500: {
                                slidesPerView: 3,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                            800: {
                                slidesPerView: 5,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                            968: {
                                slidesPerView: 6,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                            1200: {
                                slidesPerView: 7,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                        }}
                    >
                        {dataTrending.results.map((film) => {
                            return (
                                <SwiperSlide
                                    key={film.id}
                                    className="h-auto relative"
                                >
                                    <NavLink
                                        to={`/movie/?id=${
                                            film.id
                                        }&name=${film.title.replace(
                                            / +/g,
                                            "-"
                                        )}`}
                                        reloadDocument={true}
                                        target="_blank"
                                        className="flex flex-col h-full"
                                    >
                                        {/* Movie Image */}
                                        <div className="">
                                            <img
                                                src={`${
                                                    film.poster_path === null
                                                        ? noImgLong
                                                        : `https://image.tmdb.org/t/p/w500${film.poster_path}`
                                                }`}
                                                alt="Poster"
                                                className="rounded-t-[5px] "
                                            />
                                        </div>

                                        <div className="flex flex-col bg-darkLighter  rounded-b-[5px]  px-2 py-1  h-full">
                                            {/* Movie Name */}
                                            <h4
                                                title={film.title}
                                                className="twoLines text-ellipsis overflow-hidden  poppins text-white text-md font-medium mt-1 leading-tight"
                                            >
                                                {film.title}
                                            </h4>
                                            {/* Year */}
                                            <h4
                                                className={`poppins text-white text-sm `}
                                            >
                                                {film.release_date.slice(0, 4)}
                                            </h4>
                                        </div>
                                    </NavLink>
                                </SwiperSlide>
                            );
                        })}
                        <div
                            className={`${
                                showNav && "opacity-100 duration-200"
                            } image-swiper-button-prev hidden absolute z-[51] md:flex swiper-button -left-3 ${
                                !showNav && "opacity-0 "
                            } duration-200 cursor-pointer top-[40%]`}
                        >
                            <IoIosArrowBack />
                        </div>
                        <div
                            className={`${
                                showNav && "opacity-100 duration-200"
                            } image-swiper-button-next hidden absolute z-[51] md:flex swiper-button -right-3 ${
                                !showNav && "opacity-0 "
                            } duration-200 cursor-pointer top-[40%]`}
                        >
                            <IoIosArrowForward />
                        </div>
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default WhatPopular;
