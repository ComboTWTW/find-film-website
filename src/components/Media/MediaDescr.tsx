import { runtimeCalc } from "../../functions/runtimeCalc";
import { filmDataT } from "../../api/getFilm";
import Credits from "./Credits";
import { currencyFormat } from "../../functions/currencyFormat";
import ListButtons from "./ListButtons";

interface Props {
    media: string;
    dataFilm: filmDataT;
}

const MediaDescr = ({ media, dataFilm }: Props) => {
    const getReleaseData = (
        media: string,
        dataFilm: filmDataT
    ): string | null => {
        if (media === "tv") {
            if (
                dataFilm.first_air_date.slice(0, 4) !== "" &&
                dataFilm.first_air_date.slice(0, 4) !== undefined
            ) {
                return `(${dataFilm.first_air_date.slice(0, 4)})`;
            } else return null;
        }
        if (media === "movie") {
            if (
                dataFilm.release_date.slice(0, 4) !== "" &&
                dataFilm.release_date.slice(0, 4) !== undefined
            ) {
                return `(${dataFilm.release_date.slice(0, 4)})`;
            } else return null;
        } else {
            return null;
        }
    };

    return (
        <div className="flex flex-col lg:mt-14 relative">
            {/* Header */}
            <h1 className="poppins text-white text-3xl md:text-4xl font-bold">
                {media === "tv" ? dataFilm.name : dataFilm.title}{" "}
                <span className={`text-2xl md:text-3xl font-normal`}>
                    {getReleaseData(media, dataFilm)}
                </span>
            </h1>

            <div className="flex flex-col md:text-base md:flex-row mt-4 md:mt-2 poppins text-white  items-center w-[100vw] md:w-full bg-darkLighter bg-opacity-50 md:bg-opacity-0 py-3 md:py-0">
                {/* Release date and sm runtime*/}
                <div className="flex gap-3  ">
                    <p className={`shrink-0 `}>
                        {media === "movie" &&
                            dataFilm.release_date.replace(/-/g, "/")}
                        <span
                            className={`shrink-0 hidden ${
                                media === "tv" ? "hidden" : "md:inline-block"
                            }  mx-2`}
                        >
                            •
                        </span>
                    </p>
                    <span className="shrink-0 md:hidden">
                        {media === "movie"
                            ? `${runtimeCalc(dataFilm.runtime)}`
                            : `${runtimeCalc(dataFilm.episode_run_time[0])}`}
                    </span>
                </div>
                {/* Genres */}
                <ul className="flex gap-2">
                    {dataFilm.genres.slice(0, 3).map((genre) => {
                        return (
                            <li key={genre.id} className="shrink-0">
                                {genre.name},
                            </li>
                        );
                    })}
                    <span className="shrink-0 hidden md:block"> • </span>
                </ul>
                {/* Runtime for md */}
                <p className="shrink-0 hidden md:block md:ml-2">
                    {media === "movie"
                        ? `${runtimeCalc(dataFilm.runtime)}`
                        : `${runtimeCalc(dataFilm.episode_run_time[0])}`}
                </p>
            </div>

            <div className="flex flex-col  text-left poppins px-4 md:px-0 text-white mt-4 gap-4">
                <p
                    className={`font-light italic ${
                        dataFilm.tagline === "" && "hidden"
                    } mt-4 md:-mt-2`}
                >
                    « {dataFilm.tagline} »
                </p>

                <ListButtons id={dataFilm.id} media={media} />

                <h2 className="text-xl font-semibold mt-2">Overview</h2>
                <p className="text-lg font-light md:-mt-3">
                    {dataFilm.overview}
                </p>

                {dataFilm.origin_country !== undefined && (
                    <div className="flex flex-col mt-4">
                        <h2 className="text-base font-normal">
                            Country of Origin
                        </h2>
                        <h2 className="text-lg font-medium">
                            {dataFilm.origin_country[0]}
                        </h2>
                    </div>
                )}

                {media === "movie" && dataFilm.budget !== 0 && (
                    <ul className="flex flex-row gap-4 md:gap-12 mt-4 mb-10">
                        <li
                            key={dataFilm.id}
                            className="flex flex-col gap-1 md:gap-0"
                        >
                            <h2 className="text-lg font-medium leading-snug md:leading-normal">
                                Budget
                            </h2>
                            <h2 className="text-base font-normal">
                                {currencyFormat(dataFilm.budget)}
                            </h2>
                        </li>
                        <li
                            key={dataFilm.id}
                            className="flex flex-col gap-1 md:gap-0"
                        >
                            <h2 className="text-lg font-medium leading-snug md:leading-normal">
                                Revenue
                            </h2>
                            <h2 className="text-base font-normal">
                                {currencyFormat(dataFilm.revenue)}
                            </h2>
                        </li>
                    </ul>
                )}

                <Credits media={media} id={dataFilm.id.toString()} />
            </div>
        </div>
    );
};

export default MediaDescr;
