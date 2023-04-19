import { auth } from "../../config/firebase"
import AuthPopUp from "./AuthPopUp"
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import {useEffect} from 'react'

const PopUpUser = () => {

  const user = auth.currentUser;

  useEffect(() => {
    if (window.location.search.includes('reloadDocument')) {
      window.location.search = '?';
      window.location.reload();
    }
  }, []);

  const signOutCall = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error(error)
    }
  }

  return (user !== null ?
    <div className="z-50 flex flex-col justify-start items-start md:bg-darkLighter md:rounded-[5px] md:py-5 md:px-5 gap-5 md:min-w-[200px] md:max-w-[200px]">
        <NavLink to='/'><h3 className="poppins leading-snug text-white font-semibold text-base overflow-hidden">{user.displayName}<br/><span className="text-xs font-medium text-lightGray">View Profile</span></h3></NavLink>

        <button onClick={() => signOutCall()} className="poppins text-white text-base font-semibold border border-white rounded-[5px] p-2 logoutButton">Sign Out</button>
    </div>
    : <AuthPopUp />
  )
}

export default PopUpUser