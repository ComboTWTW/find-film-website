import { Link, NavLink } from "react-router-dom";
import { tmdbLogo } from "../assets";
import {
    IoLogoGithub,
    IoLogoLinkedin,
    IoPersonCircleSharp,
    IoMail,
} from "react-icons/io5";

const Footer = () => {
    return (
        <div className="w-full bg-darkLighter flex justify-center mt-10 md:mt-12">
            <div className="max-w-[1300px] w-full flex flex-col items-start flex-wrap lg:flex-nowrap md:flex-row gap-14 md:justify-evenly md:items-start px-4 pt-8 pb-5">
                {/* TMDB */}
                <div className="flex flex-col gap-3 ">
                    <Link
                        className="max-w-[120px] h-auto"
                        target="_blank"
                        to="https://www.themoviedb.org/"
                    >
                        <div>
                            <img src={tmdbLogo} alt="TMDBLogo" className="" />
                        </div>
                    </Link>
                    <h3 className="poppins text-lg md:text-xl  tracking-wider  text-white font-semibold uppercase">
                        This WebSite uses TMDB API
                    </h3>
                </div>
                {/* Contacts */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="poppins text-2xl md:text-2xl tracking-wider  text-white font-semibold ">
                        Created by Arthur Mets
                    </h3>
                    <ul className="w-full flex  justify-between mt-3">
                        <li>
                            <Link
                                title="Visit GitHub"
                                to="https://github.com/ComboTWTW"
                                target="_blank"
                            >
                                <IoLogoGithub size={60} color="white" />
                            </Link>
                        </li>
                        <li>
                            <Link title="Visit LinkedIn" to="#" target="_blank">
                                <IoLogoLinkedin size={60} color="white" />
                            </Link>
                        </li>
                        <li>
                            <Link title="Visit WebSite" to="#" target="_blank">
                                <IoPersonCircleSharp size={60} color="white" />
                            </Link>
                        </li>
                        <li>
                            <Link title="Email" to="mailto:">
                                <IoMail size={60} color="white" />
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Navigation */}
                <ul className="grid grid-cols-2 gap-x-10  lg:gap-x-14 gap-y-3 text-lg">
                    <NavLink to={`/`} reloadDocument={true}>
                        <li className="poppins text-white md:hover:text-bgMain">
                            Home
                        </li>
                    </NavLink>
                    <NavLink to={`/movie/popular`} reloadDocument={true}>
                        <li className="poppins text-white md:hover:text-bgMain">
                            Popular Movies
                        </li>
                    </NavLink>
                    <NavLink to={`/movie/top-rated`} reloadDocument={true}>
                        <li className="poppins text-white md:hover:text-bgMain">
                            Top Rated Movies
                        </li>
                    </NavLink>
                    <NavLink to={`/tv/popular`} reloadDocument={true}>
                        <li className="poppins text-white md:hover:text-bgMain">
                            Popular TV Shows
                        </li>
                    </NavLink>
                    <NavLink to={`/tv/top-rated`} reloadDocument={true}>
                        <li className="poppins text-white md:hover:text-bgMain">
                            Top Rated TV Shows
                        </li>
                    </NavLink>
                    <NavLink to={`/people`} reloadDocument={true}>
                        <li className="poppins text-white md:hover:text-bgMain">
                            People
                        </li>
                    </NavLink>
                    <NavLink to={`/about`} reloadDocument={true}>
                        <li className="poppins text-white md:hover:text-bgMain">
                            About
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
