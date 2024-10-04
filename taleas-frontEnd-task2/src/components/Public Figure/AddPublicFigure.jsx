import { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import classes from "./AddPublicFigure.module.css";

const AddPublicFigure = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [industryInput, setIndustryInput] = useState("");
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/industries")
      .then((response) => {
        setIndustries(response.data);
      })
      .catch((error) => {
        console.log("Error fetching industries", error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/books")
      .then((response) => {
        setAllBooks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching books", error);
      });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createPublicFigure = (e) => {
    e.preventDefault();
    const dataToSend = {
      name,
      description,
      industries: selectedIndustries,
      recommendedBooks,
      imageUrl: imageFile,
    };

    console.log(dataToSend);
    api
      .post("/publicFigure", dataToSend)

      .then((res) => {
        console.log(res);
        setName("");
        setDescription("");
        setImageFile(null);
        setIndustries([""]);
        setRecommendedBooks([]);
        navigate("/publicFigures");
      })
      .catch((err) => {
        console.log("Error creating Public Figure", err);
      });
  };

  const toggleIndustry = (industryId) => {
    if (selectedIndustries.includes(industryId)) {
      setSelectedIndustries(
        selectedIndustries.filter((id) => id !== industryId)
      );
    } else {
      setSelectedIndustries([...selectedIndustries, industryId]);
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
        <label htmlFor="file-upload">
          Upload Public Figure Image:
          <input
            id="file-upload"
            className={classes.fileInput}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <div>
        <label>Industries this Public Figure is a part of:</label>
        <ul className={classes.industriesList}>
          {industries.map((industry) => (
            <li
              key={industry._id}
              className={`${classes.industryItem} ${
                selectedIndustries.includes(industry._id)
                  ? classes.selected
                  : ""
              }`}
              onClick={() => toggleIndustry(industry._id)}
            >
              {industry.name}
            </li>
          ))}
        </ul>

        <div>
          <h4>Selected Industries:</h4>
          <ul className={classes.selectedIndustries}>
            {selectedIndustries.map((industryId, index) => {
              const selectedIndustry = industries.find(
                (ind) => ind._id === industryId
              );
              return (
                <li key={index} onClick={() => toggleIndustry(industryId)}>
                  {selectedIndustry
                    ? selectedIndustry.name
                    : "Industry not found"}
                </li>
              );
            })}
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
