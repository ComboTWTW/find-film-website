import { Fragment } from "react";
import { googleLogo } from "../assets";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../config/firebase";
import { createUserCollection } from "../functions/AuthFunctions/createUserCollection";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
interface Props {
    loginType: string;
}

const AuthTop = ({ loginType }: Props) => {
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            auth.currentUser !== null &&
                (
                    await getDoc(doc(db, "users", auth.currentUser.uid))
                ).data() === undefined &&
                (await createUserCollection(auth.currentUser.uid));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <h1 className="poppins text-white font-bold text-4xl">
                {loginType === "login"
                    ? "Welcome Back!"
                    : "Let's get you set up"}
            </h1>
            {/* Google Button */}
            <button
                onClick={() => signInWithGoogle()}
                className="bg-white rounded-[5px] flex flex-row items-center justify-center gap-5 py-4 px-10 poppins font-semibold mt-10"
            >
                <img
                    src={googleLogo}
                    alt="googleLogo"
                    className="w-[20px] h-auto"
                />
                {loginType === "login" ? "Sign In" : "Register"} via Google
            </button>

            {/* Or line */}
            <div className="flex justify-center items-center w-full mt-12">
                <div className="bg-white h-[1px] w-full flex justify-center items-center">
                    <div className="bg-bgMain text-white px-2 poppins text-sm">
                        OR
                    </div>
                </div>
            </div>
            {/* Third Section */}
            <h2 className="poppins text-white font-semibold text-lg mt-10">
                {loginType === "login" ? "Sign In" : "Register"} via Email
            </h2>
        </Fragment>
    );
};

export default AuthTop;
