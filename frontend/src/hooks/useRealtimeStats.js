import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const useRealtimeStats = () => {
    const [stats, setStats] = useState({
        total_raised: 0,
        total_donors: 0,
        websites_sold: 0,
        target_amount: 160000000
    });

    useEffect(() => {
        // Initial Fetch
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${SOCKET_URL}/api/donors/stats`);
                if (res.data) setStats(res.data);
            } catch (e) {
                console.error("Stats fetch error", e);
            }
        };
        fetchStats();

        // Socket listener
        const socket = io(SOCKET_URL);

        socket.on('stats_update', (newStats) => {
            setStats(newStats);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return stats;
};
