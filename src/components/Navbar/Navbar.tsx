import { navbarLogo, accountLogo, magnifier } from '../../assets/index'
import { NavLink } from 'react-router-dom'
import { navbarLinks } from '../../constants'
import { HamburgerBoring } from 'react-animated-burgers'
import { useState } from 'react'
import SearchBar from './SearchBar'
import AuthPopUp from './AuthPopUp'

const Navbar = () => {

    const [toggle, setToggle] = useState<boolean>(false);


    return (
        <nav className="w-full relative flex justify-center items-center">
            <div className="w-full flex max-w-[1300px] justify-center md:justify-between md:px-6 sm:p-4 lg:p-4">
                    {/* Logo and Links (also mobile Navbar) */}
                <div className="mobileNavbar flex flex-row justify-between items-center md:gap-4 lg:gap-10">  
                        {/* Burger for Mobile */}
                    <div className="sm:block lg:hidden mt-[12px] md:mt-[7px] ">
                        <HamburgerBoring barColor='white' className="p-0" buttonWidth={30} isActive={toggle}  toggleButton={() => setToggle(!toggle)}/> 
                    </div>
                        {/* Logo */}
                    <NavLink reloadDocument to='/'>
                        <div className="flex flex-row justify-center items-center gap-1">
                            <img src={navbarLogo} alt="navbarLogo" className='max-w-[43px] h-auto '/>
                            <h2 className='shrink-0 sansPro font-black text-[white] text-3xl uppercase tracking-wide'>Find Film</h2>
                        </div>
                    </NavLink>
                        {/* Link for Desktop */}
                    <ul className='hidden lg:flex flex-row gap-8 items-center'>
                        {navbarLinks.map((link) => {
                            return <NavLink reloadDocument to={link.path}><li className='poppins text-white text-lg hover:text-[#ffffff7a] '>{link.title}</li></NavLink>
                        })}
                    </ul>
                        {/* Magnifier for Mobile */}
                    <img src={magnifier} alt="magnifier" className='block md:hidden max-w-[20px] h-auto'/>
                    
                </div>   
                    {/* SeacrhBar and Account Section for Desktop */}        
                <div className="hidden md:flex items-center flex-row gap-6">
                    <SearchBar />

                    <img src={accountLogo} alt="navbarLogo" className='active:p-[0.3rem] hover:opacity-80 p-1 cursor-pointer max-w-[38px] h-auto'/> 
                </div>
                  

                <div className={`sm:hidden lg:hidden ${toggle ? 'md:flex left-0' : 'md:flex md:-left-[35%]'} duration-200 absolute  top-[67px] px-24 pt-14 flex justify-center h-screen bg-navbarBg`}>
                    <ul className='flex flex-col gap-8 items-center'>
                        {navbarLinks.map((link) => {
                            return <NavLink reloadDocument to={link.path}><li className='poppins text-white text-lg hover:text-[#9dadbc] '>{link.title}</li></NavLink>
                        })}
                    </ul>
                    <div className="bg-none top-0 h-screen w-screen left-[100%] absolute" onClick={() => setToggle(false)}></div>
                </div>

                <div className={`absolute md:hidden ${toggle ? 'top-[83px] left-0' : 'top-[83px] -left-[100vw]'} min-w-[100vw] h-screen duration-200 pt-10 pb-16  bg-navbarBg`}>
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

                <AuthPopUp />

            </div>
        </nav>
  )
}

export default Navbar