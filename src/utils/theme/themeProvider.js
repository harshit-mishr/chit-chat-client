'use client';
//create themeProvider component for antd design

import { ConfigProvider, theme } from 'antd';
import React from 'react';

export default function ThemeProvider({ children }) {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                components: {
                    Button: {
                        colorPrimary: '#1668dc', //blue
                        algorithm: true, // Enable algorithm
                    },
                    Input: {
                        colorPrimary: '#eb2f96',
                        backgroundColor: '#fff',
                        //when focus then should be blue
                        activeBorderColor: '#1668dc', //blue
                        hoverBorderColor: '#1668dc', //blue

                        algorithm: true, // Enable algorithm
                    },
                    Title: {
                        colorPrimary: '#00b96b',
                        algorithm: true, // Enable algorithm
                    },
                    Avatar: {
                        //not working
                        colorPrimary: 'black',
                        algorithm: true, // Enable algorithm
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
