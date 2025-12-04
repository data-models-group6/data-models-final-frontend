import React, { useState, useEffect, useRef } from "react"; // 1. 引入 useRef
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

const mockUsers = [
    // ... (保留原本的 Mock Users)
    {
        id: 1,
        name: "Amy",
        type: "sameSong",
        lat: 25.034,
        lng: 121.565,
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        song: "Bad Guy - Billie Eilish",
        tags: "完美同頻 · 正在聽同一首歌",
    },
    {
        id: 2,
        name: "John",
        type: "sameArtist",
        lat: 25.033,
        lng: 121.563,
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        song: "Lovely - Billie Eilish",
        tags: "同歌手 · 都在聽 Billie Eilish",
    },
    {
        id: 3,
        name: "Jeno",
        type: "normal",
        lat: 25.035,
        lng: 121.566,
        img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        song: "Happier Than Ever",
        tags: "一般使用者 · 正在聽其他歌曲",
    },
    {
        id: 4,
        name: "Erica",
        type: "normal",
        lat: 25.032,
        lng: 121.562,
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        song: "Ocean Eyes",
        tags: "一般使用者 · 正在聽其他歌曲",
    },
];

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

const NearbyPage = () => {
    const [myPosition, setMyPosition] = useState(DEFAULT_CENTER);
    const [nearbyPeople, setNearbyPeople] = useState(mockUsers);
    const [selectedUser, setSelectedUser] = useState(null);
    const [playingTrack, setPlayingTrack] = useState(null);

    const positionRef = useRef(DEFAULT_CENTER);

    // 當 myPosition 改變時，只更新 Ref，不觸發 API
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

    // 音樂同步
    useEffect(() => {
        const syncMusic = async () => {
            const currentLat = positionRef.current[0];
            const currentLng = positionRef.current[1];

            console.log(
                "正在執行 Heartbeat，使用座標:",
                currentLat,
                currentLng
            );

            // 呼叫 API
            const result = await getCurrentTrack(currentLat, currentLng);

            if (result && result.status === "ok" && result.sent) {
                console.log("抓到歌曲:", result.sent.track_name);
                setPlayingTrack(result.sent);
            } else {
                console.log("沒在聽歌或 API 回傳空");
                setPlayingTrack(null);
            }
        };

        syncMusic();
        const intervalId = setInterval(syncMusic, 15000);

        return () => clearInterval(intervalId);
    }, []);

    // 模擬其他人移動 (保持不變)
    useEffect(() => {
        const interval = setInterval(() => {
            setNearbyPeople((prev) =>
                prev.map((user) => ({
                    ...user,
                    lat: user.lat + (Math.random() - 0.5) * 0.0005,
                    lng: user.lng + (Math.random() - 0.5) * 0.0005,
                }))
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // ... (createIcon 保持不變) ...
    const createIcon = (imgUrl, type, isMe) => {
        let borderClass = classes.borderWhite;
        if (type === "sameSong") borderClass = classes.borderGreen;
        if (type === "sameArtist") borderClass = classes.borderBlue;

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
                        <Marker
                            position={myPosition}
                            icon={createIcon(
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                                null,
                                true
                            )}
                            zIndexOffset={1000}
                        />
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
                            <div>距離你約 80 公尺</div>
                            <div>{selectedUser.tags}</div>
                            <div>他也正在聽：{selectedUser.song}</div>
                        </div>

                        <div className={classes.cardActions}>
                            <button
                                className={`${classes.actionBtn} ${classes.btnChat}`}
                            >
                                聊天
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
