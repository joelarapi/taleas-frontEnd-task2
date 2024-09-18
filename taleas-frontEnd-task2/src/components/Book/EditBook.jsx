import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from './EditBook.module.css'

const EditBook = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState({
    title: "",
    author:"",
    imageUrl: "",
    publish_date:"",
    description: "",
  })

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/${id}`)
      .then((response) => {
        const fetchedBook = response.data;
        if (fetchedBook.publish_date) {
          fetchedBook.publish_date = new Date(fetchedBook.publish_date).toISOString().split('T')[0];
        }
        setBook(fetchedBook);
      })
      .catch((error) => {
        console.error("There was an error fetching the pet data!", error);
      });
  }, [id]);

  const editBook = (e) => {
    e.preventDefault();

    const formattedPublishDate = new Date(book.publish_date).toISOString();
    const updatedBook = { ...book, publish_date: formattedPublishDate };
    axios
    .put(`http://localhost:5000/api/book/${id}`, book)
    .then((res) =>{
      console.log(res.data)
      navigate('/books')
    })
    .catch((err) =>{
      console.log("Error updating Book", err)
    })
  }

  if (!book) {
    return <p>Loading...</p>;
  }
  return (
    <form className={classes.container} onSubmit={editBook}>
    <div className={classes.bookContainer}>
      <img src={book.imageUrl} alt={book.title} />

      <div className={classes.bookInfo}>

      <div className={classes.group}>
      <label>Book Title</label>
      <input value={book.title} type="text" onChange={(e) =>setBook({...book, title:e.target.value})}/>   
      </div>
    
    <div className={classes.group}>
    <label>Author:</label> 
    <input value={book.author} type="text" onChange={(e) =>setBook({...book, author:e.target.value})}/>
    </div>
      
    <div className={classes.group}>
    <label>ImageURL:</label> 
    <input value={book.imageUrl} type="text" onChange={(e) =>setBook({...book, imageUrl:e.target.value})}/>
    </div>

      <div className={classes.group}>
      <label>Publish Date:</label>
      <input value={book.publish_date} type="date" onChange={(e) =>setBook({...book, publish_date:e.target.value})}/>
      </div>
       
        <div className={classes.group}>
          <label>Description:</label>
          <textarea value={book.description} type="text" onChange={(e) =>setBook({...book, description:e.target.value})}/>
        </div>
      </div>
    </div>

    <button>Edit</button>
</form>
  )
}

export default EditBook