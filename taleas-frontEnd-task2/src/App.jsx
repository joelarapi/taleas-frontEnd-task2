import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PublicFigures from "./components/Public Figure/PublicFigures";
import PublicFigureDetails from "./components/Public Figure/PublicFigureDetails";
import AddPublicFigure from "./components/Public Figure/AddPublicFigure";
import AddBook from "./components/Book/AddBook";
import BookDetails from "./components/Book/BookDetails";
import Books from "./components/Book/Books";
import About from "./components/About";
import EditPublicFigure from "./components/Public Figure/EditPublicFigure";
import MyProfile from "./components/MyProfile";
import EditBook from "./components/Book/EditBook";
import AddReview from "./components/AddReview";
import AccountSettings from "./components/AccountSettings";
import UserReviews from "./components/UserReview";

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/add" element={<AddBook />} />
          <Route path="/book/edit/:id" element={<EditBook/>}/>
          <Route path="/publicFigures" element={<PublicFigures />} />
          <Route path="/publicFigures/:industryName" element={<PublicFigures />} />
          <Route path="/publicFigure/:id" element={<PublicFigureDetails />} />
          <Route path="/publicFigure/add" element={<AddPublicFigure />} />
          <Route path="/publicFigure/edit/:id" element={<EditPublicFigure />} />
          <Route path="/publicFigure/:id" element={<PublicFigureDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/user/:userId" element={<MyProfile/>}/>
          {/* <Route path="/profile/user/:userId" element={<MyProfile />}>
          <Route path="settings" element={<AccountSettings/>}/>
          <Route path="/reviews" element={<UserReviews/>}/>
          </Route> */}
          <Route path="/addReview/:id" element={<AddReview/>}/>

        </Routes>

    </>

  );
}

export default App;
