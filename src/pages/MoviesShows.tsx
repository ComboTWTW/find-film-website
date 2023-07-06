import { CircularProgress } from "@mui/material";
import Filters from "../components/MoviesShows/Filters";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getFiltered, filteredDataT } from "../api/getFilters";
import FilteredContent from "../components/MoviesShows/FilteredContent";
import Pagination from "@mui/material/Pagination";
import "../constants/globalPaginationStyles.css";
export type filterSetsT = {
    sortBy: string;
    page: string;
    withoutGenres?: string;
    voteCount?: string;
};

const MoviesShows = () => {
    /* Default Sets for TopRated Page */
    const defaultTopRated = {
        page: "&page=1",
        withoutGenres: "&without_genres=99,10755",
        sortBy: "&sort_by=vote_average.desc",
        voteCount: "&vote_count.gte=200",
    };
    /* Default Sets for Popular Page */
    const defaultPopular = {
        page: "&page=1",
        sortBy: "&sort_by=popularity.desc",
    };
    /* Setting FilterSets based on url */
    const [filterSets, setFilterSets] = useState<filterSetsT>(
        location.pathname.split("/")[2] === "top-rated"
            ? defaultTopRated
            : defaultPopular
    );
    /* New State for preventing auto refetching after main sets state was changed */
    const [newFilterSets, setNewFilterSets] = useState<filterSetsT>(filterSets);
    /* API */
    const {
        data: dataFiltered,
        refetch: refetchFiltered,
        isSuccess: isSuccessFiltered,
    } = useQuery<filteredDataT>(
        ["getFiltered", location.pathname.split("/")[1], filterSets],
        () => getFiltered(location.pathname.split("/")[1], filterSets),
        { enabled: false }
    );
    /* UseEffects for Refetching */
    useEffect(() => {
        refetchFiltered();
    }, []);

    useEffect(() => {
        refetchFiltered();
    }, [filterSets]);

    /* Pagination Logic */
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
        setFilterSets({ ...filterSets, page: `&page=${value}` });
    };

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[1300px] px-4 w-full flex flex-col ">
                {/* Header */}
                <h1 className="first-letter:uppercase capitalize poppins font-semibold text-white text-3xl md:text-4xl mt-5">
                    {location.pathname.split("/")[2].replace("-", " ")}{" "}
                    {location.pathname.split("/")[1].replace("-", " ") === "tv"
                        ? "TV Shows"
                        : "Movies"}
                </h1>

                <div className="flex flex-col md:flex-row mt-7 gap-5 md:gap-6">
                    {/* Left Block with Filters */}
                    <div className=" md:max-w-[280px] md:min-w-[280px] h-fit">
                        <Filters
                            filterSets={newFilterSets}
                            setFilterSets={setNewFilterSets}
                        />
                        {/* Search Button */}
                        <button
                            onClick={() => {
                                setFilterSets(newFilterSets);
                                window.scrollTo({
                                    top: 0,
                                    behavior: "instant",
                                });
                            }}
                            className="mt-3 py-2 w-full poppins text-white border-[1px] border-solid border-white rounded-full "
                        >
                            Search
                        </button>
                    </div>
                    {/* End of the Left Block */}

                    {/* Right Block with Main Content and Pagination */}
                    <div className="w-full  md:mt-0 flex flex-col">
                        {!isSuccessFiltered ? (
                            /* Spinner for Loading */
                            <CircularProgress size={25} />
                        ) : (
                            <div>
                                {/* Main Contnet Component */}
                                <FilteredContent filteredData={dataFiltered} />
                                {/* Pagination */}
                                <div className="w-full flex justify-center mt-3">
                                    <Pagination
                                        count={
                                            dataFiltered.total_pages > 500
                                                ? 500
                                                : dataFiltered.total_pages
                                        }
                                        page={dataFiltered.page}
                                        shape="rounded"
                                        color="primary"
                                        onChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* End of the Right Block */}
                </div>
            </div>
        </div>
    );
};

export default MoviesShows;
