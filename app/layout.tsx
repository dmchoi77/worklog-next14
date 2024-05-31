import type { Metadata } from 'next';

import './globals.css';

import Providers from './Providers';

export const metadata: Metadata = {
  title: '오늘의 워크로그',
  description: 'Generated by create next app',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head suppressHydrationWarning={true}>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css'
        />
        <link
          rel='preload'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css'
        />
        <link rel='preconnect' href='https://cdn.jsdelivr.net' crossOrigin='anonymous' />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
