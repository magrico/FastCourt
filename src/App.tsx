import { NavigationMenuDemo } from '@/components/ui/custom/navbar/navbar';
import Home from '@/pages/Home';
import Nonstops from '@/pages/Nonstops';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import {Button} from '@/components/ui/button'

function App() {
  return (
    <div>
      {/* Navbar will be visible on all pages */}
      <NavigationMenuDemo />

      {/* Routes component groups all our Route definitions */}
      <Routes>
        {/* Each Route maps a URL path to a component */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/nonstops" element={<Nonstops />} />
      </Routes>
    </div>
  );
}

export default App;
