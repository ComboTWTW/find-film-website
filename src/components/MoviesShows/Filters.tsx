import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useState, useEffect } from "react";
import SortBy from "./SortBy";
import { useQuery } from "react-query";
import { getFiltered, filteredDataT } from "../../api/getFilters";
import { filterSetsT } from "../../pages/MoviesShows";

interface Props {
    filterSets: filterSetsT;
    setFilterSets: Function;
}

const Filters = ({ filterSets, setFilterSets }: Props) => {
    const [toggleFilters, setToggleFilters] = useState<boolean>(true);

    return (
        <div className="flex flex-col py-4 px-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="poppins text-white text-3xl md:text-3xl font-medium">
                    Filters
                </h2>

                <button
                    onClick={() =>
                        setToggleFilters((toggleFilters) => !toggleFilters)
                    }
                >
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
                } mt-3 gap-3`}
            >
                <SortBy setFilterSets={setFilterSets} filterSets={filterSets} />
            </div>
        </div>
    );
};

export default Filters;
