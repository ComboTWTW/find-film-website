import { navbarLogo, accountLogo, magnifier, xMark } from "../../assets/index";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants";
import { HamburgerBoring } from "react-animated-burgers";
import { useRef, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import AuthPopUp from "./AuthPopUp";
import { useOnClickOutside } from "usehooks-ts";
import { auth } from "../../config/firebase";
import PopUpUser from "./PopUpUser";
import { onAuthStateChanged } from "firebase/auth";
import SearchPlate from "./SearchPlate";

const Navbar = () => {
    const [toggleBurg, setToggleBurg] = useState<boolean>(false);
    const [toggleMagni, setToggleMagni] = useState<boolean>(false);

    /* State, ref and hook for authPopUp visibility */
    const [authToggle, setAuthToggle] = useState<boolean>(false);
    const authWindow = useRef<any>();
    useOnClickOutside(authWindow, () => setAuthToggle(false));

    /* States for availability of user profile picture */
    const [userPicture, setUserPicture] = useState<string | undefined>(
        undefined
    );
    /* UseEffect for user profile picture states managing */
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && auth.currentUser?.photoURL !== null) {
                setUserPicture(auth.currentUser?.photoURL);
            } else {
                setUserPicture(accountLogo);
            }
        });
    }, []);

    const [activeLink, setActiveLink] = useState("");
    const [showSubLinks, setShowSubLinks] = useState<boolean>(false);

    return (
        <nav className="w-full relative flex justify-center items-center">
            <div className="w-full flex max-w-[1300px] justify-center md:justify-between md:px-6 sm:p-4 lg:p-4">
                {/* Logo and Links (also mobile Navbar) */}
                <div className="mobileNavbar flex flex-row sm:justify-between md:justify-normal items-center md:gap-4 lg:gap-10">
                    {/* Burger for Mobile */}
                    <div className="sm:block lg:hidden mt-[12px] md:mt-[7px] ">
                        <HamburgerBoring
                            barColor="white"
                            className="p-0"
                            buttonWidth={30}
                            isActive={toggleBurg}
                            toggleButton={() => setToggleBurg(!toggleBurg)}
                        />
                    </div>
                    {/* Logo */}
                    <NavLink reloadDocument to="/">
                        <div className="flex flex-row justify-center items-center gap-1">
                            <img
                                src={navbarLogo}
                                alt="navbarLogo"
                                className="max-w-[43px] h-auto "
                            />
                            <h2 className="shrink-0 sansPro font-black text-[white] text-3xl uppercase tracking-wide">
                                Find Film
                            </h2>
                        </div>
                    </NavLink>
                    {/* Link for Desktop */}
                    <ul className="hidden lg:flex flex-row gap-8 items-center">
                        {navbarLinks.map((link) => {
                            const isLinkActive = activeLink === link.id;
                            const isNavLinkDisabled =
                                link.id !== "movies" && link.id !== "tvShows"
                                    ? false
                                    : true;
                            return (
                                <NavLink
                                    onClick={(event) => {
                                        if (isNavLinkDisabled) {
                                            event.preventDefault();
                                        }
                                    }}
                                    to={link.path}
                                    reloadDocument={true}
                                >
                                    <li
                                        onMouseEnter={() => {
                                            setShowSubLinks(true);
                                            setActiveLink(link.id);
                                        }}
                                        onMouseLeave={() =>
                                            setShowSubLinks(false)
                                        }
                                        className="relative poppins text-white text-lg  "
                                        key={link.id}
                                    >
                                        <h4 className="cursor-pointer py-1">
                                            {link.title}
                                        </h4>
                                        <ul
                                            className={`
                                        ${!isLinkActive && "hidden"}
                                        ${
                                            !showSubLinks && "hidden"
                                        } z-[5] absolute w-fit   flex flex-col gap-[2px] top-full bg-darkLighter py-3 rounded-[5px] ${
                                                link.id !== "movies" &&
                                                link.id !== "tvShows" &&
                                                "hidden"
                                            }`}
                                        >
                                            {link.subPage?.map((subLink) => {
                                                return (
                                                    <NavLink
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                        }}
                                                        reloadDocument={true}
                                                        to={subLink.path}
                                                    >
                                                        <li
                                                            key={link.id}
                                                            className="  px-5  whitespace-nowrap relative poppins text-white text-lg hover:text-[#ffffff7a] cursor-pointer"
                                                        >
                                                            {subLink?.title}
                                                        </li>
                                                    </NavLink>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                </NavLink>
                            );
                        })}
                    </ul>
                    {/* Magnifier for Mobile */}
                    {!toggleMagni ? (
                        <img
                            src={magnifier}
                            onClick={() => setToggleMagni(true)}
                            alt="magnifier"
                            className="block md:hidden max-w-[20px] h-auto cursor-pointer"
                        />
                    ) : (
                        <img
                            src={xMark}
                            alt="close"
                            onClick={() => setToggleMagni(false)}
                            className="block md:hidden max-w-[20px]  cursor-pointer"
                        />
                    )}
                </div>
                {/* SeacrhBar and Account Section for Desktop */}
                <div className="hidden relative md:flex items-center flex-row gap-6">
                    {/* Search Bar */}
                    <SearchBar />

                    {/* Account Logo and PopUp block */}
                    <span ref={authWindow} className="flex items-center">
                        {/* Accout Logo if there is a picture*/}
                        {auth.currentUser !== null &&
                        auth.currentUser.photoURL?.length !== undefined ? (
                            <button onClick={() => setAuthToggle(!authToggle)}>
                                <img
                                    src={userPicture}
                                    alt=""
                                    className="active:p-[0.08rem] rounded-full hover:opacity-80  cursor-pointer max-w-[40px] h-auto"
                                />
                            </button>
                        ) : (
                            /* Account Logo if there is no picture */
                            <button onClick={() => setAuthToggle(!authToggle)}>
                                <img
                                    src={accountLogo}
                                    alt=""
                                    className="active:p-[0.3rem] hover:opacity-80 p-1 cursor-pointer max-w-[38px] h-auto"
                                />
                            </button>
                        )}
                        {/* Auth PopUp Desktop*/}
                        <div
                            className={`md:${
                                authToggle ? "block " : "hidden"
                            } z-50 md:absolute top-12 right-0`}
                        >
                            {auth.currentUser !== null ? (
                                <PopUpUser
                                    username={auth.currentUser.displayName}
                                />
                            ) : (
                                <AuthPopUp />
                            )}
                        </div>
                    </span>
                </div>

                {/* Medium Desktop Burger Menu */}
                <div
                    className={`sm:hidden lg:hidden ${
                        toggleBurg
                            ? "md:flex left-0"
                            : "md:flex md:-left-full duration-500"
                    } z-50 duration-200 absolute  top-[73px] px-24 pt-14 flex justify-center min-h-full bg-darkLighter pb-14`}
                >
                    <ul className="flex flex-col gap-8 items-center">
                        {navbarLinks.map((link) => {
                            const isLinkActive = activeLink === link.id;
                            const isNavLinkDisabled =
                                link.id !== "movies" && link.id !== "tvShows"
                                    ? false
                                    : true;
                            return (
                                <NavLink
                                    onClick={(event) => {
                                        if (isNavLinkDisabled) {
                                            event.preventDefault();
                                        }
                                    }}
                                    to={link.path}
                                    reloadDocument={true}
                                >
                                    <li
                                        onMouseEnter={() => {
                                            setShowSubLinks(true);
                                            setActiveLink(link.id);
                                        }}
                                        onMouseLeave={() =>
                                            setShowSubLinks(false)
                                        }
                                        className="relative poppins text-white text-lg  "
                                        key={link.id}
                                    >
                                        <h4 className="cursor-pointer py-1">
                                            {link.title}
                                        </h4>
                                        <ul
                                            className={`
                                        ${!isLinkActive && "hidden"}
                                        ${
                                            !showSubLinks && "hidden"
                                        } z-[5] absolute w-fit left-0 right-0 mx-auto  flex flex-col gap-[2px] top-full bg-bgMain py-3 rounded-[5px] ${
                                                link.id !== "movies" &&
                                                link.id !== "tvShows" &&
                                                "hidden"
                                            }`}
                                        >
                                            {link.subPage?.map((subLink) => {
                                                return (
                                                    <NavLink
                                                        reloadDocument={true}
                                                        to={subLink.path}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                        }}
                                                    >
                                                        <li
                                                            key={link.id}
                                                            className="  px-5  whitespace-nowrap relative poppins text-white text-lg hover:text-[#ffffff7a] cursor-pointer"
                                                        >
                                                            {subLink?.title}
                                                        </li>
                                                    </NavLink>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                </NavLink>
                            );
                        })}
                    </ul>
                    <div
                        className={`${
                            !toggleBurg && "hidden"
                        } bg-none top-0 h-screen w-screen left-[100%] absolute`}
                        onClick={() => setToggleBurg(false)}
                    ></div>
                </div>

                {/* Mobile Burger Navbar */}
                <div
                    className={`md:hidden ${
                        toggleBurg
                            ? "top-[73px] left-0"
                            : "top-[73px] -left-full"
                    } min-w-full  absolute duration-200 pt-10 pb-16  bg-darkLighter z-50`}
                >
                    <ul className="flex flex-col gap-6 items-start ml-5">
                        <div className="mb-7">
                            {auth.currentUser !== null ? (
                                <PopUpUser
                                    username={auth.currentUser.displayName}
                                />
                            ) : (
                                <AuthPopUp />
                            )}
                        </div>

                        {navbarLinks.map((link) => {
                            const isLinkActive = activeLink === link.id;
                            const isNavLinkDisabled =
                                link.id !== "movies" && link.id !== "tvShows"
                                    ? false
                                    : true;
                            return (
                                <NavLink
                                    onClick={(event) => {
                                        if (isNavLinkDisabled) {
                                            event.preventDefault();
                                        }
                                    }}
                                    to={link.path}
                                    reloadDocument={true}
                                >
                                    <li
                                        onClick={() => {
                                            setShowSubLinks(true);
                                            setActiveLink(link.id);
                                        }}
                                        onMouseLeave={() =>
                                            setShowSubLinks(false)
                                        }
                                        className="relative poppins text-white text-lg  "
                                        key={link.id}
                                    >
                                        <h4 className="cursor-pointer py-1">
                                            {link.title}
                                        </h4>
                                        <ul
                                            className={`
                                        ${!isLinkActive && "hidden"}
                                        ${
                                            !showSubLinks && "hidden"
                                        } z-[5] absolute w-fit left-0 right-0 mx-auto flex flex-col gap-3 top-full bg-bgMain py-3 rounded-[5px] ${
                                                link.id !== "movies" &&
                                                link.id !== "tvShows" &&
                                                "hidden"
                                            }`}
                                        >
                                            {link.subPage?.map((subLink) => {
                                                return (
                                                    <NavLink
                                                        reloadDocument={true}
                                                        to={subLink.path}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                        }}
                                                    >
                                                        <li
                                                            key={link.id}
                                                            className="  px-5  whitespace-nowrap relative poppins text-white text-xl hover:text-[#ffffff7a] cursor-pointer"
                                                        >
                                                            {subLink?.title}
                                                        </li>
                                                    </NavLink>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                </NavLink>
                            );
                        })}
                    </ul>
                </div>

                {/* Mobile SearchBar */}
                {toggleMagni && (
                    <div className="absolute top-[73px] md:hidden w-full">
                        <SearchBar />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
