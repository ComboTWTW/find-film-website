import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { getPeople, peopleT } from "../api/getPeople";
import Pagination from "@mui/material/Pagination";
import "../constants/globalPaginationStyles.css";
import { NavLink } from "react-router-dom";
import { noImgLong } from "../assets";

const People = () => {
    const [page, setPage] = useState<number>(1);

    const {
        data: dataPeople,
        refetch: refetchPeople,
        isSuccess: isSuccessPeople,
        isRefetching,
    } = useQuery<peopleT>(["getPeople"], () => getPeople(page));

    useEffect(() => {
        refetchPeople();
    }, [page]);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
        setPage(value);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[1300px] px-4 w-full flex flex-col">
                {/* Header */}
                <h1 className="first-letter:uppercase capitalize poppins font-semibold text-white text-3xl md:text-4xl mt-5">
                    Popular People
                </h1>

                {isRefetching && <CircularProgress size={25} />}
                {isSuccessPeople && !isRefetching && (
                    /* Content */
                    <div className="w-full mt-5 grid grid-cols-3 profileMd:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 gap-y-6 ">
                        {dataPeople.results.map((person) => {
                            return (
                                <NavLink
                                    to={`/person/?id=${person.id}&name=${person.name}`.replace(
                                        /\s+/g,
                                        "-"
                                    )}
                                    reloadDocument={true}
                                    target="_blank"
                                    className="flex flex-col "
                                >
                                    <div className="relative">
                                        {/* Image */}

                                        <img
                                            src={`${
                                                person.profile_path === null
                                                    ? noImgLong
                                                    : `https://image.tmdb.org/t/p/w500${person.profile_path}`
                                            }`}
                                            alt="PersonPhoto"
                                            className="rounded-[5px] "
                                        />
                                    </div>

                                    <h3 className="poppins mt-2 text-white  md:text-xl font-medium">
                                        {person.name}
                                    </h3>
                                </NavLink>
                            );
                        })}
                    </div>
                )}
                {/* Pagination */}
                {isSuccessPeople && (
                    <div className="w-full flex justify-center mt-7">
                        <Pagination
                            count={
                                dataPeople?.total_pages > 500
                                    ? 500
                                    : dataPeople.total_pages
                            }
                            page={dataPeople.page}
                            shape="rounded"
                            color="primary"
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default People;
