import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthSocialButton from "../components/auth/AuthSocialButton";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div>
            <div className={classes.title}>Log in or sign up</div>
            <AuthInput label="Email" type="email" />
            <div className={classes.sizedBox25}></div>
            <AuthInput label="Password" type="password" />
            <div className={classes.sizedBox12}></div>
            <div className={classes.hint}>
                
            </div>
            <AuthButton label="Log in" />
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
