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
const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://127.0.0.1:8000/api"
  : "https://data-models-final-backend.onrender.com/api";


export const getRegionalRanking = async (lat, lng) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch(
      `${API_BASE_URL}/ranking/regional`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ lat, lng }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    console.error("getRegionalRanking Error:", error);
    return { status: "error", message: error.message || "Network error" };
  }
};