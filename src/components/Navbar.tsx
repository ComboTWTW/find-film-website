import { navbarLogo, accountLogo } from '../assets/index'
import { NavLink } from 'react-router-dom'
import { navbarLinks } from '../constants'
import { HamburgerBoring } from 'react-animated-burgers'
import { useState } from 'react'
import SearchBar from './SearchBar'

const Navbar = () => {

    const [toggle, setToggle] = useState<boolean>(false);


    return (
        <nav className="w-full relative   bg-navbarBg flex justify-center items-center px-5 md:px-10 md:py-4 py-5">
            <div className="w-full z-20 flex bg-navbarBg justify-between">
                
                <div className="flex flex-row justify-between items-center md:gap-4 lg:gap-10">  
                    <div className="sm:hidden md:block lg:hidden mt-[7px]">
                        <HamburgerBoring barColor='white' className="p-0" buttonWidth={30} isActive={toggle}  toggleButton={() => setToggle(!toggle)}/> 
                    </div>

                    <NavLink reloadDocument to='/'>
                        <div className="flex flex-row  justify-center items-center gap-1">
                            <img src={navbarLogo} alt="navbarLogo" className='max-w-[45px] h-auto '/>
                            <h2 className='shrink-0 poppins font-bold text-[white] text-[1.6rem] uppercase tracking-wide'>Find Film</h2>
                        </div>
                    </NavLink>
                        
                    <ul className='hidden lg:flex flex-row gap-8 items-center'>
                        {navbarLinks.map((link) => {
                            return <NavLink reloadDocument to={link.path}><li className='poppins text-white text-lg hover:text-[#9dadbc] '>{link.title}</li></NavLink>
                        })}
                    </ul>
                </div>   
                
                <div className="hidden md:flex items-center flex-row gap-6">
                    <SearchBar />

                 
                    <img src={accountLogo} alt="navbarLogo" className=' p-1 cursor-pointer max-w-[40px] h-auto md:mr-2'/> 
                </div>
                  

                <div className="md:hidden mt-[13px] mr-1">
                    <HamburgerBoring barColor='white' className="md:hidden p-0" buttonWidth={30} isActive={toggle}  toggleButton={() => setToggle(!toggle)}/> 
                </div>

                <div className={`sm:hidden lg:hidden ${toggle ? 'md:flex left-0' : 'md:flex md:-left-[35%]'} duration-200 absolute  top-[77px] px-24 pt-14 flex justify-center h-screen bg-navbarBg`}>
                    <ul className='flex flex-col gap-8 items-center'>
                        {navbarLinks.map((link) => {
                            return <NavLink reloadDocument to={link.path}><li className='poppins text-white text-lg hover:text-[#9dadbc] '>{link.title}</li></NavLink>
                        })}
                    </ul>
                    <div className="bg-none top-0 h-screen w-screen left-[100%] absolute" onClick={() => setToggle(false)}></div>
                </div>

                <div className={`absolute md:hidden ${toggle ? 'top-[85px] left-0' : 'top-[85px] -left-[100vw]'} min-w-[100vw] h-screen duration-200 pt-10 pb-16  bg-navbarBg`}>
                    <ul className='flex flex-col gap-6 items-start ml-5'>
                    <a href="#" className='mb-7'>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <img src={accountLogo} alt="navbarLogo" className='max-w-[40px] h-auto'/> 
                            <p className='poppins text-white text-lg'>Sign Up/Sign In</p>
                        </div>
                    </a>
                        {navbarLinks.map((link) => {
                            return <NavLink reloadDocument to={link.path}><li className='poppins text-white text-lg hover:text-[#9dadbc] '>{link.title}</li></NavLink>
                        })}
                    </ul>
                </div>

            </div>
        </nav>
  )
}

export default Navbar