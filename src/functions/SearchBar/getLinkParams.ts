import { filmDataT } from "../../api/getFilm";

type filmT = {
    backdrop_path: string;
    media_type: string;
    poster_path: string;
    release_date: string;
    title: string;
    name: string;
    profile_path: string;
    gender: number;
    id: number;
};

export const getLinkParams = (
    film: filmT | filmDataT,
    media_type: string
): string => {
    if (media_type === "person") {
        return `/person/?id=${film.id}&name=${film.name
            .split(" ")
            .join("-")
            .toLowerCase()}`;
    } else if (media_type === "movie") {
        return `/movie/?id=${film.id}&name=${film.title
            .split(" ")
            .join("-")
            .toLowerCase()}`;
    } else {
        return `/tv/?id=${film.id}&name=${film.name
            .split(" ")
            .join("-")
            .toLowerCase()}`;
    }
};
