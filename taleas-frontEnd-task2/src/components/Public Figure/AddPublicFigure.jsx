import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./AddPublicFigure.module.css";

const AddPublicFigure = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [industryInput, setIndustryInput] = useState("");
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/industries")
      .then((response) => {
        setIndustries(response.data); 
      })
      .catch((error) => {
        console.log("Error fetching industries", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        setAllBooks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching books", error);
      });
  }, []);

  const createPublicFigure = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/publicFigure',  {
        name,
        description,
        industries: selectedIndustries,
        recommendedBooks,
        imageUrl
      })
      .then((res) => {
        console.log(res);
        setName("");
        setDescription("");
        setImageUrl("");
        setIndustries([""]);
        setRecommendedBooks([]);
        navigate("/publicFigures");
      })
      .catch((err) => {
        console.log("Error creating Public Figure", err);
      });
  };


  const toggleIndustry = (industry) => {
    if (selectedIndustries.includes(industry)) {
      // Remove the industry if already selected
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    } else {
      // Add the industry if not selected
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };



  const handleRemoveIndustry = (indexToRemove) => {
    setIndustries(industries.filter((_, index) => index !== indexToRemove));
  };

  const handleSelectBook = (e) => {
    const selectedBookId = e.target.value;
    const selectedBook = allBooks.find((book) => book._id === selectedBookId);

    if (selectedBook && !recommendedBooks.includes(selectedBook._id)) {
      setRecommendedBooks((prevBooks) => [...prevBooks, selectedBook._id]);
    }
  };

  return (
    <form onSubmit={createPublicFigure} className={classes.container}>
      <div>
        <label>Public Figure Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Description About this Public Figure:</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Image URL:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div>
        <label>Industries this Public Figure is a part of:</label>
        <div className={classes.industriesList}>
          {industries.map((industry) => (
            <span
              key={industry._id}
              className={`${classes.industryItem} ${selectedIndustries.includes(industry.name) ? classes.selected : ''}`}
              onClick={() => toggleIndustry(industry.name)}
            >
              {industry.name}
            </span>
          ))}
        </div>

        <div className={classes.selectedIndustries}>
          <h4>Selected Industries:</h4>
          <ul>
            {selectedIndustries.map((industry, index) => (
              <li key={index} onClick={() => toggleIndustry(industry)}>
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div>
        <label>Recommended Books by this Public Figure:</label>
        <select onChange={handleSelectBook} defaultValue="">
          <option value="" disabled>
            Select a book
          </option>
          {allBooks.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>

        <ul className={classes.bookList}>
          {recommendedBooks.map((bookId) => {
            const selectedBook = allBooks.find((book) => book._id === bookId);
            return (
              <li key={bookId} className={classes.bookCard}>
                {selectedBook ? selectedBook.title : "Book not found"}
              </li>
            );
          })}
        </ul>
      </div>

      <button className={classes.submitBttn}>Submit</button>
    </form>
  );
};

export default AddPublicFigure;
