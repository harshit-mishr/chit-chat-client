import { Button, Image, Input, Tooltip, message, theme } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './style.module.css';
import CustomAvatar from '../CustomAvatar/CustomAvatar';
import { FileImageOutlined, CloseOutlined } from '@ant-design/icons';
import apiService from '@/service/apiService';
const { TextArea } = Input;

/**
 *
 * @param {CreatePost & CreateComment  }
 * @returns
 */
function CreatePost({
    setRefresh,
    refresh,
    placeholder,
    buttonText,
    minRows,
    submitHandler,
    targetId,
}) {
    const uploadRef = useRef(null);
    const [localFile, setLocalFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onChange = e => {
        setDescription(e.target.value);
    };

    const handleFileChange = event => {
        const file = event.target.files[0];
        setLocalFile(file);

        // Read the file as a data URL
        const reader = new FileReader(); //one issue that when select one pic then after that unselect and again select then no change
        reader.onload = () => {
            // Set the result of FileReader as the selected file
            setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async () => {
        console.log('submited');
        setLoading(true);
        const formData = new FormData();
        formData.append('description', description);
        if (localFile) {
            formData.append('file', localFile);
        }

        if (targetId) {
            //this is for comment as postId is needed
            formData.append('postId', targetId);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await submitHandler(formData);
            console.log('REsponse from api', response.data);
            setSelectedFile(null);
            setDescription('');
            uploadRef.current.value = '';
            setLocalFile(null);
            // setRefresh(!refresh);
            setLoading(false);
            // message.success('Post created successfully');
        } catch (error) {
            console.error('Error:', error);
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Error creating post';

            console.error('Error creating post:', errorMessage);
            message.error(errorMessage);
            // setRefresh(!refresh);
            setLoading(false);
        } finally {
            // setRefresh(!refresh);
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                border: '1px solid #424242',
                padding: '1rem',
                borderRadius: '0.5rem',
                background: colorBgContainer,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                }}
            >
                <div>
                    <CustomAvatar
                        style={{
                            backgroundColor: '#141414',
                            border: '1px solid #424242',
                            borderColor: '#424242',
                        }}
                        shape="round"
                        size="large"
                    />
                </div>
                <div style={{ width: '100%' }}>
                    <TextArea
                        className={styles.noFocus}
                        placeholder={placeholder || 'Whats on your mind?'}
                        allowClear
                        onChange={onChange}
                        value={description}
                        maxLength={250}
                        autoSize={{ minRows: minRows || 3 }}
                        style={{
                            resize: 'none',
                            overflowY: 'none',
                            WebkitOverflowScrolling: 'touch',
                            overscrollBehaviorY: 'none',
                            width: '100%',
                            outline: 'none',
                            // boxhadow: none;
                        }}
                    />
                    {selectedFile && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'relative',
                                width: '100%',
                                border: '1px solid #424242',
                                borderRadius: '0.5rem',
                                padding: '0.5rem',
                                marginTop: '1rem',
                            }}
                        >
                            <Button
                                style={{
                                    position: 'absolute',
                                    top: '0rem',
                                    right: '0rem',
                                    zIndex: '1',
                                }}
                                onClick={() => {
                                    setSelectedFile(null);
                                    setLocalFile(null);
                                    uploadRef.current.value = '';
                                }}
                                type="primary"
                                shape="circle"
                                icon={<CloseOutlined />}
                            />
                            <Image
                                preview={true}
                                alt="Post picture"
                                src={selectedFile}
                                width={200}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '0.5rem',
                                }}
                            />
                        </div>
                    )}
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            // border: '1px solid #424242',
                            // padding: '0.5rem 3rem',
                            marginTop: '1rem',
                            // paddingRight: '0rem',

                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Tooltip title="Upload Photo">
                            <Button
                                onClick={() => uploadRef.current.click()}
                                type="primary"
                                shape="circle"
                                icon={<FileImageOutlined />}
                            />
                            <input
                                ref={uploadRef}
                                style={{ display: 'none' }}
                                id="profilePic"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*" // Optionally restrict accepted file types
                            />
                        </Tooltip>

                        <Button
                            loading={loading}
                            onClick={onSubmit}
                            type="primary"
                        >
                            {buttonText || 'Post'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
