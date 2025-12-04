import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa"; 
import AuthButton from "../../components/auth/AuthButton";
import classes from "./AuthorizationSpotify.module.css";
import { getSpotifyAuthUrl } from "../../utils/authUtils";

function AuthorizationSpotify() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleConnect = async () => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const authUrl = await getSpotifyAuthUrl();
      
      console.log("Redirecting to:", authUrl);
      
      // 3. 關鍵：使用 window.location.href 進行外部跳轉
      // 這會讓瀏覽器離開你的網站，前往 Spotify 登入頁
      window.location.href = authUrl;

    } catch (error) {
      console.error(error);
      setErrorMsg("無法連接 Spotify，請稍後再試");
      setIsLoading(false); // 只有失敗時才需要把 Loading 關掉，成功的話頁面就跳轉了
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.textWrapper}>
        <h1 className={classes.title}>連結你的 Spotify</h1>
        <div className={classes.subTitle}>授權後，我們才可以讀取你的播放資訊</div>
      </div>
      
      <AuthButton 
        label={isLoading ? "導向中..." : "連接 Spotify"} 
        onClick={handleConnect}
        icon={<FaSpotify size={24} />}
        disabled={isLoading}
        style={{ 
          width: "70%",
          fontSize: "16px",
          opacity: isLoading ? 0.7 : 1
        }} 
      />
      {errorMsg && <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>}
    </div>
  );
};

export default AuthorizationSpotify;