import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

import AuthButton from "../../components/auth/AuthButton";
import classes from "./SignUpAlias.module.css";

function SignUpAlias() {
    const navigate = useNavigate();
    const location = useLocation();

    const [nickname, setNickname] = useState("");

    const prevData = location.state || {};

    const handleContinue = () => {
        if (!nickname.trim()) return;

        navigate("/auth/signup/birthday", {
            state: { ...prevData, nickname },
        });
    };

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <button
                    className={classes.backButton}
                    onClick={() => navigate(-1)}
                >
                    <FaChevronLeft />
                </button>
            </header>
            <div className={classes.textWrapper}>
                <h1 className={classes.mainTitle}>你的名字叫...</h1>
                <div className={classes.subTitle}>這將是你在 EchoMeet 中的暱稱</div>
            </div>
            <input
                type="text"
                className={classes.nameInput}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <div className={classes.footer}>
                <AuthButton
                    label="繼續"
                    onClick={handleContinue}
                    disabled={!nickname.trim()}
                    style={{
                        width: "75%",
                        margin: "0 auto",
                    }}
                />
            </div>
        </div>
    );
}

export default SignUpAlias;
