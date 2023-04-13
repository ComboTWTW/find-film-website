import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Auth from './pages/Auth'

const App = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        enabled: false,
      },
    },
  })

  const [authType, setAuthType] = useState<string>("")

  enum loginTypes {
    signup = 'signup',
    login = 'login',
  };


  return (
    <QueryClientProvider client={queryClient} >
    <Router >
      <div className='overflow-hidden bg-bgMain min-h-screen'>
        <Navbar />
          <Routes>
            <Route path={'/'} element={<h1 className='text-white'>Main</h1>}/>
            <Route path={'/movies'} element={<h1 className='text-white'>movies</h1>}/>
            <Route path={'/shows'} element={<h1 className='text-white'>shows</h1>}/>
            <Route path={'/people'} element={<h1 className='text-white'>people</h1>}/>
            <Route path={'/about'} element={<h1 className='text-white'>about</h1>}/>
            <Route path={'/login'} element={<Auth loginType={loginTypes.login}/>}/>
            <Route path={'/signup'} element={<Auth loginType={loginTypes.signup}/>}/>

            <Route path={'*'} element={<h1>404 Not Found</h1>}/>
          </Routes>
      </div>
    </Router>
    </QueryClientProvider>
  )
}

export default App