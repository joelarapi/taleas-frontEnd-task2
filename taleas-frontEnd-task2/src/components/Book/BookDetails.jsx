import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import classes from "./BookDetails.module.css";
import StarRating from "../StarRating";
import profilePic from '../../icons/profilePic-placeholder.png'
import Button from "../Button";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId) {
      api
        .get(`/book/${bookId}`)
        .then((response) => {
          setBook(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching book details", error);
          setLoading(false);
        });
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId) {
      api
        .get(`/book/${bookId}/reviews`)
        .then((response) => {
          console.log("Fetched reviews:", response.data.reviews);
          setReviews(response.data.reviews);
          setLoading(false);
        })
        .catch((error) => {
          console.log(
            "There was an error fetching the reviews for this book",
            error
          );
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
        <div className={classes.bookAndRating}>
          <img src={book.imageUrl} alt={book.title} />
          <p>
            Book Rating {book.averageRating}{" "}
            <span className={classes.star}>★</span>
          </p>
          <button onClick={navigateToReview}>Add a review</button>
        </div>
        <div className={classes.bookInfo}>
          <h1 className={classes.title}>{book.title} by <span className={classes.author}>{book.author}</span></h1>
          <p className={classes.publishDate}>Published in {new Date(book.publish_date).toLocaleDateString()}</p>
          <div>
            <label className={classes.descriptionLabel}>Description:</label>
            <p className={classes.description}>{book.description}</p>
          </div>
        </div>
      </div>



      <div className={classes.reviews}>
      <div className={classes.reviewHeader}>
      <label>Reviews:</label>
      <div className={classes.revLine}></div>
      </div>

        <div>
          <ul className={classes.reviewList}>
            {reviews.map((review) => (
              <li key={review._id} >
              <div className={classes.userReview}>
              <p><img src={profilePic} className={classes.profileImg}/>{review.userId.userName}</p>
              <StarRating rating={review.rating} readOnly={true} />
              </div>
              
                <p className={classes.content}>{review.content}</p>
                <p className={classes.date}>
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
