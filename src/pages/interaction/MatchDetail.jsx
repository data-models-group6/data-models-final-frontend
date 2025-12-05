// MatchDetail.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import rippleBgImage from "../../assets/match.png";
import failedImage from "../../assets/match_failed.png";
import classes from "./MatchDetail.module.css";
import { useEffect, useState } from "react";
import { swipeUser } from "../../utils/interactionUtils";

const MatchDetail = () => {
    const MY_AVATAR = localStorage.getItem("avatar");
    const { userId } = useParams(); // 這裡是後端的 user_id (UUID)
    const navigate = useNavigate();
    const location = useLocation();

    // 從上一頁帶過來的 user
    const userFromState = location.state?.user;

    const [showFailed, setShowFailed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // 如果沒有帶 state（例如直接打網址），就直接退回列表
    useEffect(() => {
        if (!userFromState) {
            navigate("/app/interaction/likes", { replace: true });
        }
    }, [userFromState, navigate]);

    if (!userFromState) {
        return null; // 等上面的 redirect
    }

    const targetUser = {
        name: userFromState.name,
        img: userFromState.img,
    };

    const backToList = () => {
        navigate("/app/interaction/likes", { replace: true });
    };

    const handleGiveUp = async () => {
        if (isProcessing) return;
        try {
            setIsProcessing(true);
            await swipeUser(userId, "PASS");
            setShowFailed(true);

            // 顯示失敗畫面後，2 秒後自動回到列表
            setTimeout(() => {
                backToList();
            }, 2000);
        } catch (err) {
            console.error(err);
            alert("放棄配對失敗，請稍後再試。");
            setIsProcessing(false);
        }
    };

    const handleSayHi = async () => {
        if (isProcessing) return;
        try {
            setIsProcessing(true);
            const res = await swipeUser(userId, "LIKE");

            if (res.is_match) {
                // 這裡你可以改成跳到聊天室頁面
                // navigate(`/app/chat/${res.match_id}`);
                console.log("配對成功！match_id:", res.match_id);
            }

            // 不管成功與否，先回列表；列表會重新抓，這個人就消失了
            backToList();
        } catch (err) {
            console.error(err);
            alert("配對失敗，請稍後再試。");
            setIsProcessing(false);
        }
    };

    const handleOverlayClick = () => {
        backToList();
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
                    style={{ backgroundImage: `url(${MY_AVATAR})` }}
                ></div>
                <div
                    className={`${classes.avatar} ${classes.avatarRight}`}
                    style={{ backgroundImage: `url(${targetUser.img})` }}
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
                    {/* 之後要顯示 match rate / distance 再從後端補欄位 */}
                </div>
            </div>
            <div className={classes.actionArea}>
                <button
                    className={classes.btnPrimary}
                    onClick={handleSayHi}
                    disabled={isProcessing}
                >
                    <FaEnvelope /> 去打聲招呼吧
                </button>
                <button
                    className={classes.btnSecondary}
                    onClick={handleGiveUp}
                    disabled={isProcessing}
                >
                    放棄
                </button>
            </div>
        </div>
    );
};

export default MatchDetail;
