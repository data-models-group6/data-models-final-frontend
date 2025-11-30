import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

import classes from "./SwipePage.module.css";

// 測試用假資料
const db = [
    {
        name: "Amy",
        age: 21,
        location: "台灣大學 3KM",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
        name: "John",
        age: 24,
        location: "台北市 5KM",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
        name: "Erica",
        age: 22,
        location: "新北市 10KM",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
        name: "Steven",
        age: 26,
        location: "信義區 1KM",
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
        name: "Kalvin",
        age: 23,
        location: "政治大學 20M AWAY",
        img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
];

const SwipePage = () => {
    const [characters, setCharacters] = useState(db);

    // TODO: 之後要用 user id 來創建
    const cardRefs = useMemo(() => {
        return db.reduce((acc, person) => {
            acc[person.name] = React.createRef();
            return acc;
        }, {});
    }, []);

    const onCardSwipe = (direction, name) => {
        console.log(`[紀錄] ${name} 被滑向了 ${direction}`);

        // TODO: 串 api
        if (direction === "right") {
        } else if (direction === "left") {
        }
    };

    const outOfFrame = (name) => {
        console.log(`[清理] ${name} 離開畫面`);
        setCharacters((prev) =>
            prev.filter((character) => character.name !== name)
        );
    };

    const swipe = async (dir) => {
        if (characters.length > 0) {
            // 永遠取陣列的「最後一個」 (因為視覺上最後一個疊在最上面)
            const cardToSwipe = characters[characters.length - 1];

            // 透過名字找到對應的 Ref，並呼叫 swipe 動畫 API
            if (cardRefs[cardToSwipe.name].current) {
                await cardRefs[cardToSwipe.name].current.swipe(dir);
            }
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.tagsRow}>
                <div className={`${classes.tag} ${classes.activeTag}`}>
                    同一首歌
                </div>
                <div className={classes.tag}>同歌手</div>
                <div className={classes.tag}>高相似度</div>
            </div>
            <div className={classes.cardContainer}>
                {characters.map((character) => (
                    <TinderCard
                        ref={cardRefs[character.name]}
                        className={classes.swipe}
                        key={character.name}
                        onSwipe={(dir) => onCardSwipe(dir, character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)}
                        preventSwipe={["up", "down"]}
                    >
                        <div
                            style={{ backgroundImage: `url(${character.img})` }}
                            className={classes.card}
                        >
                            <div className={classes.cardContent}>
                                <div className={classes.nameAge}>
                                    {character.name},{" "}
                                    <span className={classes.age}>
                                        {character.age}
                                    </span>
                                </div>
                                <div className={classes.location}>
                                    <IoLocationSharp
                                        style={{ marginRight: "4px" }}
                                    />
                                    {character.location}
                                </div>
                                <div className={classes.statusBadge}>
                                    <span className={classes.statusDot}></span>
                                    Active Now
                                </div>
                            </div>
                        </div>
                    </TinderCard>
                ))}
                {characters.length === 0 && (
                    <div
                        style={{
                            color: "white",
                            marginTop: "100px",
                            textAlign: "center",
                            opacity: 0.5,
                        }}
                    >
                        <h3>沒有更多人了</h3>
                        <p>晚點再來看看吧！</p>
                    </div>
                )}
            </div>
            <div className={classes.actionArea}>
                <div className={classes.hintText}>
                    有興趣想認識，就馬上{" "}
                    <span className={classes.highlightGreen}>右滑</span>
                    <FaArrowRightLong />
                </div>
                <div className={classes.buttonsRow}>
                    <div
                        className={`${classes.actionBtn} ${classes.dislikeBtn}`}
                        onClick={() => swipe("left")}
                    >
                        <FaRegThumbsDown />
                    </div>
                    <div
                        className={`${classes.actionBtn} ${classes.likeBtn}`}
                        onClick={() => swipe("right")}
                    >
                        <FaRegThumbsUp />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwipePage;
