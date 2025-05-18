const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getPerson = (id: string) => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/person/${id}?api_key=${apiKey}&language=en-US`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type personT = {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
};
