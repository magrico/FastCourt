import './App.css'
import {Routes, Route } from 'react-router-dom'
import { NavigationMenuDemo } from '@/components/ui/custom/navbar/navbar'
import Home from '@/pages/Home'
import Players from '@/pages/Players'
import Nonstops from '@/pages/Nonstops'
// import {Button} from '@/components/ui/button'

function App() {
  return (
    <div>
      {/* Navbar will be visible on all pages */}
      <NavigationMenuDemo/>
      
      {/* Routes component groups all our Route definitions */}
      <Routes>
        {/* Each Route maps a URL path to a component */}
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/nonstops" element={<Nonstops />} />
      </Routes>
    </div>
  )
}

export default App
