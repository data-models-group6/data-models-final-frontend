import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { FaChevronLeft } from "react-icons/fa";
import classes from "./SignUpFirstPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpFirstPage() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const showConfirmError =
        confirmPassword.length > 0 && confirmPassword !== password;

    const handleContinue = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        navigate("/auth/signup/gender", {
            state: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            },
        });
    };

    return (
        <form onSubmit={handleContinue}>
            <header className={classes.header}>
                <button
                    type="button"
                    className={classes.backButton}
                    onClick={() => navigate(-1)}
                >
                    <FaChevronLeft />
                </button>
                <div className={classes.title}>Sign up</div>
            </header>
            
            <AuthInput 
                label="First name" 
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <div className={classes.sizedBox25}></div>
            
            <AuthInput 
                label="Last name" 
                placeholder="Enter your last name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <div className={classes.sizedBox25}></div>
            
            <AuthInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <div className={classes.sizedBox25}></div>
            
            <AuthInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
            />
            <div className={classes.sizedBox25}></div>
            
            <AuthInput
                label="Confirm Password"
                type="password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            
            <div className={classes.hint}>
                {showConfirmError && "Passwords do not match."}
            </div>
            <div className={classes.sizedBox12}></div>
            <AuthButton label="Continue" /> 
        </form>
    );
}

export default SignUpFirstPage;