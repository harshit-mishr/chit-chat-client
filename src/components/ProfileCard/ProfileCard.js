import React from 'react';
import { Button, Card, Image, Typography } from 'antd';
import Style from './style.module.css';
import { useAppSelector } from '@/lib/hooks/reduxHooks';
const ProfileCard = ({
    data,
    onFollow,
    onUnFollow,
    onRemove,
    searchValue,
    onFriendRequestSend,
    onFriendRequestCancel,
    onFriendRequestReject,
    onFriendRequestAccept,
    onUnFriend,
}) => {
    const userData = useAppSelector(state => state?.user?.userData);
    const alreadyFollow = data.followers?.includes(userData?._id);
    const alreadyRemoveFromSuggestion = userData?.removedSuggestions?.includes(
        data?._id,
    );

    const alreadySendFriendRequest = data.friendRequestsReceived?.includes(
        userData?._id,
    );

    const friendRequestsReceived = data?.friendRequestsSent?.includes(
        userData?._id,
    );

    const alreadyFriend = data?.friends?.includes(userData?._id);

    return (
        <Card
            hoverable
            style={{
                width: 240,
                height: 420,
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <Image
                    height={200}
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
                {!alreadyFriend && (
                    <Button
                        onClick={
                            friendRequestsReceived
                                ? onFriendRequestReject
                                : alreadySendFriendRequest
                                ? onFriendRequestCancel
                                : onFriendRequestSend
                        }
                        type="dashed"
                        block
                    >
                        {friendRequestsReceived
                            ? 'Reject Request'
                            : alreadySendFriendRequest
                            ? 'Cancel Request'
                            : 'Add Friend'}
                    </Button>
                )}

                {!alreadyRemoveFromSuggestion &&
                    !searchValue &&
                    !alreadyFollow && (
                        <Button onClick={onRemove} type="dashed" block>
                            Remove
                        </Button>
                    )}

                {friendRequestsReceived ? (
                    <Button onClick={onFriendRequestAccept} type="dashed" block>
                        Accept
                    </Button>
                ) : null}

                {alreadyFriend && (
                    <Button onClick={onUnFriend} type="dashed" block>
                        UnFriend
                    </Button>
                )}
            </div>
        </Card>
    );
};
export default ProfileCard;
