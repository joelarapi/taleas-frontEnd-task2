import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from './AddBook.module.css'
import Button from "../Button";

const AddBook = () => {

  const[title, setTitle] = useState("")
  const[author, setAuthor] = useState("")
  const[publishDate, setPublishDate] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const navigate = useNavigate()

  const createBook = (e) => {
    e.preventDefault();

    const formattedPublishDate = new Date(publishDate).toISOString();
    axios.post('http://localhost:5000/api/book',  {
        title,
        author,
        publish_date: formattedPublishDate,
        description,
        imageUrl
      })
      .then((res) => {
        console.log(res);
        setTitle("");
        setAuthor("");
        setImageUrl("");
        setPublishDate("");
        setDescription("")
        navigate("/books");
      })
      .catch((err) => {
        console.log("Error creating book", err);
      });
  };

  return (
    <form onSubmit={createBook} className={classes.container}>

    <div>
      <label>Title:</label>
      <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
    </div>

    <div>
      <label>Author:</label>
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
    </div>


    <div>
      <label>Description:</label>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
    </div>

    <div>
      <label>Image:</label>
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
    </div>

    <div>
      <label>Publish Date:</label>
      <input type="date" placeholder="Date of Release" value={publishDate} onChange={(e) => setPublishDate(e.target.value)}/>
    </div>

    <Button className={classes.submitBttn}>Submit Book</Button>
    </form>
  )
}

export default AddBook