import { accountLogo } from '../../assets/index'

const AuthPopUp = () => {
  return (
    <div className="">
        {/* Auth Mobile */}
      <div className="md:hidden flex flex-row justify-start items-center gap-2">
          <img src={accountLogo} alt="navbarLogo" className='max-w-[40px] h-auto'/> 
          <p className='poppins text-white text-lg'>Sign Up/Sign In</p>
      </div>

        {/* Auth Desktop */}
      <div className="hidden md:flex flex-col justify-center items-center bg-darkLighter rounded-[5px] py-5 px-3 gap-5">
          <button className='poppins  font-medium text-lg text-white'>Sign In</button>
          <button className='poppins   font-medium text-lg bg-white rounded-[5px] py-2 px-4'>Sign Up</button>
      </div>
    </div>
  )
}

export default AuthPopUp