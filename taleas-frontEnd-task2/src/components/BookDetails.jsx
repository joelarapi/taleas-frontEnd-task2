import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./BookDetails.module.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was an error fetching book details", error);
        setLoading(false);
      });

    axios
      .get(`http://localhost:5000/api/book/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching comments", error);
      });
  }, [id]);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/user/${userId}/purchase`, {
        bookId
      });
      alert(response.data.message); 
    } catch (error) {
      console.error("Error purchasing the book:", error);
      alert("Error purchasing the book. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className={classes.container}>
      <h1>{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Publish Date:</strong> {book.publish_date}
      </p>

    <button onClick={handlePurchase}>Purchase Book</button>
      {comments.length > 0 ? (
        <div>
          <h2>Comments:</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                {comment.text}
                {comment.user ? (
                  <span> by {comment.user.userName}</span>
                ) : (
                  <span> by Unknown</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default BookDetails;
