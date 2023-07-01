const apiKey = import.meta.env.VITE_TMDB_API_KEY;
import { filterSetsT } from "../pages/MoviesShows";

export const getFiltered = (media: string, filterSets: filterSetsT) => {
    const link = `https://api.themoviedb.org/3/discover/${media}/?api_key=${apiKey}&language=en-US${Object.values(
        filterSets
    ).join("")}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type filteredDataT = {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
        name: string;
        first_air_date: string;
    }[];
    total_pages: number;
    tota_results: number;
};
