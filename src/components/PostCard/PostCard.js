import React from 'react';
import { Card, Avatar, Image } from 'antd';
import {
    HeartOutlined,
    MessageOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

function PostCard({ post }) {
    console.log('post -->', post);
    const { description, image, likes, comments, share, author, createdAt } =
        post;

    return (
        <Card
            style={{ width: '100%', marginTop: 16 }}
            cover={
                image && (
                    <div
                        style={{
                            padding: '2rem',
                            // border: '1px solid #424242',
                            textAlign: 'center',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Image
                            preview={false}
                            alt="example"
                            src={image}
                            style={{
                                width: '60%',
                                height: 'auto',
                                borderRadius: '0.5rem',
                            }}
                        />
                    </div>
                )
            }
            actions={[
                <span key="like">
                    <HeartOutlined /> {likes}
                </span>,
                <span key="comment">
                    <MessageOutlined /> {comments.length}
                </span>,
                <span key="share">
                    <ShareAltOutlined /> {share}
                </span>,
            ]}
        >
            <Meta
                avatar={<Avatar src={author.profilePicture} />}
                title={author.username}
                description={description}
            />
            <p style={{ marginTop: 12, color: 'gray' }}>
                {new Date(createdAt).toDateString()}
            </p>
        </Card>
    );
}

export default PostCard;
