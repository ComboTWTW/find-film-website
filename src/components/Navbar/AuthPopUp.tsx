import { NavLink } from 'react-router-dom'

const AuthPopUp = () => {
  return (
    <div className="">
        {/* Auth Mobile */}
      <div className="md:hidden flex flex-row justify-start items-center gap-5">
          <NavLink reloadDocument to='/login'><button className='poppins  font-medium text-lg text-white'>Sign In</button></NavLink>
          <NavLink reloadDocument to='/signup'><button className='poppins   font-medium text-lg bg-white rounded-[5px] py-2 px-4'>Sign Up</button></NavLink>
      </div>

        {/* Auth Desktop */}
      <div className=" hidden md:flex flex-col justify-center items-center bg-darkLighter rounded-[5px] py-5 px-3 gap-5">
        <NavLink reloadDocument to='/login'><button className='poppins  font-medium text-lg text-white'>Sign In</button></NavLink>
        <NavLink reloadDocument to='/signup'><button className='poppins   font-medium text-lg bg-white rounded-[5px] py-2 px-4'>Sign Up</button></NavLink>
      </div>
    </div>
  )
}

export default AuthPopUp