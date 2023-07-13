const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getUpcomingList = () => {
    const currYear = new Date().getFullYear();
    const nextYear = new Date().getFullYear() + 1;

    const link = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${currYear}&release_date.lte=${nextYear}&api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export const getVideoList = (id: number) => {
    const link = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type upcomingListT = {
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

export type videoT = {
    id: number;
    results: {
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
        id: string;
    }[];
};
