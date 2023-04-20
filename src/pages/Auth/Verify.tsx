import { useEffect } from 'react'


const Verify = () => {

  useEffect(() => {
    if (window.location.search.includes('reloadDocument')) {
      window.location.search = '?';
      window.location.reload();
    }
    redirectCountdown();
  }, []);

  const redirectCountdown = async () => {

    const countDown = ():Promise<string> => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('resolved')
        }, 3000)
      })
    }
    try {
      await countDown();
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='w-full flex justify-center px-4 md:px-0'>
      <h1 className='poppins text-white text-2xl mt-16 '>Please follow the activation link we sent to your email.</h1>
    </div>
  )
}

export default Verify