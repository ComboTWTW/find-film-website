import { noImgLong } from "../../assets";


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

export const getImage = (film:filmT):string => {
    if (film.media_type === 'person') {
        if (film.profile_path === null) {
            return noImgLong
        } else {
            return `https://image.tmdb.org/t/p/w500${film.profile_path}`;
        }
    } else if (film.poster_path === null) {
        return noImgLong
    } else {
        return `https://image.tmdb.org/t/p/w500${film.poster_path}`
    }
}
