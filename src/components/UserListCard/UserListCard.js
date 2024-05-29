import { Card, Avatar } from 'antd';
import React, { useState } from 'react';
import style from './style.module.css';
const { Meta } = Card;

function UserListCard() {
    const [loading, setLoading] = useState(false);
    return (
        <Card style={{ width: 300 }} className={style.card} loading={loading}>
            <Meta
                className={style.meta}
                avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                }
                title="Card title"
                description="This is the description"
            />
        </Card>
    );
}

export default UserListCard;
