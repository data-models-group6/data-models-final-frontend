export async function swipeUser(targetUserId, action) {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("No auth token found");
    }

    const res = await fetch("https://data-models-final-backend.onrender.com/api/swipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            target_user_id: targetUserId,
            action, // "LIKE" or "PASS"
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Swipe failed: ${res.status} ${text}`);
    }

    return res.json();
}

export function likeUser(targetUserId) {
    return swipeUser(targetUserId, "LIKE");
}

export function passUser(targetUserId) {
    return swipeUser(targetUserId, "PASS");
}

export async function fetchSwipeCandidates(topK = 10) {
    const myUserId = localStorage.getItem("userId");

    if (!myUserId) {
        throw new Error("Missing user id");
    }

    const res = await fetch(
        `https://data-models-final-backend.onrender.com/match_history/candidates/${myUserId}?top_k=${topK}`
    );

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Fetch candidates failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    return data.candidates || [];
}

export async function fetchPendingLikes() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No auth token found");
  }

  const res = await fetch("https://data-models-final-backend.onrender.com/api/liked-me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  return data;
}

export async function fetchMyLikes() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No auth token found");
  }

  const res = await fetch("https://data-models-final-backend.onrender.com/api/my-likes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  return data;
}

export async function fetchMatchList() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        throw new Error("Missing auth token or user id");
    }

    const res = await fetch(`https://data-models-final-backend.onrender.com/api/match-list/${userId}`, {
        method: "GET",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    return data.matches || [];
}