import classes from "./AuthSocialButton.module.css";

function AuthSocialButton({ label, icon, onClick, ...props }) {

    return (
        <button className={classes.baseButton} onClick={onClick} {...props}>
            {icon && <span className={classes.icon}>{icon}</span>}
            {label}
        </button>
    );
};

export default AuthSocialButton;