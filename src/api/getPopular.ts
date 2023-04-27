const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getPopular = () => {
    const link = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`

    return fetch(link)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

