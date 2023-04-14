import { NavLink } from 'react-router-dom'

const AuthPopUp = () => {
  return (
    <div className="z-50 flex flex-row md:flex-col justify-start items-center md:bg-darkLighter md:rounded-[5px] md:py-5 md:px-3 gap-5">
        <NavLink reloadDocument to='/login'><button className='poppins  font-medium text-lg text-white'>Sign In</button></NavLink>
        <NavLink reloadDocument to='/signup'><button className='poppins   font-medium text-lg bg-white rounded-[5px] py-2 px-4'>Sign Up</button></NavLink>
    </div>
  )
}

export default AuthPopUp