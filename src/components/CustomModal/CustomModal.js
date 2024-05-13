import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const CustomModal = ({ setCommentModalVisible, commentModalVisible }) => {
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
                title="Title"
                open={commentModalVisible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};
export default CustomModal;
