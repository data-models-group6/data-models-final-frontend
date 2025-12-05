// src/pages/interaction/MyMatchesPage.jsx
import { useEffect, useState } from "react";
import MatchCard from "../../components/interactionPage/MatchCard";
import classes from "./MatchesGrid.module.css";
import { fetchMyLikes } from "../../utils/interactionUtils"; // ← 看你實際放哪裡

function MyMatchesPage() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadMyMatches() {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchMyLikes();
                // 依你後端的格式做個安全一點的處理：
                // 情境 1: { count, users: [...] }
                // 情境 2: 直接回傳陣列 [ ... ]
                let users = [];

                if (Array.isArray(data)) {
                    users = data;
                } else if (Array.isArray(data.users)) {
                    users = data.users;
                }

                const mapped = users.map((u) => ({
                    id: u.user_id || u.id,
                    name: u.display_name || u.name || "Guest",
                    img: u.avatarUrl || u.avatar_url || u.img,
                }));

                setMatches(mapped);
            } catch (err) {
                console.error(err);
                setError("載入我的配對失敗，請稍後再試。");
            } finally {
                setLoading(false);
            }
        }

        loadMyMatches();
    }, []);

    if (loading) {
        return (
            <div className={classes.gridContainer}>
                <div className={classes.emptyState}>
                    <div className={classes.emptyText}>載入中…</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={classes.gridContainer}>
                <div className={classes.emptyState}>
                    <div className={classes.emptyText}>{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.gridContainer}>
            {matches.map((user) => (
                <MatchCard
                    key={user.id}
                    image={user.img}
                />
            ))}

            {matches.length === 0 && (
                <div className={classes.emptyState}>
                    <div className={classes.emptyText}>暫無心動對象</div>
                    <p style={{ fontSize: "12px" }}>去配對看看吧！</p>
                </div>
            )}
        </div>
    );
}

export default MyMatchesPage;