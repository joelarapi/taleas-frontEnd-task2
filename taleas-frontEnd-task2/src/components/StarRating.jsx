import { useState } from 'react';
import classes from './StarRating.module.css'; 

const StarRating = ({ rating, onChange, readOnly = false }) => {
  const [hoverRating, setHoverRating] = useState(null);

  const handleClick = (value) => {
    if (!readOnly) onChange(value); 
  };

  const handleMouseEnter = (value) => {
    if (!readOnly) setHoverRating(value); 
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverRating(null); 
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
