import { auth } from "../../config/firebase";

import { IoMdPerson } from "react-icons/io";

const ProfileHeader = () => {
    return (
        <div className="w-full flex flex-row items-center gap-5 mt-8 ">
            <div className="relative flex items-center overflow-hidden rounded-full min-w-[80px] min-h-[80px] md:w-[100px] md:h-[100px] border-white border-[3px] border-solid">
                {auth.currentUser?.photoURL === null ? (
                    <IoMdPerson size={125} color="white" />
                ) : (
                    <img
                        src={auth.currentUser?.photoURL}
                        alt="userAvatar"
                        className="absolute object-cover inset-0 h-full w-full"
                    />
                )}
            </div>
            <h1 className="poppins text-white text-3xl md:text-4xl">
                Hi,{" "}
                <span className="font-semibold">
                    {auth.currentUser?.displayName}
                </span>
            </h1>
        </div>
    );
};

export default ProfileHeader;
