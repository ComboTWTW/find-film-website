const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getTrending = () => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/trending/movie/week?language=en-US&api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type trendingT = {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string;
        id: number;
        title: string;
        original_language: string;
        original_title: string;
        overview: string;
        poster_path: string;
        media_type: string;
        genre_ids: number[];
        popularity: number;
        release_date: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
};
