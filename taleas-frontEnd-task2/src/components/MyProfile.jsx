import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import classes from './MyProfile.module.css'


const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching user data:", error);
      });
  }, [userId]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.container}>
      <h1>My Profile</h1>
      <p><strong>Username:</strong> {userData.userName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Is Admin:</strong> {userData.isAdmin ? "Yes" : "No"}</p>

      <h3>Your Comments:</h3>
      {userData.userComments.length > 0 ? (
        <ul>
          {userData.userComments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      <h3>Purchased Books:</h3>
      {userData.purchasedBooks.length > 0 ? (
        <ul>
          {userData.purchasedBooks.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      ) : (
        <p>No books purchased yet.</p>
      )}
    </div>
  );
};

export default MyProfile;
