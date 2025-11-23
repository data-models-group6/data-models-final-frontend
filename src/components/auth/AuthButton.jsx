import classes from "./AuthButton.module.css";

// variant 預設為 'primary'
function AuthButton({ label, onClick, ...props }) {
  return (
    <button className={classes.baseButton} onClick={onClick} {...props}>
      {label}
    </button>
  );
}

export default AuthButton;
