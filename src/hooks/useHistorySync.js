import { useEffect } from 'react';

const API_BASE_URL = window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "https://data-models-final-backend.onrender.com";

const useHistorySync = () => {
    useEffect(() => {
        const syncHistory = async () => {
            console.log('History Sync: Starting check...');
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.log('History Sync: No auth token found, skipping.');
                    return;
                }

                console.log('History Sync: Token found, requesting location...');

                // 1. Get current location
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        console.log('History Sync: Location obtained, calling API...');
                        const { latitude, longitude } = position.coords;

                        // 2. Call Backend
                        try {
                            const response = await fetch(`${API_BASE_URL}/spotify/sync-recent`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                    lat: latitude,
                                    lng: longitude
                                })
                            });

                            if (response.ok) {
                                const data = await response.json();
                                console.log('History Sync: Result:', data);
                            } else {
                                console.error('History Sync: Failed with status:', response.status);
                            }
                        } catch (fetchError) {
                            console.error('History Sync: Fetch error:', fetchError);
                        }
                    },
                    (geoError) => {
                        console.error('History Sync: Geolocation error:', geoError.message);
                    }
                );
            } catch (error) {
                console.error('History Sync: Unexpected error:', error);
            }
        };

        // Only run if user is logged in
        if (localStorage.getItem('authToken')) {
            syncHistory();
        }
    }, []);
};

export default useHistorySync;
