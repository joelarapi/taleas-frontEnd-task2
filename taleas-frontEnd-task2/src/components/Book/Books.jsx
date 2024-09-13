import classes from "./Books.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {

    const adminStatus = localStorage.getItem("isAdmin") === "true"; 
    setIsAdmin(adminStatus);
    axios.get("http://localhost:5000/api/books")
    .then((response) => {
      setBooks(response.data);
    }).catch((error) =>{
      console.log("Error fetching public figures", error)
    })
  }, []);

  const handleAddBook = () => {
    navigate("/book/add"); 
  };

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/book/${bookId}`);
        setBooks(books.filter(book => book._id !== bookId)); 
      } catch (error) {
        console.error("Error deleting the book:", error);
      }
    }
  };
  
  return (
    <>
     <div className={classes.headerContainer}>
    <h1 className={classes.header}>Books List</h1>
    {isAdmin && (
        <button className={classes.addButton} onClick={handleAddBook}>Add Book</button>
      )}

    </div>

      <table>
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book</th>
              <th scope="col">Author</th>
              <th scope="col">Publish Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr  key={book._id}>
                <th scope="row">{index + 1}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{new Date(book.publish_date).toLocaleDateString()}</td>
                <td  className={classes.actionCell}>
                <Link to={`/book/${book._id}`}>View</Link>
                {isAdmin && (
                  <>
                   
                    <Link to={`/book/edit/${book._id}`}>Edit</Link>
                 
                    <button 
                      onClick={() => handleDelete(book._id)} 
                      className={classes.deleteButton}
                    >
                      Delete
                    </button>
                  </>
                )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};

export default Books;
