import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
    getRecomendations,
    recommendationsT,
} from "../../api/getRecomendations";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { noImgBackdrop } from "../../assets";

interface Props {
    id: string;
    media: string;
}

const Recomendations = ({ id, media }: Props) => {
    const name = media === "tv" ? "name" : "title";

    const {
        data: dataRecomendations,
        refetch: refetchRecomendations,
        isSuccess: isSuccessRecomendations,
        isError,
        isFetchedAfterMount,
    } = useQuery<recommendationsT>(["getRecomendations", id], () =>
        getRecomendations(`${id}`, `${media}`)
    );

    useEffect(() => {
        refetchRecomendations();
    }, []);

    return (
        <div className="w-full flex flex-col items-start mt-6">
            <h3 className="poppins text-white text-4xl font-semibold md:mt-1">
                Recomendations
            </h3>

            <div className="w-full max-w-full mt-3">
                {!isSuccessRecomendations ? (
                    <CircularProgress size={50} />
                ) : (
                    <Swiper
                        spaceBetween={13}
                        className="w-full"
                        modules={[FreeMode]}
                        freeMode={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            920: {
                                slidesPerView: 4,
                            },
                            1200: {
                                slidesPerView: 5,
                            },
                        }}
                    >
                        {dataRecomendations.results.map((rec) => {
                            return (
                                <SwiperSlide>
                                    <NavLink
                                        to={`/${media}/?id=${rec.id}&name=${rec[
                                            name
                                        ]
                                            .split(" ")
                                            .join("-")
                                            .toLowerCase()}`}
                                        reloadDocument={true}
                                        target="_blank"
                                        key={rec.id + Math.random()}
                                    >
                                        <div className="flex flex-col text-start gap-[5px] ">
                                            <img
                                                src={`${
                                                    rec.backdrop_path !== null
                                                        ? `https://image.tmdb.org/t/p/w500${rec.backdrop_path}`
                                                        : noImgBackdrop
                                                }`}
                                                alt="Backdrop"
                                                className={`rounded-[5px] `}
                                            />

                                            <h3 className="twoLines text-ellipsis overflow-hidden poppins text-white  leading-[1.2rem] font-medium">
                                                {rec[name]}
                                            </h3>
                                        </div>
                                    </NavLink>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default Recomendations;
