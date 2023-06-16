import { personT } from "../../api/getPerson";
import { personCreditsT } from "../../api/getPersonCredits";

interface Props {
    dataPerson: personT;
}

const PersonalInfo = ({ dataPerson }: Props) => {
    return (
        <div className="flex flex-col text-start  md:items-start  max-w-[100%] md:max-w-[30%] lg:max-w-[25%] gap-4">
            <div className="relative md:static self-center min-h-[240px] max-w-[180px] min-w-[180px] md:max-w-full">
                <img
                    className={`${
                        dataPerson.profile_path === null && "hidden"
                    } absolute object-cover object-top w-full h-full rounded-[5px]  md:max-w-[100%]  md:static`}
                    src={`https://image.tmdb.org/t/p/original${dataPerson.profile_path}`}
                    alt="Actor's picture"
                />
            </div>

            <h1 className="poppins text-center text-white text-4xl font-semibold md:hidden mt-2">
                {dataPerson.name}
            </h1>

            <div className="flex flex-col gap-5 mt-5 md:mt-2 md:w-full">
                <h2 className="poppins text-white text-2xl md:text-3xl font-medium">
                    Personal Info
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2  w-full gap-y-8 md:gap-x-5 ">
                    <h3 className="whitespace-nowrap poppins text-white text-xl font-semibold">
                        Known for
                        <br />
                        <span className="font-normal">
                            {dataPerson.known_for_department}
                        </span>
                    </h3>

                    <h3 className="whitespace-nowrap poppins text-white text-xl font-semibold">
                        Gender
                        <br />
                        <span className="font-normal">
                            {dataPerson.gender === 1 ? "Female" : "Male"}
                        </span>
                    </h3>

                    <h3 className="whitespace-nowrap poppins text-white text-xl font-semibold">
                        Birthday
                        <br />
                        <span className="font-normal">
                            {dataPerson.birthday}
                        </span>
                    </h3>

                    <h3 className=" poppins text-white text-xl font-semibold">
                        Place of Birth
                        <br />
                        <span className="font-normal whitespace-normal">
                            {dataPerson.place_of_birth}
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
