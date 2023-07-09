import { useState, useEffect } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { searchSetsT } from "../../pages/Search";

interface Props {
    searchSets: searchSetsT;
    setSearchSets: Function;
}

const MediaType = ({ searchSets, setSearchSets }: Props) => {
    const [toggleFilters, setToggleFilters] = useState<boolean>(true);

    const sets: string[] = ["Movies", "TV Shows", "People"];

    return (
        <div className="flex bg-darkLighter rounded-[5px] flex-col py-4 px-4">
            {/* Header */}
            <div
                onClick={() =>
                    setToggleFilters((toggleFilters) => !toggleFilters)
                }
                className="flex justify-between items-center"
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
            <ul
                className={`flex flex-col ${
                    !toggleFilters && "hidden"
                } mt-3 gap-4`}
            >
                {sets.map((set) => {
                    return (
                        <li key={set} className="poppins text-white ">
                            {set}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MediaType;
