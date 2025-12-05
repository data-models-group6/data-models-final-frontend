// src/pages/interaction/SwipePage.jsx
import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

import classes from "./SwipePage.module.css";
import { fetchSwipeCandidates, swipeUser } from "../../utils/interactionUtils";

const SwipePage = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 一進頁面抓可滑卡對象
    useEffect(() => {
        async function loadCandidates() {
            try {
                setLoading(true);
                setError(null);

                const candidates = await fetchSwipeCandidates(10);
                // 把後端回傳格式 map 成前端用的格式
                const mapped = candidates.map((c) => ({
                    id: c.userId,
                    name: c.name,
                    img: c.avatarUrl,
                    score: c.similarity_info?.score ?? null,
                    reason: c.similarity_info?.reason ?? "",
                    reasonLabels: c.similarity_info?.reason_label ?? [],
                    similarityInfo: c.similarity_info,
                }));

                setCharacters(mapped);
            } catch (err) {
                console.error(err);
                setError("載入可以滑卡的對象失敗，請稍後再試。");
            } finally {
                setLoading(false);
            }
        }

        loadCandidates();
    }, []);

    // 依目前的 characters 建立每張卡的 ref（用 userId 當 key）
    const cardRefs = useMemo(() => {
        return characters.reduce((acc, person) => {
            acc[person.id] = React.createRef();
            return acc;
        }, {});
    }, [characters]);

    // 視覺上最上面的那張卡（陣列最後一個）
    const topCharacter =
        characters.length > 0 ? characters[characters.length - 1] : null;

    // 這張卡對應的亮燈標籤
    const activeLabels = new Set(topCharacter?.reasonLabels || []);

    const onCardSwipe = async (direction, character) => {
        console.log(`[紀錄] ${character.name} 被滑向了 ${direction}`);

        try {
            if (direction === "right") {
                await swipeUser(character.id, "LIKE");
            } else if (direction === "left") {
                await swipeUser(character.id, "PASS");
            }
        } catch (err) {
            console.error("swipe api error:", err);
            // 這裡可以視情況提示使用者
        }
    };

    const outOfFrame = (id) => {
        console.log(`[清理] ${id} 離開畫面`);
        setCharacters((prev) => prev.filter((c) => c.id !== id));
    };

    // 底下兩個按鈕用的：程式化觸發 TinderCard.swipe()
    const swipe = async (dir) => {
        if (characters.length > 0) {
            // 永遠取陣列最後一個（視覺上在最上面那張）
            const cardToSwipe = characters[characters.length - 1];
            const ref = cardRefs[cardToSwipe.id];

            if (ref && ref.current) {
                await ref.current.swipe(dir); // 會觸發 onSwipe → onCardSwipe
            }
        }
    };

    if (loading) {
        return (
            <div className={classes.container}>
                <div style={{ color: "white", marginTop: "100px" }}>
                    載入中…
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={classes.container}>
                <div style={{ color: "white", marginTop: "100px" }}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            {/* 上方三個標籤，依目前最上面那張卡的 reason_label 來決定要不要亮燈 */}
            <div className={classes.tagsRow}>
                {["曲風相似", "共同喜愛藝人", "共同喜愛歌曲"].map((label) => (
                    <div
                        key={label}
                        className={
                            activeLabels.has(label)
                                ? `${classes.tag} ${classes.activeTag}`
                                : classes.tag
                        }
                    >
                        {label}
                    </div>
                ))}
            </div>

            <div className={classes.cardContainer}>
                {characters.map((character) => (
                    <TinderCard
                        ref={cardRefs[character.id]}
                        className={classes.swipe}
                        key={character.id}
                        onSwipe={(dir) => onCardSwipe(dir, character)}
                        onCardLeftScreen={() => outOfFrame(character.id)}
                        preventSwipe={["up", "down"]}
                    >
                        <div
                            style={{
                                backgroundImage: `url(${character.img})`,
                            }}
                            className={classes.card}
                        >
                            <div className={classes.cardContent}>
                                <div className={classes.nameOnly}>
                                    {character.name}
                                </div>
                                {character.score != null && (
                                    <div className={classes.score}>
                                        音樂相似度 {character.score}%
                                    </div>
                                )}
                                <div className={classes.reasonText}>
                                    {character.reason}
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