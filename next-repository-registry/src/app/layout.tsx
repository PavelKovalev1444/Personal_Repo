import {ThemeProvider} from '@gravity-ui/uikit';
import type {Metadata} from 'next';

import {StoreProvider} from '@/client/widgets/store';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
// eslint-disable-next-line import/order
import './globals.css';

export const metadata: Metadata = {
    title: 'Repository registry',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <ThemeProvider theme="light">{children}</ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
