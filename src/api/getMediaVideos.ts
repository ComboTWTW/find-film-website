const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getMediaVideos = (id: string, media: string) => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/${media}/${id}/videos?api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type mediaVideosT = {
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
