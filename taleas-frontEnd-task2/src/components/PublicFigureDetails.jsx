import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import classes from './PublicFigureDetails.module.css'

const PublicFigureDetails = () => {
  const navigate  = useNavigate()
  const {id} = useParams();
  const [publicFigure, setPublicFigure] = useState(null)
  const [recommendedBooks , setRecommendedBooks] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/api/publicFigure/${id}`)
      .then((response) => {
        setPublicFigure(response.data);
        if (response.data.recommendedBooks.length > 0) {
          return axios.get(`http://localhost:5000/api/books`, { params: { ids: response.data.recommendedBooks.join(',') } });
        } else {
          return []; 
        }
      })
      .then((response) => {
        setRecommendedBooks(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching public figure or books", error);
      });
  }, [id]);

  const handleNavigate = (id) => {
    navigate(`/book/${id}`);
  };

  if(!publicFigure){
    return<p>Loading ...</p>
  }
  const bookCount = publicFigure.recommendedBooks.length;
  const bookText = bookCount === 1 ? "book recommended" : "books recommended";
  return (
    <div className={classes.container}>
    
    <h1>{publicFigure.name}</h1>
    <h2>{bookCount} {bookText} by {publicFigure.name}</h2>
    <p>{publicFigure.name} is a {publicFigure.description}</p>

  <p>Below you can find books recommended by {publicFigure.name}</p>

  <ul>
        {recommendedBooks.map((book) => (
          <li key={book._id} onClick={() => handleNavigate(book._id)}>
            <h3>{book.title}</h3>
            <p> by {book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PublicFigureDetails