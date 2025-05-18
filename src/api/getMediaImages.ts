const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getMediaImages = (id: string, media: string) => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/${media}/${id}/images?api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type mediaImagesT = {
    backdrops: {
        aspect_ratio: number;
        height: number;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }[];
    id: number;
    posters: {
        aspect_ratio: number;
        height: number;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }[];
    logos: {
        aspect_ratio: number;
        height: number;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }[];
};
