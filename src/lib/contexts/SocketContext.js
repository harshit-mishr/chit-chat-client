'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {
    connectSocket,
    disconnectSocket,
    getSocket,
} from '@/utils/socket/socket';

export const SocketContext = createContext(null);

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!socket) {
            setSocket(getSocket());
        }

        return () => {
            if (socket) {
                socket.disconnect();
                console.log('Socket disconnected');
                setSocket(null);
            } else {
                setSocket(getSocket());
            }
        };
    }, [socket]);

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            console.log('Socket disconnected');
            setSocket(null);
        }
    };

    return (
        <SocketContext.Provider value={{ socket, disconnectSocket }}>
            {children}
        </SocketContext.Provider>
    );
};
