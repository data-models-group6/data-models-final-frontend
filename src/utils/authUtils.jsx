// 一般登入
export const loginUser = async (email, password) => {
  try {
    const response = await fetch("https://data-models-final-backend.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ 
        email: email, 
        password: password 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "登入失敗，請檢查帳號密碼");
    }

    if (data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("avatar", data.avatarUrl);
      localStorage.setItem("myName", data.display_name);
    }

    return data;
  } catch (error) {
    console.error("Login Request Error:", error);
    throw error;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Spotify 登入
export const getSpotifyAuthUrl = async () => {
  try {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      throw new Error("尚未登入，無法取得授權連結");
    }

    const response = await fetch("https://data-models-final-backend.onrender.com/spotify/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "取得 Spotify 授權連結失敗");
    }

    return data.authorization_url; 
  } catch (error) {
    console.error("Spotify Auth Error:", error);
    throw error;
  }
};

// 註冊
export const registerUser = async (userData) => {
  try {
    const response = await fetch("https://data-models-final-backend.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ 
        email: userData.email, 
        password: userData.password,
        first_name: userData.first_name,
        last_name: userData.last_name,
        birthday: userData.birthday,
        gender: userData.gender,
        display_name: userData.display_name
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "註冊失敗，請檢查資料欄位");
    }

    return data;
  } catch (error) {
    console.error("Register Request Error:", error);
    throw error;
  }
};