import { io } from 'socket.io-client';

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://chit-chat-server-one.vercel.app' //vercel
        : // 'http://13.235.70.214/api' //aws domain
          'http://localhost:8000';

let socket;

export const connectSocket = token => {
    socket = io(BASE_URL, {
        auth: {
            token,
        },
    });

    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
    });

    socket.on('reconnect', () => {
        console.log('Reconnected to Socket.IO server');
    });

    socket.on('reconnect_error', error => {
        console.error('Socket.IO reconnection error:', error);
    });

    return socket;

    // Add more event listeners as needed
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log('Socket disconnected');
    }
};
