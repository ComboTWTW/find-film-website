const apiKey = import.meta.env.VITE_TMDB_API_KEY;

declare global {
    interface FilmDataT {
        adult: boolean,
        

    }
}


export const getFilm = (id:number | string, media:string) => {
    const link = `https://api.themoviedb.org/3/${media}/${id}?api_key=${apiKey}`

    return fetch(link)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

