import { useState, useEffect } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { searchSetsT } from "../../pages/Search";
import {
    searchBigMovieT,
    searchBigPersonT,
    searchBigTvT,
} from "../../api/searchBig";

interface Props {
    searchSets: searchSetsT;
    setSearchSets: Function;
    dataSearch: searchBigMovieT | searchBigPersonT | searchBigTvT;
}

const MediaType = ({ searchSets, setSearchSets, dataSearch }: Props) => {
    const [toggleFilters, setToggleFilters] = useState<boolean>(true);

    type setsT = { name: string; value: string };

    const sets: setsT[] = [
        { name: "Movies", value: "movie" },
        { name: "TV Shows", value: "tv" },
        { name: "People", value: "person" },
    ];

    const handleColor = (e: React.MouseEvent<HTMLButtonElement>): boolean => {
        console.log(e.currentTarget.value === searchSets.media ? true : false);
        return e.currentTarget.value === searchSets.media ? true : false;
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSearchSets({ ...searchSets, media: e.currentTarget.value });
        console.log(e.currentTarget.value + " " + searchSets.media);
    };

    return (
        <div className="flex bg-darkLighter rounded-[5px] flex-col py-4 ">
            {/* Header */}
            <div
                onClick={() =>
                    setToggleFilters((toggleFilters) => !toggleFilters)
                }
                className="flex justify-between items-center px-4"
            >
                <h2 className="poppins text-white text-3xl md:text-3xl font-medium">
                    Results Type
                </h2>

                <button>
                    {toggleFilters ? (
                        <IoChevronUp color="white" size={30} />
                    ) : (
                        <IoChevronDown color="white" size={30} />
                    )}
                </button>
            </div>
            {/* Filters*/}
            <ul className={`flex flex-col ${!toggleFilters && "hidden"} mt-5 `}>
                {sets.map((set: setsT) => {
                    return (
                        <button
                            onClick={(e) => handleClick(e)}
                            type="button"
                            value={set.value}
                            key={set.value}
                            className={`poppins text-white text-xl w-full ${(
                                event: React.MouseEvent<HTMLButtonElement>
                            ) =>
                                handleColor(event) &&
                                "bg-white bg-opacity-30"} py-4 flex items-center justify-center`}
                        >
                            {set.name}
                        </button>
                    );
                })}
            </ul>
        </div>
    );
};

export default MediaType;
