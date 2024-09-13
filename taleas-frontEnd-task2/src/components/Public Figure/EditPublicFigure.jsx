import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import classes from './EditPublicFigure.module.css';

const EditPublicFigure = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publicFigure, setPublicFigure] = useState({
    name: "",
    description: "",
    imageUrl: "",
    recommendedBooks: [] 
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/publicFigure/${id}`)
      .then((response) => {
        setPublicFigure(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching public figure data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicFigure({ ...publicFigure, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/publicFigure/${id}`, publicFigure)
      .then((response) => {
        console.log("Public figure updated:", response.data);
        navigate(`/publicFigure/${id}`);
      })
      .catch((error) => {
        console.error("There was an error updating public figure!", error);
      });
  };

  if (!publicFigure) {
    return <p>Loading...</p>;
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>

    <img src={publicFigure.imageUrl}/>
    <input value={publicFigure.imageUrl} onChange={handleChange}/>
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

      {/* Optional: Include handling for recommended books if needed */}
      {/* <div className={classes.group}>
        <label>Recommended Books:</label>
        // Add logic for handling recommended books
      </div> */}

      <button type="submit">Update Public Figure</button>
    </form>
  );
};

export default EditPublicFigure;
