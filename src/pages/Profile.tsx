import ProfileHeader from "../components/Profile/ProfileHeader";
import Lists from "../components/Profile/Lists";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CurrentList from "../components/Profile/CurrentList";
import { signOut } from "firebase/auth";

const Profile = () => {
    const [lists, setLists] = useState<object | undefined>();
    const [currentList, setCurrentList] = useState<string>("favorites");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const getLists = async () =>
                    setLists((await getDoc(docRef)).data());
                getLists();
            }
        });
    }, [currentList]);

    const signOutCall = async () => {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[1300px] px-4 w-full flex flex-col">
                <header>
                    <ProfileHeader />
                </header>

                {lists !== undefined && (
                    <div className="flex flex-col md:flex-row  mt-10  md:gap-10">
                        <div className="flex flex-col md:min-w-[300px]">
                            <Lists
                                lists={lists}
                                setCurrentLists={setCurrentList}
                            />

                            <button
                                onClick={() => signOutCall()}
                                className="hidden md:block poppins text-red-700 text-lg mt-16 font-medium border-red-700 border-solid border-[2px] rounded-[5px] px-4 py-2"
                            >
                                Log Out
                            </button>
                        </div>

                        <div className="w-full mt-5 md:mt-0 flex flex-col">
                            <CurrentList
                                lists={lists}
                                currentList={currentList}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
