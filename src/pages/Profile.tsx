import ProfileHeader from "../components/Profile/ProfileHeader";
import Lists from "../components/Profile/Lists";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
    const [lists, setLists] = useState<object | undefined>();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const getLists = async () =>
                    setLists((await getDoc(docRef)).data());
                getLists();
            }
        });
    }, []);

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[1300px] px-4 w-full flex flex-col">
                <header>
                    <ProfileHeader />
                </header>

                {lists !== undefined && (
                    <div className="flex flex-row w-full mt-10">
                        <div className="flex flex-col w-full">
                            <Lists lists={lists} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
