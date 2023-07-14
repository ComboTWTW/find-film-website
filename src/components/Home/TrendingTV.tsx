import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getTrendingTV, trendingTVT } from "../../api/getTrendingTV";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../index.css";
import { NavLink } from "react-router-dom";
import { noImgLong } from "../../assets";

const TrendingTV = () => {
    const {
        data: dataTrendingTV,
        refetch: refetchTrendingTV,
        isSuccess: isSuccessTrendingTV,
    } = useQuery<trendingTVT>(["getTrendingTV"], () => getTrendingTV());

    useEffect(() => {
        refetchTrendingTV();
    }, []);

    const [showNav, setShowNav] = useState<boolean>(false);

    return (
        <div className="w-full flex flex-col mt-3 md:mt-3 ">
            <h2 className="poppins text-white text-3xl lg:text-4xl font-semibold md:mb-1 xl:mb-[6px]">
                Trending TV Shows
            </h2>

            {isSuccessTrendingTV && (
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
                                slidesPerView: 5,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                            1200: {
                                slidesPerView: 6,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                        }}
                    >
                        {dataTrendingTV.results.map((series) => {
                            return (
                                <SwiperSlide
                                    key={series.id}
                                    className="h-auto relative"
                                >
                                    <NavLink
                                        to={`/tv/?id=${
                                            series.id
                                        }&name=${series.name.replace(
                                            / +/g,
                                            "-"
                                        )}`}
                                        reloadDocument={true}
                                        target="_blank"
                                        className="flex flex-col h-full"
                                    >
                                        {/* TV Image */}
                                        <div className="">
                                            <img
                                                src={`${
                                                    series.poster_path === null
                                                        ? noImgLong
                                                        : `https://image.tmdb.org/t/p/w500${series.poster_path}`
                                                }`}
                                                alt="Poster"
                                                className="rounded-t-[5px] "
                                            />
                                        </div>

                                        <div className="flex flex-col bg-darkLighter  rounded-b-[5px]  px-2 py-1  h-full">
                                            {/* TV Name */}
                                            <h4
                                                title={series.name}
                                                className="twoLines text-ellipsis overflow-hidden  poppins text-white text-xl font-medium mt-1 leading-tight"
                                            >
                                                {series.name}
                                            </h4>
                                            {/* Year */}
                                            <h4
                                                className={`poppins text-white text-md `}
                                            >
                                                {series?.first_air_date.slice(
                                                    0,
                                                    4
                                                )}
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

export default TrendingTV;
