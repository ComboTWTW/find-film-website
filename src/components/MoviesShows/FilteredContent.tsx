import { NavLink } from "react-router-dom";
import { filteredDataT } from "../../api/getFilters";
import { noImgLong } from "../../assets";

interface Props {
    filteredData: filteredDataT;
}

const FilteredContent = ({ filteredData }: Props) => {
    return (
        <div className="w-full">
            <ul className="grid grid-cols-2 profileMd:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-6 ">
                {filteredData?.results.map(
                    (film: filteredDataT["results"][0]) => {
                        return (
                            <li key={film.id}>
                                <NavLink
                                    reloadDocument={true}
                                    to={`/${
                                        location.pathname.split("/")[1]
                                    }/?id=${film.id}&name=${
                                        location.pathname.split("/")[1] === "tv"
                                            ? film.name.split(" ").join("-")
                                            : film.title.split(" ").join("-")
                                    }`}
                                    target="_blank"
                                >
                                    <div className="flex flex-col gap-2">
                                        <img
                                            src={`${
                                                film.poster_path === null
                                                    ? noImgLong
                                                    : `https://image.tmdb.org/t/p/w500${film.poster_path}`
                                            }`}
                                            alt="FilmPoster"
                                            className="rounded-[5px]"
                                        />

                                        <h3
                                            title={
                                                location.pathname.split(
                                                    "/"
                                                )[1] === "tv"
                                                    ? film.name
                                                    : film.title
                                            }
                                            className="poppins text-white text-lg twoLines leading-tight overflow-hidden"
                                        >
                                            {location.pathname.split("/")[1] ===
                                            "tv"
                                                ? film.name
                                                : film.title}
                                        </h3>

                                        <h3 className="poppins -mt-[6px] text-white font-light text-sm leading-snug whitespace-nowrap text-ellipsis overflow-hidden">
                                            {location.pathname.split("/")[1] ===
                                            "tv"
                                                ? film.first_air_date.slice(
                                                      0,
                                                      4
                                                  )
                                                : film.release_date.slice(0, 4)}
                                        </h3>
                                    </div>
                                </NavLink>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};

export default FilteredContent;
