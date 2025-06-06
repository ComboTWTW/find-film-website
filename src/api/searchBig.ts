const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const searchBig = (input: string, media: string, page: number) => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/search/${media}?api_key=${apiKey}&language=en-US&page=1&query=${input}&page=${page}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type searchBigMovieT = {
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
    }[];

    total_pages: number;
    total_results: number;
};

export type searchBigTvT = {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        origin_country: string[];
        original_language: string;
        original_name: string;
        overview: string;
        popularity: number;
        poster_path: string;
        first_air_date: string;
        name: string;
        vote_average: number;
        vote_count: number;
    }[];

    total_pages: number;
    total_results: number;
};

export type searchBigPersonT = {
    page: number;
    results: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
    }[];

    total_pages: number;
    total_results: number;
};
