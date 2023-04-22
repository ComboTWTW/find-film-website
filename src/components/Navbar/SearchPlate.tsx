

interface Props {
    searchInput: searchInputT,
    plateToggle: boolean,
}

type searchInputT = {
    input: string | null;
    submit: boolean;
}

const SearchPlate = ({searchInput, plateToggle}:Props) => {

    
  return (
    <div className={`z-30 absolute top-11 w-full md:max-w-[22rem] ${plateToggle === true && 'hidden'}`}>
        <div className="bg-darkLighter md:rounded-[5px] md:p-3 overflow-hidden">
            <h3 className="poppins text-white ">{searchInput.input}</h3>
        </div>
    </div>
  )
}

export default SearchPlate