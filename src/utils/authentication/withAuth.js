'use client';

import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { connectSocket } from '../socket/socket';

const withAuth = Component => {
    const WithAuth = props => {
        const [isLoading, setIsLoading] = useState(true);
        const [socket, setSocket] = useState(null);
        const router = useRouter();

        useEffect(() => {
            const checkAuth = async () => {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    router.push('/auth/login');
                    setIsLoading(true);
                } else {
                    setIsLoading(false);
                    if (accessToken && !socket) {
                        const newSocket = connectSocket(accessToken);

                        newSocket.on('connect', () => {
                            console.log('Connected to Socket.IO server');
                        });

                        newSocket.on('disconnect', () => {
                            console.log('Disconnected from Socket.IO server');
                        });

                        setSocket(newSocket);
                    }
                }
            };

            checkAuth();

            return () => {
                if (socket) {
                    socket.disconnect();
                }
            };
        }, [socket]);

        if (isLoading) {
            return <Spin spinning />;
        }

        return <Component {...props} socket={socket} />;
    };

    return WithAuth;
};

export default withAuth;
