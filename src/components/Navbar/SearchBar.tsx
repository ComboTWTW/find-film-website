import { magnifier, xMark } from '../../assets/index'
import { useState } from 'react'

const SearchBar = () => {

    const [input, setInput] = useState<string>("")

    const handleEvent = (e:any) => {
        setInput(e.target.value);
    }

  return (
    <div className="relative">
        <img src={magnifier} alt="magnifier" className='absolute max-w-[18px] h-auto left-3 top-[9px]'/>
        <img src={xMark} alt="xMark" onClick={() => setInput("")} className={`${input != "" ? 'absolute' : 'hidden'} cursor-pointer max-w-[18px] h-auto right-3 top-[8px]`}/>
        <form action="">
            <input value={input} onChange={(e) => handleEvent(e)} placeholder='Type for search...' type="text" className='bg-darkLighter poppins rounded-[5px]  focus:outline-offset-0 focus:outline-1 focus:outline-white py-[5px] pl-[2.3rem] text-white font-light outline-none'/>
        </form>
    </div>  
)
}

export default SearchBar