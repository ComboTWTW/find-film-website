import { useState, useEffect } from "react";
import { getPeople, peopleT } from "../../api/getPeople";
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

const PopularPeople = () => {
    const {
        data: dataPeople,
        refetch: refetchPeople,
        isSuccess: isSuccessPeople,
        isRefetching,
    } = useQuery<peopleT>(["getPeople"], () => getPeople(1));

    useEffect(() => {
        refetchPeople();
    }, []);

    const [showNav, setShowNav] = useState<boolean>(false);

    return (
        <div className="w-full flex flex-col mt-9 md:mt-10 ">
            <h2 className="poppins text-white text-3xl lg:text-4xl font-semibold  md:mb-1 xl:mb-[6px]">
                People Popular Today
            </h2>

            {isSuccessPeople && (
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
                                slidesPerView: 3,
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
                        {dataPeople.results.map((person) => {
                            return (
                                <SwiperSlide
                                    key={person.id}
                                    className="h-auto relative"
                                >
                                    <NavLink
                                        to={`/person/?id=${person.id}&name=${person.name}`.replace(
                                            /\s+/g,
                                            "-"
                                        )}
                                        reloadDocument={true}
                                        target="_blank"
                                        className="flex flex-col h-full"
                                    >
                                        {/* Photo */}
                                        <div className="relative">
                                            {/* Image */}
                                            <img
                                                src={`${
                                                    person.profile_path === null
                                                        ? noImgLong
                                                        : `https://image.tmdb.org/t/p/w500${person.profile_path}`
                                                }`}
                                                alt="PersonPhoto"
                                                className="rounded-t-[5px] "
                                            />
                                        </div>

                                        <div className="flex flex-col bg-darkLighter  rounded-b-[5px]  px-2 py-1  h-full">
                                            {/* Person's Name */}
                                            <h4
                                                title={person.name}
                                                className="twoLines text-ellipsis overflow-hidden  poppins text-white text-base md:text-lg font-medium mt-1 leading-tight"
                                            >
                                                {person.name}
                                            </h4>
                                        </div>
                                    </NavLink>
                                </SwiperSlide>
                            );
                        })}
                        {/* Navigation */}
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

export default PopularPeople;
