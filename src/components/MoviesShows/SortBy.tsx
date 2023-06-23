import { filterSetsT } from "../../pages/MoviesShows";
import { styles } from "../../constants/index";

interface Props {
    setFilterSets: Function;
    filterSets: filterSetsT;
}

const MovieListFilter = ({ setFilterSets, filterSets }: Props) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="poppins text-white text-xl font-medium">
                Sort Results By
            </h2>

            <select
                defaultValue={`${
                    location.pathname.split("/")[2] === "top-rated"
                        ? "&sort_by=vote_average.desc"
                        : "&sort_by=popularity.desc"
                }`}
                name="Film List Select"
                id="filmList"
                className={styles.filterInput}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFilterSets({ ...filterSets, sortBy: e.target.value });
                }}
            >
                <option value="&sort_by=vote_average.desc">
                    Rating Descending
                </option>
                <option value="&sort_by=vote_average.asc">
                    Rating Ascending
                </option>
                <option value="&sort_by=popularity.desc">
                    Popularity Descending
                </option>
                <option value="&sort_by=popularity.asc">
                    Popularity Ascending
                </option>
                <option value="&sort_by=primary_release_date.desc">
                    Release Date Descending
                </option>
                <option value="&sort_by=primary_release_date.asc">
                    Release Date Ascending
                </option>
                <option value="&sort_by=title.asc">Title A-Z</option>
                <option value="&sort_by=title.desc">Title Z-A</option>
            </select>
        </div>
    );
};

export default MovieListFilter;
