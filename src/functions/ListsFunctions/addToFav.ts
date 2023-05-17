import { db, auth } from "../../config/firebase";
import {
    doc,
    updateDoc,
    arrayUnion,
    getDoc,
    arrayRemove,
} from "firebase/firestore";

export const addToFav = async (id: number, media: string) => {
    if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const arrFav = (await getDoc(docRef)).data()?.favorites;
        if (arrFav.some((obj: any) => obj.id === id)) {
            try {
                await updateDoc(docRef, {
                    favorites: arrayRemove({
                        id: id,
                        media: media,
                    }),
                });
                return new Promise<string>((resolve, reject) => {
                    resolve("removed");
                });
            } catch (error) {
                throw error;
            }
        }
        try {
            await updateDoc(docRef, {
                favorites: arrayUnion({
                    id: id,
                    media: media,
                }),
            });
            return new Promise<string>((resolve, reject) => {
                resolve("added");
            });
        } catch (error) {
            throw error;
        }
    } else {
        return "Login to add to favorites";
    }
};

export const addToWL = async (id: number, media: string) => {
    if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const arrWL = (await getDoc(docRef)).data()?.watchLater;
        if (arrWL.some((obj: any) => obj.id === id)) {
            try {
                await updateDoc(docRef, {
                    watchLater: arrayRemove({
                        id: id,
                        media: media,
                    }),
                });
                return new Promise<string>((resolve, reject) => {
                    resolve("removed");
                });
            } catch (error) {
                throw error;
            }
        }
        try {
            await updateDoc(docRef, {
                watchLater: arrayUnion({
                    id: id,
                    media: media,
                }),
            });
            return new Promise<string>((resolve, reject) => {
                resolve("added");
            });
        } catch (error) {
            throw error;
        }
    } else {
        return "Login to add to Watch Later";
    }
};
