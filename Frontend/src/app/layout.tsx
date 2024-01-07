"use client";
import Cookies from 'js-cookie';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const isAuth = Cookies.get('notify');
    if (isAuth) {
      router.push('/');
    } else {
      router.push('/auth');
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className + ' bg-red-200'}>{children}</body>
    </html>
  );
}
