import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

import AuthButton from "../../components/auth/AuthButton";
import classes from "./SignUpGender.module.css";

// 假設你未來會有照片，先定義好路徑 (目前用顏色代替)
// import femaleImg from "../assets/female_avatar.png";
// import maleImg from "../assets/male_avatar.png";

function SignUpGender() {
    const navigate = useNavigate();
    const location = useLocation();

    // 1. 取得上一頁傳來的資料 (如果有用 navigate state 傳遞的話)
    const prevData = location.state || {};

    const [gender, setGender] = useState(null);

    const handleContinue = () => {
        if (!gender) return;

        console.log("Previous Data:", prevData);
        console.log("Selected Gender:", gender);

        // 3. 把資料合併，傳去下一頁 (上傳照片頁)
        navigate("/auth/signup/photo", {
            state: { ...prevData, gender },
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
                <div className={classes.title}>性別選擇</div>
            </header>

            <div className={classes.selectionArea}>
                <div
                    className={classes.optionItem}
                    onClick={() => setGender("female")}
                >
                    <div
                        className={`${classes.circle} ${
                            gender === "female" ? classes.circleSelected : ""
                        }`}
                    >
                        {/* 未來放圖片的地方： <img src={femaleImg} ... /> */}
                    </div>
                    <span
                        className={`${classes.label} ${
                            gender === "female" ? classes.labelSelected : ""
                        }`}
                    >
                        女生
                    </span>
                </div>
                <div
                    className={classes.optionItem}
                    onClick={() => setGender("male")}
                >
                    <div
                        className={`${classes.circle} ${
                            gender === "male" ? classes.circleSelected : ""
                        }`}
                    >
                        {/* 未來放圖片的地方 */}
                    </div>
                    <span
                        className={`${classes.label} ${
                            gender === "male" ? classes.labelSelected : ""
                        }`}
                    >
                        男生
                    </span>
                </div>
            </div>
            <div className={classes.footer}>
                <AuthButton
                    label="繼續"
                    onClick={handleContinue}
                    disabled={!gender}
                    style={{
                        width: "75%",
                        margin: "0 auto",
                    }}
                />
            </div>
        </div>
    );
}

export default SignUpGender;
