import { useEffect, useState, useRef } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useOnClickOutside } from "usehooks-ts";
import {
    arrayRemove,
    arrayUnion,
    deleteDoc,
    deleteField,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

interface Props {
    lists: object;
    setCurrentLists: Function;
}

const Lists = ({ lists, setCurrentLists }: Props) => {
    const [newLists, setNewLists] = useState<object>(lists);
    const [toggleCreateList, setToggleCreateList] = useState<boolean>(false);
    const [listInput, setListInput] = useState<string>("");

    const inputRef = useRef<any>();
    useOnClickOutside(inputRef, () => setToggleCreateList(false));

    const handleListInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setListInput(e.target.value);
    };

    const handleAddListClick = async (listInput: string) => {
        if (listInput === "") {
            return null;
        } else if (auth.currentUser !== null) {
            const newList2 = { ...newLists };
            setNewLists({ ...newList2, [listInput]: null });
            setToggleCreateList(false);
            const docRef = doc(db, "users", auth.currentUser.uid);
            try {
                await updateDoc(docRef, {
                    [listInput]: arrayUnion({}),
                });
            } catch {
                setNewLists(newList2);
            }
        }
    };

    const handleRemoveListClick = async (list: string) => {
        let newObj: any = { ...newLists };
        delete newObj[list];
        setNewLists(newObj);
        if (auth.currentUser !== null) {
            const docRef = doc(db, "users", auth.currentUser.uid);
            try {
                await updateDoc(docRef, {
                    [list]: deleteField(),
                });
            } catch {
                setNewLists({ ...newLists, [list]: null });
            }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <h2 className="poppins text-white text-3xl md:text-4xl font-medium">
                Your Lists
            </h2>

            <ul className="flex flex-col mt-3  gap-3 ">
                {Object.keys(newLists).map((list) => {
                    return (
                        <li
                            onClick={() => setCurrentLists(list)}
                            key={Math.random()}
                            className=" poppins text-white text-xl flex items-center justify-between bg-darkLighter rounded-[5px] px-4 py-2 cursor-pointer"
                        >
                            <h3>
                                {list === "watchLater"
                                    ? "Watch Later"
                                    : list === "favorites"
                                    ? "Favorites"
                                    : list}
                            </h3>

                            <IoMdClose
                                onClick={() => handleRemoveListClick(list)}
                                className={`${
                                    list === "watchLater"
                                        ? "hidden"
                                        : list === "favorites"
                                        ? "hidden"
                                        : ""
                                } hover:opacity-60`}
                            />
                        </li>
                    );
                })}
            </ul>

            {!toggleCreateList && (
                <button
                    onClick={() => setToggleCreateList(true)}
                    className={`flex items-center gap-2 mt-2 border-solid border-white border-[1px] rounded-[5px] px-4 py-2 md:max-w-[300px]`}
                >
                    <IoMdAdd size={23} color="white" />
                    <h3 className="poppins text-lg text-white">
                        Create new list
                    </h3>
                </button>
            )}

            {toggleCreateList && (
                <div
                    ref={inputRef}
                    className="flex flex-col mt-2 gap-2 md:gap-1 md:max-w-[300px]"
                >
                    <input
                        onChange={(e) => handleListInput(e)}
                        autoFocus={true}
                        type="text"
                        className="poppins text-white text-lg border-solid border-white border-[1px] bg-transparent rounded-[5px] px-4 py-2 md:max-w-[300px] outline-none"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={() => handleAddListClick(listInput)}
                            className="poppins text-lg font-medium px-2 py-1 mediaButton text-white w-fit"
                        >
                            Create List
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lists;
