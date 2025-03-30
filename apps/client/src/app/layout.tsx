import MUIThemeProvider from '@/components/mui/MuiThemeProvider';
import './global.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EventFlow',
  description: 'Event management system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <MUIThemeProvider>
          {children} <Toaster position="top-center" />
        </MUIThemeProvider>
      </body>
    </html>
  );
}
