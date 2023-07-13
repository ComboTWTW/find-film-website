const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getTrendingTV = () => {
    const link = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type trendingTVT = {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string;
        id: number;
        name: string;
        original_language: string;
        original_name: string;
        overview: string;
        poster_path: string;
        media_type: string;
        genre_ids: number[];
        popularity: number;
        first_air_date: string;
        vote_average: number;
        vote_count: number;
        origin_country: string[];
    }[];
    total_pages: number;
    total_results: number;
};
