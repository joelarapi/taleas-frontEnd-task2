import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import classes from './AddBook.module.css'
import Button from "../Button";

const AddBook = () => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publishDate, setPublishDate] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null);  
  const [s3Key, setS3Key] = useState(null);
  const navigate = useNavigate()


  const handleImageUpload = async (file) => {
    const { name: fileName, type: fileType } = file;

    try {
      const response = await api.post("/book/presigned-url", { fileName, fileType });
      console.log("Presigned URL response:", response.data);
      const { uploadUrl, s3Key } = response.data;

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": fileType,
        },
      });

      if (!uploadRes.ok) {
        console.error("Upload response:", await uploadRes.text());
        throw new Error("Failed to upload image to S3");
      }
      setS3Key(s3Key);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

 const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      console.log("File selected: ", file);
      await handleImageUpload(file); 
    }
  };


  const createBook = async (e) => {
    e.preventDefault();
    try {

      const bookData = {
        title: title,
        author: author,
        publish_date: new Date(publishDate).toISOString(),
        description: description,
        s3Key: s3Key
    };

      console.log("Book data being sent:", bookData);
      const res = await api.post("/book", bookData);

      setTitle("");
      setAuthor("");
      setPublishDate("");
      setDescription("");
      setImage(null);
      setS3Key(null);

      navigate("/books");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };



  return (
    <form  className={classes.container} onSubmit={createBook}>

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
        <input 
          type="file" 
          name="image" 
          onChange={handleFileChange} 
          accept="image/*" 
        />
      </div>

    <div>
      <label>Publish Date:</label>
      <input type="date" accept=".jpeg, .jpg, .png" placeholder="Date of Release" value={publishDate} onChange={(e) => setPublishDate(e.target.value)}/>
    </div>

    <Button className={classes.submitBttn} type="submit">Submit Book</Button>
    </form>
  ) 
}

export default AddBook;