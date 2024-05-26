import React from 'react';
import { Button, Card, Image, Typography } from 'antd';
import Style from './style.module.css';
import { useAppSelector } from '@/lib/hooks/reduxHooks';
const ProfileCard = ({ data, onFollow, onUnFollow, onRemove, searchValue,className }) => {
    const userData = useAppSelector(state => state?.user?.userData);
    const alreadyFollow = data.followers?.includes(userData?._id);
    const alreadyRemoveFromSuggestion = userData?.removedSuggestions?.includes(
        data?._id,
    );

    return (
        <Card
            className={className}
            hoverable
        >
            <div style={{ textAlign: 'center' }}>
                <Image
                    className={Style.profile_image}
                    alt={data?.username}
                    src={data?.profilePicture}
                />
            </div>
            <div style={{ textAlign: 'center', marginTop: '2vh' }}>
                <h3>{data?.fullname || data?.username || 'UserName'}</h3>
                <p>{data?.city || 'City Unknown'}</p>
            </div>
            <div
                style={{
                    marginTop: '2vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1vh',
                }}
            >
                <Button
                    onClick={alreadyFollow ? onUnFollow : onFollow}
                    type="dashed"
                    block
                >
                    {alreadyFollow ? 'UnFollow' : 'Follow'}
                </Button>
                <Button type="dashed" block>
                    Add Friend
                </Button>

                {!alreadyRemoveFromSuggestion &&
                    !searchValue &&
                    !alreadyFollow && (
                        <Button onClick={onRemove} type="dashed" block>
                            Remove
                        </Button>
                    )}
            </div>
        </Card>
    );
};
export default ProfileCard;
