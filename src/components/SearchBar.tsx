import { magnifier } from '../assets/index'

const SearchBar = () => {
  return (
    <div className="relative">
        <form action="">
            <input placeholder='Type for search...' type="text" className='bg-[#272a30] poppins rounded-[5px]  focus:outline-offset-0 focus:outline-1 focus:outline-white py-[6px] px-2 w-72 text-white font-light outline-none'/>
        </form>
        <img src={magnifier} alt="magnifier" className='absolute max-w-[18px] h-auto right-[10px] top-[10px]'/>
    </div>  
)
}

export default SearchBar