import AuthTop from "../../components/AuthTop";
import { styles } from "../../constants";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

interface Props {
    loginType: string;
}

interface authDataLoginT {
    email: string;
    password: string;
}

const Login = ({ loginType }: Props) => {
    const [authDataLogin, setAuthDataLogin] = useState<authDataLoginT>({
        email: "",
        password: "",
    });

    const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputType = e.target.id;
        setAuthDataLogin({ ...authDataLogin, [inputType]: e.target.value });
    };

    const [loginError, setLoginError] = useState<string | null>(null);

    const signIn = async (authDataLogin: authDataLoginT) => {
        try {
            await signInWithEmailAndPassword(
                auth,
                authDataLogin.email,
                authDataLogin.password
            );
        } catch (error: any) {
            console.error(error.code);
            if ((error.code = "auth/wrong-password" || "auth/user-not-found")) {
                setLoginError("Invalid email or password");
            } else {
                setLoginError(
                    "There was unexpected error with the login session"
                );
            }
        }
    };

    return (
        <div className="w-full relative flex justify-center">
            <div className="max-w-[1300px] flex flex-col text-center items-center mt-12 px-4 md:px-0">
                {/* Top Section of the Page*/}
                <AuthTop loginType={loginType} />

                <form className="flex flex-col gap-2 mt-10">
                    {loginError !== null && (
                        <h1 className="poppins text-red-700 text-sm text-start">
                            {loginError}
                        </h1>
                    )}
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

                    <button
                        type="button"
                        onClick={() => signIn(authDataLogin)}
                        className="poppins text-white text-xl bgGradient font-semibold rounded-full py-4 px-20 mt-2"
                    >
                        {loginType === "login" ? "Sign In" : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
