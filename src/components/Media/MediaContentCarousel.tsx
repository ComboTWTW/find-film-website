import { Swiper, SwiperSlide } from "swiper/react";
import { mediaImagesT } from "../../api/getMediaImages";
import { useEffect, useState } from "react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

interface Props {
    dataImages: {
        aspect_ratio: number;
        height: number;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }[];
    currentMedia: string;
}

const MediaContentCarousel = ({ dataImages, currentMedia }: Props) => {
    return (
        <div className="w-full">
            <Swiper
                spaceBetween={10}
                modules={[FreeMode]}
                className=" mt-6 flex"
                breakpoints={{
                    320: {
                        slidesPerView: currentMedia === "Posters" ? 2 : 1,
                        freeMode: false,
                    },
                    640: {
                        slidesPerView: currentMedia === "Posters" ? 4 : 2,
                        freeMode: true,
                    },
                    920: {
                        slidesPerView: currentMedia === "Posters" ? 7 : 3,
                        freeMode: true,
                    },
                }}
            >
                {dataImages.map((backdrop) => {
                    return (
                        <li>
                            <SwiperSlide>
                                <a
                                    target="_blank"
                                    href={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
                                >
                                    <img
                                        key={Math.random()}
                                        className="rounded-[5px] min-w-full"
                                        src={`https://image.tmdb.org/t/p/${
                                            currentMedia === "Posters"
                                                ? "w500"
                                                : "original"
                                        }${backdrop.file_path}`}
                                        alt="Backdrop"
                                    />
                                </a>
                            </SwiperSlide>
                        </li>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default MediaContentCarousel;
