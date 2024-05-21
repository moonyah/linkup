import type { Metadata } from 'next';
import { suit } from '@/styles/typography';
import '@styles/globals.css';
import { Header } from '@common/header';
import AuthContext from '@/context/AuthContext';
import AuthorizationHeader from '@/context/AuthorizationHeader';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={suit.className}>
        <Header />
        <AuthContext>
          <AuthorizationHeader>{children}</AuthorizationHeader>
        </AuthContext>
      </body>
    </html>
  );
}
