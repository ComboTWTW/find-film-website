import { auth } from "../config/firebase"
import { search } from "../api/search"

const Home = () => {

  return (
    <div className="w-full flex justify-center">
      <button  className='bg-white rounded-[5px] mt-10 font-semibold text-lg p-5'>Search</button>
    </div>
  )
}

export default Home