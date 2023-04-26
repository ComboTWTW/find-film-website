type filmT = {
    backdrop_path: string,
    media_type: string,
    poster_path: string,
    release_date: string,
    title: string,
    name: string,
    profile_path: string,
    gender: number,
}

export const getName = (film:filmT):string => {
    if (film.media_type === 'person') {
        if (film.gender === 1) {
            return `${film.name} (Actress)`;
        } else {
            return `${film.name} (Actor)`;
        }
    } else if (film.media_type === 'movie') {
        return film.title;
    } else {
        return film.name;
    }
}