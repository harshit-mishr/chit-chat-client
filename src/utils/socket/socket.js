import { io, Socket } from 'socket.io-client';

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://chit-chat-server-one.vercel.app' //vercel
        : // 'http://13.235.70.214/api' //aws domain
          'http://localhost:8000';

const MAX_RECONNECTION_DELAY = 5000;
const MIN_RECONNECTION_DELAY = 1000;
const RECONNECTION_DELAY_INCREMENT = 1000;

let socket;
let reconnectionDelay = MIN_RECONNECTION_DELAY;

export const connectSocket = token => {
    socket = io(BASE_URL, {
        auth: {
            token,
        },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: reconnectionDelay,
        reconnectionDelayMax: MAX_RECONNECTION_DELAY,
        randomizationFactor: 0.5,
        timeout: 10000,
    });

    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
        reconnectionDelay = MIN_RECONNECTION_DELAY;
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
    });

    socket.on('reconnect', () => {
        console.log('Reconnected to Socket.IO server');
    });

    socket.on('reconnect_error', error => {
        console.error('Socket.IO reconnection error:', error);
        reconnectionDelay = Math.min(
            reconnectionDelay + RECONNECTION_DELAY_INCREMENT,
            MAX_RECONNECTION_DELAY,
        );
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log('Socket disconnected');
        socket = null;
    }
};
