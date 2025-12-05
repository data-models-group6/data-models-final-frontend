// src/pages/chat/ChatEntry.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewMatchItem from "../../components/chat/NewMatchItem";
import ChatListItem from "../../components/chat/ChatListItem";
import classes from "./ChatEntry.module.css";
import { fetchMatchList } from "../../utils/interactionUtils";

const ChatEntry = () => {
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadMatches() {
            try {
                setLoading(true);
                setError(null);

                const list = await fetchMatchList();
                // list: [{ match_id, last_message, last_message_time, is_active, other_user: {...} }, ...]
                setMatches(list);
            } catch (err) {
                console.error(err);
                setError("載入配對列表失敗，請稍後再試。");
            } finally {
                setLoading(false);
            }
        }

        loadMatches();
    }, []);

    // 1. 新配對：last_message 是空字串 → 還沒聊過
    const newMatches = matches
        .filter((m) => !m.last_message) // "" 或 null 都當作沒訊息
        .map((m) => ({
            id: m.other_user.user_id,
            name: m.other_user.display_name || m.other_user.email || "Guest",
            avatar:
                m.other_user.avatarUrl ||
                m.other_user.avatar_url ||
                "https://placehold.co/200x200?text=User",
            isOnline: false, // 後端目前沒給，先寫死
        }));

    // 2. 聊天列表：last_message 有內容 → 已經聊過
    const chatList = matches
        .filter((m) => !!m.last_message)
        .map((m) => ({
            id: m.other_user.user_id,
            name: m.other_user.display_name || m.other_user.email || "Guest",
            avatar:
                m.other_user.avatarUrl ||
                m.other_user.avatar_url ||
                "https://placehold.co/200x200?text=User",
            message: m.last_message,
            // 這裡先粗略把時間轉成 locale string，你之後可以換成你想要的 format
            time: m.last_message_time
                ? new Date(m.last_message_time).toLocaleString("zh-TW", {
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                  })
                : "",
            unreadCount: 0, // 後端目前沒 unread，先寫 0
            isOnline: false,
        }));

    const handleUserClick = (id) => {
        console.log("進入聊天室 ID:", id);
        // navigate(`/app/chat/${id}`);
    };

    if (loading) {
        return (
            <div className={classes.container}>
                <h1 className={classes.pageTitle}>聊天</h1>
                <div className={classes.emptyState}>載入中…</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={classes.container}>
                <h1 className={classes.pageTitle}>聊天</h1>
                <div className={classes.emptyState}>{error}</div>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.pageTitle}>聊天</h1>

            {/* --- 新配對區塊 (橫向捲動) --- */}
            <div className={classes.sectionTitle}>新配對</div>

            {newMatches.length > 0 ? (
                <div className={classes.newMatchesRow}>
                    {newMatches.map((user) => (
                        <NewMatchItem
                            key={user.id}
                            name={user.name}
                            avatar={user.avatar}
                            isOnline={user.isOnline}
                            onClick={() => handleUserClick(user.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className={classes.emptyState}>
                    暫無新配對，快去滑卡吧！
                </div>
            )}

            {/* --- 聊天列表區塊 --- */}
            <div
                className={classes.sectionTitle}
                style={{ marginTop: "10px" }}
            >
                聊天
            </div>

            <div className={classes.chatList}>
                {chatList.length > 0 ? (
                    chatList.map((chat) => (
                        <ChatListItem
                            key={chat.id}
                            name={chat.name}
                            avatar={chat.avatar}
                            message={chat.message}
                            time={chat.time}
                            unreadCount={chat.unreadCount}
                            onClick={() => handleUserClick(chat.id)}
                        />
                    ))
                ) : (
                    <div
                        className={classes.emptyState}
                        style={{ textAlign: "center", marginTop: "20px" }}
                    >
                        還沒有聊天記錄
                        <br />
                        點擊上方新配對開始聊天！
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatEntry;