import { navbarLogo, accountLogo, magnifier, xMark } from '../../assets/index'
import { NavLink } from 'react-router-dom'
import { navbarLinks } from '../../constants'
import { HamburgerBoring } from 'react-animated-burgers'
import { useRef, useState } from 'react'
import SearchBar from './SearchBar'
import AuthPopUp from './AuthPopUp'
import { useOnClickOutside } from 'usehooks-ts'

const Navbar = () => {

    type searchInput = {
        input: string;
        submit: boolean;
    }

    const [toggleBurg, setToggleBurg] = useState<boolean>(false);
    const [toggleMagni, setToggleMagni] = useState<boolean>(false);
    const [authToggle, setAuthToggle] = useState<boolean>(false);

    const authWindow = useRef<any>();
    useOnClickOutside(authWindow, () => setAuthToggle(false))

    const [searchInput, setSearchInput] = useState<searchInput>({
        input: "",
        submit: false,
    });




    return (
        <nav className="w-full relative flex justify-center items-center">
            <div className="w-full flex max-w-[1300px] justify-center md:justify-between md:px-6 sm:p-4 lg:p-4">
                    {/* Logo and Links (also mobile Navbar) */}
                <div className="mobileNavbar flex flex-row justify-between items-center md:gap-4 lg:gap-10">  
                        {/* Burger for Mobile */}
                    <div className="sm:block lg:hidden mt-[12px] md:mt-[7px] ">
                        <HamburgerBoring barColor='white' className="p-0" buttonWidth={30} isActive={toggleBurg}  toggleButton={() => setToggleBurg(!toggleBurg)}/> 
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
                    {!toggleMagni ?
                        <img src={magnifier} onClick={() => setToggleMagni(true)} alt="magnifier" className='block md:hidden max-w-[20px] h-auto cursor-pointer'/>
                    :  <img src={xMark} alt="close" onClick={() => setToggleMagni(false)} className='block md:hidden max-w-[20px]  cursor-pointer'/>
                    }       
                    
                </div>   
                    {/* SeacrhBar and Account Section for Desktop */}        
                <div className="hidden relative md:flex items-center flex-row gap-6">
                    <SearchBar setSearchInput={setSearchInput}/>
                    <span ref={authWindow} className="flex items-center">
                        <button onClick={() => setAuthToggle(!authToggle)}><img src={accountLogo} alt="navbarLogo" className='active:p-[0.3rem] hover:opacity-80 p-1 cursor-pointer max-w-[38px] h-auto'/></button>

                            {/* Auth PopUp Desktop*/}
                        <div className={`md:${authToggle ? 'block ' : 'hidden'} md:absolute top-12 right-0`}>
                            <AuthPopUp />
                        </div>
                    </span>
                </div>
                  
                    {/* Medium Desktop Burger Menu */}           
                <div className={`sm:hidden lg:hidden ${toggleBurg ? 'md:flex left-0' : 'md:flex md:-left-full duration-500'} duration-200 absolute  top-[73px] px-24 pt-14 flex justify-center h-screen bg-darkLighter`}>
                    <ul className='flex flex-col gap-8 items-center'>
                        {navbarLinks.map((link) => {
                            return <NavLink reloadDocument to={link.path}><li className='poppins text-white text-lg hover:text-[#9dadbc] '>{link.title}</li></NavLink>
                        })}
                    </ul>
                    <div className="bg-none top-0 h-screen w-screen left-[100%] absolute" onClick={() => setToggleBurg(false)}></div>
                </div>

                    {/* Mobile Burger Navbar */}
                <div className={`md:hidden ${toggleBurg ? 'top-[73px] left-0' : 'top-[73px] -left-full'} min-w-full h-screen absolute duration-200 pt-10 pb-16  bg-darkLighter z-50`}>
                    <ul className='flex flex-col gap-6 items-start ml-5'>
                        <a href="#" className='mb-7'>
                            <AuthPopUp />
                        </a>

                        {navbarLinks.map((link) => {
                            return <NavLink reloadDocument to={link.path}><li className='poppins text-white text-lg hover:text-[#9dadbc] '>{link.title}</li></NavLink>
                        })}
                    </ul>
                </div>

                    {/* Mobile SearchBar */}
                {toggleMagni && 
                    <div className="absolute top-[73px] md:hidden w-full">
                        <SearchBar setSearchInput={setSearchInput}/>
                    </div>
                }    
                        

            </div>
        </nav>
  )
}

export default Navbar