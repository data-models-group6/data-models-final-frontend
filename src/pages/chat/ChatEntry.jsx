import { useNavigate } from "react-router-dom";
import NewMatchItem from "../../components/chat/NewMatchItem";
import ChatListItem from "../../components/chat/ChatListItem";
import classes from "./ChatEntry.module.css";

// --- 模擬後端回傳的所有配對資料 ---
// 關鍵欄位：hasChatted (或是檢查 lastMessage 是否存在)
const allMatchesData = [
  // --- 已聊過天的 (Chat List) ---
  { 
    id: 101, 
    name: "Tylerr", 
    avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80", 
    isOnline: false,
    hasChatted: true,
    lastMessage: "Hi, good morning", 
    lastTime: "20:22", 
    unreadCount: 1 
  },
  { 
    id: 102, 
    name: "Steven", 
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80", 
    isOnline: true,
    hasChatted: true,
    lastMessage: "Hey, whats up?", 
    lastTime: "20:20", 
    unreadCount: 2 
  },
  { 
    id: 103, 
    name: "Emily", 
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80", 
    isOnline: false,
    hasChatted: true,
    lastMessage: "See you tomorrow!", 
    lastTime: "Yesterday", 
    unreadCount: 0 
  },

  // --- 新配對 (New Matches) - 還沒聊過天 ---
  { 
    id: 1, 
    name: "Allen", 
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80", 
    isOnline: true, 
    hasChatted: false 
  },
  { 
    id: 2, 
    name: "Sarah", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80", 
    isOnline: false, 
    hasChatted: false 
  },
];

const ChatEntry = () => {
  const navigate = useNavigate();

  // 1. 分類資料：新配對 (未聊天)
  const newMatches = allMatchesData.filter(user => !user.hasChatted);

  // 2. 分類資料：聊天列表 (已聊天)
  const chatList = allMatchesData.filter(user => user.hasChatted);

  // 統一處理點擊邏輯：不管是點新配對還是舊聊天，都進入聊天室
  const handleUserClick = (id) => {
    console.log("進入聊天室 ID:", id);
    // 這裡我們假設聊天室的路徑是 /app/chat/:userId
    // 雖然現在還沒做聊天室頁面，但路由可以先預留
    // navigate(`/app/chat/${id}`);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.pageTitle}>聊天</h1>

      {/* --- 新配對區塊 (橫向捲動) --- */}
      <div className={classes.sectionTitle}>新配對</div>
      
      {/* 如果有新配對才顯示 */}
      {newMatches.length > 0 ? (
        <div className={classes.newMatchesRow}>
          {newMatches.map(user => (
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
        <div className={classes.emptyState}>暫無新配對，快去滑卡吧！</div>
      )}

      {/* --- 聊天列表區塊 (直向列表) --- */}
      <div className={classes.sectionTitle} style={{marginTop: '10px'}}>聊天</div>
      
      <div className={classes.chatList}>
        {chatList.length > 0 ? (
          chatList.map(chat => (
            <ChatListItem 
              key={chat.id}
              name={chat.name}
              avatar={chat.avatar}
              message={chat.lastMessage}
              time={chat.lastTime}
              unreadCount={chat.unreadCount}
              onClick={() => handleUserClick(chat.id)}
            />
          ))
        ) : (
          <div className={classes.emptyState} style={{textAlign: 'center', marginTop: '20px'}}>
            還沒有聊天記錄<br/>
            點擊上方新配對開始聊天！
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatEntry;