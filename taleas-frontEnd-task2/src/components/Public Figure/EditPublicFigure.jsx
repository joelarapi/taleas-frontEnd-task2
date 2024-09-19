import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import classes from "./EditPublicFigure.module.css";
import Button from "../Button";

const EditPublicFigure = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publicFigure, setPublicFigure] = useState({
    name: "",
    description: "",
    imageUrl: "",
    recommendedBooks: [{}],
    industries: [], 
  });
  const [allBooks, setAllBooks] = useState([]);
  const [allIndustries, setAllIndustries] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]); 

  useEffect(() => {
    api
      .get(`/publicFigure/${id}`)
      .then((response) => {
        const figureData = response.data;
        setPublicFigure(figureData);
        setSelectedIndustries(figureData.industries || []); 

        const recommendedBooks = figureData.recommendedBooks || [];
        if (recommendedBooks.length > 0) {
          const bookIds = recommendedBooks.map((book) => book._id).join(",");
          if (bookIds) {
            return api.get(
              `/books/ids?ids=${bookIds}`
            );
          }
        }
        return { data: { books: [], missingBooksIds: [], message: "No books found" } };
      })
      .then((response) => {
        setRecommendedBooks(response.data.books || []);
      })
      .catch((error) => {
        console.error("There was an error fetching public figure data!", error);
      });

      api
      .get("/books")
      .then((response) => {
        setAllBooks(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the list of books", error);
      });

   
      api
      .get("/industries")
      .then((response) => {
        setAllIndustries(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the list of industries", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicFigure({ ...publicFigure, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPublicFigure = {
      ...publicFigure,
      recommendedBooks: recommendedBooks.map((book) => book._id),
      industries: selectedIndustries, 
    };

    axios
      .put(`http://localhost:5000/api/publicFigure/${id}`, updatedPublicFigure)
      .then((response) => {
        console.log("Public figure updated:", response.data);
        navigate(`/publicFigure/${id}`);
      })
      .catch((error) => {
        console.error("There was an error updating public figure!", error);
      });
  };

  const handleRemoveBook = (bookIdToRemove) => {
    const updatedBooks = recommendedBooks.filter(
      (book) => book._id !== bookIdToRemove
    );
    setRecommendedBooks(updatedBooks);
    setPublicFigure({ ...publicFigure, recommendedBooks: updatedBooks });
  };

  const handleSelectBook = (e) => {
    const selectedBookId = e.target.value;
    const selectedBook = allBooks.find((book) => book._id === selectedBookId);

    if (
      selectedBook &&
      !recommendedBooks.some((book) => book._id === selectedBook._id)
    ) {
      setRecommendedBooks((prevBooks) => [...prevBooks, selectedBook]);
    }
  };

  const handleSelectIndustry = (industryId) => {
    setSelectedIndustries((prevIndustries) =>
      prevIndustries.includes(industryId)
        ? prevIndustries.filter((id) => id !== industryId)
        : [...prevIndustries, industryId] 
    );
  };

  const handleRemoveIndustry = (industryId) => {
    setSelectedIndustries((prevIndustries) =>
      prevIndustries.filter((id) => id !== industryId)
    );
  };

  if (!publicFigure) {
    return <p>Loading...</p>;
  }

  return (
    <form className={classes.mainContainer}>
      <div className={classes.container}>
        <img src={publicFigure.imageUrl} className={classes.figureImage} />

        <div className={classes.group}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={publicFigure.name}
            onChange={handleChange}
          />
        </div>

        <div className={classes.group}>
          <label>Description:</label>
          <textarea
            name="description"
            value={publicFigure.description}
            onChange={handleChange}
          />
        </div>

        <div className={classes.group}>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={publicFigure.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className={classes.availableIndustries}>
          <label>Available Industries:</label>
          <ul className={classes.industryList}>
            {allIndustries.map((industry) => (
              <li
                key={industry._id}
                onClick={() => handleSelectIndustry(industry._id)}
                className={classes.industryItem}
              >
                {industry.name}
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.industryGroup}>
          <label>Selected Industries:</label>
          <ul className={classes.selectedIndustryList}>
            {selectedIndustries.map((industryId) => {
              const industry = allIndustries.find((ind) => ind._id === industryId);
              return (
                <li key={industryId}    onClick={() => handleRemoveIndustry(industryId)} className={classes.industryItem}>
                  {industry ? industry.name : "Industry not found"}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={classes.group}>
          <label>Add a Book Recommendation:</label>
          <select onChange={handleSelectBook} defaultValue="">
            <option value="">Select a Book</option>
            {allBooks.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <label className={classes.bookRecommendTxt}>Recommended books:</label>
        <div className={classes.bookRecommendations}>
          <ul className={classes.recommendedBookList}>
            {recommendedBooks.map((book) => (
              <li key={book._id} className={classes.bookCard} onClick={() => handleRemoveBook(book._id)}>
                <img src={book.imageUrl} className={classes.bookImage} />
                <p>{book.title || "Book not found"}</p>
              </li>
            ))}
          </ul>
        </div>

        <Button
          type="submit"
          className={classes.submitBttn}
          onClick={handleSubmit}
        >
          Update Public Figure
        </Button>
      </div>
    </form>
  );
};

export default EditPublicFigure;
