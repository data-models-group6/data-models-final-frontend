import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import { FaChevronLeft } from "react-icons/fa";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const showConfirmError =
        confirmPassword.length > 0 && confirmPassword !== password;

    return (
        <div>
            <header className={classes.header}>
                <button
                    className={classes.backButton}
                    onClick={() => navigate(-1)}
                >
                    <FaChevronLeft />
                </button>
                <div className={classes.title}>Sign up</div>
            </header>
            <AuthInput label="First name" placeholder="Enter your first name" />
            <div className={classes.sizedBox25}></div>
            <AuthInput label="Last name" placeholder="Enter your last name" />
            <div className={classes.sizedBox25}></div>
            <AuthInput
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <div className={classes.sizedBox25}></div>
            <AuthInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className={classes.sizedBox25}></div>
            <AuthInput
                label="Confirm Password"
                type="password"
                placeholder="Enter your password again"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className={classes.hint}>
                {showConfirmError && "Passwords do not match."}
            </div>
            <div className={classes.sizedBox12}></div>
            <AuthButton label="Continue" />
        </div>
    );
}

export default SignUp;
