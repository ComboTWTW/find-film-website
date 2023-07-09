import { useEffect, useState } from "react";
import { imgArray } from "../../functions/cacheImages";
import { getName } from "../../functions/SearchBar/getName";
import { getImage } from "../../functions/SearchBar/getImage";
import { timer } from "../../functions/timer";
import { Link } from "react-router-dom";
import { getLinkParams } from "../../functions/SearchBar/getLinkParams";
import { filmDataT } from "../../api/getFilm";

interface Props {
    dataObj: filmT[];
    searchInput: {
        input: string;
        submit: boolean;
    };
}

type filmT = {
    backdrop_path: string;
    media_type: string;
    poster_path: string;
    release_date: string;
    title: string;
    name: string;
    profile_path: string;
    gender: number;
    id: number;
};

const SearchPlate = ({ dataObj, searchInput }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const cacheImages = async (imgArr: string[]) => {
        const promises = await imgArr.map((src) => {
            return new Promise<void>((resolve, reject) => {
                setIsLoading((isLoading) => true);
                const img = new Image();
                img.src = src;
                img.onload = () => resolve();
                img.onerror = () => reject();
            });
        });
        await Promise.all(promises);
        setIsLoading(false);
    };

    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const waiter = async () => {
            const imgs = imgArray(dataObj);
            cacheImages(imgs);
            setShow(false);
            await timer(350);
            setShow(true);
        };
        waiter();
    }, [dataObj]);

    return (
        <div className="">
            {show && (
                <div
                    className={`z-30 absolute bg-darkLighter top-11 borderPlate w-full ${
                        isLoading ? "hidden" : "block"
                    }`}
                >
                    <div className={`bg-darkLighter  md:rounded-[5px] `}>
                        <ul className={`flex  flex-col items-start`}>
                            {dataObj.slice(0, 3).map((film: filmT) => {
                                return (
                                    <Link
                                        key={film.id}
                                        reloadDocument={true}
                                        to={`${getLinkParams(
                                            film,
                                            film.media_type
                                        )}`}
                                        className="w-full"
                                    >
                                        <li className=" flex flex-col w-full max-w-full">
                                            <div className="flex  items-center w-full gap-2 hover:bg-bgMain">
                                                <img
                                                    className="w-[60px] h-auto"
                                                    src={`${getImage(film)}`}
                                                    alt=""
                                                />
                                                <h3 className=" poppins  text-white text-[1.1rem] pr-1">{`${getName(
                                                    film
                                                )}`}</h3>
                                            </div>
                                            <div className="w-full bg-gray-500 h-[1px]"></div>
                                        </li>
                                    </Link>
                                );
                            })}
                            <Link
                                reloadDocument={true}
                                to={`/search/?query=${searchInput.input}`}
                                className="w-full  text-center overflow-hidden poppins py-1 tracking-wider text-white"
                            >
                                Show more...
                            </Link>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPlate;
