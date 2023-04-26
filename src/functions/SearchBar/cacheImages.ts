import { noImage } from "../../assets";

noImage

type dataObj = filmT[];

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


export const imgArray = (dataObj:dataObj):string[] => {
    let arr:string[] = []

    dataObj.slice(0,3).map((film:filmT) => {
        if (film.media_type === 'person') {
            if (film.profile_path === null) {
                return arr.push(noImage)
            } else {
                return arr.push(`https://image.tmdb.org/t/p/w500${film.profile_path}`);
            }
        } else if (film.poster_path === null) {
            return arr.push(noImage)
        } else {
            return arr.push(`https://image.tmdb.org/t/p/w500${film.poster_path}`)
        }
    })

    return arr;
}