import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRating";
import classes from "./AddReview.module.css";

const AddReview = () => {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/${bookId}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the book data", error);
      });
  }, [bookId]);

  const addReview = (event) => {
    event.preventDefault();
    console.log('Rating:', rating);
    console.log('Content:', content);
    const token = localStorage.getItem('accessToken'); 
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId);
    console.log('Token:', token);

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    axios
      .post(
        `http://localhost:5000/api/book/${bookId}/reviews`,
        {
          content,
          rating,
          userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      )
      .then((res) => {
        console.log("Review added successfully:", res.data);
        setContent("");
        setRating(0);
        navigate(`/book/${bookId}`);
      })
      .catch((error) => {
        console.error("There was an error creating this review", error.response || error);
        alert(`Error: ${error.response?.data?.message || 'An unexpected error occurred'}`);
      });
  };

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className={classes.container}>
      <img
        src={book.imageUrl}
        alt={book.title}
      />

      <form onSubmit={addReview} className={classes.reviewContainer}>
        <p>Add Review for {book.title}</p> 

        <div>
          <label>Rating</label>
          <StarRating rating={rating} onChange={(value) => setRating(value)} />
        </div>

        <div className={classes.revText}>
          <label>Your opinion on this book</label>
          <textarea
            placeholder="What did you think of this book ?"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
