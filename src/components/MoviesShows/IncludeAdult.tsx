import { filterSetsT } from "../../pages/MoviesShows";
import Switch from "react-switch";

interface Props {
    setFilterSets: Function;
    filterSets: filterSetsT;
}

const IncludeAdult = ({ setFilterSets, filterSets }: Props) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="poppins text-white text-xl font-medium">
                Include Adult
            </h2>

            <div className="flex gap-3 items-center">
                <h2 className="poppins text-white text-lg font-medium">No</h2>
                <Switch
                    checked={true}
                    onChange={() => {}}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={30}
                    width={60}
                />
                <h2 className="poppins text-white text-lg font-medium">Yes</h2>
            </div>
        </div>
    );
};

export default IncludeAdult;
