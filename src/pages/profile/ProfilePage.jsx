import classes from "./ProfilePage.module.css";

function ProfilePage() {
    const userData = {
        name: localStorage.getItem("myName"),
        avatar: localStorage.getItem("avatar"),
        stats: {
            likesMe: "X",
            iLike: "X",
            topPicks: "X",
        },
    };

    return (
        <div className={classes.container}>
            {/* --- 新增：頁面標題 --- */}
            <h1 className={classes.pageTitle}>個人資訊</h1>

            {/* 個人頭像與名字區塊 */}
            <div className={classes.header}>
                <div className={classes.avatarWrapper}>
                    <img
                        src={userData.avatar}
                        alt={userData.name}
                        className={classes.avatar}
                    />
                </div>
                <h2 className={classes.name}>{userData.name}</h2>
            </div>

            {/* 數據統計區塊 */}
            <div className={classes.statsRow}>
                <div className={classes.statItem}>
                    <span className={classes.statNumber}>
                        {userData.stats.likesMe}
                    </span>
                    <span className={classes.statLabel}>喜歡我</span>
                </div>

                <div className={classes.statItem}>
                    <span className={classes.statNumber}>
                        {userData.stats.iLike}
                    </span>
                    <span className={classes.statLabel}>我喜歡</span>
                </div>

                <div className={classes.statItem}>
                    <span className={classes.statNumber}>
                        {userData.stats.topPicks}
                    </span>
                    <span className={classes.statLabel}>精選</span>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
