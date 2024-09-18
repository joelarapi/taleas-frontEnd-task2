import classes from "./About.module.css";
import libraryBg from "../icons/libraryBackground.jpeg";
import bookCovers from '../icons/bookCoversIcon.jpeg'

const About = () => {
  return (
    <div className={classes.container}>
      <div className={classes.whoWeTExt}>
        <h1>Who we are ?</h1>
        <p>
          Welcome to Influential Pages, the platform where you can discover what
          books inspire and captivate your favorite public figures. Whether
          you're curious about what motivates successful entrepreneurs, artists,
          athletes, or thought leaders, we've got you covered. Whether you're
          looking for personal development, entertainment, or insights into a
          particular industry, you’ll find a diverse collection of books loved
          by the people you admire most.
        </p>
      </div>

      <img className={classes.libraryBg} src={libraryBg} />

      <div className={classes.main}>
        <div className={classes.ourMissionTxt}>
          <h1>Our mission</h1>
          <p>
            Our mission is to bring you closer to the reading habits of
            influential people, showing the stories, lessons, and knowledge they
            hold dear. With our platform, you can explore book recommendations
            from famous personalities and dive into the same books that have
            shaped their journeys.
          </p>
        </div>
        <img src={bookCovers} className={classes.mainImage}/>
      </div>

      <img className={classes.libraryBg} src={libraryBg} />



<div className={classes.howITWorks}>
        <h1>How it works</h1>
        <div className={classes.lastDiv}>
        <div className={classes.greyCell}>
          <h2>Explore Famous Readers:</h2>
          <p>
            Browse through a collection of profiles from famous people across
            different industries — from authors, actors, and musicians to
            entrepreneurs and athletes.
          </p>
        </div>

        <div className={classes.greyCell}>
          <h2>Discover New Reads:</h2>
          <p>
            Each profile is more than just a list. Our platform highlights why
            these books were meaningful to the person, providing context,
            quotes, or stories behind the books they've read.
          </p>
        </div>
        <div className={classes.greyCell}>
          <h2>Join the Community:</h2>
          <p>
            Love a book that someone recommended? Share your thoughts, write
            reviews, and engage with a community of fellow readers who share
            your interests.
          </p>
        </div> 
</div>

      </div>
    </div>
  );
};

export default About;
