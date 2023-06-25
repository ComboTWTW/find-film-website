const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getGenresList = (media: string) => {
    const link = `https://api.themoviedb.org/3/genre/${media}/list?api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};

export type genresListT = {
    genres: { id: number; name: string }[];
};
