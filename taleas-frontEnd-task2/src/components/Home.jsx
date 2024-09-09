import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [publicFigures, setPublicFigures] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/publicFigures")
    .then((response) => {
      setPublicFigures(response.data);
    }).catch((error) =>{
      console.log("Error fetching public figures", error)
    })
  }, []);
  return (
    <>
      <h1 className={classes.header}>Home</h1>

      <table>
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Person</th>
              <th scope="col">Intro</th>
              <th scope="col">Industries</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {publicFigures.map((publicFigure, index) => (
              <tr  key={publicFigure._id}>
                <th scope="row">{index + 1}</th>
                <td>{publicFigure.name}</td>
                <td>{publicFigure.description}</td>
                <td>{publicFigure.industries.join(', ')}</td>
                <td>
                <Link to={`/publicFigure/${publicFigure._id}`}>View</Link>
                <Link to={`/publicFigure/edit/${publicFigure._id}`}>Edit</Link>
                <Link to={`/publicFigure/delete/${publicFigure._id}`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};

export default Home;
