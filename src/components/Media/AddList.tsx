import React, { Fragment, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

interface Props {
    id: number;
    media: string;
    setToggleCreateList: Function;
    ToggleCreateList: boolean;
}

const AddList = ({
    id,
    media,
    setToggleCreateList,
    ToggleCreateList,
}: Props) => {
    const [toggleListInput, setToggleListInput] = useState<boolean>(false);
    const [listInput, setListInput] = useState<string>("");

    const handleListInput = (e: any) => {
        setListInput(e.target.value);
    };
    const handleCreateClick = async (listInput: string) => {
        if (listInput === "") {
            return null;
        }
        if (auth.currentUser !== null) {
            const docRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(docRef, {
                [listInput]: arrayUnion({
                    id: id,
                    media: media,
                }),
            });
        }
        setToggleListInput(false);
        setToggleCreateList(false);
    };

    useEffect(() => {
        setToggleListInput(false);
    }, [ToggleCreateList]);

    return (
        <Fragment>
            <button
                onClick={() => setToggleListInput(true)}
                className={`flex items-center gap-2 mt-3 ${
                    toggleListInput && "hidden"
                }`}
            >
                <IoMdAdd size={23} />
                <h3 className="poppins text-lg">Create new list</h3>
            </button>

            <div
                className={`flex flex-col   mt-3 ${
                    !toggleListInput && "hidden"
                }`}
            >
                <label className=" poppins flex flex-col gap-1 items-start text-start poppins text-sm cursor-pointer font-light">
                    Name
                    <input
                        onChange={(e) => handleListInput(e)}
                        maxLength={20}
                        placeholder="Enter list name..."
                        type="text"
                        className="rounded-[5px] px-2 py-1 font-normal bg-transparent outline-none border border-white border-solid  text-ellipsis md:max-w-[230px]"
                    ></input>
                </label>
                <div className="w-full flex justify-end">
                    <button
                        onClick={() => handleCreateClick(listInput)}
                        className="max-w-fit  mt-2 poppins font-medium px-2 py-1 mediaButton md:hover:bg-bgMain md:hover:bg-opacity-50 md:hover:rounded-[10px] text-end "
                    >
                        Create and Add
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default AddList;
