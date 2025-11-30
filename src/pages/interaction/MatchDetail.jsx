import { useParams, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import rippleBgImage from "../../assets/match.png";
import failedImage from "../../assets/match_failed.png";
import classes from "./MatchDetail.module.css";
import { useEffect, useState } from "react";

// 假資料庫 (模擬後端)
const usersDb = {
    1: {
        name: "Kai",
        img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        matchRate: "82%",
        distance: "150m",
    },
    2: {
        name: "Jay",
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        matchRate: "95%",
        distance: "2km",
    },
    // ... 其他
};

// 我的頭像 (固定)
const MY_AVATAR =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

const MatchDetail = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [showFailed, setShowFailed] = useState(false);

    const handleGiveUp = () => {
        setShowFailed(true);
    };

    useEffect(() => {
        let timer;
        if (showFailed) {
            // 顯示失敗畫面後，2 秒後自動跳回上一頁
            timer = setTimeout(() => {
                navigate(-1);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showFailed, navigate]);

    const handleOverlayClick = () => {
        navigate(-1);
    };

    // 根據 ID 找人，找不到就給預設值
    const targetUser = usersDb[userId] || {
        name: "Asahi",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        matchRate: "82%",
        distance: "150m",
    };

    const handleSayHi = () => {
        console.log(`向 ${targetUser.name} 打招呼`);
        // navigate("/app/chat/" + userId); // 之後可以導向聊天室
    };

    return (
        <div className={classes.container}>
            {showFailed && (
                <div
                    className={classes.failedOverlay}
                    onClick={handleOverlayClick}
                >
                    <img
                        src={failedImage}
                        alt="Match Failed"
                        className={classes.failedImage}
                    />
                    <div className={classes.failedText}>配對失敗</div>
                </div>
            )}
            <div className={classes.pageTitle}>Music Matches Nearby</div>

            <div className={classes.visualContainer}>
                <img
                    src={rippleBgImage}
                    style={{ width: "150%", height: "150%" }}
                />
                <div
                    className={`${classes.avatar} ${classes.avatarLeft}`}
                    style={{ backgroundImage: `url(${targetUser.img})` }}
                ></div>
                <div
                    className={`${classes.avatar} ${classes.avatarRight}`}
                    style={{ backgroundImage: `url(${MY_AVATAR})` }}
                ></div>
            </div>
            <div className={classes.infoArea}>
                <div className={classes.mainText}>
                    <span className={classes.highlightName}>
                        {targetUser.name}
                    </span>
                    他喜歡了你
                </div>

                <div className={classes.matchBadge}>★ 完美配對 ★</div>

                <div className={classes.subInfo}>
                    你們正在聆聽同一首歌
                    <br />
                    你們音樂品味 {targetUser.matchRate} 相似
                    <br />
                    {targetUser.distance}
                </div>
            </div>
            <div className={classes.actionArea}>
                <button className={classes.btnPrimary} onClick={handleSayHi}>
                    <FaEnvelope /> 去打聲招呼吧
                </button>
                <button
                    className={classes.btnSecondary}
                    onClick={handleGiveUp}
                >
                    放棄
                </button>
            </div>
        </div>
    );
};

export default MatchDetail;
