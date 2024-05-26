'use client';

import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { connectSocket, getSocket } from '../socket/socket';

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
                        if (accessToken && !getSocket()) {
                            connectSocket(accessToken);
                            setSocket(getSocket());
                        }
                    }
                }
            };

            checkAuth();
        }, []);

        if (isLoading) {
            return <Spin spinning />;
        }

        return <Component {...props} />;
    };

    return WithAuth;
};

export default withAuth;
