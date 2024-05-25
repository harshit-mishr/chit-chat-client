import React from 'react';
import { Button, Card, Image, Typography } from 'antd';
import Style from './style.module.css';
const ProfileCard = ({ data }) => (
    <Card
        hoverable
        style={{
            width: 240,
        }}
    >
        <div style={{ textAlign: 'center' }}>
            <Image
                height={200}
                alt={data?.username}
                src={data?.profilePicture}
            />
        </div>
        <div style={{ textAlign: 'center', marginTop: '2vh' }}>
            <h3>{data?.fullname || data?.username || 'UserName'}</h3>
            <p>{data?.city || 'City Unknown'}</p>
        </div>
        <div
            style={{
                marginTop: '2vh',
                display: 'flex',
                flexDirection: 'column',
                gap: '1vh',
            }}
        >
            <Button type="dashed" block>
                Follow
            </Button>
            <Button type="dashed" block>
                Add Friend
            </Button>
            <Button type="dashed" block>
                Remove
            </Button>
        </div>
    </Card>
);
export default ProfileCard;
