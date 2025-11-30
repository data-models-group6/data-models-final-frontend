import { useNavigate } from "react-router-dom";
import MatchCard from "../../components/interactionPage/MatchCard";
import classes from "./MatchesGrid.module.css";

// 假資料
const dummyLikes = [
    {
        id: 1,
        name: "Kai",
        img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 2,
        name: "Jay",
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 3,
        name: "Min",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
];

function LikesMePage() {
    const navigate = useNavigate();
    
    const handleCardClick = (id) => {
        navigate(`/app/interaction/likes/${id}`);
    };

    return (
        <div className={classes.gridContainer}>
            {dummyLikes.map((user) => (
                <MatchCard
                    key={user.id}
                    image={user.img}
                    onClick={() => handleCardClick(user.id)}
                />
            ))}
            {dummyLikes.length === 0 && (
                <div className={classes.emptyState}>
                    <div className={classes.emptyText}>還沒有人喜歡你</div>
                    <p style={{ fontSize: "14px" }}>快去滑卡讓更多人看見吧！</p>
                </div>
            )}
        </div>
    );
}

export default LikesMePage;
