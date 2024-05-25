import { Card, Skeleton } from 'antd';
import React from 'react';

export default function ProfileCardSkeleton({ active }) {
    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <Skeleton.Image
                    style={{ height: 200, width: 200 }}
                    active={active}
                />
            </div>
            <div style={{ textAlign: 'center', marginTop: '2vh' }}>
                <Skeleton
                    paragraph={{
                        rows: 2,
                    }}
                    style={{ width: '100%' }}
                    active={active}
                />
            </div>
            <div
                style={{
                    marginTop: '2vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1vh',
                }}
            >
                <Skeleton.Button
                    active={active}
                    size={'default'}
                    shape={'default'}
                    block={true}
                />

                <Skeleton.Button
                    active={active}
                    size={'default'}
                    shape={'default'}
                    block={true}
                />
            </div>
        </Card>
    );
}
