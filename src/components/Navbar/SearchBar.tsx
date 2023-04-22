import { magnifier, xMark } from '../../assets/index'
import { useState } from 'react'


interface Props {
    setSearchInput: Function;
}



const SearchBar = ({setSearchInput}:Props) => {


    const [inputValue, setInputValue] = useState<string>("")

    const handleEvent = (e:any) => {
        setInputValue(e.target.value);
        setSearchInput({input: e.target.value, submit: false})
    }

    const handleClearcClick = () => {
        setSearchInput({input: null, submit: false});
        setInputValue("");
    }

    const handleSubmitClick = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchInput({input: inputValue, submit: true})
    }

  return (
    <div className="relative z-30">
        <img src={magnifier} alt="magnifier" className='absolute max-w-[18px] h-auto left-3 top-[13px] md:top-[9px]'/>
        <img src={xMark} alt="xMark" onClick={handleClearcClick} className={`${inputValue != "" ? 'absolute' : 'hidden'} cursor-pointer max-w-[14px] h-auto right-3 top-[15px] md:top-[11px]`}/>
        <form onSubmit={(e) => handleSubmitClick(e)}>
            <input value={inputValue} onChange={(e) => handleEvent(e)} placeholder='Type for search...' type="text" className='bg-darkLighter poppins rounded-none md:rounded-[5px]  md:focus:outline-offset-0 md:focus:outline-1 md:focus:outline-gray-400 focus:outline-none py-[10px] md:py-[5px] pl-10 pr-9 md:pl-[2.3rem] md:pr-9 w-full md:max-w-[22rem] text-white font-light outline-none'/>
        </form>
    </div>  
)
}

export default SearchBar