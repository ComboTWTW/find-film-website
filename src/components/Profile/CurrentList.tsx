import { useEffect, useState } from "react";
import FilmInList from "./FilmInList";
import { useEffectOnce } from "usehooks-ts";

interface Props {
    lists: object;
    currentList: string;
}

const CurrentList = ({ lists, currentList }: Props) => {
    const [newLists, setNewLists] = useState<object[]>();

    useEffect(() => {
        setNewLists(lists[currentList]);
    }, [currentList]);

    return (
        <div className="flex flex-col ">
            <h2 className="poppins text-white text-3xl md:text-4xl font-medium">
                {currentList === "watchLater"
                    ? "Watch Later"
                    : currentList === "favorites"
                    ? "Favorites"
                    : currentList}
            </h2>

            <div className="w-full mt-5">
                <ul className="grid grid-cols-2 profileMd:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-6 ">
                    {newLists?.map((film: any) => {
                        if (film.id !== undefined) {
                            return (
                                <li key={film.id}>
                                    <FilmInList
                                        film={film}
                                        setNewLists={setNewLists}
                                        newLists={newLists}
                                        currentList={currentList}
                                    />
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CurrentList;
