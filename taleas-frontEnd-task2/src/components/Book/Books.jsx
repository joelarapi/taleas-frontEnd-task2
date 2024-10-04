import classes from "./Books.module.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { useUser } from "../../context/UserContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const {user}  =   useUser()

  useEffect(() => {
    api.get("/books")
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
        {user && user.isAdmin && ( 
            <Button onClick={handleNavigate}> Add A Book</Button>
          )}
      </div>
        <div className={classes.bookSection}>
        {books.map((book) => {
          const imageUrl = book.imageUrl
              ? book.imageUrl 
              : 'placeholderImage.png';
              console.log('Book Image URL:', imageUrl);
            return (
              <div
                key={book._id}
                className={classes.bookCard}
                onClick={() => navigate(`/book/${book._id}`)}
              >
                <img
                  src={imageUrl}
                  alt={book.title}
                  className={classes.bookImage}
                />
                <div className={classes.cardInfo}>
                  <h3>{book.title}</h3>
                  <p className={classes.description}>{book.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Books;