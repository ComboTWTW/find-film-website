import { NavLink } from "react-router-dom";
import {
    searchBigMovieT,
    searchBigPersonT,
    searchBigTvT,
} from "../../api/searchBig";
import { noImgLong } from "../../assets";
import { searchSetsT } from "../../pages/Search";
import { useEffect, useState } from "react";

interface Props {
    dataSearch: any;
    searchSets: searchSetsT;
}

const Content = ({ dataSearch, searchSets }: Props) => {
    useEffect(() => {
        console.log(searchSets.page);
    }, [searchSets.page]);

    const getImage = (film: any): string => {
        if (searchSets.media === "person") {
            if (film.profile_path === null) {
                return noImgLong;
            } else {
                return `https://image.tmdb.org/t/p/w500${film.profile_path}`;
            }
        }
        if (film.poster_path === null) {
            return noImgLong;
        } else {
            return `https://image.tmdb.org/t/p/w500${film.poster_path}`;
        }
    };

    const getName = (film: any) => {
        if (searchSets.media === "movie") {
            return film.title !== undefined && film.title;
        } else {
            return film.name !== undefined && film.name;
        }
    };

    const getDate = (film: any) => {
        if (searchSets.media === "movie") {
            return (
                film.release_date !== undefined && film.release_date.slice(0, 4)
            );
        } else {
            return (
                film.first_air_date !== undefined &&
                film.first_air_date.slice(0, 4)
            );
        }
    };

    return (
        <ul className="w-full grid grid-cols-2 profileMd:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-6 ">
            {dataSearch?.results.map((film: any) => {
                return (
                    <NavLink
                        key={film.id}
                        reloadDocument={true}
                        to={`/${searchSets.media}/?id=${film.id}&name=${getName(
                            film
                        )}`.replace(/\s+/g, "-")}
                        target="_blank"
                        className="flex flex-col gap-2"
                    >
                        {/* Poster */}
                        <div className="relative">
                            {/* Image */}
                            <div className="pb-[150%]">
                                <img
                                    src={`${getImage(film)}`}
                                    alt="FilmPoster"
                                    className="rounded-[5px] absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        {/* Title or Name */}
                        {
                            <h3
                                title={getName(film)}
                                className="poppins text-white text-lg twoLines leading-tight overflow-hidden"
                            >
                                {getName(film)}
                            </h3>
                        }
                        {/* Release date if Film or TV */}
                        {searchSets.media !== "person" && (
                            <h3 className="poppins -mt-[6px] text-white font-light text-sm leading-snug whitespace-nowrap text-ellipsis overflow-hidden">
                                {getDate(film)}
                            </h3>
                        )}
                    </NavLink>
                );
            })}
        </ul>
    );
};

export default Content;
