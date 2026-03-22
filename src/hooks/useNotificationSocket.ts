import type { Notification } from '@/types/notification';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// Change this to your backend Socket.IO server URL
const SOCKET_URL = 'http://localhost:5000';

export function useNotificationSocket(onNotification: (notification: Notification) => void, userId?: string) {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;
        const socket = io(SOCKET_URL, {
            query: { userId },
            transports: ['websocket'],
            withCredentials: true,
        });
        socketRef.current = socket;
        console.log('Connecting to notification socket with userId:', userId);

        socket.on('notification', (notification: Notification) => {
            onNotification(notification);
        });

        return () => {
            socket.disconnect();
            console.log('Disconnecting from notification socket');
        };
    }, [userId, onNotification]);
}
