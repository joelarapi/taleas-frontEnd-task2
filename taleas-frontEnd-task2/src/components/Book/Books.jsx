import classes from "./Books.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching books", error);
      });
  }, []);

  const handleNavigate = () =>{
    navigate('/book/add')
  }


  return (
    <div className={classes.container}>
     

      <section className={classes.section}>
      <div className={classes.headerContainer}>
        <h1 className={classes.header}>Books List</h1>
        <Button onClick={handleNavigate}> Add A Book</Button>
      </div>
        <div className={classes.bookSection}>
          {books.map((book) => (
            <div
              key={book._id}
              className={classes.bookCard}
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <img src={book.imageUrl} alt={book.title} />
              <div className={classes.cardInfo}>
                <h3>{book.title}</h3>
                <p className={classes.description}>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Books;
