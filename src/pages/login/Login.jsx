import React, { useState } from "react"; // 1. 引入 useState
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import AuthSocialButton from "../../components/auth/AuthSocialButton";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import classes from "./Login.module.css";
import { loginUser } from "../../utils/authUtils"; 

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = async () => {
        if (!email || !password) {
            setErrorMessage("Please enter email or password.");
            return;
        }

        setIsLoading(true);
        setErrorMessage(""); // 清除舊的錯誤訊息

        try {
            const result = await loginUser(email, password);
            localStorage.setItem("userId", result.user_id);
            navigate("/authorization/"); 

        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className={classes.title}>Log in or sign up</div>
            <AuthInput 
                label="Email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
            />
            <div className={classes.sizedBox25}></div>
            <AuthInput 
                label="Password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
            />
            
            <div className={classes.sizedBox12}></div>
            <div className={classes.hint}>
                {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
            </div>
            <AuthButton 
                label={isLoading ? "Logging in..." : "Log in"} 
                onClick={handleLoginClick}
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1 }}
            />

            <div className={classes.dividerWrapper}>
                <div className={classes.line}></div>
                <span className={classes.orText}>or</span>
                <div className={classes.line}></div>
            </div>
            
            <AuthSocialButton label="CONTINUE WITH APPLE" icon={<FaApple style={{ color: "white" }} />} />
            <AuthSocialButton label="CONTINUE WITH GOOGLE" icon={<FcGoogle />} />
            <AuthSocialButton label="CONTINUE WITH FACEBOOK" icon={<FaFacebook style={{ color: "#1877F2" }} />} />
            
            <div className={classes.signUp} onClick={() => navigate("/auth/signup")}>SIGN UP</div>
        </div>
    );
}

export default Login;