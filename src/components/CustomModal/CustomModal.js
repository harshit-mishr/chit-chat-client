import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import PostCard from '../PostCard/PostCard';
import CreatePost from '../CreatePost/CreatePost';
const CustomModal = ({
    setCommentModalVisible,
    commentModalVisible,
    modalData,
    title,
    submitHandler,
    setRefresh,
    refresh,
}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    console.log('commentModalVisible', commentModalVisible);

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setCommentModalVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setCommentModalVisible(false);
    };
    return (
        <>
            {
                // <Button type="primary" onClick={showModal}>
                //     Open Modal with async logic
                // </Button>
            }
            <Modal
                title={title}
                open={commentModalVisible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <PostCard post={modalData} />
                <div style={{ marginTop: '1rem' }}>
                    <CreatePost
                        placeholder="Write a comment"
                        buttonText="Comment"
                        minRows={1}
                        submitHandler={submitHandler}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        targetId={modalData._id}
                    />
                </div>
            </Modal>
        </>
    );
};
export default CustomModal;
