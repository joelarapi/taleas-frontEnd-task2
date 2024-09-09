import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import PublicFigureDetails from './components/PublicFigureDetails'
import BookDetails from './components/BookDetails'
import Login from './components/Login'


function App() {

  return (
    <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/publicFigure/:id' element ={ <PublicFigureDetails/>}/>
      <Route path='/book/:id' element ={ <BookDetails/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
