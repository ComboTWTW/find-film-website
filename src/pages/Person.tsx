import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getPerson, personT } from "../api/getPerson";
import { getPersonCredits, personCreditsT } from "../api/getPersonCredits";
import { useQuery } from "react-query";
import PersonalInfo from "../components/Person/PersonalInfo";
import { CircularProgress } from "@mui/material";
import Biography from "../components/Person/Biography";
import KnownFor from "../components/Person/KnownFor";
import Directing from "../components/Person/Directing";

const Person = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id: string =
        searchParams.get("id") !== null ? `${searchParams.get("id")}` : "";

    const {
        data: dataPerson,
        refetch: refetchPerson,
        isSuccess: isSuccessPerson,
    } = useQuery<personT>(["getPerson", id], () => getPerson(id));

    const {
        data: dataPersonCredits,
        refetch: refetchPersonCredits,
        isSuccess: isSuccessPersonCredits,
    } = useQuery<personCreditsT>(["getPersonCredits", id], () =>
        getPersonCredits(id)
    );

    useEffect(() => {
        id === "" && navigate("*");
        refetchPerson();
        refetchPersonCredits();
        isSuccessPerson && console.log(dataPersonCredits);
    }, []);

    return (
        <div className="w-full  flex justify-center text-center mt-3">
            <div className="w-full max-w-[1300px] px-4 flex flex-col md:flex-row md:gap-10 ">
                {/* Personal Information */}
                {!isSuccessPerson ? (
                    <CircularProgress size={65} />
                ) : (
                    <div className="max-w-[100%] md:max-w-[25%] md:min-w-[25%]">
                        <PersonalInfo dataPerson={dataPerson} />
                    </div>
                )}
                {/* Biography and Known For Swiper*/}
                {isSuccessPersonCredits && isSuccessPerson && (
                    <div className="flex flex-col lg:mt-14 text-start md:max-w-[68%] lg:min-w-[72%]">
                        <Biography dataPerson={dataPerson} />

                        {dataPersonCredits.cast.length !== 0 && (
                            <KnownFor dataPersonCredits={dataPersonCredits} />
                        )}

                        {dataPersonCredits.crew.length !== 0 && (
                            <Directing dataPersonCredits={dataPersonCredits} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Person;
