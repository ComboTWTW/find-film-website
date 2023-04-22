import AuthTop from "../../components/AuthTop"
import { styles } from "../../constants";
import { useState } from 'react'
import { authDataValidationSignUp } from "../../functions/AuthFunctions/authDataValidation";
import { signUp } from "../../functions/AuthFunctions/signUp";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";






interface Props {
    loginType: string;
}  

interface authDataSignUpT  {
    username: string;
    email: string;
    password: string;
  }

interface errorObject {
    input: string;
    message: string;
  }

const SignUp = ({loginType}:Props) => {

    const [ authDataSignUp, setauthDataSignUp ] = useState<authDataSignUpT>({
        username: '',
        email: '',
        password: '',
    })

    const [ inputError, setInputError ] = useState<errorObject[] | []>([]);

    const [ recaptchaPassed, setRecaptchaPassed] = useState<boolean>(false);

    const handleAuthChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputType = e.target.id;
        setauthDataSignUp({...authDataSignUp, [inputType]: e.target.value})

    }

    const nav = useNavigate();

    const handleSighUp = async (authDataSignUp:authDataSignUpT) => {
        if(authDataValidationSignUp(authDataSignUp).length === 0) {
            try { 
                await signUp(authDataSignUp);
                nav('/', { replace: true } );
    
            } catch(error:any) {
                console.log(error.message)
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setInputError([{
                        input: 'email',
                        message: 'Email already in use'
                      }])
                } else alert('Sorry, there was an error. Try again later.')
            }
        } else {
            setInputError(authDataValidationSignUp(authDataSignUp));
            console.log(inputError)
        }
    }
    
    
    
  return (
    <div className='w-full relative flex justify-center'>
        <div className="max-w-[1300px] flex flex-col text-center items-center mt-12 px-4 md:px-0">
            {/* Top Section of the Page*/}
            <AuthTop loginType={loginType}/>
        
            <form  className="flex flex-col gap-2 mt-10">

                <input  id='username' maxLength={16} onChange={(e) => handleAuthChange(e)} placeholder='First Name' type="text" className={`${styles.authInput}`}/>
                {
                    inputError.length > 0 && inputError.map((err) => {
                        if(err.input === 'username') {
                            return <h1 key={err.input} className='poppins text-red-700 text-sm text-start'>{err.message}</h1>
                        }
                    })
                }

                <input  id='email' onChange={(e) => handleAuthChange(e)} placeholder='Email' type="email" className={` ${styles.authInput}`}/>
                {
                    inputError.length > 0 && inputError.map((err) => {
                        if(err.input === 'email') {
                            return <h1 key={err.input} className='poppins text-red-700 text-sm text-start'>{err.message}</h1>
                        } 
                    })
                }

                <input  id='password' onChange={(e) => handleAuthChange(e)} placeholder='Password' type="password" className={` ${styles.authInput}`}/>
                {
                    inputError.length > 0 && inputError.map((err) => {
                        if(err.input === 'password') {
                            return <h1 key={err.input} className='poppins text-red-700 text-sm text-start'>{err.message}</h1>
                        }
                    })
                }
                <div className="flex justify-center w-full mt-2">
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={() => setRecaptchaPassed(true)}
                        theme="dark"
                    />
                </div>

                <button disabled={recaptchaPassed ? false : true} type="button" onClick={() => handleSighUp(authDataSignUp)}  className="poppins text-white text-xl bgGradient font-semibold rounded-full py-4 mt-2 px-20 disabled:opacity-50">{loginType === 'login' ? 'Sign In' : "Register"}</button>

            </form>


            

        </div>
    </div>
  )
}

export default SignUp