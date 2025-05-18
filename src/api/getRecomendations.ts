const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getRecomendations = (id: string, media: string) => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/${media}/${id}/similar?api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type recommendationsT = {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string;
        id: number;
        name: string;
        title: string;
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
