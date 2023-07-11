import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
    searchBig,
    searchBigMovieT,
    searchBigPersonT,
    searchBigTvT,
} from "../api/searchBig";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "../constants/globalPaginationStyles.css";
import MediaType from "../components/SearchBig/MediaType";
import Content from "../components/SearchBig/Content";

export type searchSetsT = {
    media: string;
    query: string;
    page: number;
};

const Search = () => {
    const [searchParams] = useSearchParams();

    const [searchSets, setSearchSets] = useState<searchSetsT>({
        media: "movie",
        query: `${searchParams.get("query")}`,
        page: 1,
    });

    const {
        data: dataSearch,
        refetch: refetchSearch,
        isRefetching,
        isSuccess: isSuccessSearch,
        isFetched,
    } = useQuery<searchBigMovieT | searchBigPersonT | searchBigTvT>(
        ["getSeacrhBig"],
        () => searchBig(searchSets.query, searchSets.media, searchSets.page)
    );

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
        setSearchSets({ ...searchSets, page: value });
    };

    useEffect(() => {
        setSearchSets({ ...searchSets, page: 1 });
        searchSets.page === 1 && refetchSearch();
    }, [searchSets.media]);

    useEffect(() => {
        refetchSearch();
    }, [searchSets.page]);

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[1300px] px-4 w-full flex flex-col ">
                <div className="flex flex-col md:flex-row mt-7 gap-5 md:gap-6">
                    {/* Left Block  */}
                    <div className=" md:max-w-[280px] md:min-w-[280px] h-fit">
                        {/* Content Type Changing */}

                        <MediaType
                            searchSets={searchSets}
                            setSearchSets={setSearchSets}
                        />
                    </div>
                    {/* End of the Left Block */}

                    {/* Right Block with Main Content and Pagination */}
                    <div className="w-full  md:mt-0 flex flex-col">
                        {isRefetching && (
                            /* Spinner for Loading */
                            <CircularProgress size={25} />
                        )}{" "}
                        {isSuccessSearch && !isRefetching && (
                            <div>
                                {/* Main Contnet Component */}
                                {isFetched && (
                                    <Content
                                        dataSearch={dataSearch}
                                        searchSets={searchSets}
                                    />
                                )}
                                {/* Pagination */}
                                <div className="w-full flex justify-center mt-3">
                                    <Pagination
                                        count={
                                            dataSearch.total_pages > 500
                                                ? 500
                                                : dataSearch.total_pages
                                        }
                                        page={dataSearch.page}
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

export default Search;
