import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import PublicFigureDetails from './components/PublicFigureDetails'
import BookDetails from './components/BookDetails'
import Login from './components/Login'
import Register from './components/Register'
import Books from './components/Books'
import PublicFigures from './components/PublicFigures'
import About from './components/About'


function App() {

  return (
    <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/publicFigure/:id' element ={ <PublicFigureDetails/>}/>
      <Route path='/book/:id' element ={ <BookDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/books' element={<Books/>}/>
      <Route path='/publicFigures' element={<PublicFigures/>}/>
      <Route path='/about' element={<About/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
