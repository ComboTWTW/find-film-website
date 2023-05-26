import { IoMdHeart, IoMdBookmark, IoMdList } from "react-icons/io";
import { addToFav, addToWL } from "../../functions/ListsFunctions/addToFav";
import { useEffect, useState, useRef } from "react";
import { db, auth } from "../../config/firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useEffectOnce } from "usehooks-ts";
import { useQuery } from "react-query";
import CreateList from "./CreateList";
import { useOnClickOutside } from "usehooks-ts";
import { onAuthStateChanged } from "firebase/auth";

interface Props {
    id: number;
    media: string;
}

const ListButtons = ({ id, media }: Props) => {
    const [toggleFavorite, setToggleFavorite] = useState<boolean>();
    const [toggleWatchLater, setToggleWatchLater] = useState<boolean>();
    const [toggleCreateList, setToggleCreateList] = useState<boolean>(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const checkFav = async () => {
                const docRef = doc(db, "users", user.uid);
                const arrFav = (await getDoc(docRef)).data()?.favorites;
                if (arrFav.some((obj: any) => obj.id === id)) {
                    setToggleFavorite(true);
                }
            };
            const checkWL = async () => {
                const docRef = doc(db, "users", user.uid);
                const arrFav = (await getDoc(docRef)).data()?.watchLater;
                if (arrFav.some((obj: any) => obj.id === id)) {
                    setToggleWatchLater(true);
                }
            };
            checkFav();
            checkWL();
        }
    });

    const createListRef = useRef<any>();
    useOnClickOutside(createListRef, () => setToggleCreateList(false));

    const handleFavClick = async (id: number, media: string) => {
        setToggleFavorite(true);
        try {
            if ((await addToFav(id, media)) === true) {
            } else {
                setToggleFavorite(false);
            }
        } catch (error) {
            console.log(error);
            setToggleFavorite(false);
        }
    };

    const handleWlClick = async (id: number, media: string) => {
        setToggleWatchLater(true);
        try {
            if ((await addToWL(id, media)) === true) {
            } else {
                setToggleWatchLater(false);
            }
        } catch (error) {
            console.log(error);
            setToggleWatchLater(false);
        }
    };

    const [lists, setLists] = useState<object>();
    const hanndleListClick = async () => {
        if (auth.currentUser) {
            const docRef =
                auth.currentUser && doc(db, "users", auth.currentUser.uid);
            setLists((await getDoc(docRef)).data());
        }
        setToggleCreateList((toggleCreateList) => !toggleCreateList);
    };

    return (
        <div className="flex w-full gap-5">
            <button
                title="Add to Favorite"
                onClick={() => handleFavClick(id, media)}
                className="bg-darkLighter mediaButton rounded-full p-3"
            >
                <IoMdHeart
                    size={23}
                    className="mediaButton"
                    color={`${toggleFavorite ? "red" : ""}`}
                />
            </button>
            <button
                title="Add to Watch Later"
                className="bg-darkLighter mediaButton  rounded-full  p-3"
                onClick={() => handleWlClick(id, media)}
            >
                <IoMdBookmark
                    size={23}
                    color={`${toggleWatchLater ? "red" : ""}`}
                />
            </button>
            <div ref={createListRef} className="md:flex md:flex-row md:gap-5">
                <button
                    title="Create New List"
                    className="w-full bg-darkLighter mediaButton  rounded-full  p-3"
                    onClick={() => hanndleListClick()}
                >
                    <IoMdList size={23} />
                </button>

                {lists !== undefined && (
                    <div
                        className={`${!toggleCreateList && "hidden"} ${
                            !auth.currentUser && "hidden"
                        } `}
                    >
                        <CreateList
                            id={id}
                            setToggleCreateList={setToggleCreateList}
                            lists={lists}
                            media={media}
                            ToggleCreateList={toggleCreateList}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListButtons;
