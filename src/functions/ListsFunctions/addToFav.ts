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
                return new Promise<boolean>((resolve, reject) => {
                    resolve(false);
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
            return new Promise<boolean>((resolve, reject) => {
                resolve(true);
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
                return new Promise<boolean>((resolve, reject) => {
                    resolve(false);
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
            return new Promise<boolean>((resolve, reject) => {
                resolve(true);
            });
        } catch (error) {
            throw error;
        }
    } else {
        return "Login to add to Watch Later";
    }
};

export const addToCustom = async (id: number, media: string, list: string) => {
    if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const arrCustom = (await getDoc(docRef)).data()?.[list];
        if (arrCustom.some((obj: any) => obj.id === id)) {
            try {
                await updateDoc(docRef, {
                    [list]: arrayRemove({
                        id: id,
                        media: media,
                    }),
                });
                return new Promise<boolean>((resolve, reject) => {
                    resolve(false);
                });
            } catch (error) {
                throw error;
            }
        }
        try {
            await updateDoc(docRef, {
                [list]: arrayUnion({
                    id: id,
                    media: media,
                }),
            });
            return new Promise<boolean>((resolve, reject) => {
                resolve(true);
            });
        } catch (error) {
            throw error;
        }
    } else {
        return `Login to add to ${list} list`;
    }
};
