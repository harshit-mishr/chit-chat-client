'use client';
import { useAppSelector } from '@/lib/hooks';
import apiService from '@/service/apiService';
import React, { useEffect } from 'react';

function Profile() {
    const userData = useAppSelector(state => state.user.userData);
    async function getMyPosts() {
        const filter = {};

        try {
            const response = await apiService.get(
                '/user/posts',
                { page: 1, limit: 10, filter: JSON.stringify(filter) || null },
                true,
            );
            setAllPost(response && response.data && response.data.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getMyPosts();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {userData?.username}</p>
            <p>_id : {userData?._id}</p>
            <p>Email: {userData?.email}</p>
            <p>Posts: {userData?.posts?.length}</p>
        </div>
    );
}

export default Profile;
