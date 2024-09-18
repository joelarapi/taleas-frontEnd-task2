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
import Missing from "./components/Missing";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/publicFigures" element={<PublicFigures />} />
        <Route path="/publicFigures/:industryName" element={<PublicFigures />} />
        <Route path="/publicFigure/:id" element={<PublicFigureDetails />} />
        <Route path="/about" element={<About />} />

        {/* Protected routes */}
        <Route path="/book/add" element={<ProtectedRoute element={<AddBook />} adminOnly={true} />} />
        <Route path="/book/edit/:id" element={<ProtectedRoute element={<EditBook />} adminOnly={true} />} />
        <Route path="/publicFigure/add" element={<ProtectedRoute element={<AddPublicFigure />} adminOnly={true} />} />
        <Route path="/publicFigure/edit/:id" element={<ProtectedRoute element={<EditPublicFigure />} adminOnly={true} />} />
        <Route path="/profile/user/:userId" element={<ProtectedRoute element={<MyProfile />} />} />
        <Route path="/addReview/:id" element={<ProtectedRoute element={<AddReview />} />} />

        {/* Catch-all route for missing pages */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
