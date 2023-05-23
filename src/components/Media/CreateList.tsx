import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import {
    addToFav,
    addToWL,
    addToCustom,
} from "../../functions/ListsFunctions/addToFav";
import AddList from "./AddList";

interface Props {
    id: number;
    setToggleCreateList: Function;
    lists: object;
    media: string;
    ToggleCreateList: boolean;
}

const CreateList = ({
    id,
    setToggleCreateList,
    lists,
    media,
    ToggleCreateList,
}: Props) => {
    const inputListRef = useRef<any>();

    const listChecker = (list: string) => {
        const hasObjectWithId = lists[list].some(
            (item: { id: number }) => item.id === id
        );

        return hasObjectWithId;
    };

    const addToList = async (list: string) => {
        const checkboxRef: any = document.getElementById(list);
        if (list === "watchLater") {
            if ((await addToWL(id, media)) === true) {
                checkboxRef.checked = true;
            } else {
                checkboxRef.checked = false;
            }
        } else if (list === "favorites") {
            if ((await addToFav(id, media)) === true) {
                checkboxRef.checked = true;
            } else {
                checkboxRef.checked = false;
            }
        } else {
            if ((await addToCustom(id, media, list)) === true) {
                checkboxRef.checked = true;
            } else {
                checkboxRef.checked = false;
            }
        }
    };

    return (
        <div
            ref={inputListRef}
            className="absolute  bg-darkLighter rounded-[5px] flex flex-col px-4 py-4 max-h-[50vh] mt-5 md:mt-0 right-4 left-4 md:right-auto md:left-auto md:top-auto"
        >
            <div className="flex justify-between gap-32">
                <h3 className="poppins text-xl">Save to...</h3>
                <button onClick={() => setToggleCreateList(false)}>
                    <IoMdClose size={22} />
                </button>
            </div>
            <ul className="flex flex-col mt-3 md:gap-1 gap-2 w-fit">
                {Object.keys(lists).map((list) => {
                    return (
                        <li key={Math.random()}>
                            <label className="poppins text-xl cursor-pointer flex items-center">
                                <input
                                    id={list}
                                    onChange={() => addToList(list)}
                                    checked={listChecker(list)}
                                    type="checkbox"
                                    className="mr-2 w-5 h-5 cursor-pointer checkboxes"
                                />
                                {list === "watchLater"
                                    ? "Watch Later"
                                    : list === "favorites"
                                    ? "Favorites"
                                    : list}
                            </label>
                        </li>
                    );
                })}
            </ul>

            <AddList
                id={id}
                media={media}
                setToggleCreateList={setToggleCreateList}
                ToggleCreateList={ToggleCreateList}
            />
        </div>
    );
};

export default CreateList;
