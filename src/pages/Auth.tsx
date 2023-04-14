import { googleLogo } from "../assets";
import { styles } from "../constants";


interface Props {
    loginType: string;
}  

const Auth = ({loginType}:Props) => {
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
              <input placeholder='First Name' type="text" className={`${loginType === 'login' && 'hidden'} ${styles.authInput}`}/>
              <input placeholder='Email' type="text" className={` ${styles.authInput}`}/>
              <input placeholder='Password' type="password" className={` ${styles.authInput}`}/>
            </ul>

            <button className="poppins text-white text-xl bgGradient font-semibold rounded-full py-4 px-20 mt-10">{loginType === 'login' ? 'Sign In' : "Register"}</button>

        </div>
    </div>
  )
}

export default Auth