import React, { useState, useEffect, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IoSearch } from "react-icons/io5";
import { FaPlay, FaMusic } from "react-icons/fa";
import classes from "./NearbyPage.module.css";
import { getCurrentTrack } from "../../utils/mapUtils";

const DEFAULT_CENTER = [25.033964, 121.564472];

function MapEventHandler({ onMapClick }) {
    useMapEvents({
        click: () => onMapClick(),
    });
    return null;
}

function MapRecenter({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 16, { animate: true });
        }
    }, [position, map]);
    return null;
}

// 把後端 heartbeat 資料轉成 NearbyPage 需要的格式
const buildNearbyUsers = (heartbeatData) => {
    if (!heartbeatData || heartbeatData.message) return [];

    const { same_track = [], same_artist = [], near = [] } = heartbeatData;

    const mapHeartbeat = (item, kind) => {
        let type;
        let tags;

        if (kind === "same_track") {
            type = "sameSong";
            tags = "完美同頻 · 正在聽同一首歌";
        } else if (kind === "same_artist") {
            type = "sameArtist";
            tags = `同歌手 · 都在聽 ${item.artist_name}`;
        } else {
            // kind === "near"
            type = "nearby";
            tags = "附近 · 正在聽不同的音樂";
        }

        return {
            id: item.user_id,
            name: item.display_name,
            type, // sameSong / sameArtist / nearby → 用來決定邊框顏色
            lat: item.lat,
            lng: item.lng,
            img: item.avatarUrl,
            song: `${item.track_name} - ${item.artist_name}`,
            tags,
        };
    };

    return [
        ...same_track.map((u) => mapHeartbeat(u, "same_track")),
        ...same_artist.map((u) => mapHeartbeat(u, "same_artist")),
        ...near.map((u) => mapHeartbeat(u, "near")),
    ];
};


