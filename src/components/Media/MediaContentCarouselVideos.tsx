import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import YouTubeVideo from "./YouTubeVideo";

interface Props {
    dataVideo: {
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
        id: string;
    }[];
}

const MediaContentCarouselVideos = ({ dataVideo }: Props) => {
    const [toggleVideo, setToggleVideo] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<string>("");

    const handleVideoClick = (vidId: string) => {
        setToggleVideo(true);
        setVideoId(vidId);
    };

    return (
        <div className="w-full relative">
            <Swiper
                spaceBetween={10}
                modules={[FreeMode]}
                className=" mt-6 flex"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        freeMode: false,
                    },
                    640: {
                        slidesPerView: 2,
                        freeMode: true,
                    },
                    920: {
                        slidesPerView: 3,
                        freeMode: true,
                    },
                }}
            >
                {dataVideo.map((video) => {
                    return (
                        <li key={video.key} className="relative">
                            <SwiperSlide
                                onClick={() => handleVideoClick(video.key)}
                            >
                                <div className="opacity-60 duration-200 hover:opacity-100 hover:duration-200  cursor-pointer">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                                        alt="Video Thumbnail"
                                        className=""
                                    />
                                    <IoPlayCircleOutline
                                        color="white"
                                        size={90}
                                        className="absolute top-0 left-0 bottom-0 right-0 m-auto cursor-pointer"
                                    />
                                </div>
                            </SwiperSlide>
                        </li>
                    );
                })}
            </Swiper>
            {toggleVideo && (
                <YouTubeVideo
                    setToggleVideo={setToggleVideo}
                    videoId={videoId}
                />
            )}
        </div>
    );
};

export default MediaContentCarouselVideos;
