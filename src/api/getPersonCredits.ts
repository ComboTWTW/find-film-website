const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getPersonCredits = (id: string) => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/person/${id}/combined_credits?api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type personCreditsT = {
    cast: {
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
        character: string;
        credit_id: string;
        order: number;
        media_type: string;
        name: string;
    }[];
    crew: {
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
        credit_id: string;
        department: string;
        job: string;
        media_type: string;
        name: string;
    }[];
    id: number;
};
