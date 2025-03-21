


import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login} from './pages/Login';
import {Home} from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div>
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  


  )
}

export default App
