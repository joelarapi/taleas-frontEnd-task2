import { useState } from 'react';
import classes from './StarRating.module.css'; 

const StarRating = ({ rating, onChange, readOnly = false }) => {
  const [hoverRating, setHoverRating] = useState(null);

  const handleClick = (value) => {
    onChange(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className={classes.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${classes.star} ${rating >= star || hoverRating >= star ? classes.filled : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
