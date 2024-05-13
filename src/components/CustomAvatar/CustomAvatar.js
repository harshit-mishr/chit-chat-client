import { useAppSelector } from '@/lib/hooks';
import { Avatar } from 'antd';
import React from 'react';

function CustomAvatar({ imageSource, style, shape, size }) {
    const userData = useAppSelector(state => state.user.userData);
    return (
        <Avatar
            style={{
                ...style,
            }}
            shape={shape || 'round'}
            size={size || 'large'}
            src={
                imageSource ||
                userData?.profilePicture ||
                'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
            }
        />
    );
}

export default CustomAvatar;
