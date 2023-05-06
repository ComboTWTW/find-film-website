const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getCredits = (id:string, media:string) => {

    const mediaQuery = media === 'tv' ? 'aggregate_credits' : 'credits';

    const link = `https://api.themoviedb.org/3/${media}/${id}/${mediaQuery}?api_key=${apiKey}&language=en-US`

    return fetch(link)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

export type crewObjT = {
        crew: {
            adult: boolean,
            gender: number | null,
            id: number,
            known_for_department: string,
            name: string,
            original_name: string,
            popularity: number,
            profile_path: string | null,
            credit_id: string,
            department: string,
            job: string,
            jobs: {
                credit_id: string,
                episode_count: number,
                job: string,
            }[],
        }[],
}

export type crewT = {
        adult: boolean,
        gender: number | null,
        id: number,
        known_for_department: string,
        name: string,
        original_name: string,
        popularity: number,
        profile_path: string | null,
        credit_id: string,
        department: string,
        job: string,
        jobs: {
            credit_id: string,
            episode_count: number,
            job: string,
        }[],
}[]
