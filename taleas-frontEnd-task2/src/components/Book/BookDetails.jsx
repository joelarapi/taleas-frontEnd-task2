import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./BookDetails.module.css";
import StarRating from "../StarRating";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId) {
      axios
        .get(`http://localhost:5000/api/book/${bookId}`)
        .then((response) => {
          console.log("Fetched book data:", response.data);  
          setBook(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching book details", error);
          setLoading(false);
        });
    }
  }, [bookId]);

  const navigateToReview = () => {
    navigate(`/addReview/${bookId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  console.log("Book reviews:", book.reviews);

  return (
    <div className={classes.container}>
      <div className={classes.bookContainer}>
        <img src={book.imageUrl} alt={book.title} />

        <div className={classes.bookInfo}>
          <label>Book Title</label>
          <h1>{book.title}</h1>
          <label>Author:</label> 
          <p>{book.author}</p>
          <label>Publish Date:</label>
          <p>{new Date(book.publish_date).toLocaleDateString()}</p>
          <div>
            <label>Description:</label>
            <p>{book.description}</p>
          </div>
        </div>
      </div>

      <button onClick={navigateToReview}>Add a review</button>
</div>
     
    
  );
};

export default BookDetails;