const NearbyPage = () => {
    const [myPosition, setMyPosition] = useState(DEFAULT_CENTER);
    const [nearbyPeople, setNearbyPeople] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [playingTrack, setPlayingTrack] = useState(null);

    // 用 ref 存座標，避免每次 setState 都觸發 effect
    const positionRef = useRef(DEFAULT_CENTER);

    useEffect(() => {
        positionRef.current = myPosition;
    }, [myPosition]);

    // GPS 定位
    useEffect(() => {
        if (!navigator.geolocation) return;

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setMyPosition([latitude, longitude]);
            },
            (err) => console.error("GPS Error:", err),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    // 音樂同步 + 取得附近使用者
    useEffect(() => {
        const syncMusic = async () => {
            const currentLat = positionRef.current[0];
            const currentLng = positionRef.current[1];

            console.log("正在執行 Heartbeat，座標:", currentLat, currentLng);

            const result = await getCurrentTrack(currentLat, currentLng);

            // token 不在 / API error 等情況
            if (!result) {
                console.log("Heartbeat 回傳空或錯誤");
                setPlayingTrack(null);
                setNearbyPeople([]);
                return;
            }

            // 後端說「目前沒有在聽歌」
            if (result.message) {
                console.log(result.message);
                setPlayingTrack(null);
                setNearbyPeople([]);
                return;
            }

            // 正常成功：{ status, sent, same_track, same_artist }
            if (result.status === "ok" && result.sent) {
                console.log("抓到歌曲:", result.sent.track_name);
                setPlayingTrack(result.sent);

                const users = buildNearbyUsers(result);
                setNearbyPeople(users);
                console.log("附近使用者:", users);

                // 如果有開著 bottom card，避免點到已經不存在的人
                setSelectedUser((prev) =>
                    prev && users.find((u) => u.id === prev.id) ? prev : null
                );
            } else {
                console.log("API 回傳非 ok 狀態:", result);
                setPlayingTrack(null);
                setNearbyPeople([]);
            }
        };

        syncMusic();
        const intervalId = setInterval(syncMusic, 15000);
        return () => clearInterval(intervalId);
    }, []);

    // 建立 Leaflet 自訂 Icon
    const createIcon = (imgUrl, type, isMe) => {
        let borderClass = classes.borderWhite;
        if (type === "sameSong") borderClass = classes.borderGreen;
        if (type === "sameArtist") borderClass = classes.borderBlue;
        if (type === "nearby") borderClass = classes.borderGray;

        if (isMe) {
            return L.divIcon({
                className: "custom-avatar-icon",
                html: `
          <div class="${classes.myMarkerContainer}">
            <div class="${classes.pulseRing}"></div>
            <div class="${classes.myAvatar}" style="background-image: url('${imgUrl}');"></div>
          </div>
        `,
                iconSize: [50, 50],
                iconAnchor: [25, 25],
            });
        }

        return L.divIcon({
            className: "custom-avatar-icon",
            html: `<div class="${classes.avatarMarker} ${borderClass}" style="background-image: url('${imgUrl}');"></div>`,
            iconSize: [50, 50],
            iconAnchor: [25, 25],
        });
    };

    const myAvatarImg = localStorage.getItem("avatar");

    return (
        <div className={classes.container}>
            <div className={classes.contentWrapper}>
                <div className={classes.searchBar}>
                    <IoSearch size={22} />
                    <span className={classes.searchText}>附近正在聽什麼</span>
                </div>

                <div className={classes.mapWrapper}>
                    <MapContainer
                        center={DEFAULT_CENTER}
                        zoom={16}
                        className={classes.mapContainer}
                        zoomControl={false}
                        attributionControl={false}
                    >
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                        <MapEventHandler
                            onMapClick={() => setSelectedUser(null)}
                        />
                        {myPosition && <MapRecenter position={myPosition} />}

                        {/* 自己的位置 */}
                        <Marker
                            position={myPosition}
                            icon={createIcon(myAvatarImg, null, true)}
                            zIndexOffset={1000}
                        />

                        {/* 附近的人 */}
                        {nearbyPeople.map((user) => (
                            <Marker
                                key={user.id}
                                position={[user.lat, user.lng]}
                                icon={createIcon(user.img, user.type, false)}
                                eventHandlers={{
                                    click: (e) => {
                                        L.DomEvent.stopPropagation(
                                            e.originalEvent
                                        );
                                        setSelectedUser(user);
                                    },
                                }}
                            />
                        ))}
                    </MapContainer>
                </div>

                {/* 下方播放器 bar */}
                <div className={classes.playerBar}>
                    {playingTrack ? (
                        <>
                            <div className={classes.playingTitle}>
                                我正在聽{" "}
                                <FaPlay size={10} style={{ marginLeft: 6 }} />
                            </div>
                            <div className={classes.trackInfo}>
                                <img
                                    src={playingTrack.album_image}
                                    className={classes.albumArt}
                                    alt="Album Art"
                                />
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {playingTrack.track_name}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: "#ccc",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {playingTrack.artist_name}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                color: "#888",
                                fontSize: "14px",
                            }}
                        >
                            <FaMusic size={18} style={{ marginRight: 10 }} />
                            <span>請播放 Spotify 音樂以開始探索</span>
                        </div>
                    )}
                </div>

                {/* 點 marker 後的底部資訊卡 */}
                {selectedUser && (
                    <div className={classes.userInfoCard}>
                        <div className={classes.cardHeader}>
                            <div
                                className={classes.cardAvatar}
                                style={{
                                    backgroundImage: `url(${selectedUser.img})`,
                                }}
                            ></div>
                            <div className={classes.cardName}>
                                {selectedUser.name}
                            </div>
                        </div>
                        <div className={classes.cardInfo}>
                            {/* 距離目前先寫死 80 公尺，之後可以用 lat/lng 算真實距離 */}
                            <div>距離你約 80 公尺</div>
                            <div>{selectedUser.tags}</div>
                            <div>他也正在聽：{selectedUser.song}</div>
                        </div>

                        <div className={classes.cardActions}>
                            <button
                                className={`${classes.actionBtn} ${classes.btnChat}`}
                            >
                                配對
                            </button>
                            <button
                                className={`${classes.actionBtn} ${classes.btnClose}`}
                                onClick={() => setSelectedUser(null)}
                            >
                                關閉
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NearbyPage;
