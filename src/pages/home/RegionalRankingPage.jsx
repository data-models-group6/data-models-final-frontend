import React, { useState, useEffect } from 'react';
import { getRegionalRanking } from "../../utils/mapUtils";
import styles from './RegionalRankingPage.module.css';

// 預設中心座標
const DEFAULT_CENTER = [25.033964, 121.564472];

const RegionalRankingPage = () => {
  // 儲存用戶的經緯度
  const [myPosition, setMyPosition] = useState(DEFAULT_CENTER);

  // 儲存從後端取得的真實排行榜資料
  const [regionalRanking, setRegionalRanking] = useState([]);

  // 顯示狀態
  const [isLoading, setIsLoading] = useState(true);
  const [regionName, setRegionName] = useState('載入中...');

  // 取得用戶 GPS 定位
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      setIsLoading(false);
      setRegionName('無法定位');
      return;
    }

    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setMyPosition([lat, lng]);
      console.log('GPS 定位成功:', lat, lng);
    };

    const error = (err) => {
      console.error("無法取得您的位置:", err);
      setRegionName('無法定位');
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  // 呼叫後端 API 抓取排行榜
  useEffect(() => {
    const [currentLat, currentLng] = myPosition;

    // 檢查是否還是預設座標
    const isDefaultPosition =
      currentLat === DEFAULT_CENTER[0] &&
      currentLng === DEFAULT_CENTER[1];

    if (isDefaultPosition && isLoading) {
      return; // 等待 GPS 定位
    }

    const fetchRanking = async () => {
      try {
        setIsLoading(true);

        const rankingData = await getRegionalRanking(currentLat, currentLng);

        if (rankingData && rankingData.status === "success") {
          // Sort by total_plays descending and take top 5
          const sortedData = (rankingData.data || [])
            .sort((a, b) => b.total_plays - a.total_plays)
            .slice(0, 5);

          setRegionalRanking(sortedData);
          setRegionName(rankingData.region_code || '未知地區');
          console.log("地區排行榜資料 (Top 5):", sortedData);
        } else {
          setRegionalRanking([]);
          setRegionName('無資料地區');
          console.error("無法取得地區排行榜資料:", rankingData);
        }
      } catch (error) {
        console.error("API 呼叫錯誤:", error);
        setRegionalRanking([]);
        setRegionName('載入失敗');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, [myPosition]); // Removed isLoading from dependency array

  // 渲染載入中狀態
  if (isLoading) {
    return (
      <div className={styles.rankingContainer}>
        <div className={styles.loading}>正在載入排行榜...</div>
      </div>
    );
  }

  // 渲染主要介面
  return (
    <div className={styles.rankingContainer}>

      {/* 趨勢標題 */}
      <div className={styles.trendHeader}>
        <h2 className={styles.trendTitle}>Weekly Top Songs</h2>
        <p className={styles.trendDescription}>
          這是根據您的所在區域，在過去 7 天產生的熱門歌曲數據。
        </p>
      </div>

      {/* 排行榜 */}
      <div className={styles.rankingSection}>
        <h3 className={styles.rankingTitle}>排行榜</h3>
        <div className={styles.rankingList}>
          {regionalRanking.length > 0 ? (
            regionalRanking.map((item, index) => (
              <div key={`${item.track_name}-${item.artist}-${index}`} className={styles.rankingItem}>
                <span className={styles.rankingNumber}>{index + 1}.</span>
                <div className={styles.rankingInfo}>
                  <span className={styles.songTitle}>{item.track_name}</span>
                  <span className={styles.artistName}> – {item.artist}</span>
                </div>
                <div className={styles.rankingScore}>
                  <span className={styles.fireIcon}>🔥</span>
                  <span className={styles.scoreValue}>{item.total_plays}</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.rankingItem}>此地區暫無足夠的排行榜數據。</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionalRankingPage;