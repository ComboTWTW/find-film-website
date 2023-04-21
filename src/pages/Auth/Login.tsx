import AuthTop from "../../components/AuthTop"
import { styles } from "../../constants";
import { useState } from 'react'
import { login } from "../../functions/AuthFunctions/login";

interface Props {
    loginType: string;
}  

interface authDataLoginT  {
  email: string;
  password: string;
}

const Login = ({loginType}:Props) => {

  const [authDataLogin, setAuthDataLogin] = useState<authDataLoginT>({
    email: '',
    password: '',
  })

  const handleAuthChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputType = e.target.id;
    setAuthDataLogin({...authDataLogin, [inputType]: e.target.value})
  }
    
  return (
    <div className='w-full relative flex justify-center'>
        <div className="max-w-[1300px] flex flex-col text-center items-center mt-12 px-4 md:px-0">
            {/* Top Section of the Page*/}
            <AuthTop loginType={loginType}/>
        
            <form className="flex flex-col gap-2 mt-10">

              <input id='email' onChange={(e) => handleAuthChange(e)} placeholder='Email' type="email" className={` ${styles.authInput}`}/>

              <input id='password' onChange={(e) => handleAuthChange(e)} placeholder='Password' type="password" className={` ${styles.authInput}`}/>

              <button onClick={() => login(authDataLogin)} className="poppins text-white text-xl bgGradient font-semibold rounded-full py-4 px-20 mt-10">{loginType === 'login' ? 'Sign In' : "Register"}</button>

            </form>

            <a href="" className={`${loginType === 'signup' && 'hidden'} poppins text-gray-500 text-sm mt-5`}>Forgot your password?</a>

            

        </div>
    </div>

  )
}

export default Login