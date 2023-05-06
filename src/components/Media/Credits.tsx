import { useQuery } from "react-query"
import { getCredits, crewObjT, crewT } from "../../api/getCredits"
import { useEffect, useState } from "react";

interface Props {
    media: string,
    id: string,
}

const Credits = ({ media, id }:Props) => {

    const { 
        data:crewData, 
        refetch:refetchCrew, 
        isSuccess:isSuccessCrew,
    } = useQuery<crewObjT>(['getCredits', id], () => getCredits(`${id}`, `${media}`));

    const [sortedCrew, setSortedCrew ] = useState<crewT>();

    useEffect(() => {
        refetchCrew();
    }, [])

    useEffect(() => {

        const crewSort = (crewData:crewT) => {
            let newCrew = crewData.sort((a, b) => b.popularity - a.popularity);
            setSortedCrew([...newCrew].slice(0, 3))
        }

        if (isSuccessCrew) {
            crewSort(crewData.crew)
        }
    }, [crewData, isSuccessCrew])

    useEffect(() => {
        console.log(sortedCrew)
    }, [sortedCrew])

  return (
    <ul className="flex flex-row gap-4 md:gap-12 mt-4 mb-10">
        {sortedCrew?.map((creator) => {
            return <li key={creator.id.toString()} className="flex flex-col gap-1 md:gap-0">
                <h2 className="text-lg font-medium leading-snug md:leading-normal">{creator.name}</h2>
                <h2 className="text-base font-normal">{media === 'tv' ? creator.jobs[0].job : creator.job}</h2>
            </li>
        })}
    </ul>
  )
}

export default Credits