import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

import AuthButton from "../../components/auth/AuthButton";
import classes from "./SignUpBirthday.module.css";

const SignUpBirthday = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const prevData = location.state || {};

    // 狀態：日期字串 (格式會是 YYYY-MM-DD)
    const [birthDate, setBirthDate] = useState("");

    const handleContinue = () => {
        if (!birthDate) return;

        console.log("Collected Data:", { ...prevData, birthday: birthDate });

        navigate("/auth/signup/alias", {
            state: { ...prevData, birthday: birthDate },
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
                <h1 className={classes.mainTitle}>你的生日是...</h1>
                <div className={classes.subTitle}>
                    生日為重要個人資訊
                    <br />
                    註冊後只可修改一次，請謹慎填寫
                </div>
            </div>
            <input
                type="date"
                className={classes.dateInput}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
            />
            <div className={classes.helperText}>
                對方只會看到你的年齡，不會顯示你具體的出生日期
            </div>
            <div className={classes.footer}>
                <AuthButton
                    label="繼續"
                    onClick={handleContinue}
                    disabled={!birthDate}
                    style={{ width: "75%", margin: "0 auto" }}
                />
            </div>
        </div>
    );
};

export default SignUpBirthday;
