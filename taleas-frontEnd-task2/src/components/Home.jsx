import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import placeholderImage from "../icons/placeholderImage.png";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import mainImage from '../icons/coverImage.jpeg'

const Home = () => {
  const [publicFigures, setPublicFigures] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (id, type) => {
    navigate(`/${type}/${id}`);
  };

  useEffect(() => {
    api
      .get("/publicFigures")
      .then((response) => {
        setPublicFigures(response.data);
      })
      .catch((error) => {
        console.log("Error fetching public figures", error);
      });

      api
      .get("/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);
  return (
    <div className={classes.container}>
      <header className={classes.header}>

        <div className={classes.welcomeText}>
          <h1>
            <span className={classes.appTitle}>Welcome to </span>
            <br />
            Influential Pages
          </h1>
          <p>
            Discover books recommended by influential public figures
            <br /> and explore their insights.
          </p>
        </div>
        <img src={mainImage} />
      </header>

      <div className={classes.quote}>
        <h1>
        <span>
          “The only thing that you absolutely have to know is the location of the library"
          </span>
          <br/>
          Albert Einstein

        </h1>
      </div>

      <div></div>
      <section className={classes.publicFigureSection}>
        <div className={classes.cardHeader}>
          <h1>Featured People</h1>
          <Link to="/publicFigures"> View All Here</Link>
        </div>

        <div className={classes.cardDisplay}>
          {publicFigures.slice(0, 12).map((publicFigure) => (
            <div key={publicFigure._id} className={classes.figureCard}>
              <div
                className={classes.redirectPart}
                onClick={() =>
                  handleCardClick(publicFigure._id, "publicFigure")
                }
              >
                <img
                  src={publicFigure.imageUrl || placeholderImage}
                  alt={publicFigure.name}
                />
                <h3>{publicFigure.name}</h3>
              </div>

              {/* <div className={classes.cardInfo}>
                  <p className={classes.description}>
                    {publicFigure.industries}
                  </p>
                </div> */}
            </div>
          ))}
        </div>
      </section>

      <div className={classes.topBooks}>
        <section className={classes.bookSection}>
          <div className={classes.cardHeader}>
            <h1>Featured Books</h1>
            <Link to="/books"> View All Here</Link>
          </div>

          <div className={classes.cardDisplay}>
            {books.slice(0, 12).map((book) => (
              <div
                key={book._id}
                className={classes.bookCard}
                onClick={() => handleCardClick(book._id, "book")}
              >
                <img src={book.imageUrl || placeholderImage} alt={book.title} />

                <div className={classes.cardInfo}>
                  <h3>{book.title}</h3>
                  <p className={classes.description}>{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
