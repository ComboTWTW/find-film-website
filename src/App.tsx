import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Navbar from './components/Navbar'

const App = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        enabled: false,
      },
    },
  })

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

            <Route path={'*'} element={<h1>404 Not Found</h1>}/>
          </Routes>
      </div>
    </Router>
    </QueryClientProvider>
  )
}

export default App