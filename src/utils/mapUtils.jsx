export const getCurrentTrack = async (lat, lng) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const response = await fetch(
      "https://data-models-final-backend.onrender.com/api/heartbeat-auto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          lat: lat,
          lng: lng
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return data; // 回傳 message 給 UI 處理
    }

    return data;
  } catch (error) {
    console.error("Get Track Error:", error);
    return null;
  }
};