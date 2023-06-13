import { getCollection, collectionT } from "../../api/getCollection";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

interface Props {
    collectionID: number;
}

const FilmCollection = ({ collectionID }: Props) => {
    const {
        data: dataCollection,
        refetch: refetchCollection,
        isSuccess: isSuccessCollection,
        isError,
    } = useQuery<collectionT>([collectionID], () =>
        getCollection(collectionID.toString())
    );

    useEffect(() => {
        refetchCollection();
    }, []);

    return (
        <div className="w-full text-start mt-8 ">
            {!isSuccessCollection ? (
                <CircularProgress size={50} />
            ) : (
                <div
                    className={`relative w-full rounded-[5px] px-5 py-10`}
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${dataCollection.backdrop_path})`,
                        backgroundSize: "cover",
                    }}
                >
                    <div className="rounded-[5px] absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"></div>
                    <div className="relative flex flex-col md:items-start">
                        <h2 className=" poppins text-white text-2xl md:text-4xl font-semibold">
                            Belongs to {dataCollection.name}
                        </h2>

                        <h3 className=" poppins text-white text-xl md:text-2xl font-normal mt-1">
                            Includes{" "}
                            {dataCollection.parts.map((part) => {
                                return (
                                    <span className="font-semibold">
                                        {part.title}{" "}
                                        {part !==
                                            dataCollection.parts[
                                                dataCollection.parts.length - 1
                                            ] && (
                                            <span className="font-normal">
                                                and
                                            </span>
                                        )}{" "}
                                    </span>
                                );
                            })}
                        </h3>

                        <div className="flex max-w-full mt-2">
                            <Swiper
                                className="flex max-w-full"
                                spaceBetween={10}
                                slidesPerView={5}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 2,
                                    },
                                    640: {
                                        slidesPerView:
                                            dataCollection.parts.length,
                                        allowTouchMove: false,
                                    },
                                }}
                            >
                                {dataCollection.parts.map((part) => {
                                    return (
                                        <SwiperSlide className="md:max-w-[180px] ">
                                            <NavLink
                                                key={part.id + Math.random()}
                                                reloadDocument={true}
                                                to={`/movie/?id=${
                                                    part.id
                                                }&name=${part.title
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}`}
                                                target="_blank"
                                            >
                                                <img
                                                    src={`https://image.tmdb.org/t/p/original${part.poster_path}`}
                                                    alt="Poster"
                                                    className="md:max-w-[180px] w-full mt-2 rounded-[5px]"
                                                />
                                            </NavLink>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilmCollection;
