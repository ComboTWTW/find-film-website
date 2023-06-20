import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getFilm, filmDataT } from "../../api/getFilm";
import { CircularProgress } from "@mui/material";
import { noImage } from "../../assets";

interface Props {
    id: string;
    media: string;
}

const SeasonsTV = ({ id, media }: Props) => {
    const {
        data: dataSeasons,
        refetch: refetchSeasons,
        isSuccess: isSuccessSeasons,
        isError,
        isFetchedAfterMount,
    } = useQuery<filmDataT>(["getSeasons", id, media], () =>
        getFilm(`${id}`, `${media}`)
    );

    const [showAllSeasons, setShowAllSeasons] = useState<boolean>();

    useEffect(() => {
        refetchSeasons();
    }, []);

    useEffect(() => {
        isSuccessSeasons && dataSeasons.number_of_seasons > 2
            ? setShowAllSeasons(false)
            : setShowAllSeasons(true);
    }, [isSuccessSeasons, dataSeasons]);

    return (
        <div className="w-full flex flex-col items-start text-start">
            <h3 className="poppins text-white text-4xl font-semibold md:mt-1">
                Seasons
            </h3>

            <h4 className="poppins text-white font-normal text-xl ">
                Count of Seasons: {dataSeasons?.number_of_seasons}{" "}
                {dataSeasons?.seasons[0].name === "Specials" && " + Specials"}
            </h4>

            {!isSuccessSeasons ? (
                <CircularProgress size={50} />
            ) : (
                <ul className="w-full flex flex-col mt-4 gap-3 lg:grid lg:grid-cols-2">
                    {dataSeasons.seasons.map((season) => {
                        return (
                            <li
                                key={season.id + Math.random()}
                                className={`rounded-[5px] flex bg-darkLighter ${
                                    season.season_number > 1 &&
                                    !showAllSeasons &&
                                    "hidden"
                                }`}
                            >
                                <img
                                    src={`${
                                        season.poster_path !== null
                                            ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                                            : noImage
                                    }`}
                                    alt="Season Poster"
                                    className={`rounded-l-[5px] max-w-[113px]  md:max-w-[133px]  object-cover max-h-[170px] md:min-h-[200px] `}
                                />
                                <div className="flex flex-col p-5">
                                    <h3 className="poppins text-white text-2xl">
                                        {season.name === "Specials"
                                            ? "Specials"
                                            : `Season ${season.season_number}`}
                                    </h3>
                                    {season.air_date !== null && (
                                        <h3 className="poppins text-white text-lg">
                                            Premiered on{" "}
                                            <span className="font-semibold">
                                                {season.air_date.slice(0, 4)}
                                            </span>
                                        </h3>
                                    )}
                                    <h3 className="poppins text-white text-lg">
                                        <span className="font-semibold">
                                            {season.episode_count}
                                        </span>{" "}
                                        Episodes
                                    </h3>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {isSuccessSeasons && (
                <button
                    onClick={() =>
                        setShowAllSeasons((showAllSeasons) => !showAllSeasons)
                    }
                    className={`w-full uppercase text-lg border-white border-[1px] botder-solid text-center py-2 mt-3 tracking-wider rounded-[5px] poppins text-white ${
                        dataSeasons?.seasons.length <= 2 && "hidden"
                    }`}
                >
                    {!showAllSeasons ? "Show full list" : "Hide list"}
                </button>
            )}
        </div>
    );
};

export default SeasonsTV;
