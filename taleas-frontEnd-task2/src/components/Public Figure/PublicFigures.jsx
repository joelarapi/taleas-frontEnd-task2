import classes from "./PublicFigures.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PublicFigures = () => {
  const [publicFigures, setPublicFigures] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true"; 
    setIsAdmin(adminStatus);

    axios.get("http://localhost:5000/api/publicFigures")
    .then((response) => {
      setPublicFigures(response.data);
    }).catch((error) =>{
      console.log("Error fetching public figures", error)
    })
  }, []);

  const handleAddPublicFigure = () => {
    navigate("/publicFigure/add"); 
  };

  const handleDelete = async (publicFigure) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/publicFigure/${publicFigure}`);
        setPublicFigures(publicFigures.filter(publicFigure => publicFigure._id !== publicFigure)); 
      } catch (error) {
        console.error("Error deleting the book:", error);
      }
    }
  };

  
  return (
    <>
    <div className={classes.headerContainer}>
    <h1 className={classes.header}>Public Figures List</h1>
    {isAdmin && (
        <button className={classes.addButton} onClick={handleAddPublicFigure}>Add Public Figure</button>
      )}

    </div>

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
                <td className={classes.descriptionCell}>{publicFigure.description}</td>
                <td>{publicFigure.industries.join(', ')}</td>
                <td className={classes.actionCell}>
                <Link to={`/publicFigure/${publicFigure._id}`}>View</Link>
                {isAdmin && (
                  <>
                   
                    <Link to={`/publicFigure/edit/${publicFigure._id}`}>Edit</Link>
                 
                    <button 
                      onClick={() => handleDelete(publicFigure._id)} 
                      className={classes.deleteButton}
                    >
                      Delete
                    </button>
                  </>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};
export default PublicFigures