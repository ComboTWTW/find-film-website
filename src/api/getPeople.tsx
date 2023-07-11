const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getPeople = (page: number) => {
    const link = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type peopleT = {
    page: number;
    results: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        popularity: number;
        profile_path: string;
        known_for: {
            adult: boolean;
            backdrop_path: string;
            genre_ids: number[];
            id: number;
            media_type: string;
            original_language: string;
            original_title: string;
            overview: string;
            poster_path: string;
            release_date: string;
            title: string;
            video: boolean;
            vote_average: number;
            vote_count: number;
        }[];
    }[];
    total_pages: number;
    total_results: number;
};
