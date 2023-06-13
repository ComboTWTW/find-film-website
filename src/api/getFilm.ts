const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getFilm = (id: number | string, media: string) => {
    const link = `https://api.themoviedb.org/3/${media}/${id}?api_key=${apiKey}`;

    return fetch(link)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch:${res.status} ${res.statusText}`
                );
            }
            return res.json();
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};
export type filmDataT = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null | {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };
    budget: number;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    name: string;

    created_by: {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string | null;
    }[];
    episode_run_time: number[];
    first_air_date: string;
    in_productio: boolean;
    language: string[];
    last_air_date: string;
    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        still_path: string | null;
        vote_average: number;
        vote_count: number;
    };
    networks: {
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_name: string;
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
    }[];
};
