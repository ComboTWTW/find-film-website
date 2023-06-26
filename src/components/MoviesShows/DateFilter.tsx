import { filterSetsT } from "../../pages/MoviesShows";

interface Props {
    setFilterSets: Function;
    filterSets: filterSetsT;
}

/* location.pathname.split("/")[2] */

const DateFilter = ({ setFilterSets, filterSets }: Props) => {
    const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (location.pathname.split("/")[1] === "tv") {
            setFilterSets({
                ...filterSets,
                dateFrom: `&first_air_date.gte=${e.target.value}`,
            });
        } else {
            setFilterSets({
                ...filterSets,
                dateFrom: `&primary_release_date.gte=${e.target.value}`,
            });
        }
    };

    const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (location.pathname.split("/")[1] === "tv") {
            setFilterSets({
                ...filterSets,
                dateTo: `&first_air_date.lte=${e.target.value}`,
            });
        } else {
            setFilterSets({
                ...filterSets,
                dateTo: `&primary_release_date.lte=${e.target.value}`,
            });
        }
    };

    return (
        <div className="w-full flex flex-col gap-1">
            <h2 className="poppins text-white text-xl font-medium">
                Release Dates
            </h2>

            <div className="flex gap-4">
                <div className="flex flex-col max-w-[45%]">
                    <label
                        htmlFor="from"
                        className="text-sm poppins text-white"
                    >
                        From (Year)
                    </label>
                    <input
                        onChange={(e) => handleFrom(e)}
                        minLength={4}
                        id="from"
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        maxLength={4}
                        type="text"
                        className="rounded-[5px] bg-transparent border-white border-solid border-[1px] mt-[6px] outline-none py-1 px-2 text-white poppins"
                    />
                </div>
                <div className="flex flex-col max-w-[45%]">
                    <label htmlFor="to" className="text-sm poppins text-white">
                        To (Year)
                    </label>
                    <input
                        onChange={(e) => handleTo(e)}
                        minLength={4}
                        id="to"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        defaultValue={new Date().getFullYear()}
                        maxLength={4}
                        type="text"
                        className="rounded-[5px] bg-transparent border-white border-solid border-[1px] mt-[6px] outline-none py-1 px-2 text-white poppins "
                    />
                </div>
            </div>
        </div>
    );
};

export default DateFilter;
