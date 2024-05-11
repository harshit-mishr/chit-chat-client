'use client';
import React from 'react';
import { Layout, Button, Typography } from 'antd';
import underConstructionImage from '../../utils/assets/other/tom-and-jerry-preparing.gif';
import Image from 'next/image';

const { Content, Header, Footer } = Layout;
const { Title, Text } = Typography;

function ComingSoon() {
    const handleGoBack = () => {
        window.history.back();
    };

    const handleGoToHomePage = () => {
        window.location.href = '/home';
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ backgroundColor: '#141414' }}>
                <Button type="primary" shape="round" onClick={handleGoBack}>
                    Go Back
                </Button>
            </Header>
            <Content>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '100%',
                        textAlign: 'center',
                        marginTop: '5rem',
                    }}
                >
                    <Image
                        src={underConstructionImage}
                        alt="under construction"
                        width={200}
                        height={200}
                    />
                    <Title level={2}>Coming Soon</Title>
                    <Text>
                        This page is currently under construction. Please come
                        back later.
                    </Text>
                </div>
            </Content>
            <Footer style={{ backgroundColor: '#141414' }}>
                <Button
                    type="primary"
                    shape="round"
                    onClick={handleGoToHomePage}
                >
                    Go to Home Page
                </Button>
            </Footer>
        </Layout>
    );
}

export default ComingSoon;
