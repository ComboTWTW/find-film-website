const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getFilm = (id:number) => {
    const link = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`

    return fetch(link)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

