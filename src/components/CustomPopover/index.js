import { useAppSelector } from '@/lib/hooks';
import { Avatar, Button, Popover } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

function CustomPopover({ logout }) {
    const router = useRouter();

    const userData = useAppSelector(state => state.user.entities);
    const content = (
        <div
            style={{
                height: '5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Button block onClick={() => router.push('/profile/setting')}>
                Profile
            </Button>
            <Button block onClick={logout}>
                Logout
            </Button>
        </div>
    );

    return (
        <Popover
            placement="leftBottom"
            title={<span>{userData?.username?.toUpperCase()}</span>}
            content={content}
        >
            <Avatar
                style={{
                    backgroundColor: '#141414',
                    border: '1px solid #424242',
                    borderColor: '#424242',
                }}
                shape="round"
                size="large"
                src={
                    userData?.profilePicture ||
                    'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
                }
            />
        </Popover>
    );
}

export default CustomPopover;
