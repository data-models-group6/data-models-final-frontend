// LikesMePage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MatchCard from "../../components/interactionPage/MatchCard";
import classes from "./MatchesGrid.module.css";
import { fetchPendingLikes } from "../../utils/interactionUtils";

function LikesMePage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadLikes = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchPendingLikes();
            const mapped = data.users.map((u) => ({
                id: u.user_id,
                name: u.display_name,
                img: u.avatarUrl,
            }));
            setLikes(mapped);
        } catch (err) {
            console.error(err);
            setError("載入喜歡你的人失敗，請稍後再試。");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 每次進到這個頁面都重新抓一次
        loadLikes();
        // 如果你有用 react-router v6，location.key 會在 navigation 時改變
    }, [location.key]);

    const handleCardClick = (user) => {
        navigate(`/app/interaction/likes/${user.id}`, {
            state: { user }, // 把這個人直接帶到下一頁
        });
    };

    if (loading) {
        return (
            <div className={classes.gridContainer}>
                <div className={classes.emptyState}>載入中…</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={classes.gridContainer}>
                <div className={classes.emptyState}>{error}</div>
            </div>
        );
    }

    return (
        <div className={classes.gridContainer}>
            {likes.map((user) => (
                <MatchCard
                    key={user.id}
                    image={user.img}
                    // MatchCard 如果有名字也可以一起傳 name={user.name}
                    onClick={() => handleCardClick(user)}
                />
            ))}

            {likes.length === 0 && (
                <div className={classes.emptyState}>
                    <div className={classes.emptyText}>還沒有人喜歡你</div>
                    <p style={{ fontSize: "14px" }}>快去滑卡讓更多人看見吧！</p>
                </div>
            )}
        </div>
    );
}

export default LikesMePage;
