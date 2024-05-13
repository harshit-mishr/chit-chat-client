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
            hoverable
            style={{ width: '100%', marginTop: 16 }}
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
            <div>
                <Meta
                    avatar={<Avatar src={author.profilePicture} />}
                    title={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            {author.username}
                            <span
                                style={{
                                    marginLeft: 5,
                                    color: 'gray',
                                    fontSize: '0.8rem',
                                }}
                            >
                                {new Date(createdAt).toDateString()}
                            </span>
                        </div>
                    }
                    description={description}
                />
                <div
                    style={{
                        marginTop: '1rem',
                        // border: '1px solid gray',
                    }}
                >
                    {image && (
                        <Image
                            preview={false}
                            src={image}
                            alt="Post Image"
                            width="80%"
                            style={{
                                marginLeft: '10vh',
                                borderRadius: '0.5rem',
                            }}
                        />
                    )}
                </div>
            </div>
        </Card>
    );
}

export default PostCard;
