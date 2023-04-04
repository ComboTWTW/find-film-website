import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

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
      <div>
        <Navbar />
          <Routes>
            <Route path={'/'} element={<h1>Main</h1>}/>
            
            <Route path={'*'} element={<h1>404 Not Found</h1>}/>
          </Routes>
      </div>
    </Router>
    </QueryClientProvider>
  )
}

export default App