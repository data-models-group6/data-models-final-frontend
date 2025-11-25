import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft, FaPlus } from "react-icons/fa6";

import AuthButton from "../../components/auth/AuthButton";
import classes from "./SignUpPhoto.module.css";

function SignUpPhoto() {
    const navigate = useNavigate();
    const location = useLocation();

    // 1. 隱藏的 Input Ref，用來操控檔案選擇
    const fileInputRef = useRef(null);

    // 2. 狀態：預覽圖 URL & 實際檔案
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    // 取得上一頁傳來的資料 (Name, Gender...)
    const prevData = location.state || {};

    // 3. 處理檔案選擇
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // 產生預覽網址 (這是一個暫時的 blob: URL)
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
        }
    };

    // 4. 按鈕點擊邏輯
    const handleButtonClick = () => {
        if (!file) {
            return;
        } else {
            // 情況 B：已經選好照片 -> 繼續下一步 (完成註冊)
            console.log("Final Data:", { ...prevData, photo: file });
            navigate("/auth/signup/alias", {
                state: { ...prevData, file },
            });
        }
    };

    return (
        <div className={classes.container}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
            />
            <header className={classes.header}>
                <button
                    className={classes.backButton}
                    onClick={() => navigate(-1)}
                >
                    <FaChevronLeft />
                </button>
                <div className={classes.title}>個人資料</div>
            </header>
            <div className={classes.subTitle}>上傳你的照片</div>
            <div
                className={classes.uploadCard}
                onClick={() => fileInputRef.current.click()}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className={classes.previewImage}
                    />
                ) : (
                    <div className={classes.plusIconWrapper}>
                        <FaPlus />
                    </div>
                )}
            </div>
            <div className={classes.footer}>
                <AuthButton
                    label={preview ? "繼續" : "上傳照片"}
                    onClick={handleButtonClick}
                    disabled={!file}
                    style={{
                        width: "280px",
                        margin: "0 auto",
                    }}
                />
            </div>
        </div>
    );
}

export default SignUpPhoto;
