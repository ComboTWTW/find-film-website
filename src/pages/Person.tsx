import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getPerson, personT } from "../api/getPerson";
import { getPersonCredits, personCreditsT } from "../api/getPersonCredits";
import { useQuery } from "react-query";
import PersonalInfo from "../components/Person/PersonalInfo";
import { CircularProgress } from "@mui/material";

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
            <div className="w-full max-w-[1300px] px-4 flex flex-col md:flex-row">
                {!isSuccessPerson ? (
                    <CircularProgress size={65} />
                ) : (
                    <PersonalInfo dataPerson={dataPerson} />
                )}
            </div>
        </div>
    );
};

export default Person;
