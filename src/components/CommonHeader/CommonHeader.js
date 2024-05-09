import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';

function CommonHeader({ title, onLeftClick, onRightClick, leftIcon }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ArrowLeftOutlined
                style={{ fontSize: '1rem' }}
                onClick={() => onLeftClick()}
            />
            <h2>{title}</h2>
        </div>
    );
}

export default CommonHeader;
