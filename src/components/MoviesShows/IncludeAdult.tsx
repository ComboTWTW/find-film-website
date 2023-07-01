import { filterSetsT } from "../../pages/MoviesShows";
import Switch from "react-switch";
import { useState, useEffect } from "react";

interface Props {
    setFilterSets: Function;
    filterSets: filterSetsT;
}

const IncludeAdult = ({ setFilterSets, filterSets }: Props) => {
    const [isInclude, setIsInclude] = useState<boolean>(true);

    useEffect(() => {
        setFilterSets({
            ...filterSets,
            includeAdult: `&include_adult=${isInclude}`,
        });
    }, [isInclude]);
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="poppins text-white text-xl font-medium">
                Include Adult
            </h2>

            <div className="flex gap-3 items-center">
                <h2
                    className={`poppins ${
                        isInclude && "opacity-70"
                    } text-white text-lg font-medium`}
                >
                    No
                </h2>
                <Switch
                    checked={isInclude}
                    onChange={() => setIsInclude((isInclude) => !isInclude)}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={35}
                    width={65}
                    handleDiameter={25}
                />
                <h2
                    className={`poppins ${
                        !isInclude && "opacity-70"
                    } text-white text-lg font-medium`}
                >
                    Yes
                </h2>
            </div>
        </div>
    );
};

export default IncludeAdult;
