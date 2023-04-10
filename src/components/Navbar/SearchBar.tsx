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

    const afterSubmission = (e:any) => {
        e.preventDefault();
        setSearchInput({input: inputValue, submit: true})
    }

  return (
    <div className="relative">
        <img src={magnifier} alt="magnifier" className='absolute max-w-[18px] h-auto left-3 top-[9px]'/>
        <img src={xMark} alt="xMark" onClick={() => setInputValue("")} className={`${inputValue != "" ? 'absolute' : 'hidden'} cursor-pointer max-w-[18px] h-auto right-3 top-[8px]`}/>
        <form onSubmit={(e) => afterSubmission(e)}>
            <input value={inputValue} onChange={(e) => handleEvent(e)} placeholder='Type for search...' type="text" className='bg-darkLighter poppins rounded-[5px]  focus:outline-offset-0 focus:outline-1 focus:outline-white py-[5px] pl-[2.3rem] pr-9  md:max-w-[22rem] text-white font-light outline-none'/>
        </form>
    </div>  
)
}

export default SearchBar