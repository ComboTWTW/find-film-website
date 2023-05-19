import { magnifier, xMark } from "../../assets/index";
import { useState, useEffect, useRef } from "react";
import useOnClickOutside from "../../hooks/useClickOutside";
import SearchPlate from "./SearchPlate";
import { useQuery } from "react-query";
import { search } from "../../api/search";
import { timer } from "../../functions/timer";

type searchInput = {
    input: string;
    submit: boolean;
};

type filmT = {
    backdrop_path: string;
    media_type: string;
    poster_path: string;
    release_date: string;
    title: string;
    name: string;
    profile_path: string;
    gender: number;
};

const SearchBar = () => {
    /* State for information within searchBar */
    const [searchInput, setSearchInput] = useState<searchInput>({
        input: "",
        submit: false,
    });

    /* State for Dropping Search Plate Visibility */
    const [plateToggle, setPlateToggle] = useState<boolean>(false);
    const plateWindow = useRef<any>();
    useOnClickOutside(plateWindow, () => setPlateToggle(true));

    const handleChanges = (e: any) => {
        setSearchInput((searchInput) => ({
            searchInput,
            input: e.target.value,
            submit: false,
        }));
    };

    const handleClearcClick = () => {
        setSearchInput((searchInput) => ({
            searchInput,
            input: "",
            submit: false,
        }));
    };

    const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchInput({ ...searchInput, submit: true });
    };

    const { isSuccess, data, refetch } = useQuery(["search"], () =>
        search(searchInput.input)
    );

    const [show, setShow] = useState<boolean>(false);
    let input = searchInput.input;

    useEffect(() => {
        const waiter = async () => {
            setShow(false);
            await timer(250);
            setShow(true);
        };
        waiter();
    }, [input]);

    useEffect(() => {
        let newData: any = data;
        refetch();
        isSuccess && setDataObj((dataObj) => [...newData.results]);
        isSuccess && setPlateToggle(false);
    }, [searchInput, isSuccess, data]);

    const [dataObj, setDataObj] = useState<filmT[]>([]);

    return (
        <div ref={plateWindow} className="relative z-30">
            <img
                src={magnifier}
                alt="magnifier"
                className="absolute max-w-[18px] h-auto left-3 top-[13px] md:top-[9px]"
            />
            <img
                src={xMark}
                alt="xMark"
                onClick={handleClearcClick}
                className={`${
                    searchInput.input != "" ? "absolute" : "hidden"
                } cursor-pointer max-w-[14px] h-auto right-3 top-[15px] md:top-[11px]`}
            />
            <form onSubmit={(e) => handleSubmitClick(e)}>
                <input
                    value={searchInput.input}
                    onChange={(e) => handleChanges(e)}
                    placeholder="Type for search..."
                    type="text"
                    className="bg-darkLighter poppins rounded-none md:rounded-[5px]  md:focus:outline-offset-0 md:focus:outline-1 md:focus:outline-gray-400 focus:outline-none py-[10px] md:py-[5px] pl-10 pr-9 md:pl-[2.3rem] md:pr-9 w-full md:max-w-[22rem] text-white font-light outline-none"
                />
            </form>

            {show && (
                <div
                    className={`delay-1000 opacity-100 ${
                        plateToggle === true && "hidden"
                    } ${searchInput.input.length === 0 && "hidden"} ${
                        dataObj.length === 0 && "hidden"
                    }`}
                >
                    <SearchPlate dataObj={dataObj} />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
