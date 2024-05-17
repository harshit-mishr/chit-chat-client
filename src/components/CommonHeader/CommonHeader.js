import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function CommonHeader({
    title,
    onLeftClick,
    right,
    rightTitle,
    onRightClick,
    leftIcon,
    backgroundColor,
}) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                backgroundColor: backgroundColor || '#1668dc',

                height: '10vh',
                padding: '0.5rem 1rem',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '2vh' }}>
                <ArrowLeftOutlined
                    style={{ fontSize: '1rem' }}
                    onClick={() => onLeftClick && onLeftClick()}
                />
                <h2>{title}</h2>
            </div>
            {right && (
                <Button style={{ float: 'right' }} onClick={onRightClick}>
                    {rightTitle}
                </Button>
            )}
        </div>
    );
}

export default CommonHeader;
