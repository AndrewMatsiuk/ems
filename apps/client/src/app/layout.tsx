import MUIThemeProvider from '@/components/mui/MuiThemeProvider';
import './global.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { EventProvider } from '@/context/EventContext';

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
          <EventProvider>
            {children} <Toaster position="top-center" />
          </EventProvider>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
