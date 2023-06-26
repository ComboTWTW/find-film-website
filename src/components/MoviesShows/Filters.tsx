import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useState, useEffect } from "react";
import SortBy from "./SortBy";
import { useQuery } from "react-query";
import { getFiltered, filteredDataT } from "../../api/getFilters";
import { filterSetsT } from "../../pages/MoviesShows";
import Genres from "./Genres";
import DateFilter from "./DateFilter";

interface Props {
    filterSets: filterSetsT;
    setFilterSets: Function;
}

const Filters = ({ filterSets, setFilterSets }: Props) => {
    const [toggleFilters, setToggleFilters] = useState<boolean>(true);

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
                    Filters
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
            <div
                className={`flex flex-col ${
                    !toggleFilters && "hidden"
                } mt-3 gap-4`}
            >
                <SortBy setFilterSets={setFilterSets} filterSets={filterSets} />
                <Genres setFilterSets={setFilterSets} filterSets={filterSets} />
                <DateFilter
                    setFilterSets={setFilterSets}
                    filterSets={filterSets}
                />
            </div>
        </div>
    );
};

export default Filters;
