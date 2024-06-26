import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import StyledComponentsRegistry from '@/lib/styleRegistry/AntdStyledRegistry';
import ThemeProvider from '@/utils/theme/themeProvider';
import { SocketContextProvider } from '@/lib/contexts/SocketContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StoreProvider>
                    <SocketContextProvider>
                        <ThemeProvider>
                            <StyledComponentsRegistry>
                                {children}
                            </StyledComponentsRegistry>
                        </ThemeProvider>
                    </SocketContextProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
