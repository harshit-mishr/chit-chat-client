import { useAppSelector } from '@/lib/hooks';
import { Avatar, Button, Popover } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import CustomAvatar from '../CustomAvatar/CustomAvatar';

function CustomPopover({ logout, collapsed }) {
    const router = useRouter();

    const userData = useAppSelector(state => state.user.userData);
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
            title={
                <span style={{ textAlign: 'center' }}>
                    {
                        // userData?.username?.toUpperCase()
                    }
                </span>
            }
            content={content}
        >
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                <CustomAvatar
                    style={{
                        backgroundColor: '#141414',
                        border: '1px solid #424242',
                        borderColor: '#424242',
                    }}
                    shape="round"
                    size="large"
                    imageSource={userData?.profilePicture}
                />
                {!collapsed && (
                    <div>
                        <h4>{userData?.username}</h4>
                        <p style={{ color: 'gray', fontSize: '0.8rem' }}>
                            {userData?.email}
                        </p>
                    </div>
                )}
            </div>
        </Popover>
    );
}

export default CustomPopover;
