import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';

function CommonHeader({
    title,
    onLeftClick,
    onRightClick,
    leftIcon,
    backgroundColor,
}) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: backgroundColor || '#1668dc',

                height: '10vh',
                padding: '0.5rem 1rem',
            }}
        >
            <ArrowLeftOutlined
                style={{ fontSize: '1rem' }}
                onClick={() => onLeftClick && onLeftClick()}
            />
            <h2>{title}</h2>
        </div>
    );
}

export default CommonHeader;
