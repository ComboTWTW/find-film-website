import { googleLogo } from "../../assets";
import { styles } from "../../constants";
import {useState, useEffect} from 'react'
import { authDataValidation } from "../../functions/authDataValidation";
import { signUp } from "../../functions/signUp";
import { useNavigate } from 'react-router-dom'




interface Props {
    loginType: string;
}  

interface authData  {
  username: string;
  email: string;
  password: string;
  loginType: string;
}

const Auth = ({loginType}:Props) => {

  useEffect(() => {
    if (window.location.search.includes('reloadDocument')) {
      window.location.search = '?';
      window.location.reload();
    }
  }, []);
  const [authData, setAuthData] = useState<authData>({
    username: '',
    email: '',
    password: '',
    loginType: loginType,
  })

  const handleAuthChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputType = e.target.id;
    setAuthData({...authData, [inputType]: e.target.value})
  }

  const navigate = useNavigate()
  const authFunc = async (authData:authData) => {
    
    if(authData.loginType === 'signup' && authDataValidation(authData) === true) {
      await signUp(authData);
      window.location.href = '/';
    } else {
      console.log(authDataValidation(authData));
    }

    
  }

  

 

  return (
    <div className='w-full relative flex justify-center'>
        <div className="max-w-[1300px] flex flex-col text-center items-center mt-12 px-4 md:px-0">
            <h1 className='poppins text-white font-bold text-4xl'>{loginType === 'login' ? 'Welcome Back!' : "Let's get you set up"}</h1>
            <button className='bg-white rounded-[5px] flex flex-row items-center justify-center gap-5 py-4 px-10 poppins font-semibold mt-10'><img src={googleLogo} alt="googleLogo" className="w-[20px] h-auto"/>{loginType === 'login' ? 'Sign In' : "Register"} via Google</button>

              {/* Or line */}
            <div className="flex justify-center items-center w-full mt-12">
              <div className="bg-white h-[1px] w-full flex justify-center items-center">
                <div className="bg-bgMain text-white px-2 poppins text-sm">OR</div>
              </div>
            </div>

            <h2 className="poppins text-white font-semibold text-lg mt-10">{loginType === 'login' ? 'Sign In' : "Register"} via Email</h2>
        
            <ul className="flex flex-col gap-2 mt-10">
              <input id='username' maxLength={16} onChange={(e) => handleAuthChange(e)} placeholder='First Name' type="text" className={`${loginType === 'login' && 'hidden'} ${styles.authInput}`}/>
              <input id='email' onChange={(e) => handleAuthChange(e)} placeholder='Email' type="email" className={` ${styles.authInput}`}/>
              <input id='password' onChange={(e) => handleAuthChange(e)} placeholder='Password' type="password" className={` ${styles.authInput}`}/>
            </ul>

            <button onClick={() => authFunc(authData)} className="poppins text-white text-xl bgGradient font-semibold rounded-full py-4 px-20 mt-10">{loginType === 'login' ? 'Sign In' : "Register"}</button>
            <a href="" className={`${loginType === 'signup' && 'hidden'} poppins text-gray-500 text-sm mt-5`}>Forgot your password?</a>
            

        </div>
    </div>
  )
}

export default Auth