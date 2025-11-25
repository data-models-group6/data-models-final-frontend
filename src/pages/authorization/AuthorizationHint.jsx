import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/auth/AuthButton";
import classes from "./AuthorizationHint.module.css";

function AuthorizationHint() {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.contentWrapper}>
        <h1 className={classes.title}>讓音樂開始為你配對</h1>

        <div className={classes.descriptionBlock}>
          <p>我們需要連結你的 Spotify，才能讀取：</p>
          <span className={classes.listItem}>目前播放歌曲</span>
          <span className={classes.listItem}>常聽歌手 / 歌曲</span>
          <span className={classes.listItem}>你的收藏庫</span>
        </div>

        <div className={classes.geoDescription}>
          <div>同時也會使用你的地理位置</div>
          <div>幫你找到附近正在聽同一首歌的人</div>
        </div>
      </div>
      <div className={classes.footer}>
        <AuthButton 
          label="繼續" 
          onClick={() => navigate("/authorization/spotify")}
          style={{ width: "60%", margin: "0 auto" }} 
        />
      </div>
    </div>
  );
};

export default AuthorizationHint;