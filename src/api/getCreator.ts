const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getCreator = (id:string | number | null):Promise<creatorT> => {


    const link = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`

    return fetch(link)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

export type creatorT = {
    birthday: string | null,
    known_for_department: string,
    deathday: null | string,
    id: number,
    name: string,
    also_known_as: string[],
    gender: number,
    biography: string,
    popularity: number,
    place_of_birth: string | null,
    profile_path: string | null,
    adult: boolean,
    imdb_id: string,
    homepage: null | string,
}