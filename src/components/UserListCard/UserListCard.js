import { Card, Avatar } from 'antd';
import React, { useState } from 'react';
import style from './style.module.css';
const { Meta } = Card;

function UserListCard({ data }) {
    const [loading, setLoading] = useState(false);
    return (
        <Card style={{ width: 300 }} className={style.card} loading={loading}>
            <div className={style.userDescription}>
                <Avatar
                    src={
                        data?.profilePicture
                            ? data.profilePicture
                            : 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
                    }
                />
                <div className={style.userInfo}>
                    <h4>{data?.username}</h4>
                    {data?.lastMessage && <div>Last Message</div>}
                </div>
            </div>
        </Card>
    );
}

export default UserListCard;
