import { useNavigate } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import locationIconImg from "../../assets/location.png";
import AuthButton from "../../components/auth/AuthButton";
import classes from "./AuthorizationLocation.module.css";

const AuthorizationLocation = () => {
    const navigate = useNavigate();

    const handleAllowLocation = () => {
        if ("geolocation" in navigator) {
            // 請求權限
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("定位成功:", position.coords);
                    navigate("/app/home/swipeCard"); 
                },

                (error) => {
                    console.error("定位失敗:", error);
                    if (error.code === 1) {
                        // error.code 1 代表使用者選了 "Permission Denied" (拒絕)
                        alert(
                            "抱歉，EchoMeet 必須取得您的位置才能配對附近的用戶。\n請允許定位權限以繼續。"
                        );
                    } else {
                        // 其他錯誤 (如訊號不良、逾時)
                        alert("無法取得位置，請確認您的 GPS 是否已開啟。");
                    }
                }
            );
        } else {
            alert("您的瀏覽器不支援地理位置功能，無法使用此 App。");
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.contentWrapper}>
                <div className={classes.headerRow}>
                    <div className={classes.iconContainer}>
                        <img
                            src={locationIconImg}
                            alt="Location Icon"
                            className={classes.iconImage}
                        />
                    </div>
                    <h1 className={classes.title}>開啟定位</h1>
                </div>
                <div className={classes.subTitle}>
                    只用於配對附近的使用者，不會公開你的精確位置
                </div>
            </div>
            <AuthButton
                label="允許使用位置"
                onClick={handleAllowLocation}
                style={{ width: "65%", margin: "0 auto" }}
            />
        </div>
    );
};

export default AuthorizationLocation;
