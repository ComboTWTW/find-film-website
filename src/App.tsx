import { BrowserRouter  as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Home'
import { auth } from "./config/firebase"
import { onAuthStateChanged } from "firebase/auth";
import Movie from './pages/Movie'

const App = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        enabled: false,
      },
    },
  })


  enum loginTypes {
    signup = 'signup',
    login = 'login',
  };




  const [isSigned, setIsSigned] = useState<boolean | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsSigned(true)
        } else {
          setIsSigned(false)
        }
      });
}, [])

  return (
    <QueryClientProvider client={queryClient} >
    <Router >
      <div className='overflow-hidden bg-bgMain min-h-screen'>
        <Navbar />
          <Routes>
            <Route path={'/'} element={<Home />}/>
            <Route path={'/movies'} element={<h1 className='text-white'>movies</h1>}/>
            <Route path={'/shows'} element={<h1 className='text-white'>shows</h1>}/>
            <Route path={'/people'} element={<h1 className='text-white'>people</h1>}/>
            <Route path={'/about'} element={<h1 className='text-white'>about</h1>}/>

              {/* Individual pages */}
              <Route path={'/movie/?'} element={<Movie />}/>
              <Route path={'/tv/?'} element={<Movie />}/>
              {/* Private */}
            <Route path={'/login'} element={isSigned === false ? <Login loginType={loginTypes.login}/> : isSigned === true && <Navigate to="/" />}/>
            <Route path={'/signup'} element={isSigned === false ? <SignUp loginType={loginTypes.signup}/> : isSigned === true && <Navigate to="/" />}/>

            <Route path={'*'} element={<h1>404 Not Found</h1>}/>
          </Routes>
      </div>
    </Router>
    </QueryClientProvider>
  )
}

export default App