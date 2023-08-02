import { googleLogo } from "../../assets";
import { styles } from "../../constants";
import { useState, useEffect } from "react";
import { authDataValidation } from "../../functions/AuthFunctions/authDataValidation";
import { signUp } from "../../functions/AuthFunctions/signUp";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../config/firebase";
import AuthTop from "../../components/AuthTop";

interface Props {
    loginType: string;
}

interface authData {
    username: string;
    email: string;
    password: string;
    loginType: string;
}

const Auth = ({ loginType }: Props) => {
    useEffect(() => {
        if (window.location.search.includes("reloadDocument")) {
            window.location.search = "?";
            window.location.reload();
        }
    }, []);

    const [authData, setAuthData] = useState<authData>({
        username: "",
        email: "",
        password: "",
        loginType: loginType,
    });

    const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = e.target.id;
        setAuthData({ ...authData, [inputType]: e.target.value });
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            window.location.href = "/";
        } catch (error) {
            console.error(error);
        }
    };

    const authFunc = async (authData: authData) => {
        try {
            if (
                authData.loginType === "signup" &&
                authDataValidation(authData) === true
            ) {
                await signUp(authData);
                window.location.href = "/";
            } else {
                console.log(authDataValidation(authData));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full relative flex justify-center">
            <div className="max-w-[1300px] flex flex-col text-center items-center mt-12 px-4 md:px-0">
                {/* Top Section of the Page*/}
                <AuthTop loginType={loginType} />

                <ul className="flex flex-col gap-2 mt-10">
                    <input
                        id="username"
                        maxLength={16}
                        onChange={(e) => handleAuthChange(e)}
                        placeholder="First Name"
                        type="text"
                        className={`${loginType === "login" && "hidden"} ${
                            styles.authInput
                        }`}
                    />
                    <input
                        id="email"
                        onChange={(e) => handleAuthChange(e)}
                        placeholder="Email"
                        type="email"
                        className={` ${styles.authInput}`}
                    />
                    <input
                        id="password"
                        onChange={(e) => handleAuthChange(e)}
                        placeholder="Password"
                        type="password"
                        className={` ${styles.authInput}`}
                    />
                </ul>

                <button
                    onClick={() => authFunc(authData)}
                    className="poppins text-white text-xl bgGradient font-semibold rounded-full py-4 px-20 mt-10"
                >
                    {loginType === "login" ? "Sign In" : "Register"}
                </button>
                <a
                    href=""
                    className={`${
                        loginType === "signup" && "hidden"
                    } poppins text-gray-500 text-sm mt-5`}
                >
                    Forgot your password?
                </a>
            </div>
        </div>
    );
};

export default Auth;
