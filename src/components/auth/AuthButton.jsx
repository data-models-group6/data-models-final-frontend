import classes from "./AuthButton.module.css";

// variant 預設為 'primary'
function AuthButton({ icon, label, onClick, ...props }) {
  return (
    <button className={classes.baseButton} onClick={onClick} {...props}>
      {icon && <span className={classes.icon}>{icon}</span>}
      {label}
    </button>
  );
}

export default AuthButton;
