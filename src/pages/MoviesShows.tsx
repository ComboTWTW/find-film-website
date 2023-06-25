import { CircularProgress } from "@mui/material";
import Filters from "../components/MoviesShows/Filters";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getFiltered, filteredDataT } from "../api/getFilters";
import FilteredContent from "../components/MoviesShows/FilteredContent";

export type filterSetsT = {
    sortBy: string;
    page: string;
    withoutGenres?: string;
    voteCount?: string;
};

const MoviesShows = () => {
    const defaultTopRated = {
        page: "&page=1",
        withoutGenres: "&without_genres=99,10755",
        sortBy: "&sort_by=vote_average.desc",
        voteCount: "&vote_count.gte=200",
    };

    const defaultPopular = {
        page: "&page=1",
        sortBy: "&sort_by=popularity.desc",
    };

    const [filterSets, setFilterSets] = useState<filterSetsT>(
        location.pathname.split("/")[2] === "top-rated"
            ? defaultTopRated
            : defaultPopular
    );

    const [newFilterSets, setNewFilterSets] = useState<filterSetsT>(filterSets);

    const {
        data: dataFiltered,
        refetch: refetchFiltered,
        isSuccess: isSuccessFiltered,
    } = useQuery<filteredDataT>(
        ["getFiltered", location.pathname.split("/")[1], filterSets],
        () => getFiltered(location.pathname.split("/")[1], filterSets),
        { enabled: false }
    );

    useEffect(() => {
        refetchFiltered();
    }, []);

    useEffect(() => {
        refetchFiltered();
    }, [filterSets]);

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[1300px] px-4 w-full flex flex-col ">
                <h1 className="first-letter:uppercase capitalize poppins font-semibold text-white text-3xl md:text-4xl mt-5">
                    {location.pathname.split("/")[2].replace("-", " ")}{" "}
                    {location.pathname.split("/")[1].replace("-", " ") === "tv"
                        ? "TV Shows"
                        : "Movies"}
                </h1>

                <div className="flex flex-col md:flex-row mt-7 gap-5 md:gap-6">
                    <div className=" md:max-w-[280px] md:min-w-[280px] h-fit">
                        <Filters
                            filterSets={newFilterSets}
                            setFilterSets={setNewFilterSets}
                        />

                        <button
                            onClick={() => {
                                setFilterSets(newFilterSets);
                            }}
                            className="mt-3 py-2 w-full poppins text-white border-[1px] border-solid border-white rounded-full "
                        >
                            Search
                        </button>
                    </div>

                    <div className="w-full  md:mt-0 flex flex-col">
                        {!isSuccessFiltered ? (
                            <CircularProgress size={25} />
                        ) : (
                            <FilteredContent filteredData={dataFiltered} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesShows;
