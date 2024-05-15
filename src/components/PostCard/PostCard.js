import React from 'react';
import { Card, Avatar, Image } from 'antd';
import {
    HeartOutlined,
    MessageOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const { Meta } = Card;

function PostCard({ post, setCommentModalVisible, setCommentModalData }) {
    const { description, image, likes, comments, share, author, createdAt } =
        post;

    const postDate = moment(createdAt).fromNow();

    return (
        <Card
            hoverable
            style={{ width: '100%', marginTop: 16 }}
            actions={[
                <span key="like">
                    <HeartOutlined /> {likes}
                </span>,
                <span
                    key="comment"
                    onClick={e => {
                        e.stopPropagation();
                        setCommentModalVisible && setCommentModalVisible(true);
                        setCommentModalData && setCommentModalData(post);
                    }}
                >
                    <MessageOutlined /> {comments?.length}
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
                                {postDate}
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
                            loading="lazy"
                        />
                    )}
                </div>
            </div>
        </Card>
    );
}

export default PostCard;
