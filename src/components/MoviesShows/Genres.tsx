import { filterSetsT } from "../../pages/MoviesShows";
import { useQuery } from "react-query";
import { getGenresList, genresListT } from "../../api/getGenresList";
import { useEffect, useState } from "react";

interface Props {
    setFilterSets: Function;
    filterSets: filterSetsT;
}

const Genres = ({ setFilterSets, filterSets }: Props) => {
    const [focusedGenres, setFocusedGenres] = useState<number[]>([]);

    const {
        data: dataGenres,
        refetch: refetchGenres,
        isSuccess: isSuccessGenres,
    } = useQuery<genresListT>(
        ["getGenres", location.pathname.split("/")[1]],
        () => getGenresList(location.pathname.split("/")[1])
    );

    useEffect(() => {
        refetchGenres();
    }, []);

    useEffect(() => {
        setFilterSets({
            ...filterSets,
            genres: `&with_genres=${focusedGenres.join(",")}`,
        });
    }, [focusedGenres]);

    const handleGenreChange = (id: number) => {
        /* Handle focused genres */
        if (focusedGenres.includes(id)) {
            const filteredArray = focusedGenres.filter(
                (element) => element !== id
            );

            setFocusedGenres(filteredArray);
        } else {
            setFocusedGenres([...focusedGenres, id]);
        }
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <h2 className="poppins text-white text-xl font-medium">Genres</h2>

            {isSuccessGenres && (
                <div className="flex flex-wrap gap-2">
                    {dataGenres.genres.map((genre) => {
                        return (
                            <button
                                onClick={() => handleGenreChange(genre.id)}
                                key={genre.id}
                                className={`${
                                    location.pathname.split("/")[2] ===
                                        "top-rated" &&
                                    (genre.id === 99 || genre.id === 10755) &&
                                    "hidden"
                                } ${
                                    focusedGenres !== null &&
                                    focusedGenres.includes(genre.id)
                                        ? "bg-white text-black"
                                        : "bg-darkLighter text-white"
                                } p-2 md:px-3 md:py-[6px] bg-darkLighter  hover:md:opacity-70  text-xs poppins  rounded-full border-[1px] border-white border-solid`}
                            >
                                {genre.name}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Genres;
