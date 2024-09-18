import classes from './Button.module.css';

const Button = ({ onClick, children, type = "button", style = {}, className = "" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${classes.button} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
