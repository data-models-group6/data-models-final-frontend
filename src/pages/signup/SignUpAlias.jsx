import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

import { registerUser } from "../../utils/authUtils"; 
import AuthButton from "../../components/auth/AuthButton";
import classes from "./SignUpAlias.module.css";

function SignUpAlias() {
    const navigate = useNavigate();
    const location = useLocation();

    const prevData = location.state || {};

    const [nickname, setNickname] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = async () => {
        if (!nickname.trim()) return;

        setIsLoading(true);

        try {
            const finalUserData = {
                ...prevData,
                display_name: nickname
            };

            console.log("正在註冊使用者...", finalUserData);

            await registerUser(finalUserData);

            alert("註冊成功！");
            navigate("/");

        } catch (error) {
            console.error("註冊失敗:", error);
            alert(error.message || "註冊失敗，請稍後再試");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <button
                    className={classes.backButton}
                    onClick={() => navigate(-1)}
                    disabled={isLoading}
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
                placeholder="輸入暱稱"
                disabled={isLoading}
            />
            <div className={classes.footer}>
                <AuthButton
                    label={isLoading ? "註冊中..." : "建立帳號"} 
                    onClick={handleContinue}
                    disabled={!nickname.trim() || isLoading}
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