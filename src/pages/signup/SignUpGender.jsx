import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

import AuthButton from "../../components/auth/AuthButton";
import classes from "./SignUpGender.module.css";

const femaleImg = "https://avatar.iran.liara.run/public/girl";
const maleImg = "https://avatar.iran.liara.run/public/boy";

function SignUpGender() {
    const navigate = useNavigate();
    const location = useLocation();

    const prevData = location.state || {};

    const [gender, setGender] = useState(null);

    const handleContinue = () => {
        if (!gender) return;

        navigate("/auth/signup/birthday", {
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
                <div className={classes.title}>Select Gender</div>
            </header>

            <div className={classes.selectionArea}>
                {/* 女性選項 */}
                <div
                    className={classes.optionItem}
                    onClick={() => setGender("female")}
                >
                    <div
                        className={`${classes.circle} ${
                            gender === "female" ? classes.circleSelected : ""
                        }`}
                    >
                        {/* 這裡加入圖片 */}
                        <img 
                            src={femaleImg} 
                            alt="Female" 
                            className={classes.avatarImg} 
                        />
                    </div>
                    <span
                        className={`${classes.label} ${
                            gender === "female" ? classes.labelSelected : ""
                        }`}
                    >
                        Female
                    </span>
                </div>

                {/* 男性選項 */}
                <div
                    className={classes.optionItem}
                    onClick={() => setGender("male")}
                >
                    <div
                        className={`${classes.circle} ${
                            gender === "male" ? classes.circleSelected : ""
                        }`}
                    >
                        <img 
                            src={maleImg} 
                            alt="Male" 
                            className={classes.avatarImg} 
                        />
                    </div>
                    <span
                        className={`${classes.label} ${
                            gender === "male" ? classes.labelSelected : ""
                        }`}
                    >
                        Male
                    </span>
                </div>
            </div>
            
            <div className={classes.footer}>
                <AuthButton
                    label="Continue"
                    onClick={handleContinue}
                    disabled={!gender} // 沒選性別時按鈕禁用
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