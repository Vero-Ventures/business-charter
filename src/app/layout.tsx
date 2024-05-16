import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Providers from '@/components/Providers';
import NavbarWrapper from '@/components/NavbarWrapper';
import NavBarSheetWrapper from '@/components/NavBarSheetWrapper';
import React from 'react';

// Dynamically import IconButton with ssr set to false
const IconButton = dynamic(() => import('@/components/message-chatbot-button'), {
  ssr: false
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Intergenerational Family Code',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="grid min-h-dvh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] print:block">
            <div className="hidden border-y-0 border-l-0 border-r md:block print:hidden">
              <NavbarWrapper />
            </div>
            <div className="flex flex-col">
              <header className="pl-3 pt-3 md:p-0 print:hidden">
                <NavBarSheetWrapper />
              </header>
              <div className="chatWrapper">
                <main className="h-[calc(100dvh-3.5rem)] max-h-dvh overflow-y-auto print:h-full">
                  {children}
                </main>
                <div>
                  <div className="closeChat"></div>
                  <div className="Chat"></div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <IconButton />
                </div>
              </div>
            </div>
          </div>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
