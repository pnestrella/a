
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './components/Index';
import Test from './components/Test';

function App() {
 


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='test' element={<Test/>} />

      </Routes>
    </BrowserRouter>
   
  )
}

export default App
