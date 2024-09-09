import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
    .then((response) => {
      setBooks(response.data);
    }).catch((error) =>{
      console.log("Error fetching public figures", error)
    })
  }, []);
  return (
    <>
      <h1 className={classes.header}>Books List</h1>

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
                <td>{book.publish_date}</td>
                <td>
                <Link to={`/book/${book._id}`}>View</Link>
                <Link to={`/book/edit/${book._id}`}>Edit</Link>
                <Link to={`/book/delete/${book._id}`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};

export default Books;
