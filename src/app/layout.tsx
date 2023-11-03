import type { Metadata } from 'next';
import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import Favicon from '/public/favicon.ico';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YouTube Playlist Length',
  description: 'A youtube playlist length calculator',
  icons: [{ rel: 'icon', url: Favicon.src }],
  openGraph: {
    images: {
      url: Favicon.src,
      width: 1200,
      height: 630,
      alt: 'YouTube Playlist Length',
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'm-auto max-w-4xl')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
