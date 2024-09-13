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
        const recommendedBooks = response.data.recommendedBooks || [];
        if (recommendedBooks.length > 0) {
          const bookIds = recommendedBooks.map(book => book._id).join(',');
          console.log('Fetching books for IDs:', bookIds);
          if (bookIds) {
            return axios.get(`http://localhost:5000/api/books/ids?ids=${bookIds}`);
          }
        }
        return { data: { books: [], missingBookIds: [], message: 'No books found' } };
      })
      .then((response) => {
        console.log('Recommended Books:', response.data);
        setRecommendedBooks(response.data.books || []);
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
    <img src={publicFigure.imageUrl} className={classes.figureImg}/>
    <h1>{publicFigure.name}</h1>
    <h2>{bookCount} {bookText} by {publicFigure.name}</h2>
    <p className={classes.description}>{publicFigure.name} is a {publicFigure.description}</p>

  <p>Below you can find books recommended by {publicFigure.name}</p>

  <ul className={classes.recommendedBookList}>
        {recommendedBooks.map((book) => (
          <li key={book._id} onClick={() => handleNavigate(book._id)} className={classes.bookCard}>
          <img src={book.imageUrl}/>
          <div className={classes.bookInfo}>
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
          </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PublicFigureDetails