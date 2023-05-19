import { auth } from "../../config/firebase"
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

interface Props {
  username: string | null;
}

const PopUpUser = ({username}:Props) => {

  const signOutCall = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="z-50 flex flex-col justify-start items-start md:bg-darkLighter md:rounded-[5px] md:py-5 md:px-5 gap-5 md:min-w-[200px] md:max-w-[200px]">
        <NavLink reloadDocument={true} to='/profile'><h3 className="poppins leading-snug text-white font-semibold text-base overflow-hidden">{username}<br/><span className="text-xs font-medium text-lightGray">View Profile</span></h3></NavLink>

        <button onClick={() => signOutCall()} className="poppins text-white text-base font-semibold border border-white rounded-[5px] p-2 logoutButton">Sign Out</button>
    </div>

  )
}

export default PopUpUser