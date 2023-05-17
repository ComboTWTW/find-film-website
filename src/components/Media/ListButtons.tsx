import { IoMdHeart, IoMdBookmark, IoMdList } from "react-icons/io";
import { addToFav, addToWL } from "../../functions/ListsFunctions/addToFav";
import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useEffectOnce } from "usehooks-ts";
import { useQuery } from "react-query";

interface Props {
    id: number;
    media: string;
}

/* const checkFav = async () => {
    if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const arrFav = (await getDoc(docRef)).data()?.favorites;
        if (arrFav.some((obj: any) => obj.id === id)) {
            setToggleFavorite(true);
        }
    }
}; */

const ListButtons = ({ id, media }: Props) => {
    const [toggleFavorite, setToggleFavorite] = useState<boolean>();
    const [toggleWatchLater, setToggleWatchLater] = useState<boolean>();

    const handleFavClick = async (id: number, media: string) => {
        try {
            if ((await addToFav(id, media)) === "added") {
                setToggleFavorite(true);
            } else {
                setToggleFavorite(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleWlClick = async (id: number, media: string) => {
        try {
            if ((await addToWL(id, media)) === "added") {
                setToggleWatchLater(true);
            } else {
                setToggleWatchLater(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex w-full gap-5">
            <button
                onClick={() => handleFavClick(id, media)}
                className="bg-darkLighter mediaButton rounded-full  p-3"
            >
                <IoMdHeart
                    size={23}
                    className="mediaButton"
                    color={`${toggleFavorite ? "red" : ""}`}
                />
            </button>
            <button
                className="bg-darkLighter mediaButton  rounded-full  p-3"
                onClick={() => handleWlClick(id, media)}
            >
                <IoMdBookmark
                    size={23}
                    color={`${toggleWatchLater ? "red" : ""}`}
                />
            </button>
            <button className="bg-darkLighter mediaButton  rounded-full  p-3">
                <IoMdList size={23} />
            </button>
        </div>
    );
};

export default ListButtons;
