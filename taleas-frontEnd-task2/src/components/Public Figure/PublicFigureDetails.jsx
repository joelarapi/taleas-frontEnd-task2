import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import classes from "./PublicFigureDetails.module.css";
import Button from "../Button";

const PublicFigureDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [publicFigure, setPublicFigure] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [allIndustries, setAllIndustries] = useState([]);
  const [industryMap, setIndustryMap] = useState({});

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  useEffect(() => {

    api
      .get(`/publicFigure/${id}`)
      .then((response) => {
        setPublicFigure(response.data);
        const recommendedBooks = response.data.recommendedBooks || [];
        if (recommendedBooks.length > 0) {
          const bookIds = recommendedBooks.map((book) => book._id).join(",");
          if (bookIds) {
            return api.get(
              `/books/ids?ids=${bookIds}`
            );
          }
        }
        return {
          data: { books: [], missingBooksIds: [], message: "No books found" },
        };
      })
      .then((response) => {
        setRecommendedBooks(response.data.books || []);
      })
      .catch((error) => {
        console.error("There was an error fetching public figure data!", error);
      });


      api
      .get("/industries")
      .then((response) => {
        setAllIndustries(response.data);

        const industryMap = response.data.reduce((map, industry) => {
          map[industry._id] = industry.name;
          return map;
        }, {});
        setIndustryMap(industryMap);
      })
      .catch((error) => {
        console.log(
          "There was an error fetching the list of industries",
          error
        );
      });
  }, [id]);

  const handleNavigate = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleEdit = () => {
    navigate(`/publicFigure/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this public figure?")) {
      api
        .delete(`/publicFigure/${id}`)
        .then(() => {
          navigate("/publicFigures");
        })
        .catch((error) => {
          console.error("There was an error deleting the public figure", error);
        });
    }
  };

  if (!publicFigure) {
    return <p>Loading ...</p>;
  }

  const bookCount = publicFigure.recommendedBooks.length;

  return (
    <div className={classes.container}>

    <div className={classes.publicFigureSection}>
    <div className={classes.publicFigure}>
        <img
          src={publicFigure.imageUrl}
          className={classes.figureImg}
          alt={publicFigure.name}
        />
      </div>


      <div className={classes.figureInfo}>
        <p className={classes.name}>{publicFigure.name}</p>
        <p className={classes.figureDescription}>
          {publicFigure.name} is a {publicFigure.description}
        </p>

        <div className={classes.industriesCell}>
          <h3>Industries this person is a part of :</h3>
          <ul className={classes.industryList}>
            {publicFigure.industries && publicFigure.industries.length > 0 ? (
              publicFigure.industries.map((industryId) => (
                <li key={industryId} className={classes.industries}>
                  {industryMap[industryId] || "Industry not found"}
                </li>
              ))
            ) : (
              <li>No industries listed.</li>
            )}
          </ul>
        </div>

        {isAdmin && (
          <div className={classes.buttons}>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete} className={classes.deleteButton}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  




      <div className={classes.recommendedBooks}>
        <p>Below you can find books recommended by {publicFigure.name}</p>

        <ul className={classes.recommendedBookList}>
          {recommendedBooks.map((book) => (
            <li
              key={book._id}
              onClick={() => handleNavigate(book._id)}
              className={classes.bookCard}
            >
              <img src={book.imageUrl} alt={book.title} />
              <div className={classes.bookInfo}>
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicFigureDetails;
