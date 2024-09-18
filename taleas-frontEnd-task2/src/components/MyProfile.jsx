import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import classes from './MyProfile.module.css';
import placeholderImage from '../icons/profilePic-placeholder.png';
import Button from "./Button";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching user data:", error);
      });

    axios.get(`http://localhost:5000/api/user/${userId}/reviews`)
      .then(response => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching user reviews:", error);
      });
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.userCard}>
        <h1>My Profile</h1>
        <img src={placeholderImage} className={classes.profileImage} alt="Profile" />
        <p>{userData.userName}</p>
        <p>{userData.email}</p>

        <div className={classes.actions}>
          <Link to={`/profile/user/${userId}/reviews`} className={classes.link}>
            My reviews
          </Link>
          <Link to={`/profile/user/${userId}/settings`} className={classes.link}>
            Account Settings
          </Link>
          <Button onClick={handleLogout} className={classes.link}>
            Log out
          </Button>
        </div>
      </div>

      {/* <h3 id="reviews">Your Reviews:</h3>
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
      )} */}

      <h1>WORK IN PROGRESS ...</h1>
    </div>
  );
};

export default MyProfile;
