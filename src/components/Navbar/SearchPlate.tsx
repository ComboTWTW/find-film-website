import { useQuery } from 'react-query'
import { search } from '../../api/search'
import { useState, useEffect } from 'react'

interface Props {
    searchInput: searchInputT,
    plateToggle: boolean,
}

type searchInputT = {
    input: string;
    submit: boolean;
}

const SearchPlate = ({searchInput, plateToggle}:Props) => {

const { 
    isSuccess, 
    data, 
    refetch, 
    isRefetching, 
    } = useQuery(['search'], () => search(searchInput.input));


    useEffect(() => {
        console.log(searchInput.input)
        setTimeout(() => {
            refetch();
            isSuccess && console.log(data);
        }, 1000)
    }, [searchInput.input])

  return (
    <div className={`z-30 absolute top-11 w-full md:max-w-[22rem] ${plateToggle === true && 'hidden'}`}>
        <div className="bg-darkLighter md:rounded-[5px] md:p-3 overflow-hidden">
            <h3 className="poppins text-white ">{searchInput.input}</h3>
        </div>
    </div>
  )
}

export default SearchPlate