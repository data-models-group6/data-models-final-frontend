import MatchCard from "../../components/interactionPage/MatchCard";
import classes from "./MatchesGrid.module.css";

// 假資料
const dummyMatches = [
    {
        id: 4,
        name: "Lena",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 5,
        name: "Sarah",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 6,
        name: "Jessica",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 7,
        name: "Emily",
        img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
];

function MyMatchesPage() {
    const handleChatClick = (id) => {
        console.log("開始與 ID:", id, "聊天");
        // navigate(`/app/chat/${id}`); // 未來可以這樣寫
    };

    return (
        <div className={classes.gridContainer}>
            {dummyMatches.map((user) => (
                <MatchCard
                    key={user.id}
                    image={user.img}
                    onClick={() => handleChatClick(user.id)}
                />
            ))}

            {dummyMatches.length === 0 && (
                <div className={classes.emptyState}>
                    <div className={classes.emptyText}>暫無心動對象</div>
                    <p style={{ fontSize: "12px" }}>去配對看看吧！</p>
                </div>
            )}
        </div>
    );
}

export default MyMatchesPage;
