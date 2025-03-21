import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {


  return (
    <div className="text-3xl bg-red-500">
      <Navbar />
      <Routes>
        <Route path='/' element={<div>
          Hello auth page this side
        </div>}></Route>
      </Routes>
    </div>
  )
}

export default App
