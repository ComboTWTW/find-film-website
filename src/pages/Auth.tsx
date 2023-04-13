import { googleLogo } from "../assets";


interface Props {
    loginType: string;
}  

const Auth = ({loginType}:Props) => {
  return (
    <div className='w-full relative flex justify-center'>
        <div className="max-w-[1300px] flex flex-col text-center items-center mt-12 px-4 md:px-0">
            <h1 className='poppins text-white font-bold text-4xl'>{loginType === 'login' ? 'Welcome Back!' : "Let's get you set up"}</h1>
            <button className='bg-white rounded-[5px] flex flex-row items-center justify-center gap-5 py-4 px-10 poppins font-semibold mt-10'><img src={googleLogo} alt="googleLogo" className="w-[20px] h-auto"/>{loginType === 'login' ? 'Sign In' : "Register"} via Google</button>
        </div>
    </div>
  )
}

export default Auth