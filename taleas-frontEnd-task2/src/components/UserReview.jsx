import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/${userId}/reviews`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching user reviews:", error);
      });
  }, [userId]);

  return (
    <div>
      <h3>Your Reviews:</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p><strong>Book:</strong> {review.bookId.title} by {review.bookId.author}</p>
              <p><strong>Rating:</strong> {review.rating} / 5</p>
              <p><strong>Review:</strong> {review.content}</p>
              <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default UserReviews;
