export const getCurrentTrack = async (lat, lng) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const response = await fetch("https://data-models-final-backend.onrender.com/api/heartbeat-auto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ 
        lat: lat, 
        lng: lng 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 422) {
            console.error("API 格式錯誤 (422):", data);
        }
        return null;
    }

    return data;
  } catch (error) {
    console.error("Get Track Error:", error);
    return null;
  }
};


export const getNearbyUsers = async (lat, lng) => {
    // TODO: 之後實作
    // call /api/nearby with lat, lng
};