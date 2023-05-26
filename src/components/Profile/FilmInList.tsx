import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getFilm, filmDataT } from "../../api/getFilm";
import { noImgLong } from "../../assets";
import { GoTrashcan } from "react-icons/all";
import { NavLink } from "react-router-dom";
import { getLinkParams } from "../../functions/SearchBar/getLinkParams";
import { db, auth } from "../../config/firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

interface Props {
    film: { id: number; media: string };
    setNewLists: Function;
    newLists: object[];
    currentList: string;
}

const FilmInList = ({ film, setNewLists, newLists, currentList }: Props) => {
    const [toggleRemove, setToggleRemove] = useState<boolean>(false);

    const {
        data: dataFilm,
        refetch: refetchFilm,
        isSuccess: isSuccessFilm,
    } = useQuery<filmDataT>(["getListFilm", film.id, film.media], () =>
        getFilm(film.id, film.media)
    );

    useEffect(() => {
        refetchFilm();
    }, []);

    const posterImage = (poster: string | null): string => {
        if (poster !== null) {
            return `https://image.tmdb.org/t/p/w500${dataFilm.poster_path}`;
        } else {
            return noImgLong;
        }
    };

    const handleRemoveClick = async () => {
        let listCopy = newLists.filter(function (el: {
            id: number;
            media: string;
        }) {
            if (el.id !== film.id) {
                return el;
            }
        });
        setNewLists([...listCopy]);
        try {
            if (auth.currentUser !== null) {
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    [currentList]: arrayRemove({
                        id: film.id,
                        media: film.media,
                    }),
                });
                return new Promise<boolean>((resolve, reject) => {
                    resolve(true);
                });
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setToggleRemove(true)}
            onMouseLeave={() => setToggleRemove(false)}
            onTouchMove={() => setToggleRemove(true)}
            onTouchEnd={() =>
                setTimeout(() => {
                    setToggleRemove(false);
                }, 1300)
            }
        >
            {toggleRemove && (
                <button
                    onClick={() => handleRemoveClick()}
                    className="absolute rounded-full bg-white p-1 right-2 top-2"
                >
                    <GoTrashcan size={20} />
                </button>
            )}
            {isSuccessFilm && (
                <NavLink
                    reloadDocument={true}
                    to={`${getLinkParams(dataFilm, film.media)}`}
                    target="_blank"
                >
                    <div className="flex flex-col gap-2">
                        <img
                            src={posterImage(dataFilm.poster_path)}
                            alt="FilmPoster"
                            className="rounded-[5px] "
                        />

                        <h3
                            title={
                                film.media === "tv"
                                    ? dataFilm.name
                                    : dataFilm.title
                            }
                            className="poppins text-white text-xl  leading-snug whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                            {film.media === "tv"
                                ? dataFilm.name
                                : dataFilm.title}
                        </h3>

                        <h3 className="poppins -mt-2 text-white font-light text-sm leading-snug whitespace-nowrap text-ellipsis overflow-hidden">
                            {film.media === "movie" ? "Film" : "TV Series"}
                        </h3>
                    </div>
                </NavLink>
            )}
        </div>
    );
};

export default FilmInList;
