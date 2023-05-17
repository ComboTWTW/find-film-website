import { db, auth } from "../../config/firebase";
import { Firestore, setDoc, doc, collection, addDoc } from "firebase/firestore";

export const createUserCollection = (id: string): Promise<string> => {
    return new Promise<string>((resolve) => {
        setDoc(doc(db, "users", id), {
            favorites: [],
            watchLater: [],
        })
            .then(() => {
                resolve("resolved");
            })
            .catch((err) => {
                throw err;
            });
    });
};
