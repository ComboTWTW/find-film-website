import { personT } from "../../api/getPerson";

interface Props {
    dataPerson: personT;
}

const Biography = ({ dataPerson }: Props) => {
    return (
        <div className="w-full flex flex-col text-start">
            <h1 className="poppins text-white hidden md:block md:text-4xl font-bold">
                {dataPerson.name}
            </h1>

            <h2 className="poppins text-xl font-semibold text-white mt-12">
                Biography
            </h2>

            <p className="poppins text-white text-lg font-light mt-3">
                {dataPerson.biography}
            </p>
        </div>
    );
};

export default Biography;
