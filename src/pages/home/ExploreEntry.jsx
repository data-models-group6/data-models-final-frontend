import ExploreCard from "../../components/homePage/HintCard";
import classes from "./ExploreEntry.module.css";

function ExploreEntry() {
    const handleGuessGame = () => {
        console.log("進入猜歌遊戲...");
    };

    const handleMusicMap = () => {
        console.log("打開音樂地圖...");
    };

    return (
        <div className={classes.container}>
            <ExploreCard
                title="線上猜歌"
                icon="🎧"
                description="聽前奏，猜歌名，遇見也會這首歌的人"
                buttonText="開始猜歌"
                onClick={handleGuessGame}
            />
            <ExploreCard
                title="音樂地圖"
                icon="🗺️"
                description="看看附近咖啡廳、酒吧、商圈有哪些音樂主題夜"
                buttonText="打開地圖"
                onClick={handleMusicMap}
            />
        </div>
    );
}

export default ExploreEntry;
