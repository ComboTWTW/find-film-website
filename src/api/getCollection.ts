const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getCollection = (collectionID: string) => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/collection/${collectionID}?api_key=${apiKey}&language=en-US`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type collectionT = {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: {
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
};
