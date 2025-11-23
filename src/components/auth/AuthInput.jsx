import classes from "./AuthInput.module.css";

function AuthInput({ label, type="text", placeholder, ...props }) {
  return (
    <div className={classes.inputWrapper}>
      {label && <label className={classes.label}>{label}</label>}
      <input
        className={classes.inputField}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default AuthInput;