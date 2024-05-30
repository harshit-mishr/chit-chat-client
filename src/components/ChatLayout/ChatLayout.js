import React from 'react';
import style from './style.module.css';

function ChatLayout() {
    return (
        <div className={style.container}>
            <div className={style.header}>Header</div>

            <div className={style.content}>Content</div>

            <div>Insert Message</div>
        </div>
    );
}

export default ChatLayout;
