import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
    getUpcomingList,
    upcomingListT,
} from "../../../api/getUpcomingTrailers";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../../index.css";
import VideoSlide from "./VideoSlide";
import YouTubeVideo from "../../Media/YouTubeVideo";

const UpcomingTrailers = () => {
    /* API reauest to get a list of upcoming movies */
    const {
        data: dataUpcoming,
        refetch: refetchUpcoming,
        isSuccess: isSuccessUpcoming,
    } = useQuery<upcomingListT>(["getUpcomingList"], () => getUpcomingList());

    useEffect(() => {
        refetchUpcoming();
    }, []);
    /* Navigation for Slider */
    const [showNav, setShowNav] = useState<boolean>(false);
    /* States for Video (YouTubeVideo component should be outside of the Slider or it desn't work) */
    const [toggleVideo, setToggleVideo] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<string>("");

    return (
        <div className="w-full flex flex-col mt-10 ">
            {/* Header */}
            <h2 className="poppins text-white text-3xl lg:text-4xl font-semibold md:mb-1 xl:mb-[6px]">
                Latest Trailers
            </h2>

            {isSuccessUpcoming && (
                <div
                    onMouseEnter={() => setShowNav(true)}
                    onMouseLeave={() => setShowNav(false)}
                >
                    {/* Slider with Thumbnails */}
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
                                slidesPerView: 2,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                            800: {
                                slidesPerView: 3,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                            968: {
                                slidesPerView: 3,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                            1200: {
                                slidesPerView: 3,
                                navigation: {
                                    nextEl: ".image-swiper-button-next",
                                    prevEl: ".image-swiper-button-prev",
                                    enabled: true,
                                },
                            },
                        }}
                    >
                        {dataUpcoming.results.map((film) => {
                            return (
                                /* Thumbnail Slide */
                                <SwiperSlide
                                    key={film.id}
                                    className="h-auto relative"
                                >
                                    <div>
                                        {/* Picture */}
                                        <VideoSlide
                                            id={film.id}
                                            setToggleVideo={setToggleVideo}
                                            setVideoId={setVideoId}
                                            toggleVideo={toggleVideo}
                                            videoId={videoId}
                                        />
                                        {/* Movie Name */}
                                        <h4
                                            title={film.title}
                                            className="twoLines text-ellipsis overflow-hidden  poppins text-white text-2xl font-medium mt-2 leading-tight"
                                        >
                                            {film.title}
                                        </h4>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                        {/* Navigation Arrows */}
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
            {/* Video, that will appear when uses click on thumbnail */}
            {toggleVideo && (
                <YouTubeVideo
                    setToggleVideo={setToggleVideo}
                    videoId={videoId}
                />
            )}
        </div>
    );
};

export default UpcomingTrailers;
