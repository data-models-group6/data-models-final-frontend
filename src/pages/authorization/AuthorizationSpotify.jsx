import { useNavigate } from "react-router-dom";
import { FaSpotify } from "react-icons/fa"; // 引入 Spotify Icon

import AuthButton from "../../components/auth/AuthButton";
import classes from "./AuthorizationSpotify.module.css";

function AuthorizationSpotify() {
  const navigate = useNavigate();

  const handleConnect = () => {
    // TODO:這裡觸發真正的 Spotify 授權
    console.log("Redirecting to Spotify Auth...");
    navigate("/authorization/location"); 
  };

  return (
    <div className={classes.container}>
      <div className={classes.textWrapper}>
        <h1 className={classes.title}>連結你的 Spotify</h1>
        <div className={classes.subTitle}>授權後，我們才可以讀取你的播放資訊</div>
      </div>
      <AuthButton 
        label="連接 Spotify" 
        onClick={handleConnect}
        icon={<FaSpotify size={24} />}
        style={{ 
          width: "70%",
          fontSize: "16px" 
        }} 
      />
      
    </div>
  );
};

export default AuthorizationSpotify;