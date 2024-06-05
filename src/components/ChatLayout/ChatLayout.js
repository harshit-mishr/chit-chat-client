import React, { useState } from 'react';
import style from './style.module.css';
import CommonHeader from '../CommonHeader/CommonHeader';
import { Image } from 'antd';

function ChatLayout() {
    const [chatData, setChatData] = useState([
        {
            sender: 'John Doe',
            recipient: 'Jane Doe',
            timestamp: '12:15', // Unix timestamp in seconds (example: 2023-07-20 14:10:00)
            messageType: 'text', // Can be "text", "image", "video", "audio", etc.
            message:
                "Oh, that sounds like a lot of fun! I haven't played in a while, but I'd definitely be up for it.",
            sent: false,
            delivered: false,
            isRead: true,
        },
        {
            sender: 'Jane Doe',
            recipient: 'John Doe',
            timestamp: '12:20', // Unix timestamp in seconds (example: 2023-07-20 14:11:00)
            messageType: 'text',
            message:
                'I was actually thinking about going to play some golf this weekend. Would you be interested in joining me?',
            sent: false,
            delivered: false,
            isRead: false,
        },
        {
            sender: 'John Doe',
            recipient: 'Jane Doe',
            timestamp: '12:25', // Unix timestamp in seconds (example: 2023-07-20 14:12:00)
            messageType: 'image', // Replace with "video" or "audio" for other media
            mediaUrl:
                'https://photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg',
            sent: false,
            delivered: true,
            isRead: false,
        },
        {
            recipient: 'John Doe',
            sender: 'Jane Doe',
            timestamp: '12:95', // Unix timestamp in seconds (example: 2023-07-20 14:12:00)
            messageType: 'image', // Replace with "video" or "audio" for other media
            mediaUrl:
                'https://photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg',
            sent: false,
            delivered: true,
            isRead: false,
        },
        {
            sender: 'Jane Doe',
            recipient: 'John Doe',
            timestamp: '12:30', // Unix timestamp in seconds (example: 2023-07-20 14:13:20)
            messageType: 'text',
            message: 'That looks like a nice picture! Where was it taken?',
            sent: false,
            delivered: false,
            isRead: false,
        },
        {
            sender: 'John Doe',
            recipient: 'Jane Doe',
            timestamp: '12:15', // Unix timestamp in seconds (example: 2023-07-20 14:10:00)
            messageType: 'text', // Can be "text", "image", "video", "audio", etc.
            message:
                "Oh, that sounds like a lot of fun! I haven't played in a while, but I'd definitely be up for it.Oh, that sounds like a lot of fun! I haven't played in a while, but I'd definitely be up for it.",
            sent: true,
            delivered: false,
            isRead: false,
        },
    ]);
    return (
        <div className={style.container}>
            <div className={style.header}>
                <CommonHeader />
            </div>

            <div className={style.content}>
                {chatData.map(item => (
                    <div
                        key={item.timestamp}
                        className={style.message}
                        style={
                            item.sender === 'John Doe'
                                ? { justifyContent: 'flex-end' }
                                : { justifyContent: 'flex-start' }
                        }
                    >
                        {item.messageType === 'text' ? (
                            <p
                                className={style.text}
                                style={{ backgroundColor: '#424242' }}
                            >
                                {item.message}
                            </p>
                        ) : (
                            <Image
                                src={item.mediaUrl}
                                alt="image"
                                width={300}
                                height={300}
                                style={{
                                    objectFit: 'cover',
                                    backgroundColor: '#424242',
                                    // maxWidth: '80%',,
                                    // minWidth: 'min-content',
                                    padding: '1rem',
                                    borderRadius: '0.2rem',
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatLayout;
